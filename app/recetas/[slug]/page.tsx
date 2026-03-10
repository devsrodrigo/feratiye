import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { recipes, getRecipeBySlug, generateSlug, formatImageName } from '@/lib/recipes';
import RecipeImage from '@/components/RecipeImage';
import RecipeCard from '@/components/RecipeCard';

export async function generateStaticParams() {
  return recipes.map((recipe) => ({
    slug: generateSlug(recipe.title),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    return { title: 'Receta no encontrada — Fernando Atiye' };
  }

  return {
    title: `${recipe.title} — Fernando Atiye`,
    description: recipe.description,
    openGraph: {
      title: `${recipe.title} — Fernando Atiye`,
      description: recipe.description,
      type: 'article',
      url: `https://www.niche.com.mx/feratiye/recetas/${slug}`,
    },
  };
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const imageSrc = formatImageName(recipe.title);

  // Get related recipes from same category (excluding current)
  const related = recipes
    .filter(
      (r) => r.category === recipe.category && generateSlug(r.title) !== slug
    )
    .slice(0, 3);

  return (
    <>
      {/* Hero Image */}
      <section className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] bg-cream overflow-hidden">
        <RecipeImage src={imageSrc} alt={recipe.title} fill />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-dark/20 to-transparent" />

        {/* Back button */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/recetas"
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bicyclette uppercase tracking-wider text-dark hover:bg-white transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Recetas
          </Link>
        </div>

        {/* Category + Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-16">
          <div className="max-w-4xl">
            <span className="inline-block bg-primary text-white px-3 py-1 text-[10px] font-bicyclette uppercase tracking-widest rounded-sm mb-4">
              {recipe.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              {recipe.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* TikTok CTA */}
          <div className="mb-12">
            <a
              href={recipe.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46v-7.15a8.16 8.16 0 005.58 2.2v-3.45a4.85 4.85 0 01-2-.57l.01-.01V6.69h2z" />
              </svg>
              Ver preparación en TikTok
            </a>
          </div>

          {/* Description */}
          <div className="mb-12">
            <p className="text-lg md:text-xl text-dark/80 leading-relaxed">
              {recipe.description}
            </p>
          </div>

          <div className="editorial-rule !mx-0" />

          {/* Ingredients */}
          <div className="my-12">
            <h2 className="text-2xl md:text-3xl mb-8">Ingredientes</h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-dark/80"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                  <span className="text-base leading-relaxed">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="editorial-rule !mx-0" />

          {/* Steps */}
          <div className="my-12">
            <h2 className="text-2xl md:text-3xl mb-8">Procedimiento</h2>
            <ol className="space-y-6">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-3xl text-primary/20 font-bicyclette leading-none mt-1 shrink-0 w-8">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-dark/80 leading-relaxed text-base pt-1">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 p-8 bg-cream rounded-lg text-center">
            <p className="text-2xl mb-2">¿Te gustó esta receta?</p>
            <p className="text-dark/60 text-sm mb-6">
              Mira el video completo con todos los detalles y tips.
            </p>
            <a
              href={recipe.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Ver en TikTok
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Related Recipes */}
      {related.length > 0 && (
        <section className="py-16 lg:py-24 bg-cream px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="section-label mb-3">Más de {recipe.category}</p>
              <h2 className="text-2xl md:text-3xl">Recetas Relacionadas</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((r) => (
                <RecipeCard key={r.title} recipe={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
