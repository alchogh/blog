import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib";

type ContainerSize = "prose" | "default" | "wide";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}

const sizeClass: Record<ContainerSize, string> = {
  prose: "max-w-[640px]",
  default: "max-w-[720px]",
  wide: "max-w-[960px]",
};

export function Container({
  size = "default",
  className,
  ...rest
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-5", sizeClass[size], className)}
      {...rest}
    />
  );
}
