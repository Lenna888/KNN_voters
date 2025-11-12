
import { questionSlides, Question } from "@/data/questions";

//Aplanar todas las preguntas para buscarlas fácilmente
const allQuestions: Question[] = questionSlides.flatMap(slide => slide.questions);

//Crear un "mapa" para buscar preguntas por 'category'
const questionMap = new Map<string, Question>();
allQuestions.forEach(q => {
  questionMap.set(q.category, q);
});

//Definir el tipo para las respuestas "crudas" (localStorage)
export type RawSurveyAnswers = Record<string, string | number>;

/**
 * Transforma el JSON crudo de la encuesta (con strings) 
 * en un JSON numérico listo para el modelo KNN.
 * @param answers - El objeto de respuestas crudas (ej: {age: 30, gender: "Femenino"})
 * @returns Un objeto plano (ej: {age: 30, gender: 0})
 */
export function mapAnswersForBackend(answers: RawSurveyAnswers): Record<string, number> {
  
  const backendJson: Record<string, number> = {};

  // Itera sobre las llaves del objeto de respuestas (ej: "age", "gender", ...)
  for (const category in answers) {
    
    // Busca la pregunta correspondiente a esa categoría
    const question = questionMap.get(category);
    if (!question) {
      continue; // No se encontró la pregunta, o es una llave extraña
    }

    const rawAnswer = answers[category];

    // Mapeo basado en el tipo de pregunta
    switch (question.type) {
      case "number":
      case "scale":
        // El valor ya es numérico, solo nos aseguramos
        backendJson[category] = Number(rawAnswer); 
        break;

      case "select":
        // ¡Esta es la magia!
        // Busca el índice de la opción seleccionada.
        if (question.options) {
          const numericalValue = question.options.indexOf(rawAnswer as string);
          backendJson[category] = numericalValue;
        } else {
          backendJson[category] = -1; // Opción no encontrada (raro)
        }
        break;
      
      case "text":
        // Los modelos KNN no pueden manejar texto. Ignoramos este tipo.
        break;
    }
  }

  return backendJson;
}