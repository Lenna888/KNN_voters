export interface Question {
  id: number;
  text: string;
  category: string; // Corresponde a la columna del CSV
  type: "scale" | "select" | "text" | "number";
  options?: string[];
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
}

export interface QuestionSlide {
  id: number;
  questions: Question[];
}

export const questionSlides: QuestionSlide[] = [
  // Slide 1: Demografía Básica
  {
    id: 1,
    questions: [
      {
        id: 1,
        text: "¿Cuál es tu edad?",
        category: "age",
        type: "number",
      },
      {
        id: 2,
        text: "¿Cuál es tu género?",
        category: "gender",
        type: "select",
        //Femenino: 0.0 Masculino: 1.0 Otro/Prefiero no decirlo: 2.0
        options: ["Femenino", "Masculino", "Otro/Prefiero no decirlo"],
      },
      {
        id: 3,
        text: "¿Cuál es tu nivel educativo más alto alcanzado?",
        category: "education",
        type: "select",
        //Sin educación formal: 0.0 Primaria: 1.0 Secundaria: 2.0 Técnico: 3.0 Universitario: 4.0 Postgrado: 5.0
        options: [
          "Sin educación formal",
          "Primaria",
          "Secundaria",
          "Técnico",
          "Universitario",
          "Postgrado"
        ],
      },
      {
        id: 4,
        text: "¿Cuál es tu estado civil?",
        category: "marital_status",
        type: "select",
        //Soltero(a): 0.0 Casado(a) / Unión libre: 1.0 Divorciado(a): 2.0 Viudo(a): 3.0 Prefiero no decirlo: 4.0
        options: [
          "Soltero(a)",
          "Casado(a) / Unión libre",
          "Divorciado(a)",
          "Viudo(a)",
          "Prefiero no decirlo"
        ],
      },
    ],
  },
  // Slide 2: Hogar y Entorno
  {
    id: 2,
    questions: [
      {
        id: 5,
        text: "¿Cuántas personas viven en tu hogar (incluyéndote)?",
        category: "household_size",
        type: "number",
      },
      {
        id: 6,
        text: "¿Tienes hijos?",
        category: "has_children",
        type: "select",
        //Sí: 1.0 No: 0.0
        options: ["No","Sí"],
      },
      {
        id: 7,
        text: "¿En qué tipo de zona vives?",
        category: "urbanicity",
        type: "select",
        //Rural: 0.0 Suburbana: 1.0 Urbana: 2.0
        options: ["Rural", "Suburbana", "Urbana"],
      },
      {
        id: 8,
        text: "¿En qué región del país vives?",
        category: "region",
        type: "select",
        //Andina: 0.0 Caribe: 1.0 Pacífica: 2.0 Orinoquía: 3.0 Amazonía: 4.0
        options: ["Región Andina", "Región Caribe", "Región Pacífica", "Región Orinoquía", "Región Amazonía"],
      },
    ],
  },
  // Slide 3: Empleo
  {
    id: 3,
    questions: [
      {
        id: 9,
        text: "¿Cuál es tu situación laboral?",
        category: "employment_status",
        type: "select",
        //Empleado T. Completo: 0.0 Empleado T. Parcial: 1.0 Independiente: 2.0 Desempleado: 3.0 Estudiante: 4.0 Otro: 5.0
        options: [
          "Empleado T. Completo",
          "Empleado T. Parcial",
          "Independiente",
          "Desempleado",
          "Estudiante",
          "Otro"
        ],
      },
      {
        id: 10,
        text: "¿En qué sector trabajas?",
        category: "employment_sector",
        type: "select",
        options: [
          "No aplica",
          "Privado",
          "Público",
          "Agricultura/Ganadería/Educación",
          "Industria/Tecnología/Salud",
          "Otro",
        ],
      },
      {
        id: 11,
        text: "¿Cuántos años llevas en tu trabajo actual? (0 si no aplica)",
        category: "job_tenure_years",
        type: "number",
      },
    ],
  },
  // Slide 4: Situación Económica
  {
    id: 4,
    questions: [
      {
        id: 12,
        text: "¿Cuál es tu rango de ingresos del hogar (mensual)?",
        category: "income_bracket",
        type: "select",
        //Menos de $1.500.000: 0.0 Entre $1.500.000 y $3.000.000: 1.0 Entre $3.000.000 y $5.000.000: 2.0 Entre $5.000.000 y $8.000.000: 3.0 Más de $8.000.000: 4.0
        options: ["Menos de $1.500.000", "Entre $1.500.000 y $3.000.000", "Entre $3.000.000 y $5.000.000", "Entre $5.000.000 y $8.000.000", "Más de $8.000.000"],
      },
      {
        id: 13,
        text: "¿Perteneces a un sindicato?",
        category: "union_member",
        type: "select",
        //Sí: 1.0 No: 0.0
        options: ["No","Sí"],
      },
      {
        id: 14,
        text: "¿Eres empleado(a) del sector público?",
        category: "public_sector",
        type: "select",
        //Sí: 1.0 No: 0.0
        options: ["Sí", "No"],
      },
      {
        id: 15,
        text: "¿Eres dueño(a) de una pequeña empresa?",
        category: "small_biz_owner",
        type: "select",
        //Sí: 1.0 No: 0.0
        options: ["Sí", "No"],
      },
    ],
  },
  // Slide 5: Propiedades y Hábitos de Voto
  {
    id: 5,
    questions: [
      {
        id: 16,
        text: "¿Eres propietario(a) de tu vivienda?",
        category: "home_owner",
        type: "select",
        options: ["Sí", "No"],
      },
      {
        id: 17,
        text: "¿Posees un automóvil?",
        category: "owns_car",
        type: "select",
        options: ["Sí", "No"],
      },
      {
        id: 18,
        text: "¿Votaste en las elecciones pasadas?",
        category: "voted_last",
        type: "select",
        options: ["Sí", "No"],
      },
    ],
  },
  // Slide 6: Opinión y Medios
  {
    id: 6,
    questions: [
      {
        id: 19,
        text: "¿Qué tan fuerte te identificas con un partido político?",
        category: "party_id_strength",
        type: "scale",
        min: 1,
        max: 5,
        minLabel: "Nada",
        maxLabel: "Totalmente",
      },
      {
        id: 20,
        text: "¿Qué tanto confías en los medios de comunicación?",
        category: "trust_media",
        type: "scale",
        min: 1,
        max: 5,
        minLabel: "Nada",
        maxLabel: "Totalmente",
      },
      {
        id: 21,
        text: "Horas promedio al día viendo noticias en TV:",
        category: "tv_news_hours",
        type: "number",
      },
      {
        id: 22,
        text: "Horas promedio al día usando redes sociales:",
        category: "social_media_hours",
        type: "number",
      },
    ],
  },
  // Slide 7: Participación Cívica
  {
    id: 7,
    questions: [
      {
        id: 23,
        text: "¿Con qué frecuencia participas en grupos comunitarios o sociales?",
        category: "wa_groups",
        type: "select",
        options: ["Nunca", "Raramente", "A veces", "Frecuentemente"],
      },
      {
        id: 24,
        text: "¿Con qué frecuencia realizas voluntariado o actividades cívicas?",
        category: "civic_participation",
        type: "select",
        options: ["Nunca", "Anualmente", "Mensualmente", "Semanalmente"],
      },
    ],
  },
];