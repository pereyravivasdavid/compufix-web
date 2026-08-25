"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PortfolioComingSoon() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden px-4 selection:bg-white selection:text-black">
      
      {/* 1. GRILLA DE FONDO (Mantiene la estética de la web) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none z-0"></div>

      {/* 2. EFECTO NOVEDOSO: MARQUESINAS INFINITAS DE FONDO */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center gap-24 opacity-[0.03] pointer-events-none overflow-hidden">
        {/* Fila moviéndose a la izquierda */}
        <motion.div 
          animate={{ x: [0, -2000] }} 
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="whitespace-nowrap text-[15vw] font-black uppercase tracking-tighter text-white leading-none"
        >
          WORK IN PROGRESS — EN CONSTRUCCIÓN — PROXIMAMENTE — WORK IN PROGRESS — EN CONSTRUCCIÓN — PROXIMAMENTE —
        </motion.div>
        {/* Fila moviéndose a la derecha */}
        <motion.div 
          animate={{ x: [-2000, 0] }} 
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="whitespace-nowrap text-[15vw] font-black uppercase tracking-tighter text-white leading-none"
        >
          COMPILANDO PROYECTOS — SISTEMAS WEB — HARDWARE — COMPILANDO PROYECTOS — SISTEMAS WEB — HARDWARE —
        </motion.div>
      </div>

      {/* 3. CAJA PRINCIPAL (Estilo Brutalista) */}
      <div className="relative z-10 w-full max-w-2xl border border-zinc-900 bg-black/80 backdrop-blur-md p-10 md:p-16 flex flex-col items-center shadow-2xl">
        
        {/* Etiqueta animada tipo Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="w-2 h-2 bg-[#E1F030] animate-pulse shadow-[0_0_10px_rgba(225,240,48,0.5)]"></span>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            Estado_Compilando
          </span>
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none mb-8 text-center"
        >
          Portfolio.
        </motion.h1>

        {/* Barra de carga de "procesamiento" */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-xs h-[2px] bg-zinc-900 relative overflow-hidden mb-8"
        >
          <motion.div
            className="absolute top-0 left-0 h-full bg-white"
            animate={{ 
              width: ["0%", "50%", "100%", "0%"], 
              left: ["0%", "0%", "100%", "0%"] 
            }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Texto descriptivo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base font-mono text-zinc-400 mb-12 leading-relaxed text-center"
        >
          Estamos empaquetando nuestra mejor selección de sistemas web y arquitecturas de hardware. Acceso temporalmente denegado.
        </motion.p>

        {/* Botón de Retorno */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/"
            className="group relative inline-flex items-center gap-4 border border-zinc-800 bg-[#050505] px-8 py-5 text-xs font-mono text-white uppercase tracking-widest hover:border-white hover:bg-white hover:text-black transition-all duration-300"
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
        </motion.div>

        {/* Detalles técnicos (Esquinas) - Respetando tu idea original pero con estilo Zinc */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-zinc-700 opacity-50"></div>
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-zinc-700 opacity-50"></div>
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-zinc-700 opacity-50"></div>
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-zinc-700 opacity-50"></div>
      </div>
      
    </main>
  );
}