import Link from 'next/link';
import type { Metadata } from 'next';
import { recipes, categories, generateSlug } from '@/lib/recipes';
import RecipeCard from '@/components/RecipeCard';

export const metadata: Metadata = {
  title: 'Recetas — Fernando Atiye',
  description:
    'Todas las recetas caseras de Fernando Atiye. Fáciles, prácticas y llenas de sabor. ¡Venga!',
};

export default async function RecetasPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;

  const filtered = categoria
    ? recipes.filter((r) => generateSlug(r.category) === categoria)
    : recipes;

  const activeCategory = categoria
    ? categories.find((c) => generateSlug(c) === categoria)
    : null;

  return (
    <>
      {/* Hero */}
      <section className="bg-cream py-16 lg:py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-label mb-4">Recetario</p>
          <h1 className="font-breathing text-4xl md:text-5xl lg:text-6xl mb-4">
            {activeCategory || 'Todas las Recetas'}
          </h1>
          <div className="editorial-rule" />
          <p className="text-dark/60 mt-6 max-w-lg mx-auto">
            {activeCategory
              ? `Explora nuestras recetas de ${activeCategory.toLowerCase()}. Fáciles, prácticas y llenas de sabor.`
              : 'Encuentra la receta perfecta para hoy. Cada una pensada para que cocinar sea un placer, no una complicación.'}
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="sticky top-20 z-30 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-1">
            <Link
              href="/recetas"
                className={`shrink-0 px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all ${
                !categoria
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-dark/60 hover:bg-gray-200'
              }`}
            >
              Todas
            </Link>
            {categories.map((cat) => {
              const catSlug = generateSlug(cat);
              const isActive = categoria === catSlug;
              return (
                <Link
                  key={cat}
                  href={`/recetas?categoria=${catSlug}`}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-dark/60 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="py-12 lg:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {filtered.length > 0 ? (
            <>
              <p className="text-dark/40 text-xs uppercase tracking-widest mb-8">
                {filtered.length} {filtered.length === 1 ? 'receta' : 'recetas'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((recipe) => (
                  <RecipeCard key={recipe.title} recipe={recipe} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <span className="text-5xl block mb-4">🍳</span>
              <h3 className="text-2xl mb-2">No se encontraron recetas</h3>
              <p className="text-dark/60 mb-6">
                Prueba con otra categoría o explora todas las recetas.
              </p>
              <Link href="/recetas" className="btn-primary">
                Ver Todas
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

