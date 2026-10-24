"use client";

import Image from "next/image";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ProjectImage } from "@/lib/projects";

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

export default function ProjectLightbox({
  images,
  index,
  label,
  open,
  onChange,
  onClose,
  format = "desktop",
}: {
  images: ProjectImage[];
  index: number;
  label: string;
  open: boolean;
  onChange: (index: number) => void;
  onClose: () => void;
  format?: "desktop" | "mobile";
}) {
  const total = images.length;
  const esMovil = format === "mobile";

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

  const imagen = images[index];

  return (
    <AnimatePresence>
      {open && imagen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Captura ampliada de ${label}`}
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
            className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 flex items-center justify-center border border-zinc-700 text-zinc-300 hover:border-white hover:text-white transition-colors"
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
            className={`relative bg-[#0A0A0A] border border-zinc-800 ${
              esMovil
                ? "h-[85vh] max-w-[92vw] aspect-[1080/2340]"
                : "w-full max-w-6xl aspect-[16/10]"
            }`}
          >
            <Image
              src={imagen.src}
              alt={imagen.alt}
              fill
              sizes="95vw"
              className="object-contain"
            />
          </motion.div>

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
}
