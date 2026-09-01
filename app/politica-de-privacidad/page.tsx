import Link from "next/link";

export default function PoliticaDePrivacidad() {
  return (
    <main className="min-h-screen bg-[#050505] text-white py-20 lg:py-32 relative overflow-hidden selection:bg-white selection:text-black">
      {/* GRILLA DE FONDO */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-4 border border-zinc-800 bg-[#0A0A0A] px-6 py-3 text-xs font-mono text-white uppercase tracking-widest hover:border-white hover:bg-white hover:text-black transition-all duration-300 mb-12"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a la página principal
        </Link>

        <div className="bg-[#0A0A0A] border border-zinc-900 p-8 md:p-12 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 bg-white"></span>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Legal</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none mb-10">
            Política de privacidad
          </h1>

          <div className="space-y-6 text-zinc-400 font-mono leading-relaxed">
            <p>
              En Compufix valoramos tu confianza y nos tomamos muy en serio la protección de tus datos personales. Esta política explica cómo recopilamos, usamos y cuidamos tu información cuando visitás nuestro sitio web o te contactás con nosotros.
            </p>

            <h2 className="text-xl font-bold text-white uppercase tracking-widest mt-12 mb-4 flex items-center gap-3">
              <span className="text-zinc-600">/</span> 1. Información que recopilamos
            </h2>
            <p>
              Al usar nuestro formulario de contacto o comunicarte por WhatsApp, podemos pedirte datos básicos como tu nombre, correo electrónico, número de teléfono y los detalles del equipo o proyecto sobre el que necesitás asesoramiento.
            </p>

            <h2 className="text-xl font-bold text-white uppercase tracking-widest mt-12 mb-4 flex items-center gap-3">
              <span className="text-zinc-600">/</span> 2. Uso de la información
            </h2>
            <p>
              Utilizamos tus datos exclusivamente para:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Responder a tus consultas y enviarte presupuestos.</li>
              <li>Coordinar la entrega o recepción de equipos para mantenimiento.</li>
              <li>Mantenerte informado sobre las etapas de tu desarrollo web o reparación.</li>
              <li>Mejorar nuestros servicios y la experiencia en el sitio.</li>
            </ul>

            <h2 className="text-xl font-bold text-white uppercase tracking-widest mt-12 mb-4 flex items-center gap-3">
              <span className="text-zinc-600">/</span> 3. Protección de tus datos
            </h2>
            <p>
              Tus datos no se venden, alquilan ni comparten con terceros con fines comerciales. Solo accedemos a ellos para brindarte el servicio que solicitaste.
            </p>

            <h2 className="text-xl font-bold text-white uppercase tracking-widest mt-12 mb-4 flex items-center gap-3">
              <span className="text-zinc-600">/</span> 4. Contacto
            </h2>
            <p>
              Si tenés alguna duda sobre el manejo de tus datos, podés escribirnos directamente a nuestro correo electrónico o contactarnos vía WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}