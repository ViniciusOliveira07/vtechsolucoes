import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import { blogIndex } from "./vite-blog-index";

// Build do site: TanStack Start (SSR) + Tailwind v4, empacotado pelo Nitro como Worker da Cloudflare.
export default defineConfig(({ command }) => ({
  plugins: [
    // índice leve dos artigos do blog (o texto completo é baixado só na página do artigo)
    blogIndex(),
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // Código em pastas server/ (ou que importe "server-only") nunca vai para o navegador.
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
    }),
    // O Nitro só entra no build de produção; o dev server usa o servidor do Vite.
    ...(command === "build" ? [nitro({ defaultPreset: "cloudflare-module" })] : []),
    react(),
  ],
  // Lightning CSS também no dev, para o CSS do preview ser igual ao do build.
  css: { transformer: "lightningcss" },
  resolve: {
    alias: { "@": `${process.cwd()}/src` },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  server: {
    host: "::",
    port: 8080,
    watch: { awaitWriteFinish: { stabilityThreshold: 1000, pollInterval: 100 } },
  },
}));
