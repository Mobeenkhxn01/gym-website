import { NextRequest, NextResponse } from "next/server";

export function requireAdminKey(request: NextRequest): NextResponse | null {
  const adminKey = process.env.ADMIN_API_KEY;

  if (!adminKey) {
    return NextResponse.json({ error: "Admin access not configured." }, { status: 503 });
  }

  const provided = request.headers.get("x-admin-key");

  if (!provided || provided !== adminKey) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return null;
}
