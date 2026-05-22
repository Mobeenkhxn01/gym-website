import Image from "next/image";
import { Activity, ShieldCheck, Zap } from "lucide-react";
import { STUDIO_IMAGES } from "@/lib/data";

export default function ExperienceSection() {
  return (
    <section id="experience" className="section split-section">
      <div>
        <p className="eyebrow dark">Training Floor</p>
        <h2>Built for lifters, beginners, busy professionals, and comeback stories.</h2>
        <p>
          ForgeFit combines coached classes with open gym flexibility, recovery zones, body composition scans, and
          goal-specific programs. You can drop into a sweat session, train your own plan, or work directly with a
          coach.
        </p>
        <div className="feature-list">
          <span>
            <ShieldCheck size={20} /> Certified coaching
          </span>
          <span>
            <Zap size={20} /> Smart programming
          </span>
          <span>
            <Activity size={20} /> Progress tracking
          </span>
        </div>
      </div>
      <div className="image-grid">
        {STUDIO_IMAGES.map((image) => (
          <Image key={image.src} src={image.src} alt={image.alt} width={420} height={320} />
        ))}
      </div>
    </section>
  );
}
