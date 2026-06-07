import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { recipes, generateSlug, normalizeCategory } from '@/lib/recipes';
import { categoryReports, getReportBySlug } from '@/lib/categoryReports';
import RecipeCard from '@/components/RecipeCard';

const categoryIcons: Record<string, string> = {
  Desayunos: '/foodicons/desayunos.png',
  Botanas: '/foodicons/botanas.png',
  'Salsas y Guarniciones': '/foodicons/salsas.png',
  Arroz: '/foodicons/arroz.png',
  Casera: '/foodicons/comidacasera.png',
  Pastas: '/foodicons/pastas.png',
  'Cocina Asiática': '/foodicons/comidachina.png',
  'Cocina Americana': '/foodicons/comidaamericana.png',
  'Del Mar': '/foodicons/pescado.png',
  Saludable: '/foodicons/saludable.png',
  Bebidas: '/foodicons/drinks.png',
  Postres: '/foodicons/postres.png',
};

export async function generateStaticParams() {
  return categoryReports.map((report) => ({ slug: report.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const report = getReportBySlug(slug);

  if (!report) {
    return { title: 'Informe no encontrado - Fernando Atiye' };
  }

  return {
    title: `${report.title} - Fernando Atiye`,
    description: report.lede,
    openGraph: {
      title: `${report.title} - Fernando Atiye`,
      description: report.lede,
      type: 'article',
      url: `https://feratiye.niche.com.mx/recetas/informe/${slug}`,
    },
  };
}

export default async function CategoryReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = getReportBySlug(slug);

  if (!report) {
    notFound();
  }

  const icon = categoryIcons[report.category] || '/foodicons/dips.png';
  const categoryRecipes = recipes
    .filter((recipe) => normalizeCategory(recipe.category) === report.category)
    .slice(0, 6);

  return (
    <>
      {/* ═══════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════ */}
      <section className="relative bg-primary py-20 lg:py-32 px-6 overflow-hidden">
        {/* Decorative glows */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blush blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-forest blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {/* Back link */}
          <div className="mb-10 flex justify-center">
            <Link
              href={`/recetas?categoria=${report.slug}`}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-xs uppercase tracking-wider text-white/90 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Recetas de {report.category}
            </Link>
          </div>

          {/* Icon */}
          <span className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
            <Image src={icon} alt={report.category} width={44} height={44} className="h-11 w-auto" />
          </span>

          <p className="uppercase tracking-[0.3em] text-blush/80 text-xs mb-6">{report.eyebrow}</p>
          <h1 className="font-breathing text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.1]">
            {report.title}
          </h1>
          <div className="editorial-rule !bg-blush/50" />
          <p className="text-white/70 mt-8 text-lg leading-relaxed max-w-xl mx-auto">{report.lede}</p>
          <p className="mt-6 text-white/40 text-xs uppercase tracking-widest">{report.readingTime}</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          ARTÍCULO
      ═══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 px-6">
        <article className="max-w-3xl mx-auto">
          {/* Intro */}
          <div className="space-y-6 text-dark/80 text-lg md:text-xl leading-relaxed">
            {report.intro.map((paragraph, index) => (
              <p key={index} className={index === 0 ? 'first-letter:float-left first-letter:font-breathing first-letter:text-6xl first-letter:leading-[0.8] first-letter:mr-3 first-letter:mt-1 first-letter:text-primary' : undefined}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Secciones */}
          {report.sections.map((section, index) => (
            <div key={index} className="mt-16">
              <h2 className="text-2xl md:text-3xl mb-6">{section.heading}</h2>
              <div className="editorial-rule !mx-0 !mb-8" />
              <div className="space-y-6 text-dark/75 text-base md:text-lg leading-relaxed">
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}

          {/* Pull quote */}
          <div className="my-16 py-12 border-t border-b border-primary/20 text-center">
            <blockquote className="font-breathing text-2xl md:text-3xl text-primary leading-relaxed max-w-2xl mx-auto">
              &ldquo;{report.pullQuote}&rdquo;
            </blockquote>
          </div>

          {/* Curiosidades */}
          <div className="mt-16">
            <p className="section-label mb-3">Para sorprender en la mesa</p>
            <h2 className="text-2xl md:text-3xl mb-8">¿Sabías que?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {report.curiosities.map((curiosity, index) => (
                <div key={index} className="rounded-xl bg-cream p-6 border border-primary/5">
                  <span className="font-breathing text-3xl text-primary/30 block mb-2">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-dark/75 text-sm md:text-base leading-relaxed">{curiosity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Técnicas */}
          <div className="mt-16">
            <p className="section-label mb-3">Manos a la obra</p>
            <h2 className="text-2xl md:text-3xl mb-8">Técnicas que vale la pena dominar</h2>
            <div className="space-y-6">
              {report.techniques.map((technique, index) => (
                <div key={index} className="flex gap-5">
                  <span className="text-3xl text-primary/20 leading-none mt-1 shrink-0 w-10 font-breathing">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-lg md:text-xl text-dark mb-1">{technique.name}</h3>
                    <p className="text-dark/70 leading-relaxed text-base">{technique.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recomendaciones */}
          <div className="mt-16 rounded-2xl bg-forest/5 p-8 lg:p-10 border border-forest/10">
            <p className="section-label mb-3 !text-forest">Del cocinero a tu cocina</p>
            <h2 className="text-2xl md:text-3xl mb-8">Recomendaciones</h2>
            <ul className="space-y-4">
              {report.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3 text-dark/80">
                  <svg className="w-5 h-5 text-forest mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cierre */}
          <div className="mt-16 text-center">
            <p className="font-breathing text-2xl md:text-3xl text-dark leading-relaxed max-w-xl mx-auto">
              {report.closing}
            </p>
          </div>
        </article>
      </section>

      {/* ═══════════════════════════════════════════════
          RECETAS DE LA CATEGORÍA
      ═══════════════════════════════════════════════ */}
      {categoryRecipes.length > 0 && (
        <section className="py-16 lg:py-24 bg-cream px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="section-label mb-3">Pasa de la teoría a la cocina</p>
              <h2 className="text-2xl md:text-4xl">Recetas de {report.category}</h2>
              <div className="editorial-rule" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryRecipes.map((recipe) => (
                <RecipeCard key={recipe.title} recipe={recipe} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href={`/recetas?categoria=${report.slug}`} className="btn-outline">
                Ver todas las recetas de {report.category}
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
