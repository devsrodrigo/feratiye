import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { visibleRecipes, getRecipeBySlug, generateSlug, normalizeCategory, formatImageName } from '@/lib/recipes';
import RecipeImage from '@/components/RecipeImage';
import RecipeCard from '@/components/RecipeCard';

export async function generateStaticParams() {
  return visibleRecipes.map((recipe) => ({
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
      url: `https://feratiye.niche.com.mx/recetas/${slug}`,
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

  const imageSrc = recipe.image || formatImageName(recipe.title);

  // Get related recipes from same category (excluding current)
  const related = visibleRecipes
    .filter(
      (r) => normalizeCategory(r.category) === normalizeCategory(recipe.category) && generateSlug(r.title) !== slug
    )
    .slice(0, 3);

  return (
    <>
      {/* Hero Image */}
      <section className="bg-cream px-4 sm:px-6 pt-8 md:pt-10 lg:pt-12">
        <div className="max-w-5xl mx-auto">
          <div className="relative aspect-[16/11] md:aspect-[16/10] overflow-hidden rounded-2xl">
            <RecipeImage src={imageSrc} alt={recipe.title} fill />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-dark/20 to-transparent" />

            {/* Back button */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
              <Link
                href="/recetas"
                className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs uppercase tracking-wider text-dark hover:bg-white transition-colors"
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
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 lg:p-10">
              <div className="max-w-3xl">
                <span className="inline-block bg-primary text-white px-3 py-1 text-[10px] uppercase tracking-widest rounded-sm mb-4">
                  {normalizeCategory(recipe.category)}
                </span>
                <h1 className="text-2xl md:text-4xl lg:text-5xl text-white leading-tight">
                  {recipe.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* TikTok CTA */}
          <div className="mb-12">
            <a
              href={recipe.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-3 whitespace-nowrap"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="-0.323 -3.128 42.684 42.128" fill="currentColor">
                <path d="M14 15.599v-1.486A13.1 13.1 0 0 0 12.337 14C5.535 14 0 19.18 0 25.547 0 29.452 2.086 32.91 5.267 35c-2.13-2.132-3.315-4.942-3.313-7.861 0-6.276 5.377-11.394 12.046-11.54" />
                <path d="M14.327 32c2.876 0 5.221-2.273 5.328-5.107l.01-25.292h4.65A8.72 8.72 0 0 1 24.164 0h-6.35l-.011 25.293c-.106 2.832-2.453 5.105-5.328 5.105a5.329 5.329 0 0 1-2.476-.61A5.34 5.34 0 0 0 14.327 32m18.672-21.814V8.78a8.818 8.818 0 0 1-4.81-1.421A8.85 8.85 0 0 0 33 10.186" />
                <path d="M28 7.718A8.63 8.63 0 0 1 25.832 2h-1.697A8.735 8.735 0 0 0 28 7.718M12.325 20.065c-2.94.004-5.322 2.361-5.325 5.27A5.267 5.267 0 0 0 9.854 30a5.2 5.2 0 0 1-1.008-3.073c.003-2.91 2.385-5.268 5.325-5.271.55 0 1.075.09 1.572.244v-6.4a11.72 11.72 0 0 0-1.572-.114c-.092 0-.183.006-.274.007v4.916a5.286 5.286 0 0 0-1.572-.244" />
                <path d="M32.153 11v4.884a15.15 15.15 0 0 1-8.813-2.811V25.84c0 6.377-5.23 11.565-11.658 11.565-2.485 0-4.789-.778-6.682-2.097A11.67 11.67 0 0 0 13.528 39c6.429 0 11.659-5.188 11.659-11.564V14.668A15.15 15.15 0 0 0 34 17.478v-6.283A8.87 8.87 0 0 1 32.153 11" />
                <path d="M23.979 25.42V12.632A15.741 15.741 0 0 0 33 15.448v-4.89a9.083 9.083 0 0 1-4.912-2.82C26.016 6.431 24.586 4.358 24.132 2h-4.747l-.01 25.215c-.11 2.824-2.505 5.09-5.44 5.09-1.754-.002-3.398-.822-4.42-2.204-1.794-.913-2.919-2.716-2.92-4.682.003-2.92 2.44-5.285 5.45-5.289.56 0 1.098.09 1.608.245v-4.933C7.202 15.589 2 20.722 2 27.016c0 3.045 1.219 5.816 3.205 7.885A12.115 12.115 0 0 0 12.045 37c6.58 0 11.934-5.195 11.934-11.58" />
              </svg>
              <span>Ver preparación en TikTok</span>
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
                  <span className="text-3xl text-primary/20 leading-none mt-1 shrink-0 w-8">
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
              href={recipe.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="-0.323 -3.128 42.684 42.128" fill="currentColor">
                <path d="M14 15.599v-1.486A13.1 13.1 0 0 0 12.337 14C5.535 14 0 19.18 0 25.547 0 29.452 2.086 32.91 5.267 35c-2.13-2.132-3.315-4.942-3.313-7.861 0-6.276 5.377-11.394 12.046-11.54" />
                <path d="M14.327 32c2.876 0 5.221-2.273 5.328-5.107l.01-25.292h4.65A8.72 8.72 0 0 1 24.164 0h-6.35l-.011 25.293c-.106 2.832-2.453 5.105-5.328 5.105a5.329 5.329 0 0 1-2.476-.61A5.34 5.34 0 0 0 14.327 32m18.672-21.814V8.78a8.818 8.818 0 0 1-4.81-1.421A8.85 8.85 0 0 0 33 10.186" />
                <path d="M28 7.718A8.63 8.63 0 0 1 25.832 2h-1.697A8.735 8.735 0 0 0 28 7.718M12.325 20.065c-2.94.004-5.322 2.361-5.325 5.27A5.267 5.267 0 0 0 9.854 30a5.2 5.2 0 0 1-1.008-3.073c.003-2.91 2.385-5.268 5.325-5.271.55 0 1.075.09 1.572.244v-6.4a11.72 11.72 0 0 0-1.572-.114c-.092 0-.183.006-.274.007v4.916a5.286 5.286 0 0 0-1.572-.244" />
                <path d="M32.153 11v4.884a15.15 15.15 0 0 1-8.813-2.811V25.84c0 6.377-5.23 11.565-11.658 11.565-2.485 0-4.789-.778-6.682-2.097A11.67 11.67 0 0 0 13.528 39c6.429 0 11.659-5.188 11.659-11.564V14.668A15.15 15.15 0 0 0 34 17.478v-6.283A8.87 8.87 0 0 1 32.153 11" />
                <path d="M23.979 25.42V12.632A15.741 15.741 0 0 0 33 15.448v-4.89a9.083 9.083 0 0 1-4.912-2.82C26.016 6.431 24.586 4.358 24.132 2h-4.747l-.01 25.215c-.11 2.824-2.505 5.09-5.44 5.09-1.754-.002-3.398-.822-4.42-2.204-1.794-.913-2.919-2.716-2.92-4.682.003-2.92 2.44-5.285 5.45-5.289.56 0 1.098.09 1.608.245v-4.933C7.202 15.589 2 20.722 2 27.016c0 3.045 1.219 5.816 3.205 7.885A12.115 12.115 0 0 0 12.045 37c6.58 0 11.934-5.195 11.934-11.58" />
              </svg>
              <span>Ver en TikTok →</span>
            </a>
          </div>
        </div>
      </section>

      {/* Related Recipes */}
      {related.length > 0 && (
        <section className="py-16 lg:py-24 bg-cream px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="section-label mb-3">Más de {normalizeCategory(recipe.category)}</p>
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
