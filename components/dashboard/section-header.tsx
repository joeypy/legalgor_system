export function SectionHeader({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {meta && <p className="mt-0.5 text-sm text-muted-foreground">{meta}</p>}
      </div>
      {children}
    </div>
  );
}
