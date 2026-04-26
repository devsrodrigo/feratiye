'use client';

import { useMemo, useState } from 'react';
import SearchBar from './SearchBar';
import ProductCard from './ProductCard';
import type { Product } from '@/lib/products';
import { fuzzySearchItems } from '@/lib/search';

interface ProductSearchSectionProps {
  initialProducts: Product[];
}

export default function ProductSearchSection({ initialProducts }: ProductSearchSectionProps) {
  const [searchValue, setSearchValue] = useState('');

  const filteredProducts = useMemo(() => {
    return fuzzySearchItems(initialProducts, searchValue, (product) => [
      product.name,
      product.description,
      product.longDescription,
    ]);
  }, [initialProducts, searchValue]);

  return (
    <section className="py-12 lg:py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-widest text-dark/50">Productos</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-semibold text-dark">Busca el producto que necesitas</h2>
            </div>
            <div className="max-w-xl w-full">
              <SearchBar
                value={searchValue}
                onChange={setSearchValue}
                placeholder="Busca por nombre, uso o sabor"
              />
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <>
            <p className="text-dark/40 text-xs uppercase tracking-widest mb-8">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'} disponibles
            </p>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <span className="text-5xl block mb-4">🛒</span>
            <h3 className="text-2xl mb-2">No se encontraron productos</h3>
            <p className="text-dark/60 mb-6">
              Ajusta tus términos de búsqueda o revisa la lista de productos disponibles.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
