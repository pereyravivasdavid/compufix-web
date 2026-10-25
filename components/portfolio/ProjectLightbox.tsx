"use client";

import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { ProjectMedia } from "@/lib/projects";

function Flecha({ invertida }: { invertida?: boolean }) {
  return (
    <svg
      className={`w-5 h-5 ${invertida ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function urlEmbed(url: string) {
  const limpia = url.split("?")[0].replace(/\/+$/, "");
  const coincidencia = limpia.match(
    /instagram\.com\/(?:reel|reels|p|tv)\/([A-Za-z0-9_-]+)/,
  );
  return coincidencia
    ? `https://www.instagram.com/reel/${coincidencia[1]}/embed/`
    : limpia;
}

export default function ProjectLightbox({
  media,
  index,
  label,
  open,
  onChange,
  onClose,
  format = "desktop",
}: {
  media: ProjectMedia[];
  index: number;
  label: string;
  open: boolean;
  onChange: (index: number) => void;
  onClose: () => void;
  format?: "desktop" | "mobile";
}) {
  const total = media.length;
  const esMovil = format === "mobile";
  const medio = media[index];
  const esReel = medio?.kind === "reel";

  useEffect(() => {
    if (!open) return;

    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const alPresionar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") onClose();
      if (evento.key === "ArrowLeft") {
        onChange((index - 1 + total) % total);
      }
      if (evento.key === "ArrowRight") {
        onChange((index + 1) % total);
      }
    };

    window.addEventListener("keydown", alPresionar);
    return () => {
      document.body.style.overflow = overflowPrevio;
      window.removeEventListener("keydown", alPresionar);
    };
  }, [open, index, total, onChange, onClose]);

  const contenido = (
    <AnimatePresence>
      {open && medio && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={
            esReel ? `Reel de ${label}` : `Captura ampliada de ${label}`
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar captura ampliada"
            className="absolute top-3 right-3 md:top-6 md:right-6 z-30 w-11 h-11 flex items-center justify-center rounded-full border border-white/25 bg-black/80 text-white shadow-lg backdrop-blur-sm hover:bg-black hover:border-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <motion.div
            initial={{ scale: 0.96, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={(evento) => evento.stopPropagation()}
            className={`relative ${
              esReel
                ? "w-[min(92vw,47.8125vh)] aspect-[9/16] bg-black"
                : esMovil
                  ? "h-[85vh] max-w-[92vw] aspect-[1080/2340] bg-[#0A0A0A] border border-zinc-800"
                  : "w-full max-w-6xl aspect-[16/10] bg-[#0A0A0A] border border-zinc-800"
            }`}
          >
            {medio.kind === "reel" ? (
              <iframe
                key={medio.src}
                src={urlEmbed(medio.src)}
                title={`Reel de ${label}`}
                className="absolute inset-0 h-full w-full"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <Image
                src={medio.src}
                alt={medio.alt}
                fill
                sizes="95vw"
                className="object-contain"
              />
            )}
          </motion.div>

          {medio.kind === "reel" && (
            <a
              href={medio.src}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(evento) => evento.stopPropagation()}
              className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-[10px] font-mono uppercase tracking-widest text-zinc-400 hover:text-[#E1F030] border-b border-zinc-700 hover:border-[#E1F030] pb-0.5 transition-colors"
            >
              Ver en Instagram
            </a>
          )}

          <button
            type="button"
            onClick={(evento) => {
              evento.stopPropagation();
              onChange((index - 1 + total) % total);
            }}
            aria-label="Captura anterior"
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-zinc-700 bg-black/60 text-zinc-300 hover:border-white hover:text-white transition-colors"
          >
            <Flecha invertida />
          </button>

          <button
            type="button"
            onClick={(evento) => {
              evento.stopPropagation();
              onChange((index + 1) % total);
            }}
            aria-label="Captura siguiente"
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-zinc-700 bg-black/60 text-zinc-300 hover:border-white hover:text-white transition-colors"
          >
            <Flecha />
          </button>

          <span className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 text-[11px] font-mono tracking-widest text-zinc-400 tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof document === "undefined") return null;

  return createPortal(contenido, document.body);
}
