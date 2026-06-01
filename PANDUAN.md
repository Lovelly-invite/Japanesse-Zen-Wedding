# 🌿 Panduan Undangan Pernikahan Zen Jepang

Selamat datang! Berikut panduan lengkap untuk **menjalankan template ini di komputer Anda**, **mengganti isi konten**, dan **mengirimkannya ke pihak hosting**.

---

## 1. Menjalankan di Komputer Lokal

### Prasyarat
- **Node.js 20+** atau **Bun 1.0+** (disarankan Bun, lebih cepat).
  - Unduh Node: <https://nodejs.org>
  - Unduh Bun: <https://bun.sh>

### Langkah
```bash
# 1. Buka terminal di folder project ini
cd undangan-zen

# 2. Pasang dependencies
bun install
# atau jika pakai Node:
npm install

# 3. Jalankan server pengembangan
bun run dev
# atau:
npm run dev

# 4. Buka di browser
# http://localhost:3000
```

Setiap perubahan file akan otomatis ter-refresh di browser.

---

## 2. Mengganti Isi Undangan (Tanpa Coding)

**SEMUA konten teks dapat diganti di satu file:**

📁 **`src/config/undangan.ts`**

File ini berisi:
- ✏️ Nama mempelai (lengkap & singkat)
- 📅 Tanggal & jam akad / resepsi
- 📍 Alamat lokasi (otomatis muncul di Google Maps)
- 🖼️ Daftar foto galeri
- 💳 Nomor rekening untuk amplop digital
- 📖 Linimasa perjalanan cinta
- 🤲 Ayat / doa penutup
- 🔍 Judul & deskripsi SEO

Setiap baris yang perlu diganti diberi tanda `// 🔧 GANTI: ...`.
Cukup buka file di editor teks (VS Code, Notepad++, dll.), ubah teks dalam tanda kutip, simpan, dan refresh browser.

---

## 3. Mengganti Foto Galeri & Aset Gambar

### Cara menggunakan foto sendiri:

1. Buat folder `public/foto/` di root project (jika belum ada).
2. Salin file foto Anda ke folder tersebut, contoh:
   ```
   public/foto/prewed-01.jpg
   public/foto/prewed-02.jpg
   ```
3. Buka `src/config/undangan.ts`, cari bagian `GALERI`, ganti `src`:
   ```ts
   { src: "/foto/prewed-01.jpg", alt: "Deskripsi foto", ratio: "aspect-[3/4]" },
   ```
4. **Tips optimasi:**
   - Ukuran ideal: lebar **1200–1600px**.
   - Format: **JPG** (foto) atau **WebP** (lebih ringan).
   - Kompres dulu di <https://tinypng.com> untuk loading cepat.

---

## 4. Mengaktifkan RSVP ke Database (Opsional)

Saat ini formulir RSVP hanya **log ke console browser** (mode demo).
Untuk menyimpan tamu yang RSVP ke database:

### Opsi A — Supabase (gratis, paling mudah)
1. Daftar di <https://supabase.com> → buat project baru.
2. Di SQL Editor, jalankan:
   ```sql
   CREATE TABLE rsvp (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     nama_lengkap text NOT NULL,
     nomor_whatsapp text NOT NULL,
     jumlah_tamu int NOT NULL,
     kehadiran text NOT NULL,
     pesan_pribadi text,
     dibuat_pada timestamptz DEFAULT now()
   );
   ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Siapa saja boleh kirim RSVP"
     ON rsvp FOR INSERT TO anon WITH CHECK (true);
   GRANT INSERT ON rsvp TO anon;
   ```
3. Buat file `.env.local` di root project:
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGc...
   ```
4. Pasang client Supabase:
   ```bash
   bun add @supabase/supabase-js
   ```
5. Buka `src/components/zen/FormulirRSVP.tsx`, cari `// 🔧 TODO BACKEND` dan ganti `onSubmit`:
   ```ts
   import { createClient } from "@supabase/supabase-js";
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
   ```

