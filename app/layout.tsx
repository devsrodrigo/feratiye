import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Fernando Atiye — Cocinar rico no tiene por qué ser complicado',
  description:
    'Recetas caseras, prácticas y llenas de sabor. Más de 4 años compartiendo mi pasión por la cocina. ¡Venga!',
  openGraph: {
    title: 'Fernando Atiye — Cocinar rico no tiene por qué ser complicado',
    description:
      'Recetas caseras, prácticas y llenas de sabor por Fernando Atiye.',
    url: 'https://feratiye.niche.com.mx',
    siteName: 'Fernando Atiye',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fernando Atiye',
    description:
      'Cocinar rico no tiene por qué ser complicado. Recetas caseras y productos artesanales.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
