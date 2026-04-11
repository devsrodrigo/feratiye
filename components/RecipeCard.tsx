import Link from 'next/link';
import { formatImageName, generateSlug, normalizeCategory, type Recipe } from '@/lib/recipes';
import RecipeImage from './RecipeImage';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const slug = generateSlug(recipe.title);
  const imageSrc = recipe.image || formatImageName(recipe.title);

  return (
    <Link
      href={`/recetas/${slug}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <RecipeImage
          src={imageSrc}
          alt={recipe.title}
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-block bg-white/90 backdrop-blur-sm text-dark px-3 py-1 text-[10px] uppercase tracking-widest rounded-sm">
            {normalizeCategory(recipe.category)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 lg:p-6">
        <h3 className="text-xl lg:text-2xl text-dark group-hover:text-primary transition-colors duration-300 mb-2 leading-tight">
          {recipe.title}
        </h3>
        <p className="text-dark/60 text-sm leading-relaxed line-clamp-2">
          {recipe.description}
        </p>

        {/* Arrow indicator */}
        <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
          <span className="text-xs uppercase tracking-widest">Ver receta</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
