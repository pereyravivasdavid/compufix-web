import Link from "next/link";

export default function PoliticaDeCookies() {
  return (
    <main className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de cookies</h1>
        
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p>
            Para que nuestra página funcione correctamente y podamos ofrecerte una mejor experiencia, utilizamos pequeñas tecnologías conocidas como cookies. Acá te explicamos de manera simple qué son y cómo las usamos en Compufix.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que se guardan en tu navegador (ya sea en tu pc o celular) cuando visitás un sitio web. Nos ayudan a recordar tus preferencias y a entender cómo interactuás con nuestra página.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">¿Qué tipo de cookies utilizamos?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Cookies técnicas:</strong> Son esenciales para que la página funcione bien, como por ejemplo, recordar si ya cerraste un aviso o mantener la navegación fluida.</li>
            <li><strong>Cookies de análisis:</strong> Nos permiten medir el tráfico de la web de forma anónima, para saber qué secciones (como el servicio de mantenimiento o el de desarrollo web) son las más visitadas y así mejorar nuestro contenido.</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">¿Cómo podés gestionarlas?</h2>
          <p>
            La mayoría de los navegadores aceptan estas tecnologías por defecto. Sin embargo, podés configurar tu navegador en cualquier momento para bloquearlas o eliminar las cookies ya guardadas desde el menú de ajustes de privacidad de tu dispositivo.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            &larr; Volver a la página principal
          </Link>
        </div>
      </div>
    </main>
  );
}