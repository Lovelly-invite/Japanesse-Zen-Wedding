/**
 * Ensō Minimalis — lingkaran zen sederhana tanpa goresan kuas.
 * Hanya satu garis tipis yang hampir sempurna dengan celah kecil,
 * menghadirkan kesan tenang, bersih, dan abadi.
 */
interface PropsEnso {
  ukuran?: number;
  warna?: string;
  className?: string;
}

export function Enso({
  ukuran = 300,
  warna = "#1a1a1a",
  className = "",
}: PropsEnso) {
  const r = 140; // radius dalam viewBox 320×320
  const keliling = 2 * Math.PI * r; // ≈ 879.65
  const celah = 40; // panjang celah dalam pixel (±4–5 % lingkaran)
  const dasharray = `${keliling - celah} ${celah}`;

  return (
    <svg
      viewBox="0 0 320 320"
      width={ukuran}
      height={ukuran}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <circle
        cx="160"
        cy="160"
        r={r}
        fill="none"
        stroke={warna}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={dasharray}
        strokeDashoffset={-celah / 2}
        opacity="0.85"
      />
    </svg>
  );
}
