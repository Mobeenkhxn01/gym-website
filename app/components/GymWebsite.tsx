"use client";

import { useState } from "react";
import type { Plan } from "@/lib/data";

import SiteHeader from "./SiteHeader";
import HeroSection from "./HeroSection";
import BmiPanel from "./BmiPanel";
import ExperienceSection from "./ExperienceSection";
import OutcomesSection from "./OutcomesSection";
import ClassSchedule from "./ClassSchedule";
import FacilityBand from "./FacilityBand";
import PricingSection from "./PricingSection";
import CoachSection from "./CoachSection";
import TestimonialsSection from "./TestimonialsSection";
import FaqSection from "./FaqSection";
import BookingForm from "./BookingForm";
import SiteFooter from "./SiteFooter";

export default function GymWebsite() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan["name"]>("Performance");
  const [preselectedGoal, setPreselectedGoal] = useState("Build muscle");

  return (
    <main>
      <SiteHeader
        mobileOpen={mobileOpen}
        onMobileOpen={() => setMobileOpen(true)}
        onMobileClose={() => setMobileOpen(false)}
      />

      <HeroSection />

      <section className="partner-strip" aria-label="Program highlights">
        <span>Strength</span>
        <span>Conditioning</span>
        <span>Personal Training</span>
        <span>Recovery</span>
        <span>Nutrition</span>
      </section>

      <BmiPanel />
      <ExperienceSection />
      <OutcomesSection />

      <ClassSchedule onClassSelect={(title) => setPreselectedGoal(title)} />

      <FacilityBand />

      <PricingSection selectedPlan={selectedPlan} onPlanSelect={setSelectedPlan} />

      <CoachSection />
      <TestimonialsSection />
      <FaqSection />

      <BookingForm
        selectedPlan={selectedPlan}
        onPlanSelect={setSelectedPlan}
        preselectedGoal={preselectedGoal}
      />

      <SiteFooter />
    </main>
  );
}
