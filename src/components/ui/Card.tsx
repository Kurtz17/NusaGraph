import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  interactive?: boolean;
};

export function Card({ children, className, interactive, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-sm",
        interactive &&
          "transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
