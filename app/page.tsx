"use client"; // <-- AGREGAR ESTA LÍNEA ARRIBA DE TODO

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react"; // <-- AGREGAR ESTA IMPORTACIÓN

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
      {/* --- HEADER STICKY --- */}
      <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            
            {/* Logo a la izquierda */}
            <div className="flex-shrink-0 flex items-center">
              <a href="/" aria-label="Volver al inicio">
                <Image 
                  src="/logo-compufix.webp" 
                  alt="Logo Compufix" 
                  width={120} 
                  height={35} 
                  className="w-auto h-auto object-contain"
                />
              </a>
            </div>

            {/* Contenedor derecho: Enlaces + Botón agrupados */}
            <div className="flex items-center gap-6">
              
              {/* Enlaces de navegación */}
              <nav className="hidden md:flex items-center gap-6">
                
                {/* Menú desplegable de Servicios */}
                <div className="relative group py-4">
                  <a href="#servicios" className="text-gray-300 hover:text-white transition-colors text-sm font-medium flex items-center gap-1 cursor-pointer">
                    Servicios
                    {/* Flecha que gira al pasar el mouse */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:rotate-180">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </a>

                  {/* Submenú flotante */}
                  <div className="absolute top-full -left-4 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col py-2 translate-y-2 group-hover:translate-y-0">
                    <a href="#detalle-mantenimiento" className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Mantenimiento de pc
                    </a>
                    <a href="#detalle-optimizacion" className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Optimización de equipos
                    </a>
                    <a href="#detalle-cctv" className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Cámaras de seguridad
                    </a>
                    <a href="#detalle-desarrollo" className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Desarrollo web
                    </a>
                  </div>
                </div>

                <a href="#sobre-nosotros" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                  Sobre nosotros
                </a>
                <a href="#proceso" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                  Cómo trabajamos
                </a>
                <a href="#faq" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                  Preguntas frecuentes
                </a>
                <a href="#sociales" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                  Redes sociales
                </a>
              </nav>

              {/* Botón de acción rápido a la derecha */}
              <a 
                href="#contacto" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-1.5 rounded-full text-sm font-bold transition-all duration-300 hover:shadow-lg"
              >
                Contacto
              </a>

            </div>

          </div>
        </div>
      </header>

      {/* SECCIÓN HERO CON PARALLAX */}
      <section 
        className="relative flex flex-col items-center justify-center min-h-screen bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url('/fondo-hero.webp')" }}
      >
        {/* Capa oscura superpuesta */}
        <div className="absolute inset-0 bg-black/65 z-0"></div>

        {/* Contenido principal */}
        <div className="relative z-10 text-center px-4 flex flex-col items-center">
          
          {/* Tu Logo optimizado y más grande */}
          <Image
            src="/logo-compufix.webp"
            alt="Logo Compufix"
            width={700}
            height={210}
            className="mb-12 drop-shadow-2xl w-auto h-auto object-contain max-w-[90vw] md:max-w-[700px]"
          />

          {/* Texto ligeramente más pequeño para SEO */}
          <h1 className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl font-light relative z-10">
            Especialistas en mantenimiento, actualización de componentes y desarrollo web a medida.
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <a 
              href="#contacto" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              Pedir presupuesto
            </a>
            <a 
              href="#servicios" 
              className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/30 px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              Ver servicios
            </a>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN NUESTROS SERVICIOS (DISEÑO WIREFRAME/LÍNEAS - TODO BLANCO) --- */}
      <section id="servicios" className="py-20 bg-white"> {/* Fondo blanco puro y py ajustado */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Cabecera de Sección: Estilo Moderno con Gradiente y Etiqueta */}
          <div className="text-center mb-16 relative flex flex-col items-center"> 
            
            {/* 1. Etiqueta / Badge superior */}
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">
              Soluciones Integrales
            </span>

            {/* 2. Título principal con efecto de gradiente */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 pb-2">
              Nuestros servicios
            </h2>
            
          </div>
          {/* Grilla de Tarjetas: 4 columnas en desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Tarjeta 1: Mantenimiento (Wireframe Style) */}
            {/* Todo el detalle está en el border-slate-100 y el sutil shadow-sm inicial */}
            <div className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-slate-200 hover:-translate-y-1">
              {/* Contenedor de Icono Geométrico (Siempre Azul) */}
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-8">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Mantenimiento y reparación
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                Reparación, mantenimiento preventivo y limpieza profunda de PC y notebooks.
              </p>
              <a href="#contacto" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1 group-hover:text-blue-600">
                Saber más <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>

            {/* Tarjeta 2: Optimización */}
            <div className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-slate-200 hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-8">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Optimización de equipos
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                Actualización de hardware y optimización de software para darle una segunda vida a tu equipo.
              </p>
              <a href="#contacto" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1 group-hover:text-blue-600">
                Saber más <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>

            {/* Tarjeta 3: Cámaras */}
            <div className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-slate-200 hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-8">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Cámaras de seguridad
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                Instalación y configuración de sistemas CCTV para proteger tu hogar o negocio.
              </p>
              <a href="#contacto" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1 group-hover:text-blue-600">
                Saber más <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>

            {/* Tarjeta 4: Desarrollo Web */}
            <div className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-slate-200 hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-8">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 21h6l-.75-4M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Desarrollo web
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                Desarrollo de sistemas, landing pages y aplicaciones web a medida.
              </p>
              <a href="#contacto" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1 group-hover:text-blue-600">
                Saber más <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECCIONES DE DETALLE (Con Imágenes Alternadas) --- */}

      {/* 1. Mantenimiento (Imagen Izquierda) */}
      <section id="detalle-mantenimiento" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Imagen */}
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-xl group">
              <Image 
                src="/img-reparacion.webp" 
                alt="Servicio de mantenimiento interno de PC" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            {/* Texto */}
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-6">Mantenimiento y reparación de PC y notebooks</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Un equipo lento o con sobrecalentamiento reduce tu productividad y acorta la vida útil de tus componentes. 
                Realizamos diagnósticos precisos, limpieza física profunda (cambio de pasta térmica, limpieza de componentes) y 
                solución a fallas de hardware para que tu equipo vuelva a funcionar como el primer día.
              </p>
              <ul className="text-left text-gray-600 space-y-3 list-disc list-inside">
                <li>Limpieza de virus y malware.</li>
                <li>Reinstalación de sistemas operativos (Windows / Linux).</li>
                <li>Mantenimiento preventivo anual.</li>
                <li>Preservamos tu información</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Optimización (Imagen Derecha) */}
      <section id="detalle-optimizacion" className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Optimización y segunda vida para tu equipo</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                No necesitas comprar una computadora nueva. Con actualizaciones estratégicas de hardware, podemos revivir ese equipo 
                que tenés tirado sin usar. La actualización a un disco de estado sólido (SSD) y la ampliación de memoria RAM 
                son inversiones pequeñas que ofrecen un cambio radical en la velocidad.
              </p>
              <ul className="text-left text-gray-600 space-y-3 list-disc list-inside">
                <li>Clonación de discos rígidos a SSD sin perder datos.</li>
                <li>Asesoramiento y armado de PCs a medida.</li>
                <li>Optimización de S.O. y recursos.</li>
              </ul>
            </div>
            {/* Imagen */}
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-xl order-1 md:order-2 group">
              <Image 
                src="/img-opti.webp" 
                alt="Componentes de hardware para optimización" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Cámaras CCTV (Imagen Izquierda) */}
      <section id="detalle-cctv" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Imagen */}
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-xl group">
              <Image 
                src="/img-camaras.webp" 
                alt="Técnico instalando cámaras de seguridad CCTV" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            {/* Texto */}
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-6">Instalación de cámaras de seguridad CCTV</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Realizamos instalaciones técnicas profesionales de sistemas de videovigilancia de alta definición, 
                diseñando la cobertura ideal para la seguridad de tu hogar o negocio. Podrás monitorear todo en tiempo real desde tu celular, 
                estés donde estés.
              </p>
              <ul className="text-left text-gray-600 space-y-3 list-disc list-inside">
                <li>Instalación de DVRs y cámaras HD/Full HD.</li>
                <li>Configuración de acceso remoto en smartphones y PCs.</li>
                <li>Mantenimiento y revisión de cableado estructurado.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Desarrollo Web (Imagen Derecha) */}
      <section id="detalle-desarrollo" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div className="order-2 md:order-1">
              {/* Corrección de mayúsculas a mitad de oración */}
              <h2 className="text-3xl font-light text-gray-900 mb-6">Desarrollo de landing page, sistemas y apps web a medida</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Llevamos tu negocio al mundo digital. Desde una landing page para captar clientes, hasta 
                sistemas de gestión a medida para administrar usuarios e inventarios. Utilizamos las tecnologías más modernas para potenciar tus procesos.
              </p>
              
              {/* Botones */}
              <div className="mt-8 flex flex-col sm:flex-row justify-start gap-4">
                <a href="#contacto" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-center">
                  Cotizar proyecto
                </a>
                <a href="/portfolio" className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-center">
                  Ver portfolio
                </a>
              </div>

            </div>
            {/* Imagen */}
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-200 order-1 md:order-2 group">
              <Image 
                src="/img-code.webp" 
                alt="Entorno de desarrollo web con monitores" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN SOBRE NOSOTROS --- */}
      <section id="sobre-nosotros" className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Texto */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-500 to-white pb-2">
                Sobre Compufix
              </h2>
              <div className="w-20 h-1 bg-blue-500 mb-8 rounded-full"></div>
              
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                ¡Hola! Soy Leandro David, quien está detrás de este proyecto. Tengo 32 años y soy de Presidencia Roque Sáenz Peña, Chaco.
              </p>
              
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Soy técnico en redes con especializaciones en reparación y mantenimiento de pc, instalación de sistemas de seguridad y desarrollo web full stack. 
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                Comencé por el 2016, llevando a cabo este emprendimiento desde mi casa, donde armé un pequeño taller equipado con todo lo necesario. Desde acá, trabajo a diario con el objetivo de darle una segunda vida a tus dispositivos y crear herramientas digitales a medida para hacer crecer tu negocio.
              </p>
            </div>

            {/* Imagen del Taller / Leandro */}
            <div className="relative h-80 md:h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-gray-700 group">
              <Image 
                src="/img-about.webp" 
                alt="Leandro David trabajando en el taller de Compufix" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
              />
              {/* Capa decorativa opcional */}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl"></div>
            </div>

          </div>
        </div>
      </section>
      {/* --- SECCIÓN PROCESO DE TRABAJO --- */}
      <section id="proceso" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 pb-2">
              Cómo trabajamos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Un proceso de tres etapas diseñado para resolver tus problemas técnicos o lanzar tu proyecto digital sin complicaciones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            
            {/* Línea conectora (solo visible en pantallas grandes) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gray-100 z-0"></div>

            {/* Etapa 1: Diagnóstico */}
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-gray-50 shadow-sm flex items-center justify-center mb-6 text-blue-600 group-hover:border-blue-100 group-hover:scale-105 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Diagnóstico</h3>
              <p className="text-gray-600 leading-relaxed text-sm px-4">
                Nos contás tu necesidad. Evaluamos a fondo si tu equipo necesita mantenimiento, una actualización de componentes o si querés empezar un desarrollo web.
              </p>
            </div>

            {/* Etapa 2: Propuesta */}
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-gray-50 shadow-sm flex items-center justify-center mb-6 text-blue-600 group-hover:border-blue-100 group-hover:scale-105 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Propuesta</h3>
              <p className="text-gray-600 leading-relaxed text-sm px-4">
                Te enviamos un presupuesto claro. Explicamos qué repuestos o tecnologías vamos a usar, detallando todo de forma directa.
              </p>
            </div>

            {/* Etapa 3: Ejecución */}
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-gray-50 shadow-sm flex items-center justify-center mb-6 text-blue-600 group-hover:border-blue-100 group-hover:scale-105 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Ejecución</h3>
              <p className="text-gray-600 leading-relaxed text-sm px-4">
                Ponemos manos a la obra. Avanzamos por etapas, te mantenemos informado del estado del trabajo y te entregamos todo listo y funcionando.
              </p>
            </div>

          </div>
        </div>
      </section>
      {/* --- SECCIÓN PREGUNTAS FRECUENTES --- */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 pb-2">
              Preguntas frecuentes
            </h2>
            <p className="text-lg text-gray-600">
              Despejá tus dudas rápidas antes de arrancar tu proyecto con nosotros.
            </p>
          </div>

          <div className="space-y-4">
            
            {/* Pregunta 1 */}
            <details className="group border border-gray-200 rounded-2xl bg-gray-50 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900 font-medium">
                <h3 className="text-lg">¿Cuánto demora el mantenimiento de pc o notebook?</h3>
                <span className="relative h-5 w-5 shrink-0 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-100 group-open:opacity-0 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-0 group-open:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                Depende del diagnóstico inicial, pero los trabajos generales de limpieza física, cambio de pasta térmica y optimización de equipos suelen estar listos entre 24 y 48 horas. Siempre te informamos el estado y pedimos tu confirmación antes de avanzar con cambios o repuestos.
              </p>
            </details>

            <details className="group border border-gray-200 rounded-2xl bg-gray-50 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900 font-medium">
                <h3 className="text-lg">Si instalan Windows en mi equipo, ¿pierdo mi información?</h3>
                <span className="relative h-5 w-5 shrink-0 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-100 group-open:opacity-0 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-0 group-open:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                <strong>Para nada.</strong> Tu tranquilidad es nuestra prioridad. Antes de realizar cualquier instalación o formateo, llevamos a cabo un <strong>backup preventivo</strong> de todos los archivos que quieras conservar (fotos, documentos, carpetas de trabajo, etc.). Te garantizamos que tu información estará segura y disponible una vez que te entreguemos el equipo listo para usar.              </p>
            </details>

            {/* Pregunta 3 */}
            <details className="group border border-gray-200 rounded-2xl bg-gray-50 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900 font-medium">
                <h3 className="text-lg">¿Cómo es el proceso para un desarrollo web?</h3>
                <span className="relative h-5 w-5 shrink-0 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-100 group-open:opacity-0 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-0 group-open:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                Lo dividimos en etapas muy claras. Primero charlamos sobre qué necesita tu negocio. Luego, armamos una propuesta de diseño y funciones. Una vez aprobada, pasamos al código y nos mantenemos en contacto para mostrarte los avances hasta el lanzamiento final.
              </p>
            </details>

            {/* Pregunta 4 */}
            <details className="group border border-gray-200 rounded-2xl bg-gray-50 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900 font-medium">
                <h3 className="text-lg">¿Brindan garantía por las reparaciones?</h3>
                <span className="relative h-5 w-5 shrink-0 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-100 group-open:opacity-0 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-0 group-open:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                Totalmente. Tanto la mano de obra en reparación de pc como los componentes nuevos que instalamos (como discos SSD o memorias RAM) cuentan con garantía. Buscamos relaciones a largo plazo, por lo que tu tranquilidad es prioridad.
              </p>
            </details>

          </div>
        </div>
      </section>
      {/* --- SECCIÓN FORMULARIO DE CONTACTO --- */}
      <section id="contacto" className="py-24 bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-500 to-white pb-2">
                Envianos tu consulta.
              </h2>
            <p className="text-gray-400">
              Completá el formulario y nos pondremos en contacto con vos a la brevedad para asesorarte.
            </p>
          </div>

          <form onSubmit={manejarEnvio} className="grid grid-cols-1 gap-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-300 mb-1">Nombre completo</label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder="Ej: Juan Pérez"
                  className="w-full px-4 py-3 rounded-xl border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-800 text-white placeholder-gray-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="ejemplo@correo.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-800 text-white placeholder-gray-500"
                  required
                />
              </div>
            </div>

            {/* Asunto/Servicio */}
            <div>
              <label htmlFor="servicio" className="block text-sm font-medium text-gray-300 mb-1">¿En qué podemos ayudarte?</label>
              <select
                id="servicio"
                name="servicio"
                className="w-full px-4 py-3 rounded-xl border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-800 text-white appearance-none"
              >
                <option>Mantenimiento y Reparación de PC</option>
                <option>Optimización de Equipos</option>
                <option>Instalación de Cámaras (CCTV)</option>
                <option>Desarrollo Web / Sistemas</option>
                <option>Otro motivo</option>
              </select>
            </div>

            {/* Mensaje */}
            <div>
              <label htmlFor="mensaje" className="block text-sm font-medium text-gray-300 mb-1">Tu mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                placeholder="Contanos un poco más sobre lo que necesitás..."
                className="w-full px-4 py-3 rounded-xl border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-800 text-white placeholder-gray-500 resize-none"
                required
              ></textarea>
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transform hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              Enviar mensaje
            </button>
          </form>

        </div>
      </section>
      {/* --- SECCIÓN REDES SOCIALES / CONTACTO --- */}
      <section id="sociales" className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 pb-2">
            ¡Conectemos!
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Contactanos directamente o seguinos en nuestras redes sociales para ver nuestros últimos trabajos, consejos de mantenimiento y novedades.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">

            {/* Botón WhatsApp */}
            <a 
              href="https://wa.me/543644589416?text=Hola%20Compufix!%20Me%20contacto%20desde%20su%20página%20web%20para%20pedir%20un%20presupuesto." 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-full text-white font-bold text-lg bg-[#25D366] hover:bg-[#1da851] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73.0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
              WhatsApp
            </a>
            
            {/* Botón Instagram */}
            <a 
              href="https://www.instagram.com/compufix.sp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-full text-white font-bold text-lg bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              Instagram
            </a>

            {/* Botón Facebook */}
            <a 
              href="https://www.facebook.com/compufix.sp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-full text-white font-bold text-lg bg-[#1877F2] hover:bg-[#166FE5] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white py-12 border-t border-gray-200 text-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            
            {/* Columna 1: Logo y descripción */}
            <div className="flex flex-col items-center md:items-start">
              <Image 
                src="/logo-compufix-negro.webp" 
                alt="Logo Compufix Negro" 
                width={180} 
                height={60} 
                className="w-auto h-auto object-contain"
              />
            </div>

            {/* Columna 2: Contacto */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-bold text-gray-900 mb-4">Contacto directo</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  <a href="mailto:compufix.sp@gmail.com" className="hover:text-blue-600 transition-colors">
                    compufix.sp@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <a href="https://wa.me/543644589416" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                    +54 364 458-9416
                  </a>
                </li>
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span>Presidencia Roque Sáenz Peña, Chaco, Argentina</span>
                </li>
              </ul>
            </div>

            {/* Columna 3: Enlaces de ayuda */}
            <div className="flex justify-center space-x-6 text-sm text-gray-500 mt-8">
              <a href="/politica-de-privacidad" className="hover:text-blue-600 transition-colors">
                Política de privacidad
              </a>
              <a href="/politica-de-cookies" className="hover:text-blue-600 transition-colors">
                Política de cookies
              </a>
            </div>

          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-100 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Compufix.sp. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
      {/* --- CONTENEDOR DE BOTONES FLOTANTES --- */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex flex-col items-center gap-4">
        
        {/* Botón Volver Arriba (Aparece dinámicamente) */}
        <button
          onClick={volverArriba}
          aria-label="Volver arriba"
          className={`bg-gray-900 text-white w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full shadow-xl hover:scale-110 hover:bg-gray-800 transition-all duration-500 border border-gray-700 ${
            mostrarBoton 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-10 pointer-events-none"
          }`}
        >
          {/* SVG corregido con viewBox para centrado perfecto */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
        </button>

        {/* Botón WhatsApp */}
        <a
          href="https://wa.me/543644589416?text=Hola%20Compufix!%20Me%20contacto%20desde%20su%20página%20web%20para%20pedir%20un%20presupuesto."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full shadow-2xl hover:scale-110 transition-transform duration-300"
          aria-label="Contactar por WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73.0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
          </svg>
        </a>
      </div>
    </main>
  );
}