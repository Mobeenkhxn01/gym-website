import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { fromMembershipPlanName, toMembershipPlanName } from "@/lib/plans";

type ConsultationPayload = {
  name?: string;
  email?: string;
  phone?: string;
  goal?: string;
  plan?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isMissingDatabaseUrl(error: unknown) {
  return error instanceof Error && error.message.includes("DATABASE_URL");
}

export async function GET() {
  try {
    const prisma = getPrisma();
    const consultations = await prisma.consultation.findMany({
      orderBy: { createdAt: "desc" },
      take: 8
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
        createdAt: item.createdAt.toISOString()
      }))
    });
  } catch (error) {
    if (isMissingDatabaseUrl(error)) {
      return NextResponse.json({ consultations: [] });
    }

    return NextResponse.json(
      {
        consultations: [],
        error: error instanceof Error ? error.message : "Unable to load consultations."
      },
      { status: 503 }
    );
  }
}

export async function POST(request: Request) {
  const payload = (await request.json()) as ConsultationPayload;
  const name = clean(payload.name);
  const email = clean(payload.email);
  const phone = clean(payload.phone);
  const goal = clean(payload.goal) || "Build muscle";
  const plan = clean(payload.plan) || "Performance";

  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Name, email, and phone are required." }, { status: 400 });
  }

  try {
    const prisma = getPrisma();
    const consultation = await prisma.consultation.create({
      data: {
        name,
        email,
        phone,
        goal,
        plan: toMembershipPlanName(plan)
      }
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
          createdAt: consultation.createdAt.toISOString()
        }
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
            createdAt: new Date().toISOString()
          }
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