### Opsi B — Google Sheets (paling sederhana)
Gunakan layanan seperti **SheetDB** (<https://sheetdb.io>) atau **Formspree**.
Cukup `fetch("https://sheetdb.io/api/v1/XXXXX", { method: "POST", body: JSON.stringify(data) })` di `onSubmit`.

---

## 5. Build untuk Hosting (File Siap Deploy)

Setelah semua konten siap, buat versi produksi:

```bash
bun run build
# atau:
npm run build
```

Hasil build muncul di folder **`.output/`** (atau `dist/` tergantung config).

### Struktur output:
- `.output/public/` → file statis (HTML, CSS, JS, gambar)
- `.output/server/` → kode server (jika pakai SSR)

---

## 6. Cara Memberikan ke Pihak Hosting

### Opsi A — Hosting Statis (paling mudah & murah)
Cocok jika **tidak pakai RSVP backend** atau RSVP via Supabase/SheetDB.

**Layanan yang direkomendasikan:**
- **Netlify** (gratis) — drag & drop folder `.output/public/`
- **Vercel** (gratis) — connect ke GitHub, auto-deploy
- **Cloudflare Pages** (gratis) — sangat cepat
- **Niagahoster / IDwebhost / Hostinger** (Indonesia) — upload via cPanel ke `public_html/`

**Langkah umum:**
1. Jalankan `bun run build`.
2. Zip folder `.output/public/`.
3. Kirim ke hosting / upload via FTP / drag ke Netlify.

### Opsi B — Hosting Node.js (jika ada server functions)
Jika Anda menambahkan logic server-side, perlu hosting yang mendukung Node:
- **Vercel** (gratis, otomatis)
- **Railway** / **Render** / **Fly.io**
- **VPS** (DigitalOcean, Vultr) — jalankan `bun run start`

### Opsi C — Kirim Source Code ke Developer Hosting
Jika pihak hosting akan deploy sendiri, kirim **seluruh folder project** (kecuali `node_modules/` dan `.output/`) dalam bentuk ZIP. Mereka akan jalankan `bun install` + `bun run build` di server mereka.

---

## 7. Custom Domain

Setelah deploy:
1. Beli domain di Niagahoster / Namecheap / Cloudflare (contoh: `dewiarjuna.com`).
2. Di dashboard hosting (Netlify/Vercel), tambahkan custom domain.
3. Update DNS sesuai instruksi (biasanya `CNAME` atau `A record`).

---

## 8. Checklist Sebelum Kirim Undangan

- [ ] Semua nama & tanggal di `src/config/undangan.ts` sudah benar
- [ ] Foto galeri diganti dengan foto pre-wedding Anda
- [ ] Nomor rekening sudah benar (cek 2x!)
- [ ] Alamat & link Google Maps sudah benar
- [ ] RSVP sudah terhubung ke database (jika perlu)
- [ ] Sudah test buka di **HP** (mobile responsive)
- [ ] Sudah test bagikan via WhatsApp (preview judul & deskripsi muncul)
- [ ] Domain sudah aktif & HTTPS hijau

---

## 9. Struktur File Penting

```
undangan-zen/
├── PANDUAN.md                        ← Anda sedang baca ini
├── package.json                      ← daftar dependencies
├── src/
│   ├── config/
│   │   └── undangan.ts               ⭐ GANTI KONTEN DI SINI
│   ├── routes/
│   │   ├── __root.tsx                ← layout dasar
│   │   └── index.tsx                 ← halaman utama
│   ├── components/zen/               ← komponen visual (jangan diubah kecuali tahu React)
│   │   ├── SampulPembuka.tsx
│   │   ├── Pasangan.tsx
│   │   ├── Perjalanan.tsx
│   │   ├── DetailAcara.tsx
│   │   ├── Galeri.tsx
│   │   ├── FormulirRSVP.tsx         ← logika RSVP ada di sini
│   │   ├── AmplopDigital.tsx
│   │   ├── DoaHarapan.tsx
│   │   ├── Penutup.tsx
│   │   ├── Enso.tsx                  ← lingkaran zen
│   │   └── PemisahGunung.tsx
│   └── styles.css                    ← warna, font, spacing (design tokens)
└── public/                           ← taruh foto & favicon di sini
    └── foto/                         ← (buat folder ini untuk foto Anda)
```

---

## 10. Butuh Bantuan?

- 🔧 Error saat `bun install`? Hapus folder `node_modules/` & file `bun.lock`, lalu ulangi.
- 🔧 Halaman blank? Buka **Developer Tools** (F12) → tab **Console**, screenshot error & kirim ke developer.
- 🔧 Mau ubah warna? Edit `src/styles.css` di bagian `:root { --warna-... }`.
- 🔧 Mau ubah font? Edit `src/styles.css` di `@import url("https://fonts.googleapis.com/...")`.

---

> *"Kesederhanaan bukan ketiadaan konten. Ia adalah penghapusan semua yang tidak perlu."*
> — Filosofi Desain Template Undangan Zen Jepang
