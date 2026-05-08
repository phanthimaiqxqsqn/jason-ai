import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("glass panel-gradient rounded-2xl p-4 shadow-cinematic md:p-5", className)}
      {...props}
    />
  );
}
