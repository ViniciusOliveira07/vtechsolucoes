import { Events } from "@/lib/analytics";

const WHATSAPP_NUMBER = "551154441926";
const WHATSAPP_MESSAGE = "Olá! Vim pelo site da Vtech Soluções e gostaria de conversar sobre um projeto.";

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      onClick={() => Events.whatsappClick(typeof window !== "undefined" ? window.location.pathname : "")}
      className="group fixed bottom-6 right-6 z-40 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_40px_-6px_rgba(37,211,102,0.65)] transition-all duration-300 hover:scale-110 hover:shadow-[0_18px_50px_-8px_rgba(37,211,102,0.85)] sm:bottom-7 sm:right-7 sm:h-[68px] sm:w-[68px]"
    >
      {/* pulse ring with larger halo */}
      <span
        aria-hidden
        className="absolute -inset-1 rounded-full bg-[#25D366] opacity-60 animate-ping"
        style={{ animationDuration: "2.5s" }}
      />
      {/* WhatsApp official glyph */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="relative h-8 w-8 fill-white transition-transform duration-300 group-hover:scale-110 sm:h-9 sm:w-9"
        aria-hidden
      >
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.014-.215-.1-.172-2.434-1.39-2.692-1.39zm-2.32 7.156c-1.732 0-3.41-.53-4.84-1.49L7.474 24.36l1.32-3.917a8.793 8.793 0 0 1-1.692-5.207 8.79 8.79 0 0 1 8.797-8.798c2.348 0 4.555.917 6.215 2.578a8.738 8.738 0 0 1 2.563 6.22c0 4.84-3.953 8.792-8.797 8.792zm0-19.288C10.95 5.073 6.07 9.95 6.07 15.85c0 1.972.53 3.913 1.535 5.6L6.04 26.043 11 24.51a10.846 10.846 0 0 0 5.18 1.32c5.9 0 10.78-4.876 10.792-10.78 0-2.864-1.122-5.557-3.156-7.586a10.667 10.667 0 0 0-7.6-3.156z" />
      </svg>
    </a>
  );
}
