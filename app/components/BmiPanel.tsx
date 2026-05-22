"use client";

import { HeartPulse } from "lucide-react";
import { useMemo, useState } from "react";

export default function BmiPanel() {
  const [height, setHeight] = useState("175");
  const [weight, setWeight] = useState("75");

  const bmi = useMemo(() => {
    const heightMeters = Number(height) / 100;
    const weightKg = Number(weight);
    if (!heightMeters || !weightKg) return 0;
    return weightKg / (heightMeters * heightMeters);
  }, [height, weight]);

  const bmiLabel =
    bmi < 18.5 ? "Underweight" : bmi < 25 ? "Healthy" : bmi < 30 ? "Overweight" : "Athletic review";

  return (
    <section className="quick-tools" aria-label="Fitness tools">
      <div className="tool-panel">
        <HeartPulse size={24} />
        <div>
          <h2>BMI Snapshot</h2>
          <p>Plan your consultation with a quick baseline.</p>
        </div>
        <label>
          Height (cm)
          <input
            value={height}
            onChange={(event) => setHeight(event.target.value)}
            inputMode="numeric"
            aria-label="Height in centimetres"
          />
        </label>
        <label>
          Weight (kg)
          <input
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            inputMode="numeric"
            aria-label="Weight in kilograms"
          />
        </label>
        <output aria-live="polite" aria-label={`BMI result: ${bmi ? bmi.toFixed(1) : "not calculated"}`}>
          <strong>{bmi ? bmi.toFixed(1) : "--"}</strong>
          <span>{bmiLabel}</span>
        </output>
      </div>
    </section>
  );
}
