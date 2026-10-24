"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import ProjectCarousel from "./ProjectCarousel";

export default function ProjectSection({
  project,
  reverse,
}: {
  project: Project;
  reverse: boolean;
}) {
  return (
    <motion.section
      id={project.id}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative py-20 lg:py-28 border-t border-zinc-900 overflow-hidden scroll-mt-24"
    >
      <div
        aria-hidden="true"
        className={`absolute top-6 ${
          reverse ? "right-2 lg:right-6" : "left-2 lg:left-6"
        } text-[28vw] lg:text-[16vw] font-black font-mono leading-none text-white/[0.03] pointer-events-none select-none`}
      >
        {project.index}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`lg:col-span-5 border border-zinc-900 bg-[#0A0A0A]/50 p-6 md:p-8 ${
              reverse ? "lg:order-2" : ""
            }`}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-2 h-2 bg-[#E1F030]" />
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                {project.index} / Proyecto
              </span>
            </div>

            <span className="inline-block border border-zinc-800 px-3 py-1 text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-6">
              {project.status}
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95] mb-4">
              {project.name}
            </h2>

            <p className="text-sm font-mono text-[#E1F030] uppercase tracking-widest mb-6">
              {project.tagline}
            </p>

            <p className="text-base font-mono text-zinc-400 leading-relaxed mb-8">
              {project.description}
            </p>

            <h3 className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-4">
              Funcionalidades clave
            </h3>
            <ul className="flex flex-col gap-3 mb-8">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm font-mono text-zinc-300"
                >
                  <span className="text-[#E1F030] mt-0.5">/</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((tecnologia) => (
                <span
                  key={tecnologia}
                  className="border border-zinc-800 bg-[#0A0A0A] px-3 py-1 text-[10px] font-mono text-zinc-400 uppercase tracking-widest"
                >
                  {tecnologia}
                </span>
              ))}
            </div>

            <Link
              href="/#contacto"
              className="group inline-flex items-center gap-3 text-[11px] font-mono text-white uppercase tracking-widest border-b border-zinc-700 pb-1 hover:border-[#E1F030] hover:text-[#E1F030] transition-colors"
            >
              Quiero algo así
              <svg
                className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
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
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`lg:col-span-7 ${reverse ? "lg:order-1" : ""}`}
          >
            <ProjectCarousel
              images={project.images}
              label={project.name}
              format={project.format}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
