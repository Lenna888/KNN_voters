import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
// Asumimos que "questionSlides" y la "interface Question" están en este archivo
import { questionSlides, Question } from "@/data/questions"; 
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export const Survey = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const navigate = useNavigate();

  const slide = questionSlides[currentSlide];
  const progress = ((currentSlide + 1) / questionSlides.length) * 100;

  const handleChange = (questionId: number, category: string, value: any) => {
    setAnswers({ ...answers, [category]: value });
  };

  const handleNext = () => {
    if (currentSlide < questionSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      localStorage.setItem("surveyAnswers", JSON.stringify(answers));
      navigate("/results");
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleReset = () => {
    setCurrentSlide(0);
    setAnswers({});
    localStorage.removeItem("surveyAnswers");
    navigate("/");
  };

  const isSlideComplete = slide.questions.every((q) => answers[q.category] !== undefined && answers[q.category] !== "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Sección {currentSlide + 1} de {questionSlides.length}
          </p>
        </div>

        <Card className="shadow-elevated animate-slide-in">
          <CardContent className="pt-12 pb-8 px-8">
            <div className="space-y-10 mb-10">
              {/* Añadimos "(q: Question)" para asegurar que TS conozca el tipo */}
              {slide.questions.map((q: Question) => {
                
                // --- INICIO DE LA LÓGICA DINÁMICA ---
                // 1. Definir valores por defecto para el slider
                let min = 1;
                let max = 10;
                const step = 1;
                let minLabel = "Nada importante";
                let maxLabel = "Muy importante";

                // 2. Si la pregunta es 'scale', sobrescribir los defaults
                if (q.type === "scale") {
                  min = q.min ?? min; // Usa q.min si existe, si no, usa el default (1)
                  max = q.max ?? max; // Usa q.max si existe, si no, usa el default (10)
                  minLabel = q.minLabel || minLabel; // Usa q.minLabel si existe, si no, usa el default
                  maxLabel = q.maxLabel || maxLabel; // Usa q.maxLabel si existe, si no, usa el default
                }
                
                // 3. Crear el array de números para el pie del slider
                const stepsArray = Array.from({ length: (max - min) / step + 1 }, (_, i) => min + i * step);
                // --- FIN DE LA LÓGICA DINÁMICA ---

                return (
                  <div key={q.id} className="space-y-4">
                    <h3 className="text-2xl font-bold">{q.text}</h3>

                    {q.type === "scale" && (
                      <div className="space-y-4 pt-4">
                        <div className="flex justify-between text-sm text-muted-foreground px-1">
                          {/* ETIQUETA DINÁMICA */}
                          <span>{minLabel}</span>
                          
                          <span className="font-semibold text-primary text-lg">
                            {/* VALOR DINÁMICO (inicia en 'min') */}
                            {answers[q.category] ?? min}
                          </span>
                          
                          {/* ETIQUETA DINÁMICA */}
                          <span>{maxLabel}</span>
                        </div>
                        <Slider
                          // VALOR DINÁMICO (inicia en 'min')
                          value={[answers[q.category] ?? min]}
                          onValueChange={(val) => handleChange(q.id, q.category, val[0])}
                          
                          // RANGO DINÁMICO
                          min={min}
                          max={max}
                          step={step}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          {/* NÚMEROS DINÁMICOS */}
                          {stepsArray.map((n) => (
                            <span key={n} className="w-6 text-center">{n}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {q.type === "select" && (
                      <Select
                        onValueChange={(val) => handleChange(q.id, q.category, val)}
                        value={answers[q.category] || ""}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona una opción" />
                        </SelectTrigger>
                        <SelectContent>
                          {q.options?.map((opt, i) => (
                            <SelectItem key={i} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    {q.type === "text" && (
                      <Input
                        type="text"
                        placeholder="Escribe tu respuesta"
                        value={answers[q.category] || ""}
                        onChange={(e) => handleChange(q.id, q.category, e.target.value)}
                      />
                    )}

                    {q.type === "number" && (
                      <Input
                        type="number"
                        placeholder="Escribe un número"
                        value={answers[q.category] || ""}
                        onChange={(e) => handleChange(q.id, q.category, Number(e.target.value))}
                      />
                    )}
                  </div>
                )
              })}
            </div>

            <div className="flex justify-between items-center gap-4 pt-6 border-t">
              <Button variant="outline" onClick={handlePrevious} disabled={currentSlide === 0}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>

              <Button
                onClick={handleNext}
                className="bg-gradient-primary"
              >
                {currentSlide === questionSlides.length - 1 ? "Finalizar" : "Siguiente"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>

              <Button variant="outline" onClick={handleReset}>
                Ir a inicio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};