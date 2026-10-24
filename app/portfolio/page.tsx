import type { Metadata } from "next";
import PortfolioPage from "@/components/portfolio/PortfolioPage";

export const metadata: Metadata = {
  title: "Portfolio | Compufix-sp",
  description:
    "Proyectos de software a medida: sistemas de gestión, puntos de venta y plataformas web desarrolladas por Compufix-sp en Presidencia Roque Sáenz Peña, Chaco.",
  openGraph: {
    title: "Portfolio | Compufix-sp",
    description:
      "Sistemas de gestión, puntos de venta y plataformas web desarrollados a medida.",
    url: "https://www.compufix-sp.com.ar/portfolio",
    siteName: "Compufix-sp",
    locale: "es_AR",
    type: "website",
  },
};

export default function Portfolio() {
  return <PortfolioPage />;
}
