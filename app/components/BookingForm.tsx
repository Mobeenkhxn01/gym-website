"use client";

import { FormEvent, useState } from "react";
import { CalendarDays, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { CLASSES, PLANS, type Plan } from "@/lib/data";

type SavedBooking = {
  name: string;
  email: string;
  phone: string;
  goal: string;
  plan: string;
  id?: string;
  createdAt?: string;
  status?: string;
};

type BookingState = {
  name: string;
  email: string;
  phone: string;
  goal: string;
  plan: Plan["name"];
};

type Props = {
  selectedPlan: Plan["name"];
  onPlanSelect: (name: Plan["name"]) => void;
  preselectedGoal: string;
};

const INITIAL_BOOKING = (plan: Plan["name"]): BookingState => ({
  name: "",
  email: "",
  phone: "",
  goal: "Build muscle",
  plan,
});

type StatusKind = "success" | "error" | "fallback" | null;

export default function BookingForm({ selectedPlan, onPlanSelect, preselectedGoal }: Props) {
  const [booking, setBooking] = useState<BookingState>(() => ({
    ...INITIAL_BOOKING(selectedPlan),
    goal: preselectedGoal || "Build muscle",
  }));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusKind, setStatusKind] = useState<StatusKind>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [savedBookings, setSavedBookings] = useState<SavedBooking[]>(() => {
    try {
      const stored = typeof window !== "undefined" ? window.localStorage.getItem("forgefit-bookings") : null;
      return stored ? (JSON.parse(stored) as SavedBooking[]) : [];
    } catch {
      return [];
    }
  });

  function persistLocally(entry: SavedBooking) {
    const next = [entry, ...savedBookings].slice(0, 5);
    try {
      window.localStorage.setItem("forgefit-bookings", JSON.stringify(next));
    } catch {
    }
    setSavedBookings(next);
  }

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusKind(null);
    setStatusMessage("");

    const submittedName = booking.name;

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });

      const result = (await response.json()) as {
        consultation?: SavedBooking;
        persisted?: boolean;
        error?: string;
        details?: Record<string, string[]>;
      };

      if (response.status === 422) {
        const firstError = result.details
          ? Object.values(result.details).flat()[0]
          : result.error ?? "Please check your details.";
        setStatusKind("error");
        setStatusMessage(firstError ?? "Please check your details.");
        return;
      }

      if (!response.ok || !result.consultation) {
        setStatusKind("error");
        setStatusMessage(result.error ?? "Something went wrong. Please try again or call us directly.");
        return;
      }

      persistLocally(result.consultation);

      if (result.persisted === false) {
        setStatusKind("fallback");
        setStatusMessage(
          `Thanks, ${submittedName}. We've received your request and will be in touch within one business day.`
        );
      } else {
        setStatusKind("success");
        setStatusMessage(
          `Thanks, ${submittedName}. Your consultation has been booked. We'll reach out within one business day.`
        );
      }

      setBooking(INITIAL_BOOKING(selectedPlan));
    } catch {
      setStatusKind("error");
      setStatusMessage("Unable to reach the server. Please try again or call us directly at +1 555 019 8842.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handlePlanChange(name: Plan["name"]) {
    onPlanSelect(name);
    setBooking((prev) => ({ ...prev, plan: name }));
  }

  return (
    <section id="book" className="section booking-section">
      <div>
        <p className="eyebrow">Free Consultation</p>
        <h2>Tell us your goal. We&apos;ll map your first week.</h2>
        <p>
          Share your training goal and we&apos;ll put together a personalized plan, walk you through the facilities,
          and get your first session scheduled — no pressure, no sales pitch.
        </p>
        <div className="contact-lines" id="contact">
          <span>
            <Phone size={19} /> +1 555 019 8842
          </span>
          <span>
            <Mail size={19} /> hello@forgefit.example
          </span>
          <span>
            <MapPin size={19} /> 118 Market Street, Austin
          </span>
          <span>
            <MessageCircle size={19} /> Replies within one business day
          </span>
        </div>
      </div>

      <form className="booking-form" onSubmit={submitBooking} noValidate>
        <label>
          Full name
          <input
            required
            value={booking.name}
            onChange={(e) => setBooking({ ...booking, name: e.target.value })}
            placeholder="Alex Morgan"
            minLength={2}
            maxLength={100}
          />
        </label>
        <label>
          Email
          <input
            required
            type="email"
            value={booking.email}
            onChange={(e) => setBooking({ ...booking, email: e.target.value })}
            placeholder="alex@example.com"
            maxLength={254}
          />
        </label>
        <label>
          Phone
          <input
            required
            value={booking.phone}
            onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
            placeholder="+1 555 000 0000"
            maxLength={20}
          />
        </label>
        <label>
          Main goal
          <select value={booking.goal} onChange={(e) => setBooking({ ...booking, goal: e.target.value })}>
            <option>Build muscle</option>
            <option>Lose fat</option>
            <option>Improve endurance</option>
            <option>Move pain-free</option>
            {CLASSES.map((item) => (
              <option key={item.title}>{item.title}</option>
            ))}
          </select>
        </label>
        <label>
          Membership
          <select
            value={booking.plan}
            onChange={(e) => handlePlanChange(e.target.value as Plan["name"])}
          >
            {PLANS.map((plan) => (
              <option key={plan.name}>{plan.name}</option>
            ))}
          </select>
        </label>
        <button className="primary-button full-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Consultation"}
          <CalendarDays size={19} />
        </button>

        {statusMessage && (
          <p
            className={`status-message ${statusKind === "error" ? "status-error" : ""}`}
            role="alert"
            aria-live="polite"
          >
            {statusMessage}
          </p>
        )}

        {savedBookings.length > 0 && (
          <div className="saved-bookings">
            <strong>Recent requests</strong>
            {savedBookings.map((item, index) => (
              <span key={`${item.email}-${index}`}>
                {item.name} — {item.plan}
              </span>
            ))}
          </div>
        )}
      </form>
    </section>
  );
}
