import { CircleHelp } from "lucide-react";
import { FAQS } from "@/lib/data";

export default function FaqSection() {
  return (
    <section className="section faq-section">
      <div>
        <p className="eyebrow dark">Questions</p>
        <h2>Answers before your first visit.</h2>
        <p>Everything you need to know about memberships, classes, coaching, and getting started at ForgeFit.</p>
      </div>
      <div className="faq-list">
        {FAQS.map((faq) => (
          <details key={faq.question}>
            <summary>
              <CircleHelp size={19} /> {faq.question}
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
