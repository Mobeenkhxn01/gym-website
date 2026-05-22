"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Dumbbell, Menu, X } from "lucide-react";

type Props = {
  mobileOpen: boolean;
  onMobileOpen: () => void;
  onMobileClose: () => void;
};

export default function SiteHeader({ mobileOpen, onMobileOpen, onMobileClose }: Props) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];

    first?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onMobileClose();
        return;
      }
      if (event.key !== "Tab") return;
      if (!focusable || focusable.length === 0) return;

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, onMobileClose]);

  const navLinks = [
    { href: "#experience", label: "Experience" },
    { href: "#classes", label: "Classes" },
    { href: "#plans", label: "Memberships" },
    { href: "#coaches", label: "Coaches" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="ForgeFit home">
          <span className="brand-mark">
            <Dumbbell size={22} />
          </span>
          <span>ForgeFit</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="header-action" href="#book">
          Book Trial
          <ArrowRight size={18} />
        </a>
        <button
          className="icon-button mobile-toggle"
          onClick={onMobileOpen}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <Menu size={22} />
        </button>
      </header>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          ref={menuRef}
        >
          <button className="icon-button" onClick={onMobileClose} aria-label="Close menu">
            <X size={22} />
          </button>
          {navLinks.map((link) => (
            <a key={link.href} onClick={onMobileClose} href={link.href}>
              {link.label}
            </a>
          ))}
          <a onClick={onMobileClose} href="#book">
            Book Trial
          </a>
        </div>
      )}
    </>
  );
}
