import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { motion } from "framer-motion";

const nav = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/experiencia", label: "Experiência" },
  { to: "/cases", label: "Cases" },
  { to: "/projetos", label: "Projetos" },
  { to: "/simulador", label: "Simulador" },
  { to: "/contato", label: "Contato" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="aurora" aria-hidden />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link to="/" className="font-display text-lg font-semibold tracking-tight">
            Matheus<span className="text-gradient">.ai</span>
          </Link>
          <nav className="hidden gap-1 md:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className="rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:text-foreground" activeProps={{ className: "bg-secondary text-foreground" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
        </div>
        {open && (
          <nav className="flex flex-col border-t border-border/60 px-5 py-3 md:hidden">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2 text-muted-foreground">{n.label}</Link>
            ))}
          </nav>
        )}
      </header>
      <motion.main initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative pt-16">{children}</motion.main>
      <footer className="relative border-t border-border/60 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-sm text-muted-foreground md:flex-row">
          <p>© 2026 {profile.name}</p>
          <div className="flex flex-wrap gap-5">
            {profile.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="hover:text-accent">{l.label}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PageHeader({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text?: string }) {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-10 pt-20 fade-up">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-6xl">{title}</h1>
      {text && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{text}</p>}
    </section>
  );
}
