'use client';

import Link from 'next/link';
import { formatProductImage, type Product } from '@/lib/products';
import RecipeImage from './RecipeImage';

const TRACKING_URL =
  'https://script.google.com/macros/s/AKfycbwufRPDItj36aONtfd1wAoTfH3r7oyAvfdfav0LrU9CLLXPdHzpQqWks13EUb7oFcWP/exec';

const exactProductNames: Record<string, string> = {
  alioli: 'Alioli Artesanal',
  chile: 'Chile de Árbol Martajado',
  macha: 'Salsa Matcha',
  ajo_perejil: 'Sazonador Ajo con Perejil',
};

export default function ProductCard({ product }: { product: Product }) {
  const handleClick = () => {
    const productName = exactProductNames[product.id];
    if (productName) {
      const url = `${TRACKING_URL}?producto=${encodeURIComponent(productName)}`;
      fetch(url).catch(() => {});
    }
  };

  return (
    <Link
      href={`/productos/${product.slug}`}
      prefetch={true}
      onClick={handleClick}
      className="group block w-full text-left bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-cream">
        <RecipeImage
          src={formatProductImage(product.slug)}
          alt={product.name}
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5 lg:p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-lg lg:text-xl text-dark group-hover:text-primary transition-colors duration-300 leading-tight">
            {product.name}
          </h3>
          <span className="text-primary text-sm shrink-0">{product.price}</span>
        </div>
        <p className="text-dark/60 text-sm leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4 inline-flex items-center gap-2 text-primary text-xs uppercase tracking-widest">
          <span>Ver más</span>
          <svg
            className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
