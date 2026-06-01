import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { varianContainer, varianFadeUp } from "./animasi";
import { TombolZen } from "./TombolZen";
import { Enso } from "./Enso";
// 🔧 Batas tanggal RSVP diatur di src/config/undangan.ts
import { ACARA } from "@/config/undangan";
import { createClient } from "@supabase/supabase-js";


/**
 * Validasi RSVP — semua pesan dalam Bahasa Indonesia.
 */
const skemaRSVP = z.object({
  namaLengkap: z
    .string()
    .trim()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama terlalu panjang"),
  nomorWhatsapp: z
    .string()
    .trim()
    .regex(/^(\+62|62|0)8[1-9][0-9]{6,11}$/, "Format nomor WhatsApp tidak valid"),
  jumlahTamu: z
    .number()
    .min(1, "Minimal 1 tamu")
    .max(5, "Maksimal 5 tamu"),
  kehadiran: z.enum(["hadir", "tidak_hadir"]),
  pesanPribadi: z.string().trim().max(500, "Pesan maksimal 500 karakter").optional().or(z.literal("")),
});

type DataRSVP = z.infer<typeof skemaRSVP>;

export function FormulirRSVP() {
  const [sudahKirim, setSudahKirim] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DataRSVP>({
    resolver: zodResolver(skemaRSVP),
    defaultValues: {
      jumlahTamu: 1,
      kehadiran: "hadir",
    },
  });

  
   const supabase = createClient(
     import.meta.env.VITE_SUPABASE_URL,
     import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
   );

   const onSubmit = async (data: DataRSVP) => {
     const { error } = await supabase.from("rsvp").insert({
       nama_lengkap: data.namaLengkap,
       nomor_whatsapp: data.nomorWhatsapp,
       jumlah_tamu: data.jumlahTamu,
       kehadiran: data.kehadiran,
       pesan_pribadi: data.pesanPribadi || null,
     });
     if (error) { alert("Gagal mengirim, coba lagi."); return; }
     setSudahKirim(true);
   };


  if (sudahKirim) {
    return (
      <section id="rsvp" className="bg-pasir/40 px-6 py-24 md:py-32" aria-label="Konfirmasi RSVP terkirim">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
          className="kontainer-konten text-center"
        >
          <div className="mx-auto mb-8 w-fit">
            <Enso ukuran={140} />
          </div>
          <p className="teks-label mb-4">Terima Kasih</p>
          <h2 className="teks-h2 text-arang mb-6">Konfirmasi Anda Telah Kami Terima</h2>
          <p className="max-w-md mx-auto text-coklat font-serif italic text-lg leading-relaxed">
            Doa dan kehadiran Anda adalah hadiah terindah bagi kami.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="bg-pasir/40 px-6 py-24 md:py-32" aria-label="Formulir konfirmasi kehadiran">
      <motion.div
        variants={varianContainer}
        initial="tersembunyi"
        whileInView="terlihat"
        viewport={{ once: true, amount: 0.15 }}
        className="kontainer-konten max-w-xl mx-auto"
      >
        <motion.div variants={varianFadeUp} className="text-center mb-16">
          <p className="teks-label mb-4">RSVP</p>
          <h2 className="teks-h2 text-arang">Konfirmasi Kehadiran</h2>
          <p className="mt-4 text-coklat font-serif italic">
            Mohon konfirmasi sebelum {ACARA.batasRSVP}
          </p>
        </motion.div>

        <motion.form
          variants={varianFadeUp}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
          noValidate
        >
          <KolomInput
            label="Nama Lengkap"
            id="namaLengkap"
            register={register("namaLengkap")}
            error={errors.namaLengkap?.message}
            autoComplete="name"
          />

          <KolomInput
            label="Nomor WhatsApp"
            id="nomorWhatsapp"
            register={register("nomorWhatsapp")}
            error={errors.nomorWhatsapp?.message}
            placeholder="08xxxxxxxxxx"
            inputMode="tel"
            autoComplete="tel"
          />

          <div>
            <label htmlFor="jumlahTamu" className="teks-label block mb-3">
              Jumlah Tamu
            </label>
            <select
              id="jumlahTamu"
              {...register("jumlahTamu", { valueAsNumber: true })}
              className="w-full bg-transparent border-0 border-b border-batu py-2 font-serif text-lg text-arang focus:border-sage focus:outline-none transition-colors duration-300"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n} orang</option>
              ))}
            </select>
            {errors.jumlahTamu && (
              <p className="mt-2 text-sm text-destructive">{errors.jumlahTamu.message}</p>
            )}
          </div>

          <fieldset>
            <legend className="teks-label mb-3">Kehadiran</legend>
            <div className="flex gap-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  value="hadir"
                  {...register("kehadiran")}
                  className="accent-sage"
                />
                <span className="font-serif text-lg text-arang">Hadir</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  value="tidak_hadir"
                  {...register("kehadiran")}
                  className="accent-sage"
                />
                <span className="font-serif text-lg text-arang">Tidak Hadir</span>
              </label>
            </div>
          </fieldset>

          <div>
            <label htmlFor="pesanPribadi" className="teks-label block mb-3">
              Pesan Pribadi <span className="lowercase tracking-normal text-coklat/60">(opsional)</span>
            </label>
            <textarea
              id="pesanPribadi"
              {...register("pesanPribadi")}
              rows={4}
              className="w-full bg-transparent border-0 border-b border-batu py-2 font-serif text-lg text-arang focus:border-sage focus:outline-none transition-colors duration-300 resize-none"
              placeholder="Tuliskan doa atau ucapan Anda..."
            />
            {errors.pesanPribadi && (
              <p className="mt-2 text-sm text-destructive">{errors.pesanPribadi.message}</p>
            )}
          </div>

          <div className="pt-4 flex justify-center">
            <TombolZen type="submit" varian="primer" disabled={isSubmitting}>
              {isSubmitting ? "Mengirim..." : "Kirim Konfirmasi"}
            </TombolZen>
          </div>
        </motion.form>
      </motion.div>
    </section>
  );
}

// Komponen kolom input — gaya garis bawah saja (bukan kotak penuh)
interface PropsKolom {
  label: string;
  id: string;
  register: ReturnType<ReturnType<typeof useForm<DataRSVP>>["register"]>;
  error?: string;
  placeholder?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
  autoComplete?: string;
}

function KolomInput({ label, id, register, error, placeholder, inputMode, autoComplete }: PropsKolom) {
  return (
    <div>
      <label htmlFor={id} className="teks-label block mb-3">
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        {...register}
        className="w-full bg-transparent border-0 border-b border-batu py-2 font-serif text-lg text-arang placeholder:text-coklat/40 focus:border-sage focus:outline-none transition-colors duration-300"
      />
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}
