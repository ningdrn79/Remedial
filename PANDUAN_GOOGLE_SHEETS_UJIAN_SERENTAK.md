# PANDUAN INTEGRASI GOOGLE SHEETS UNTUK UJIAN SERENTAK
**Portal EduCode AI — SDS Cinta Kasih Tzu Chi**
*Mata Pelajaran: Koding dan Kecerdasan Artifisial (Kelas 4, Kelas 5, dan Kelas 6)*

---

## 🌟 Mengapa Menggunakan Integrasi Google Sheets?
Dengan integrasi ini:
1. **Seluruh murid di Lab Komputer (atau di rumah) dapat mengerjakan ujian remedial secara bersamaan** di komputer masing-masing.
2. Setiap kali murid mengklik tombol **"Kirim Jawaban"**, seluruh hasil (Nama, Kelas, No. Absen, Nilai Awal, Nilai PG, Nilai Uraian, Nilai Akhir, Durasi, dan Lembar Jawaban) **langsung terkirim otomatis ke 1 file Google Spreadsheet milik Ibu Guru**.
3. Ibu Guru dapat memantau perolehan nilai siswa secara *live* langsung dari laptop guru maupun dari HP.
4. Data tersimpan aman dan terpusat di Google Drive sekolah, serta dapat diunduh kapan saja sebagai Excel (.xlsx).

---

## 🚀 Langkah Cepat 5 Menit Menghubungkan Google Sheets:

### Langkah 1: Buat Google Spreadsheet Baru
1. Buka [Google Sheets](https://sheets.new) di browser laptop Ibu Guru.
2. Beri judul dokumen: **`Rekap Remedial Koding AI Tzu Chi 2026`**.

---

### Langkah 2: Buka Apps Script
1. Pada menu atas Google Sheets, klik **Ekstensi (Extensions)** -> **Apps Script**.
2. Hapus semua tulisan kode default yang ada di dalam editor.

---

### Langkah 3: Tempelkan (Paste) Kode Berikut
Salin seluruh kode di bawah ini dan tempelkan ke editor Apps Script:

```javascript
// ==============================================================
// GOOGLE APPS SCRIPT: PENERIMA DATA REMEDIAL SISWA TZU CHI
// ==============================================================

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'ok', records: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  const records = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    let answersObj = {};
    try {
      if (row[13]) answersObj = JSON.parse(row[13]);
    } catch(err) {}
    
    records.push({
      id: row[0] || ('st_cloud_' + i),
      date: row[1],
      timestamp: row[2],
      name: row[3],
      kelas: row[4],
      absen: row[5],
      nilaiAwal: row[6],
      pgScore: row[7],
      uraianScore: row[8],
      nilaiAkhir: row[9],
      status: row[10],
      predicate: row[11],
      duration: row[12],
      answers: answersObj
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify({ status: 'ok', records: records }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Inisialisasi Header Tabel jika sheet masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "ID Siswa",
        "Tanggal",
        "Waktu Selesai",
        "Nama Siswa",
        "Kelas",
        "No. Absen",
        "Nilai Awal",
        "Nilai PG (50)",
        "Nilai Uraian (50)",
        "Nilai Akhir Remedial (100)",
        "Status Kelulusan",
        "Predikat",
        "Durasi Pengerjaan",
        "Data Jawaban Siswa (JSON)"
      ]);
      
      // Styling Baris Judul Header
      sheet.getRange(1, 1, 1, 14)
        .setBackground("#15803d")
        .setFontColor("#ffffff")
        .setFontWeight("bold")
        .setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }
    
    const body = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      body.id || ("st_" + Date.now()),
      body.date || Utilities.formatDate(new Date(), "Asia/Jakarta", "dd MMMM yyyy"),
      body.timestamp || Utilities.formatDate(new Date(), "Asia/Jakarta", "HH:mm 'WIB'"),
      body.name || "-",
      body.kelas || "-",
      body.absen || "-",
      body.nilaiAwal || 0,
      body.pgScore !== undefined ? body.pgScore : 50,
      body.uraianScore !== undefined ? body.uraianScore : 50,
      body.nilaiAkhir || 0,
      body.status || (body.nilaiAkhir >= 80 ? "Lulus" : "Tuntas"),
      body.predicate || "Sangat Memuaskan",
      body.duration || "60 Menit",
      JSON.stringify(body.answers || {})
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Data tersimpan' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

---

### Langkah 4: Terapkan Sebagai Web App (Deploy)
1. Klik tombol biru **Deploy** di pojok kanan atas -> pilih **New deployment (Penerapan baru)**.
2. Di sebelah kiri tulisan *Select type*, klik ikon gerigi ⚙️ -> pilih **Web app**.
3. Atur pengaturannya:
   * **Description:** `EduCode AI Tzu Chi Webhook`
   * **Execute as (Jalankan sebagai):** `Me (email-ibu-guru@...)`
   * **Who has access (Siapa yang memiliki akses):** **`Anyone (Siapa saja)`** *(Sangat penting agar komputer siswa dapat mengirim nilai tanpa login akun Google)*.
4. Klik tombol **Deploy**.
5. Jika muncul jendela otorisasi akun Google:
   * Klik **Authorize access**.
   * Pilih akun Google Ibu Guru.
   * Jika muncul peringatan *"Google hasn't verified this app"*, klik **Advanced** di kiri bawah -> klik **Go to Untitled project (unsafe)** -> klik **Allow**.
6. Salin **Web app URL** yang muncul (berakhiran `/exec`).

---

### Langkah 5: Tempelkan ke Portal EduCode AI
1. Buka Portal EduCode AI di browser.
2. Buka **Panel Guru** (klik ikon gembok 🔒 di pojok kanan bawah, masukkan PIN: `2026`).
3. Klik tombol **`Google Sheets`** (atau `Konfigurasi Cloud`).
4. Tempelkan URL Web App yang sudah disalin tadi.
5. Klik **Simpan & Hubungkan Cloud**.

🎉 **Selesai!** 
Mulai saat ini, kapan pun murid Kelas 4, 5, atau 6 menyelesaikan ujian di perangkat mana pun, seluruh nilai dan lembar jawabannya langsung otomatis terkirim dan tersusun rapi di Google Sheets Ibu Guru!
