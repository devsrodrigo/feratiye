import { categories, generateSlug, type Category } from './recipes';

/**
 * Informes editoriales por categoría.
 *
 * Cada informe está pensado como un artículo de revista gastronómica: con
 * historia, evolución, ingredientes característicos, importancia cultural,
 * curiosidades, técnicas y recomendaciones. El contenido es general sobre la
 * categoría, nunca sobre el canal. Nota de estilo: no se utilizan em dashes.
 */

export interface ReportSection {
  heading: string;
  paragraphs: string[];
}

export interface ReportTechnique {
  name: string;
  description: string;
}

export interface CategoryReport {
  category: Category;
  slug: string;
  eyebrow: string;
  title: string;
  lede: string;
  readingTime: string;
  intro: string[];
  sections: ReportSection[];
  pullQuote: string;
  curiosities: string[];
  techniques: ReportTechnique[];
  tips: string[];
  closing: string;
}

const reportsByCategory: Record<Category, Omit<CategoryReport, 'category' | 'slug'>> = {
  Desayunos: {
    eyebrow: 'Informe editorial',
    title: 'El desayuno, ese primer acto del día',
    lede: 'Antes del café hay un gesto más antiguo: el de romper el ayuno. Una historia de hogueras, conventos y cocinas que despiertan.',
    readingTime: '7 min de lectura',
    intro: [
      'Hay algo casi ceremonial en la primera comida del día. Mucho antes de que existiera la palabra desayuno, los seres humanos ya buscaban con qué reanimar el cuerpo después de la noche. La palabra lo dice todo: des-ayuno, el momento en que se rompe el ayuno acumulado durante el sueño. Lo que ponemos en el plato a esa hora dice más de una cultura que casi cualquier otra comida.',
      'En la mesa mexicana el desayuno nunca fue un trámite. Es territorio de salsas que despiertan, de huevos en mil formas y de pan dulce que acompaña al café. Entender de dónde viene esa costumbre ayuda a disfrutarla con otros ojos.',
    ],
    sections: [
      {
        heading: 'De ritual antiguo a costumbre moderna',
        paragraphs: [
          'Durante siglos el desayuno fue un asunto discreto. En la Europa medieval comer temprano se veía incluso con cierta sospecha, reservado a niños, ancianos y trabajadores que necesitaban energía para la jornada. Fue la Revolución Industrial la que impuso el horario fijo: cuando el trabajo arrancó al sonar una sirena, el cuerpo necesitó combustible a una hora exacta.',
          'En Mesoamérica, en cambio, la mañana siempre tuvo cocina propia. El maíz nixtamalizado, el atole, los tamales y los frijoles eran el sostén de quien salía al campo. El desayuno mexicano de hoy es heredero directo de esa lógica: empezar el día con algo cálido, sustancioso y hecho en casa.',
        ],
      },
      {
        heading: 'Los ingredientes que definen la mañana',
        paragraphs: [
          'El huevo es el gran protagonista. Versátil, económico y noble, acepta casi cualquier compañía: salsa roja o verde, chorizo, nopales, machaca o un simple chorrito de aceite caliente. A su lado, los frijoles refritos, la tortilla recién hecha y el queso fresco arman el cuadro clásico.',
          'Pero la mañana también tiene su lado dulce. Hotcakes, fruta de temporada, avena, pan dulce y licuados conviven con lo salado sin pedir permiso. Esa libertad para mezclar lo dulce y lo salado en un mismo plato es una de las firmas del desayuno latinoamericano.',
        ],
      },
      {
        heading: 'Una mesa que reúne',
        paragraphs: [
          'El desayuno tiene una dimensión social que la prisa moderna intenta borrar. El almuerzo de fin de semana, largo y sin reloj, sigue siendo uno de los rituales familiares más queridos. Es el momento para la sobremesa, para el segundo café, para esa conversación que no cabe entre semana.',
          'Cocinar el desayuno para alguien es una forma silenciosa de cuidado. No exige técnica de restaurante ni ingredientes raros, solo intención y un sartén caliente.',
        ],
      },
    ],
    pullQuote: 'El desayuno no se trata de lo elaborado del plato, sino de cómo arranca el día quien lo come.',
    curiosities: [
      'La palabra desayuno comparte raíz con casi todos los idiomas romances: en francés petit-déjeuner y en inglés breakfast significan literalmente romper el ayuno.',
      'El concepto del huevo a la mexicana imita los colores de la bandera con jitomate, cebolla y chile verde.',
      'El atole de maíz se sirve en México desde la época prehispánica y sigue siendo uno de los desayunos más antiguos que se preparan igual hasta hoy.',
    ],
    techniques: [
      { name: 'Punto del huevo', description: 'La diferencia entre un huevo tierno y uno seco está en el fuego medio bajo y en retirarlo del sartén un instante antes de que parezca listo, porque sigue cocinándose con su propio calor.' },
      { name: 'Salsa que se cocina', description: 'Para chilaquiles y huevos en salsa conviene freír ligeramente la salsa licuada antes de bañar el ingrediente, así pierde el sabor crudo y gana profundidad.' },
      { name: 'Hotcakes esponjosos', description: 'No batir de más la mezcla. Unos grumos en la masa son buena señal: el exceso de batido desarrolla gluten y vuelve los hotcakes correosos.' },
    ],
    tips: [
      'Ten siempre frijoles cocidos en el refrigerador: son la base de medio recetario de desayunos.',
      'Calienta las tortillas directamente sobre la flama o el comal, nunca en el microondas, para recuperar su aroma.',
      'Prepara una salsa base el domingo y rinde para varios desayunos de la semana.',
    ],
    closing: 'Empezar el día cocinando, aunque sean cinco minutos, cambia el tono de toda la mañana.',
  },

  Botanas: {
    eyebrow: 'Informe editorial',
    title: 'Botanas, el arte de picar entre amigos',
    lede: 'Ni entrada formal ni plato fuerte. La botana es ese territorio libre donde la comida se vuelve pretexto para quedarse un rato más.',
    readingTime: '6 min de lectura',
    intro: [
      'Hay comidas que alimentan y comidas que reúnen. La botana pertenece a la segunda categoría. No busca llenar, busca acompañar: la charla, el partido, la cerveza, la tarde que se alarga sin que nadie quiera irse.',
      'En México la botana es casi un género propio, con sus códigos y sus clásicos. Es informal por definición, pero detrás de su aparente sencillez hay siglos de cultura del compartir.',
    ],
    sections: [
      {
        heading: 'Un impulso universal',
        paragraphs: [
          'Picar entre comidas es una costumbre tan vieja como la humanidad. Los griegos tenían sus mezze, los españoles inventaron las tapas, el sudeste asiático perfeccionó la comida callejera. Todas comparten una idea: la comida en porciones pequeñas, pensada para acompañar la conversación más que para sentarse a comer en serio.',
          'La palabra antojito captura bien el espíritu mexicano de la botana. No se come por hambre, se come por antojo, por el placer de probar un poco de todo.',
        ],
      },
      {
        heading: 'El reino de lo crujiente y lo picante',
        paragraphs: [
          'La botana mexicana juega con los contrastes. Lo crujiente del totopo contra lo cremoso del guacamole, lo salado del cacahuate contra el ácido del limón, el golpe del chile contra el frescor de la cerveza. Salchichas, alitas, dips, nachos y cualquier cosa que se pueda comer con la mano son ciudadanos de pleno derecho.',
          'El limón y el chile en polvo son los grandes igualadores: pueden convertir una fruta, una papa o un puño de cacahuates en una botana memorable con un solo movimiento.',
        ],
      },
      {
        heading: 'La hora sagrada del compartir',
        paragraphs: [
          'La botana tiene horario social, no biológico. Aparece cuando llegan las visitas, cuando empieza el juego, cuando alguien dice quédate un rato. Su función no es nutritiva sino afectiva: es el plato que se pone en el centro de la mesa para que todos metan la mano.',
          'Por eso las mejores botanas son generosas y fáciles de compartir. Nada que requiera cubiertos serios ni porciones individuales. Aquí el plato es de todos.',
        ],
      },
    ],
    pullQuote: 'La botana no se sirve para callar el hambre, se sirve para que la reunión no termine.',
    curiosities: [
      'La palabra botana viene del cuero que tapaba las botas de vino: lo que se ponía encima para que no se derramara, igual que la botana acompaña la bebida.',
      'El chile en polvo con limón sobre fruta es una de las botanas callejeras más vendidas de México.',
      'En muchas cantinas tradicionales la botana se servía gratis con cada bebida, una costumbre que dio origen a recetarios completos.',
    ],
    techniques: [
      { name: 'Crocancia que dura', description: 'Para frituras caseras, escurrir sobre papel y salar en caliente. La sal se adhiere mejor cuando el aceite aún está tibio.' },
      { name: 'Equilibrio del dip', description: 'Un buen dip necesita un ácido que lo despierte. Unas gotas de limón o vinagre al final levantan cualquier mezcla cremosa.' },
      { name: 'Glaseado pegajoso', description: 'Para alitas y salchichas, reducir la salsa hasta que cubra el dorso de una cuchara antes de bañar la pieza, así el sabor se queda y no resbala.' },
    ],
    tips: [
      'Sirve siempre algo crujiente junto a algo cremoso: el contraste de texturas es la mitad del éxito.',
      'Ten limones, chile en polvo y sal a la mano; son el kit básico de cualquier botana.',
      'Prepara los dips con anticipación: casi todos mejoran después de un rato en el refrigerador.',
    ],
    closing: 'La mejor botana es la que sobra justo cuando la conversación se pone buena.',
  },

  'Salsas y Guarniciones': {
    eyebrow: 'Informe editorial',
    title: 'Salsas y guarniciones, el alma que acompaña',
    lede: 'Rara vez son las protagonistas, pero sin ellas el platillo queda a medias. La historia de los sabores que lo cambian todo.',
    readingTime: '7 min de lectura',
    intro: [
      'Hay un secreto que todo buen cocinero conoce: el platillo se recuerda por su salsa. La carne puede estar perfecta y el arroz en su punto, pero es la salsa la que decide si la comida fue memorable. Las guarniciones, esos acompañamientos discretos, completan el cuadro y le dan equilibrio.',
      'En México la salsa no es opcional. Es parte de la identidad de la mesa, un universo de chiles, técnicas y matices que merece contarse con detalle.',
    ],
    sections: [
      {
        heading: 'El molcajete antes de la licuadora',
        paragraphs: [
          'La salsa mexicana nace en la piedra. El molcajete, hecho de roca volcánica, fue durante milenios la herramienta para moler chiles, jitomates y especias. Su textura, ligeramente rugosa, aporta un carácter que ninguna licuadora reproduce del todo.',
          'El arte de la salsa es ancestral: los pueblos mesoamericanos ya combinaban decenas de chiles con tomates, semillas y hierbas mucho antes de la llegada de los españoles. Esa biblioteca de sabores es una de las grandes aportaciones de México a la cocina mundial.',
        ],
      },
      {
        heading: 'El chile, infinito en sus formas',
        paragraphs: [
          'No existe una sola salsa porque no existe un solo chile. El guajillo aporta color y dulzor, el árbol pura potencia, el morita un ahumado profundo, el habanero un picor floral, el jalapeño frescura. Tatemar, rehidratar, freír o licuar en crudo cambia por completo el resultado.',
          'Las guarniciones siguen la misma lógica de equilibrio. Una ensalada de col fresca corta la grasa de un guiso, unas cebollas encurtidas aportan acidez, un arroz neutro calma el picante. Acompañar bien es tan importante como cocinar bien.',
        ],
      },
      {
        heading: 'El toque final que define la mesa',
        paragraphs: [
          'En la mesa mexicana la salsa es democrática: cada quien se sirve la suya, gradúa su propio picante, personaliza su plato. Ese gesto de pasar la salsera es una pequeña ceremonia de hospitalidad.',
          'Una buena salsa también es memoria. Muchas familias guardan la suya como herencia, con proporciones que no están escritas en ningún lado y que se transmiten probando, corrigiendo y volviendo a probar.',
        ],
      },
    ],
    pullQuote: 'Dime qué salsa pones en la mesa y te diré de qué cocina vienes.',
    curiosities: [
      'México tiene decenas de variedades de chile, muchas con nombre distinto según estén frescas o secas: el jalapeño seco y ahumado se vuelve chipotle.',
      'El molcajete tiene más de cuatro mil años de uso continuo en Mesoamérica.',
      'La palabra salsa viene del latín salsus, que significa salado, porque la sal fue el primer condimento de la humanidad.',
    ],
    techniques: [
      { name: 'Tatemar', description: 'Asar los chiles, jitomates y ajos directamente sobre el comal hasta que la piel se ennegrezca aporta un ahumado profundo que define a las salsas tatemadas.' },
      { name: 'Rehidratar chiles secos', description: 'Sumergir los chiles secos en agua caliente, no hirviendo, los suaviza sin amargarlos. El agua de remojo puede reservarse para ajustar la salsa.' },
      { name: 'Freír la salsa', description: 'Verter la salsa licuada sobre aceite caliente y dejar que sazone unos minutos transforma su sabor: pierde lo crudo y gana cuerpo.' },
    ],
    tips: [
      'Prueba y ajusta la sal al final, nunca al principio: los sabores se concentran al cocinar.',
      'Guarda una guarnición ácida, como cebolla encurtida, lista en el refrigerador para levantar cualquier plato.',
      'Si una salsa quedó muy picante, un poco de aceite o un toque de azúcar suavizan el golpe sin esconder el sabor.',
    ],
    closing: 'La salsa correcta no tapa el platillo, lo revela.',
  },

  Arroz: {
    eyebrow: 'Informe editorial',
    title: 'Arroz, el grano que alimenta al mundo',
    lede: 'Humilde y universal, sostiene a más de la mitad del planeta. Un viaje desde los arrozales de Asia hasta la cazuela mexicana.',
    readingTime: '7 min de lectura',
    intro: [
      'Pocos alimentos han hecho tanto por la humanidad con tan poco ruido. El arroz no presume. Es el lienzo neutro sobre el que se pintan miles de cocinas, el acompañante fiel que nunca compite y siempre completa. Más de la mitad de la población mundial depende de él como alimento básico.',
      'En México el arroz llegó tarde pero echó raíces hondas. El arroz rojo, el blanco, el verde poblano son hoy tan parte de la comida como si siempre hubieran estado ahí.',
    ],
    sections: [
      {
        heading: 'De Asia al mundo entero',
        paragraphs: [
          'El arroz se domesticó hace más de diez mil años en lo que hoy es China. Desde ahí conquistó India, el sudeste asiático, el Medio Oriente y, de la mano de los árabes, llegó a España. Los barcos españoles lo trajeron a América en el siglo dieciséis y aquí encontró suelo y clima para quedarse.',
          'Cada cultura lo hizo suyo. El risotto cremoso de Italia, el sushi de Japón, el biryani de la India, la paella de España y el arroz a la mexicana comparten el mismo grano y resultados completamente distintos. Esa capacidad de adaptación es su mayor virtud.',
        ],
      },
      {
        heading: 'La técnica lo es todo',
        paragraphs: [
          'Con el arroz, el ingrediente importa menos que el método. El arroz mexicano se distingue por un paso clave: dorar el grano en aceite antes de añadir el líquido. Ese sofrito sella el almidón y consigue que cada grano quede suelto, nunca apelmazado.',
          'La proporción de líquido, el fuego suave y la paciencia para no destapar la cazuela son las tres reglas de oro. El arroz castiga la prisa y premia la calma.',
        ],
      },
      {
        heading: 'El acompañante que une la mesa',
        paragraphs: [
          'En la comida mexicana el arroz es la primera sopa seca, el plato que abre el camino antes del guisado principal. Su neutralidad lo hace perfecto para acompañar lo que sea: un mole, un bistec, unos frijoles o simplemente un huevo encima.',
          'Es también símbolo de abundancia y de hogar. Una cazuela de arroz humeante en el centro de la mesa transmite la idea de que hay comida suficiente para todos.',
        ],
      },
    ],
    pullQuote: 'El arroz no busca el aplauso, busca que todo lo demás brille a su lado.',
    curiosities: [
      'Existen más de cuarenta mil variedades de arroz cultivadas en el mundo.',
      'En la cocina mexicana el arroz se considera una sopa seca, parte de la estructura tradicional de la comida.',
      'El arroz rojo mexicano debe su color al jitomate licuado que se incorpora al líquido de cocción, no a ningún colorante.',
    ],
    techniques: [
      { name: 'Sofreír el grano', description: 'Dorar el arroz seco en un poco de aceite hasta que tome color nacarado es el secreto del arroz suelto. El almidón se sella y los granos no se pegan.' },
      { name: 'La proporción justa', description: 'Como regla general, dos partes de líquido por una de arroz. Ajustar según el tipo de grano y respetar la medida evita el arroz batido.' },
      { name: 'Reposo final', description: 'Apagar el fuego y dejar reposar tapado diez minutos permite que el grano termine de absorber el vapor y quede esponjado.' },
    ],
    tips: [
      'No destapes la cazuela durante la cocción: el vapor que escapa es el que cocina el grano.',
      'Si vas a hacer arroz frito, úsalo del día anterior y frío: queda mucho más suelto.',
      'Un diente de ajo y media cebolla en el sofrito perfuman todo el arroz sin necesidad de más.',
    ],
    closing: 'Dominar el arroz es dominar la paciencia, y esa lección sirve para toda la cocina.',
  },

  Casera: {
    eyebrow: 'Informe editorial',
    title: 'Comida casera, el sabor que no se olvida',
    lede: 'No está en los libros de alta cocina pero vive en la memoria de todos. La defensa del guiso de todos los días.',
    readingTime: '7 min de lectura',
    intro: [
      'Hay platillos que ningún restaurante logra replicar del todo, por más estrellas que tenga. Son los de casa. La comida casera no aspira a impresionar, aspira a reconfortar, y en ese objetivo modesto encierra el corazón mismo de la gastronomía.',
      'El guiso de la abuela, la sopa de los días fríos, el platillo que se cocina sin receta porque ya vive en las manos: eso es la cocina casera. La que sostiene la vida cotidiana y construye los recuerdos más duraderos.',
    ],
    sections: [
      {
        heading: 'La cocina de la necesidad y el ingenio',
        paragraphs: [
          'La comida casera nació del aprovechamiento. Sin grandes presupuestos ni ingredientes de lujo, las cocinas familiares aprendieron a sacar lo máximo de lo disponible: estirar una carne con verduras, convertir las sobras en un guiso nuevo, hacer rendir cada peso.',
          'De esa lógica de ingenio surgieron algunos de los platillos más queridos. El picadillo, los guisados de olla, las albóndigas y los caldos nacieron como soluciones prácticas y se quedaron como tradiciones porque, simplemente, saben a hogar.',
        ],
      },
      {
        heading: 'El fuego lento como filosofía',
        paragraphs: [
          'La cocina casera es enemiga de la prisa. Sus mejores resultados vienen del fuego lento, de la olla que borbotea durante horas, del guiso que se deja reposar para que los sabores se asienten. Es una cocina de tiempo, no de técnica espectacular.',
          'Esa lentitud tiene una recompensa química real: el fuego suave y prolongado deshace los tejidos de la carne, concentra los caldos y funde los sabores en una armonía que el fuego alto jamás consigue.',
        ],
      },
      {
        heading: 'Comer en familia, una herencia viva',
        paragraphs: [
          'La comida casera es inseparable de la mesa compartida. No se concibe para comer de pie ni a solas frente a una pantalla, sino sentados, conversando, sirviéndose de la misma cazuela. Es el pegamento invisible de la vida familiar.',
          'Cada familia tiene su recetario no escrito, esos platillos que definen quiénes son. Cocinarlos es una forma de mantener vivos a quienes nos los enseñaron, de repetir un gesto que viene de generaciones atrás.',
        ],
      },
    ],
    pullQuote: 'La comida casera no se mide por lo elaborada, sino por cuánto sabe a casa.',
    curiosities: [
      'Muchos platillos caseros nacieron como forma de aprovechar sobras y hoy son clásicos por derecho propio.',
      'El concepto de comfort food existe en todas las culturas: comida que reconforta más por su carga emocional que por sus ingredientes.',
      'Los caldos y guisos de cocción lenta suelen saber mejor al día siguiente, cuando los sabores terminan de integrarse.',
    ],
    techniques: [
      { name: 'Sofrito base', description: 'Casi todo guiso casero empieza igual: cebolla, ajo y jitomate cocinados con paciencia. Ese sofrito es el cimiento del sabor.' },
      { name: 'Cocción lenta', description: 'Mantener el guiso a fuego bajo y prolongado ablanda las carnes duras y concentra los caldos. La paciencia es el ingrediente secreto.' },
      { name: 'Sazonar por capas', description: 'Agregar sal y condimentos en distintos momentos, no todo al final, construye un sabor con más profundidad.' },
    ],
    tips: [
      'Cocina de más a propósito: muchos guisos caseros saben mejor recalentados al día siguiente.',
      'No subestimes el caldo de pollo casero como base; transforma cualquier guiso.',
      'Prueba constantemente mientras cocinas; la cocina casera se corrige sobre la marcha, no se mide con báscula.',
    ],
    closing: 'Al final, la receta más valiosa es la que aprendiste viendo cocinar a alguien que te quería.',
  },

  Pastas: {
    eyebrow: 'Informe editorial',
    title: 'Pasta, la sencillez convertida en arte',
    lede: 'Harina y agua, nada más. Y sin embargo, de esa fórmula mínima nació una de las cocinas más amadas del planeta.',
    readingTime: '7 min de lectura',
    intro: [
      'Pocas cosas demuestran tan bien que la grandeza puede nacer de lo simple. La pasta es, en esencia, harina y agua. Pero alrededor de esa fórmula elemental Italia construyó todo un universo de formas, salsas y reglas que se respetan casi como dogmas.',
      'Su éxito global es indiscutible: no hay rincón del mundo donde no se cocine pasta. Y sin embargo, hacerla bien sigue siendo un arte de detalles que separan al plato correcto del plato memorable.',
    ],
    sections: [
      {
        heading: 'Un origen más viejo de lo que parece',
        paragraphs: [
          'La leyenda dice que Marco Polo trajo la pasta de China, pero la historia la desmiente: en Italia ya se comían fideos siglos antes de su viaje. Los pueblos del Mediterráneo conocían las masas secas desde la antigüedad, y los árabes perfeccionaron el secado que permitía conservarlas.',
          'Fue en el sur de Italia, con su trigo duro y su sol, donde la pasta seca encontró su hogar definitivo. Nápoles se convirtió en su capital, y de ahí conquistó primero la península y luego el mundo entero.',
        ],
      },
      {
        heading: 'La forma no es capricho',
        paragraphs: [
          'Cada forma de pasta existe por una razón. Los espagueti se enredan en salsas ligeras de aceite, las pastas tubulares como los rigatoni atrapan salsas con trozos, las formas con surcos retienen las cremas. Maridar la forma correcta con la salsa correcta es la primera lección italiana.',
          'La regla más sagrada es la cocción al dente, literalmente al diente: la pasta debe ofrecer una ligera resistencia al morderla. Pasarse de cocción es, para un italiano, casi una falta de respeto.',
        ],
      },
      {
        heading: 'El secreto está en el agua y en el final',
        paragraphs: [
          'Dos secretos separan a la pasta casera de la de restaurante. El primero: salar el agua generosamente, hasta que sepa a mar, porque es el único momento en que la pasta se sazona por dentro. El segundo: terminar la cocción en la salsa, no en la olla.',
          'El agua de cocción, turbia de almidón, es oro líquido. Un cucharón de esa agua emulsiona la salsa y la hace abrazar cada hebra. Quien la tira pierde el ingrediente más útil del plato.',
        ],
      },
    ],
    pullQuote: 'La pasta perdona pocos errores, pero recompensa con creces a quien respeta sus reglas.',
    curiosities: [
      'Existen más de trescientas formas de pasta reconocidas en Italia, cada una con su nombre y su uso.',
      'La cocción al dente no es solo cuestión de textura: la pasta menos cocida tiene un índice glucémico más bajo.',
      'El agua de cocción de la pasta, rica en almidón, es el secreto para ligar salsas cremosas sin agregar crema.',
    ],
    techniques: [
      { name: 'Agua salada', description: 'El agua debe saber a mar. Es el único momento en que la pasta absorbe sal desde dentro, así que la generosidad aquí define todo el plato.' },
      { name: 'Mantecatura', description: 'Terminar de cocinar la pasta en la sartén con la salsa y un poco de agua de cocción emulsiona todo y hace que la salsa se adhiera.' },
      { name: 'Reservar el agua', description: 'Guardar una taza del agua de cocción antes de colar permite ajustar la cremosidad de cualquier salsa al final.' },
    ],
    tips: [
      'Nunca enjuagues la pasta después de colarla: el almidón de la superficie ayuda a que la salsa se pegue.',
      'No agregues aceite al agua de cocción; impide que la salsa se adhiera después.',
      'Calcula la salsa para la pasta y no al revés: la pasta no espera, se sirve de inmediato.',
    ],
    closing: 'Hacer una buena pasta es entender que la sencillez bien ejecutada es la forma más alta de la cocina.',
  },

  'Cocina Asiática': {
    eyebrow: 'Informe editorial',
    title: 'Cocina asiática, el equilibrio en un bocado',
    lede: 'Dulce, salado, ácido, amargo y umami danzando en el mismo plato. El arte milenario de balancear lo opuesto.',
    readingTime: '8 min de lectura',
    intro: [
      'Si la cocina occidental suele buscar la profundidad de un sabor dominante, la asiática persigue otra cosa: el equilibrio. En un solo bocado pueden convivir lo dulce, lo salado, lo ácido, lo picante y ese quinto sabor escurridizo, el umami. Esa búsqueda de armonía es su firma más reconocible.',
      'Hablar de cocina asiática es, en realidad, hablar de muchas cocinas: la china, la japonesa, la tailandesa, la coreana, la vietnamita, cada una con su lógica. Pero todas comparten una sensibilidad por el balance que vale la pena entender.',
    ],
    sections: [
      {
        heading: 'Una filosofía servida en el plato',
        paragraphs: [
          'En buena parte de Asia la comida nunca se separó de la idea de bienestar. La medicina tradicional china clasifica los alimentos por sus cualidades, y la cocina busca un equilibrio que va más allá del sabor. Comer bien es, en esa visión, una forma de cuidar el cuerpo.',
          'El umami, hoy reconocido por la ciencia como el quinto sabor, fue identificado por un investigador japonés a principios del siglo veinte. Pero las cocinas asiáticas llevaban milenios cultivándolo a través de la salsa de soya, los caldos largos y los ingredientes fermentados.',
        ],
      },
      {
        heading: 'El wok y el fuego vivo',
        paragraphs: [
          'Ninguna herramienta define tanto a la cocina china como el wok. Su forma cóncava concentra el calor en el fondo y permite saltear a fuego altísimo en segundos. De ahí surge el llamado aliento del wok, ese aroma ahumado que solo se logra con fuego intenso y movimiento constante.',
          'La velocidad es clave. El salteado asiático cocina los ingredientes en muy poco tiempo, conservando su textura y color. Por eso la preparación previa, tener todo cortado y listo antes de encender el fuego, es tan importante como el cocinado mismo.',
        ],
      },
      {
        heading: 'Ingredientes que construyen el sabor',
        paragraphs: [
          'La despensa asiática tiene sus pilares: salsa de soya para la sal y el umami, jengibre y ajo para el aroma, aceite de ajonjolí para el toque final, vinagre de arroz para la acidez, y el azúcar justo para redondear. Aprender a dosificarlos es aprender a cocinar asiático.',
          'El arroz, omnipresente, no es un acompañante secundario sino el centro silencioso de la comida. En muchos idiomas asiáticos, la palabra para arroz es prácticamente sinónimo de comida.',
        ],
      },
    ],
    pullQuote: 'La cocina asiática no persigue un sabor, persigue el equilibrio entre todos.',
    curiosities: [
      'El umami fue identificado científicamente en Japón en 1908, a partir del caldo de alga kombu.',
      'El aliento del wok, conocido como wok hei, es un aroma que solo se logra con fuego muy alto y resulta casi imposible de replicar en una estufa doméstica débil.',
      'La salsa de soya se fermenta durante meses y existe en decenas de variedades según la región.',
    ],
    techniques: [
      { name: 'Mise en place', description: 'Tener todos los ingredientes cortados y medidos antes de encender el fuego es indispensable: el salteado asiático ocurre en cuestión de segundos.' },
      { name: 'Saltear a fuego alto', description: 'El secreto del salteado es el calor intenso y el movimiento constante. Los ingredientes se cocinan rápido y conservan su textura crujiente.' },
      { name: 'Marinar con maicena', description: 'Cubrir la carne con un poco de maicena y salsa de soya antes de cocinarla, técnica llamada velveting, la deja increíblemente suave.' },
    ],
    tips: [
      'Equilibra siempre los cinco sabores: si algo falta, suele ser acidez o un toque de dulce.',
      'Calienta bien el wok o sartén antes de agregar el aceite; el metal debe estar casi humeante.',
      'Agrega el aceite de ajonjolí al final, fuera del fuego: su aroma se pierde si se cocina.',
    ],
    closing: 'Cocinar asiático enseña una lección que sirve para todo: lo mejor casi siempre está en el balance.',
  },

  'Cocina Americana': {
    eyebrow: 'Informe editorial',
    title: 'Cocina americana, el crisol en un plato',
    lede: 'Hamburguesas, pollo frito y barbecue. Detrás de los íconos del comfort food hay una historia de migraciones y mezcla.',
    readingTime: '7 min de lectura',
    intro: [
      'La cocina estadounidense suele resumirse en clichés: hamburguesas, papas fritas, refrescos enormes. Pero detrás de esos íconos hay una historia mucho más rica, la de un país construido por migrantes que trajeron sus recetas y las fundieron en algo nuevo. Es, quizá, la cocina de la mezcla por excelencia.',
      'Lo que llamamos comida americana es en realidad un mosaico: las influencias africanas del sur, las europeas del noreste, las mexicanas del suroeste, las asiáticas de la costa oeste. Cada platillo clásico esconde varios orígenes.',
    ],
    sections: [
      {
        heading: 'Una cocina hecha de muchas cocinas',
        paragraphs: [
          'El pollo frito, hoy símbolo del sur de Estados Unidos, combina técnicas escocesas de freír con condimentos africanos traídos por las personas esclavizadas. La hamburguesa lleva el nombre de Hamburgo y llegó con los migrantes alemanes. El barbecue tiene raíces caribeñas e indígenas. Casi nada es de un solo lugar.',
          'Esa capacidad de absorber y reinventar es la marca de la casa. La cocina americana toma prestado sin complejos y crea sus propios clásicos a partir de lo ajeno, hasta volverlos inconfundiblemente suyos.',
        ],
      },
      {
        heading: 'El reino del comfort food',
        paragraphs: [
          'Si algo define a esta cocina es el concepto de comfort food: comida generosa, sabrosa y reconfortante, pensada para satisfacer más que para sorprender. Porciones amplias, sabores directos, texturas que reconfortan. Es una cocina sin pretensiones que apela a la emoción.',
          'El equilibrio entre lo crujiente y lo jugoso es una obsesión recurrente. Del pollo empanizado al sándwich de queso fundido, muchos de sus platillos persiguen ese contraste de texturas que resulta casi adictivo.',
        ],
      },
      {
        heading: 'La cultura del compartir a lo grande',
        paragraphs: [
          'La comida americana es social por naturaleza. El barbecue de fin de semana, el partido con alitas, la cena de Acción de Gracias: muchos de sus rituales giran en torno a comer en grupo, al aire libre, sin formalidades.',
          'Esa informalidad es parte de su encanto. Aquí se come con las manos sin culpa, se comparte la fuente y se celebra la abundancia. Es una cocina hecha para juntarse.',
        ],
      },
    ],
    pullQuote: 'No hay platillo americano que no esconda, en su origen, el sabor de otro país.',
    curiosities: [
      'El barbecue de cocción lenta tiene raíces en técnicas indígenas del Caribe; la palabra viene del taíno barbacoa.',
      'La hamburguesa debe su nombre a la ciudad de Hamburgo, de donde salió el filete de res molida que la inspiró.',
      'El pollo frito sureño es resultado de la fusión entre técnicas escocesas y condimentos de la cocina afroamericana.',
    ],
    techniques: [
      { name: 'Empanizado crujiente', description: 'Un doble paso por harina con un baño intermedio de suero de leche o huevo crea esa costra gruesa y crujiente característica del pollo frito.' },
      { name: 'Sellado de la carne', description: 'Dorar bien la carne a fuego alto antes de cocinarla forma una costra sabrosa por la reacción de Maillard y conserva los jugos.' },
      { name: 'Cocción lenta del barbecue', description: 'El verdadero barbecue se cocina a baja temperatura durante horas, lo que deshace los tejidos duros y ahuma la carne lentamente.' },
    ],
    tips: [
      'Para empanizados, deja reposar la pieza ya empanizada unos minutos antes de freír: la costra se adhiere mejor.',
      'Sazona la carne con anticipación; la sal necesita tiempo para penetrar y realzar el sabor.',
      'No saturas el sartén o la freidora: demasiadas piezas a la vez bajan la temperatura y el resultado queda grasoso.',
    ],
    closing: 'La cocina americana demuestra que mezclar sin miedo también es una forma de crear tradición.',
  },

  'Del Mar': {
    eyebrow: 'Informe editorial',
    title: 'Del mar, la cocina de la frescura',
    lede: 'Donde el ingrediente manda y la técnica se hace a un lado. El arte de no estorbar al sabor del océano.',
    readingTime: '7 min de lectura',
    intro: [
      'Cocinar pescados y mariscos es, paradójicamente, un ejercicio de contención. A diferencia de otras cocinas que construyen sabor a base de horas de fuego, la del mar suele consistir en saber cuándo detenerse. El mejor cocinero de mariscos es el que menos los maltrata.',
      'México, con sus dos extensos litorales, tiene una cultura marina riquísima: del ceviche del Pacífico al pescado a la veracruzana del Golfo, pasando por los tacos de pescado del norte. Todos comparten un mismo mandamiento: la frescura es innegociable.',
    ],
    sections: [
      {
        heading: 'Una despensa tan antigua como las costas',
        paragraphs: [
          'Los pueblos costeros han vivido del mar desde siempre. Mucho antes de las técnicas refinadas, ya se conservaba el pescado con sal y se cocía con cítricos, como en el ceviche, una preparación que el ácido del limón cocina sin necesidad de fuego.',
          'La cocina marina mexicana es mestiza. El pescado a la veracruzana, con sus aceitunas y alcaparras, cuenta la historia del encuentro entre el Golfo y el Mediterráneo. Cada platillo costero guarda la memoria de quienes llegaron por mar.',
        ],
      },
      {
        heading: 'El punto exacto, ni un minuto más',
        paragraphs: [
          'El gran enemigo del pescado es el exceso de cocción. Su carne, delicada y de fibras cortas, pasa de jugosa a seca en cuestión de segundos. La regla de oro es cocinarlo justo hasta que la carne se desprenda en lascas pero conserve su humedad.',
          'Los mariscos son aún más exigentes. Un camarón se cocina en uno o dos minutos; pasado de ese punto se vuelve gomoso. Aquí la atención al fuego importa más que cualquier receta.',
        ],
      },
      {
        heading: 'Frescura, el único lujo indispensable',
        paragraphs: [
          'En la cocina del mar no hay técnica que rescate un ingrediente que no está fresco. El olor debe ser a mar, no a pescado; los ojos brillantes, la carne firme. Comprar bien es la mitad del éxito antes de encender la estufa.',
          'Por eso esta cocina premia la sencillez. Un buen pescado pide poco: sal, limón, quizá un poco de ajo y aceite. Cuando el ingrediente es excelente, la mejor receta es la que menos lo disfraza.',
        ],
      },
    ],
    pullQuote: 'Con el mar en el plato, cocinar de menos casi siempre es cocinar mejor.',
    curiosities: [
      'El ceviche no usa fuego: el ácido cítrico desnaturaliza las proteínas del pescado, cociéndolo en frío.',
      'El pescado a la veracruzana combina ingredientes mediterráneos como aceitunas y alcaparras, herencia directa del intercambio con España.',
      'Un camarón cambia de translúcido a opaco cuando está listo; ese color es la señal más confiable de su punto.',
    ],
    techniques: [
      { name: 'Cocción en cítrico', description: 'En el ceviche, el jugo de limón cuaja las proteínas del pescado en crudo. El tiempo de marinado define la textura: más tiempo, más firme.' },
      { name: 'Sellar la piel', description: 'Cocinar el filete con la piel hacia abajo y sin moverlo logra una piel crujiente y protege la carne de secarse.' },
      { name: 'Punto del marisco', description: 'Retirar los mariscos del fuego apenas cambian de color. El calor residual termina la cocción sin endurecerlos.' },
    ],
    tips: [
      'Seca bien el pescado antes de cocinarlo: la humedad impide que dore y lo hace hervir en su propio jugo.',
      'Agrega el limón al final sobre el pescado cocido; si lo cocinas con cítrico desde el inicio, la carne se reseca.',
      'Compra el producto del día y cocínalo el mismo día: el mar no espera.',
    ],
    closing: 'La cocina del mar enseña humildad: a veces el mejor ingrediente solo necesita que lo dejes en paz.',
  },

  Saludable: {
    eyebrow: 'Informe editorial',
    title: 'Cocina saludable, comer bien sin renunciar al sabor',
    lede: 'Lejos de la dieta del castigo. La idea, cada vez más clara, de que lo nutritivo y lo delicioso pueden ser lo mismo.',
    readingTime: '7 min de lectura',
    intro: [
      'Durante años, comer sano cargó con una mala fama injusta: se asociaba a la privación, al plato triste, a la dieta vivida como castigo. Esa idea está quedando atrás. La cocina saludable de hoy parte de una premisa distinta: que lo nutritivo y lo sabroso no solo pueden convivir, sino que suelen ir de la mano.',
      'No se trata de contar calorías con angustia, sino de elegir bien y cocinar con intención. Verduras de temporada, granos enteros, proteínas limpias y grasas buenas pueden dar lugar a platillos que se disfrutan sin culpa ni resignación.',
    ],
    sections: [
      {
        heading: 'Del régimen estricto al equilibrio',
        paragraphs: [
          'La historia de la alimentación saludable estuvo dominada mucho tiempo por las dietas restrictivas, esas que prohíben grupos enteros de alimentos. Hoy la ciencia de la nutrición apunta en otra dirección: hacia la variedad, el equilibrio y la sostenibilidad de los hábitos en el tiempo.',
          'Las dietas tradicionales más estudiadas por su efecto en la salud, como la mediterránea, no se basan en prohibir sino en priorizar: más vegetales, granos enteros, legumbres y aceite de oliva, y un consumo moderado de lo demás. La clave no es la perfección, es la constancia.',
        ],
      },
      {
        heading: 'Sabor sin atajos poco sanos',
        paragraphs: [
          'El reto de la cocina saludable es lograr sabor sin recurrir al exceso de grasa, sal o azúcar. La buena noticia es que existen herramientas de sobra: las especias, las hierbas frescas, los cítricos, el ajo, los fermentados y las técnicas de cocción correctas pueden dar enorme profundidad de sabor con muy poco.',
          'Asar, en lugar de freír, concentra los azúcares naturales de las verduras. Un buen aderezo a base de yogur en lugar de crema, un toque de limón en vez de más sal: pequeños cambios que conservan el placer y restan lo innecesario.',
        ],
      },
      {
        heading: 'Comer bien como acto cotidiano',
        paragraphs: [
          'La alimentación saludable no es un proyecto de temporada sino una forma de vivir. No depende de superalimentos caros ni de modas pasajeras, sino de decisiones sencillas y repetidas: cocinar más en casa, comer más vegetales, escuchar al cuerpo.',
          'Cuidarse a través de la comida es, en el fondo, una forma de respeto propio. Y cuando lo saludable también es delicioso, el hábito deja de costar trabajo y empieza a disfrutarse.',
        ],
      },
    ],
    pullQuote: 'Comer sano no es renunciar al placer, es descubrir que el placer también puede nutrir.',
    curiosities: [
      'La dieta mediterránea está reconocida como Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO.',
      'Asar las verduras concentra sus azúcares naturales mediante la caramelización, lo que intensifica su sabor sin agregar nada.',
      'El yogur griego natural aporta cremosidad y proteína, y sustituye muy bien a la crema en aderezos y salsas.',
    ],
    techniques: [
      { name: 'Asado en lugar de fritura', description: 'Hornear o asar las verduras y proteínas reduce la grasa añadida y potencia el sabor gracias a la caramelización natural.' },
      { name: 'Condimentar con hierbas', description: 'Las hierbas frescas, especias y cítricos dan profundidad de sabor sin necesidad de sal o grasa de más.' },
      { name: 'Cocción al vapor', description: 'Cocer al vapor conserva nutrientes, color y textura de las verduras mucho mejor que el hervido prolongado.' },
    ],
    tips: [
      'Llena la mitad del plato de verduras antes de pensar en el resto: la proporción importa más que la prohibición.',
      'Ten siempre algo saludable listo para comer; la mayoría de las malas decisiones nacen del hambre y la prisa.',
      'Sustituye gradualmente, no de golpe: los cambios pequeños y sostenidos duran más que las dietas extremas.',
    ],
    closing: 'La cocina saludable más exitosa es la que se vuelve costumbre porque, además de hacer bien, sabe rico.',
  },

  Bebidas: {
    eyebrow: 'Informe editorial',
    title: 'Bebidas, el líquido que acompaña la vida',
    lede: 'De las aguas frescas a los cocteles de sobremesa. La cultura del beber, esa parte de la mesa que pocas veces se cuenta.',
    readingTime: '6 min de lectura',
    intro: [
      'Toda mesa tiene un protagonista silencioso que rara vez recibe crédito: la bebida. El agua fresca que refresca la comida, el licuado que abre la mañana, el coctel que alarga la sobremesa. Beber es tan cultural como comer, aunque casi nunca lo contemos con la misma atención.',
      'México tiene una cultura de la bebida riquísima y muy propia. Las aguas frescas de frutas, los atoles, los licuados y los cocteles caseros forman un repertorio que va mucho más allá del refresco industrial.',
    ],
    sections: [
      {
        heading: 'Mucho más que quitar la sed',
        paragraphs: [
          'Desde tiempos antiguos, las bebidas cumplieron funciones que iban más allá de hidratar. El chocolate prehispánico se bebía en ceremonias, el atole alimentaba tanto como reconfortaba, las aguas de frutas aprovechaban la abundancia de la temporada. Beber siempre tuvo un componente ritual y social.',
          'Las aguas frescas mexicanas son un caso ejemplar de ingenio: convierten frutas, semillas y flores en bebidas refrescantes con muy poco. La de jamaica, la de horchata, la de tamarindo son patrimonio líquido de la cultura popular.',
        ],
      },
      {
        heading: 'El equilibrio entre dulce, ácido y frío',
        paragraphs: [
          'Una buena bebida es una cuestión de balance. El punto justo de dulzor, la acidez que despierta el paladar, la temperatura correcta. Una limonada mal calibrada empalaga o raspa; una bien hecha refresca y deja con ganas de más.',
          'Los licuados y batidos suman otra dimensión: la textura. La cremosidad de un buen licuado de fruta con leche, o de una malteada espesa, depende tanto de los ingredientes como de la proporción de hielo y del tiempo de licuado.',
        ],
      },
      {
        heading: 'El brindis, gesto de celebración',
        paragraphs: [
          'La bebida acompaña los momentos importantes. No hay festejo sin algo que servir, sin levantar la copa, sin compartir un trago. El acto de brindar es uno de los rituales sociales más antiguos y universales que existen.',
          'Preparar una bebida para alguien, desde un café hasta un coctel, es una forma de hospitalidad. Es decir, sin palabras, qué bueno que estás aquí, quédate un rato.',
        ],
      },
    ],
    pullQuote: 'Una buena bebida no solo acompaña la comida, completa el momento.',
    curiosities: [
      'La horchata original llegó a México desde España, que a su vez la heredó de la cultura árabe; aquí adoptó el arroz como base.',
      'El agua de jamaica se prepara con los cálices secos de la flor de hibisco y es rica en antioxidantes.',
      'La temperatura percibida del dulzor cambia con el frío: una bebida helada parece menos dulce que la misma a temperatura ambiente.',
    ],
    techniques: [
      { name: 'Almíbar para endulzar', description: 'Disolver el azúcar en agua caliente antes de enfriar la bebida evita los granos en el fondo y reparte el dulzor de forma uniforme.' },
      { name: 'Escarchar el vaso', description: 'Humedecer el borde del vaso y pasarlo por sal, azúcar o chile crea una textura y un sabor que acompañan cada sorbo.' },
      { name: 'Hielo que no diluye', description: 'Usar más hielo y bien frío diluye menos que poco hielo, que se derrite rápido y aguada la bebida.' },
    ],
    tips: [
      'Ajusta siempre el dulzor en frío: el azúcar se percibe distinto a baja temperatura.',
      'Exprime los cítricos al momento; el jugo recién hecho no se compara con el embotellado.',
      'Enfría los vasos antes de servir para que la bebida se mantenga fría más tiempo.',
    ],
    closing: 'Saber preparar una buena bebida es saber recibir, y eso vale tanto como saber cocinar.',
  },

  Postres: {
    eyebrow: 'Informe editorial',
    title: 'Postres, el final feliz de toda comida',
    lede: 'El único platillo que comemos sin necesitarlo, solo por placer. Una historia de azúcar, técnica y pequeñas felicidades.',
    readingTime: '7 min de lectura',
    intro: [
      'El postre es, quizá, la comida más honesta de todas: nadie la necesita para sobrevivir y aún así nadie quiere renunciar a ella. Es puro placer, el broche dulce que cierra la mesa y deja un buen recuerdo del momento. Comer un postre es darse permiso de disfrutar sin más justificación que el gusto.',
      'Detrás de esa aparente frivolidad hay una de las disciplinas más exigentes de la cocina. La repostería es química precisa, paciencia y técnica. Donde un guiso perdona, un postre castiga el descuido.',
    ],
    sections: [
      {
        heading: 'El largo camino del azúcar',
        paragraphs: [
          'Durante siglos el dulce fue un lujo. El azúcar era carísimo y la miel, el principal endulzante, escaseaba. Los postres eran cosa de cortes reales, conventos y ocasiones especiales. Fue la expansión de la caña de azúcar la que democratizó el sabor dulce y lo llevó a todas las mesas.',
          'En México, la repostería floreció en los conventos coloniales, donde las monjas crearon dulces que aún hoy se preparan. La cajeta, los dulces de leche, los postres de frutas en almíbar son herencia de esa tradición conventual que fusionó ingredientes europeos con los del Nuevo Mundo.',
        ],
      },
      {
        heading: 'La cocina más exacta',
        paragraphs: [
          'A diferencia de la cocina salada, donde se cocina al gusto, la repostería exige precisión. Las proporciones de harina, azúcar, grasa y líquido obedecen a un equilibrio químico delicado. Un error en las cantidades no se corrige sobre la marcha: se nota en el resultado final.',
          'Por eso la repostería se parece más a un laboratorio que a una improvisación. La temperatura del horno, el orden de los pasos, el punto del batido: cada detalle altera la textura. Dominarla es dominar la paciencia y el respeto por la medida.',
        ],
      },
      {
        heading: 'El dulce que se queda en la memoria',
        paragraphs: [
          'Pocos sabores se graban tanto como los dulces de la infancia. El pastel de cumpleaños, el postre de la abuela, el helado de las tardes de calor. El azúcar tiene una conexión directa con la memoria emocional y con los recuerdos felices.',
          'Quizá por eso el postre tiene siempre algo de celebración. Aun el más sencillo cierra la comida con una nota de alegría, ese pequeño lujo cotidiano que nos recuerda que comer también es disfrutar.',
        ],
      },
    ],
    pullQuote: 'El postre es la prueba de que comer no es solo necesidad: también es felicidad.',
    curiosities: [
      'Muchos postres mexicanos clásicos nacieron en los conventos coloniales, donde las monjas combinaron técnicas españolas con ingredientes locales.',
      'La repostería se considera la rama más científica de la cocina por su dependencia de proporciones exactas.',
      'El chocolate, hoy esencial en la repostería, era originalmente una bebida amarga y ceremonial en Mesoamérica, sin azúcar.',
    ],
    techniques: [
      { name: 'Punto de batido', description: 'Batir mantequilla con azúcar hasta que blanquee incorpora aire y es la base de muchos pasteles esponjosos. Pasarse o quedarse corto cambia la textura.' },
      { name: 'Temperatura del horno', description: 'Precalentar bien el horno y respetar la temperatura es innegociable: el calor exacto define si el postre sube, cuaja o se hornea parejo.' },
      { name: 'No batir de más la masa', description: 'En masas con harina, mezclar lo justo evita desarrollar gluten y mantiene el resultado tierno en lugar de chicloso.' },
    ],
    tips: [
      'Mide los ingredientes con precisión; en repostería, el cálculo al ojo rara vez funciona.',
      'Saca con tiempo los ingredientes del refrigerador: a temperatura ambiente se integran mucho mejor.',
      'No abras el horno antes de tiempo; el cambio de temperatura puede hundir un pastel a medio hornear.',
    ],
    closing: 'Un buen postre no necesita ser complicado para cerrar la comida con una sonrisa.',
  },
};

export const categoryReports: CategoryReport[] = categories.map((category) => ({
  category,
  slug: generateSlug(category),
  ...reportsByCategory[category],
}));

export function getReportBySlug(slug: string): CategoryReport | undefined {
  return categoryReports.find((report) => report.slug === slug);
}

export function getReportByCategory(category: Category): CategoryReport | undefined {
  return categoryReports.find((report) => report.category === category);
}
