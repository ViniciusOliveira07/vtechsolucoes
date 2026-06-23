import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/" as const, label: "Início" },
  { to: "/servicos" as const, label: "Serviços" },
  { to: "/contato" as const, label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-5 md:top-7 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[1180px] -translate-x-1/2"
      >
        <div
          className={cn(
            "relative rounded-full border border-white/10 bg-black/55 backdrop-blur-2xl backdrop-saturate-150 transition-shadow duration-500",
            scrolled
              ? "shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.1)]"
              : "shadow-[0_14px_48px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)]",
          )}
        >
          <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="flex h-[64px] items-center justify-between pl-5 pr-3 md:h-[72px] md:pl-8 md:pr-4">
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-3">
              <div className="relative h-9 w-9">
                <div className="absolute inset-0 rounded-lg bg-primary shadow-[0_0_20px_rgba(10,132,255,0.4)] transition-transform duration-500 group-hover:rotate-45" />
                <div className="absolute inset-[5px] rounded-md bg-background" />
                <div className="absolute inset-[10px] rounded-[3px] bg-primary" />
              </div>
              <span className="text-[16px] font-semibold tracking-tight">
                Vtech<span className="text-primary"> Soluções</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden items-center gap-1 md:flex"
              onMouseLeave={() => setHoveredNav(null)}
            >
              {NAV.map((item) => {
                const isActive = currentPath === item.to || (item.to === "/servicos" && currentPath.startsWith("/servicos"));
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="relative px-4 py-2 text-[14px] font-medium transition-colors duration-200"
                    onMouseEnter={() => setHoveredNav(item.to)}
                  >
                    {hoveredNav === item.to && (
                      <motion.span
                        layoutId="nav-hover-bg"
                        className="absolute inset-0 rounded-full bg-white/[0.08]"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
                      />
                    )}
                    {isActive && hoveredNav !== item.to && (
                      <span className="absolute inset-0 rounded-full bg-white/[0.05]" />
                    )}
                    <span className={cn("relative z-10", isActive ? "text-foreground" : "text-white/60")}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* CTA */}
            <div className="hidden md:block">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{ display: "inline-block" }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.25 }}
              >
                <Link
                  to="/contato"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_0_20px_-4px_oklch(0.62_0.21_258_/_0.7)] transition-shadow duration-300 hover:shadow-[0_0_28px_-2px_oklch(0.7_0.22_255_/_0.9)]"
                >
                  Iniciar projeto
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            </div>

            {/* Mobile toggle */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full text-foreground transition-colors hover:bg-white/[0.08] md:hidden"
              onClick={() => setOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-background md:hidden"
          >
            <div className="flex h-16 items-center justify-between border-b border-border px-6">
              <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
                <div className="relative h-8 w-8">
                  <div className="absolute inset-0 rounded-lg bg-primary" />
                  <div className="absolute inset-[5px] rounded-md bg-background" />
                  <div className="absolute inset-[10px] rounded-[3px] bg-primary" />
                </div>
                <span className="text-[15px] font-semibold tracking-tight">
                  Vtech<span className="text-primary"> Soluções</span>
                </span>
              </Link>
              <motion.button
                whileTap={{ scale: 0.92 }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong transition-colors hover:bg-white/5"
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            <nav className="flex flex-col gap-1 px-4 pt-6">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between rounded-xl px-4 py-4 text-display-md transition-colors hover:bg-white/5 hover:text-primary"
                  >
                    {item.label}
                    <ArrowRight className="h-5 w-5 -translate-x-1 text-primary opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-10 left-6 right-6"
            >
              <Link to="/contato" onClick={() => setOpen(false)}>
                <motion.span
                  whileTap={{ scale: 0.97 }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-[15px] font-semibold text-white shadow-[0_0_30px_-6px_oklch(0.62_0.21_258_/_0.8)]"
                  style={{ display: "flex" }}
                >
                  Iniciar projeto
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
