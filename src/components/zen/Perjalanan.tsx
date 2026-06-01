import { motion } from "framer-motion";
import { varianContainer, varianFadeUp } from "./animasi";
// 🔧 Linimasa perjalanan diatur di src/config/undangan.ts
import { PERJALANAN } from "@/config/undangan";

interface MomenPerjalanan {
  tanggal: string;
  judul: string;
  deskripsi: string;
}

const perjalanan: MomenPerjalanan[] = PERJALANAN;


export function Perjalanan() {
  return (
    <section className="bg-pasir/40 px-6 py-24 md:py-32" aria-label="Perjalanan bersama">
      <motion.div
        variants={varianContainer}
        initial="tersembunyi"
        whileInView="terlihat"
        viewport={{ once: true, amount: 0.1 }}
        className="kontainer-konten"
      >
        <motion.div variants={varianFadeUp} className="text-center mb-20">
          <p className="teks-label mb-4">Linimasa</p>
          <h2 className="teks-h2 text-arang">Perjalanan Kami</h2>
        </motion.div>

        <div className="relative">
          {/* Garis vertikal */}
          <div className="absolute left-3 md:left-1/2 top-2 bottom-2 w-px bg-batu -translate-x-px" aria-hidden="true" />

          <ul className="space-y-16">
            {perjalanan.map((momen, i) => {
              const kiri = i % 2 === 0;
              return (
                <motion.li
                  key={momen.judul}
                  variants={varianFadeUp}
                  className="relative grid md:grid-cols-2 gap-6 md:gap-12 items-start"
                >
                  {/* Titik di garis */}
                  <span
                    className="absolute left-3 md:left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-coklat"
                    aria-hidden="true"
                  />

                  <div className={kiri ? "md:text-right md:pr-12 pl-10 md:pl-0" : "md:col-start-2 md:pl-12 pl-10"}>
                    <p className="font-serif italic text-coklat mb-1">{momen.tanggal}</p>
                    <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-arang mb-3">
                      {momen.judul}
                    </h3>
                    <p className="text-coklat leading-relaxed max-w-sm md:inline-block">
                      {momen.deskripsi}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
