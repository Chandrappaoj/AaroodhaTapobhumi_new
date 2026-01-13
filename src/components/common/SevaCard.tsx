import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface SevaCardProps {
  icon: ReactNode;
  title: string;
  titleKn?: string;
  description: string;
}

export const SevaCard = ({ icon, title, titleKn, description }: SevaCardProps) => {
  // Split description by pipe to separate Kannada and English
  const [knDesc, enDesc] = description.includes('|')
    ? description.split('|').map(s => s.trim())
    : [description, ''];

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-card hover:border-primary/30 bg-card card-hover animate-scale-in text-center">
      <CardHeader className="pb-2">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 mx-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
          {icon}
        </div>
        {titleKn && (
          <h3 className="font-kn-subheading text-xl font-semibold text-foreground mb-1">
            {titleKn}
          </h3>
        )}
        <p className="font-en-body text-sm text-primary/70">{title}</p>
      </CardHeader>
      <CardContent>
        {knDesc && (
          <p className="font-kn-body text-sm text-foreground leading-relaxed mb-2">
            {knDesc}
          </p>
        )}
        {enDesc && (
          <p className="font-en-body text-xs text-muted-foreground leading-relaxed">
            {enDesc}
          </p>
        )}
        {!description.includes('|') && (
          <p className="font-en-body text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
