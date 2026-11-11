import { useEffect, useRef, useState } from "react";

/**
 * Pontinhos de posição para a faixa que vem logo antes (no celular os grupos de cartões deslizam
 * para o lado). Mostram quantos cartões há e em qual você está; tocar num ponto leva ao cartão.
 * No desktop ficam escondidos pelo CSS (lá as faixas são grade).
 */
export function SwipeDots({ count }: { count: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);

  const items = () => {
    const strip = ref.current?.previousElementSibling as HTMLElement | null;
    if (!strip) return { strip: null, list: [] as HTMLElement[] };
    const list = [...strip.children].flatMap((c) =>
      getComputedStyle(c).display === "contents" ? ([...c.children] as HTMLElement[]) : [c as HTMLElement],
    );
    return { strip, list };
  };

  useEffect(() => {
    const { strip } = items();
    if (!strip) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const { list } = items();
      const x = strip.scrollLeft;
      let c = 0;
      list.forEach((it, i) => {
        if (it.offsetLeft - strip.offsetLeft - 16 <= x + 8) c = i;
      });
      if (x + strip.clientWidth >= strip.scrollWidth - 4) c = list.length - 1;
      setCur(c);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    strip.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      strip.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (count < 2) return null;
  return (
    <div ref={ref} className="vt-dots" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          tabIndex={-1}
          data-on={i === cur}
          onClick={() => {
            const { strip, list } = items();
            const it = list[i];
            if (strip && it) strip.scrollTo({ left: it.offsetLeft - strip.offsetLeft - 16, behavior: "smooth" });
          }}
        />
      ))}
    </div>
  );
}
