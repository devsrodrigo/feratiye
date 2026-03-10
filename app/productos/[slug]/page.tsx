import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { products, getProductBySlug, formatProductImage } from '@/lib/products';
import RecipeImage from '@/components/RecipeImage';

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: 'Producto no encontrado — Fernando Atiye' };
  }

  return {
    title: `${product.name} — Fernando Atiye`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const imageSrc = formatProductImage(product.slug);

  return (
    <>
      <section className="py-12 lg:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Back button */}
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 text-dark/60 hover:text-primary transition-colors text-sm font-bicyclette uppercase tracking-wider mb-10"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Productos
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Image */}
            <div className="relative aspect-square bg-cream rounded-lg overflow-hidden">
              <RecipeImage src={imageSrc} alt={product.name} fill />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center">
              <p className="section-label mb-3">Producto Artesanal</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4">
                {product.name}
              </h1>

              <div className="editorial-rule !mx-0 !my-6" />

              <p className="text-dark/70 text-base md:text-lg leading-relaxed mb-8">
                {product.longDescription}
              </p>

              {/* SOLD OUT Banner */}
              <div className="bg-dark text-white text-center py-6 px-8 rounded-lg">
                <p className="font-bicyclette uppercase tracking-[0.2em] text-2xl md:text-3xl mb-2">
                  Sold Out
                </p>
                <p className="text-white/60 text-sm">
                  Este producto se agotó. Sígueme en redes para enterarte del próximo lote.
                </p>
              </div>

              {/* Social CTA */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://www.instagram.com/fernando.atiye/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center gap-2 text-xs"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  Instagram
                </a>
                <a
                  href="https://www.tiktok.com/@fernandoatiye"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center gap-2 text-xs"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46v-7.15a8.16 8.16 0 005.58 2.2v-3.45a4.85 4.85 0 01-2-.57l.01-.01V6.69h2z" />
                  </svg>
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
