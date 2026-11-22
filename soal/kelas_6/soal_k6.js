/**
 * BANK SOAL RESMI PENILAIAN AKHIR SEMESTER (PAS) - KELAS 6 SD
 * Mata Pelajaran: Koding dan Kecerdasan Artifisial (Informatika)
 * Materi Pokok: 4 Pilar Computational Thinking & Algoritma Pemrograman Scratch
 * SDS Cinta Kasih Tzu Chi - Tahun Pelajaran 2026/2027
 * Guru Pengampu: Darningsih, S.T.
 *
 * Folder: d:/Erapot/soal/kelas_6/soal_k6.js
 */

window.SOAL_KELAS_6 = {
    metadata: {
        kelas: "6",
        jenjang: "SD",
        mataPelajaran: "Koding dan Kecerdasan Artifisial",
        topik: "4 Pilar Computational Thinking & Algoritma Pemrograman Scratch",
        totalPg: 45,
        bobotPg: 70,
        totalUraian: 5,
        bobotUraian: 30,
        durasiMenit: 90,
        kkm: 80
    },

    // ==============================================================
    // BAGIAN I: 45 SOAL PILIHAN GANDA (BOBOT 70 POIN)
    // ==============================================================
    pg: [
        {
            num: 1,
            question: "1. Kemampuan memecahkan masalah kompleks dengan cara berpikir terstruktur, logis, dan sistematis seperti cara kerja komputer disebut ...",
            options: {
                A: "Computational Thinking (Berpikir Komputasional)",
                B: "Artificial Intelligence (Kecerdasan Buatan)",
                C: "Computer Hardware (Perangkat Keras)",
                D: "Graphic Design (Desain Grafis)"
            },
            key: "A",
            keyText: "A. Computational Thinking (Berpikir Komputasional)",
            explanation: "Berpikir Komputasional (Computational Thinking) adalah proses berpikir untuk menyelesaikan masalah secara logis, terstruktur, dan efisien."
        },
        {
            num: 2,
            question: "2. Empat pilar utama dalam Berpikir Komputasional (Computational Thinking) yang benar adalah ...",
            options: {
                A: "Monitor, Keyboard, Mouse, dan CPU",
                B: "Dekomposisi, Pengenalan Pola, Abstraksi, dan Algoritma",
                C: "Coding, Scratch, Python, dan Robotik",
                D: "Input, Proses, Output, dan Storage"
            },
            key: "B",
            keyText: "B. Dekomposisi, Pengenalan Pola, Abstraksi, dan Algoritma",
            explanation: "Empat fondasi berpikir komputasional terdiri atas Dekomposisi, Pengenalan Pola (Pattern Recognition), Abstraksi, dan Algoritma."
        },
        {
            num: 3,
            question: "3. Manfaat utama mempelajari Berpikir Komputasional bagi seorang siswa dalam kehidupan sehari-hari adalah ...",
            options: {
                A: "Menjadi kecanduan bermain game daring sepanjang hari",
                B: "Mampu menyelesaikan masalah rumit menjadi lebih sederhana dan terstruktur",
                C: "Menggantikan tugas guru dan orang tua di rumah",
                D: "Memperbaiki mesin komputer yang rusak tanpa alat"
            },
            key: "B",
            keyText: "B. Mampu menyelesaikan masalah rumit menjadi lebih sederhana dan terstruktur",
            explanation: "Berpikir komputasional melatih siswa berpikir analitis dan sistematis untuk mempermudah pemecahan masalah rumit."
        },
        {
            num: 4,
            question: "4. Seseorang yang menerapkan berpikir komputasional ketika menghadapi masalah besar akan bersikap ...",
            options: {
                A: "Langsung menyerah dan menyalahkan keadaan",
                B: "Menghindari masalah dan menunggu bantuan orang lain",
                C: "Menganalisis masalah, memecahnya menjadi bagian kecil, dan mencari solusi logis",
                D: "Menebak-nebak jawaban tanpa pertimbangan akal sehat"
            },
            key: "C",
            keyText: "C. Menganalisis masalah, memecahnya menjadi bagian kecil, dan mencari solusi logis",
            explanation: "Pendekatan berpikir komputasional selalu mengutamakan analisis, pemecahan masalah (dekomposisi), dan penarikan kesimpulan yang logis."
        },
        {
            num: 5,
            question: "5. Saat seorang anak ingin membuat game di komputer, ia membagi tugas: membuat karakter, membuat latar belakang, menentukan aturan skor, dan membuat suara musik. Tindakan tersebut paling tepat mencerminkan pilar ...",
            options: {
                A: "Abstraksi",
                B: "Algoritma",
                C: "Dekomposisi",
                D: "Pengenalan Pola"
            },
            key: "C",
            keyText: "C. Dekomposisi",
            explanation: "Membagi pembuatan game besar ke dalam sub-tugas (karakter, latar, skor, suara) adalah inti dari pilar Dekomposisi."
        },
        {
            num: 6,
            question: "6. Pilar computational thinking yang bekerja dengan cara memecah masalah yang besar atau rumit menjadi bagian-bagian yang lebih kecil dan mudah dikelola disebut ...",
            options: {
                A: "Dekomposisi (Decomposition)",
                B: "Abstraksi (Abstraction)",
                C: "Algoritma (Algorithm)",
                D: "Pola (Pattern)"
            },
            key: "A",
            keyText: "A. Dekomposisi (Decomposition)",
            explanation: "Dekomposisi adalah teknik memecah masalah kompleks menjadi komponen-komponen kecil agar lebih mudah ditangani."
        },
        {
            num: 7,
            question: "7. Berikut ini merupakan contoh penerapan pilar dekomposisi saat merapikan kamar tidur yang berantakan, yaitu ...",
            options: {
                A: "Mengunci pintu kamar dan tidur di ruang tamu",
                B: "Membagi pekerjaan: merapikan kasur, menyapu lantai, melipat selimut, dan menata buku di rak",
                C: "Menyemprotkan pengharum ruangan tanpa merapikan barang-barang",
                D: "Menyuruh adik mengerjakan seluruh pekerjaan sendirian"
            },
            key: "B",
            keyText: "B. Membagi pekerjaan: merapikan kasur, menyapu lantai, melipat selimut, dan menata buku di rak",
            explanation: "Membagi pembersihan kamar menjadi tugas-tugas spesifik (kasur, lantai, buku) merupakan contoh dekomposisi dalam kehidupan sehari-hari."
        },
        {
            num: 8,
            question: "8. Ibu ingin memasak nasi goreng untuk sarapan keluarga. Jika ibu menggunakan prinsip dekomposisi, langkah awal yang tepat adalah ...",
            options: {
                A: "Langsung menyajikan piring kosong di meja makan",
                B: "Menguraikan kebutuhan bahan (nasi, telur, kecap, garam) dan peralatan (wajan, spatula, kompor)",
                C: "Membeli makanan instan di restoran cepat saji",
                D: "Mencuci piring yang belum digunakan"
            },
            key: "B",
            keyText: "B. Menguraikan kebutuhan bahan (nasi, telur, kecap, garam) dan peralatan (wajan, spatula, kompor)",
            explanation: "Dekomposisi memasak diawali dengan menguraikan seluruh bahan baku dan peralatan yang diperlukan."
        },
        {
            num: 9,
            question: "9. Dalam merakit sebuah sepeda baru dari pabrik, kita membagi bagian-bagiannya menjadi: rangka utama, setang kemudi, roda depan, roda belakang, dan rantai pedal. Pendekatan ini merupakan penerapan dari ...",
            options: {
                A: "Abstraksi",
                B: "Dekomposisi",
                C: "Pengenalan Pola",
                D: "Pengulangan"
            },
            key: "B",
            keyText: "B. Dekomposisi",
            explanation: "Memecah komponen sepeda menjadi bagian individual sebelum dirakit adalah penerapan dekomposisi fisik."
        },
        {
            num: 10,
            question: "10. Mengapa dekomposisi sangat penting dilakukan sebelum seorang pemrogram mulai menulis kode program?",
            options: {
                A: "Agar komputer tidak cepat panas dan hemat listrik",
                B: "Agar masalah yang besar menjadi lebih sederhana sehingga lebih mudah dipecahkan dan minim kesalahan",
                C: "Agar tampilan monitor berubah menjadi lebih berwarna",
                D: "Agar program tidak bisa dibaca oleh pemrogram lain"
            },
            key: "B",
            keyText: "B. Agar masalah yang besar menjadi lebih sederhana sehingga lebih mudah dipecahkan dan minim kesalahan",
            explanation: "Dekomposisi memecah kerumitan program besar menjadi modul-modul kecil sehingga meminimalkan potensi kesalahan (bug)."
        },
        {
            num: 11,
            question: "11. Seorang siswa ingin membuat animasi tata surya di Scratch. Jika ia melakukan dekomposisi, komponen manakah yang BUKAN merupakan bagian dari tugas animasi tersebut?",
            options: {
                A: "Menggambar sprite matahari dan planet-planet",
                B: "Membuat skrip pergerakan orbit untuk masing-masing planet",
                C: "Menentukan latar belakang (backdrop) luar angkasa bertabur bintang",
                D: "Membongkar mesin komputer menjadi kepingan terpisah"
            },
            key: "D",
            keyText: "D. Membongkar mesin komputer menjadi kepingan terpisah",
            explanation: "Membongkar fisik komputer tidak ada hubungannya dengan pembuatan proyek animasi tata surya di Scratch."
        },
        {
            num: 12,
            question: "12. Pilar Berpikir Komputasional yang berfokus pada menemukan kesamaan, keteraturan, atau kecenderungan dari suatu masalah disebut ...",
            options: {
                A: "Pengenalan Pola (Pattern Recognition)",
                B: "Abstraksi",
                C: "Algoritma",
                D: "Dekomposisi"
            },
            key: "A",
            keyText: "A. Pengenalan Pola (Pattern Recognition)",
            explanation: "Pengenalan pola adalah kemampuan mengenali kesamaan ciri, keteraturan, atau tren berulang pada data/masalah."
        },
        {
            num: 13,
            question: "13. Perhatikan deret pola berikut: Merah, Kuning, Hijau, Merah, Kuning, Hijau, Merah, Kuning, ... Warna selanjutnya yang tepat sesuai pola adalah ...",
            options: {
                A: "Biru",
                B: "Hijau",
                C: "Ungu",
                D: "Merah"
            },
            key: "B",
            keyText: "B. Hijau",
            explanation: "Pola warna berulang dalam siklus 3: Merah -> Kuning -> Hijau. Setelah Kuning adalah Hijau."
        },
        {
            num: 14,
            question: "14. Setiap kali kucing merasa lapar, ia selalu mengeong dan berjalan mendekati mangkuk makanannya. Mengenali kebiasaan kucing tersebut merupakan contoh penerapan dari ...",
            options: {
                A: "Abstraksi",
                B: "Dekomposisi",
                C: "Pengenalan Pola",
                D: "Algoritma"
            },
            key: "C",
            keyText: "C. Pengenalan Pola",
            explanation: "Melihat perilaku berulang dari kucing saat lapar adalah bentuk pengamatan pola (Pattern Recognition)."
        },
        {
            num: 15,
            question: "15. Dalam pelajaran matematika, Rian mengamati: 2 x 1 = 2, 2 x 2 = 4, 2 x 3 = 6, 2 x 4 = 8. Rian menyimpulkan bahwa setiap hasil perkalian dua selalu bertambah 2. Proses berpikir yang dilakukan Rian adalah ...",
            options: {
                A: "Pengenalan pola matematika",
                B: "Dekomposisi angka",
                C: "Pengabaian informasi penting",
                D: "Pembuatan animasi Scratch"
            },
            key: "A",
            keyText: "A. Pengenalan pola matematika",
            explanation: "Menemukan keteraturan penambahan angka 2 pada tabel perkalian merupakan pengenalan pola keteraturan numerik."
        },
        {
            num: 16,
            question: "16. Apa keuntungan mengenali pola ketika kita sedang membuat program komputer?",
            options: {
                A: "Kita harus menulis kode yang sama berulang-ulang dari awal",
                B: "Kita dapat menggunakan fungsi pengulangan (loop) dan memanfaatkan solusi yang pernah berhasil sebelumnya",
                C: "Komputer akan berhenti bekerja secara otomatis",
                D: "Kita tidak perlu lagi menyalakan monitor"
            },
            key: "B",
            keyText: "B. Kita dapat menggunakan fungsi pengulangan (loop) dan memanfaatkan solusi yang pernah berhasil sebelumnya",
            explanation: "Dengan mengenali pola yang sama, pemrogram dapat meringkas kode menggunakan pengulangan (loop) dan memakai ulang solusi."
        },
        {
            num: 17,
            question: "17. Dokter mengenali bahwa pasien yang terkena demam berdarah selalu memiliki ciri: demam tinggi mendadak, bintik merah pada kulit, dan trombosit menurun. Kemampuan dokter dalam mendiagnosis penyakit tersebut didasarkan pada pilar ...",
            options: {
                A: "Dekomposisi",
                B: "Pengenalan Pola",
                C: "Abstraksi",
                D: "Algoritma"
            },
            key: "B",
            keyText: "B. Pengenalan Pola",
            explanation: "Mencocokkan gejala klinis pasien dengan pola penyakit sebelumnya adalah penerapan pengenalan pola dalam dunia medis."
        },
        {
            num: 18,
            question: "18. Pilar Berpikir Komputasional yang memfokuskan perhatian hanya pada informasi yang penting dan mengabaikan detail yang tidak relevan disebut ...",
            options: {
                A: "Abstraksi (Abstraction)",
                B: "Algoritma (Algorithm)",
                C: "Dekomposisi (Decomposition)",
                D: "Eksekusi (Execution)"
            },
            key: "A",
            keyText: "A. Abstraksi (Abstraction)",
            explanation: "Abstraksi adalah teknik menyaring dan memusatkan perhatian pada hal-hal penting serta mengesampingkan detail yang tidak relevan."
        },
        {
            num: 19,
            question: "19. Sebuah peta rute bus TransJakarta hanya menampilkan jalur jalan utama, letak halte pemberhentian, dan nama jalan tanpa menggambarkan pohon atau warna cat rumah penduduk di sepanjang jalan. Hal ini merupakan contoh dari ...",
            options: {
                A: "Kesalahan pembuatan peta",
                B: "Abstraksi informasi",
                C: "Algoritma navigasi",
                D: "Dekomposisi jalan raya"
            },
            key: "B",
            keyText: "B. Abstraksi informasi",
            explanation: "Peta sengaja mengabaikan pohon dan rumah warga agar informasi rute bus mudah dibaca dengan cepat (abstraksi)."
        },
        {
            num: 20,
            question: "20. Ketika kamu diminta menggambar karakter 'kucing' sederhana pada kertas, kamu menggambar kepala bulat, dua telinga segitiga, mata, kumis, dan badan. Kamu tidak perlu menggambar setiap helai bulu atau detak jantung kucing. Tindakan menyederhanakan gambar ini disebut ...",
            options: {
                A: "Abstraksi",
                B: "Dekomposisi",
                C: "Pola",
                D: "Algoritma"
            },
            key: "A",
            keyText: "A. Abstraksi",
            explanation: "Menyederhanakan gambar menjadi bentuk dasar esensial kucing tanpa detail mikroskopis merupakan contoh abstraksi."
        },
        {
            num: 21,
            question: "21. Saat merancang game balapan mobil, informasi manakah yang PALING PENTING untuk diprogram di dalam game?",
            options: {
                A: "Kecepatan mobil, tombol kemudi setang, dan garis batas lintasan",
                B: "Merek parfum yang dipakai oleh penonton di pinggir jalan",
                C: "Jumlah debu yang menempel di kaca spion mobil",
                D: "Warna sepatu montir di garasi mobil"
            },
            key: "A",
            keyText: "A. Kecepatan mobil, tombol kemudi setang, dan garis batas lintasan",
            explanation: "Logika balapan mobil membutuhkan kecepatan, kontrol kemudi, dan lintasan (abstraksi parameter inti game)."
        },
        {
            num: 22,
            question: "22. Mengapa kita perlu melakukan abstraksi saat menyelesaikan masalah yang rumit?",
            options: {
                A: "Agar kita pusing memikirkan semua hal kecil yang tidak penting",
                B: "Agar fokus kita tidak terpecah dan kita bisa menyelesaikan inti permasalahan dengan lebih efisien",
                C: "Agar komputer bekerja lebih lambat",
                D: "Agar gambar yang dihasilkan menjadi buram"
            },
            key: "B",
            keyText: "B. Agar fokus kita tidak terpecah dan kita bisa menyelesaikan inti permasalahan dengan lebih efisien",
            explanation: "Abstraksi menghindarkan kita dari distraksi detail yang tidak berpengaruh terhadap penyelesaian masalah utama."
        },
        {
            num: 23,
            question: "23. Dalam aplikasi ojek online, pengguna hanya melihat lokasi driver, estimasi waktu tiba, dan tarif perjalanan. Pengguna tidak perlu tahu rumus matematika rumit yang ada di dalam server aplikasi. Konsep ini adalah penerapan dari ...",
            options: {
                A: "Abstraksi sistem",
                B: "Kerusakan sistem",
                C: "Dekomposisi baterai",
                D: "Pola gambar"
            },
            key: "A",
            keyText: "A. Abstraksi sistem",
            explanation: "Antarmuka aplikasi menyembunyikan kerumitan kode server dan hanya menampilkan informasi yang dibutuhkan penumpang (abstraksi sistem)."
        },
        {
            num: 24,
            question: "24. Urutan langkah-langkah logis, bertahap, dan sistematis yang disusun secara runtut untuk menyelesaikan suatu permasalahan disebut ...",
            options: {
                A: "Algoritma (Algorithm)",
                B: "Abstraksi",
                C: "Dekomposisi",
                D: "Perangkat keras"
            },
            key: "A",
            keyText: "A. Algoritma (Algorithm)",
            explanation: "Algoritma adalah serangkaian instruksi atau prosedur terurut yang jelas dan pasti untuk memecahkan masalah."
        },
        {
            num: 25,
            question: "25. Berikut ini adalah contoh algoritma dalam kehidupan sehari-hari, KECUALI ...",
            options: {
                A: "Resep dan langkah-langkah membuat kue bolu",
                B: "Petunjuk langkah memasang tenda kemah",
                C: "Urutan mencuci tangan yang benar dengan sabun",
                D: "Menebak nilai ulangan tanpa pernah belajar"
            },
            key: "D",
            keyText: "D. Menebak nilai ulangan tanpa pernah belajar",
            explanation: "Menebak bukanlah prosedur yang logis, terencana, atau sistematis sehingga bukan merupakan algoritma."
        },
        {
            num: 26,
            question: "26. Perhatikan langkah-langkah menggosok gigi berikut:\n(1) Mengoleskan pasta gigi ke sikat gigi\n(2) Mengambil sikat gigi dan pasta gigi\n(3) Berkumur dengan air bersih\n(4) Menyikat seluruh permukaan gigi dengan lembut\nUrutan algoritma menggosok gigi yang benar adalah ...",
            options: {
                A: "(2) - (1) - (4) - (3)",
                B: "(1) - (2) - (3) - (4)",
                C: "(4) - (3) - (2) - (1)",
                D: "(3) - (1) - (4) - (2)"
            },
            key: "A",
            keyText: "A. (2) - (1) - (4) - (3)",
            explanation: "Urutan logis: Ambil sikat & odol (2) -> Oleskan odol (1) -> Sikat gigi (4) -> Berkumur bersih (3)."
        },
        {
            num: 27,
            question: "27. Syarat utama dari sebuah algoritma yang baik agar dapat dijalankan oleh komputer adalah ...",
            options: {
                A: "Menggunakan bahasa yang membingungkan dan bermakna ganda",
                B: "Langkah-langkahnya harus jelas, tepat, dan memiliki urutan yang pasti (logis)",
                C: "Terdiri dari jutaan langkah yang tidak ada akhirnya (berputar tanpa henti)",
                D: "Disusun secara acak tanpa memperdulikan urutan waktu"
            },
            key: "B",
            keyText: "B. Langkah-langkahnya harus jelas, tepat, dan memiliki urutan yang pasti (logis)",
            explanation: "Algoritma yang baik harus unambiguous (jelas/tidak bermakna ganda), berhingga (finite), dan runtut."
        },
        {
            num: 28,
            question: "28. Jika urutan dalam sebuah algoritma pembuatan teh manis terbalik, misalnya gula dimasukkan ke dalam gelas setelah air teh diminum sampai habis, maka akibatnya adalah ...",
            options: {
                A: "Teh manis tetap terasa enak dan manis",
                B: "Hasil akhir tidak sesuai dengan tujuan yang diharapkan",
                C: "Komputer akan bekerja dua kali lebih cepat",
                D: "Gelas akan berubah menjadi dingin seketika"
            },
            key: "B",
            keyText: "B. Hasil akhir tidak sesuai dengan tujuan yang diharapkan",
            explanation: "Algoritma sangat sensitif terhadap urutan. Jika urutannya keliru, hasil akhir/tujuannya tidak akan tercapai."
        },
        {
            num: 29,
            question: "29. Dalam bahasa pemrograman, algoritma yang telah diterjemahkan menjadi perintah-perintah yang dapat dipahami dan dijalankan oleh komputer disebut ...",
            options: {
                A: "Program atau Kode (Code)",
                B: "Kabel listrik",
                C: "Harddisk",
                D: "Monitor"
            },
            key: "A",
            keyText: "A. Program atau Kode (Code)",
            explanation: "Program komputer atau kode (source code) adalah manifestasi algoritma dalam sintaks bahasa pemrograman."
        },
        {
            num: 30,
            question: "30. Scratch adalah aplikasi pemrograman visual yang sangat cocok untuk anak-anak karena menggunakan metode coding berupa ...",
            options: {
                A: "Mengetik kode teks bahasa mesin yang sangat rumit",
                B: "Menyusun balok-balok kode bergambar (block-based coding) seperti bermain lego",
                C: "Membongkar komponen elektronik di dalam CPU",
                D: "Menggambar sketsa manual dengan pensil warna"
            },
            key: "B",
            keyText: "B. Menyusun balok-balok kode bergambar (block-based coding) seperti bermain lego",
            explanation: "Scratch menerapkan block-based visual programming sehingga anak-anak belajar logika tanpa takut salah ketik (syntax error)."
        },
        {
            num: 31,
            question: "31. Karakter, benda, atau objek visual yang dapat digerakkan dan diprogram di dalam lembar kerja Scratch disebut ...",
            options: {
                A: "Sprite",
                B: "Stage",
                C: "Backdrop",
                D: "Variable"
            },
            key: "A",
            keyText: "A. Sprite",
            explanation: "Sprite adalah sebutan untuk objek grafis interaktif yang diberi instruksi kode di Scratch."
        },
        {
            num: 32,
            question: "32. Hewan yang menjadi maskot atau ikon karakter default (bawaan awal) saat kita membuka aplikasi Scratch adalah ...",
            options: {
                A: "Anjing lucu",
                B: "Kucing berwarna kuning oranye",
                C: "Gajah berwarna abu-abu",
                D: "Burung hantu berkacamata"
            },
            key: "B",
            keyText: "B. Kucing berwarna kuning oranye",
            explanation: "Scratch Cat (Kucing Oranye) adalah maskot resmi aplikasi Scratch yang dibuat oleh MIT Media Lab."
        },
        {
            num: 33,
            question: "33. Area atau panggung tempat animasi, permainan, atau aksi dari sprite ditampilkan dan dimainkan di Scratch dinamakan ...",
            options: {
                A: "Code Block",
                B: "Script Area",
                C: "Stage",
                D: "Palette"
            },
            key: "C",
            keyText: "C. Stage",
            explanation: "Stage (Panggung) adalah area visual tempat sprite beraksi menjalankan semua skrip yang diprogram."
        },
        {
            num: 34,
            question: "34. Ikon tombol bergambar Bendera Hijau (Green Flag) yang berada di bagian atas layar Scratch berfungsi untuk ...",
            options: {
                A: "Menghapus seluruh proyek yang sudah dibuat",
                B: "Menjalankan atau memulai program dan animasi",
                C: "Menghentikan program seketika",
                D: "Mematikan sambungan internet komputer"
            },
            key: "B",
            keyText: "B. Menjalankan atau memulai program dan animasi",
            explanation: "Bendera Hijau (Green Flag) berfungsi sebagai tombol pemicu 'Start' untuk menjalankan skrip proyek Scratch."
        },
        {
            num: 35,
            question: "35. Tombol berwarna Merah berbentuk segi delapan di samping bendera hijau pada Scratch digunakan untuk ...",
            options: {
                A: "Menyimpan proyek ke komputer",
                B: "Menghentikan jalannya seluruh program (Stop)",
                C: "Menambah karakter baru",
                D: "Memperbesar volume suara"
            },
            key: "B",
            keyText: "B. Menghentikan jalannya seluruh program (Stop)",
            explanation: "Tombol Merah (Stop Sign) digunakan untuk menghentikan seketika seluruh program animasi yang sedang berjalan."
        },
        {
            num: 36,
            question: "36. Gambar latar belakang pemandangan yang menghiasi panggung (Stage) tempat sprite beraksi di Scratch dinamakan ...",
            options: {
                A: "Backdrop",
                B: "Costume",
                C: "Sound",
                D: "Motion"
            },
            key: "A",
            keyText: "A. Backdrop",
            explanation: "Backdrop adalah gambar pemandangan latar belakang yang dipasang pada Stage di Scratch."
        },
        {
            num: 37,
            question: "37. Balok kode perintah 'move 10 steps' dan 'turn right 15 degrees' berada dalam kategori Motion yang ditandai dengan warna ...",
            options: {
                A: "Biru Tua (Blue)",
                B: "Kuning (Yellow)",
                C: "Ungu (Purple)",
                D: "Hijau (Green)"
            },
            key: "A",
            keyText: "A. Biru Tua (Blue)",
            explanation: "Kategori Motion (Gerakan) di Scratch memiliki kode warna Biru Tua."
        },
        {
            num: 38,
            question: "38. Kategori balok kode yang berwarna Ungu (Purple) di Scratch bernama 'Looks'. Fungsi utama dari balok kategori Looks adalah ...",
            options: {
                A: "Mengatur gerakan perpindahan posisi sprite",
                B: "Mengatur tampilan sprite seperti kostum, ukuran, efek visual, dan teks ucapan ('say Hello')",
                C: "Mengatur sensor sentuhan dengan benda lain",
                D: "Melakukan perhitungan penjumlahan dan perkalian"
            },
            key: "B",
            keyText: "B. Mengatur tampilan sprite seperti kostum, ukuran, efek visual, dan teks ucapan ('say Hello')",
            explanation: "Kelompok Looks (Tampilan) berfungsi mengontrol kostum, ukuran, efek warna visual, serta dialog percakapan."
        },
        {
            num: 39,
            question: "39. Balok kode 'play sound Meow until done' digunakan untuk membunyikan suara musik atau rekaman. Balok ini termasuk dalam kategori Sound yang berwarna ...",
            options: {
                A: "Merah Muda / Magenta (Pink/Magenta)",
                B: "Hijau Daun (Green)",
                C: "Biru Langit (Cyan)",
                D: "Hitam Pekat (Black)"
            },
            key: "A",
            keyText: "A. Merah Muda / Magenta (Pink/Magenta)",
            explanation: "Kategori Sound (Suara) di Scratch menggunakan balok berwarna Magenta / Pink kemerahan."
        },
        {
            num: 40,
            question: "40. Balok 'when green flag clicked' (ketika bendera hijau diklik) sangat penting sebagai pemicu awal berjalannya program. Balok tersebut termasuk dalam kategori Events yang ditandai dengan warna ...",
            options: {
                A: "Kuning (Yellow)",
                B: "Biru Tua (Blue)",
                C: "Cokelat (Brown)",
                D: "Merah (Red)"
            },
            key: "A",
            keyText: "A. Kuning (Yellow)",
            explanation: "Kategori Events (Kejadian / Pemicu) di Scratch memiliki warna khas Kuning Emas."
        },
        {
            num: 41,
            question: "41. Balok perintah pengulangan seperti 'repeat 10' dan 'forever' (selamanya) berada di bawah kategori Control. Warna dari kategori Control di Scratch adalah ...",
            options: {
                A: "Oranye (Orange)",
                B: "Hijau Terang (Bright Green)",
                C: "Putih Bersih (White)",
                D: "Abu-abu (Grey)"
            },
            key: "A",
            keyText: "A. Oranye (Orange)",
            explanation: "Kelompok balok Control (Pengulangan & Percabangan) menggunakan balok berwarna Oranye."
        },
        {
            num: 42,
            question: "42. Ketika kita ingin memprogram sprite agar bereaksi saat menyentuh tepi layar atau menyentuh kursor mouse ('touching mouse-pointer?'), kita menggunakan kategori Sensing. Kategori Sensing memiliki balok berwarna ...",
            options: {
                A: "Biru Muda / Sian (Light Blue / Cyan)",
                B: "Oranye Gelap",
                C: "Ungu Tua",
                D: "Kuning Cerah"
            },
            key: "A",
            keyText: "A. Biru Muda / Sian (Light Blue / Cyan)",
            explanation: "Kategori Sensing (Sensor Sentuhan, Jarak & Tombol) memiliki warna khas Biru Muda / Cyan."
        },
        {
            num: 43,
            question: "43. Untuk melakukan operasi matematika seperti penjumlahan (+), pengurangan (-), pengacakan angka (pick random), dan perbandingan logika (> atau <), kita menggunakan balok berkategori Operators yang berwarna ...",
            options: {
                A: "Hijau (Green)",
                B: "Merah Darah (Red)",
                C: "Ungu Muda (Violet)",
                D: "Biru Tua (Navy)"
            },
            key: "A",
            keyText: "A. Hijau (Green)",
            explanation: "Kategori Operators (Operasi Matematika & Logika) di Scratch ditandai dengan warna Hijau Terang."
        },
        {
            num: 44,
            question: "44. Dalam membuat game menangkap apel, kita memerlukan tempat untuk menyimpan angka skor yang bertambah. Fitur untuk menyimpan nilai angka skor tersebut dibuat menggunakan kategori Variables yang berwarna ...",
            options: {
                A: "Oranye Gelap / Cokelat Kemerahan (Dark Orange)",
                B: "Kuning Keemasan",
                C: "Biru Laut",
                D: "Hitam"
            },
            key: "A",
            keyText: "A. Oranye Gelap / Cokelat Kemerahan (Dark Orange)",
            explanation: "Kategori Variables (Variabel penyimpanan data skor, waktu, nyawa) ditandai dengan warna Oranye Gelap."
        },
        {
            num: 45,
            question: "45. Pasangan yang TEPAT antara nama kategori balok Scratch dan warna identitasnya adalah ...",
            options: {
                A: "Motion = Kuning ; Events = Biru Tua",
                B: "Looks = Ungu ; Events = Kuning ; Motion = Biru",
                C: "Control = Hijau ; Operators = Oranye",
                D: "Sound = Biru Muda ; Sensing = Merah Muda"
            },
            key: "B",
            keyText: "B. Looks = Ungu ; Events = Kuning ; Motion = Biru",
            explanation: "Pasangan yang tepat: Looks berwarna Ungu, Events berwarna Kuning, dan Motion berwarna Biru Tua."
        }
    ],

    // ==============================================================
    // BAGIAN II: 5 SOAL URAIAN (BOBOT 30 POIN, SKOR MAKS 100)
    // ==============================================================
    uraian: [
        {
            num: 1,
            question: "1. Sebutkan dan jelaskan secara singkat 4 (empat) pilar utama dalam Berpikir Komputasional (Computational Thinking)! Berikan pula 1 (satu) contoh penerapannya dalam kehidupan sehari-hari anak di rumah (misalnya saat merapikan kamar atau menyiapkan peralatan sekolah)!",
            pointsMax: 20,
            keyRef: "1. Dekomposisi: Memecah masalah besar menjadi bagian kecil. 2. Pengenalan Pola: Melihat kesamaan atau keteraturan. 3. Abstraksi: Fokus pada hal penting dan mengabaikan detail tak berguna. 4. Algoritma: Langkah terurut dan logis. Contoh penerapan: Menyiapkan tas sekolah (Dekomposisi membagi buku & alat tulis; Pola melihat jadwal pelajaran; Abstraksi hanya bawa buku besok; Algoritma memasukkan buku sesuai urutan jam).",
            subInputs: [
                { id: "uraian_k6_1_dekomposisi", label: "Pilar 1 (Dekomposisi):", points: 3 },
                { id: "uraian_k6_1_pola", label: "Pilar 2 (Pengenalan Pola):", points: 3 },
                { id: "uraian_k6_1_abstraksi", label: "Pilar 3 (Abstraksi):", points: 3 },
                { id: "uraian_k6_1_algoritma", label: "Pilar 4 (Algoritma):", points: 3 },
                { id: "uraian_k6_1_contoh", label: "1 Contoh Nyata di Rumah:", points: 8 }
            ]
        },
        {
            num: 2,
            question: "2. Jelaskan perbedaan mendasar antara pilar Dekomposisi dan pilar Abstraksi ketika kamu sedang merencanakan pembuatan sebuah game sederhana di komputer!",
            pointsMax: 20,
            keyRef: "Dekomposisi memecah proyek game besar menjadi bagian-bagian kecil (membuat karakter sprite, menggambar background, aturan skor, efek suara). Sedangkan Abstraksi menyaring hal yang penting untuk diprogram (tombol panah, kecepatan mobil, skor) dan mengabaikan detail yang tidak perlu (pola jahitan baju karakter, warna sepatu penonton, debu di jalan).",
            placeholder: "Jelaskan perbedaan Dekomposisi dan Abstraksi dalam pembuatan game di sini..."
        },
        {
            num: 3,
            question: "3. Susunlah sebuah algoritma langkah demi langkah yang teratur dan logis untuk memprogram seekor sprite kucing di Scratch agar:\na. Berjalan maju sebanyak 10 langkah,\nb. Mengeluarkan bunyi suara 'Meow',\nc. Berbelok/berputar ke arah kanan sebesar 90 derajat!",
            pointsMax: 20,
            keyRef: "Algoritma Scratch: 1. Pasang blok 'When Green Flag Clicked' (Events). 2. Tambahkan blok 'Move 10 steps' (Motion). 3. Tambahkan blok 'Play sound Meow until done' (Sound). 4. Tambahkan blok 'Turn right 90 degrees' (Motion). 5. Program selesai dijalankan.",
            placeholder: "Tuliskan langkah-langkah algoritma Scratch secara runtut di sini..."
        },
        {
            num: 4,
            question: "4. Dalam aplikasi Scratch, terdapat beberapa komponen utama lembar kerja. Jelaskan fungsi dari masing-masing komponen berikut:\na. Sprite\nb. Stage (Panggung)\nc. Tombol Bendera Hijau (Green Flag)\nd. Tombol Lingkaran Merah (Stop)",
            pointsMax: 20,
            keyRef: "a. Sprite: Objek visual atau karakter yang dapat diprogram untuk bergerak dan berinteraksi. b. Stage: Panggung/layar area tempat animasi dan game dimainkan. c. Green Flag: Tombol untuk memulai/menjalankan kode program. d. Tombol Stop Merah: Tombol untuk menghentikan seluruh program yang sedang berjalan.",
            subInputs: [
                { id: "uraian_k6_4_sprite", label: "a. Fungsi Sprite:", points: 5 },
                { id: "uraian_k6_4_stage", label: "b. Fungsi Stage (Panggung):", points: 5 },
                { id: "uraian_k6_4_flag", label: "c. Fungsi Tombol Bendera Hijau:", points: 5 },
                { id: "uraian_k6_4_stop", label: "d. Fungsi Tombol Merah (Stop):", points: 5 }
            ]
        },
        {
            num: 5,
            question: "5. Blok kode di Scratch dikelompokkan berdasarkan fungsinya dengan warna-warna yang berbeda agar mudah dikenali. Sebutkan minimal 5 (lima) kategori balok kode di Scratch, sebutkan warna khasnya masing-masing, dan berikan 1 (satu) contoh balok perintah yang ada di dalamnya!",
            pointsMax: 20,
            keyRef: "1. Motion (Biru Tua) - contoh: move 10 steps. 2. Looks (Ungu) - contoh: say Hello! for 2 secs. 3. Sound (Magenta/Pink) - contoh: play sound Meow until done. 4. Events (Kuning) - contoh: when green flag clicked. 5. Control (Oranye) - contoh: wait 1 secs, repeat 10, forever. (Atau Sensing: Biru Muda, Operators: Hijau, Variables: Oranye Gelap).",
            subInputs: [
                { id: "uraian_k6_5_kategori1", label: "Kategori 1 (Nama, Warna, Contoh):", points: 4 },
                { id: "uraian_k6_5_kategori2", label: "Kategori 2 (Nama, Warna, Contoh):", points: 4 },
                { id: "uraian_k6_5_kategori3", label: "Kategori 3 (Nama, Warna, Contoh):", points: 4 },
                { id: "uraian_k6_5_kategori4", label: "Kategori 4 (Nama, Warna, Contoh):", points: 4 },
                { id: "uraian_k6_5_kategori5", label: "Kategori 5 (Nama, Warna, Contoh):", points: 4 }
            ]
        }
    ]
};
