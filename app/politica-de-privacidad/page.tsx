import Link from "next/link";

export default function PoliticaDePrivacidad() {
  return (
    <main className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de privacidad</h1>
        
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p>
            En Compufix valoramos tu confianza y nos tomamos muy en serio la protección de tus datos personales. Esta política explica cómo recopilamos, usamos y cuidamos tu información cuando visitás nuestro sitio web o te contactás con nosotros.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Información que recopilamos</h2>
          <p>
            Al usar nuestro formulario de contacto o comunicarte por WhatsApp, podemos pedirte datos básicos como tu nombre, correo electrónico, número de teléfono y los detalles del equipo o proyecto sobre el que necesitás asesoramiento.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Uso de la información</h2>
          <p>
            Utilizamos tus datos exclusivamente para:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Responder a tus consultas y enviarte presupuestos.</li>
            <li>Coordinar la entrega o recepción de equipos para mantenimiento.</li>
            <li>Mantenerte informado sobre las etapas de tu desarrollo web o reparación.</li>
            <li>Mejorar nuestros servicios y la experiencia en el sitio.</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Protección de tus datos</h2>
          <p>
            Tus datos no se venden, alquilan ni comparten con terceros con fines comerciales. Solo accedemos a ellos para brindarte el servicio que solicitaste.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Contacto</h2>
          <p>
            Si tenés alguna duda sobre el manejo de tus datos, podés escribirnos directamente a nuestro correo electrónico o contactarnos vía WhatsApp.
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