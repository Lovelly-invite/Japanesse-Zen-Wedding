import { motion } from "framer-motion";
import { varianContainer, varianFadeUp } from "./animasi";

/**
 * Goresan kuas horizontal — coretan tinta tunggal ala kanji "ichi" (一).
 * Cocok sebagai pemisah dramatis antar seksi.
 */
function GoresanKuas() {
  return (
    <svg
      viewBox="0 0 600 80"
      className="w-full max-w-[420px] h-auto"
      aria-hidden="true"
    >
      <defs>
        <filter id="brush-horizontal" x="-5%" y="-50%" width="110%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.08" numOctaves="3" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="14" />
        </filter>
      </defs>
      <g filter="url(#brush-horizontal)">
        {/* Goresan utama, menebal di tengah, menipis di ujung */}
        <path
          d="M 40 40 Q 150 30 300 38 T 560 42"
          stroke="#1a1a1a"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 60 42 Q 200 36 300 40 T 540 44"
          stroke="#1a1a1a"
          strokeOpacity="0.55"
          strokeWidth="22"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

export function DoaHarapan() {
  return (
    <section
      className="relative bg-pasir/40 px-6 py-28 md:py-40"
      aria-label="Doa dan harapan"
    >
      <motion.div
        variants={varianContainer}
        initial="tersembunyi"
        whileInView="terlihat"
        viewport={{ once: true, amount: 0.25 }}
        className="kontainer-konten text-center"
      >
        <motion.p variants={varianFadeUp} className="teks-label mb-8">
          Doa & Harapan
        </motion.p>

        <motion.div variants={varianFadeUp} className="flex justify-center mb-12">
          <GoresanKuas />
        </motion.div>

        <motion.blockquote
          variants={varianFadeUp}
          className="font-serif italic text-xl md:text-2xl lg:text-[1.7rem] text-arang leading-relaxed max-w-2xl mx-auto"
        >
          “Dan di antara tanda-tanda kekuasaan-Nya, Dia menciptakan untukmu pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya.”
        </motion.blockquote>

        <motion.p
          variants={varianFadeUp}
          className="mt-8 teks-label text-coklat"
        >
          — Ar-Rum : 21
        </motion.p>

        <motion.div variants={varianFadeUp} className="flex justify-center mt-16">
          <GoresanKuas />
        </motion.div>

        <motion.p
          variants={varianFadeUp}
          className="mt-12 font-serif text-coklat text-base md:text-lg max-w-lg mx-auto leading-relaxed"
        >
          Doa restu dan kehadiran Anda dalam hari yang berbahagia ini
          akan menjadi karunia yang tak ternilai bagi kami.
        </motion.p>
      </motion.div>
    </section>
  );
}
