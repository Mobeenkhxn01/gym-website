import { OUTCOMES } from "@/lib/data";

export default function OutcomesSection() {
  return (
    <section className="section outcomes-section">
      <div className="section-heading compact-heading">
        <p className="eyebrow dark">Member Journey</p>
        <h2>From your first visit to the results you actually want.</h2>
      </div>
      <div className="outcome-grid">
        {OUTCOMES.map((item) => {
          const Icon = item.icon;
          return (
            <article className="outcome-card" key={item.title}>
              <Icon size={26} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
