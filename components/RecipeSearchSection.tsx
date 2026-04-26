'use client';

import { useMemo, useState } from 'react';
import SearchBar from './SearchBar';
import RecipeCard from './RecipeCard';
import type { Recipe } from '@/lib/recipes';
import { fuzzySearchItems } from '@/lib/search';

interface RecipeSearchSectionProps {
  initialRecipes: Recipe[];
  activeCategory: string | null;
}

export default function RecipeSearchSection({ initialRecipes, activeCategory }: RecipeSearchSectionProps) {
  const [searchValue, setSearchValue] = useState('');

  const filteredRecipes = useMemo(() => {
    return fuzzySearchItems(initialRecipes, searchValue, (recipe) => [
      recipe.title,
      recipe.category,
      recipe.description,
      recipe.ingredients.join(' '),
    ]);
  }, [initialRecipes, searchValue]);

  return (
    <section className="py-12 lg:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-widest text-dark/50">{activeCategory || 'Todas las recetas'}</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-semibold text-dark">Encuentra tu próxima receta</h2>
            </div>
            <div className="max-w-xl w-full">
              <SearchBar
                value={searchValue}
                onChange={setSearchValue}
                placeholder="Busca por receta, ingrediente o categoría"
              />
            </div>
          </div>
        </div>

        {filteredRecipes.length > 0 ? (
          <>
            <p className="text-dark/40 text-xs uppercase tracking-widest mb-8">
              {filteredRecipes.length} {filteredRecipes.length === 1 ? 'receta' : 'recetas'} encontradas
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.title} recipe={recipe} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <span className="text-5xl block mb-4">🍳</span>
            <h3 className="text-2xl mb-2">No se encontraron recetas</h3>
            <p className="text-dark/60 mb-6">
              Prueba escribir otra palabra clave o elimina algunos términos para ampliar la búsqueda.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
