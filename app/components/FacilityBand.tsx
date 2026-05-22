import { Check } from "lucide-react";
import { FACILITIES } from "@/lib/data";

export default function FacilityBand() {
  return (
    <section className="facility-band">
      <div>
        <p className="eyebrow">Facilities</p>
        <h2>Every tool you need to train hard and recover well.</h2>
      </div>
      <div className="facility-list">
        {FACILITIES.map((facility) => (
          <span key={facility}>
            <Check size={18} /> {facility}
          </span>
        ))}
      </div>
    </section>
  );
}
