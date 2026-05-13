"use client"; // <-- AGREGAR ESTA LÍNEA ARRIBA DE TODO

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  // --- ESTADO Y LÓGICA PARA EL BOTÓN DE SCROLL ---
  const [mostrarBoton, setMostrarBoton] = useState(false);

  useEffect(() => {
    const controlarScroll = () => {
      // Si el usuario bajó más de 300 píxeles, mostramos el botón
      if (window.scrollY > 300) {
        setMostrarBoton(true);
      } else {
        setMostrarBoton(false);
      }
    };

    window.addEventListener("scroll", controlarScroll);
    return () => window.removeEventListener("scroll", controlarScroll);
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
      (e.target as HTMLFormElement).reset(); // Limpia el formulario
    } else {
      setEstado('error');
    }
  };

  const volverArriba = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen">
      {/* --- SEO: DATOS ESTRUCTURADOS PARA GOOGLE (LOCAL BUSINESS) --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Compufix",
            "image": "https://www.tudominio.com.ar/logo-compufix.webp", // Cambiar por tu dominio real
            "description": "Especialistas en mantenimiento y reparación de PC, optimización de hardware, instalación de cámaras de seguridad CCTV y desarrollo web a medida.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Presidencia Roque Sáenz Peña",
              "addressRegion": "Chaco",
              "addressCountry": "AR"
            },
            "telephone": "+543644589416",
            "url": "https://www.tudominio.com.ar", // Cambiar por tu dominio real
            "founder": "Leandro David",
            "foundingDate": "2016",
            "priceRange": "$$"
          })
        }}
      />

      {/* --- HEADER STICKY (DARK MODE & NEÓN) --- */}
      <header className="sticky top-0 z-50 bg-black border-b border-zinc-900 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo a la izquierda */}
            <div className="flex-shrink-0 flex items-center">
              <a href="/" aria-label="Volver al inicio de Compufix" className="group">
                <Image 
                  src="/logo-compufix.webp" 
                  alt="Logotipo de Compufix - Servicio Técnico y Desarrollo Web" 
                  width={120} 
                  height={35} 
                  className="w-auto h-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                />
              </a>
            </div>

            {/* Contenedor derecho: Enlaces + Botón agrupados */}
            <div className="flex items-center gap-8">
              
              {/* Enlaces de navegación */}
              <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-6">
                
                {/* Menú desplegable de Servicios */}
                <div className="relative group py-5">
                  <a href="#servicios" title="Ver todos los servicios" className="text-zinc-400 hover:text-white transition-all hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] text-sm font-medium flex items-center gap-1 cursor-pointer">
                    Servicios
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:rotate-180 text-blue-500">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </a>

                  {/* Submenú flotante */}
                  <div className="absolute top-full -left-4 w-56 bg-zinc-950 border border-zinc-800 shadow-[0_10px_30px_rgba(0,0,0,0.9)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col py-2 translate-y-2 group-hover:translate-y-0 rounded-none">
                    <a href="#detalle-mantenimiento" title="Servicio de Mantenimiento de PC" className="px-4 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-blue-400 transition-colors border-l-2 border-transparent hover:border-blue-500">
                      Mantenimiento de PC
                    </a>
                    <a href="#detalle-optimizacion" title="Servicio de Optimización de Hardware" className="px-4 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-blue-400 transition-colors border-l-2 border-transparent hover:border-blue-500">
                      Optimización de equipos
                    </a>
                    <a href="#detalle-cctv" title="Instalación de Cámaras de Seguridad" className="px-4 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-blue-400 transition-colors border-l-2 border-transparent hover:border-blue-500">
                      Cámaras de seguridad
                    </a>
                    <a href="#detalle-desarrollo" title="Servicios de Desarrollo Web" className="px-4 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-blue-400 transition-colors border-l-2 border-transparent hover:border-blue-500">
                      Desarrollo web
                    </a>
                  </div>
                </div>

                <a href="#sobre-nosotros" title="Conocé más sobre Compufix" className="text-zinc-400 hover:text-white transition-all hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] text-sm font-medium">
                  Sobre nosotros
                </a>
                <a href="#proceso" title="Nuestro método de trabajo" className="text-zinc-400 hover:text-white transition-all hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] text-sm font-medium">
                  Cómo trabajamos
                </a>
                <a href="#faq" title="Preguntas frecuentes sobre reparaciones" className="text-zinc-400 hover:text-white transition-all hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] text-sm font-medium">
                  Preguntas frecuentes
                </a>
                <a href="#sociales" title="Nuestras redes sociales" className="text-zinc-400 hover:text-white transition-all hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] text-sm font-medium">
                  Redes sociales
                </a>
              </nav>

              {/* Botón de acción rápido a la derecha */}
              <a 
                href="#contacto" 
                aria-label="Ir al formulario de contacto"
                className="bg-blue-600 text-white px-5 py-2 rounded-none text-sm font-bold border border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:-translate-y-0.5"
              >
                Contacto
              </a>

            </div>
          </div>
        </div>
      </header>

      {/* SECCIÓN HERO CON PARALLAX (DARK MODE NEÓN) */}
      <section 
        className="relative flex flex-col items-center justify-center min-h-screen bg-fixed bg-center bg-cover bg-black"
        style={{ backgroundImage: "url('/fondo-hero.webp')" }}
        aria-label="Sección principal"
      >
        <div className="absolute inset-0 bg-black/80 z-0"></div>

        <div className="relative z-10 text-center px-4 flex flex-col items-center">
          
          <Image
            src="/logo-compufix.webp"
            alt="Compufix - Especialistas en Sistemas y Hardware en Presidencia Roque Sáenz Peña"
            width={700}
            height={210}
            priority // IMPORTANTE PARA SEO: Le dice a Google que cargue esta imagen primero (LCP)
            className="mb-12 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] w-auto h-auto object-contain max-w-[90vw] md:max-w-[700px]"
          />

          <h1 className="text-lg md:text-xl text-white mb-6 max-w-2xl font-light relative z-10 tracking-wide">
            Especialistas en <strong className="font-semibold text-blue-400">mantenimiento de PC</strong>, optimización de hardware y <strong className="font-semibold text-blue-400">desarrollo web a medida</strong>.
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-6 mb-20 mt-4">
            <a 
              href="#contacto" 
              title="Solicitar presupuesto de reparación o desarrollo"
              className="bg-blue-600 text-white px-8 py-3 rounded-none font-medium border border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.9)] hover:-translate-y-1"
            >
              Pedir presupuesto
            </a>
            <a 
              href="#servicios" 
              title="Ver catálogo de servicios de Compufix"
              className="bg-transparent text-white px-8 py-3 rounded-none font-medium border border-white/50 backdrop-blur-sm shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-300 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:-translate-y-1"
            >
              Ver servicios
            </a>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN NUESTROS SERVICIOS --- */}
      <section id="servicios" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-16 relative flex flex-col items-center"
          > 
            <span className="inline-block py-1 px-3 rounded-none bg-blue-900/20 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-widest uppercase mb-4 shadow-[0_0_10px_rgba(59,130,246,0.1)]">
              Soluciones Integrales
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-400 to-white pb-2">
              Nuestros servicios
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Tarjeta 1 */}
            <article className="group bg-zinc-950 p-8 rounded-none border border-zinc-800 transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
              <div className="w-16 h-16 bg-blue-900/20 border border-blue-500/20 rounded-none flex items-center justify-center mb-8 group-hover:border-blue-500/50 transition-colors">
                <svg className="w-8 h-8 text-blue-400 group-hover:text-blue-300 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-all" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Mantenimiento y reparación</h3>
              <p className="text-zinc-400 leading-relaxed mb-6 text-sm">
                Reparación, mantenimiento preventivo y limpieza profunda de PC y notebooks en Chaco.
              </p>
              <a href="#contacto" title="Consultar por reparación de PC" className="text-sm font-medium text-blue-500 hover:text-blue-400 transition-all flex items-center gap-1 group-hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">
                Saber más <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </article>

            {/* Tarjeta 2 */}
            <article className="group bg-zinc-950 p-8 rounded-none border border-zinc-800 transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
              <div className="w-16 h-16 bg-blue-900/20 border border-blue-500/20 rounded-none flex items-center justify-center mb-8 group-hover:border-blue-500/50 transition-colors">
                <svg className="w-8 h-8 text-blue-400 group-hover:text-blue-300 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-all" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Optimización de equipos</h3>
              <p className="text-zinc-400 leading-relaxed mb-6 text-sm">
                Actualización de componentes (SSD, RAM) y software para darle una segunda vida a tu computadora.
              </p>
              <a href="#contacto" title="Consultar por actualización de hardware" className="text-sm font-medium text-blue-500 hover:text-blue-400 transition-all flex items-center gap-1 group-hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">
                Saber más <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </article>

            {/* Tarjeta 3 */}
            <article className="group bg-zinc-950 p-8 rounded-none border border-zinc-800 transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
              <div className="w-16 h-16 bg-blue-900/20 border border-blue-500/20 rounded-none flex items-center justify-center mb-8 group-hover:border-blue-500/50 transition-colors">
                <svg className="w-8 h-8 text-blue-400 group-hover:text-blue-300 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-all" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Cámaras de seguridad</h3>
              <p className="text-zinc-400 leading-relaxed mb-6 text-sm">
                Instalación y configuración de sistemas CCTV para proteger tu hogar o negocio.
              </p>
              <a href="#contacto" title="Consultar por instalación de cámaras" className="text-sm font-medium text-blue-500 hover:text-blue-400 transition-all flex items-center gap-1 group-hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">
                Saber más <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </article>

            {/* Tarjeta 4 */}
            <article className="group bg-zinc-950 p-8 rounded-none border border-zinc-800 transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
              <div className="w-16 h-16 bg-blue-900/20 border border-blue-500/20 rounded-none flex items-center justify-center mb-8 group-hover:border-blue-500/50 transition-colors">
                <svg className="w-8 h-8 text-blue-400 group-hover:text-blue-300 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-all" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 21h6l-.75-4M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Desarrollo web</h3>
              <p className="text-zinc-400 leading-relaxed mb-6 text-sm">
                Desarrollo de sistemas de gestión, landing pages y aplicaciones web a medida.
              </p>
              <a href="#contacto" title="Consultar por desarrollo de páginas web" className="text-sm font-medium text-blue-500 hover:text-blue-400 transition-all flex items-center gap-1 group-hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">
                Saber más <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </article>

          </div>
        </div>
      </section>

      {/* --- SECCIONES DE DETALLE (DARK MODE & SCROLL REVEAL) --- */}
      {/* 1. Mantenimiento */}
      <section id="detalle-mantenimiento" className="py-24 bg-black overflow-hidden border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative h-72 md:h-96 rounded-none overflow-hidden border border-zinc-800 shadow-[0_0_20px_rgba(59,130,246,0.1)] group"
            >
              <Image 
                src="/img-reparacion.webp" 
                alt="Servicio técnico de mantenimiento y reparación interna de PC y notebooks" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 border border-blue-500/20 pointer-events-none"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Mantenimiento y reparación de PC y notebooks</h2>
              <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
                Un equipo lento o con sobrecalentamiento reduce tu productividad y acorta la vida útil de tus componentes. 
                Realizamos diagnósticos precisos, limpieza física profunda (cambio de pasta térmica, limpieza de componentes) y 
                solución a fallas de hardware para que tu equipo vuelva a funcionar como el primer día.
              </p>
              <ul className="text-left text-zinc-400 space-y-3 list-none">
                <li className="flex items-center gap-2"><span aria-hidden="true" className="text-blue-500">▹</span> Limpieza de virus y malware.</li>
                <li className="flex items-center gap-2"><span aria-hidden="true" className="text-blue-500">▹</span> Reinstalación de sistemas operativos (Windows / Linux).</li>
                <li className="flex items-center gap-2"><span aria-hidden="true" className="text-blue-500">▹</span> Mantenimiento preventivo anual.</li>
                <li className="flex items-center gap-2"><span aria-hidden="true" className="text-blue-500">▹</span> Preservamos tu información (Backup seguro).</li>
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. Optimización */}
      <section id="detalle-optimizacion" className="py-24 bg-zinc-950 overflow-hidden border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-2 md:order-1"
            >
              <h2 className="text-3xl font-bold text-white mb-6">Optimización y segunda vida para tu equipo</h2>
              <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
                No necesitas comprar una computadora nueva. Con actualizaciones estratégicas de hardware, podemos revivir ese equipo 
                que tenés tirado sin usar. La actualización a un disco de estado sólido (SSD) y la ampliación de memoria RAM 
                son inversiones pequeñas que ofrecen un cambio radical en la velocidad.
              </p>
              <ul className="text-left text-zinc-400 space-y-3 list-none">
                <li className="flex items-center gap-2"><span aria-hidden="true" className="text-blue-500">▹</span> Clonación de discos rígidos a SSD sin perder datos.</li>
                <li className="flex items-center gap-2"><span aria-hidden="true" className="text-blue-500">▹</span> Asesoramiento y armado de PCs a medida.</li>
                <li className="flex items-center gap-2"><span aria-hidden="true" className="text-blue-500">▹</span> Optimización de S.O. y recursos de red.</li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="relative h-72 md:h-96 rounded-none overflow-hidden border border-zinc-800 shadow-[0_0_20px_rgba(59,130,246,0.1)] order-1 md:order-2 group"
            >
              <Image 
                src="/img-opti.webp" 
                alt="Componentes de hardware, discos SSD y memoria RAM para optimización de computadoras" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 border border-blue-500/20 pointer-events-none"></div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. Cámaras CCTV */}
      <section id="detalle-cctv" className="py-24 bg-black overflow-hidden border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative h-72 md:h-96 rounded-none overflow-hidden border border-zinc-800 shadow-[0_0_20px_rgba(59,130,246,0.1)] group"
            >
              <Image 
                src="/img-camaras.webp" 
                alt="Técnico especialista instalando cámaras de seguridad CCTV para empresas y hogares" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 border border-blue-500/20 pointer-events-none"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Instalación de cámaras de seguridad CCTV</h2>
              <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
                Realizamos instalaciones técnicas profesionales de sistemas de videovigilancia de alta definición, 
                diseñando la cobertura ideal para la seguridad de tu hogar o negocio. Podrás monitorear todo en tiempo real desde tu celular, 
                estés donde estés.
              </p>
              <ul className="text-left text-zinc-400 space-y-3 list-none">
                <li className="flex items-center gap-2"><span aria-hidden="true" className="text-blue-500">▹</span> Instalación de DVRs y cámaras HD/Full HD.</li>
                <li className="flex items-center gap-2"><span aria-hidden="true" className="text-blue-500">▹</span> Configuración de acceso remoto en smartphones y PCs.</li>
                <li className="flex items-center gap-2"><span aria-hidden="true" className="text-blue-500">▹</span> Mantenimiento y revisión de cableado estructurado.</li>
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. Desarrollo Web */}
      <section id="detalle-desarrollo" className="py-24 bg-zinc-950 overflow-hidden border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-2 md:order-1"
            >
              <h2 className="text-3xl font-bold text-white mb-6">Desarrollo de landing page, sistemas y apps web a medida</h2>
              <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
                Llevamos tu negocio al mundo digital. Desde una landing page para captar clientes, hasta 
                sistemas de gestión a medida para administrar usuarios e inventarios. Utilizamos las tecnologías más modernas para potenciar tus procesos.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row justify-start gap-6">
                <a 
                  href="#contacto" 
                  title="Cotizar proyecto de desarrollo web"
                  className="bg-blue-600 text-white px-8 py-3 rounded-none font-medium border border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.9)] hover:-translate-y-1 text-center"
                >
                  Cotizar proyecto
                </a>
                <Link 
                  href="/portfolio" 
                  title="Ver trabajos anteriores de diseño y desarrollo web"
                  className="bg-transparent text-white px-8 py-3 rounded-none font-medium border border-white/50 backdrop-blur-sm shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-300 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:-translate-y-1 text-center"
                >
                  Ver portfolio
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="relative h-72 md:h-96 rounded-none overflow-hidden border border-zinc-800 shadow-[0_0_20px_rgba(59,130,246,0.1)] order-1 md:order-2 group"
            >
              <Image 
                src="/desarrollo-nuevo.webp" 
                alt="Entorno de desarrollo web en dark mode, mostrando código de landing pages y aplicaciones web" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 border border-blue-500/20 pointer-events-none"></div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- SECCIÓN SOBRE NOSOTROS --- */}
      <motion.section 
        id="sobre-nosotros" 
        className="py-24 bg-zinc-950 text-white border-y border-zinc-900 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-500 to-white pb-2 mb-4">
                Sobre Compufix
              </h2>
              <div className="w-20 h-1 bg-blue-600 mb-10 rounded-none shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
              
              <div className="space-y-6">
                <p className="text-lg text-zinc-400 leading-relaxed">
                  ¡Hola! Soy <strong className="text-white">Leandro David</strong>, quien está detrás de este proyecto. Tengo 32 años y soy de Presidencia Roque Sáenz Peña, Chaco.
                </p>
                
                <p className="text-lg text-zinc-400 leading-relaxed">
                  Soy técnico en redes con especializaciones en reparación y mantenimiento de PC, instalación de sistemas de seguridad y desarrollo web full stack. 
                </p>

                <p className="text-lg text-zinc-400 leading-relaxed">
                  Comencé por el 2016, llevando a cabo este emprendimiento desde mi casa, donde armé un pequeño taller equipado con todo lo necesario. Desde acá, trabajo a diario con el objetivo de darle una segunda vida a tus dispositivos y crear herramientas digitales a medida para hacer crecer tu negocio.
                </p>
              </div>
            </div>

            <div className="relative h-80 md:h-[500px] rounded-none overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.05)] border border-zinc-800 group p-2 bg-zinc-900/50">
              <div className="relative w-full h-full rounded-none overflow-hidden border border-zinc-700">
                <Image 
                  src="/img-about.webp" 
                  alt="Leandro David, técnico especialista de Compufix, trabajando en su taller de reparación en Presidencia Roque Sáenz Peña" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100 " 
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-blue-500/20 rounded-none pointer-events-none"></div>
              </div>
              
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500"></div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* --- SECCIÓN PROCESO DE TRABAJO --- */}
      <section id="proceso" className="py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-24 relative flex flex-col items-center"
          >
            <span className="inline-block py-1 px-3 rounded-none bg-blue-900/20 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-widest uppercase mb-4 shadow-[0_0_10px_rgba(59,130,246,0.1)]">
              Metodología
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-400 to-white pb-2">
              Cómo trabajamos
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto mt-4">
              Un proceso de tres etapas diseñado para resolver tus problemas técnicos o lanzar tu proyecto digital sin complicaciones.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
              className="hidden md:block absolute top-10 left-[16%] right-[16%] h-[2px] bg-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.6)] z-0 origin-left"
            ></motion.div>

            {/* Etapa 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 bg-zinc-900 rounded-none border border-zinc-700 shadow-[0_0_15px_rgba(59,130,246,0.05)] flex items-center justify-center mb-6 text-blue-500 group-hover:border-blue-400 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] group-hover:-translate-y-2 transition-all duration-300 relative">
                 <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <svg aria-hidden="true" className="group-hover:text-blue-300 transition-colors group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-wide">1. Diagnóstico</h3>
              <p className="text-zinc-400 leading-relaxed text-sm px-4">
                Nos contás tu necesidad. Evaluamos a fondo si tu equipo necesita mantenimiento, una actualización de componentes o si querés empezar un desarrollo web.
              </p>
            </motion.div>

            {/* Etapa 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 bg-zinc-900 rounded-none border border-zinc-700 shadow-[0_0_15px_rgba(59,130,246,0.05)] flex items-center justify-center mb-6 text-blue-500 group-hover:border-blue-400 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] group-hover:-translate-y-2 transition-all duration-300 relative">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <svg aria-hidden="true" className="group-hover:text-blue-300 transition-colors group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-wide">2. Propuesta</h3>
              <p className="text-zinc-400 leading-relaxed text-sm px-4">
                Te enviamos un presupuesto claro. Explicamos qué repuestos o tecnologías vamos a usar y los tiempos estimados por etapa de desarrollo. Siempre detallando todo de forma directa.
              </p>
            </motion.div>

            {/* Etapa 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 bg-zinc-900 rounded-none border border-zinc-700 shadow-[0_0_15px_rgba(59,130,246,0.05)] flex items-center justify-center mb-6 text-blue-500 group-hover:border-blue-400 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] group-hover:-translate-y-2 transition-all duration-300 relative">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <svg aria-hidden="true" className="group-hover:text-blue-300 transition-colors group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-wide">3. Ejecución</h3>
              <p className="text-zinc-400 leading-relaxed text-sm px-4">
                Ponemos manos a la obra. Avanzamos por etapas, te mantenemos informado del estado del trabajo y te entregamos todo listo y funcionando.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- SECCIÓN PREGUNTAS FRECUENTES --- */}
      <section id="faq" className="py-24 bg-black border-y border-zinc-900 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16 relative flex flex-col items-center"
          >
            <span className="inline-block py-1 px-3 rounded-none bg-blue-900/20 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-widest uppercase mb-4 shadow-[0_0_10px_rgba(59,130,246,0.1)]">
              Soporte
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-400 to-white pb-2">
              Preguntas frecuentes
            </h2>
            <p className="text-lg text-zinc-400 mt-4">
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
            
            {/* Preguntas omitiendo aria-hidden en texto legible */}
            <details className="group border border-zinc-800 rounded-none bg-zinc-950 hover:border-zinc-700 transition-colors [&_summary::-webkit-details-marker]:hidden relative">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-white font-medium">
                <h3 className="text-lg">¿Cuánto demora el mantenimiento de pc o notebook?</h3>
                <span className="relative font-mono text-blue-500 font-bold shrink-0">
                  <span className="group-open:hidden">[+]</span>
                  <span className="hidden group-open:inline text-blue-400">[-]</span>
                </span>
              </summary>
              <div className="px-6 pb-6 text-zinc-400 leading-relaxed border-t border-zinc-800/50 pt-4 mt-2">
                Depende del diagnóstico inicial, pero los trabajos generales de limpieza física, cambio de pasta térmica y optimización de equipos suelen estar listos entre 24 y 48 horas. Siempre te informamos el estado y pedimos tu confirmación antes de avanzar con cambios o repuestos.
              </div>
            </details>

            <details className="group border border-zinc-800 rounded-none bg-zinc-950 hover:border-zinc-700 transition-colors [&_summary::-webkit-details-marker]:hidden relative">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-white font-medium">
                <h3 className="text-lg">Si instalan Windows en mi equipo, ¿pierdo mi información?</h3>
                <span className="relative font-mono text-blue-500 font-bold shrink-0">
                  <span className="group-open:hidden">[+]</span>
                  <span className="hidden group-open:inline text-blue-400">[-]</span>
                </span>
              </summary>
              <div className="px-6 pb-6 text-zinc-400 leading-relaxed border-t border-zinc-800/50 pt-4 mt-2">
                <strong className="text-blue-400">Para nada.</strong> Tu tranquilidad es nuestra prioridad. Antes de realizar cualquier instalación o formateo, llevamos a cabo un <strong className="text-white">backup preventivo</strong> de todos los archivos que quieras conservar (fotos, documentos, carpetas de trabajo, etc.). Te garantizamos que tu información estará segura y disponible una vez que te entreguemos el equipo listo para usar.
              </div>
            </details>

            <details className="group border border-zinc-800 rounded-none bg-zinc-950 hover:border-zinc-700 transition-colors [&_summary::-webkit-details-marker]:hidden relative">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-white font-medium">
                <h3 className="text-lg">¿Cómo es el proceso para un desarrollo web?</h3>
                <span className="relative font-mono text-blue-500 font-bold shrink-0">
                  <span className="group-open:hidden">[+]</span>
                  <span className="hidden group-open:inline text-blue-400">[-]</span>
                </span>
              </summary>
              <div className="px-6 pb-6 text-zinc-400 leading-relaxed border-t border-zinc-800/50 pt-4 mt-2">
                Lo dividimos en etapas muy claras. Primero charlamos sobre qué necesita tu negocio. Luego, armamos una propuesta de diseño y funciones. Una vez aprobada, pasamos al código y nos mantenemos en contacto para mostrarte los avances hasta el lanzamiento final.
              </div>
            </details>

            <details className="group border border-zinc-800 rounded-none bg-zinc-950 hover:border-zinc-700 transition-colors [&_summary::-webkit-details-marker]:hidden relative">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-white font-medium">
                <h3 className="text-lg">¿Brindan garantía por las reparaciones?</h3>
                <span className="relative font-mono text-blue-500 font-bold shrink-0">
                  <span className="group-open:hidden">[+]</span>
                  <span className="hidden group-open:inline text-blue-400">[-]</span>
                </span>
              </summary>
              <div className="px-6 pb-6 text-zinc-400 leading-relaxed border-t border-zinc-800/50 pt-4 mt-2">
                Totalmente. Tanto la mano de obra en reparación de pc como los componentes nuevos que instalamos (como discos SSD o memorias RAM) cuentan con garantía. Buscamos relaciones a largo plazo, por lo que tu tranquilidad es prioridad.
              </div>
            </details>

          </motion.div>
        </div>
      </section>

      {/* --- SECCIÓN FORMULARIO DE CONTACTO --- */}
      <section id="contacto" className="py-24 bg-black overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/10 blur-[120px] pointer-events-none"></div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16 flex flex-col items-center"
          >
            <span className="inline-block py-1 px-3 rounded-none bg-blue-900/20 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-widest uppercase mb-4 shadow-[0_0_10px_rgba(59,130,246,0.1)]">
              Contacto
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-400 to-white pb-2">
                Envianos tu consulta
              </h2>
            <p className="text-zinc-400 mt-4">
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
            aria-label="Formulario de contacto de Compufix"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-zinc-400 mb-2 uppercase tracking-wide text-xs">Nombre completo</label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder="Ej: Juan Pérez"
                  className="w-full px-4 py-3 rounded-none border border-zinc-800 focus:ring-0 focus:border-blue-500 outline-none transition-colors bg-zinc-950 text-white placeholder-zinc-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2 uppercase tracking-wide text-xs">Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="ejemplo@correo.com"
                  className="w-full px-4 py-3 rounded-none border border-zinc-800 focus:ring-0 focus:border-blue-500 outline-none transition-colors bg-zinc-950 text-white placeholder-zinc-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="servicio" className="block text-sm font-medium text-zinc-400 mb-2 uppercase tracking-wide text-xs">¿En qué podemos ayudarte?</label>
              <div className="relative">
                <select
                  id="servicio"
                  name="servicio"
                  className="w-full px-4 py-3 rounded-none border border-zinc-800 focus:ring-0 focus:border-blue-500 outline-none transition-colors bg-zinc-950 text-white appearance-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] cursor-pointer"
                >
                  <option>Mantenimiento y Reparación de PC</option>
                  <option>Optimización de Equipos</option>
                  <option>Instalación de Cámaras (CCTV)</option>
                  <option>Desarrollo Web / Sistemas</option>
                  <option>Otro motivo</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-blue-500">
                  <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="mensaje" className="block text-sm font-medium text-zinc-400 mb-2 uppercase tracking-wide text-xs">Tu mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                placeholder="Contanos un poco más sobre lo que necesitás..."
                className="w-full px-4 py-3 rounded-none border border-zinc-800 focus:ring-0 focus:border-blue-500 outline-none transition-colors bg-zinc-950 text-white placeholder-zinc-600 resize-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white font-bold py-4 rounded-none border border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:-translate-y-1 active:scale-[0.98]"
            >
              Enviar mensaje
            </button>
          </motion.form>

        </div>
      </section>

      {/* --- SECCIÓN REDES SOCIALES --- */}
      <section id="sociales" className="py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden relative">
        
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-none bg-blue-900/20 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-widest uppercase mb-4 shadow-[0_0_10px_rgba(59,130,246,0.1)]">
              Redes
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-white pb-2">
              ¡Conectemos!
            </h2>
            <p className="text-lg text-zinc-400 mb-12 max-w-2xl mx-auto mt-4">
              Contactanos directamente o seguinos en nuestras redes sociales para ver nuestros últimos trabajos, consejos de mantenimiento y novedades.
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
              className="group flex items-center justify-center gap-3 px-8 py-4 rounded-none border border-zinc-800 bg-black text-white font-bold text-lg transition-all duration-300 w-full sm:w-auto hover:border-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:-translate-y-1"
            >
              <svg aria-hidden="true" className="text-zinc-500 group-hover:text-[#25D366] transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
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
              className="group flex items-center justify-center gap-3 px-8 py-4 rounded-none border border-zinc-800 bg-black text-white font-bold text-lg transition-all duration-300 w-full sm:w-auto hover:border-[#E1306C] hover:shadow-[0_0_20px_rgba(225,48,108,0.3)] hover:-translate-y-1"
            >
              <svg aria-hidden="true" className="text-zinc-500 group-hover:text-[#E1306C] transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              className="group flex items-center justify-center gap-3 px-8 py-4 rounded-none border border-zinc-800 bg-black text-white font-bold text-lg transition-all duration-300 w-full sm:w-auto hover:border-[#1877F2] hover:shadow-[0_0_20px_rgba(24,119,242,0.3)] hover:-translate-y-1"
            >
              <svg aria-hidden="true" className="text-zinc-500 group-hover:text-[#1877F2] transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </motion.a>

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800 py-12 border-t-2 border-blue-400 shadow-[0_-10px_30px_rgba(37,99,235,0.2)] text-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left items-center md:items-start">
            
            <div className="flex flex-col items-center md:items-start">
              <Image 
                src="/logo-compufix.webp" 
                alt="Logotipo de Compufix en pie de página" 
                width={180} 
                height={60} 
                className="w-auto h-auto object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
              />
            </div>

            <div className="flex flex-col items-center md:items-start mt-6 md:mt-0">
              <h4 className="font-bold text-white mb-5 uppercase tracking-wider text-sm shadow-blue-900 drop-shadow-md">Contacto directo</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3 justify-center md:justify-start group">
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-300 group-hover:text-white transition-colors">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <a href="mailto:compufix.sp@gmail.com" title="Enviar correo electrónico a Compufix" className="text-blue-100 hover:text-white transition-all hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] font-medium">
                    compufix.sp@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start group">
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-300 group-hover:text-white transition-colors">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <a href="https://wa.me/543644589416" target="_blank" rel="noopener noreferrer" title="Llamar o enviar mensaje por WhatsApp" className="text-blue-100 hover:text-white transition-all hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] font-medium">
                    +54 364 458-9416
                  </a>
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start group">
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-300 group-hover:text-white transition-colors">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span className="text-blue-100">Presidencia Roque Sáenz Peña, Chaco, Argentina</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center md:items-end justify-center space-y-4 text-sm text-blue-200 mt-8 md:mt-0">
              <Link href="/politica-de-privacidad" className="hover:text-white transition-all hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] border-b border-transparent hover:border-blue-300 pb-1">
                Política de privacidad
              </Link>
              <Link href="/politica-de-cookies" className="hover:text-white transition-all hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] border-b border-transparent hover:border-blue-300 pb-1">
                Política de cookies
              </Link>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-blue-500/50 text-center text-sm text-blue-300 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} Compufix.sp. Todos los derechos reservados.</p>
            <p className="text-blue-400/80 text-xs tracking-widest uppercase">
              Sistemas & Hardware
            </p>
          </div>
        </div>
      </footer>

      {/* --- CONTENEDOR DE BOTONES FLOTANTES --- */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex flex-col items-center gap-6">
        
        <button
          onClick={volverArriba}
          aria-label="Volver a la parte superior de la página"
          className={`group bg-transparent outline-none flex items-center justify-center transition-all duration-500 ${
            mostrarBoton 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-10 pointer-events-none"
          }`}
        >
          <svg 
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,1)] group-hover:-translate-y-2 transition-all duration-300"
          >
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
        </button>

        <a
          href="https://wa.me/543644589416?text=Hola%20Compufix!%20Me%20contacto%20desde%20su%20página%20web%20para%20pedir%20un%20presupuesto."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar a Compufix de forma directa por WhatsApp"
          className="group bg-transparent outline-none flex items-center justify-center transition-transform duration-300"
        >
          <svg 
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" 
            width="60" 
            height="60" 
            fill="#25D366" 
            viewBox="0 0 16 16"
            className="drop-shadow-[0_0_15px_rgba(37,211,102,0.8)] group-hover:drop-shadow-[0_0_30px_rgba(37,211,102,1)] group-hover:scale-110 transition-all duration-300"
          >
            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73.0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
          </svg>
        </a>
      </div>
    </main>
  );
}