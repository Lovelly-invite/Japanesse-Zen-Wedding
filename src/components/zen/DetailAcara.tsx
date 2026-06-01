import { motion } from "framer-motion";
import { varianContainer, varianFadeUp } from "./animasi";
import { TombolZen } from "./TombolZen";
import { PemisahGunung } from "./PemisahGunung";
// 🔧 Alamat, tanggal & detail acara diatur di src/config/undangan.ts
import { ACARA } from "@/config/undangan";

const ALAMAT = ACARA.alamat;
const URL_MAPS = `https://www.google.com/maps?q=${encodeURIComponent(ALAMAT)}&output=embed`;
const URL_KALENDER_GOOGLE =
  `https://calendar.google.com/calendar/render?action=TEMPLATE` +
  `&text=${encodeURIComponent(ACARA.kalender.judul)}` +
  `&dates=${ACARA.kalender.mulaiUTC}/${ACARA.kalender.selesaiUTC}` +
  `&details=${encodeURIComponent(ACARA.kalender.deskripsi)}` +
  `&location=${encodeURIComponent(ALAMAT)}`;

const detail = ACARA.detail;


export function DetailAcara() {
  const salinAlamat = async () => {
    try {
      await navigator.clipboard.writeText(ALAMAT);
    } catch {
      // Diam — operasi opsional
    }
  };

  return (
    <section className="px-6 py-24 md:py-32" aria-label="Detail acara">
      <motion.div
        variants={varianContainer}
        initial="tersembunyi"
        whileInView="terlihat"
        viewport={{ once: true, amount: 0.15 }}
        className="kontainer-konten"
      >
        <motion.div variants={varianFadeUp} className="text-center mb-16">
          <p className="teks-label mb-4">Acara</p>
          <h2 className="teks-h2 text-arang">Detail Hari Bahagia</h2>
        </motion.div>

        <motion.dl variants={varianFadeUp} className="mx-auto max-w-md space-y-5 mb-16">
          {detail.map((d) => (
            <div key={d.label} className="flex items-baseline justify-between gap-6 border-b border-batu pb-4">
              <dt className="teks-label">{d.label}</dt>
              <dd className="font-serif text-lg text-arang text-right">{d.nilai}</dd>
            </div>
          ))}
        </motion.dl>

        <motion.div variants={varianFadeUp} className="mb-12">
          <PemisahGunung />
        </motion.div>

        <motion.div variants={varianFadeUp} className="text-center mb-8">
          <p className="font-serif text-xl text-arang mb-3 italic">Lokasi</p>
          <p className="text-coklat max-w-md mx-auto leading-relaxed">{ALAMAT}</p>
        </motion.div>

        {/* Embed peta dengan filter monokrom — gaya kustom via CSS */}
        <motion.div
          variants={varianFadeUp}
          className="aspect-[4/3] w-full overflow-hidden border border-batu mb-8"
          style={{ filter: "grayscale(1) contrast(0.9) brightness(1.02)" }}
        >
          <iframe
            src={URL_MAPS}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Peta lokasi acara"
          />
        </motion.div>

        <motion.div variants={varianFadeUp} className="flex flex-wrap items-center justify-center gap-3">
          <TombolZen varian="primer" onClick={() => window.open(URL_KALENDER_GOOGLE, "_blank")}>
            Tambah ke Kalender
          </TombolZen>
          <TombolZen varian="sekunder" onClick={salinAlamat}>
            Salin Alamat
          </TombolZen>
        </motion.div>
      </motion.div>
    </section>
  );
}
