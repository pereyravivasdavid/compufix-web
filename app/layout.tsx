import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

// Configuración de la tipografía principal
const roboto = Roboto({ 
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  display: 'swap',
});

// Metadatos para SEO
export const metadata: Metadata = {
  title: "Compufix | Mantenimiento de pc y desarrollo web",
  description: "Soluciones técnicas por Leandro David en Presidencia Roque Sáenz Peña, Chaco. Especialista en reparación de pc, instalación de cámaras de seguridad y desarrollo web a medida.",
  keywords: "mantenimiento de pc, reparación de notebooks, cámaras de seguridad, desarrollo web, Presidencia Roque Sáenz Peña, Chaco, soporte técnico",
  authors: [{ name: "Leandro David" }],
  openGraph: {
    title: "Compufix | Soluciones tecnológicas",
    description: "Mantenimiento de pc, instalación de cámaras de seguridad y desarrollo web a medida en Presidencia Roque Sáenz Peña.",
    url: "https://tudominio.com", // Acá vas a poner tu dominio final cuando lo tengas
    siteName: "Compufix",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${roboto.className} antialiased text-gray-900 bg-white`}>
        {children}
      </body>
    </html>
  );
}