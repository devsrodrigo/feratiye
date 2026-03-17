export interface Recipe {
  title: string;
  category: string;
  description: string;
  ingredients: string[];
  steps: string[];
  tiktok: string;
}

export const categories = [
  'Postres',
  'Dips y Aderezos',
  'Salsas y Acompañamientos',
  'Drinks',
  'Desayunos',
  'Pastas',
  'Botanas',
  'Pescado',
  'Comida Casera',
  'Comida China',
  'Arroz',
];

/**
 * Genera el path de imagen automáticamente a partir del título.
 * Solo pega la imagen en /public/images/ con este formato y funciona.
 *
 * Ejemplo: "Pay de Plátano con Cajeta y Nuez" → "/images/PaydePlatanoconCajetayNuez.png"
 */
export function formatImageName(title: string): string {
  // Return a known existing placeholder so pages never reference missing files in production.
  void title;
  return '/images/feratiyemain.JPG';
}

/**
 * Genera un slug URL-friendly a partir de un string.
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((r) => generateSlug(r.title) === slug);
}

export function getRecipesByCategory(categorySlug: string): Recipe[] {
  return recipes.filter((r) => generateSlug(r.category) === categorySlug);
}

export function getFeaturedRecipes(): Recipe[] {
  return [recipes[0], recipes[4], recipes[9], recipes[12], recipes[16], recipes[20]];
}

export const recipes: Recipe[] = [
  // ── COMIDA CASERA ──────────────────────────────────────
  {
    title: 'Pollo con Miel y Limón',
    category: 'Comida Casera',
    description:
      'Un platillo dulce, cítrico y lleno de sabor que se prepara en minutos. Perfecto para una comida rápida entre semana con resultados de restaurante.',
    ingredients: [
      'Pechugas de pollo en tiras',
      '3 cdas. de Miel de abeja',
      'Jugo de 2 limones',
      '2 dientes de Ajo picado',
      '2 cdas. de Salsa de soya',
      '1 cda. de Maicena',
      'Aceite de oliva',
      'Sal y pimienta al gusto',
      'Ajonjolí para decorar',
    ],
    steps: [
      'Corta las pechugas de pollo en tiras y sazona con sal, pimienta y ajo en polvo.',
      'Mezcla en un bowl la miel, el jugo de limón, la salsa de soya y la maicena disuelta en un poco de agua.',
      'Calienta aceite de oliva en un sartén a fuego medio-alto y sella las tiras de pollo hasta dorarlas por ambos lados.',
      'Vierte la mezcla de miel y limón sobre el pollo y cocina por 3-4 minutos hasta que la salsa espese.',
      'Sirve con arroz blanco y decora con ajonjolí tostado. ¡Venga!',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye/video/7246850535012306181',
  },
  {
    title: 'Pollo en Crema con Rajas',
    category: 'Comida Casera',
    description:
      'Uno de los mejores platillos de comida casera mexicana. Cremoso, reconfortante y con el toque perfecto de chile poblano.',
    ingredients: [
      '5 Chiles Poblanos',
      '1/3 Cebolla',
      '1 diente de Ajo',
      '500 g de Pollo deshebrado',
      '3/4 taza de Elote en grano',
      '1 taza de Crema',
      '1 1/2 tazas de Queso Manchego rallado',
      'Sal al gusto',
      'Pimienta al gusto',
    ],
    steps: [
      'Asa los chiles poblanos directamente en la flama o en un comal hasta que la piel se queme uniformemente.',
      'Colócalos en una bolsa de plástico cerrada por 10 minutos para que suden. Pela, desvena y corta en rajas.',
      'En un sartén con un poco de aceite, acitrona la cebolla y el ajo. Agrega las rajas y sofríe 3 minutos.',
      'Incorpora el pollo deshebrado y el elote. Mezcla bien y cocina por 2 minutos.',
      'Agrega la crema, sal y pimienta. Cocina a fuego bajo por 5 minutos.',
      'Añade el queso manchego rallado y mezcla hasta que se funda. Sirve con tortillas calientes.',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye/video/7405410863701560582',
  },
  {
    title: 'Tacos de Pollo',
    category: 'Comida Casera',
    description:
      'Cuando quieres algo rico sin complicarte, estos tacos de pollo son la solución. Caseros, sencillos y llenos de sabor.',
    ingredients: [
      'Pechugas de Pollo',
      'Tortillas de Maíz',
      '2 Tomates Huaje',
      '1/3 Cebolla Blanca',
      'Cilantro',
      '2 Chiles Serranos',
      'Queso Gouda rallado',
      'Chile Cascabel en polvo',
      'Comino',
      'Ajo en polvo',
      'Rábanos',
      'Pimienta Negra',
      'Aceite de Oliva',
    ],
    steps: [
      'Sazona las pechugas con sal, pimienta, comino y ajo en polvo. Cocínalas en un sartén con aceite de oliva hasta que estén bien cocidas.',
      'Deshebra el pollo y reserva.',
      'En el mismo sartén, sofríe la cebolla y los tomates picados con los chiles serranos.',
      'Agrega el pollo deshebrado, mezcla y espolvorea chile cascabel en polvo.',
      'Calienta las tortillas en un comal, rellena con el pollo y agrega queso Gouda rallado, rábanos y cilantro.',
      'Acompaña con limón y tu salsa favorita.',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye/video/7596748760177249556',
  },
  {
    title: 'Hot Honey Chicken Tenders',
    category: 'Comida Casera',
    description:
      'Crujientes por fuera, jugosos por dentro, bañados en una salsa de miel picante irresistible. Hechos en casa quedan mucho mejor que en restaurante.',
    ingredients: [
      'Pechugas de pollo (8–10 tiras)',
      'Jugo de pepinillos',
      '2 tazas de Panko',
      '1 taza de Harina de Trigo',
      '2 Huevos',
      'Aceite vegetal',
      '3/4 barra de Mantequilla (para salsa)',
      '2 dientes de Ajo (para salsa)',
      '1 cda. de Paprika',
      '1 cdita. de Chile de Árbol quebrado',
      '1 cda. de Aceite de Ajonjolí',
      'Sal',
      '1 cda. de Miel',
      'Ajonjolí',
    ],
    steps: [
      'Marina las tiras de pollo en jugo de pepinillos por al menos 30 minutos.',
      'Prepara tres estaciones: harina sazonada con sal y paprika, huevo batido, y panko.',
      'Pasa cada tira por harina, luego huevo y finalmente panko, presionando bien.',
      'Fríe en aceite vegetal caliente (180°C) hasta dorar por ambos lados, aprox. 4-5 minutos.',
      'Para la salsa Hot Honey: derrite la mantequilla, agrega el ajo, paprika, chile de árbol, aceite de ajonjolí, sal y miel. Cocina 2 minutos.',
      'Baña las tiras con la salsa y espolvorea ajonjolí. ¡A probar!',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye/video/7601541094614011157',
  },
  // ── COMIDA CHINA ──────────────────────────────────────
  {
    title: 'Carne con Brócoli',
    category: 'Comida China',
    description:
      'Como de restaurante chino… pero hecha en tu casa. Rápida, llena de sabor y con esa textura perfecta del stir fry.',
    ingredients: [
      '500 g de Bistec en tiras',
      'Sal',
      'Pimienta Negra',
      '300 g de Brócoli en floretes',
      '2 cdas. de Ajo picado',
      '1 cda. de Jengibre rallado',
      '1 cdita. de Pimiento Rojo triturado',
      '1/4 taza de Salsa de Soya',
      '1 taza de Caldo de Pollo',
      'Aceite de Oliva o de Ajonjolí',
      '5 cdas. de Maicena',
    ],
    steps: [
      'Corta el bistec en tiras delgadas y sazona con sal, pimienta y 2 cdas. de maicena. Deja reposar 15 minutos.',
      'Blanquea el brócoli en agua hirviendo con sal por 2 minutos. Escurre y reserva.',
      'En un wok o sartén grande a fuego alto, sella la carne con aceite hasta dorarla. Retira y reserva.',
      'En el mismo sartén, sofríe el ajo, jengibre y pimiento rojo triturado por 30 segundos.',
      'Mezcla la salsa de soya con el caldo de pollo y 3 cdas. de maicena disuelta. Vierte en el sartén y cocina hasta que espese.',
      'Regresa la carne y agrega el brócoli. Mezcla bien y sirve con arroz al vapor.',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye/video/7572463197530115346',
  },
  {
    title: 'Fajita de Res con Pimiento y Bambú',
    category: 'Comida China',
    description:
      'Olvídate de los restaurantes de comida china. Esta fajita de res con pimiento y bambú queda espectacular hecha en casa.',
    ingredients: [
      '350 g de Sirloin en tiras',
      '1 Pimiento Rojo en juliana',
      '1 Pimiento Verde en juliana',
      '140 g de Brotes de Bambú',
      '1 cda. de Jengibre rallado',
      '1/4 de taza de Licor de Arroz',
      '1/2 taza de Salsa de Soya',
      '1/4 de taza de Azúcar',
      'Sal y Pimienta Negra',
      'Aceite Vegetal',
      '2 cdas. de Maicena',
    ],
    steps: [
      'Corta el sirloin en tiras y marina con salsa de soya, maicena y pimienta. Deja reposar 20 minutos.',
      'Calienta un wok a fuego alto con aceite vegetal y sella la carne rápidamente. Retira y reserva.',
      'En el mismo wok, saltea los pimientos y el jengibre por 2 minutos.',
      'Agrega los brotes de bambú y cocina 1 minuto más.',
      'Mezcla el licor de arroz, salsa de soya y azúcar. Vierte en el wok y deja reducir.',
      'Regresa la carne, mezcla todo y sirve con arroz.',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye/video/7595810383886109972',
  },
  {
    title: 'Arroz Frito con Camarones',
    category: 'Comida China',
    description:
      'Arroz frito casero con camarones, lleno de sabor y listo en minutos. El secreto está en usar arroz frío del día anterior.',
    ingredients: [
      '300 g de Camarones limpios',
      '1 taza de Arroz Blanco frío (de un día antes)',
      '1/4 taza de Salsa de Soya',
      'Cebollín picado',
      'Aceite Vegetal',
      '2 Huevos',
      '1/3 de Cebolla Blanca picada',
      '1 diente de Ajo picado',
      'Pimienta Negra',
    ],
    steps: [
      'Calienta un wok con aceite vegetal a fuego alto. Saltea los camarones con sal y pimienta hasta que cambien de color. Retira.',
      'En el mismo wok, bate los huevos y cocina revolviendo para crear trozos pequeños.',
      'Agrega la cebolla y el ajo, sofríe 1 minuto.',
      'Incorpora el arroz frío y mezcla bien. Cocina sin mover por 2 minutos para que se dore.',
      'Agrega la salsa de soya y mezcla. Regresa los camarones.',
      'Finaliza con cebollín picado y pimienta al gusto.',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye/video/7558716408973020423',
  },
  // ── PESCADO ──────────────────────────────────────
  {
    title: 'Salmón al Ajo y Limón',
    category: 'Pescado',
    description:
      'La receta que nunca falla. Salmón jugoso con una capa dorada de ajo y un toque cítrico que equilibra todo el platillo.',
    ingredients: [
      'Filetes de Salmón',
      '3 dientes de Ajo picados',
      '2 Limones Amarillos',
      'Sal',
      'Pimienta Negra',
      '3 cdas. de Perejil picado',
      '2 cdas. de Aceite de Oliva',
      '1 cda. de Mostaza Dijon',
      'Brócoli al vapor',
      'Salsa de Soya',
    ],
    steps: [
      'Sazona los filetes de salmón con sal, pimienta y un poco de mostaza Dijon.',
      'Calienta aceite de oliva en un sartén a fuego medio-alto.',
      'Coloca los filetes con la piel hacia abajo y cocina 4 minutos sin mover.',
      'Voltea y agrega el ajo picado alrededor. Cocina 3 minutos más.',
      'Exprime el jugo de limón sobre el salmón y espolvorea perejil.',
      'Sirve con brócoli al vapor y un toque de salsa de soya.',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye/video/7566880684388715783',
  },
  {
    title: 'Tostadas de Atún con Chipotle',
    category: 'Pescado',
    description:
      'Una de mis entradas favoritas: fresca, picante y perfecta para compartir. El aderezo de chipotle le da un toque increíble.',
    ingredients: [
      '400 g de Atún fresco en cubos',
      '3 cdas. de Salsa de Soya',
      '2 Limones',
      '1 Naranja (jugo)',
      '1/3 Cebolla Morada picada',
      '1/2 Pepino picado',
      '3 Cebollines picados',
      'Aceite Vegetal',
      'Sal de Mar',
      'Pimienta Negra',
      'Tostadas de Maíz',
      'Aguacate',
      'Ajonjolí tostado',
      '1/2 taza de Mayonesa (aderezo)',
      '1 Chile Chipotle en adobo (aderezo)',
      '1 cda. de Sriracha (aderezo)',
      '1 cdita. de Ajo en polvo (aderezo)',
    ],
    steps: [
      'Marina los cubos de atún en salsa de soya, jugo de limón y jugo de naranja por 15 minutos en refrigeración.',
      'Prepara el aderezo de chipotle: licúa la mayonesa, el chile chipotle, sriracha, ajo en polvo, sal y pimienta.',
      'Pica la cebolla morada, pepino y cebollines.',
      'Escurre el atún y mezcla con la cebolla, pepino y cebollines.',
      'Sirve sobre tostadas de maíz con aguacate rebanado.',
      'Baña con el aderezo de chipotle y espolvorea ajonjolí tostado.',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye/video/7569415182758300936',
  },
  {
    title: 'Ceviche de Nopales y Camarones',
    category: 'Pescado',
    description:
      'Fresco, ligero y lleno de sabor. Perfecto para los días calurosos o cuando quieres algo saludable pero con mucho sabor.',
    ingredients: [
      '750 g de Nopales',
      '500 g de Camarones',
      '3 cdas. de Sal de Mar',
      '100 g de Cebolla Morada picada',
      '100 g de Tomate Huaje picado',
      '100 g de Rábanos picados',
      'Cilantro',
      '3 Limones',
      'Aceite de Oliva',
      'Pimienta Negra',
      '150 g de Tomatillo (para salsa)',
      'Cilantro (para salsa)',
      '25 g de Cebolla Blanca (para salsa)',
    ],
    steps: [
      'Limpia y corta los nopales en cubos. Cuécelos en agua con sal hasta que suelten la baba. Enjuaga muy bien.',
      'Cuece los camarones en agua con sal por 3 minutos. Enfría en hielo y pélalos.',
      'Para la salsa tatemada: asa los tomatillos en un comal hasta que estén suaves. Licúa con cilantro y cebolla.',
      'Mezcla los nopales, camarones, cebolla morada, tomate, rábanos y cilantro.',
      'Aliña con jugo de limón, aceite de oliva, sal y pimienta.',
      'Sirve con la salsa tatemada, tostadas y aguacate.',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye/video/7565702773489143048',
  },
  // ── PASTAS ──────────────────────────────────────
  {
    title: 'Pasta all Arrabbiata',
    category: 'Pastas',
    description:
      'Un clásico de la cocina italiana: sencillo, con pocos ingredientes y un toque picante que lo hace especial. Comfort food en su máxima expresión.',
    ingredients: [
      'Aceite de Oliva',
      '2 dientes de Ajo',
      'Perejil',
      '1 cda. de Pasta de Tomate',
      '250 g de Pasta Tortiglioni',
      '1/4 de Cebolla Blanca',
      '1/4 de Cebolla Morada',
      '1 lata de Tomates pelados',
      '1–2 Chiles Serranos',
      'Sal de Mar',
      'Chile rojo triturado al gusto',
      '1 cdita. de Orégano',
    ],
    steps: [
      'Cuece la pasta en abundante agua con sal hasta que esté al dente. Reserva un poco del agua de cocción.',
      'En un sartén grande, calienta aceite de oliva y sofríe el ajo picado con los chiles serranos.',
      'Agrega la cebolla blanca y morada picadas. Cocina hasta que estén transparentes.',
      'Incorpora la pasta de tomate y cocina 1 minuto. Agrega los tomates pelados y aplasta con un tenedor.',
      'Sazona con sal, chile rojo triturado y orégano. Cocina a fuego bajo por 10 minutos.',
      'Agrega la pasta al sartén con un poco del agua de cocción. Mezcla bien y sirve con perejil fresco.',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye/video/7589109548418403605',
  },
  {
    title: 'Coditos en Salsa Cremosa de Chipotle',
    category: 'Pastas',
    description:
      'Con estos coditos sí vale la pena romper la dieta. Cremosos, con el toque ahumado del chipotle y mucho queso.',
    ingredients: [
      '3/4 taza de Queso Chihuahua rallado',
      '3 dientes de Ajo',
      'Cebolla picada',
      '4 tiras de Tocino',
      '250 g de Coditos',
      '4 Tomates Huaje',
      'Pimienta Negra',
      'Sal de Mar',
      '1 taza de Crema Fresca',
      '4 Hojas de Laurel',
      'Chiles Chipotle en adobo',
      '1 cda. de Mantequilla',
      '3/4 taza de Puré de Tomate',
    ],
    steps: [
      'Cuece los coditos en agua con sal y hojas de laurel hasta que estén al dente. Escurre y reserva.',
      'Fríe el tocino en tiras hasta que esté crujiente. Reserva.',
      'En la grasa del tocino, sofríe la cebolla y el ajo. Agrega los tomates picados y cocina 5 minutos.',
      'Licúa los tomates con los chiles chipotle, puré de tomate y crema fresca.',
      'En el mismo sartén con mantequilla, vierte la salsa y cocina a fuego medio por 5 minutos.',
      'Incorpora los coditos, mezcla bien, agrega el queso y el tocino. Sirve caliente.',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye/video/7560552437946371336',
  },
  // ── BOTANAS ──────────────────────────────────────
  {
    title: 'Bruschettas con Jamón Serrano',
    category: 'Botanas',
    description:
      'Elegantes, frescas y llenas de sabor. Perfectas para reuniones y fiestas. La reducción balsámica con miel es la clave.',
    ingredients: [
      'Baguette en rebanadas',
      '1 cdita. de Albahaca seca',
      '300 g de Tomates Cherry partidos',
      '3 cdas. de Aceite de Oliva',
      '1/2 taza de Vinagre Balsámico',
      '1 1/2 cdas. de Miel de Abeja',
      '1 cdita. de Orégano',
      'Sal de Mar',
      'Pimienta Negra',
      'Ramas de Tomillo',
      'Queso Parmesano rallado',
      '200 g de Jamón Serrano',
    ],
    steps: [
      'Corta el baguette en rebanadas diagonales y tuéstalas en un sartén o en el horno con un poco de aceite de oliva.',
      'Para la reducción: calienta el vinagre balsámico con la miel a fuego bajo hasta que reduzca a la mitad.',
      'Mezcla los tomates cherry con aceite de oliva, albahaca, orégano, sal y pimienta.',
      'Coloca la mezcla de tomates sobre cada rebanada de pan.',
      'Agrega láminas de jamón serrano y queso parmesano rallado.',
      'Baña con la reducción balsámica y decora con tomillo fresco.',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye/video/7568195212225301768',
  },
  {
    title: 'Queso Fundido con Chorizo',
    category: 'Botanas',
    description:
      'El infaltable de toda carne asada. Cremoso, rendidor y con ese sabor que hace que todos repitan. Ideal para botanear.',
    ingredients: [
      '200 g de Queso Manchego rallado',
      '200 g de Queso Chihuahua rallado',
      '90 g de Queso Crema',
      '1/2 taza de Leche Evaporada',
      '200 g de Chorizo de Cerdo',
      '1/3 de Cebolla Blanca picada',
      '1 diente de Ajo picado',
      '1 Chile Jalapeño en rodajas',
      '1 Chile Serrano en rodajas',
      'Cebollín picado',
      'Totopos de Maíz',
    ],
    steps: [
      'En un sartén de hierro, cocina el chorizo desmenuzado hasta que esté bien dorado. Retira y reserva.',
      'En el mismo sartén, sofríe la cebolla, el ajo y los chiles jalapeño y serrano.',
      'Agrega el queso crema y la leche evaporada. Mezcla hasta integrar.',
      'Incorpora los quesos manchego y chihuahua. Cocina a fuego bajo mezclando constantemente.',
      'Cuando el queso esté fundido y cremoso, agrega el chorizo por encima.',
      'Decora con cebollín y sirve inmediatamente con totopos.',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye/video/7555722273068502280',
  },
  {
    title: 'Coliflor Crujiente',
    category: 'Botanas',
    description:
      'Esta receta de coliflor crujiente está de 10. Crujiente, ligera y con el toque justo de picante. Perfecta como botana o guarnición.',
    ingredients: [
      '1/2 Coliflor en floretes',
      '2 cdas. de Maicena',
      '1/4 taza de Aceite de Oliva',
      'Sal de Mar',
      'Pimienta Negra',
      'Ajo en Polvo',
      'Paprika',
      'Chile Cascabel en Polvo',
      '1/2 taza de Pan Molido',
      'Perejil picado',
    ],
    steps: [
      'Corta la coliflor en floretes pequeños y seca bien con papel absorbente.',
      'En un bowl, mezcla los floretes con aceite de oliva y maicena. Revuelve hasta cubrir.',
      'En otro bowl, mezcla el pan molido con ajo en polvo, paprika, chile cascabel, sal y pimienta.',
      'Pasa los floretes por la mezcla de pan molido presionando para que se adhiera.',
      'Coloca en una charola con papel parchemin y hornea a 220°C por 25 minutos, volteando a la mitad.',
      'Sirve con perejil picado y tu salsa favorita.',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye/video/7564658100360219922',
  },
  // ── SALSAS Y ACOMPAÑAMIENTOS ──────────────────────────
  {
    title: 'Champiñones al Ajillo',
    category: 'Salsas y Acompañamientos',
    description:
      'Van bien con cualquier plato fuerte y los tendrás listos en minutos. Simples, aromáticos y con un sabor extraordinario.',
    ingredients: [
      '500 g de Champiñones limpios y partidos',
      '1/2 taza de Aceite de Oliva',
      '3 dientes de Ajo en láminas',
      '1 Chile Guajillo en trozos',
      'Sal de Mar',
      'Perejil picado',
    ],
    steps: [
      'Limpia los champiñones con un trapo húmedo (nunca los remojes). Córtalos en mitades o cuartos.',
      'Calienta el aceite de oliva en un sartén grande a fuego medio-alto.',
      'Agrega el ajo en láminas y el chile guajillo. Cocina 30 segundos cuidando que no se queme.',
      'Incorpora los champiñones y cocina sin mover los primeros 3 minutos para que se doren.',
      'Revuelve, sazona con sal de mar y cocina 5 minutos más.',
      'Retira del fuego, espolvorea perejil fresco y sirve como guarnición.',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye/video/7557559651076689160',
  },
  {
    title: 'Salsa de Chile Morita',
    category: 'Salsas y Acompañamientos',
    description:
      'Pocos ingredientes, mucho sabor. Esta salsa de chile morita la tendrás lista en minutos y le da un toque ahumado increíble a cualquier platillo.',
    ingredients: [
      '10 Chiles Morita (desvenar 5)',
      '2 Tomates Huaje',
      '1 diente de Ajo',
      '1/4 de Cebolla Blanca',
      '1 taza de Agua Natural',
      '1 cdita. de Vinagre Blanco',
      'Sal al gusto',
      '1 pizca de Comino',
    ],
    steps: [
      'Desvena 5 de los chiles morita (los otros 5 déjalos enteros para más picor).',
      'En un comal, tuesta ligeramente los chiles, los tomates, la cebolla y el ajo.',
      'Hierve los chiles en una taza de agua por 5 minutos hasta que se suavicen.',
      'Licúa todo junto: chiles con su agua, tomates, ajo, cebolla, vinagre, sal y comino.',
      'Prueba y ajusta sal y picor.',
      'Sirve en molcajete o salsera. Perfecta para tacos, quesadillas o huevos.',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye/video/7562638978944388360',
  },
  // ── DIPS Y ADEREZOS ──────────────────────────────────
  {
    title: 'Tzatziki Casero',
    category: 'Dips y Aderezos',
    description:
      'Fresco, balanceado y muy fácil de preparar. Perfecto para acompañar pan pita, tostadas, pollo a la parrilla o como dip de verduras.',
    ingredients: [
      '1 pieza de Pepino',
      '500 g de Yogurt Natural sin Azúcar',
      '3 dientes de Ajo picados',
      '2 cdas. de Menta picada',
      '2 cdas. de Aceite de Oliva',
      '1 cda. de Vinagre de Vino Blanco',
      'Sal al gusto',
    ],
    steps: [
      'Ralla el pepino y exprime con las manos o un trapo para eliminar el exceso de agua.',
      'En un bowl, mezcla el yogurt con el pepino rallado.',
      'Agrega el ajo picado finamente, la menta, el aceite de oliva y el vinagre.',
      'Sazona con sal al gusto y mezcla bien.',
      'Refrigera por al menos 30 minutos para que los sabores se integren.',
      'Sirve frío acompañado de pan pita o verduras frescas.',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye/video/7588002295346924821',
  },
  {
    title: 'Hummus Casero',
    category: 'Dips y Aderezos',
    description:
      'Fácil, cremoso y perfecto para compartir. Este hummus se va directo a la mesa. Ideal para reuniones o como snack saludable.',
    ingredients: [
      '500 g de Garbanzos cocidos',
      '1/2 taza de Salsa Tahini (Pasta de Ajonjolí)',
      '2 dientes de Ajo',
      '1 cda. de Perejil picado',
      '2 Limones Verdes (jugo)',
      'Sal al gusto',
      'Pimentón o Paprika al gusto',
    ],
    steps: [
      'Escurre los garbanzos y reserva un poco del líquido.',
      'Licúa los garbanzos con la salsa tahini, ajo, jugo de limón y sal.',
      'Agrega líquido de los garbanzos poco a poco hasta lograr la consistencia deseada.',
      'Prueba y ajusta sal y limón.',
      'Sirve en un plato extendido, haciendo un hueco en el centro.',
      'Decora con aceite de oliva, pimentón y perejil picado. Acompaña con pan pita.',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye/video/7586499660034903316',
  },
  // ── DESAYUNOS ──────────────────────────────────────
  {
    title: 'Chilaquiles en Salsa de Chile Guajillo',
    category: 'Desayunos',
    description:
      'EL DESAYUNO ideal. Crujientes, bañados en una salsa roja casera de chile guajillo, con crema, queso y pollo deshebrado.',
    ingredients: [
      '6 Chiles Guajillo desvenados',
      '2 Tomates Huaje',
      '1 diente de Ajo',
      '1/4 de Cebolla Blanca',
      '1–1 1/2 taza de Agua',
      '3 tazas de Totopos',
      '1 taza de Pollo Deshebrado',
      'Crema al gusto',
      'Queso Fresco desmoronado',
      'Cilantro fresco',
    ],
    steps: [
      'Desvena los chiles guajillo y tuéstalos en un comal por unos segundos (sin quemar).',
      'Hierve los chiles con los tomates, ajo y cebolla en agua por 10 minutos.',
      'Licúa todo hasta obtener una salsa tersa. Cuela si prefieres.',
      'En un sartén con un poco de aceite, fríe la salsa por 3 minutos.',
      'Agrega los totopos y el pollo deshebrado. Mezcla bien cubriendo todo con la salsa.',
      'Sirve con crema, queso fresco y cilantro. ¡El desayuno perfecto!',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye/video/7578723381239958802',
  },
  {
    title: 'Hotcakes de Avena con Plátano',
    category: 'Desayunos',
    description:
      'Para cuando se antoja un desayuno dulce y saludable. Esponjosos, con avena y plátano natural. Sin azúcar añadida.',
    ingredients: [
      '2 Huevos',
      '1/2 taza de Leche',
      '1 Plátano maduro',
      '1 cda. de Vainilla',
      'Moras Azules',
      'Fresas',
      '1 cdita. de Polvo para Hornear',
      '1 taza de Harina de Avena',
    ],
    steps: [
      'Licúa los huevos, leche, plátano, vainilla y harina de avena hasta integrar.',
      'Agrega el polvo para hornear y mezcla con una espátula.',
      'Calienta un sartén antiadherente a fuego medio-bajo con un poco de mantequilla.',
      'Vierte un cucharón de la mezcla y cocina hasta que aparezcan burbujas en la superficie.',
      'Voltea y cocina 2 minutos más.',
      'Sirve con moras azules, fresas, miel al gusto y un poco de mantequilla.',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye/video/7599416547144174869',
  },
  // ── POSTRES ──────────────────────────────────────
  {
    title: 'Ensalada de Manzana',
    category: 'Postres',
    description:
      'La opción perfecta para balancear cualquier comida. Fresca, cremosa y con la combinación ideal de frutas y nueces.',
    ingredients: [
      '800 g de Manzanas Rojas y/o Verdes picadas',
      'Duraznos en almíbar picados',
      '1/3 taza de Almíbar de Durazno',
      'Piña picada',
      '1/2 taza de Arándanos',
      'Nuez al gusto',
      '1/2 taza de Pasas',
      '1 lata de Leche Condensada (base)',
      '1 taza de Yogurt Griego (base)',
      '1/2 taza de Crema Fresca (base)',
      '1/3 taza de Almíbar de Durazno (base)',
      'Vainilla al gusto (base)',
    ],
    steps: [
      'Prepara la base cremosa: mezcla la leche condensada, yogurt griego, crema fresca, almíbar y vainilla.',
      'Pica las manzanas en cubos medianos (con cáscara para más textura).',
      'Corta los duraznos y la piña en trozos similares.',
      'En un bowl grande, combina todas las frutas con los arándanos y las pasas.',
      'Vierte la base cremosa sobre las frutas y mezcla con cuidado.',
      'Agrega la nuez, refrigera por 1 hora y sirve bien fría.',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye/video/7583942273931545877',
  },
  {
    title: 'Pay de Plátano con Cajeta y Nuez',
    category: 'Postres',
    description:
      'Un postre casero que parece de pastelería. La combinación de plátano maduro con cajeta y nuez es simplemente irresistible.',
    ingredients: [
      '1 base de pay de galleta María',
      '4 Plátanos maduros',
      '1 taza de Cajeta',
      '1 taza de Nuez picada',
      '1 lata de Leche Condensada',
      '1 paquete de Queso Crema',
      '1 taza de Crema para batir',
      '1 cdita. de Vainilla',
      'Canela en polvo',
    ],
    steps: [
      'Bate el queso crema con la leche condensada y la vainilla hasta obtener una mezcla suave.',
      'Bate la crema para batir por separado hasta que forme picos firmes.',
      'Incorpora la crema batida a la mezcla de queso crema con movimientos envolventes.',
      'Vierte la mitad en la base de pay. Agrega plátano rebanado y cajeta.',
      'Cubre con el resto de la mezcla y decora con más plátano, cajeta, nuez y canela.',
      'Refrigera por al menos 4 horas antes de servir.',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye',
  },
  // ── ARROZ ──────────────────────────────────────
  {
    title: 'Arroz Huérfano',
    category: 'Arroz',
    description:
      'Una de muchas versiones del conocido arroz huérfano. Casero, rendidor y lleno de sabor. Ideal para aprovechar ingredientes.',
    ingredients: [
      '1 taza de Arroz',
      '2 tazas de Consomé de Res',
      '1 diente de Ajo',
      '1/4 Cebolla Blanca',
      '120 g de Tocino picado',
      '120 g de Pechuga de Pavo picada',
      '150 g de Pulpa Negra de Res picada',
      '1 cda. de Comino',
      '1 cda. de Canela en rajas',
      '2 Clavos de Olor',
      '1 cda. de Curry',
      'Nuez al gusto',
    ],
    steps: [
      'En un sartén, dora el tocino hasta que esté crujiente. Reserva.',
      'En la grasa del tocino, sella la pechuga de pavo y la pulpa negra de res. Sazona con sal y pimienta.',
      'Agrega el ajo y la cebolla picados. Sofríe hasta que estén transparentes.',
      'Incorpora el arroz crudo y sofríe 2 minutos revolviendo constantemente.',
      'Vierte el consomé de res, agrega el comino, canela, clavos y curry. Tapa y cocina a fuego bajo por 20 minutos.',
      'Al servir, agrega el tocino crujiente y nuez por encima.',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye/video/7591374944898927892',
  },
  // ── DRINKS ──────────────────────────────────────
  {
    title: 'Agua Fresca de Jamaica con Frutos Rojos',
    category: 'Drinks',
    description:
      'Una versión elevada del clásico agua de Jamaica. Refrescante, naturalmente dulce y con un color espectacular.',
    ingredients: [
      '2 tazas de Flor de Jamaica seca',
      '2 litros de Agua',
      '1 taza de Fresas picadas',
      '1/2 taza de Frambuesas',
      '1/2 taza de Arándanos',
      'Azúcar o miel al gusto',
      'Hielo',
      'Hojas de menta fresca',
      '1 Limón en rodajas',
    ],
    steps: [
      'Hierve 1 litro de agua y agrega la flor de Jamaica. Deja reposar tapado por 15 minutos.',
      'Cuela y deja enfriar completamente.',
      'En una jarra, combina el concentrado de Jamaica con el litro restante de agua fría.',
      'Agrega las fresas picadas, frambuesas y arándanos.',
      'Endulza al gusto con azúcar o miel. Mezcla bien.',
      'Sirve con mucho hielo, rodajas de limón y hojas de menta fresca.',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye',
  },
  {
    title: 'Costillas BBQ Caseras',
    category: 'Botanas',
    description:
      'Las hice en el horno en 2021 y hoy vuelven versión asador. Con salsa BBQ casera y un sazonador que las hace irresistibles.',
    ingredients: [
      '1 Rack de Costillas de Cerdo',
      'Mostaza Amarilla',
      '1 taza de Catsup (salsa BBQ)',
      '2 cdas. de Miel de Abeja (salsa BBQ)',
      '1 cda. de Salsa de Soya (salsa BBQ)',
      '1 cda. de Salsa Inglesa (salsa BBQ)',
      'Sal al gusto',
      'Pimienta Negra al gusto',
      'Sal de Mar (sazonador)',
      'Pimienta Negra (sazonador)',
      'Ajo en Polvo (sazonador)',
      'Cebolla en Polvo (sazonador)',
      'Paprika (sazonador)',
      'Comino (sazonador)',
      'Azúcar Morena (sazonador)',
    ],
    steps: [
      'Retira la membrana de la parte trasera de las costillas.',
      'Unta una capa delgada de mostaza amarilla sobre todo el rack.',
      'Mezcla todos los ingredientes del sazonador y cubre generosamente ambos lados.',
      'Envuelve en papel aluminio y cocina a fuego indirecto en el asador (120°C) por 3 horas.',
      'Prepara la salsa BBQ: mezcla catsup, miel, salsa de soya, salsa inglesa, sal y pimienta. Calienta 5 minutos.',
      'Retira el aluminio, barniza con la salsa BBQ y cocina 30 minutos más a fuego directo, barnizando cada 10 minutos.',
    ],
    tiktok: 'https://www.tiktok.com/@fernandoatiye/video/7577211995489963271',
  },
];
