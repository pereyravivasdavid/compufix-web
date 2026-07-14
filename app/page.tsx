"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  // --- ESTADO Y LÓGICA PARA EL BOTÓN DE SCROLL ---
  const [mostrarBoton, setMostrarBoton] = useState(false);

  useEffect(() => {
    const controlarScroll = () => {
      if (window.scrollY > 300) {
        setMostrarBoton(true);
      } else {
        setMostrarBoton(false);
      }
    };

    window.addEventListener("scroll", controlarScroll);
    return () => window.removeEventListener("scroll", controlarScroll);
  }, []);

  // Lógica para evitar que los enlaces con "#" traben el botón "Atrás"
  useEffect(() => {
    const manejarEnlacesInternos = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#') || href === '#') return;

      e.preventDefault();
      
      const elementoDestino = document.querySelector(href);
      if (elementoDestino) {
        elementoDestino.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState(null, '', href);
      }
    };

    document.addEventListener('click', manejarEnlacesInternos);
    return () => document.removeEventListener('click', manejarEnlacesInternos);
  }, []);

  const [estado, setEstado] = useState<'ideal' | 'enviando' | 'exito' | 'error'>('ideal');

  const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEstado('enviando');

    const formData = new FormData(e.currentTarget);
    const datos = Object.fromEntries(formData.entries());

    const res = await fetch('/api/send', {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      setEstado('exito');
      (e.target as HTMLFormElement).reset();
    } else {
      setEstado('error');
    }
  };

  const volverArriba = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generamos un array de 400 elementos para la grilla del Hero
  const gridItems = Array.from({ length: 400 });

  return (
    <main className="min-h-screen bg-black">
      {/* --- SEO --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Compufix",
            "image": "https://www.compufix-sp.com.ar/logo-compufix.webp", 
            "description": "Especialistas en mantenimiento y reparación de PC, optimización de hardware, instalación de cámaras de seguridad CCTV y desarrollo web a medida.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Presidencia Roque Sáenz Peña",
              "addressRegion": "Chaco",
              "addressCountry": "AR"
            },
            "telephone": "+543644589416",
            "url": "https://www.compufix-sp.com.ar", 
            "founder": "Leandro David",
            "foundingDate": "2016",
            "priceRange": "$$"
          })
        }}
      />

      {/* --- HEADER STICKY --- */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="/" aria-label="Volver al inicio de Compufix" className="group">
                <Image 
                  src="/logo-compufix.webp" 
                  alt="Logotipo de Compufix" 
                  width={120} 
                  height={35} 
                  className="w-auto h-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                />
              </a>
            </div>

            {/* Navegación */}
            <div className="flex items-center gap-8">
              <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-6">
                
                {/* Menú desplegable */}
                <div className="relative group py-5">
                  <a href="#servicios" title="Ver todos los servicios" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-1 cursor-pointer">
                    Servicios
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:rotate-180 text-zinc-500">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </a>

                  {/* Submenú */}
                  <div className="absolute top-full -left-4 w-56 bg-zinc-950 border border-zinc-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col py-2 translate-y-2 group-hover:translate-y-0 rounded-none shadow-2xl">
                    <a href="#detalle-mantenimiento" className="px-4 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors border-l-2 border-transparent hover:border-zinc-500">Mantenimiento de PC</a>
                    <a href="#detalle-optimizacion" className="px-4 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors border-l-2 border-transparent hover:border-zinc-500">Optimización de equipos</a>
                    <a href="#detalle-cctv" className="px-4 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors border-l-2 border-transparent hover:border-zinc-500">Cámaras de seguridad</a>
                    <a href="#detalle-desarrollo" className="px-4 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors border-l-2 border-transparent hover:border-zinc-500">Desarrollo web y sistemas</a>
                  </div>
                </div>

                <a href="#sobre-nosotros" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">Sobre nosotros</a>
                <a href="#proceso" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">Cómo trabajamos</a>
                <a href="#faq" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">Preguntas frecuentes</a>
                <a href="#sociales" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">Redes</a>
              </nav>

              {/* Botón Contacto Header */}
              <a 
                href="#contacto" 
                className="bg-white text-black px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
              >
                Contacto
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* --- SECCIÓN HERO INTERACTIVO (SWISS GRID / EDITORIAL TÉCNICO) --- */}
      <section className="relative w-full min-h-screen flex flex-col bg-black border-b border-zinc-900 pt-16">
        
        {/* Contenedor Principal dividido en Grilla Exacta */}
        <div className="flex-1 flex flex-col md:flex-row w-full max-w-[1400px] mx-auto border-x border-zinc-900">
          
          {/* Columna Izquierda: Titular y Copy */}
          <div className="w-full md:w-2/3 border-b md:border-b-0 md:border-r border-zinc-900 p-8 md:p-16 flex flex-col justify-center relative">
            
            {/* Patrón de puntos técnico en el fondo de esta celda */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-4 px-4 py-2 border border-zinc-800 bg-zinc-950 mb-12">
                <span className="w-2 h-2 bg-[#E1F030] animate-pulse"></span>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                  STATUS: ONLINE
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase leading-[0.9] mb-8">
                COMPUFIX.SP <br />
                <span className="text-zinc-600">desarrollo &</span> <br />
                INFRAESTRUCTURA.
              </h1>
              
              <p className="text-lg font-mono text-zinc-400 mb-12 max-w-xl leading-relaxed">
                Desarrollo web full-stack de alto rendimiento e infraestructura técnica especializada. Soluciones precisas, sin vueltas.
              </p>

              <div className="flex flex-col sm:flex-row gap-0 border border-zinc-800 w-fit">
                <a 
                  href="#contacto"
                  className="bg-white text-black px-8 py-4 font-mono font-bold text-sm uppercase tracking-widest hover:bg-[#E1F030] transition-colors text-center"
                >
                  Iniciar Proyecto
                </a>
                <a 
                  href="#servicios"
                  className="bg-black text-white px-8 py-4 font-mono font-bold text-sm uppercase tracking-widest hover:bg-zinc-900 transition-colors text-center border-t sm:border-t-0 sm:border-l border-zinc-800"
                >
                  Ver Servicios
                </a>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Stack y Datos (Dividida en 2 filas) */}
          <div className="w-full md:w-1/3 flex flex-col">
            
            {/* Celda Superior: Stack Técnico */}
            <div className="flex-1 border-b border-zinc-900 p-8 flex flex-col justify-center bg-zinc-950/30 hover:bg-zinc-900/50 transition-colors">
              <h3 className="text-white font-mono font-bold text-xs uppercase tracking-widest mb-6">
                // Software Stack
              </h3>
              <ul className="space-y-4 font-mono text-sm text-zinc-500">
                <li className="flex justify-between border-b border-zinc-900 pb-2">
                  <span className="text-zinc-300">Framework</span>
                  <span>Next.js / React</span>
                </li>
                <li className="flex justify-between border-b border-zinc-900 pb-2">
                  <span className="text-zinc-300">CMS</span>
                  <span>WordPress Avanzado</span>
                </li>
                <li className="flex justify-between border-b border-zinc-900 pb-2">
                  <span className="text-zinc-300">Deploy</span>
                  <span>Vercel / Git</span>
                </li>
              </ul>
            </div>

            {/* Celda Inferior: Infraestructura */}
            <div className="flex-1 p-8 flex flex-col justify-center bg-zinc-950/30 hover:bg-zinc-900/50 transition-colors">
              <h3 className="text-[#E1F030] font-mono font-bold text-xs uppercase tracking-widest mb-6">
                [ Hardware & Redes ]
              </h3>
              <ul className="space-y-4 font-mono text-sm text-zinc-500">
                <li className="flex justify-between border-b border-zinc-900 pb-2">
                  <span className="text-zinc-300">Equipos</span>
                  <span>Mantenimiento & Refurbish</span>
                </li>
                <li className="flex justify-between border-b border-zinc-900 pb-2">
                  <span className="text-zinc-300">Seguridad</span>
                  <span>Instalación CCTV</span>
                </li>
                <li className="flex justify-between border-b border-zinc-900 pb-2">
                  <span className="text-zinc-300">Redes</span>
                  <span>Cableado Estructurado</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECCIÓN NUESTROS SERVICIOS (GLASSMORPHISM ABSTRACTO) --- */}
      <section id="servicios" className="py-24 relative overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-20"
          > 
            <span className="text-zinc-500 font-mono text-sm tracking-widest uppercase mb-2 block">
              // Nuestras soluciones
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
              Servicios
            </h2>
            <div className="w-full h-[1px] bg-zinc-800 mt-8"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            
            {/* Tarjeta 4 */}
            <motion.article 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group relative bg-zinc-950/40 backdrop-blur-md border border-zinc-800 p-8 md:p-12 min-h-[340px] flex flex-col justify-between overflow-hidden transition-colors duration-500 hover:border-zinc-600"
            >
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-[80px] group-hover:bg-white/10 group-hover:scale-110 transition-all duration-700 ease-out pointer-events-none"></div>
              <div className="relative z-10">
                <span className="text-zinc-700 font-mono text-2xl font-bold tracking-tighter mb-6 block group-hover:text-zinc-500 transition-colors">01 /</span>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">Desarrollo Web</h3>
                <p className="text-zinc-400 leading-relaxed max-w-sm">
                  Llevamos tu negocio al mundo digital. Construimos desde landing pages efectivas hasta sistemas de gestión web a medida.
                </p>
              </div>
              <div className="relative z-10 mt-10">
                <a href="#detalle-desarrollo" className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white group-hover:text-zinc-300 transition-colors">
                  Explorar
                  <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </a>
              </div>
            </motion.article>
            
            {/* Tarjeta 1 */}
            <motion.article 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="group relative bg-zinc-950/40 backdrop-blur-md border border-zinc-800 p-8 md:p-12 min-h-[340px] flex flex-col justify-between overflow-hidden transition-colors duration-500 hover:border-zinc-600"
            >
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#E1F030]/5 rounded-full blur-[80px] group-hover:bg-[#E1F030]/15 group-hover:scale-110 transition-all duration-700 ease-out pointer-events-none"></div>
              <div className="relative z-10">
                <span className="text-zinc-700 font-mono text-2xl font-bold tracking-tighter mb-6 block group-hover:text-zinc-500 transition-colors">02 /</span>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">Mantenimiento de PC</h3>
                <p className="text-zinc-400 leading-relaxed max-w-sm">
                  Diagnóstico preciso, limpieza física profunda y solución a fallas de hardware para que tu equipo vuelva a funcionar como el primer día.
                </p>
              </div>
              <div className="relative z-10 mt-10">
                <a href="#detalle-mantenimiento" className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white group-hover:text-[#E1F030] transition-colors">
                  Explorar
                  <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </a>
              </div>
            </motion.article>

            {/* Tarjeta 2 */}
            <motion.article 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative bg-zinc-950/40 backdrop-blur-md border border-zinc-800 p-8 md:p-12 min-h-[340px] flex flex-col justify-between overflow-hidden transition-colors duration-500 hover:border-zinc-600"
            >
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[80px] group-hover:bg-blue-500/15 group-hover:scale-110 transition-all duration-700 ease-out pointer-events-none"></div>
              <div className="relative z-10">
                <span className="text-zinc-700 font-mono text-2xl font-bold tracking-tighter mb-6 block group-hover:text-zinc-500 transition-colors">03 /</span>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">Optimización de Equipos</h3>
                <p className="text-zinc-400 leading-relaxed max-w-sm">
                  Actualización estratégica de componentes (SSD, ampliación de RAM) y software para darle una segunda vida a computadoras lentas.
                </p>
              </div>
              <div className="relative z-10 mt-10">
                <a href="#detalle-optimizacion" className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white group-hover:text-blue-400 transition-colors">
                  Explorar
                  <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </a>
              </div>
            </motion.article>

            {/* Tarjeta 3 */}
            <motion.article 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative bg-zinc-950/40 backdrop-blur-md border border-zinc-800 p-8 md:p-12 min-h-[340px] flex flex-col justify-between overflow-hidden transition-colors duration-500 hover:border-zinc-600"
            >
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-red-500/5 rounded-full blur-[80px] group-hover:bg-red-500/15 group-hover:scale-110 transition-all duration-700 ease-out pointer-events-none"></div>
              <div className="relative z-10">
                <span className="text-zinc-700 font-mono text-2xl font-bold tracking-tighter mb-6 block group-hover:text-zinc-500 transition-colors">04 /</span>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">Cámaras de Seguridad</h3>
                <p className="text-zinc-400 leading-relaxed max-w-sm">
                  Instalación profesional de sistemas de videovigilancia CCTV de alta definición. Configuración de DVRs y monitoreo remoto 24/7.
                </p>
              </div>
              <div className="relative z-10 mt-10">
                <a href="#detalle-cctv" className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white group-hover:text-red-400 transition-colors">
                  Explorar
                  <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </a>
              </div>
            </motion.article>

            

          </div>
        </div>
      </section>

      {/* --- SECCIONES DE DETALLE (MINIMALISTA / FIXED IMAGES) --- */}
      <div className="flex flex-col gap-32 py-32 border-b border-zinc-900">

        {/* 1. DESARROLLO WEB */}
        <section id="detalle-desarrollo" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* Texto Flotante (Hace scroll) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 z-20 pb-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-none bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]"></span>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Sistemas</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6 leading-tight">
                Desarrollo web a medida.
              </h2>
              <div className="text-sm font-mono text-zinc-400 leading-relaxed space-y-4 max-w-md mb-8">
                <p>Llevamos tu negocio al mundo digital utilizando tecnologías modernas y eficientes.</p>
                <p>Desde una landing page de alta conversión para captar clientes, hasta sistemas complejos de gestión para administrar usuarios e inventarios.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-0 border border-zinc-800 w-fit">
                <a href="#contacto" className="bg-white text-black px-6 py-3 text-xs font-mono font-bold hover:bg-zinc-200 transition-colors text-center">
                  Cotizar
                </a>
                <Link href="/portfolio" className="bg-transparent text-zinc-400 px-6 py-3 text-xs font-mono font-bold hover:text-white hover:bg-zinc-900 transition-colors text-center border-t sm:border-t-0 sm:border-l border-zinc-800">
                  Ver portfolio
                </Link>
              </div>
            </motion.div>

            {/* Imagen Fija (Sticky) */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-6 lg:sticky lg:top-40 flex justify-center lg:justify-end w-full"
            >
              <div className="relative w-full max-w-[380px] aspect-[4/5] border border-zinc-800 bg-zinc-950 p-2">
                <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
                <div className="relative w-full h-full">
                  <Image src="/desarrollo-nuevo.webp" alt="Desarrollo Web" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-80" />
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* 2. MANTENIMIENTO DE PC */}
        <section id="detalle-mantenimiento" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* Texto Flotante */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 z-20 pb-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-none bg-[#E1F030]"></span>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Mantenimiento</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6 leading-tight">
                Mantenimiento y reparación de PC.
              </h2>
              <div className="text-sm font-mono text-zinc-400 leading-relaxed space-y-4 max-w-md">
                <p>Un equipo lento o con sobrecalentamiento reduce tu productividad y acorta la vida útil de tus componentes.</p>
                <p>Realizamos diagnósticos precisos, limpieza física profunda y solución a fallas de hardware para que tu equipo vuelva a funcionar como el primer día.</p>
                <ul className="space-y-2 mt-4 text-zinc-500">
                  <li className="flex gap-2"><span className="text-zinc-300">/</span> Limpieza de virus y malware.</li>
                  <li className="flex gap-2"><span className="text-zinc-300">/</span> Reinstalación de sistemas (Windows/Linux).</li>
                  <li className="flex gap-2"><span className="text-zinc-300">/</span> Backup y resguardo de información.</li>
                </ul>
              </div>
            </motion.div>

            {/* Imagen Fija */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-6 lg:sticky lg:top-40 flex justify-center lg:justify-end w-full"
            >
              <div className="relative w-full max-w-[380px] aspect-[4/5] border border-zinc-800 bg-zinc-950 p-2">
                <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
                <div className="relative w-full h-full">
                  <Image src="/img-reparacion.webp" alt="Servicio técnico de PC" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-80" />
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* 3. OPTIMIZACIÓN */}
        <section id="detalle-optimizacion" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* Texto Flotante */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 z-20 pb-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-none bg-zinc-400"></span>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Hardware</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6 leading-tight">
                Optimización y segunda vida.
              </h2>
              <div className="text-sm font-mono text-zinc-400 leading-relaxed space-y-4 max-w-md">
                <p>No necesitas comprar una computadora nueva. Con actualizaciones estratégicas, podemos revivir ese equipo que tenés sin usar.</p>
                <p>La instalación de un disco de estado sólido (SSD) y la ampliación de memoria RAM son inversiones pequeñas que ofrecen un cambio radical en la velocidad.</p>
                <ul className="space-y-2 mt-4 text-zinc-500">
                  <li className="flex gap-2"><span className="text-zinc-300">/</span> Clonación de discos a SSD sin perder datos.</li>
                  <li className="flex gap-2"><span className="text-zinc-300">/</span> Asesoramiento y armado a medida.</li>
                  <li className="flex gap-2"><span className="text-zinc-300">/</span> Optimización de recursos de red.</li>
                </ul>
              </div>
            </motion.div>

            {/* Imagen Fija */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-6 lg:sticky lg:top-40 flex justify-center lg:justify-end w-full"
            >
              <div className="relative w-full max-w-[380px] aspect-[4/5] border border-zinc-800 bg-zinc-950 p-2">
                <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
                <div className="relative w-full h-full">
                  <Image src="/img-opti.webp" alt="Hardware SSD y RAM" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-80" />
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* 4. INSTALACIÓN CCTV */}
        <section id="detalle-cctv" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* Texto Flotante */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 z-20 pb-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-none bg-zinc-600"></span>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Seguridad</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6 leading-tight">
                Instalación de cámaras CCTV.
              </h2>
              <div className="text-sm font-mono text-zinc-400 leading-relaxed space-y-4 max-w-md">
                <p>Realizamos instalaciones técnicas profesionales de sistemas de videovigilancia de alta definición.</p>
                <p>Diseñamos la cobertura ideal para tu hogar o negocio. Podrás monitorear todo en tiempo real desde tu celular, estés donde estés.</p>
                <ul className="space-y-2 mt-4 text-zinc-500">
                  <li className="flex gap-2"><span className="text-zinc-300">/</span> Instalación de DVRs y cámaras HD.</li>
                  <li className="flex gap-2"><span className="text-zinc-300">/</span> Acceso remoto en smartphones y PCs.</li>
                  <li className="flex gap-2"><span className="text-zinc-300">/</span> Revisión de cableado estructurado.</li>
                </ul>
              </div>
            </motion.div>

            {/* Imagen Fija */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-6 lg:sticky lg:top-40 flex justify-center lg:justify-end w-full"
            >
              <div className="relative w-full max-w-[380px] aspect-[4/5] border border-zinc-800 bg-zinc-950 p-2">
                <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
                <div className="relative w-full h-full">
                  <Image src="/img-camaras.webp" alt="Instalación CCTV" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-80" />
                </div>
              </div>
            </motion.div>

          </div>
        </section>

      </div>

      {/* --- SECCIÓN SOBRE NOSOTROS (MINIMALISTA) --- */}
      <section id="sobre-nosotros" className="w-full py-32 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* Texto Flotante (Hace scroll) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 z-20 pb-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-none bg-blue-500"></span>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Leandro David</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6 leading-tight">
                Sobre Compufix.
              </h2>
              <div className="text-sm font-mono text-zinc-400 leading-relaxed space-y-4 max-w-md mb-8">
                <p>¡Hola! Soy técnico especialista, especializado en dar soluciones tecnológicas integrales.</p>
                <p>Tengo 32 años y resido en Presidencia Roque Sáenz Peña, Chaco. Mi pasión por la tecnología me llevó a formarme continuamente para ofrecer un servicio de excelencia.</p>
                <p>Con especializaciones en redes, reparación y mantenimiento de PC, sistemas de seguridad y desarrollo web full stack, combino el hardware y el software para potenciar tu presencia digital y resguardar tu equipamiento.</p>
                <p>Este proyecto comenzó en 2016 desde mi casa, donde armé un pequeño taller equipado para trabajar a diario con el objetivo de darle una segunda vida a tus dispositivos y crear herramientas digitales a medida.</p>
              </div>
              <div className="border border-zinc-800 w-fit">
                <a
                  href="#contacto"
                  className="block bg-white text-black px-6 py-3 text-xs font-mono font-bold hover:bg-zinc-200 transition-colors text-center uppercase tracking-widest"
                >
                  Contactar
                </a>
              </div>
            </motion.div>

            {/* Imagen Fija (Sticky) */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-6 lg:sticky lg:top-40 flex justify-center lg:justify-end w-full"
            >
              <div className="relative w-full max-w-[380px] aspect-[4/5] border border-zinc-800 bg-zinc-950 p-2">
                <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
                <div className="relative w-full h-full">
                  <Image
                    src="/img-about.webp"
                    alt="Leandro David trabajando en su taller"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-80"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- OPCIÓN 2: TIPOGRAFÍA MONUMENTAL --- */}
      <section id="proceso" className="py-32 overflow-hidden relative border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="mb-24 md:w-1/2">
            <h2 className="text-3xl md:text-6xl font-medium tracking-tight text-white mb-6">
              Nuestra forma de trabajar.
            </h2>
            <p className="text-sm font-mono text-zinc-500">
              Un proceso de tres etapas diseñado para resolver problemas técnicos sin fricciones.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-zinc-800 -translate-x-1/2"></div>

            <div className="space-y-24 md:space-y-40">
              
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.7 }}
                className="relative flex flex-col md:flex-row items-start md:items-center justify-between group"
              >
                <div className="absolute -top-10 left-0 md:left-auto md:right-1/2 md:mr-10 text-[120px] md:text-[180px] font-black text-white/5 tracking-tighter leading-none pointer-events-none select-none">
                  01
                </div>
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full transition-transform duration-500 group-hover:scale-150"></div>
                <div className="md:w-5/12 ml-12 md:ml-0 md:text-right md:pr-16 relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">Diagnóstico</h3>
                </div>
                <div className="md:w-5/12 ml-12 md:ml-0 md:pl-16 relative z-10">
                  <p className="text-sm font-mono text-zinc-400 leading-relaxed">
                    Evaluamos a fondo si tu equipo necesita mantenimiento, actualización o si querés un desarrollo web.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.7 }}
                className="relative flex flex-col md:flex-row-reverse items-start md:items-center justify-between group"
              >
                <div className="absolute -top-10 left-0 md:left-1/2 md:ml-10 text-[120px] md:text-[180px] font-black text-white/5 tracking-tighter leading-none pointer-events-none select-none">
                  02
                </div>
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full transition-transform duration-500 group-hover:scale-150"></div>
                <div className="md:w-5/12 ml-12 md:ml-0 md:pl-16 relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">Propuesta</h3>
                </div>
                <div className="md:w-5/12 ml-12 md:ml-0 md:text-right md:pr-16 relative z-10">
                  <p className="text-sm font-mono text-zinc-400 leading-relaxed">
                    Te enviamos un presupuesto claro. Explicamos repuestos, tecnologías y tiempos estimados. Sin letras chicas.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.7 }}
                className="relative flex flex-col md:flex-row items-start md:items-center justify-between group"
              >
                <div className="absolute -top-10 left-0 md:left-auto md:right-1/2 md:mr-10 text-[120px] md:text-[180px] font-black text-white/5 tracking-tighter leading-none pointer-events-none select-none">
                  03
                </div>
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#E1F030] rounded-full transition-transform duration-500 group-hover:scale-150"></div>
                <div className="md:w-5/12 ml-12 md:ml-0 md:text-right md:pr-16 relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">Ejecución</h3>
                </div>
                <div className="md:w-5/12 ml-12 md:ml-0 md:pl-16 relative z-10">
                  <p className="text-sm font-mono text-zinc-400 leading-relaxed">
                    Ponemos manos a la obra. Te mantenemos informado y entregamos todo testeado, funcionando al 100%.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN PREGUNTAS FRECUENTES --- */}
      <section id="faq" className="py-32 overflow-hidden border-b border-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16 relative flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Soporte</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">
              Preguntas frecuentes.
            </h2>
            <p className="text-sm font-mono text-zinc-500 mt-4 max-w-xl mx-auto">
              Despejá tus dudas rápidas antes de arrancar tu proyecto con nosotros.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="space-y-4"
          >
            <details className="group border border-zinc-800 bg-black hover:bg-zinc-900/50 transition-colors [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-white font-medium">
                <h3 className="text-base md:text-lg">¿Cuánto demora el mantenimiento de pc o notebook?</h3>
                <span className="relative font-mono text-zinc-500 font-bold shrink-0 group-hover:text-white transition-colors">
                  <span className="group-open:hidden">[+]</span>
                  <span className="hidden group-open:inline">[-]</span>
                </span>
              </summary>
              <div className="px-6 pb-6 text-sm font-mono text-zinc-400 leading-relaxed border-t border-zinc-800/50 pt-4 mt-2">
                Depende del diagnóstico inicial, pero los trabajos generales de limpieza física, cambio de pasta térmica y optimización de equipos suelen estar listos entre 24 y 48 horas. Siempre te informamos el estado y pedimos tu confirmación antes de avanzar con cambios o repuestos.
              </div>
            </details>

            <details className="group border border-zinc-800 bg-black hover:bg-zinc-900/50 transition-colors [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-white font-medium">
                <h3 className="text-base md:text-lg">Si instalan Windows en mi equipo, ¿pierdo mi información?</h3>
                <span className="relative font-mono text-zinc-500 font-bold shrink-0 group-hover:text-white transition-colors">
                  <span className="group-open:hidden">[+]</span>
                  <span className="hidden group-open:inline">[-]</span>
                </span>
              </summary>
              <div className="px-6 pb-6 text-sm font-mono text-zinc-400 leading-relaxed border-t border-zinc-800/50 pt-4 mt-2">
                <strong className="text-white">Para nada.</strong> Tu tranquilidad es nuestra prioridad. Antes de realizar cualquier instalación o formateo, llevamos a cabo un <strong className="text-zinc-300">backup preventivo</strong> de todos los archivos que quieras conservar.
              </div>
            </details>

            <details className="group border border-zinc-800 bg-black hover:bg-zinc-900/50 transition-colors [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-white font-medium">
                <h3 className="text-base md:text-lg">¿Cómo es el proceso para un desarrollo web?</h3>
                <span className="relative font-mono text-zinc-500 font-bold shrink-0 group-hover:text-white transition-colors">
                  <span className="group-open:hidden">[+]</span>
                  <span className="hidden group-open:inline">[-]</span>
                </span>
              </summary>
              <div className="px-6 pb-6 text-sm font-mono text-zinc-400 leading-relaxed border-t border-zinc-800/50 pt-4 mt-2">
                Lo dividimos en etapas muy claras. Primero charlamos sobre qué necesita tu negocio. Luego, armamos una propuesta de diseño y funciones. Una vez aprobada, pasamos al código y nos mantenemos en contacto para mostrarte los avances.
              </div>
            </details>

            <details className="group border border-zinc-800 bg-black hover:bg-zinc-900/50 transition-colors [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-white font-medium">
                <h3 className="text-base md:text-lg">¿Brindan garantía por las reparaciones?</h3>
                <span className="relative font-mono text-zinc-500 font-bold shrink-0 group-hover:text-white transition-colors">
                  <span className="group-open:hidden">[+]</span>
                  <span className="hidden group-open:inline">[-]</span>
                </span>
              </summary>
              <div className="px-6 pb-6 text-sm font-mono text-zinc-400 leading-relaxed border-t border-zinc-800/50 pt-4 mt-2">
                Totalmente. Tanto la mano de obra en reparación de pc como los componentes nuevos que instalamos (como discos SSD o memorias RAM) cuentan con garantía. Buscamos relaciones a largo plazo.
              </div>
            </details>

          </motion.div>
        </div>
      </section>

      {/* --- SECCIÓN FORMULARIO DE CONTACTO --- */}
      <section id="contacto" className="py-32 overflow-hidden relative border-b border-zinc-900">

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16 flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#E1F030]"></span>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Contacto</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">
              Envianos tu consulta.
            </h2>
            <p className="text-sm font-mono text-zinc-500 mt-4 max-w-xl mx-auto">
              Completá el formulario y nos pondremos en contacto con vos a la brevedad para asesorarte.
            </p>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            onSubmit={manejarEnvio} 
            className="grid grid-cols-1 gap-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nombre" className="block text-xs font-mono text-zinc-500 mb-2 uppercase tracking-widest">Nombre completo</label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder="Ej: Juan Pérez"
                  className="w-full px-4 py-3 bg-black border border-zinc-800 text-white placeholder-zinc-700 focus:outline-none focus:border-white transition-colors font-mono text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-mono text-zinc-500 mb-2 uppercase tracking-widest">Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="ejemplo@correo.com"
                  className="w-full px-4 py-3 bg-black border border-zinc-800 text-white placeholder-zinc-700 focus:outline-none focus:border-white transition-colors font-mono text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="servicio" className="block text-xs font-mono text-zinc-500 mb-2 uppercase tracking-widest">¿En qué podemos ayudarte?</label>
              <div className="relative">
                <select
                  id="servicio"
                  name="servicio"
                  className="w-full px-4 py-3 bg-black border border-zinc-800 text-white appearance-none cursor-pointer focus:outline-none focus:border-white transition-colors font-mono text-sm"
                >
                  <option>Mantenimiento y Reparación de PC</option>
                  <option>Optimización de Equipos</option>
                  <option>Instalación de Cámaras (CCTV)</option>
                  <option>Desarrollo Web / Sistemas</option>
                  <option>Otro motivo</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-zinc-500">
                  <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="mensaje" className="block text-xs font-mono text-zinc-500 mb-2 uppercase tracking-widest">Tu mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                placeholder="Contanos un poco más sobre lo que necesitás..."
                className="w-full px-4 py-3 bg-black border border-zinc-800 text-white placeholder-zinc-700 resize-none focus:outline-none focus:border-white transition-colors font-mono text-sm"
                required
              ></textarea>
            </div>

            {estado === 'exito' && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 border border-[#25D366] bg-black text-[#25D366] text-sm font-mono flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                [OK] Mensaje enviado con éxito.
              </motion.div>
            )}

            {estado === 'error' && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 border border-red-500 bg-black text-red-500 text-sm font-mono flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                [ERROR] Hubo un problema. Intentá nuevamente.
              </motion.div>
            )}

            <button
              type="submit"
              disabled={estado === 'enviando'}
              className={`w-full mt-4 text-black font-mono font-bold uppercase tracking-widest text-sm py-4 transition-all duration-300 flex justify-center items-center gap-2
                ${estado === 'enviando' ? 'bg-zinc-600 cursor-wait opacity-80' : 'bg-white hover:bg-zinc-200 active:scale-[0.99]'}`}
            >
              {estado === 'enviando' ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </>
              ) : ('Enviar mensaje')}
            </button>
          </motion.form>

        </div>
      </section>

      {/* --- SECCIÓN REDES SOCIALES --- */}
      <section id="sociales" className="py-32 overflow-hidden relative">
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Redes</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">
              ¡Conectemos!
            </h2>
            <p className="text-sm font-mono text-zinc-500 mb-16 max-w-xl mx-auto mt-4">
              Contactanos directamente o seguinos en nuestras redes sociales para ver nuestros últimos trabajos y novedades.
            </p>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">

            <motion.a 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              href="https://wa.me/543644589416?text=Hola%20Compufix!%20Me%20contacto%20desde%20su%20página%20web%20para%20pedir%20un%20presupuesto." 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Ir a WhatsApp de Compufix"
              className="group flex items-center justify-center gap-4 px-8 py-4 border border-zinc-800 bg-black text-white font-mono text-sm uppercase tracking-widest font-bold transition-all duration-300 w-full sm:w-auto hover:border-white hover:bg-zinc-900"
            >
              <svg aria-hidden="true" className="text-zinc-500 group-hover:text-[#25D366] transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73.0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
              WhatsApp
            </motion.a>
            
            <motion.a 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              href="https://www.instagram.com/compufix.sp" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Perfil de Instagram de Compufix"
              className="group flex items-center justify-center gap-4 px-8 py-4 border border-zinc-800 bg-black text-white font-mono text-sm uppercase tracking-widest font-bold transition-all duration-300 w-full sm:w-auto hover:border-white hover:bg-zinc-900"
            >
              <svg aria-hidden="true" className="text-zinc-500 group-hover:text-[#E1306C] transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              Instagram
            </motion.a>

            <motion.a 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              href="https://www.facebook.com/compufix.sp" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Página de Facebook de Compufix"
              className="group flex items-center justify-center gap-4 px-8 py-4 border border-zinc-800 bg-black text-white font-mono text-sm uppercase tracking-widest font-bold transition-all duration-300 w-full sm:w-auto hover:border-white hover:bg-zinc-900"
            >
              <svg aria-hidden="true" className="text-zinc-500 group-hover:text-[#1877F2] transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </motion.a>

          </div>
        </div>
      </section>

      {/* --- FOOTER (ESTILO MINIMALISTA) --- */}
      <footer className="bg-black py-16 border-t border-zinc-900 text-zinc-400 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left items-center md:items-start">
            
            <div className="flex flex-col items-center md:items-start">
              <Image 
                src="/logo-compufix.webp" 
                alt="Logotipo de Compufix en pie de página" 
                width={120} 
                height={40} 
                className="w-auto h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-mono font-bold text-white mb-6 uppercase tracking-widest text-xs">Contacto directo</h4>
              <ul className="space-y-4 text-sm font-mono">
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <span className="text-zinc-600">/</span>
                  <a href="mailto:compufix.sp@gmail.com" className="hover:text-white transition-colors">compufix.sp@gmail.com</a>
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <span className="text-zinc-600">/</span>
                  <a href="https://wa.me/543644589416" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">+54 364 458-9416</a>
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <span className="text-zinc-600">/</span>
                  <span>Presidencia Roque Sáenz Peña, Chaco</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center md:items-end justify-center space-y-4 text-xs font-mono text-zinc-500">
              <Link href="/politica-de-privacidad" className="hover:text-white transition-colors">Política de privacidad</Link>
              <Link href="/politica-de-cookies" className="hover:text-white transition-colors">Política de cookies</Link>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-zinc-900 text-center flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs font-mono text-zinc-600">© {new Date().getFullYear()} Compufix.sp. Todos los derechos reservados.</p>
            <p className="text-zinc-700 text-xs font-mono font-bold tracking-widest uppercase">
              Sistemas & Hardware
            </p>
          </div>
        </div>
      </footer>

      {/* --- BOTONES FLOTANTES MINIMALISTAS --- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-4">
        
        <button
          onClick={volverArriba}
          aria-label="Volver arriba"
          className={`group bg-zinc-900 border border-zinc-800 w-10 h-10 flex items-center justify-center transition-all duration-500 hover:bg-white ${
            mostrarBoton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 group-hover:text-black transition-colors">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
        </button>

        <a
          href="https://wa.me/543644589416?text=Hola%20Compufix!%20Me%20contacto%20desde%20su%20página%20web%20para%20pedir%20un%20presupuesto."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="bg-[#25D366] w-12 h-12 flex items-center justify-center hover:bg-[#1EBE5D] hover:scale-105 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73.0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
          </svg>
        </a>
      </div>
    </main>
  );
}