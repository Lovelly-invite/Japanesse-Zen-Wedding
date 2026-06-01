import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Enso } from "./Enso";
import { varianContainer, varianFadeUp } from "./animasi";
// 🔧 Semua teks (nama, tanggal, quote) diatur di src/config/undangan.ts
import { PASANGAN, ACARA, QUOTE_SAMPUL } from "@/config/undangan";

const TANGGAL_PERNIKAHAN = new Date(ACARA.tanggalISO);

function hitungSisaHari(): number {
  const sekarang = new Date();
  const selisih = TANGGAL_PERNIKAHAN.getTime() - sekarang.getTime();
  return Math.max(0, Math.ceil(selisih / (1000 * 60 * 60 * 24)));
}

export function SampulPembuka() {
  const [sisaHari, setSisaHari] = useState<number | null>(null);

  // Hitung di klien untuk menghindari mismatch SSR
  useEffect(() => {
    setSisaHari(hitungSisaHari());
  }, []);

  const gulirKeBawah = () => {
    document.getElementById("pasangan")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-20 sm:py-24"
      aria-label="Sampul pembuka undangan"
    >
      {/* Ensō kuas tinta — dramatis, besar, di belakang tipografi */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.12]">
        <Enso
          ukuran={900}
          className="w-[min(115vw,900px)] h-auto -translate-y-4"
        />
      </div>


      <motion.div
        variants={varianContainer}
        initial="tersembunyi"
        animate="terlihat"
        className="relative z-10 flex flex-col items-center text-center max-w-full"
      >
        <motion.p variants={varianFadeUp} className="teks-label mb-8 sm:mb-10">
          Undangan Pernikahan
        </motion.p>

        <motion.h1 variants={varianFadeUp} className="teks-display text-arang">
          <span className="block sm:inline">{PASANGAN.namaSingkatWanita}</span>
          <span className="mx-3 sm:mx-4 font-serif italic text-coklat">&</span>
          <span className="block sm:inline">{PASANGAN.namaSingkatPria}</span>
        </motion.h1>

        <motion.div variants={varianFadeUp} className="mt-10 sm:mt-12 flex items-center gap-3 sm:gap-6 max-w-full">
          <span className="h-px w-8 sm:w-12 bg-batu" />
          <p className="teks-label whitespace-nowrap text-[0.7rem] sm:text-sm">{ACARA.tanggalTampilan}</p>
          <span className="h-px w-8 sm:w-12 bg-batu" />
        </motion.div>

        <motion.p
          variants={varianFadeUp}
          className="mt-14 sm:mt-16 max-w-md font-serif italic text-base sm:text-lg text-coklat px-4"
        >
          “{QUOTE_SAMPUL}”
        </motion.p>


        {sisaHari !== null && sisaHari > 0 && (
          <motion.p variants={varianFadeUp} className="mt-10 sm:mt-12 teks-label text-[0.7rem] sm:text-sm">
            {sisaHari} hari menuju hari bahagia
          </motion.p>
        )}
      </motion.div>


      {/* Indikator gulir */}
      <motion.button
        type="button"
        onClick={gulirKeBawah}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-coklat transition-colors hover:text-arang"
        aria-label="Gulir ke bawah"
      >
        <svg width="14" height="36" viewBox="0 0 14 36" fill="none" aria-hidden="true">
          <path d="M7 1 L7 30 M2 25 L7 30 L12 25" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </motion.button>
    </section>
  );
}
