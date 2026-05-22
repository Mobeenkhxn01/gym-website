"use client";

import Image from "next/image";
import {
  Activity,
  ArrowRight,
  Award,
  BadgeCheck,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Clock,
  Dumbbell,
  HeartPulse,
  Mail,
  MessageCircle,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  UserRound,
  X,
  Zap
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

type Plan = {
  name: string;
  price: number;
  highlight?: boolean;
  description: string;
  perks: string[];
};

type ClassItem = {
  title: string;
  category: "Strength" | "Cardio" | "Recovery" | "Combat";
  time: string;
  coach: string;
  level: string;
  spots: number;
};

type Booking = {
  name: string;
  email: string;
  phone: string;
  goal: string;
  plan: string;
};

type SavedBooking = Booking & {
  id?: string;
  createdAt?: string;
};

const heroImage =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=85";

const studioImages = [
  {
    src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85",
    alt: "Athlete lifting a barbell in a strength gym"
  },
  {
    src: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=900&q=85",
    alt: "Trainer coaching battle rope conditioning"
  },
  {
    src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=85",
    alt: "Modern gym floor with cardio and strength machines"
  }
];

const outcomes = [
  {
    icon: Target,
    title: "Goal-first onboarding",
    text: "Every new member gets a movement screen, training roadmap, and measurable 30-day target."
  },
  {
    icon: BadgeCheck,
    title: "Coach-led accountability",
    text: "Members can train solo, join classes, or follow coach-reviewed programming inside one club."
  },
  {
    icon: Sparkles,
    title: "Premium member experience",
    text: "Clean facilities, fast check-ins, recovery support, and a team that remembers member goals."
  }
];

const plans: Plan[] = [
  {
    name: "Starter",
    price: 39,
    description: "Flexible access for self-guided training.",
    perks: ["Open gym access", "Locker room", "2 class passes", "Fitness assessment"]
  },
  {
    name: "Performance",
    price: 79,
    highlight: true,
    description: "Best for consistent training and class variety.",
    perks: ["Unlimited classes", "Open gym access", "Monthly body scan", "Nutrition check-in"]
  },
  {
    name: "Elite Coaching",
    price: 149,
    description: "Personal support for measurable body recomposition.",
    perks: ["4 PT sessions", "Unlimited classes", "Custom program", "Priority booking"]
  }
];

const classes: ClassItem[] = [
  {
    title: "Power Build",
    category: "Strength",
    time: "06:00 AM",
    coach: "Maya",
    level: "All levels",
    spots: 8
  },
  {
    title: "Engine Room",
    category: "Cardio",
    time: "07:30 AM",
    coach: "Leo",
    level: "Intermediate",
    spots: 5
  },
  {
    title: "Mobility Reset",
    category: "Recovery",
    time: "12:15 PM",
    coach: "Nora",
    level: "Beginner",
    spots: 12
  },
  {
    title: "BoxFit Rounds",
    category: "Combat",
    time: "06:30 PM",
    coach: "Andre",
    level: "All levels",
    spots: 6
  },
  {
    title: "Barbell Club",
    category: "Strength",
    time: "08:00 PM",
    coach: "Maya",
    level: "Advanced",
    spots: 4
  }
];

const trainers = [
  {
    name: "Maya Stone",
    role: "Strength Coach",
    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=700&q=85",
    stats: "8 yrs coaching"
  },
  {
    name: "Leo Grant",
    role: "Conditioning Lead",
    image:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=700&q=85",
    stats: "HYROX specialist"
  },
  {
    name: "Nora Kim",
    role: "Mobility Specialist",
    image:
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=700&q=85",
    stats: "Corrective exercise"
  }
];

const facilities = [
  "Olympic lifting platforms",
  "Strength machines",
  "Conditioning turf",
  "Recovery lounge",
  "Body composition scans",
  "Private PT suites",
  "Secure lockers",
  "Smoothie bar"
];

const testimonials = [
  {
    quote:
      "ForgeFit feels premium without being intimidating. The coaches made my first month simple, measurable, and actually fun.",
    name: "Ari Patel",
    detail: "Lost 18 lb in 14 weeks"
  },
  {
    quote:
      "I came for the equipment and stayed for the programming. Classes are organized, intense, and never random.",
    name: "Cam Rivera",
    detail: "Member since 2024"
  },
  {
    quote:
      "The consultation gave me a real plan instead of a sales pitch. That is what made me sign up the same day.",
    name: "Jordan Blake",
    detail: "Elite Coaching member"
  }
];

const faqs = [
  {
    question: "Can beginners join ForgeFit?",
    answer: "Absolutely. Every new member starts with a coach conversation and a movement screen so we can match your training to your current fitness level from day one."
  },
  {
    question: "Do memberships include classes?",
    answer: "Starter includes 2 class passes per month, while Performance and Elite Coaching memberships include unlimited access to all scheduled classes."
  },
  {
    question: "How does personal training work?",
    answer: "Elite Coaching includes 4 dedicated PT sessions per month with a specialist coach. Additional sessions can be added to any plan at a discounted member rate."
  },
  {
    question: "Is there a contract or commitment?",
    answer: "No long-term contracts. All plans are month-to-month and can be paused or cancelled with 7 days notice. Your 7-day trial is completely free, no card required."
  }
];

const categoryOptions = ["All", "Strength", "Cardio", "Recovery", "Combat"] as const;

export default function GymWebsite() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<(typeof categoryOptions)[number]>("All");
  const [selectedPlan, setSelectedPlan] = useState("Performance");
  const [booking, setBooking] = useState<Booking>({
    name: "",
    email: "",
    phone: "",
    goal: "Build muscle",
    plan: "Performance"
  });
  const [bookingStatus, setBookingStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [height, setHeight] = useState("175");
  const [weight, setWeight] = useState("75");
  const [savedBookings, setSavedBookings] = useState<SavedBooking[]>([]);

  useEffect(() => {
    const loadStoredBookings = () => {
      try {
        const stored = window.localStorage.getItem("forgefit-bookings");
        setSavedBookings(stored ? (JSON.parse(stored) as SavedBooking[]) : []);
      } catch {
        setSavedBookings([]);
      }
    };

    window.requestAnimationFrame(loadStoredBookings);
  }, []);

  const filteredClasses = useMemo(() => {
    if (activeCategory === "All") return classes;
    return classes.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const bmi = useMemo(() => {
    const heightMeters = Number(height) / 100;
    const weightKg = Number(weight);
    if (!heightMeters || !weightKg) return 0;
    return weightKg / (heightMeters * heightMeters);
  }, [height, weight]);

  const bmiLabel = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Healthy" : bmi < 30 ? "Overweight" : "Athletic review";

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setBookingStatus("");
    const submittedName = booking.name;

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(booking)
      });

      const result = (await response.json()) as {
        consultation?: SavedBooking;
        error?: string;
        persisted?: boolean;
      };

      if (!response.ok || !result.consultation) {
        throw new Error(result.error || "The database is not configured yet.");
      }

      const nextBookings = [result.consultation, ...savedBookings].slice(0, 5);
      window.localStorage.setItem("forgefit-bookings", JSON.stringify(nextBookings));
      setSavedBookings(nextBookings);
      setBookingStatus(
        result.persisted === false
          ? `Thanks, ${submittedName}. We've received your request and will be in touch within one business day.`
          : `Thanks, ${submittedName}. Your consultation has been booked. We'll reach out within one business day.`
      );
      setBooking({ name: "", email: "", phone: "", goal: "Build muscle", plan: selectedPlan });
    } catch (error) {
      const nextBookings = [{ ...booking, createdAt: new Date().toISOString() }, ...savedBookings].slice(0, 5);
      window.localStorage.setItem("forgefit-bookings", JSON.stringify(nextBookings));
      setSavedBookings(nextBookings);
      setBookingStatus(
        `Thanks, ${submittedName}. We've received your request and will be in touch within one business day.`
      );
      setBooking({ name: "", email: "", phone: "", goal: "Build muscle", plan: selectedPlan });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="ForgeFit home">
          <span className="brand-mark">
            <Dumbbell size={22} />
          </span>
          <span>ForgeFit</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#experience">Experience</a>
          <a href="#classes">Classes</a>
          <a href="#plans">Memberships</a>
          <a href="#coaches">Coaches</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-action" href="#book">
          Book Trial
          <ArrowRight size={18} />
        </a>
        <button className="icon-button mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>
      </header>

      {mobileOpen && (
        <div className="mobile-menu">
          <button className="icon-button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X size={22} />
          </button>
          <a onClick={() => setMobileOpen(false)} href="#classes">
            Classes
          </a>
          <a onClick={() => setMobileOpen(false)} href="#experience">
            Experience
          </a>
          <a onClick={() => setMobileOpen(false)} href="#plans">
            Memberships
          </a>
          <a onClick={() => setMobileOpen(false)} href="#coaches">
            Coaches
          </a>
          <a onClick={() => setMobileOpen(false)} href="#book">
            Book Trial
          </a>
        </div>
      )}

      <section id="home" className="hero">
        <Image src={heroImage} alt="ForgeFit gym training floor" fill priority className="hero-image" />
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

      <section className="partner-strip" aria-label="Program highlights">
        <span>Strength</span>
        <span>Conditioning</span>
        <span>Personal Training</span>
        <span>Recovery</span>
        <span>Nutrition</span>
      </section>

      <section className="quick-tools" aria-label="Fitness tools">
        <div className="tool-panel">
          <HeartPulse size={24} />
          <div>
            <h2>BMI Snapshot</h2>
            <p>Plan your consultation with a quick baseline.</p>
          </div>
          <label>
            Height
            <input value={height} onChange={(event) => setHeight(event.target.value)} inputMode="numeric" />
          </label>
          <label>
            Weight
            <input value={weight} onChange={(event) => setWeight(event.target.value)} inputMode="numeric" />
          </label>
          <output>
            <strong>{bmi ? bmi.toFixed(1) : "--"}</strong>
            <span>{bmiLabel}</span>
          </output>
        </div>
      </section>

      <section id="experience" className="section split-section">
        <div>
          <p className="eyebrow dark">Training Floor</p>
          <h2>Built for lifters, beginners, busy professionals, and comeback stories.</h2>
          <p>
            ForgeFit combines coached classes with open gym flexibility, recovery zones, body composition scans,
            and goal-specific programs. You can drop into a sweat session, train your own plan, or work directly
            with a coach.
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
          {studioImages.map((image) => (
            <Image key={image.src} src={image.src} alt={image.alt} width={420} height={320} />
          ))}
        </div>
      </section>

      <section className="section outcomes-section">
        <div className="section-heading compact-heading">
          <p className="eyebrow dark">Member Journey</p>
          <h2>From your first visit to the results you actually want.</h2>
        </div>
        <div className="outcome-grid">
          {outcomes.map((item) => {
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

      <section id="classes" className="section class-section">
        <div className="section-heading">
          <p className="eyebrow dark">Live Schedule</p>
          <h2>Book a class that matches today&apos;s energy.</h2>
        </div>
        <div className="category-tabs" role="tablist" aria-label="Class categories">
          {categoryOptions.map((category) => (
            <button
              key={category}
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
              <button type="button" onClick={() => setBooking((current) => ({ ...current, goal: item.title }))}>
                {item.spots} spots
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="facility-band">
        <div>
          <p className="eyebrow">Facilities</p>
          <h2>Every tool you need to train hard and recover well.</h2>
        </div>
        <div className="facility-list">
          {facilities.map((facility) => (
            <span key={facility}>
              <Check size={18} /> {facility}
            </span>
          ))}
        </div>
      </section>

      <section id="plans" className="section plans-section">
        <div className="section-heading">
          <p className="eyebrow dark">Memberships</p>
          <h2>Pick the level of support you want.</h2>
        </div>
        <div className="plans">
          {plans.map((plan) => (
            <article className={`plan ${plan.highlight ? "featured" : ""}`} key={plan.name}>
              {plan.highlight && <span className="plan-badge">Popular</span>}
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
              <div className="price">
                ${plan.price}
                <span>/mo</span>
              </div>
              <ul>
                {plan.perks.map((perk) => (
                  <li key={perk}>
                    <Check size={18} /> {perk}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => {
                  setSelectedPlan(plan.name);
                  setBooking((current) => ({ ...current, plan: plan.name }));
                }}
              >
                {selectedPlan === plan.name ? "Selected" : "Choose Plan"}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="coaches" className="section coach-section">
        <div className="section-heading">
          <p className="eyebrow dark">Coaches</p>
          <h2>Train with specialists who know how to adapt.</h2>
        </div>
        <div className="coach-grid">
          {trainers.map((trainer) => (
            <article className="coach-card" key={trainer.name}>
              <Image src={trainer.image} alt={`${trainer.name}, ${trainer.role}`} width={430} height={520} />
              <div>
                <h3>{trainer.name}</h3>
                <p>{trainer.role}</p>
                <span>
                  <Star size={16} /> {trainer.stats}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="section-heading compact-heading">
          <p className="eyebrow dark">Member Stories</p>
          <h2>Real results from real members.</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
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

      <section className="section faq-section">
        <div>
          <p className="eyebrow dark">Questions</p>
          <h2>Answers before your first visit.</h2>
          <p>
            Everything you need to know about memberships, classes, coaching, and getting started at ForgeFit.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                <CircleHelp size={19} /> {faq.question}
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

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
        <form className="booking-form" onSubmit={submitBooking}>
          <label>
            Full name
            <input
              required
              value={booking.name}
              onChange={(event) => setBooking({ ...booking, name: event.target.value })}
              placeholder="Alex Morgan"
            />
          </label>
          <label>
            Email
            <input
              required
              type="email"
              value={booking.email}
              onChange={(event) => setBooking({ ...booking, email: event.target.value })}
              placeholder="alex@example.com"
            />
          </label>
          <label>
            Phone
            <input
              required
              value={booking.phone}
              onChange={(event) => setBooking({ ...booking, phone: event.target.value })}
              placeholder="+1 555 000 0000"
            />
          </label>
          <label>
            Main goal
            <select value={booking.goal} onChange={(event) => setBooking({ ...booking, goal: event.target.value })}>
              <option>Build muscle</option>
              <option>Lose fat</option>
              <option>Improve endurance</option>
              <option>Move pain-free</option>
              {classes.map((item) => (
                <option key={item.title}>{item.title}</option>
              ))}
            </select>
          </label>
          <label>
            Membership
            <select
              value={booking.plan}
              onChange={(event) => {
                setSelectedPlan(event.target.value);
                setBooking({ ...booking, plan: event.target.value });
              }}
            >
              {plans.map((plan) => (
                <option key={plan.name}>{plan.name}</option>
              ))}
            </select>
          </label>
          <button className="primary-button full-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Consultation"}
            <CalendarDays size={19} />
          </button>
          {bookingStatus && <p className="status-message">{bookingStatus}</p>}
          {savedBookings.length > 0 && (
            <div className="saved-bookings">
              <strong>Recent requests</strong>
              {savedBookings.map((item, index) => (
                <span key={`${item.email}-${index}`}>
                  {item.name} - {item.plan}
                </span>
              ))}
            </div>
          )}
        </form>
      </section>

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
    </main>
  );
}
