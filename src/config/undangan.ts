/**
 * ═══════════════════════════════════════════════════════════════════
 *  KONFIGURASI UTAMA UNDANGAN — Edit semua di file ini
 * ═══════════════════════════════════════════════════════════════════
 *
 *  File ini adalah SATU-SATUNYA tempat yang perlu Anda edit untuk
 *  mengganti seluruh konten undangan: nama mempelai, tanggal acara,
 *  alamat, foto, rekening bank, dll.
 *
 *  Setelah mengedit, simpan file lalu refresh browser.
 *
 *  Bagian backend (RSVP -> database) dijelaskan di PANDUAN.md.
 * ═══════════════════════════════════════════════════════════════════
 */

// ─── 1. IDENTITAS PASANGAN ──────────────────────────────────────────
export const PASANGAN = {
  // 🔧 GANTI: nama panggilan singkat (dipakai di sampul & footer)
  namaSingkatWanita: "Hermione",
  namaSingkatPria: "Harry",

  wanita: {
    nama: "Hermione Granger",                    // 🔧 GANTI
    peran: "Putri Pertama",                       // 🔧 GANTI
    deskripsi:
      "Tumbuh di lereng gunung yang tenang, ia menemukan keindahan dalam hal-hal sederhana — secangkir teh pagi dan keheningan yang berbicara.", // 🔧 GANTI
    orangTua: "Putri dari Bpk. Hartono & Ibu Lestari", // 🔧 GANTI
  },

  pria: {
    nama: "Harry Potter",                     // 🔧 GANTI
    peran: "Putra Bungsu",                        // 🔧 GANTI
    deskripsi:
      "Seorang arsitek yang percaya bahwa ruang terbaik adalah yang memberi napas — sebagaimana cinta yang sejati memberi ruang untuk tumbuh.", // 🔧 GANTI
    orangTua: "Putra dari Bpk. James & Ibu Lily", // 🔧 GANTI
  },
};

// ─── 2. TANGGAL & DETAIL ACARA ──────────────────────────────────────
export const ACARA = {
  // 🔧 GANTI: tanggal & waktu pernikahan (format ISO, WIB = +07:00)
  // Contoh: "2026-08-15T08:00:00+07:00"
  tanggalISO: "2026-06-09T12:00:00+07:00",

  // 🔧 GANTI: teks tanggal yang ditampilkan di sampul
  tanggalTampilan: "Sabtu, 9 Juni 2026",

  // 🔧 GANTI: batas konfirmasi RSVP
  batasRSVP: "1 juni 2026",

  // 🔧 GANTI: detail acara (label & nilai bebas, urutan sesuai keinginan)
  detail: [
    { label: "Hari", nilai: "Sabtu" },
    { label: "Tanggal", nilai: "9 Juni 2026" },
    { label: "Akad", nilai: "08.00 WIB" },
    { label: "Resepsi", nilai: "11.00 — 14.00 WIB" },
    { label: "Dress Code", nilai: "Sage Green & Earth Tones" },
  ],

  // 🔧 GANTI: alamat lokasi (otomatis dipakai untuk peta Google Maps)
  alamat:
    "The Alana Hotel & Conference Center, Jl. Palagan Tentara Pelajar, Sleman, Yogyakarta",

  // 🔧 GANTI: parameter Google Calendar (waktu dalam UTC, format YYYYMMDDTHHmmssZ)
  // 12 April 2025 08:00 WIB = 12 April 2025 01:00 UTC -> 20250412T010000Z
  kalender: {
    judul: "Pernikahan Hermione & Harry",
    mulaiUTC: "20260609T050000Z",
    selesaiUTC: "20260609T100000Z",
    deskripsi: "Akad & Resepsi Pernikahan",
  },
};

