"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, MotionConfig } from "framer-motion";

// Componente FAQ Optimizado
const FaqItem = ({ pregunta, respuesta }: { pregunta: string, respuesta: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-900">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full py-8 flex items-center justify-between group text-left"
        aria-expanded={isOpen}
      >
        <h3 className="text-xl md:text-2xl font-bold text-zinc-400 group-hover:text-white transition-colors duration-300 pr-8">
          {pregunta}
        </h3>
        <div className="relative w-6 h-6 shrink-0 flex items-center justify-center pointer-events-none">
          <span className={`absolute w-full h-[2px] bg-zinc-500 group-hover:bg-white transition-all duration-300 ${isOpen ? "rotate-180 bg-white" : ""}`}></span>
          <span className={`absolute w-full h-[2px] bg-zinc-500 group-hover:bg-white transition-all duration-300 ${isOpen ? "rotate-0 opacity-0" : "rotate-90"}`}></span>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-base md:text-lg font-mono text-zinc-500 leading-relaxed pr-4 md:pr-12">
              {respuesta}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Componente Text Carousel (estilo Originkit)
const PALABRAS_ROTATIVAS = ["Desarrollo", "Hardware", "Seguridad"];

const TextCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % PALABRAS_ROTATIVAS.length), 2800);
    return () => clearInterval(timer);
  }, []);

  const palabra = PALABRAS_ROTATIVAS[index];

  return (
    <motion.span
      className="relative inline-flex items-center justify-center border border-zinc-800 bg-white w-[260px] sm:w-[300px] md:w-[420px] lg:w-[560px] py-3 md:py-4 shadow-[4px_4px_0px_#18181b]"
    >
      <span className="sr-only">{palabra}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={palabra}
          className="inline-block overflow-hidden whitespace-nowrap"
          variants={{ enter: {}, center: {}, exit: {} }}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {palabra.split("").map((letra, i) => (
            <motion.span
              key={`${palabra}-${i}`}
              variants={{
                enter: { y: "110%", opacity: 0 },
                center: { y: "0%", opacity: 1, transition: { duration: 0.4, ease: "easeOut", delay: i * 0.035 } },
                exit: { y: "-110%", opacity: 0, transition: { duration: 0.3, ease: "easeIn", delay: i * 0.025 } },
              }}
              className="inline-block text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-black"
            >
              {letra}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
};

export default function Home() {
  // ---------------------------------------------------
  // ESTADOS GLOBALES
  // ---------------------------------------------------
  const [mostrarBoton, setMostrarBoton] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [estado, setEstado] = useState<'ideal' | 'enviando' | 'exito' | 'error'>('ideal');

  useEffect(() => {
    const controlarScroll = () => setMostrarBoton(window.scrollY > 300);
    window.addEventListener("scroll", controlarScroll);
    return () => window.removeEventListener("scroll", controlarScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuAbierto ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuAbierto]);

  const cerrarMenu = () => setMenuAbierto(false);

  const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEstado('enviando');
    const formData = new FormData(e.currentTarget);
    const datos = Object.fromEntries(formData.entries());
    const res = await fetch('/api/send', { method: 'POST', body: JSON.stringify(datos), headers: { 'Content-Type': 'application/json' } });
    if (res.ok) {
      setEstado('exito');
      (e.target as HTMLFormElement).reset();
    } else setEstado('error');
  };

  const volverArriba = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // ---------------------------------------------------
  // FÍSICAS DE SCROLL
  // ---------------------------------------------------
  const horizontalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: horizontalProgress } = useScroll({ target: horizontalRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(horizontalProgress, { stiffness: 200, damping: 25, mass: 0.1 });
  const x = useTransform(smoothProgress, [0, 1], ["calc(0% + 0vw)", "calc(-100% + 100vw)"]);
  
  const desarrolloRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: devProgress } = useScroll({ target: desarrolloRef, offset: ["start end", "end start"] });
  const devImageY = useTransform(devProgress, [0, 1], ["-20%", "20%"]);

  const mantenimientoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: mantProgress } = useScroll({ target: mantenimientoRef, offset: ["start end", "end start"] });
  const mantImageY = useTransform(mantProgress, [0, 1], ["-20%", "20%"]);

  const optimizacionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: optiProgress } = useScroll({ target: optimizacionRef, offset: ["start end", "end start"] });
  const optiImageY = useTransform(optiProgress, [0, 1], ["-20%", "20%"]);

  const cctvRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cctvProgress } = useScroll({ target: cctvRef, offset: ["start end", "end start"] });
  const cctvImageY = useTransform(cctvProgress, [0, 1], ["-20%", "20%"]);

  return (
    <MotionConfig reducedMotion="user">
    <main className="bg-black text-white min-h-screen selection:bg-white selection:text-black">
      
      {/* HEADER */}
      <header className="header-no-blend fixed top-0 w-full z-50 p-6 md:px-12 flex justify-between items-center mix-blend-difference pointer-events-none">
        <a href="#inicio" onClick={cerrarMenu} aria-label="Ir al inicio de Compufix" className="font-black text-xl tracking-tighter uppercase pointer-events-auto">
          Compufix.SP
        </a>

        {/* NAV DESKTOP */}
        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-8 pointer-events-auto">
          <a href="#servicios" className="text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Servicios</a>
          <a href="#sobre-nosotros" className="text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Nosotros</a>
          <a href="/portfolio" className="text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Portfolio</a>
          <a href="#proceso" className="text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Proceso</a>
          <a href="#faq" className="text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">FAQ</a>
          <a href="#contacto" className="ml-2 border border-white px-6 py-2 text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
            Contacto
          </a>
        </nav>

        {/* BOTÓN MENÚ MÓVIL */}
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label={menuAbierto ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          aria-expanded={menuAbierto}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-11 h-11 border border-white px-0 py-0 hover:bg-white hover:text-black transition-colors pointer-events-auto"
        >
          <span className={`block w-5 h-[2px] bg-current transition-transform duration-300 ${menuAbierto ? "rotate-45 translate-y-[7px]" : ""}`}></span>
          <span className={`block w-5 h-[2px] bg-current transition-opacity duration-300 ${menuAbierto ? "opacity-0" : ""}`}></span>
          <span className={`block w-5 h-[2px] bg-current transition-transform duration-300 ${menuAbierto ? "-rotate-45 -translate-y-[7px]" : ""}`}></span>
        </button>
      </header>

      {/* MENÚ MÓVIL (OVERLAY) */}
      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] bg-[#050505] flex flex-col md:hidden"
          >
            <div className="flex justify-between items-center p-6">
              <span className="font-black text-xl tracking-tighter uppercase">Compufix.SP</span>
              <button
                onClick={() => setMenuAbierto(false)}
                aria-label="Cerrar menú"
                className="w-11 h-11 flex items-center justify-center border border-white hover:bg-white hover:text-black transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <nav aria-label="Navegación móvil" className="flex flex-col px-6 mt-4">
              {[
                { href: "#servicios", label: "Servicios" },
                { href: "#sobre-nosotros", label: "Nosotros" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "#proceso", label: "Proceso" },
                { href: "#faq", label: "FAQ" },
              ].map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuAbierto(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * i }}
                  className="group flex items-center justify-between py-5 border-b border-zinc-900 text-3xl font-black uppercase tracking-tighter text-zinc-500 hover:text-white transition-colors"
                >
                  {item.label}
                  <span className="text-sm font-mono text-zinc-700 group-hover:text-zinc-400 transition-colors">0{i + 1}</span>
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto px-6 pb-10 pt-8">
              <a
                href="#contacto"
                onClick={() => setMenuAbierto(false)}
                className="flex items-center justify-center gap-4 w-full border border-white bg-white text-black px-8 py-5 text-sm font-mono uppercase tracking-widest hover:opacity-80 transition-opacity"
              >
                Iniciar Consulta
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1: HERO */}
      <section id="inicio" className="relative h-screen min-h-[620px] bg-[#050505] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center px-4 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-4 px-4 py-2 border border-zinc-800 bg-black mb-8 shadow-[4px_4px_0px_#18181b]">
            <span className="w-2 h-2 bg-white"></span>
            <span className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-widest">
              Presidencia Roque Sáenz Peña, Chaco
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.85] mb-10">
            Compufix
            <span className="text-zinc-600">.sp</span>
          </h1>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mb-14">
            <span className="text-sm md:text-xl font-mono text-zinc-500 uppercase tracking-widest">
              Especialistas en
            </span>
            <TextCarousel />
          </div>

          <a
            href="#servicios"
            className="group inline-flex items-center gap-4 bg-[#E1F030] text-black px-8 py-4 text-sm font-mono uppercase tracking-widest font-bold border-2 border-[#E1F030] hover:bg-black hover:text-[#E1F030] transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(225,240,48,0.35)] hover:shadow-[6px_6px_0px_0px_#E1F030]"
          >
            <span>Explorar Servicios</span>
            <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
          </a>
        </motion.div>
      </section>

      {/* 2: SERVICIOS */}
      <section id="servicios" ref={horizontalRef} className="relative h-[300vh] lg:h-[600vh] bg-[#050505] z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] border-t border-zinc-900">
        <div className="sticky top-0 h-screen flex flex-col justify-end md:justify-center pb-12 md:pb-0 overflow-hidden">
          
          <div className="absolute left-6 md:left-12 top-28 md:top-32 z-0 pointer-events-none">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-4">
              {"// Catálogo de Servicios"}
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-zinc-800 md:text-white/5 leading-[1.15] pt-2">
              Nuestras <br className="hidden md:block" /> Soluciones.
            </h2>
          </div>

          <motion.div style={{ x }} className="flex gap-6 md:gap-12 pl-[7.5vw] md:pl-[30vw] items-center relative z-10 w-fit">
            {[
              { num: "01", titulo: "Desarrollo Web", desc: "Sistemas a medida, landing pages de alta conversión y plataformas robustas creadas con las últimas tecnologías.", link: "#detalle-desarrollo" },
              { num: "02", titulo: "Mantenimiento PC", desc: "Diagnóstico, limpieza física profunda y solución a fallas de hardware para garantizar rendimiento y vida útil.", link: "#detalle-mantenimiento" },
              { num: "03", titulo: "Hardware Upgrade", desc: "Ampliación de RAM, clonación a discos sólidos (SSD) y asesoramiento técnico especializado para revivir equipos.", link: "#detalle-optimizacion" },
              { num: "04", titulo: "Seguridad CCTV", desc: "Sistemas de videovigilancia. Cámaras HD, DVRs y configuración en Chaco para acceso remoto desde dispositivos móviles.", link: "#detalle-cctv" }
            ].map((servicio, i) => (
              <motion.article 
                key={i}
                initial={{ opacity: 0.1, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ margin: "0px -15% 0px -15%", amount: "some" }} 
                transition={{ duration: 0.5, ease: "easeOut" }}
                // AGREGADO: min-h-[400px] md:min-h-[480px] para evitar que colapse en laptops
                className="w-[88vw] md:w-[40vw] h-[55vh] md:h-[60vh] min-h-[340px] md:min-h-[480px] shrink-0 bg-[#0A0A0A] flex flex-col relative group overflow-hidden shadow-2xl border-none"
              >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20 pointer-events-none"></div>
                
                {/* AJUSTE: Reducimos un poco el padding (p-10) y los márgenes inferiores (mb-8) */}
                <div className="w-full h-full p-8 md:p-10 flex flex-col justify-center relative z-10 bg-[#0A0A0A]">
                  <span className="text-6xl md:text-7xl font-black text-zinc-900 mb-4 font-mono leading-none">
                    {servicio.num}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-widest">
                    {servicio.titulo}
                  </h3>
                  <p className="text-base md:text-lg font-mono text-zinc-400 leading-relaxed mb-8">
                    {servicio.desc}
                  </p>
                  <a href={servicio.link} aria-label={`Ver detalles sobre ${servicio.titulo}`} className="text-sm font-mono text-white uppercase tracking-widest underline decoration-zinc-600 underline-offset-8 hover:decoration-white transition-colors w-fit mt-auto pointer-events-auto">
                    Ver detalles →
                  </a>
                </div>
              </motion.article>
            ))}
            <div className="w-[7.5vw] md:w-[30vw] shrink-0 pointer-events-none"></div>
          </motion.div>
        </div>
      </section>

      {/* 3: SOBRE NOSOTROS */}
      <section id="sobre-nosotros" className="relative bg-[#050505] py-20 lg:py-32 border-t border-zinc-900 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
            
            <div className="lg:col-span-5 lg:sticky lg:top-40 flex flex-col justify-center items-center lg:items-start">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="relative w-full max-w-[280px] aspect-square flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
                <motion.div
                  animate={{ y: [-15, 15, -15] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="relative w-full h-full"
                >
                  <Image 
                    src="/logo-compufix.webp"
                    alt="Logotipo de Compufix SP, especialistas en tecnología"
                    fill
                    sizes="280px" 
                    className="object-contain opacity-90 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                  />
                </motion.div>
              </motion.div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-10 lg:pt-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 bg-white"></span>
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Leandro David</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none">
                  El motor detrás <br /> de Compufix.
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg font-mono text-zinc-400 leading-relaxed"
              >
                Soy técnico especialista, radicado en <strong>Presidencia Roque Sáenz Peña, Chaco</strong>. Mi enfoque combina la precisión del hardware con la escalabilidad del software para ofrecer soluciones IT integrales y sin vueltas.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg font-mono text-zinc-400 leading-relaxed"
              >
                Este proyecto arrancó en 2016 desde un pequeño taller local. El objetivo siempre fue claro: darle una segunda vida a los equipos informáticos mediante mantenimientos rigurosos, y construir <strong>sistemas y landing pages de alto impacto</strong> para negocios locales y remotos.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-2 gap-6 pt-8 border-t border-zinc-900 mt-4"
              >
                <div>
                  <h4 className="text-4xl font-black text-white mb-2 font-mono">2016</h4>
                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Año de inicio</p>
                </div>
                <div>
                  <h4 className="text-4xl font-black text-white mb-2 font-mono">100%</h4>
                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Compromiso técnico</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4: DETALLE DESARROLLO */}
      <section id="detalle-desarrollo" ref={desarrolloRef} className="relative bg-[#050505] py-20 lg:py-32 border-t border-zinc-900 z-30 overflow-hidden">
        <div aria-hidden="true" className="lg:hidden absolute inset-x-0 top-20 z-0 flex justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[24vw] font-black uppercase tracking-tighter text-zinc-900/40 whitespace-nowrap leading-none">Desarrollo</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
            
            <div className="flex flex-col justify-center order-2 lg:order-1 relative z-10 -mt-24 lg:mt-0 bg-[#0A0A0A]/95 lg:bg-transparent backdrop-blur-sm border border-zinc-900 lg:border-0 p-6 md:p-10 lg:p-0 shadow-2xl lg:shadow-none">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 bg-white"></span>
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Servicio 01</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-[1.1] mb-8">
                  Desarrollo web <br /> a medida.
                </h2>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.1 }} className="text-lg font-mono text-zinc-400 leading-relaxed mb-8">
                Diseñamos y desarrollamos soluciones digitales preparadas para escalar. Creación de <strong>landing pages optimizadas para SEO local</strong> y aplicaciones web full-stack de alto rendimiento.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.2 }} className="border-t border-zinc-900 pt-8 mt-4">
                <h3 className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-6">Stack Tecnológico</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex items-center gap-3 text-sm font-mono text-zinc-300"><span className="text-zinc-600">/</span> React & Next.js</li>
                  <li className="flex items-center gap-3 text-sm font-mono text-zinc-300"><span className="text-zinc-600">/</span> Control Git / GitHub</li>
                  <li className="flex items-center gap-3 text-sm font-mono text-zinc-300"><span className="text-zinc-600">/</span> Deploy en Vercel</li>
                  <li className="flex items-center gap-3 text-sm font-mono text-zinc-300"><span className="text-zinc-600">/</span> WordPress Avanzado</li>
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                
                {/* Botón Principal */}
                <a href="#contacto" aria-label="Iniciar proyecto de Desarrollo Web" className="w-full sm:w-auto justify-center inline-flex items-center gap-4 border border-zinc-800 bg-[#0A0A0A] px-8 py-4 text-xs font-mono text-white uppercase tracking-widest hover:border-white transition-colors">
                  Iniciar Desarrollo
                </a>

                {/* Botón Secundario: Portfolio (Amarillo Ácido) */}
                <a href="/portfolio" aria-label="Ver Portfolio de Proyectos Web" className="w-full sm:w-auto justify-center inline-flex items-center gap-4 border border-[#E1F030]/50 bg-transparent px-8 py-4 text-xs font-mono text-[#E1F030] uppercase tracking-widest hover:border-[#E1F030] hover:bg-[#E1F030] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(225,240,48,0.05)] hover:shadow-[0_0_25px_rgba(225,240,48,0.2)]">
                  Ver Portfolio
                </a>
                
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="relative w-full aspect-[3/4] overflow-hidden border border-zinc-800 bg-black order-1 lg:order-2 group translate-x-[-5%] translate-y-[3%] lg:translate-x-0 lg:translate-y-0">
              <div className="absolute inset-0 bg-black/40 z-10 mix-blend-overlay group-hover:bg-black/10 transition-colors duration-700 pointer-events-none"></div>
              <motion.div style={{ y: devImageY }} className="absolute -top-[20%] -bottom-[20%] left-0 right-0 w-full h-[140%]">
                <Image src="/desarrollo-nuevo.webp" alt="Programación y Diseño de Sistemas Web a Medida" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5: DETALLE MANTENIMIENTO */}
      <section id="detalle-mantenimiento" ref={mantenimientoRef} className="relative bg-[#050505] py-20 lg:py-32 border-t border-zinc-900 z-30 overflow-hidden">
        <div aria-hidden="true" className="lg:hidden absolute inset-x-0 top-20 z-0 flex justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[24vw] font-black uppercase tracking-tighter text-zinc-900/40 whitespace-nowrap leading-none">Hardware</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
            
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="relative w-full aspect-[3/4] overflow-hidden border border-zinc-800 bg-black order-1 group translate-x-[5%] translate-y-[3%] lg:translate-x-0 lg:translate-y-0">
              <div className="absolute inset-0 bg-black/40 z-10 mix-blend-overlay group-hover:bg-black/10 transition-colors duration-700 pointer-events-none"></div>
              <motion.div style={{ y: mantImageY }} className="absolute -top-[20%] -bottom-[20%] left-0 right-0 w-full h-[140%]">
                <Image src="/img-reparacion.webp" alt="Servicio Técnico, Mantenimiento y Reparación de PC en Chaco" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" />
              </motion.div>
            </motion.div>

            <div className="flex flex-col justify-center order-2 relative z-10 -mt-24 lg:mt-0 bg-[#0A0A0A]/95 lg:bg-transparent backdrop-blur-sm border border-zinc-900 lg:border-0 p-6 md:p-10 lg:p-0 shadow-2xl lg:shadow-none">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 bg-white"></span>
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Servicio 02</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-[1.1] mb-8">
                  Mantenimiento <br /> de Hardware.
                </h2>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.1 }} className="text-lg font-mono text-zinc-400 leading-relaxed mb-8">
                Un equipo lento o con sobrecalentamiento reduce tu productividad. Brindamos <strong>servicio técnico de PC especializado</strong> para asegurar estabilidad, velocidad y rendimiento continuo.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.2 }} className="border-t border-zinc-900 pt-8 mt-4">
                <h3 className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-6">Procedimientos Clave</h3>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-start gap-3 text-sm font-mono text-zinc-300"><span className="text-zinc-600 mt-0.5">/</span> <span><strong>Diagnóstico preciso</strong>, limpieza física integral y recambio de pasta térmica.</span></li>
                  <li className="flex items-start gap-3 text-sm font-mono text-zinc-300"><span className="text-zinc-600 mt-0.5">/</span> <span>Limpieza profunda de virus, malware y optimización del sistema operativo.</span></li>
                  <li className="flex items-start gap-3 text-sm font-mono text-zinc-300"><span className="text-zinc-600 mt-0.5">/</span> <span>Reinstalación de sistemas (Windows/Linux) con <strong>backup preventivo estricto</strong>.</span></li>
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-12">
                <a href="#contacto" aria-label="Solicitar Diagnóstico de PC" className="inline-flex items-center gap-4 border border-zinc-800 bg-[#0A0A0A] px-8 py-4 text-xs font-mono text-white uppercase tracking-widest hover:border-white transition-colors">
                  Solicitar Diagnóstico
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 6: DETALLE OPTIMIZACIÓN */}
      <section id="detalle-optimizacion" ref={optimizacionRef} className="relative bg-[#050505] py-20 lg:py-32 border-t border-zinc-900 z-30 overflow-hidden">
        <div aria-hidden="true" className="lg:hidden absolute inset-x-0 top-20 z-0 flex justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[24vw] font-black uppercase tracking-tighter text-zinc-900/40 whitespace-nowrap leading-none">Upgrade</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
            
            <div className="flex flex-col justify-center order-2 lg:order-1 relative z-10 -mt-24 lg:mt-0 bg-[#0A0A0A]/95 lg:bg-transparent backdrop-blur-sm border border-zinc-900 lg:border-0 p-6 md:p-10 lg:p-0 shadow-2xl lg:shadow-none">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 bg-white"></span>
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Servicio 03</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-[1.1] mb-8">
                  Optimización <br /> y Upgrades.
                </h2>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.1 }} className="text-lg font-mono text-zinc-400 leading-relaxed mb-8">
                Evitá comprar una computadora nueva. Mediante la <strong>ampliación de memoria RAM y clonación a SSD</strong>, le damos una segunda vida a tu infraestructura, multiplicando su velocidad drásticamente.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.2 }} className="border-t border-zinc-900 pt-8 mt-4">
                <h3 className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-6">Mejoras Aplicadas</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex items-start gap-3 text-sm font-mono text-zinc-300"><span className="text-zinc-600">/</span> Migración a Discos Sólidos (SSD).</li>
                  <li className="flex items-start gap-3 text-sm font-mono text-zinc-300"><span className="text-zinc-600">/</span> Ampliación de Memoria RAM.</li>
                  <li className="flex items-start gap-3 text-sm font-mono text-zinc-300"><span className="text-zinc-600">/</span> Clonación de discos sin pérdida.</li>
                  <li className="flex items-start gap-3 text-sm font-mono text-zinc-300"><span className="text-zinc-600">/</span> Asesoramiento para armado PC Gamer.</li>
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-12">
                <a href="#contacto" aria-label="Cotizar Hardware Upgrade" className="inline-flex items-center gap-4 border border-zinc-800 bg-[#0A0A0A] px-8 py-4 text-xs font-mono text-white uppercase tracking-widest hover:border-white transition-colors">
                  Cotizar Upgrade
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="relative w-full aspect-[3/4] overflow-hidden border border-zinc-800 bg-black order-1 lg:order-2 group translate-x-[-5%] translate-y-[3%] lg:translate-x-0 lg:translate-y-0">
              <div className="absolute inset-0 bg-black/40 z-10 mix-blend-overlay group-hover:bg-black/10 transition-colors duration-700 pointer-events-none"></div>
              <motion.div style={{ y: optiImageY }} className="absolute -top-[20%] -bottom-[20%] left-0 right-0 w-full h-[140%]">
                <Image src="/img-opti.webp" alt="Hardware Upgrade, ampliación SSD y memoria RAM" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 7: DETALLE CCTV */}
      <section id="detalle-cctv" ref={cctvRef} className="relative bg-[#050505] py-20 lg:py-32 border-t border-zinc-900 z-30 overflow-hidden">
        <div aria-hidden="true" className="lg:hidden absolute inset-x-0 top-20 z-0 flex justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[24vw] font-black uppercase tracking-tighter text-zinc-900/40 whitespace-nowrap leading-none">Seguridad</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
            
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="relative w-full aspect-[3/4] overflow-hidden border border-zinc-800 bg-black order-1 group translate-x-[5%] translate-y-[3%] lg:translate-x-0 lg:translate-y-0">
              <div className="absolute inset-0 bg-black/40 z-10 mix-blend-overlay group-hover:bg-black/10 transition-colors duration-700 pointer-events-none"></div>
              <motion.div style={{ y: cctvImageY }} className="absolute -top-[20%] -bottom-[20%] left-0 right-0 w-full h-[140%]">
                <Image src="/img-camaras.webp" alt="Instalación de Cámaras de Seguridad CCTV y Videovigilancia" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" />
              </motion.div>
            </motion.div>

            <div className="flex flex-col justify-center order-2 relative z-10 -mt-24 lg:mt-0 bg-[#0A0A0A]/95 lg:bg-transparent backdrop-blur-sm border border-zinc-900 lg:border-0 p-6 md:p-10 lg:p-0 shadow-2xl lg:shadow-none">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 bg-white"></span>
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Servicio 04</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-[1.1] mb-8">
                  Seguridad <br /> CCTV 24/7.
                </h2>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.1 }} className="text-lg font-mono text-zinc-400 leading-relaxed mb-8">
                Protegé tu hogar o espacio de trabajo. Realizamos <strong>instalación de cámaras de seguridad y sistemas de videovigilancia CCTV</strong> de alta definición con diseño de cobertura estratégica.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.2 }} className="border-t border-zinc-900 pt-8 mt-4">
                <h3 className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-6">Infraestructura</h3>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-start gap-3 text-sm font-mono text-zinc-300"><span className="text-zinc-600 mt-0.5">/</span> <span>Instalación de cámaras HD y configuración completa de DVRs.</span></li>
                  <li className="flex items-start gap-3 text-sm font-mono text-zinc-300"><span className="text-zinc-600 mt-0.5">/</span> <span>Monitoreo remoto en tiempo real desde smartphone o PC.</span></li>
                  <li className="flex items-start gap-3 text-sm font-mono text-zinc-300"><span className="text-zinc-600 mt-0.5">/</span> <span>Revisión e implementación técnica de cableado estructurado.</span></li>
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-12">
                <a href="#contacto" aria-label="Presupuestar proyecto CCTV" className="inline-flex items-center gap-4 border border-zinc-800 bg-[#0A0A0A] px-8 py-4 text-xs font-mono text-white uppercase tracking-widest hover:border-white transition-colors">
                  Presupuestar Proyecto
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 8: PROCESO */}
      <section id="proceso" className="relative bg-[#050505] py-20 lg:py-32 border-t border-zinc-900 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-center mb-24">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-2 h-2 bg-white"></span>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Metodología</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none mb-6">
              Transparencia <br /> paso a paso.
            </h2>
            <p className="text-lg font-mono text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Sabemos que la falta de información genera dudas. Por eso, diseñamos un proceso donde vos sos parte del circuito en todo momento.
            </p>
          </motion.div>

          <div className="relative flex flex-col gap-16 md:gap-24 pb-24">
            <motion.article initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: "-100px" }} transition={{ duration: 0.5 }} className="sticky top-[12vh] md:top-[15vh] w-full border border-zinc-800 bg-[#0A0A0A] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="md:w-1/3 flex flex-col">
                <span className="text-7xl font-black text-zinc-800 font-mono leading-none mb-4">01</span>
                <h3 className="text-2xl font-bold text-white uppercase tracking-widest">Diagnóstico</h3>
              </div>
              <div className="md:w-2/3">
                <p className="text-base font-mono text-zinc-400 leading-relaxed">
                  Evaluamos tu equipo o requerimientos web. <strong className="text-white font-normal">Estamos en contacto directo con vos</strong>, hablándote claro y sin tecnicismos innecesarios.
                </p>
              </div>
            </motion.article>

            <motion.article initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: "-100px" }} transition={{ duration: 0.5 }} className="sticky top-[15vh] md:top-[18vh] w-full border border-zinc-800 bg-[#0A0A0A] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="md:w-1/3 flex flex-col">
                <span className="text-7xl font-black text-zinc-800 font-mono leading-none mb-4">02</span>
                <h3 className="text-2xl font-bold text-white uppercase tracking-widest">Propuesta</h3>
              </div>
              <div className="md:w-2/3">
                <p className="text-base font-mono text-zinc-400 leading-relaxed">
                  Armamos un plan de acción detallado. <strong className="text-white font-normal">Repasamos juntos cada ítem por WhatsApp o email</strong> y no avanzamos hasta que estés 100% de acuerdo.
                </p>
              </div>
            </motion.article>

            <motion.article initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: "-100px" }} transition={{ duration: 0.5 }} className="sticky top-[18vh] md:top-[21vh] w-full border border-zinc-800 bg-[#0A0A0A] p-8 md:p-12 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="md:w-1/3 flex flex-col">
                <span className="text-7xl font-black text-[#E1F030] font-mono leading-none mb-4">03</span>
                <h3 className="text-2xl font-bold text-white uppercase tracking-widest">Ejecución</h3>
              </div>
              <div className="md:w-2/3">
                <p className="text-base font-mono text-zinc-400 leading-relaxed">
                  Ponemos manos a la obra. Ya sea reparando tu PC o programando una web, <strong className="text-white font-normal">te mandamos actualizaciones del avance de tu proyecto</strong>.
                </p>
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      {/* 9: REDES SOCIALES */}
      <section id="sociales" className="relative bg-[#050505] py-20 lg:py-32 border-t border-zinc-900 z-30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="mb-16 md:mb-24">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 bg-white"></span>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Comunidad</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-none">
              Presencia <br className="hidden md:block" /> Digital.
            </h2>
          </motion.div>

          <nav aria-label="Enlaces a Redes Sociales" className="flex flex-col border-t border-zinc-900">
            
            <motion.a href="https://www.instagram.com/compufix.sp" aria-label="Visitar el Instagram de Compufix" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }} className="group flex items-center justify-between py-10 md:py-16 border-b border-zinc-900 hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-6 md:gap-12">
                <span className="text-xl md:text-2xl font-mono font-black text-zinc-800 group-hover:text-zinc-500 transition-colors">IG</span>
                <span className="text-3xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-zinc-500 group-hover:text-white transition-colors duration-500">Instagram</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="hidden md:block text-xs font-mono text-zinc-600 uppercase tracking-widest group-hover:text-zinc-400 transition-colors">@compufix.sp</span>
                <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                  <svg className="w-5 h-5 text-zinc-500 group-hover:text-black transform group-hover:rotate-[-45deg] transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </div>
              </div>
            </motion.a>

            <motion.a href="https://www.facebook.com/compufix.sp" aria-label="Visitar el Facebook de Compufix" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.1 }} className="group flex items-center justify-between py-10 md:py-16 border-b border-zinc-900 hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-6 md:gap-12">
                <span className="text-xl md:text-2xl font-mono font-black text-zinc-800 group-hover:text-zinc-500 transition-colors">FB</span>
                <span className="text-3xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-zinc-500 group-hover:text-[#1877F2] transition-colors duration-500">Facebook</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="hidden md:block text-xs font-mono text-zinc-600 uppercase tracking-widest group-hover:text-zinc-400 transition-colors">/compufix.sp</span>
                <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-[#1877F2] group-hover:border-[#1877F2] transition-all duration-500">
                  <svg className="w-5 h-5 text-zinc-500 group-hover:text-white transform group-hover:rotate-[-45deg] transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </div>
              </div>
            </motion.a>

            <motion.a href="https://wa.me/543644589416?text=Hola%20Compufix!%20Me%20contacto%20desde%20su%20página%20web%20para%20hacer%20una%20consulta." aria-label="Enviar mensaje de WhatsApp a Soporte Técnico" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.2 }} className="group flex items-center justify-between py-10 md:py-16 border-b border-zinc-900 hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-6 md:gap-12">
                <span className="text-xl md:text-2xl font-mono font-black text-zinc-800 group-hover:text-zinc-500 transition-colors">WA</span>
                <span className="text-3xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-zinc-500 group-hover:text-[#25D366] transition-colors duration-500">WhatsApp</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="hidden md:block text-xs font-mono text-zinc-600 uppercase tracking-widest group-hover:text-zinc-400 transition-colors">Chatear ahora</span>
                <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-[#25D366] group-hover:border-[#25D366] transition-all duration-500">
                  <svg className="w-5 h-5 text-zinc-500 group-hover:text-black transform group-hover:rotate-[-45deg] transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </div>
              </div>
            </motion.a>

          </nav>
        </div>
      </section>

      {/* 10: FAQ */}
      <section id="faq" className="relative bg-[#050505] py-20 lg:py-32 border-t border-zinc-900 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
            
            <div className="lg:col-span-4 lg:sticky lg:top-40">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 bg-white"></span>
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Dudas Comunes</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none mb-6">
                  FAQ.
                </h2>
                <p className="text-sm font-mono text-zinc-400 leading-relaxed max-w-xs">
                  Respuestas rápidas sobre soporte técnico, desarrollo web y garantías en Chaco y alrededores.
                </p>
              </motion.div>
            </div>

            <div className="lg:col-span-8 flex flex-col border-t border-zinc-900">
              <FaqItem pregunta="¿Tienen garantía los mantenimientos de PC?" respuesta="Si, Todos nuestros trabajos de reparación de hardware, limpieza física y actualizaciones SSD/RAM cuentan con garantía." />
              <FaqItem pregunta="¿Si reparan u optimizan mi equipo, pierdo mis archivos y documentos?" respuesta="Para nada. Siempre realizamos copias de seguridad antes de modificar algo, de esta manera tu información está segura." />
              <FaqItem pregunta="¿El servicio de desarrollo web aplica fuera del Chaco?" respuesta="Sí, el área de Sistemas Web funciona 100% online. Desarrollamos páginas para clientes de todo Argentina mediante metodologías ágiles a distancia." />
              <FaqItem pregunta="¿Qué necesito para cotizar la instalación de cámaras CCTV?" respuesta="Basta con comunicarte al WhatsApp. Evaluamos la cobertura necesaria de tu domicilio o negocio y preparamos un presupuesto de videovigilancia a medida." />
              <FaqItem pregunta="¿Venden equipos informáticos nuevos?" respuesta="Nos centramos en la reparación de PC, optimización y montaje técnico de equipos armados bajo pedido, ya sea para oficina, diseño gráfico o gaming." />
              <FaqItem pregunta="¿Cómo es el sistema de pagos?" respuesta="El servicio técnico físico se abona al finalizar exitosamente. Para diseño web, trabajamos con un anticipo del 50%. Aceptamos efectivo, transferencias y billeteras virtuales." />
            </div>
            
          </div>
        </div>
      </section>

      {/* 11: CONTACTO / FORMULARIO */}
      <section id="contacto" className="relative bg-[#050505] py-20 lg:py-32 border-t border-zinc-900 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            <div className="flex flex-col justify-center">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 bg-white"></span>
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Iniciá tu consulta</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none mb-8">
                  Hablemos.
                </h2>
                <p className="text-lg font-mono text-zinc-400 leading-relaxed mb-12">
                  ¿Buscás optimizar tu PC, instalar cámaras de seguridad o crear una página web? Escribinos y transformemos esa idea en realidad.
                </p>

                <address className="flex flex-col gap-6 pt-8 border-t border-zinc-900 not-italic">
                  <div className="flex items-start gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-1">Ubicación</h4>
                      <p className="text-sm font-mono text-zinc-400">Presidencia Roque Sáenz Peña, Chaco.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-1">Horarios de Atención</h4>
                      <p className="text-sm font-mono text-zinc-400">Lunes a Viernes: 7:00 a 15:00 h.</p>
                    </div>
                  </div>
                </address>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.2 }}>
              <form onSubmit={manejarEnvio} className="flex flex-col gap-8 p-8 md:p-12 bg-[#0A0A0A] border border-zinc-900 shadow-2xl">
                
                <div className="relative group">
                  <label htmlFor="nombre" className="sr-only">Tu Nombre</label>
                  <input id="nombre" type="text" name="nombre" required placeholder="Tu nombre" className="w-full bg-transparent border-b border-zinc-800 py-4 text-white font-mono text-sm placeholder-zinc-600 focus:outline-none focus:border-white transition-colors" />
                </div>

                <div className="relative group">
                  <label htmlFor="email" className="sr-only">Tu Email</label>
                  <input id="email" type="email" name="email" required placeholder="Email" className="w-full bg-transparent border-b border-zinc-800 py-4 text-white font-mono text-sm placeholder-zinc-600 focus:outline-none focus:border-white transition-colors" />
                </div>

                <div className="relative group">
                  <label htmlFor="servicio" className="sr-only">Seleccionar Servicio</label>
                  <select id="servicio" name="servicio" required defaultValue="" className="w-full bg-[#0A0A0A] border-b border-zinc-800 py-4 text-zinc-400 font-mono text-sm focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer">
                    <option value="" disabled hidden>Seleccioná un servicio...</option>
                    <option value="desarrollo" className="bg-[#0A0A0A] text-white">Desarrollo Web / Páginas</option>
                    <option value="mantenimiento" className="bg-[#0A0A0A] text-white">Reparación de PC</option>
                    <option value="upgrade" className="bg-[#0A0A0A] text-white">Hardware y Upgrades</option>
                    <option value="cctv" className="bg-[#0A0A0A] text-white">Cámaras de Seguridad CCTV</option>
                    <option value="otro" className="bg-[#0A0A0A] text-white">Otras consultas</option>
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>

                <div className="relative group">
                  <label htmlFor="mensaje" className="sr-only">Mensaje</label>
                  <textarea id="mensaje" name="mensaje" required rows={4} placeholder="Contame los detalles de tu problema o proyecto..." className="w-full bg-transparent border-b border-zinc-800 py-4 text-white font-mono text-sm placeholder-zinc-600 focus:outline-none focus:border-white transition-colors resize-none"></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={estado === 'enviando' || estado === 'exito'}
                  className={`mt-4 w-full border px-8 py-5 text-sm font-mono uppercase tracking-widest transition-all duration-300 flex justify-center items-center gap-4
                    ${estado === 'ideal' ? 'border-zinc-800 text-white hover:bg-white hover:text-black' : ''}
                    ${estado === 'enviando' ? 'border-zinc-600 text-zinc-400 cursor-wait bg-zinc-900' : ''}
                    ${estado === 'exito' ? 'border-green-900 text-green-400 bg-green-950/30' : ''}
                    ${estado === 'error' ? 'border-red-900 text-red-400 bg-red-950/30 hover:bg-red-900 hover:text-white' : ''}
                  `}
                >
                  {estado === 'ideal' && <>Enviar Consulta <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></>}
                  {estado === 'enviando' && 'Procesando...'}
                  {estado === 'exito' && '✓ Recibido correctamente'}
                  {estado === 'error' && 'Error al enviar'}
                </button>
                
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 12: FOOTER */}
      <footer className="relative bg-black pt-24 pb-8 border-t border-zinc-900 z-30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            <div className="flex flex-col">
              <span className="text-2xl font-black uppercase tracking-tighter text-white mb-4">Compufix.SP</span>
              <p className="text-sm font-mono text-zinc-500 max-w-xs leading-relaxed">
                Arquitectura de hardware, sistemas CCTV y desarrollo web. Elevando el estándar técnico en la provincia.
              </p>
            </div>

            <nav aria-label="Navegación del sitio web" className="flex flex-col gap-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-2">Navegación</h4>
              <button onClick={volverArriba} className="text-left text-sm font-mono text-zinc-500 hover:text-white transition-colors w-fit">Inicio</button>
              <a href="#proceso" className="text-sm font-mono text-zinc-500 hover:text-white transition-colors w-fit">Metodología</a>
              <a href="#faq" className="text-sm font-mono text-zinc-500 hover:text-white transition-colors w-fit">Soporte y dudas</a>
              <a href="#contacto" className="text-sm font-mono text-zinc-500 hover:text-white transition-colors w-fit">Contacto rápido</a>
            </nav>

            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-2">Legal & políticas</h4>
              <a href="mailto:compufix.sp@gmail.com" className="text-sm font-mono text-zinc-500 hover:text-white transition-colors w-fit">
                compufix.sp@gmail.com
              </a>
              <a href="/politica-de-privacidad" className="text-sm font-mono text-zinc-500 hover:text-white transition-colors w-fit">
                Política de Privacidad
              </a>
              <a href="/politica-de-cookies" className="text-sm font-mono text-zinc-500 hover:text-white transition-colors w-fit">
                Política de Cookies
              </a>
            </div>
          </div>

          <div className="w-full border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs font-mono text-zinc-600 text-center md:text-left">
              © {new Date().getFullYear()} Compufix-sp. Todos los derechos reservados.
            </p>
            <p className="text-xs font-mono text-zinc-600 text-center md:text-right">
              Diseñado y desarrollado por <strong className="text-zinc-400 font-normal">COMPUFIX-SP</strong>
            </p>
          </div>
        </div>

        <div aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 bottom-[-4vw] w-full text-center pointer-events-none select-none z-0 overflow-hidden">
          <span className="text-[15vw] font-black uppercase tracking-tighter text-zinc-900/30 whitespace-nowrap">
            COMPUFIX.SP
          </span>
        </div>
      </footer>

      {/* BOTONES FLOTANTES */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex flex-col gap-4 items-center pointer-events-none pb-[max(0px,env(safe-area-inset-bottom))]">
        
        <button 
          onClick={volverArriba} 
          className={`w-12 h-12 bg-black border border-zinc-800 flex items-center justify-center transition-all duration-500 hover:bg-white text-zinc-400 hover:text-black pointer-events-auto shadow-[0_0_20px_rgba(0,0,0,0.5)]
            ${mostrarBoton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
          `}
          aria-label="Volver arriba de la página"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"></path></svg>
        </button>

        <a 
          href="https://wa.me/543644589416?text=Hola%20Compufix!%20Me%20contacto%20desde%20su%20página%20web%20para%20hacer%20una%20consulta." 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 pointer-events-auto shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)]"
          aria-label="Contactar rápidamente al Servicio Técnico por WhatsApp"
        >
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </a>
      </div>

    </main>
    </MotionConfig>
  );
}