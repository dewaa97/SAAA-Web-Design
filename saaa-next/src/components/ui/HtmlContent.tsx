type HtmlContentProps = {
  html: string;
  className?: string;
};

export function HtmlContent({ html, className }: HtmlContentProps) {
  return (
    <div
      className={className ?? "article-body"}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
