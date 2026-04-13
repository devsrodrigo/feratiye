import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Mi Historia — Fernando Atiye',
  description:
    'Conoce la historia detrás de Fernando Atiye. Desde Quesos Santa Fe hasta convertirse en uno de los creadores de cocina más queridos de México.',
};

export default function HistoriaPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-20 lg:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="uppercase tracking-[0.3em] text-blush/80 text-xs mb-6">
            Detrás de cada receta
          </p>
          <h1 className="font-breathing text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Mi Historia
          </h1>
          <div className="editorial-rule !bg-blush/50" />
          <p className="text-white/60 mt-8 text-lg leading-relaxed max-w-xl mx-auto">
            Más que una página, este es un pedacito de mí; de mi historia, de mi cocina y de todo lo que he construido alrededor de ella.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Chapter 1: Origen */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl mb-8">El Origen</h2>
            <div className="editorial-rule !mx-0 !mb-8" />

            <div className="space-y-6 text-dark/75 text-base md:text-lg leading-relaxed">
              <p>
                Nunca imaginé que lo que comenzó como un intento por promocionar quesos durante 
                la pandemia se convertiría en una de las pasiones más grandes de mi vida.
              </p>
              <p>
                En aquel entonces, lancé un emprendimiento llamado <strong className="text-dark">Quesos Santa Fe</strong>, y para darlo a conocer, empecé a subir recetas a redes sociales usando los productos del negocio como ingrediente principal. Aunque con el tiempo tuve que dejar el negocio para continuar con mis estudios, descubrí dos cosas que ya no estaba dispuesto a soltar: la cocina… y la creación de contenido.
              </p>
            </div>
          </div>

          {/* Chapter 2: Legado */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl mb-8">El Legado</h2>
            <div className="editorial-rule !mx-0 !mb-8" />

            <div className="space-y-6 text-dark/75 text-base md:text-lg leading-relaxed">
              <p>
                La cocina ha sido parte de mí desde siempre. Mi abuelo, aunque falleció cuando yo tenía apenas seis años, dejó un legado muy grande. Era un verdadero maestro en la cocina: tenía muchas recetas, le encantaba consentirnos y cada platillo que preparaba dejaba sin palabras a todos sus familiares y amigos.
              </p>
              <p>
                A pesar del tiempo, sigo replicando algunas de sus recetas y, en cada una, hay un pedacito de su historia. Este proyecto, además, me ha acercado mucho más a mi familia; cada cocinada se vuelve una excusa perfecta para reunirnos, reírnos y disfrutar.
              </p>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="my-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-cream">
              <Image
                src="/images/feratiye4.jpeg"
                alt="Fernando Atiye — momentos en la cocina"
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-cream">
              <Image
                src="/images/feratiye2.jpeg"
                alt="Fernando Atiye — preparando una receta"
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-cream">
              <Image
                src="/images/feratiye3.jpeg"
                alt="Fernando Atiye — ingredientes y platillos"
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Pull Quote */}
          <div className="my-16 py-12 border-t border-b border-primary/20 text-center">
            <blockquote className="text-2xl md:text-3xl text-primary leading-relaxed max-w-xl mx-auto">
              &ldquo;Cada platillo que preparo lleva un pedacito de historia familiar, de cariño 
              y de las ganas de que quien lo pruebe lo disfrute tanto como yo al cocinarlo.&rdquo;
            </blockquote>
            <p className="mt-6 text-dark/40 text-sm uppercase tracking-widest">
              — Fernando Atiye
            </p>
          </div>

          {/* Chapter 3: Evolución */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl mb-8">La Evolución</h2>
            <div className="editorial-rule !mx-0 !mb-8" />

            <div className="space-y-6 text-dark/75 text-base md:text-lg leading-relaxed">
              <p>
                Después de más de cinco años compartiendo recetas en redes sociales, y con el increíble apoyo de la comunidad que se ha formado en torno a mi contenido — más de 850,000 personas en mis redes sociales y millones de reproducciones — decidí crear esta página.
              </p>
              <p>
                Mi intención es que aquí cuenten con un acceso rápido, claro y directo a todas las recetas que han sido parte de mi camino, junto con los tips y aprendizajes que he ido sumando a lo largo de este proceso. En esta página podrán explorar cada receta con el detalle de sus ingredientes, un procedimiento práctico que los guiará paso a paso y un video tutorial mío que los acompañará en todo el proceso.
              </p>
            </div>
          </div>

          {/* Chapter 4: Filosofía */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl mb-8">La Filosofía</h2>
            <div className="editorial-rule !mx-0 !mb-8" />

            <div className="space-y-6 text-dark/75 text-base md:text-lg leading-relaxed">
              <p>
                Las recetas que encontrarás aquí son fáciles, deliciosas y prácticas, hechas con ingredientes que muy probablemente ya tienes en casa. Están pensadas tanto para quienes están dando sus primeros pasos en la cocina, como para quienes ya disfrutan cocinar y quieren seguir aprendiendo y explorando.
              </p>
              <p>
                No necesitas ser experto ni tener experiencia previa en la cocina para prepararlas y disfrutarlas. Porque como siempre les digo:
              </p>
              <p className="text-dark font-medium text-xl md:text-2xl">
                Cocinar rico no tiene por qué ser complicado.
              </p>
            </div>
          </div>

          {/* Chapter 5: Visión */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl mb-8">Visión Futura</h2>
            <div className="editorial-rule !mx-0 !mb-8" />

            <div className="space-y-6 text-dark/75 text-base md:text-lg leading-relaxed">
              <p>
                Esta página es solo el comienzo de un proyecto que seguirá creciendo y evolucionando. Mi sueño es seguir creciendo esta comunidad que tanto aprecio y, con el tiempo, llevar esto más allá de la pantalla: crear productos, experiencias y espacios que conecten a las personas a través de la comida, y que todo lo que hoy ves aquí pueda formar parte de tu día a día de una forma aún más cercana.
              </p>
              <p>
                Porque al final, la cocina no se trata solo de recetas, sino de todo lo que sucede alrededor de ellas: los momentos, las personas y lo que se comparte en cada mesa.
              </p>
            </div>
          </div>

          {/* Full-width photo after Visión Futura */}
          <div className="my-12 relative w-full rounded-xl overflow-hidden bg-cream">
            <Image
              src="/images/feratiye5.jpeg"
              alt="Fernando Atiye — cocina y comunidad"
              width={1200}
              height={800}
              sizes="(max-width: 768px) 100vw, 900px"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Closing */}
          <div className="text-center py-12 bg-cream rounded-lg px-8">
            <p className="text-dark/60 text-base md:text-lg leading-relaxed mb-4">
              Gracias por estar aquí.
            </p>
            <p className="text-dark/60 text-base md:text-lg leading-relaxed mb-8">
              Con mucho cariño, espero que la disfruten mucho.
              <br />
              Y sin más, comencemos a cocinar…
            </p>
            <p className="text-3xl md:text-4xl text-primary">¡Venga!</p>
            <p className="mt-4 text-dark/40 text-sm uppercase tracking-widest">
              FERNANDO ATIYE
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
