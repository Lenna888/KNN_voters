import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { questionSlides, Question } from "@/data/questions";
import { ChevronLeft, ChevronRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { mapAnswersForBackend } from "@/survey/survey-mapper";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type AnswerValue = string | number;

export const Survey = () => {
  // Estados
  const [currentSlide, setCurrentSlide] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSummary, setShowSummary] = useState(false); 
  const [backendHealth, setBackendHealth] = useState<boolean | null>(null); 

  const navigate = useNavigate();
  const { toast } = useToast();

  const slide = questionSlides[currentSlide];
  const progress = ((currentSlide + 1) / questionSlides.length) * 100;

  // 1. REQUISITO: Verificar si el BE funciona al cargar
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch("http://localhost:8000/health");
        if (res.ok) setBackendHealth(true);
        else setBackendHealth(false);
      } catch (e) {
        setBackendHealth(false);
      }
    };
    checkHealth();
  }, []);

  // RECUPERAR PROGRESO AL CARGAR
  useEffect(() => {
    const saved = localStorage.getItem("surveyDraft");
    if (saved) {
      try {
        setAnswers(JSON.parse(saved));
        toast({ title: "Progreso restaurado", description: "Hemos recuperado tus respuestas anteriores." });
      } catch (e) { console.error("Error parseando draft", e); }
    }
  }, [toast]);

  // GUARDAR PROGRESO EN CADA CAMBIO
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem("surveyDraft", JSON.stringify(answers));
    }
  }, [answers]);

  const handleChange = (questionId: number, category: string, value: AnswerValue) => {
    setAnswers({ ...answers, [category]: value });
  };

  const handleNext = () => {
    if (currentSlide < questionSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      window.scrollTo(0, 0);
    } else {
      // Al llegar al final, mostrar resumen en lugar de enviar
      setShowSummary(true);
    }
  };

  const handlePrevious = () => {
    if (showSummary) {
      setShowSummary(false); // Volver del resumen a la última pregunta
      return;
    }
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      window.scrollTo(0, 0);
    }
  };

  // 2. REQUISITO: Encuesta Vacía -> Reiniciar
  const handleEmptySurvey = () => {
    toast({
      variant: "destructive",
      title: "Cuestionario Vacío",
      description: "No has respondido ninguna pregunta. Volviendo al inicio.",
    });
    setAnswers({});
    setCurrentSlide(0);
    setShowSummary(false);
  };

  const handleConfirmAndSend = async () => {
    // VALIDACIÓN: ENCUESTA VACÍA
    if (Object.keys(answers).length === 0) {
      toast({ variant: "destructive", title: "Encuesta vacía", description: "Responde al menos una pregunta." });
      setCurrentSlide(0);
      setShowSummary(false);
      return;
    }
    setIsSubmitting(true);
    try {
      const payloadData = mapAnswersForBackend(answers);
      const body = { answers: payloadData }; 

      // ENVÍO ÚNICO AL BACKEND
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Error en el servidor");

      const data = await response.json();

      // LIMPIAR DRAFT Y NAVEGAR CON DATOS
      localStorage.removeItem("surveyDraft");
      
      // Navegamos pasando el resultado directamente
      navigate("/results", { 
        state: { 
          result: data, 
          answers: answers
        } 
      });

    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "No se pudo procesar la encuesta." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Si el backend está caído, bloquear pantalla
  if (backendHealth === false) {
    return (
      <div className="h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Servicio No Disponible</AlertTitle>
          <AlertDescription>
            No es posible conectar con el servidor de análisis. Por favor, asegúrate de que el Backend esté corriendo e intenta más tarde.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // RENDERIZADO: PANTALLA DE RESUMEN
  if (showSummary) {
    const answeredCount = Object.keys(answers).length;
    const totalQuestions = questionSlides.reduce((acc, slide) => acc + slide.questions.length, 0);

    return (
      <div className="min-h-screen bg-slate-50 p-4 flex items-center justify-center">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Resumen de Respuestas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <p className="text-lg text-slate-600">
                Has contestado <span className="font-bold text-primary">{answeredCount}</span> de {totalQuestions} preguntas.
              </p>
              {answeredCount === 0 && (
                <p className="text-red-500 font-medium">⚠️ El cuestionario está vacío.</p>
              )}
              {answeredCount > 0 && answeredCount < totalQuestions && (
                <p className="text-amber-600 font-medium">⚠️ Envío parcial (algunas preguntas sin responder).</p>
              )}
              {answeredCount === totalQuestions && (
                <p className="text-green-600 font-medium flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> Cuestionario completo.
                </p>
              )}
            </div>

            <div className="bg-slate-100 p-4 rounded-lg max-h-60 overflow-y-auto text-sm space-y-2">
              {Object.entries(answers).map(([key, val]) => (
                <div key={key} className="flex justify-between border-b pb-1 last:border-0">
                  <span className="font-medium text-slate-700">{key}:</span>
                  <span className="text-slate-500 truncate max-w-[50%] text-right">{String(val)}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <Button variant="outline" onClick={handlePrevious} className="flex-1">
                Volver y Editar
              </Button>
              <Button 
                onClick={handleConfirmAndSend} 
                className="flex-1 bg-gradient-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : "Confirmar y Enviar"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // RENDERIZADO: ENCUESTA NORMAL
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium text-slate-600">
            <span>Sección {currentSlide + 1} de {questionSlides.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="border-none shadow-xl bg-white/80 backdrop-blur animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardContent className="p-6 md:p-8 space-y-8">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-4">
              Encuesta Política
            </h2>
            
            {slide.questions.map((q: Question) => {
                // Configuración del Slider
                let min = 1; let max = 10; const step = 1;
                let minLabel = "Nada"; let maxLabel = "Totalmente";
                if (q.type === "scale") {
                  min = q.min ?? min; max = q.max ?? max;
                  minLabel = q.minLabel || minLabel; maxLabel = q.maxLabel || maxLabel;
                }
                const stepsArray = Array.from({ length: (max - min) / step + 1 }, (_, i) => min + i * step);

                return (
                  <div key={q.id} className="space-y-3">
                    <label className="block text-sm font-medium text-slate-700">{q.text}</label>
                    
                    {q.type === "select" && (
                      <Select value={answers[q.category]?.toString() || ""} onValueChange={(val) => handleChange(q.id, q.category, val)}>
                        <SelectTrigger className="w-full bg-white"><SelectValue placeholder="Selecciona una opción" /></SelectTrigger>
                        <SelectContent>
                          {q.options?.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    )}

                    {q.type === "scale" && (
                       <div className="space-y-4 pt-2 bg-slate-50/50 p-4 rounded-lg border border-slate-100">
                         <div className="flex justify-between text-xs text-muted-foreground font-semibold uppercase">
                           <span>{minLabel}</span>
                           <span className="text-primary text-base font-bold">{Number(answers[q.category] ?? min)}</span>
                           <span>{maxLabel}</span>
                         </div>
                         <Slider
                           value={[Number(answers[q.category] ?? min)]}
                           onValueChange={(val) => handleChange(q.id, q.category, val[0])}
                           min={min} max={max} step={step}
                           className="py-2"
                         />
                         <div className="flex justify-between text-[10px] text-muted-foreground px-1">
                           {stepsArray.map((n) => <span key={n}>{n}</span>)}
                         </div>
                       </div>
                    )}

                    {(q.type === "text" || q.type === "number") && (
                      <Input
                        type={q.type}
                        placeholder={q.type === "number" ? "0" : "Respuesta..."}
                        value={answers[q.category] || ""}
                        onChange={(e) => handleChange(q.id, q.category, q.type === "number" ? Number(e.target.value) : e.target.value)}
                      />
                    )}
                  </div>
                );
            })}

            <div className="flex justify-between items-center gap-4 pt-6 border-t">
              <Button variant="outline" onClick={handlePrevious} disabled={currentSlide === 0}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
              </Button>
              <Button onClick={handleNext} className="bg-gradient-primary min-w-[140px]">
                {currentSlide === questionSlides.length - 1 ? "Revisar" : "Siguiente"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};