// ─── 3. PERJALANAN / LINIMASA ───────────────────────────────────────
// 🔧 GANTI: maksimal 6 momen — pilih yang paling berarti
export const PERJALANAN = [
  {
    tanggal: "Maret 2019",
    judul: "Pertemuan Pertama",
    deskripsi:
      "Di sebuah pameran arsitektur kecil di Yogyakarta, dua jalan tanpa sengaja bersinggungan.",
  },
  {
    tanggal: "Agustus 2020",
    judul: "Perjalanan Pertama",
    deskripsi:
      "Sebuah pendakian sederhana yang mengajarkan bahwa kebersamaan lebih penting dari puncak.",
  },
  {
    tanggal: "Desember 2021",
    judul: "Rumah Bersama",
    deskripsi: "Mereka menyadari bahwa rumah bukan tempat — melainkan seseorang.",
  },
  {
    tanggal: "Juni 2023",
    judul: "Janji Diam-diam",
    deskripsi:
      "Tanpa kata-kata besar, hati keduanya telah memutuskan untuk berjalan bersama.",
  },
  {
    tanggal: "Februari 2024",
    judul: "Lamaran",
    deskripsi:
      "Di bawah pohon ginkgo yang menguning, sebuah pertanyaan dijawab dengan air mata bahagia.",
  },
  {
    tanggal: "April 2025",
    judul: "Hari Bahagia",
    deskripsi: "Dan di sinilah kita — mengundang Anda menjadi bagian dari babak baru ini.",
  },
];

// ─── 4. GALERI FOTO ─────────────────────────────────────────────────
/**
 * 🔧 GANTI: foto-foto galeri (6 foto idealnya).
 *
 * Cara mengganti dengan foto Anda sendiri:
 *   1. Letakkan file foto di folder `public/foto/`
 *      (buat folder jika belum ada).
 *   2. Ganti `src` menjadi `/foto/nama-file.jpg`.
 *      Contoh: src: "/foto/prewed-01.jpg"
 *   3. Pastikan `alt` deskriptif (untuk aksesibilitas & SEO).
 *   4. `ratio` boleh "aspect-[3/4]" (potret) atau "aspect-square" (kotak).
 */
export const GALERI = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80",
    alt: "Momen kebersamaan pasangan",
    ratio: "aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=900&q=80",
    alt: "Pernikahan bergaya minimalis",
    ratio: "aspect-square",
  },
  {
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=80",
    alt: "Tangan saling berpegangan",
    ratio: "aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=900&q=80",
    alt: "Senyum di tengah perjalanan",
    ratio: "aspect-square",
  },
  {
    src: "https://images.unsplash.com/photo-1525772764200-be829a350797?w=900&q=80",
    alt: "Ketenangan di pagi hari",
    ratio: "aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=900&q=80",
    alt: "Detail bunga sederhana",
    ratio: "aspect-square",
  },
];

// ─── 5. AMPLOP DIGITAL (REKENING BANK) ──────────────────────────────
// 🔧 GANTI: nomor rekening untuk hadiah pernikahan
export const REKENING = [
  { bank: "BCA", nomor: "1234567890", atasNama: "Dewi Cahyaningrum" },
  { bank: "Mandiri", nomor: "9876543210", atasNama: "Arjuna Wicaksono" },
];

// ─── 6. META / SEO ──────────────────────────────────────────────────
// 🔧 GANTI: muncul di tab browser & saat dibagikan via WhatsApp
export const META = {
  judul: "Hermione & Harry — Undangan Pernikahan",
  deskripsi:
    "Dengan penuh sukacita, kami mengundang Anda untuk merayakan hari istimewa kami. Sabtu, 9 Juni 2026.",
};

// ─── 7. QUOTE & PENUTUP ─────────────────────────────────────────────
export const QUOTE_SAMPUL = "Dua jalan, satu perjalanan."; // 🔧 GANTI

// 🔧 GANTI: ayat / doa di bagian "DoaHarapan"
export const DOA = {
  teks: `"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang."`,
  sumber: "— Q.S. Ar-Rum: 21",
};
