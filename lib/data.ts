import { Target, BadgeCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Plan = {
  name: "Starter" | "Performance" | "Elite Coaching";
  price: number;
  highlight?: boolean;
  description: string;
  perks: string[];
};

export type ClassItem = {
  title: string;
  category: "Strength" | "Cardio" | "Recovery" | "Combat";
  time: string;
  coach: string;
  level: string;
  spots: number;
};

export type Trainer = {
  name: string;
  role: string;
  image: string;
  stats: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type Outcome = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=85";

export const STUDIO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85",
    alt: "Athlete lifting a barbell in a strength gym",
  },
  {
    src: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=900&q=85",
    alt: "Trainer coaching battle rope conditioning",
  },
  {
    src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=85",
    alt: "Modern gym floor with cardio and strength machines",
  },
];

export const OUTCOMES: Outcome[] = [
  {
    icon: Target,
    title: "Goal-first onboarding",
    text: "Every new member gets a movement screen, training roadmap, and measurable 30-day target.",
  },
  {
    icon: BadgeCheck,
    title: "Coach-led accountability",
    text: "Members can train solo, join classes, or follow coach-reviewed programming inside one club.",
  },
  {
    icon: Sparkles,
    title: "Premium member experience",
    text: "Clean facilities, fast check-ins, recovery support, and a team that remembers member goals.",
  },
];

export const PLANS: Plan[] = [
  {
    name: "Starter",
    price: 39,
    description: "Flexible access for self-guided training.",
    perks: ["Open gym access", "Locker room", "2 class passes", "Fitness assessment"],
  },
  {
    name: "Performance",
    price: 79,
    highlight: true,
    description: "Best for consistent training and class variety.",
    perks: ["Unlimited classes", "Open gym access", "Monthly body scan", "Nutrition check-in"],
  },
  {
    name: "Elite Coaching",
    price: 149,
    description: "Personal support for measurable body recomposition.",
    perks: ["4 PT sessions", "Unlimited classes", "Custom program", "Priority booking"],
  },
];

export const CLASSES: ClassItem[] = [
  { title: "Power Build", category: "Strength", time: "06:00 AM", coach: "Maya", level: "All levels", spots: 8 },
  { title: "Engine Room", category: "Cardio", time: "07:30 AM", coach: "Leo", level: "Intermediate", spots: 5 },
  { title: "Mobility Reset", category: "Recovery", time: "12:15 PM", coach: "Nora", level: "Beginner", spots: 12 },
  { title: "BoxFit Rounds", category: "Combat", time: "06:30 PM", coach: "Andre", level: "All levels", spots: 6 },
  { title: "Barbell Club", category: "Strength", time: "08:00 PM", coach: "Maya", level: "Advanced", spots: 4 },
];

export const TRAINERS: Trainer[] = [
  {
    name: "Maya Stone",
    role: "Strength Coach",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=700&q=85",
    stats: "8 yrs coaching",
  },
  {
    name: "Leo Grant",
    role: "Conditioning Lead",
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=700&q=85",
    stats: "HYROX specialist",
  },
  {
    name: "Nora Kim",
    role: "Mobility Specialist",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=700&q=85",
    stats: "Corrective exercise",
  },
];

export const FACILITIES = [
  "Olympic lifting platforms",
  "Strength machines",
  "Conditioning turf",
  "Recovery lounge",
  "Body composition scans",
  "Private PT suites",
  "Secure lockers",
  "Smoothie bar",
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "ForgeFit feels premium without being intimidating. The coaches made my first month simple, measurable, and actually fun.",
    name: "Ari Patel",
    detail: "Lost 18 lb in 14 weeks",
  },
  {
    quote:
      "I came for the equipment and stayed for the programming. Classes are organized, intense, and never random.",
    name: "Cam Rivera",
    detail: "Member since 2024",
  },
  {
    quote:
      "The consultation gave me a real plan instead of a sales pitch. That is what made me sign up the same day.",
    name: "Jordan Blake",
    detail: "Elite Coaching member",
  },
];

export const FAQS: Faq[] = [
  {
    question: "Can beginners join ForgeFit?",
    answer:
      "Absolutely. Every new member starts with a coach conversation and a movement screen so we can match your training to your current fitness level from day one.",
  },
  {
    question: "Do memberships include classes?",
    answer:
      "Starter includes 2 class passes per month, while Performance and Elite Coaching memberships include unlimited access to all scheduled classes.",
  },
  {
    question: "How does personal training work?",
    answer:
      "Elite Coaching includes 4 dedicated PT sessions per month with a specialist coach. Additional sessions can be added to any plan at a discounted member rate.",
  },
  {
    question: "Is there a contract or commitment?",
    answer:
      "No long-term contracts. All plans are month-to-month and can be paused or cancelled with 7 days notice. Your 7-day trial is completely free, no card required.",
  },
];

export const CATEGORY_OPTIONS = ["All", "Strength", "Cardio", "Recovery", "Combat"] as const;
export type CategoryOption = (typeof CATEGORY_OPTIONS)[number];
