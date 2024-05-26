import { cn } from "@module/shared/ui";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Box({ children, className, ...props }: ContainerProps) {
  return (
    <div className={cn("mx-auto", className)} {...props}>
      {children}
    </div>
  );
}
