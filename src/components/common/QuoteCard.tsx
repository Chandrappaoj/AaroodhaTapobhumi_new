import { Quote } from "lucide-react";

interface QuoteCardProps {
  quote: string;
  quoteKn?: string;
  author?: string;
  authorKn?: string;
}

export const QuoteCard = ({ quote, quoteKn, author, authorKn }: QuoteCardProps) => {
  return (
    <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 md:p-10">
      <Quote
        size={48}
        className="absolute top-4 left-4 text-primary/20 rotate-180"
      />
      <blockquote className="relative z-10">
        {quoteKn && (
          <p className="font-kn-body text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed italic mb-3">
            "{quoteKn}"
          </p>
        )}
        <p className="font-en-body text-lg md:text-xl text-muted-foreground leading-relaxed italic">
          "{quote}"
        </p>
        {(authorKn || author) && (
          <footer className="mt-6 text-sm font-semibold text-primary space-y-1">
            {authorKn && <div className="font-kn-body text-base">— {authorKn}</div>}
            {author && <div className="font-en-body text-sm text-primary/70">— {author}</div>}
          </footer>
        )}
      </blockquote>
    </div>
  );
};
