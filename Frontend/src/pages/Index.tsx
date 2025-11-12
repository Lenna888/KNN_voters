import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Vote, Users, BarChart3, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-gradient-primary shadow-elevated">
              <Vote className="h-16 w-16 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Descubre tu Candidato Ideal
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Conoce a los 10 candidatos y descubre cuál está más alineado con tus valores 
            a través de nuestra encuesta interactiva
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Button 
              size="lg" 
              onClick={() => navigate("/candidates")}
              className="text-lg px-8 py-6 bg-gradient-primary shadow-elevated hover:shadow-card transition-all"
            >
              <Users className="mr-2 h-5 w-5" />
              Ver Candidatos
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/survey")}
              className="text-lg px-8 py-6 hover:bg-accent hover:text-accent-foreground transition-all"
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              Comenzar Encuesta
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="p-8 rounded-xl bg-card shadow-card hover:shadow-elevated transition-all">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 mx-auto">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">10 Candidatos</h3>
              <p className="text-muted-foreground">
                Conoce los perfiles completos de todos los candidatos y sus propuestas
              </p>
            </div>

            <div className="p-8 rounded-xl bg-card shadow-card hover:shadow-elevated transition-all">
              <div className="w-12 h-12 rounded-lg bg-gradient-secondary flex items-center justify-center mb-4 mx-auto">
                <BarChart3 className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Encuesta Interactiva</h3>
              <p className="text-muted-foreground">
                10 preguntas diseñadas para conocer tus valores y preferencias políticas
              </p>
            </div>

            <div className="p-8 rounded-xl bg-card shadow-card hover:shadow-elevated transition-all">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 mx-auto">
                <Vote className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Resultados Personalizados</h3>
              <p className="text-muted-foreground">
                Descubre qué candidato está más alineado con tus respuestas
              </p>
            </div>
          </div>

          <div className="mt-16 p-8 rounded-xl bg-gradient-hero text-primary-foreground shadow-elevated">
            <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
            <p className="text-lg mb-6 opacity-90">
              Primero conoce a los candidatos o ve directo a la encuesta
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate("/candidates")}
              className="bg-background text-foreground hover:bg-background/90"
            >
              Comenzar ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
