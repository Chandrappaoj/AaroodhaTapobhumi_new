import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatKannadaDate, formatTime } from "@/utils/dateFormatter";

interface EventCardProps {
  title: string;
  titleKn?: string;
  date: string;
  time?: string;
  location?: string;
  description: string;
  featured?: boolean;
}

export const EventCard = ({
  title,
  titleKn,
  date,
  time,
  location,
  description,
  featured = false,
}: EventCardProps) => {
  // Split description and location by pipe to separate Kannada and English
  const [knDesc, enDesc] = description.includes('|')
    ? description.split('|').map(s => s.trim())
    : [description, ''];

  const [knLoc, enLoc] = location && location.includes('|')
    ? location.split('|').map(s => s.trim())
    : [location, ''];

  // Format date to Kannada
  const formattedDate = formatKannadaDate(date);
  const formattedTime = time ? formatTime(time) : '';

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 hover:shadow-card card-hover animate-fade-in text-center ${featured ? "border-primary/30 bg-primary/5" : "bg-card"
        }`}
    >
      <CardHeader className="pb-3">
        {featured && (
          <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 font-en-body">
            ಪ್ರಮುಖ ಕಾರ್ಯಕ್ರಮ | FEATURED EVENT
          </span>
        )}
        {/* Kannada title - PRIMARY (large) */}
        <h3 className="font-kn-subheading text-2xl font-bold text-foreground mb-1">
          {titleKn || title}
        </h3>
        {/* English title - SECONDARY (small) */}
        <p className="font-en-heading text-sm text-primary">
          {title}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Calendar size={16} className="text-primary" />
            <span className="font-kn-body">
              {formattedDate}
              {formattedTime && ` • ${formattedTime}`}
            </span>
          </div>
          {(knLoc || enLoc) && (
            <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                {knLoc && <span className="font-kn-body">{knLoc}</span>}
              </div>
              {enLoc && <span className="font-en-body text-xs">{enLoc}</span>}
            </div>
          )}
        </div>
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
