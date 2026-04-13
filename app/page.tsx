import Link from 'next/link';
import Image from 'next/image';
import { recipes, categories, generateSlug, getFeaturedRecipes, normalizeCategory } from '@/lib/recipes';
import { products } from '@/lib/products';
import RecipeCard from '@/components/RecipeCard';
import ProductCard from '@/components/ProductCard';

const categoryIcons: Record<string, string> = {
  Desayunos: '/foodicons/desayunos.png',
  Botanas: '/foodicons/botanas.png',
  'Salsas y Guarniciones': '/foodicons/salsas.png',
  Arroz: '/foodicons/arroz.png',
  Casera: '/foodicons/comidacasera.png',
  'Cocina Italiana': '/foodicons/pastas.png',
  'Cocina Asiática': '/foodicons/comidachina.png',
  'Cocina Americana': '/foodicons/comidaamericana.png',
  Mariscos: '/foodicons/pescado.png',
  Saludable: '/foodicons/saludable.png',
  Bebidas: '/foodicons/drinks.png',
  Postres: '/foodicons/postres.png',
};

export default function HomePage() {
  const featured = getFeaturedRecipes();

  return (
    <>
      {/* ═══════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-primary overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blush blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-forest blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-20">
          <p className="uppercase tracking-[0.3em] text-blush/80 text-xs mb-8">
            Fernando Atiye
          </p>

          <h1 className="font-breathing text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-[1.1]">
            Cocinar rico no tiene por qué ser complicado
          </h1>

          <div className="editorial-rule !bg-blush/50 mx-auto mb-8" />

          <p className="text-white/70 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
            Recetas caseras, prácticas y llenas de sabor. Con ingredientes que ya tienes en casa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/recetas"
              className="btn-primary !bg-white !text-primary hover:!bg-blush hover:!text-dark"
            >
              Ver Recetas
            </Link>
            <Link href="/historia" className="btn-outline-white">
              Conoce mi Historia
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          EDITORIAL INTRO
      ═══════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Text column */}
            <div>
              <p className="section-label mb-6">Sobre Fernando</p>
              <h2 className="text-3xl md:text-5xl mb-6">¡Venga!</h2>
              <div className="editorial-rule !mx-0" />
              <p className="text-dark/70 text-base md:text-lg leading-relaxed mt-8 mb-4">
                Después de más de cinco años compartiendo recetas en redes sociales y con el apoyo de una comunidad de más de 850,000 personas, con millones de reproducciones, decidí crear esta página.
              </p>
              <p className="text-dark/70 text-base md:text-lg leading-relaxed">
                Más que una página, este es un espacio personal: mi historia, mi cocina y todo lo que he construido alrededor del sabor.
              </p>
              <Link
                href="/historia"
                className="inline-block mt-8 text-primary uppercase tracking-widest text-xs hover:text-forest transition-colors"
              >
                Leer mi historia completa →
              </Link>
            </div>

            {/* Photo column */}
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-cream order-first lg:order-last">
              <Image
                src="/images/feratiyemain.JPG"
                alt="Fernando Atiye en su cocina"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CATEGORÍAS
      ═══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-cream px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-4">Explora</p>
            <h2 className="text-3xl md:text-4xl">Categorías</h2>
            <div className="editorial-rule" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const count = recipes.filter((r) => normalizeCategory(r.category) === cat).length;
              return (
                <Link
                  key={cat}
                  href={`/recetas?categoria=${generateSlug(cat)}`}
                  className="group bg-white rounded-lg p-5 lg:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
                >
                  <span className="block mb-3">
                    <Image
                      src={categoryIcons[cat] || '/foodicons/dips.png'}
                      alt={cat}
                      width={40}
                      height={40}
                      style={{ display: 'inline-block', verticalAlign: 'middle' }}
                      className="mx-auto"
                    />
                  </span>
                  <h3 className="text-sm lg:text-base text-dark group-hover:text-primary transition-colors leading-tight">
                    {cat}
                  </h3>
                  <p className="mt-1 text-[11px] text-dark/40 uppercase tracking-widest">
                    {count} {count === 1 ? 'receta' : 'recetas'}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          RECETAS DESTACADAS
      ═══════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4">
            <div>
              <p className="section-label mb-4">Favoritas de la comunidad</p>
              <h2 className="text-3xl md:text-4xl">Recetas Destacadas</h2>
            </div>
            <Link
              href="/recetas"
              className="text-primary uppercase tracking-widest text-xs hover:text-forest transition-colors shrink-0"
            >
              Ver todas →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((recipe) => (
              <RecipeCard key={recipe.title} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PRODUCTOS PREVIEW
      ═══════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-cream px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-4">Hecho a mano</p>
            <h2 className="text-3xl md:text-4xl">Productos</h2>
            <div className="editorial-rule" />
            <p className="text-dark/60 mt-6 max-w-lg mx-auto text-sm leading-relaxed">
              Ingredientes pensados para elevar tus platillos. Hechos con la misma 
              pasión que ponemos en cada receta.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA FINAL
      ═══════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl mb-6">¿Listos para cocinar?</h2>
          <div className="editorial-rule" />
          <p className="text-dark/60 mt-8 mb-10 text-lg leading-relaxed">
            Encuentra la receta perfecta para hoy. Fácil, rica y con ingredientes 
            que seguramente ya tienes en casa.
          </p>
          <Link href="/recetas" className="btn-primary">
            Explorar Recetas
          </Link>
        </div>
      </section>
    </>
  );
}
