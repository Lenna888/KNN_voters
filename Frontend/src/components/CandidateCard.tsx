import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Candidate } from "@/data/candidates";

interface CandidateCardProps {
  candidate: Candidate;
}

export const CandidateCard = ({ candidate }: CandidateCardProps) => {
  return (
    <Card className="hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: candidate.color }}
          />
          <Badge variant="secondary">{candidate.party}</Badge>
        </div>
        <CardTitle className="text-2xl">{candidate.name}</CardTitle>
        <CardDescription className="text-base italic">
          "{candidate.slogan}"
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{candidate.description}</p>
      </CardContent>
    </Card>
  );
};
