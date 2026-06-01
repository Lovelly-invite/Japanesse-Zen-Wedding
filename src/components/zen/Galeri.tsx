import { motion } from "framer-motion";
import { useState } from "react";
import { varianContainer, varianFadeUp } from "./animasi";
// 🔧 Ganti foto galeri di src/config/undangan.ts (taruh file di public/foto/)
import { GALERI } from "@/config/undangan";

// Foto bergaya film — desaturasi & grain via CSS filter
const foto = GALERI;


export function Galeri() {
  const [terbuka, setTerbuka] = useState<number | null>(null);

  return (
    <section className="px-6 py-24 md:py-32" aria-label="Galeri foto">
      <motion.div
        variants={varianContainer}
        initial="tersembunyi"
        whileInView="terlihat"
        viewport={{ once: true, amount: 0.1 }}
        className="kontainer-konten"
      >
        <motion.div variants={varianFadeUp} className="text-center mb-16">
          <p className="teks-label mb-4">Galeri</p>
          <h2 className="teks-h2 text-arang">Sepenggal Cerita</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {foto.map((f, i) => (
            <motion.button
              type="button"
              key={f.src}
              variants={varianFadeUp}
              onClick={() => setTerbuka(i)}
              className={`${f.ratio} overflow-hidden bg-pasir group focus:outline-none focus-visible:ring-1 focus-visible:ring-coklat`}
              aria-label={`Buka foto: ${f.alt}`}
            >
              <img
                src={f.src}
                alt={f.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                style={{ filter: "grayscale(0.35) contrast(0.95) brightness(0.98)" }}
              />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Lightbox minimal */}
      {terbuka !== null && (
        <button
          type="button"
          onClick={() => setTerbuka(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-arang/90 p-6 cursor-zoom-out"
          aria-label="Tutup foto"
        >
          <img
            src={foto[terbuka].src}
            alt={foto[terbuka].alt}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            style={{ filter: "grayscale(0.2)" }}
          />
        </button>
      )}
    </section>
  );
}
