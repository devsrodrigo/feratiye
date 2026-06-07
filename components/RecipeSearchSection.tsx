'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import RecipeCard from './RecipeCard';
import type { Recipe } from '@/lib/recipes';
import { generateSlug } from '@/lib/recipes';
import { fuzzySearchItems } from '@/lib/search';

interface RecipeSearchSectionProps {
  initialRecipes: Recipe[];
  activeCategory: string | null;
}

export default function RecipeSearchSection({ initialRecipes, activeCategory }: RecipeSearchSectionProps) {
  const [searchValue, setSearchValue] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const heading = activeCategory || 'Todas las recetas';
  const reportHref = activeCategory ? `/recetas/informe/${generateSlug(activeCategory)}` : null;

  const filteredRecipes = useMemo(() => {
    return fuzzySearchItems(initialRecipes, searchValue, (recipe) => [
      recipe.title,
      recipe.category,
      recipe.description,
      recipe.ingredients.join(' '),
    ]);
  }, [initialRecipes, searchValue]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const toggleSearch = () => {
    setSearchOpen((open) => {
      const next = !open;
      if (!next) {
        setSearchValue('');
      }
      return next;
    });
  };

  return (
    <section className="py-12 lg:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="section-label mb-2">El recetario</p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-dark">{heading}</h2>
            </div>

            <div className="flex items-center gap-3">
              {reportHref && (
                <Link href={reportHref} className="btn-outline !py-3 !px-6 !text-xs">
                  Leer informe
                </Link>
              )}
              <button
                type="button"
                onClick={toggleSearch}
                aria-label={searchOpen ? 'Cerrar búsqueda' : 'Buscar recetas'}
                aria-expanded={searchOpen}
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all ${
                  searchOpen
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-gray-200 text-dark/60 hover:border-primary hover:text-primary'
                }`}
              >
                {searchOpen ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Búsqueda desplegable */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              searchOpen ? 'mt-6 max-h-24 opacity-100' : 'mt-0 max-h-0 opacity-0'
            }`}
          >
            <div className="max-w-xl">
              <SearchBar
                value={searchValue}
                onChange={setSearchValue}
                placeholder="Busca por receta, ingrediente o categoría"
                inputRef={searchInputRef}
              />
            </div>
          </div>
        </div>

        {filteredRecipes.length > 0 ? (
          <>
            <p className="text-dark/40 text-xs uppercase tracking-widest mb-8">
              {filteredRecipes.length} {filteredRecipes.length === 1 ? 'receta' : 'recetas'}
              {searchValue ? ' encontradas' : ''}
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
