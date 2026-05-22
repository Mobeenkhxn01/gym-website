import type { MembershipPlanName } from "./generated/prisma/enums";

export function toMembershipPlanName(plan: string): MembershipPlanName {
  const normalized = plan.trim().toLowerCase();

  if (normalized === "starter") return "STARTER";
  if (normalized === "elite coaching") return "ELITE_COACHING";

  return "PERFORMANCE";
}

export function fromMembershipPlanName(plan: MembershipPlanName) {
  if (plan === "STARTER") return "Starter";
  if (plan === "ELITE_COACHING") return "Elite Coaching";

  return "Performance";
}
