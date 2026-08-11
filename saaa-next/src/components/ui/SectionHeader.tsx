type SectionHeaderProps = {
  tag?: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
};

export function SectionHeader({ tag, title, description, className }: SectionHeaderProps) {
  return (
    <div className={["section-header", className].filter(Boolean).join(" ")}>
      {tag ? <div className="section-tag">{tag}</div> : null}
      <h2 className="section-title">{title}</h2>
      {description ? <p className="section-desc">{description}</p> : null}
    </div>
  );
}
