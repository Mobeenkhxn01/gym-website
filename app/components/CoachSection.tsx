import Image from "next/image";
import { Star } from "lucide-react";
import { TRAINERS } from "@/lib/data";

export default function CoachSection() {
  return (
    <section id="coaches" className="section coach-section">
      <div className="section-heading">
        <p className="eyebrow dark">Coaches</p>
        <h2>Train with specialists who know how to adapt.</h2>
      </div>
      <div className="coach-grid">
        {TRAINERS.map((trainer) => (
          <article className="coach-card" key={trainer.name}>
            <Image src={trainer.image} alt={`${trainer.name}, ${trainer.role}`} width={430} height={520} />
            <div>
              <h3>{trainer.name}</h3>
              <p>{trainer.role}</p>
              <span>
                <Star size={16} /> {trainer.stats}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
