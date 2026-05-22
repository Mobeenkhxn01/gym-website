import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { fromMembershipPlanName, toMembershipPlanName } from "@/lib/plans";
import { consultationSchema } from "@/lib/validators/consultation";
import { requireAdminKey } from "@/lib/middleware/auth";
import { ZodError } from "zod";

function isMissingDatabaseUrl(error: unknown) {
  return error instanceof Error && error.message.includes("DATABASE_URL");
}

export async function GET(request: NextRequest) {
  const authError = requireAdminKey(request);
  if (authError) return authError;

  try {
    const prisma = getPrisma();
    const consultations = await prisma.consultation.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({
      consultations: consultations.map((item) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        goal: item.goal,
        plan: fromMembershipPlanName(item.plan),
        status: item.status,
        createdAt: item.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    if (isMissingDatabaseUrl(error)) {
      return NextResponse.json({ consultations: [] });
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to load consultations." },
      { status: 503 }
    );
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = consultationSchema.safeParse(body);

  if (!parsed.success) {
    const errors = parsed.error as ZodError;
    return NextResponse.json(
      { error: "Validation failed.", details: errors.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { name, email, phone, goal, plan } = parsed.data;

  try {
    const prisma = getPrisma();
    const consultation = await prisma.consultation.create({
      data: {
        name,
        email,
        phone,
        goal,
        plan: toMembershipPlanName(plan),
      },
    });

    return NextResponse.json(
      {
        consultation: {
          id: consultation.id,
          name: consultation.name,
          email: consultation.email,
          phone: consultation.phone,
          goal: consultation.goal,
          plan: fromMembershipPlanName(consultation.plan),
          status: consultation.status,
          createdAt: consultation.createdAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (isMissingDatabaseUrl(error)) {
      return NextResponse.json(
        {
          persisted: false,
          consultation: {
            name,
            email,
            phone,
            goal,
            plan,
            status: "LOCAL_ONLY",
            createdAt: new Date().toISOString(),
          },
        },
        { status: 202 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to save consultation." },
      { status: 503 }
    );
  }
}
