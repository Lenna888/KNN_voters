import { Button } from "@/components/ui/button";
import { CandidateCard } from "@/components/CandidateCard";
import { candidates } from "@/data/candidates";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";

const Candidates = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={() => navigate("/")}>
            <Home className="mr-2 h-4 w-4" />
            Inicio
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Conoce a los Candidatos
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Estos son los 10 candidatos que participan en la elección. Conoce sus propuestas
            y luego realiza la encuesta para descubrir cuál es más afín a ti.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/survey")}
            className="bg-gradient-primary shadow-elevated"
          >
            Ir a la encuesta
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Candidates;
