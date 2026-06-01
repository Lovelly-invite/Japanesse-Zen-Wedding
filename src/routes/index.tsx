import { createFileRoute } from "@tanstack/react-router";
import { SampulPembuka } from "@/components/zen/SampulPembuka";
import { Pasangan } from "@/components/zen/Pasangan";
import { Perjalanan } from "@/components/zen/Perjalanan";
import { DetailAcara } from "@/components/zen/DetailAcara";
import { FormulirRSVP } from "@/components/zen/FormulirRSVP";
import { Galeri } from "@/components/zen/Galeri";
import { AmplopDigital } from "@/components/zen/AmplopDigital";
import { DoaHarapan } from "@/components/zen/DoaHarapan";
import { Penutup } from "@/components/zen/Penutup";
// 🔧 Judul tab & meta deskripsi diatur di src/config/undangan.ts
import { META } from "@/config/undangan";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: META.judul },
      { name: "description", content: META.deskripsi },
      { property: "og:title", content: META.judul },
      { property: "og:description", content: META.deskripsi },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: HalamanUndangan,
});

function HalamanUndangan() {
  return (
    <main className="bg-gading text-arang overflow-x-hidden">
      <SampulPembuka />
      <Pasangan />
      <Perjalanan />
      <DetailAcara />
      <Galeri />
      <FormulirRSVP />
      <AmplopDigital />
      <DoaHarapan />
      <Penutup />

    </main>
  );
}
