import { Suspense } from 'react';
import type { Metadata } from 'next';
import { recipes, categories } from '@/lib/recipes';
import RecipesFilter from '@/components/RecipesFilter';

export const metadata: Metadata = {
  title: 'Recetas — Fernando Atiye',
  description:
    'Todas las recetas caseras de Fernando Atiye. Fáciles, prácticas y llenas de sabor. ¡Venga!',
};

export default function RecetasPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream py-16 lg:py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-label mb-4">Recetario</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4">Todas las Recetas</h1>
          <div className="editorial-rule" />
          <p className="text-dark/60 mt-6 max-w-lg mx-auto">
            Encuentra la receta perfecta para hoy. Cada una pensada para que cocinar sea un placer,
            no una complicación.
          </p>
        </div>
      </section>

      {/* Category Filters + Grid (client-side filtered) */}
      <Suspense fallback={null}>
        <RecipesFilter recipes={recipes} categories={categories} />
      </Suspense>
    </>
  );
}
