import { ArrowRight } from "lucide-react";

export default function SiteFooter() {
  return (
    <>
      <section className="final-cta">
        <div>
          <p className="eyebrow">7-Day Free Trial</p>
          <h2>Your first week is on us. No commitment, no card required.</h2>
        </div>
        <a className="primary-button" href="#book">
          Start Your Trial
          <ArrowRight size={19} />
        </a>
      </section>
      <footer>
        <span>ForgeFit Gym</span>
        <span>© {new Date().getFullYear()} ForgeFit. All rights reserved. 118 Market Street, Austin TX.</span>
      </footer>
    </>
  );
}
