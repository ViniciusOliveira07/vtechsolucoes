import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
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
      <header
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
          {/* sutil top highlight line */}
          <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="flex h-[64px] items-center justify-between pl-5 pr-3 md:h-[72px] md:pl-8 md:pr-4">
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

            <nav className="hidden items-center gap-8 md:flex">
              {NAV.map((item) => {
                const isActive = currentPath === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "text-[14px] font-medium transition-colors duration-300",
                      isActive
                        ? "text-foreground"
                        : "text-white/60 hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:block">
              <Link
                to="/contato"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-6 py-2.5 text-[14px] font-medium text-foreground transition-all duration-300 hover:bg-white/10 hover:border-white/30"
              >
                Iniciar projeto
              </Link>
            </div>

            <button
              className="md:hidden inline-flex h-12 w-12 items-center justify-center rounded-full text-foreground transition-colors hover:bg-white/[0.08]"
              onClick={() => setOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-background md:hidden"
          >
            <div className="flex h-16 items-center justify-between px-6">
              <span className="text-[15px] font-semibold tracking-tight">
                Vtech<span className="text-primary"> Soluções</span>
              </span>
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong"
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-2 px-6 pt-10">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="text-display-md block py-2 transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV.length * 0.06, duration: 0.5 }}
                className="pt-6"
              >
                <Link
                  to="/contato"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-transparent px-5 py-3 text-[14px] font-medium text-foreground transition-all hover:bg-white/10"
                >
                  Iniciar projeto
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
