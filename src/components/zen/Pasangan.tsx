import { motion } from "framer-motion";
import { varianContainer, varianFadeUp } from "./animasi";
import { PemisahGunung } from "./PemisahGunung";
// 🔧 Data mempelai diatur di src/config/undangan.ts
import { PASANGAN } from "@/config/undangan";

interface DataMempelai {
  nama: string;
  peran: string;
  deskripsi: string;
  orangTua: string;
}

const mempelaiWanita: DataMempelai = PASANGAN.wanita;
const mempelaiPria: DataMempelai = PASANGAN.pria;


function KartuMempelai({ data }: { data: DataMempelai }) {
  return (
    <motion.div variants={varianFadeUp} className="flex flex-col items-center text-center">
      <p className="teks-label mb-6">{data.peran}</p>
      <h3 className="teks-h1 mb-4 text-arang">{data.nama}</h3>
      <p className="mb-6 max-w-xs text-coklat italic font-serif text-lg leading-relaxed">
        {data.deskripsi}
      </p>
      <div className="h-px w-12 bg-batu mb-4" />
      <p className="text-sm text-coklat">{data.orangTua}</p>
    </motion.div>
  );
}

export function Pasangan() {
  return (
    <section
      id="pasangan"
      className="px-6 py-24 md:py-32"
      aria-label="Pengenalan pasangan"
    >
      <motion.div
        variants={varianContainer}
        initial="tersembunyi"
        whileInView="terlihat"
        viewport={{ once: true, amount: 0.2 }}
        className="kontainer-konten"
      >
        <motion.div variants={varianFadeUp} className="text-center mb-20">
          <p className="teks-label mb-4">Mempelai</p>
          <h2 className="teks-h2 text-arang">Dua Cerita, Satu Jalan</h2>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-12 md:gap-16 items-center">
          <KartuMempelai data={mempelaiWanita} />

          {/* Pemisah vertikal — siluet bambu */}
          <div className="hidden md:flex flex-col items-center justify-center h-full">
            <span className="h-32 w-px bg-batu" />
            <span className="my-4 font-serif italic text-2xl text-coklat">&</span>
            <span className="h-32 w-px bg-batu" />
          </div>

          {/* Pemisah horizontal di mobile */}
          <div className="md:hidden">
            <PemisahGunung />
          </div>

          <KartuMempelai data={mempelaiPria} />
        </div>
      </motion.div>
    </section>
  );
}
