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
            Más que un recetario, esto es un pedacito de mí. De mi historia. De mi cocina. De mi día a día.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Chapter 1: Origen */}
          <div className="mb-20">
            <p className="section-label mb-4">Capítulo 01</p>
            <h2 className="text-3xl md:text-4xl mb-8">El Origen</h2>
            <div className="editorial-rule !mx-0 !mb-8" />

            <div className="space-y-6 text-dark/75 text-base md:text-lg leading-relaxed">
              <p>
                Nunca imaginé que lo que comenzó como un intento por promocionar quesos durante 
                la pandemia se convertiría en una de las pasiones más grandes de mi vida.
              </p>
              <p>
                En aquel entonces, lancé un pequeño emprendimiento llamado <strong className="text-dark">Quesos Santa Fe</strong>, 
                y para darlo a conocer, empecé a subir recetas a redes sociales usándolos como 
                ingrediente principal. Aunque con el tiempo tuve que dejar el negocio, descubrí 
                dos cosas que ya no estaba dispuesto a soltar: la cocina… y la creación de contenido.
              </p>
            </div>
          </div>

          {/* Chapter 2: Legado */}
          <div className="mb-20">
            <p className="section-label mb-4">Capítulo 02</p>
            <h2 className="text-3xl md:text-4xl mb-8">El Legado</h2>
            <div className="editorial-rule !mx-0 !mb-8" />

            <div className="space-y-6 text-dark/75 text-base md:text-lg leading-relaxed">
              <p>
                La cocina ha sido parte de mí desde siempre. Mi abuelo, aunque falleció cuando 
                yo tenía apenas seis años, dejó un legado muy grande. Era un verdadero maestro 
                en la cocina: tenía muchas recetas, le encantaba consentirnos y cada platillo 
                que preparaba estaba lleno de cariño.
              </p>
              <p>
                A pesar del tiempo, sigo replicando algunas de sus recetas y, en cada una, hay 
                un pedacito de su historia. Este proyecto, además, me ha acercado mucho más a mi 
                familia; cada cocinada se vuelve una excusa perfecta para reunirnos, reírnos y 
                disfrutar.
              </p>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="my-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-cream">
              <Image
                src="/images/feratiye1.jpeg"
                alt="Fernando Atiye — momentos en la cocina"
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
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
            <p className="section-label mb-4">Capítulo 03</p>
            <h2 className="text-3xl md:text-4xl mb-8">La Evolución</h2>
            <div className="editorial-rule !mx-0 !mb-8" />

            <div className="space-y-6 text-dark/75 text-base md:text-lg leading-relaxed">
              <p>
                Después de más de cuatro años compartiendo recetas en redes sociales, y con el 
                increíble apoyo de la comunidad que se ha formado en torno a mi contenido — más de 
                1,000,000 personas en mis redes sociales y millones de reproducciones — decidí crear este recetario.
              </p>
              <p>
                Mi intención es que tengas acceso rápido, claro y directo a todas esas recetas 
                caseras que han sido parte de mi camino, junto con mis mejores tips, combinaciones 
                favoritas, y uno que otro consejo que he ido aprendiendo en el proceso.
              </p>
            </div>
          </div>

          {/* Chapter 4: Filosofía */}
          <div className="mb-20">
            <p className="section-label mb-4">Capítulo 04</p>
            <h2 className="text-3xl md:text-4xl mb-8">La Filosofía</h2>
            <div className="editorial-rule !mx-0 !mb-8" />

            <div className="space-y-6 text-dark/75 text-base md:text-lg leading-relaxed">
              <p>
                Aquí vas a encontrar recetas fáciles, sabrosas y prácticas, hechas con ingredientes 
                que seguramente ya tienes en casa. No necesitas ser chef ni tener experiencia previa 
                para disfrutar de estas recetas.
              </p>
              <p>
                Están pensadas tanto para quienes están dando sus primeros pasos en la cocina, como 
                para quienes ya disfrutan cocinar y quieren seguir aprendiendo y explorando.
              </p>
              <p className="text-dark font-medium text-xl md:text-2xl">
                Cocinar rico no tiene por qué ser complicado.
              </p>
            </div>
          </div>

          {/* Chapter 5: Visión */}
          <div className="mb-20">
            <p className="section-label mb-4">Capítulo 05</p>
            <h2 className="text-3xl md:text-4xl mb-8">Visión Futura</h2>
            <div className="editorial-rule !mx-0 !mb-8" />

            <div className="space-y-6 text-dark/75 text-base md:text-lg leading-relaxed">
              <p>
                Este recetario es solo el comienzo. Mi sueño es seguir creciendo esta comunidad, 
                crear una línea de productos artesanales que lleven mi esencia a tu cocina, 
                y algún día poder compartir todo esto también a través de experiencias presenciales, 
                eventos y colaboraciones que acerquen a las personas a través de la comida.
              </p>
              <p>
                Porque al final, la cocina no se trata solo de ingredientes y técnicas — se trata 
                de personas, de momentos, de historias compartidas alrededor de una mesa.
              </p>
            </div>
          </div>

          {/* Closing */}
          <div className="text-center py-12 bg-cream rounded-lg px-8">
            <p className="text-dark/60 text-base md:text-lg leading-relaxed mb-4">
              Gracias por estar aquí.
            </p>
            <p className="text-dark/60 text-base md:text-lg leading-relaxed mb-8">
              Con mucho cariño, espero que lo disfruten mucho.
              <br />
              Y sin más, comencemos…
            </p>
            <p className="text-3xl md:text-4xl text-primary">¡Venga!</p>
            <p className="mt-4 text-dark/40 text-sm uppercase tracking-widest">
              Fernando Atiye
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
