'use client';

import { useRouter } from 'next/navigation';
import { formatProductImage, type Product } from '@/lib/products';
import RecipeImage from './RecipeImage';

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  const handleClick = async () => {
    try {
      await fetch('/api/product-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id }),
      });
    } catch (error) {
      console.error('Error tracking click:', error);
    }
    router.push(`/productos/${product.slug}`);
  };

  return (
    <button
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
          <span className="text-primary font-bicyclette text-sm shrink-0">{product.price}</span>
        </div>
        <p className="text-dark/60 text-sm leading-relaxed line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 inline-flex items-center gap-2 text-primary text-xs font-bicyclette uppercase tracking-widest">
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
    </button>
  );
}
