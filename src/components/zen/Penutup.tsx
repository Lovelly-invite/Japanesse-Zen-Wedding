import { motion } from "framer-motion";
import { Enso } from "./Enso";
import { varianContainer, varianFadeUp } from "./animasi";
// 🔧 Nama mempelai diatur di src/config/undangan.ts
import { PASANGAN } from "@/config/undangan";


export function Penutup() {
  return (
    <section className="px-6 py-32 md:py-40" aria-label="Pesan penutup">
      <motion.div
        variants={varianContainer}
        initial="tersembunyi"
        whileInView="terlihat"
        viewport={{ once: true, amount: 0.3 }}
        className="kontainer-konten text-center"
      >
        <motion.div variants={varianFadeUp} className="flex justify-center mb-12">
          <Enso ukuran={140} />
        </motion.div>

        <motion.p
          variants={varianFadeUp}
          className="font-serif italic text-xl md:text-2xl text-coklat leading-relaxed max-w-xl mx-auto mb-16"
        >
          “Dengan segala rasa syukur dan kegembiraan, kami mengundang Anda untuk menjadi bagian dari hari yang paling istimewa dalam hidup kami.”
        </motion.p>

        <motion.p variants={varianFadeUp} className="teks-label mb-6">
          Hormat kami
        </motion.p>

        <motion.h2 variants={varianFadeUp} className="teks-display text-arang">
          {PASANGAN.namaSingkatWanita}
          <span className="mx-3 italic text-coklat">&</span>
          {PASANGAN.namaSingkatPria}
        </motion.h2>

      </motion.div>
    </section>
  );
}
