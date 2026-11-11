import { useEffect, useRef, useState, type RefObject } from "react";

/** true quando o visitante pediu menos movimento no sistema. */
export function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const on = () => setReduce(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduce;
}

/** Fica true (uma vez) quando o elemento entra na tela. */
export function useSeen<T extends Element>(threshold = 0.35): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, threshold]);
  return [ref, seen];
}

/** Chama fn a cada rolagem/redimensionamento, no máximo uma vez por quadro. */
export function useScrollFrame(fn: () => void, deps: unknown[] = []) {
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      fn();
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    fn();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
