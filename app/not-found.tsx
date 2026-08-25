"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

export default function NotFound() {
  // ---------------------------------------------------
  // FÍSICAS PARA EL EFECTO LINTERNA (Sigue al mouse)
  // ---------------------------------------------------
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    // Asignamos el valor inicial al centro de la pantalla
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Suavizamos el movimiento para que la luz no sea brusca
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  // Creamos el gradiente radial que se va a mover con las coordenadas
  const background = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(255,255,255,0.08), transparent 80%)`;

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#050505] overflow-hidden selection:bg-white selection:text-black">
      
      {/* 1. Fondo Dinámico (La Linterna) */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background }}
      />

      {/* 2. Grilla de fondo (Mantiene la estética de la landing) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none z-0"></div>

      {/* 3. Contenido de Error */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        
        {/* Efecto Glitch intermitente en el 404 */}
        <motion.h1
          animate={{
            textShadow: [
              "0px 0px 0px rgba(255,255,255,0)",
              "-4px 0px 10px rgba(255,0,0,0.5), 4px 0px 10px rgba(0,255,255,0.5)",
              "0px 0px 0px rgba(255,255,255,0)",
            ],
            x: [0, -2, 2, -1, 1, 0],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            repeatDelay: 4, // El glitch sucede cada 4 segundos
          }}
          className="text-8xl md:text-[12rem] font-black tracking-tighter text-white leading-none mb-4"
        >
          404
        </motion.h1>

        <div className="flex items-center gap-3 mb-8">
          <span className="w-2 h-2 bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
          <span className="text-sm font-mono text-zinc-500 uppercase tracking-widest">Error de Sistema</span>
        </div>

        <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-widest text-zinc-300 mb-6">
          Sector no encontrado
        </h2>

        <p className="text-base font-mono text-zinc-500 max-w-md mx-auto leading-relaxed mb-12">
          Parece que hubo un fallo en este enlace o la página fue reubicada. 
        </p>

        {/* Botón de retorno al Inicio */}
        <Link
          href="/"
          className="group relative inline-flex items-center gap-4 border border-zinc-800 bg-[#0A0A0A] px-8 py-5 text-xs font-mono text-white uppercase tracking-widest hover:border-white hover:bg-white hover:text-black transition-all duration-300 shadow-2xl"
        >
          <svg
            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al Inicio
        </Link>
      </div>
      
    </main>
  );
}