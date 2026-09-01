import Link from "next/link";

export default function PoliticaDeCookies() {
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
            Política de cookies
          </h1>

          <div className="space-y-6 text-zinc-400 font-mono leading-relaxed">
            <p>
              Para que nuestra página funcione correctamente y podamos ofrecerte una mejor experiencia, utilizamos pequeñas tecnologías conocidas como cookies. Acá te explicamos de manera simple qué son y cómo las usamos en Compufix.
            </p>

            <h2 className="text-xl font-bold text-white uppercase tracking-widest mt-12 mb-4 flex items-center gap-3">
              <span className="text-zinc-600">/</span> ¿Qué son las cookies?
            </h2>
            <p>
              Las cookies son pequeños archivos de texto que se guardan en tu navegador (ya sea en tu pc o celular) cuando visitás un sitio web. Nos ayudan a recordar tus preferencias y a entender cómo interactuás con nuestra página.
            </p>

            <h2 className="text-xl font-bold text-white uppercase tracking-widest mt-12 mb-4 flex items-center gap-3">
              <span className="text-zinc-600">/</span> ¿Qué tipo de cookies utilizamos?
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-white font-normal">Cookies técnicas:</strong> Son esenciales para que la página funcione bien, como por ejemplo, recordar si ya cerraste un aviso o mantener la navegación fluida.</li>
              <li><strong className="text-white font-normal">Cookies de análisis:</strong> Nos permiten medir el tráfico de la web de forma anónima, para saber qué secciones (como el servicio de mantenimiento o el de desarrollo web) son las más visitadas y así mejorar nuestro contenido.</li>
            </ul>

            <h2 className="text-xl font-bold text-white uppercase tracking-widest mt-12 mb-4 flex items-center gap-3">
              <span className="text-zinc-600">/</span> ¿Cómo podés gestionarlas?
            </h2>
            <p>
              La mayoría de los navegadores aceptan estas tecnologías por defecto. Sin embargo, podés configurar tu navegador en cualquier momento para bloquearlas o eliminar las cookies ya guardadas desde el menú de ajustes de privacidad de tu dispositivo.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}