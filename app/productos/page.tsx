import type { Metadata } from 'next';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Productos — Fernando Atiye',
  description:
    'Productos artesanales de Fernando Atiye. Alioli, chile de árbol, salsa matcha y más. Hechos con pasión.',
};

export default function ProductosPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream py-16 lg:py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-label mb-4">Hecho a mano</p>
          <h1 className="font-breathing text-4xl md:text-5xl lg:text-6xl mb-4">
            Productos Artesanales
          </h1>
          <div className="editorial-rule" />
          <p className="text-dark/60 mt-6 max-w-lg mx-auto">
            Cada producto nace de la misma filosofía que mis recetas: ingredientes de calidad, 
            preparación cuidadosa y mucho sabor. Pensados para elevar tus platillos sin complicarte.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 lg:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 lg:py-20 bg-cream px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl mb-4">¿Quieres saber cuando estén disponibles?</h2>
          <div className="editorial-rule" />
          <p className="text-dark/60 mt-6 leading-relaxed">
            Sígueme en redes sociales para enterarte de las novedades, lanzamientos 
            y disponibilidad de cada producto. Cada lote es limitado y artesanal.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <a
              href="https://www.instagram.com/fernando.atiye/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Seguir en Instagram
            </a>
            <a
              href="https://www.tiktok.com/@fernandoatiye"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46v-7.15a8.16 8.16 0 005.58 2.2v-3.45a4.85 4.85 0 01-2-.57l.01-.01V6.69h2z" />
              </svg>
              Seguir en TikTok
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
