"use client";

import Image from "next/image";
import {
  useCallback,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ProjectMedia } from "@/lib/projects";
import ProjectLightbox from "./ProjectLightbox";

function IconoFlecha({ direccion }: { direccion: "izquierda" | "derecha" }) {
  return (
    <svg
      className={`w-4 h-4 ${direccion === "izquierda" ? "rotate-180" : ""}`}
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

function IconoInstagram() {
  return (
    <svg
      className="w-3 h-3"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function ProjectCarousel({
  media,
  label,
  format = "desktop",
}: {
  media: ProjectMedia[];
  label: string;
  format?: "desktop" | "mobile";
}) {
  const [index, setIndex] = useState(0);
  const [lightboxAbierto, setLightboxAbierto] = useState(false);
  const reduceMotion = useReducedMotion();
  const esMovil = format === "mobile";
  const paso = esMovil ? 86 : 70;

  const inicio = useRef<{ x: number; y: number } | null>(null);
  const arrastrado = useRef(false);

  const total = media.length;

  const anterior = useCallback(
    () => setIndex((actual) => (actual - 1 + total) % total),
    [total],
  );
  const siguiente = useCallback(
    () => setIndex((actual) => (actual + 1) % total),
    [total],
  );

  const onPointerDown = (evento: ReactPointerEvent) => {
    inicio.current = { x: evento.clientX, y: evento.clientY };
    arrastrado.current = false;
  };

  const onPointerMove = (evento: ReactPointerEvent) => {
    if (!inicio.current) return;
    if (Math.abs(evento.clientX - inicio.current.x) > 10) {
      arrastrado.current = true;
    }
  };

  const onPointerUp = (evento: ReactPointerEvent) => {
    const punto = inicio.current;
    inicio.current = null;
    if (!punto) return;

    const dx = evento.clientX - punto.x;
    const dy = evento.clientY - punto.y;

    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) siguiente();
      else anterior();
    }
  };

  const abrirLightbox = (indice: number) => {
    if (arrastrado.current) return;
    if (indice === index) setLightboxAbierto(true);
    else setIndex(indice);
  };

  const progreso = total > 1 ? ((index + 1) / total) * 100 : 100;

  return (
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label={`Capturas de ${label}`}
      tabIndex={0}
      onKeyDown={(evento) => {
        if (evento.key === "ArrowLeft") {
          evento.preventDefault();
          evento.stopPropagation();
          anterior();
        }
        if (evento.key === "ArrowRight") {
          evento.preventDefault();
          evento.stopPropagation();
          siguiente();
        }
      }}
      className="relative select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E1F030]/60"
    >
      <div
        className="relative overflow-hidden"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          inicio.current = null;
        }}
      >
        <div
          className={`relative w-full ${
            esMovil ? "h-[min(72vh,600px)]" : "aspect-[16/10]"
          }`}
          style={{ perspective: "1600px" }}
        >
          {media.map((item, i) => {
            const offset = i - index;
            const distancia = Math.abs(offset);
            const visible = distancia <= 2;
            const activo = offset === 0;
            const esReel = item.kind === "reel";
            const poster = esReel ? item.poster : item.src;

            return (
              <motion.button
                key={`${item.kind}-${i}`}
                type="button"
                onClick={() => abrirLightbox(i)}
                aria-label={
                  esReel
                    ? activo
                      ? `Reproducir reel de ${label}`
                      : `Ver reel de ${label}`
                    : activo
                      ? `Ampliar captura ${i + 1} de ${total}`
                      : `Ver captura ${i + 1} de ${total}`
                }
                aria-hidden={!visible}
                tabIndex={activo ? 0 : -1}
                initial={false}
                animate={{
                  x: `calc(${offset * paso}% - 50%)`,
                  rotateY: reduceMotion ? 0 : offset > 0 ? -22 : offset < 0 ? 22 : 0,
                  scale: activo ? 1 : Math.max(0.8, 1 - distancia * 0.08),
                  opacity: visible ? (activo ? 1 : 0.55) : 0,
                  filter: activo ? "blur(0px)" : "blur(2px)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 160,
                  damping: 24,
                  mass: 0.7,
                }}
                style={{
                  transformStyle: "preserve-3d",
                  zIndex: 10 - distancia,
                  pointerEvents: visible ? "auto" : "none",
                }}
                className={`absolute top-0 left-1/2 h-full ${
                  esMovil ? "aspect-[1080/2340]" : "w-[78%]"
                }`}
              >
                <Image
                  src={poster}
                  alt={item.alt}
                  fill
                  sizes={
                    esMovil
                      ? "(min-width: 1024px) 26vw, 55vw"
                      : "(min-width: 1024px) 42vw, 88vw"
                  }
                  className="object-contain"
                  draggable={false}
                />

                {esReel && (
                  <>
                    <span className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 border border-white/20 bg-black/60 px-2 py-1 text-[9px] font-mono uppercase tracking-widest text-white/90 backdrop-blur-sm">
                      <IconoInstagram />
                      Reel
                    </span>
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/55 text-white backdrop-blur-sm md:h-16 md:w-16">
                        <svg
                          className="w-5 h-5 translate-x-0.5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </span>
                  </>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <span className="text-[11px] font-mono text-zinc-500 tabular-nums tracking-widest">
          {String(index + 1).padStart(2, "0")}{" "}
          <span className="text-zinc-700">/ {String(total).padStart(2, "0")}</span>
        </span>

        <div className="h-px flex-1 bg-zinc-900 overflow-hidden">
          <motion.div
            className="h-full bg-[#E1F030]"
            animate={{ width: `${progreso}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={anterior}
            aria-label="Captura anterior"
            className="w-9 h-9 flex items-center justify-center border border-zinc-800 text-zinc-400 hover:border-white hover:text-white transition-colors"
          >
            <IconoFlecha direccion="izquierda" />
          </button>
          <button
            type="button"
            onClick={siguiente}
            aria-label="Captura siguiente"
            className="w-9 h-9 flex items-center justify-center border border-zinc-800 text-zinc-400 hover:border-white hover:text-white transition-colors"
          >
            <IconoFlecha direccion="derecha" />
          </button>
        </div>
      </div>

      <p className="mt-3 text-[10px] font-mono uppercase tracking-widest text-zinc-600">
        Deslizá o usá las flechas · tocá para abrir
      </p>

      <ProjectLightbox
        media={media}
        index={index}
        label={label}
        open={lightboxAbierto}
        onChange={setIndex}
        onClose={() => setLightboxAbierto(false)}
        format={format}
      />
    </div>
  );
}
