import Image from "next/image";
import { ArrowRight, Award, Building2, ChevronDown } from "lucide-react";
import { HERO_IMAGE } from "@/lib/data";

export default function HeroSection() {
  return (
    <section id="home" className="hero">
      <Image src={HERO_IMAGE} alt="ForgeFit gym training floor" fill priority className="hero-image" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="eyebrow">Open daily 5 AM - 11 PM</p>
        <h1>ForgeFit Gym</h1>
        <p className="hero-copy">
          Austin&apos;s most complete training environment — strength, conditioning, recovery, and personal coaching
          under one roof.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="#book">
            Start 7-Day Trial
            <ArrowRight size={19} />
          </a>
          <a className="secondary-button" href="#classes">
            View Classes
            <ChevronDown size={19} />
          </a>
        </div>
        <div className="hero-metrics" aria-label="Gym highlights">
          <span>
            <strong>42</strong> weekly classes
          </span>
          <span>
            <strong>12</strong> expert coaches
          </span>
          <span>
            <strong>4.9</strong> member rating
          </span>
        </div>
        <div className="hero-proof" aria-label="Trust highlights">
          <span>
            <Award size={18} /> Certified coaching team
          </span>
          <span>
            <Building2 size={18} /> 12,000 sq ft training facility
          </span>
        </div>
      </div>
    </section>
  );
}
