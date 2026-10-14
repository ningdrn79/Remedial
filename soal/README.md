# 📚 PANDUAN PENGELOLAAN BANK SOAL REMEDIAL (SD TZU CHI)

Struktur folder bank soal sekarang telah ditata rapi ke dalam masing-masing subfolder kelas:

---

## 📁 Struktur Subfolder di `d:/Erapot/soal/`:

```text
d:/Erapot/soal/
├── kelas_4/
│   ├── soal_k4.js       <-- File aktif yang dibaca sistem aplikasi (10 PG + 5 Uraian)
│   ├── soal_k4.json     <-- Format JSON untuk cadangan / ekspor bank soal
│   ├── README.md        <-- Petunjuk materi Kelas 4 (Excel & AI Detektif Data)
│   └── (soal_k4.docx)   <-- File master Microsoft Word yang ditaruh Ibu Guru
│
├── kelas_5/
│   ├── soal_k5.js       <-- File aktif yang dibaca sistem aplikasi (10 PG + 5 Uraian)
│   ├── soal_k5.json     <-- Format JSON untuk cadangan / ekspor bank soal
│   ├── README.md        <-- Petunjuk materi Kelas 5 (PowerPoint & AI Presentation)
│   └── (soal_k5.docx)   <-- File master Microsoft Word yang ditaruh Ibu Guru
│
└── kelas_6/
    ├── soal_k6.js       <-- File aktif yang dibaca sistem aplikasi (10 PG + 5 Uraian)
    ├── soal_k6.json     <-- Format JSON untuk cadangan / ekspor bank soal
    ├── README.md        <-- Petunjuk materi Kelas 6 (Computational Thinking & Scratch)
    └── (soal_k6.docx)   <-- File master Microsoft Word yang ditaruh Ibu Guru
```

---

## 💡 Cara Menaruh File Word (.docx) & Mengedit Soal:

1. **Menaruh File Word (.docx) sebagai Dokumen Master**:
   - Ibu Guru dapat menaruh file soal Microsoft Word (misalnya `soal_k4.docx`, `soal_k5.docx`, `soal_k6.docx`) ke dalam subfolder kelas yang bersangkutan sebagai arsip dokumen sekolah.

2. **Mengubah Soal yang Aktif di Aplikasi**:
   - Buka file `soal_k4.js`, `soal_k5.js`, atau `soal_k6.js` menggunakan Notepad atau Text Editor.
   - Ubah teks pertanyaan, pilihan `A, B, C, D`, atau kunci jawaban.
   - Saat disimpan dan aplikasi dibuka, sistem akan **otomatis menampilkan soal terbaru** pada kartu ujian siswa!
