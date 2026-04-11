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
    name: 'Chile de Árbol en Polvo Premium',
    description:
      'Chile de árbol molido a la perfección. Picor intenso con notas ahumadas para darle vida a cualquier platillo.',
    longDescription:
      'Seleccionamos los mejores chiles de árbol, los tostamos artesanalmente y los molemos hasta obtener un polvo fino y aromático. El resultado es un chile con un picor limpio e intenso, con notas ligeramente ahumadas que realzan el sabor de cualquier platillo. Perfecto para espolvorear sobre tacos, sopas, salsas, carnes asadas o incluso frutas. Un must-have para quienes disfrutan del buen picante.',
    price: '$89',
  },
  {
    id: 'macha',
    slug: 'macha',
    name: 'Salsa Macha Estilo Fusión',
    description:
      'Una salsa innovadora que fusiona el umami del Macha con chiles mexicanos. Perfecta para sushi, poke bowls y más.',
    longDescription:
      'La Salsa Macha Estilo Fusión nace de la pasión por experimentar con sabores de diferentes culturas. Combinamos Macha ceremonial japonés con chiles guajillo y chipotle mexicanos, aceite de ajonjolí, salsa de soya y un toque de miel de abeja. El resultado es una salsa única que va perfecto con sushi, poke bowls, tacos de pescado o incluso como dip para tempura. Una aventura de sabor en cada gota.',
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
    chile: '/images/products/ChiledeArbolenPolvoPremium.png',
    macha: '/images/products/SalsaMachaEstiloFusionjar.png',
    ajo_perejil: '/images/products/Garlicandparsleyseasoningjar.png',
  };

  return productImages[slug] ?? '/images/feratiyemain.JPG';
}
