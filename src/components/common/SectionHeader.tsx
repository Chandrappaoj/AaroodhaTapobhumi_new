interface SectionHeaderProps {
  title: string;
  titleKn?: string;
  subtitle?: string;
  centered?: boolean;
}

export const SectionHeader = ({
  title,
  titleKn,
  subtitle,
  centered = true,
}: SectionHeaderProps) => {
  // Split subtitle by pipe to separate Kannada and English
  const [knSubtitle, enSubtitle] = subtitle && subtitle.includes('|')
    ? subtitle.split('|').map(s => s.trim())
    : [subtitle, ''];

  return (
    <div className={`mb-12 ${centered ? "text-center" : ""} animate-slide-up`}>
      <h2 className="font-kn-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
        {title}
      </h2>
      {titleKn && (
        <p className="font-en-heading text-2xl md:text-3xl font-semibold text-primary/80 mb-4">
          {titleKn}
        </p>
      )}
      {knSubtitle && (
        <p className="font-kn-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-2">
          {knSubtitle}
        </p>
      )}
      {enSubtitle && (
        <p className="font-en-body text-sm text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
          {enSubtitle}
        </p>
      )}
      {subtitle && !subtitle.includes('|') && !knSubtitle && (
        <p className="font-en-body text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6"></div>
    </div>
  );
};
