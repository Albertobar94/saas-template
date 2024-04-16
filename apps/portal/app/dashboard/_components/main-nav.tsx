import Link from "next/link";
import { cn } from "@repo/common";

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link
        className="hover:text-primary text-sm font-medium transition-colors"
        href="/examples/dashboard">
        Overview
      </Link>
      <Link
        className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
        href="/examples/dashboard">
        Customers
      </Link>
      <Link
        className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
        href="/examples/dashboard">
        Products
      </Link>
      <Link
        className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
        href="/examples/dashboard">
        Settings
      </Link>
    </nav>
  );
}