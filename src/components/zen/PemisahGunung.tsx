/**
 * Pemisah terinspirasi siluet pegunungan — garis tipis, monokrom.
 */
export function PemisahGunung({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px w-16 bg-batu" />
      <svg
        width="60"
        height="14"
        viewBox="0 0 60 14"
        fill="none"
        aria-hidden="true"
        className="text-coklat"
      >
        <path
          d="M2 12 L14 4 L22 9 L32 1 L42 8 L50 4 L58 12"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span className="h-px w-16 bg-batu" />
    </div>
  );
}
