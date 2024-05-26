import { cn } from "@module/shared/ui";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section
      className={cn("relative isolate overflow-hidden px-6 pt-14 lg:px-8", className)}
      {...props}>
      {children}
    </section>
  );
}
