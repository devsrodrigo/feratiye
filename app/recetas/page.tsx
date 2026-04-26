import Link from 'next/link';
import type { Metadata } from 'next';
import { recipes, categories, generateSlug, normalizeCategory } from '@/lib/recipes';
import RecipeCard from '@/components/RecipeCard';
import RecipeSearchSection from '@/components/RecipeSearchSection';

export const metadata: Metadata = {
  title: 'Recetas — Fernando Atiye',
  description:
    'Todas las recetas caseras de Fernando Atiye. Fáciles, prácticas y llenas de sabor. ¡Venga!',
};

function interleaveRecipesByCategory(recipesList: typeof recipes, categoryOrder: typeof categories) {
  const grouped = categoryOrder.reduce<Record<string, typeof recipes>>((acc, category) => {
    acc[category] = [];
    return acc;
  }, {} as Record<string, typeof recipes>);

  recipesList.forEach((recipe) => {
    const category = normalizeCategory(recipe.category);
    if (grouped[category]) {
      grouped[category].push(recipe);
    } else {
      grouped[category] = [recipe];
    }
  });

  const maxItems = Math.max(...Object.values(grouped).map((items) => items.length));
  const interleaved: typeof recipes = [];

  for (let index = 0; index < maxItems; index += 1) {
    for (const category of categoryOrder) {
      if (grouped[category][index]) {
        interleaved.push(grouped[category][index]);
      }
    }
  }

  return interleaved;
}

export default async function RecetasPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;

  const filtered = categoria
    ? recipes.filter((r) => generateSlug(normalizeCategory(r.category)) === categoria)
    : interleaveRecipesByCategory(recipes, categories);

  const activeCategory = categoria
    ? categories.find((c) => generateSlug(c) === categoria) ?? null
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
      <section className="sticky top-24 z-30 bg-white border-b border-gray-100">
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

      <RecipeSearchSection initialRecipes={filtered} activeCategory={activeCategory} />
    </>
  );
}

