export function PageHeader({
  title,
  context,
}: {
  title?: string;
  context?: string;
}) {
  if (!title && !context) return null;

  return (
    <div className="mb-4">
      {title ? (
        <h2 className="text-lg font-semibold text-brand-navy">{title}</h2>
      ) : null}
      {context ? (
        <p className="font-mono text-xs text-muted-foreground">{context}</p>
      ) : null}
    </div>
  );
}
