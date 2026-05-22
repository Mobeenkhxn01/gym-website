import { Check } from "lucide-react";
import { PLANS, type Plan } from "@/lib/data";

type Props = {
  selectedPlan: Plan["name"];
  onPlanSelect: (name: Plan["name"]) => void;
};

export default function PricingSection({ selectedPlan, onPlanSelect }: Props) {
  return (
    <section id="plans" className="section plans-section">
      <div className="section-heading">
        <p className="eyebrow dark">Memberships</p>
        <h2>Pick the level of support you want.</h2>
      </div>
      <div className="plans">
        {PLANS.map((plan) => (
          <article className={`plan ${plan.highlight ? "featured" : ""}`} key={plan.name}>
            {plan.highlight && <span className="plan-badge">Popular</span>}
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <div className="price">
              ${plan.price}
              <span>/mo</span>
            </div>
            <ul>
              {plan.perks.map((perk) => (
                <li key={perk}>
                  <Check size={18} /> {perk}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => onPlanSelect(plan.name)}
              aria-pressed={selectedPlan === plan.name}
            >
              {selectedPlan === plan.name ? "Selected" : "Choose Plan"}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
