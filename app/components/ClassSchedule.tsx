"use client";

import { useMemo, useState } from "react";
import { Clock, UserRound } from "lucide-react";
import { CLASSES, CATEGORY_OPTIONS, type CategoryOption } from "@/lib/data";

type Props = {
  onClassSelect: (title: string) => void;
};

export default function ClassSchedule({ onClassSelect }: Props) {
  const [activeCategory, setActiveCategory] = useState<CategoryOption>("All");

  const filteredClasses = useMemo(() => {
    if (activeCategory === "All") return CLASSES;
    return CLASSES.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="classes" className="section class-section">
      <div className="section-heading">
        <p className="eyebrow dark">Live Schedule</p>
        <h2>Book a class that matches today&apos;s energy.</h2>
      </div>
      <div className="category-tabs" role="tablist" aria-label="Class categories">
        {CATEGORY_OPTIONS.map((category) => (
          <button
            key={category}
            role="tab"
            aria-selected={activeCategory === category}
            className={activeCategory === category ? "active" : ""}
            onClick={() => setActiveCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>
      <div className="class-list">
        {filteredClasses.map((item) => (
          <article className="class-row" key={`${item.title}-${item.time}`}>
            <div>
              <span className="class-category">{item.category}</span>
              <h3>{item.title}</h3>
            </div>
            <span>
              <Clock size={18} /> {item.time}
            </span>
            <span>
              <UserRound size={18} /> {item.coach}
            </span>
            <span>{item.level}</span>
            <button type="button" onClick={() => onClassSelect(item.title)}>
              {item.spots} spots
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
