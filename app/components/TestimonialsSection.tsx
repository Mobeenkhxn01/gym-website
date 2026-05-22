import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

export default function TestimonialsSection() {
  return (
    <section className="section testimonials-section">
      <div className="section-heading compact-heading">
        <p className="eyebrow dark">Member Stories</p>
        <h2>Real results from real members.</h2>
      </div>
      <div className="testimonial-grid">
        {TESTIMONIALS.map((testimonial) => (
          <article className="testimonial-card" key={testimonial.name}>
            <div className="stars" aria-label="Five star rating">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={17} fill="currentColor" />
              ))}
            </div>
            <p>&quot;{testimonial.quote}&quot;</p>
            <div>
              <strong>{testimonial.name}</strong>
              <span>{testimonial.detail}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
