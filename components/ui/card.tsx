import { cn } from "@/lib/utils"; // Ensure you have a utility function for class names

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn("border rounded-xl shadow-lg p-4 bg-white", className)}>
      {children}
    </div>
  );
}

interface CardSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardSectionProps) {
  return (
    <div className={cn("pb-2 border-b mb-4 text-lg font-semibold", className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }: CardSectionProps) {
  return <div className={cn("", className)}>{children}</div>;
}

export function CardTitle({ children, className }: CardSectionProps) {
  return <h2 className={cn("text-xl font-bold", className)}>{children}</h2>;
}
