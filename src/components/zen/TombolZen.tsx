import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Tombol Zen — minimalis, border tipis, tanpa shadow.
 * Filosofi: lebih sedikit adalah lebih.
 */
type VarianTombol = "primer" | "sekunder" | "ghost";

interface PropsTombolZen extends ButtonHTMLAttributes<HTMLButtonElement> {
  varian?: VarianTombol;
}

const kelasVarian: Record<VarianTombol, string> = {
  primer:
    "bg-arang text-gading border border-arang hover:bg-transparent hover:text-arang",
  sekunder:
    "bg-transparent text-arang border border-batu hover:bg-pasir",
  ghost:
    "bg-transparent text-coklat border border-transparent hover:text-arang",
};

export const TombolZen = forwardRef<HTMLButtonElement, PropsTombolZen>(
  ({ varian = "sekunder", className, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        {...rest}
        className={cn(
          "inline-flex items-center justify-center gap-2",
          "px-7 py-3 text-xs font-medium uppercase",
          "transition-colors duration-500 ease-out",
          "tracking-[0.25em]",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-coklat focus-visible:ring-offset-2 focus-visible:ring-offset-gading",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          kelasVarian[varian],
          className,
        )}
      >
        {children}
      </button>
    );
  },
);

TombolZen.displayName = "TombolZen";
