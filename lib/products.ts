export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: string;
}

export const products: Product[] = [
  {
    id: 'alioli',
    slug: 'alioli',
    name: 'Alioli Artesanal',
    description:
      'Cremoso, con ajo real y un toque de limón. Perfecto para acompañar pan, mariscos o carnes a la parrilla.',
    longDescription:
      'Nuestro alioli artesanal está hecho con ingredientes frescos y de la mejor calidad: ajo real, aceite de oliva extra virgen, huevo, jugo de limón y un toque de sal de mar. Sin conservadores, sin artificiales — solo sabor puro. Ideal para darle ese toque especial a tus tortas, mariscos, carnes asadas o simplemente con un buen pan crujiente. Cada frasco es preparado en pequeños lotes para garantizar frescura y consistencia.',
    price: '$149',
  },
  {
    id: 'chile',
    slug: 'chile',
    name: 'Chile de Árbol Martajado',
    description:
      'Chile de árbol martajado artesanalmente. Textura real, picor intenso y notas ahumadas para darle vida a cualquier platillo.',
    longDescription:
      'Seleccionamos los mejores chiles de árbol, los tostamos artesanalmente y los martajamos para conservar su textura, aroma y personalidad. El resultado es un chile con un picor limpio e intenso, con notas ligeramente ahumadas que realzan el sabor de cualquier platillo. Perfecto para añadir sobre tacos, sopas, salsas, carnes asadas o incluso frutas. Un must-have para quienes disfrutan del buen picante.',
    price: '$89',
  },
  {
    id: 'macha',
    slug: 'macha',
    name: 'Salsa Macha Tradicional',
    description:
      'Una salsa tradicional veracruzana con chile de árbol, ajo, cebolla, cacahuates y ajonjolí. Perfecta para tacos, mariscos y más.',
    longDescription:
      'La Salsa Macha Tradicional respeta la receta veracruzana original: chile de árbol, ajo, cebolla, cacahuates y ajonjolí en aceite, con un toque de tortilla quemada para un fondo ahumado y profundo. Sazonada con sal y pimienta, resulta en una salsa con carácter, textura real y un picor limpio que eleva tacos, mariscos, huevos y arroces. Un clásico mexicano hecho con cariño.',
    price: '$129',
  },
  {
    id: 'ajo_perejil',
    slug: 'ajo_perejil',
    name: 'Sazonador Ajo con Perejil',
    description:
      'La base perfecta para cualquier receta. Ajo deshidratado con perejil y especias que le dan sabor a todo.',
    longDescription:
      'El Sazonador Ajo con Perejil es ese ingrediente secreto que todo cocinero necesita. Elaborado con ajo deshidratado de la mejor calidad, perejil, cebolla en polvo, pimienta negra y sal de mar. Un blend versátil que funciona como base para carnes, pastas, vegetales, sopas y más. Solo espolvorea y listo — sabor profesional sin complicaciones. Pensado para quienes creen que cocinar rico no tiene por qué ser complicado.',
    price: '$79',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatProductImage(slug: string): string {
  const productImages: Record<string, string> = {
    alioli: '/images/products/Artisanaliolijarcloseup.png',
    chile: '/images/products/ChiledeArbolMartajadojar.png',
    macha: '/images/products/SalsaMachaTradicionaljarcloseup.png',
    ajo_perejil: '/images/products/Garlicandparsleyseasoningjar.png',
  };

  return productImages[slug] ?? '/images/feratiyemain.JPG';
}
