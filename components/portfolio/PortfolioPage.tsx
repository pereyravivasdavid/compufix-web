"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/projects";
import { waLink } from "@/lib/compufix-info";
import ProjectSection from "./ProjectSection";

export default function PortfolioPage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen selection:bg-white selection:text-black">
      <header className="fixed top-0 w-full z-40 p-6 md:px-12 flex justify-between items-center mix-blend-difference">
        <Link
          href="/"
          className="font-black text-xl tracking-tighter uppercase"
        >
          Compufix.SP
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/#contacto"
            className="hidden sm:inline text-xs font-mono uppercase tracking-widest text-zinc-200 hover:text-white transition-colors"
          >
            Contacto
          </Link>
          <Link
            href="/"
            className="border border-white px-5 py-2 text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
          >
            Volver
          </Link>
        </div>
      </header>

      <section className="relative min-h-[78vh] flex items-center overflow-hidden pt-28 pb-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-zinc-800 bg-black mb-8">
              <span className="w-2 h-2 bg-[#E1F030]" />
              <span className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-widest">
                Portfolio / Proyectos reales
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
              Portfolio<span className="text-[#E1F030]">.</span>
            </h1>

            <p className="text-base md:text-lg font-mono text-zinc-400 max-w-2xl leading-relaxed">
              Sistemas de gestión, puntos de venta y plataformas web desarrollados
              a medida. Cada proyecto, pensado para resolver un problema concreto.
            </p>

            <nav
              aria-label="Ir a un proyecto"
              className="flex flex-wrap gap-3 mt-10"
            >
              {PROJECTS.map((project) => (
                <a
                  key={project.id}
                  href={`#${project.id}`}
                  className="group inline-flex items-center gap-2 border border-zinc-800 bg-[#0A0A0A] px-4 py-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-400 hover:border-[#E1F030] hover:text-[#E1F030] transition-colors"
                >
                  <span className="text-zinc-600 group-hover:text-[#E1F030] transition-colors">
                    {project.index}
                  </span>
                  {project.name}
                </a>
              ))}
            </nav>
          </motion.div>
        </div>
      </section>

      {PROJECTS.map((project, i) => (
        <ProjectSection
          key={project.id}
          project={project}
          reverse={i % 2 === 1}
        />
      ))}

      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative py-24 lg:py-32 border-t border-zinc-900 z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-[#E1F030]" />
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                  Siguiente paso
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none">
                ¿Tu proyecto acá?
                <br />
                <span className="text-zinc-600">Hablemos.</span>
              </h2>
              <p className="text-base font-mono text-zinc-400 max-w-lg leading-relaxed mt-6">
                Contanos qué necesitás y armamos una propuesta a medida, desde un
                POS hasta un sistema web completo.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link
                href="/#contacto"
                className="inline-flex items-center justify-center gap-4 bg-[#E1F030] text-black px-8 py-4 text-sm font-mono uppercase tracking-widest font-bold border-2 border-[#E1F030] hover:bg-black hover:text-[#E1F030] transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(225,240,48,0.35)] hover:shadow-[6px_6px_0px_0px_#E1F030]"
              >
                Iniciar consulta
              </Link>
              <a
                href={waLink(
                  "Hola Compufix! Vi el portfolio y quiero consultar por un proyecto.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-4 border border-zinc-800 bg-[#0A0A0A] px-8 py-4 text-xs font-mono text-white uppercase tracking-widest hover:border-white transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      <footer className="relative border-t border-zinc-900 py-8 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs font-mono text-zinc-600">
            © {new Date().getFullYear()} Compufix-sp. Todos los derechos
            reservados.
          </p>
          <Link
            href="/"
            className="text-xs font-mono text-zinc-600 hover:text-white transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </footer>
    </main>
  );
}
