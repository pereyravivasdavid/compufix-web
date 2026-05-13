"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PortfolioComingSoon() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden px-4">
      
      {/* Efecto de luz de fondo (Neón Azul) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 blur-[150px] pointer-events-none rounded-full"></div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        
        {/* Etiqueta animada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex justify-center"
        >
          <span className="inline-block py-1 px-3 rounded-none bg-blue-900/20 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(59,130,246,0.1)]">
            En Construcción
          </span>
        </motion.div>

        {/* Título animado */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-400 to-white pb-4 mb-4"
        >
          Portfolio Próximamente
        </motion.h1>

        {/* Texto descriptivo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-zinc-400 mb-10 leading-relaxed"
        >
          Estamos preparando una selección de nuestros mejores trabajos en desarrollo web y mantenimiento de hardware. ¡Vuelve pronto para conocerlos!
        </motion.p>

        {/* Botón para volver al inicio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-transparent text-white px-8 py-3 rounded-none font-medium border border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300 hover:bg-blue-600 hover:border-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:-translate-y-1 group"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transition-transform group-hover:-translate-x-1"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Volver al inicio
          </Link>
        </motion.div>
      </div>

      {/* Detalles técnicos (Esquinas) */}
      <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-zinc-800 opacity-50"></div>
      <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-zinc-800 opacity-50"></div>
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-zinc-800 opacity-50"></div>
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-zinc-800 opacity-50"></div>
    </main>
  );
}