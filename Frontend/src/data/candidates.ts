export interface Candidate {
  id: number;
  name: string;
  party: string;
  slogan: string;
  description: string;
  color: string;
  values: {
    economia: number;
    educacion: number;
    salud: number;
    seguridad: number;
    medioAmbiente: number;
    tecnologia: number;
    empleo: number;
    vivienda: number;
    cultura: number;
    transporte: number;
  };
}

export const candidates: Candidate[] = [
  {
    id: 1,
    name: "Boreal",
    party: "Partido Innovación Verde",
    slogan: "El futuro es hoy. Innovación y sostenibilidad.",
    description: "Enfocado en economía digital, innovación tecnológica y energías limpias.",
    color: "hsl(180, 70%, 40%)", // Teal
    values: {
      economia: 7,
      educacion: 9,
      salud: 7,
      seguridad: 5,
      medioAmbiente: 10,
      tecnologia: 10,
      empleo: 8,
      vivienda: 6,
      cultura: 7,
      transporte: 8,
    },
  },
  {
    id: 2,
    name: "Civico",
    party: "Alianza por el Orden",
    slogan: "Seguridad, Orden y Tradición.",
    description: "Prioriza la seguridad pública, el orden y la defensa de los valores tradicionales.",
    color: "hsl(0, 70%, 50%)", // Red
    values: {
      economia: 8,
      educacion: 6,
      salud: 7,
      seguridad: 10,
      medioAmbiente: 4,
      tecnologia: 5,
      empleo: 7,
      vivienda: 7,
      cultura: 6,
      transporte: 6,
    },
  },
  {
    id: 3,
    name: "Frontera",
    party: "Partido Liberal de Mercado",
    slogan: "Menos impuestos, más prosperidad.",
    description: "Propone el libre mercado, la disciplina fiscal y una significativa reducción de impuestos.",
    color: "hsl(45, 93%, 47%)", // Yellow/Gold
    values: {
      economia: 10,
      educacion: 7,
      salud: 6,
      seguridad: 7,
      medioAmbiente: 5,
      tecnologia: 7,
      empleo: 9,
      vivienda: 7,
      cultura: 5,
      transporte: 6,
    },
  },
  {
    id: 4,
    name: "Halley",
    party: "Frente de Justicia Social",
    slogan: "Igualdad y bienestar para las familias.",
    description: "Lucha por la justicia social, la igualdad de género y el aumento al salario mínimo.",
    color: "hsl(340, 75%, 55%)", // Pink/Magenta
    values: {
      economia: 6,
      educacion: 8,
      salud: 10,
      seguridad: 6,
      medioAmbiente: 7,
      tecnologia: 6,
      empleo: 8,
      vivienda: 9,
      cultura: 7,
      transporte: 7,
    },
  },
  {
    id: 5,
    name: "Icaro",
    party: "Movimiento Obrero Nacional",
    slogan: "Protegiendo nuestro trabajo.",
    description: "Propone un fuerte proteccionismo del empleo local y la industria nacional.",
    color: "hsl(30, 80%, 50%)", // Orange
    values: {
      economia: 7,
      educacion: 5,
      salud: 6,
      seguridad: 8,
      medioAmbiente: 3,
      tecnologia: 4,
      empleo: 10,
      vivienda: 8,
      cultura: 5,
      transporte: 6,
    },
  },
  {
    id: 6,
    name: "Azon",
    party: "Centro Moderado",
    slogan: "Estabilidad y crecimiento predecible.",
    description: "Busca el balance, la estabilidad económica y la modernización de la infraestructura pública.",
    color: "hsl(270, 60%, 50%)", // Purple
    values: {
      economia: 8,
      educacion: 7,
      salud: 7,
      seguridad: 7,
      medioAmbiente: 6,
      tecnologia: 7,
      empleo: 7,
      vivienda: 7,
      cultura: 6,
      transporte: 8,
    },
  },
  {
    id: 7,
    name: "Demetra",
    party: "Unión Agraria Regional",
    slogan: "Descentralizar para crecer. ¡Primero el campo!",
    description: "Defensora de las regiones y el sector agrícola. Propone la descentralización económica.",
    color: "hsl(120, 40%, 40%)", // Dark Green
    values: {
      economia: 7,
      educacion: 6,
      salud: 7,
      seguridad: 8,
      medioAmbiente: 8,
      tecnologia: 5,
      empleo: 8,
      vivienda: 7,
      cultura: 6,
      transporte: 6,
    },
  },
  {
    id: 8,
    name: "Electra",
    party: "Movimiento Cultural y Educativo",
    slogan: "Una revolución educativa y cultural.",
    description: "Propone una alta inversión en ciencia, cultura y educación superior.",
    color: "hsl(200, 70%, 45%)", // Bright Blue
    values: {
      economia: 6,
      educacion: 10,
      salud: 7,
      seguridad: 6,
      medioAmbiente: 7,
      tecnologia: 9,
      empleo: 7,
      vivienda: 6,
      cultura: 10,
      transporte: 6,
    },
  },
  {
    id: 9,
    name: "Gaia",
    party: "Partido Verde Liberal",
    slogan: "Economía verde y sostenible.",
    description: "Combina la protección ambiental con incentivos de mercado para empresas sostenibles.",
    color: "hsl(164, 76%, 46%)", // Green
    values: {
      economia: 8,
      educacion: 8,
      salud: 7,
      seguridad: 6,
      medioAmbiente: 10,
      tecnologia: 8,
      empleo: 7,
      vivienda: 7,
      cultura: 7,
      transporte: 9,
    },
  },
  {
    id: 10,
    name: "Jade",
    party: "Acción Comunitaria",
    slogan: "Fortaleciendo nuestras comunidades.",
    description: "Enfoque en servicios comunitarios, fortalecimiento de la salud pública y la educación básica.",
    color: "hsl(217, 91%, 35%)", // Blue
    values: {
      economia: 6,
      educacion: 9,
      salud: 9,
      seguridad: 7,
      medioAmbiente: 7,
      tecnologia: 6,
      empleo: 7,
      vivienda: 8,
      cultura: 8,
      transporte: 7,
    },
  },
];