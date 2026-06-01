import { motion } from "framer-motion";
import { useState } from "react";
import { varianContainer, varianFadeUp } from "./animasi";
// 🔧 Daftar rekening bank diatur di src/config/undangan.ts
import { REKENING } from "@/config/undangan";

interface Rekening {
  bank: string;
  nomor: string;
  atasNama: string;
}

const daftarRekening: Rekening[] = REKENING;


function BarisRekening({ data }: { data: Rekening }) {
  const [tersalin, setTersalin] = useState(false);

  const salin = async () => {
    try {
      await navigator.clipboard.writeText(data.nomor);
      setTersalin(true);
      setTimeout(() => setTersalin(false), 1800);
    } catch {
      // diam
    }
  };

  return (
    <div className="border border-batu p-6">
      <p className="teks-label mb-3">{data.bank}</p>
      <p className="font-serif text-2xl text-arang tracking-wider mb-1">{data.nomor}</p>
      <p className="text-sm text-coklat mb-5">a.n. {data.atasNama}</p>
      <button
        type="button"
        onClick={salin}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-coklat hover:text-arang transition-colors duration-500"
      >
        {tersalin ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 12 L10 18 L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Tersalin
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="8" y="8" width="12" height="12" stroke="currentColor" strokeWidth="1.5" />
              <path d="M4 16 V4 H16" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            Salin Nomor
          </>
        )}
      </button>
    </div>
  );
}

export function AmplopDigital() {
  return (
    <section className="px-6 py-24 md:py-32" aria-label="Amplop digital">
      <motion.div
        variants={varianContainer}
        initial="tersembunyi"
        whileInView="terlihat"
        viewport={{ once: true, amount: 0.15 }}
        className="kontainer-konten max-w-xl mx-auto"
      >
        <motion.div variants={varianFadeUp} className="text-center mb-12">
          <p className="teks-label mb-4">Amplop Digital</p>
          <h2 className="teks-h2 text-arang">Hadiah Pernikahan</h2>
          <p className="mt-4 text-coklat font-serif italic max-w-md mx-auto">
            Kehadiran Anda adalah hadiah utama. Jika Anda ingin memberi tanda kasih, kami menerima dengan tulus.
          </p>
        </motion.div>

        <motion.div variants={varianFadeUp} className="grid sm:grid-cols-2 gap-4">
          {daftarRekening.map((r) => (
            <BarisRekening key={r.bank} data={r} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
