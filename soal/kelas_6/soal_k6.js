/**
 * BANK SOAL REMEDIAL INFORMATIKA - KELAS 6
 * Kurikulum Merdeka - SD Tzu Chi
 * Folder: d:/Erapot/soal/kelas_6/soal_k6.js
 * Topik: Berpikir Komputasional (Computational Thinking) & Pemrograman Scratch
 *
 * Guru Pengampu: Darningsih, S.T.
 */

window.SOAL_KELAS_6 = {
    metadata: {
        kelas: "6",
        jenjang: "SD",
        mataPelajaran: "Informatika",
        topik: "Computational Thinking & Scratch Programming",
        totalPg: 10,
        bobotPg: 50,
        totalUraian: 5,
        bobotUraian: 50,
        durasiMenit: 60,
        kkm: 80
    },

    // ==========================================
    // BAGIAN I: 10 SOAL PILIHAN GANDA (BOBOT 50)
    // ==========================================
    pg: [
        {
            num: 1,
            question: "1. Deva ingin merayakan pesta ulang tahunnya di rumah. Ia membuat daftar persiapan: (1) Menyiapkan daftar undangan teman, (2) Menyiapkan kue dan makanan kecil, (3) Menghias ruang pesta. Pola berpikir komputasional yang dilakukan Deva adalah...",
            options: {
                A: "Abstraksi",
                B: "Pengenalan pola",
                C: "Dekomposisi",
                D: "Algoritma"
            },
            key: "C",
            keyText: "C. Dekomposisi",
            explanation: "Dekomposisi adalah teknik memecah masalah besar/kompleks menjadi bagian-bagian atau daftar tugas yang lebih kecil dan sederhana."
        },
        {
            num: 2,
            question: "2. Inaya sedang merapikan buku di perpustakaan sekolah. Ia mengelompokkan buku cerita bergambar di rak A, buku pelajaran sains di rak B, dan buku komik petualangan di rak C berdasarkan kesamaan ciri-ciri jenis bukunya. Pola berpikir komputasional yang dilakukan Inaya adalah...",
            options: {
                A: "Pengenalan pola",
                B: "Algoritma",
                C: "Dekomposisi",
                D: "Abstraksi"
            },
            key: "A",
            keyText: "A. Pengenalan pola",
            explanation: "Pengenalan pola (Pattern Recognition) adalah mengenali kesamaan, keteraturan, atau ciri khas serupa pada data/objek."
        },
        {
            num: 3,
            question: "3. William ingin membuat rute perjalanan dari rumah ke sekolah untuk temannya. Ia hanya menggambar garis jalan utama, belokan penting, dan nama jalan, tanpa menggambar pohon, tiang listrik, atau rumah di sekitarnya. Pola berpikir komputasional yang diterapkan William adalah...",
            options: {
                A: "Algoritma",
                B: "Dekomposisi",
                C: "Pengenalan pola",
                D: "Abstraksi"
            },
            key: "D",
            keyText: "D. Abstraksi",
            explanation: "Abstraksi adalah fokus pada informasi yang penting (jalan utama & belokan) dan menyaring/mengabaikan detail-detail yang tidak penting."
        },
        {
            num: 4,
            question: "4. Shevi ingin membuat origami berbentuk pesawat terbang. Ia mengikuti langkah-langkah yang ada di buku petunjuk secara berurutan mulai dari melipat sisi kanan, kiri, hingga membentuk sayap. Pola berpikir komputasional yang dilakukan Shevi adalah...",
            options: {
                A: "Dekomposisi",
                B: "Algoritma",
                C: "Abstraksi",
                D: "Pengenalan pola"
            },
            key: "B",
            keyText: "B. Algoritma",
            explanation: "Algoritma adalah langkah-langkah terurut, sistematis, dan logis untuk menyelesaikan suatu masalah atau pekerjaan."
        },
        {
            num: 5,
            question: "5. Di bawah ini, manakah contoh dalam pembuatan game yang menerapkan prinsip Pengenalan Pola?",
            options: {
                A: "Menghapus detail gambar latar belakang agar game lebih ringan",
                B: "Membagi pekerjaan membuat game menjadi karakter, suara, dan skor",
                C: "Menggunakan logika pergerakan yang sama untuk semua karakter musuh",
                D: "Menuliskan urutan tombol Start dari awal sampai permainan mulai"
            },
            key: "C",
            keyText: "C. Menggunakan logika pergerakan yang sama untuk semua karakter musuh",
            explanation: "Menggunakan logika pergerakan yang sama untuk semua musuh memanfaatkan pola yang berulang (Pattern Recognition)."
        },
        {
            num: 6,
            question: "6. When you say \"Play music\" to a voice assistant, what is the 'Process' phase?",
            options: {
                A: "The speaker plays the song",
                B: "The microphone detects your voice",
                C: "The screen displays the album cover",
                D: "Converting sound to text and searching the song"
            },
            key: "D",
            keyText: "D. Converting sound to text and searching the song",
            explanation: "Tahap Process pada voice assistant adalah memproses suara menjadi teks dan mencari lagu di database sebelum dikeluarkan lewat speaker (output)."
        },
        {
            num: 7,
            question: "7. Which scenario illustrates abstraction rather than pattern recognition?",
            options: {
                A: "Grouping files based on file extensions (.jpg, .mp3)",
                B: "Drawing a subway map that shows only stations and connecting lines",
                C: "Noting that every Monday has heavy traffic at 7:00 AM",
                D: "Identifying recurring shapes in traditional batik patterns"
            },
            key: "B",
            keyText: "B. Drawing a subway map that shows only stations and connecting lines",
            explanation: "Peta rute kereta/subway yang hanya menampilkan stasiun dan garis adalah contoh klasik Abstraksi (menyaring detail yang tidak esensial)."
        },
        {
            num: 8,
            question: "8. When designing an automated cleaning robot, which of the following is the first step when using decomposition?",
            options: {
                A: "Test how fast the robot moves across the room",
                B: "Choose the color and decorative stickers for the robot",
                C: "Program the robot to say \"Cleaned!\" after finishing",
                D: "Divide the cleaning job into three separate sub-tasks: vacuuming, mopping, and obstacle avoidance"
            },
            key: "D",
            keyText: "D. Divide the cleaning job into three separate sub-tasks: vacuuming, mopping, and obstacle avoidance",
            explanation: "Langkah pertama dekomposisi adalah memecah pekerjaan pembersihan menjadi sub-tugas terpisah (menyedot debu, mengepel, hindari rintangan)."
        },
        {
            num: 9,
            question: "9. An AI model is trained with thousands of cat photos labeled \"Cat\" to help it recognize cats. What type of machine learning is this?",
            options: {
                A: "Unsupervised Learning",
                B: "Supervised Learning",
                C: "Reinforcement Learning",
                D: "Semi-supervised Learning"
            },
            key: "B",
            keyText: "B. Supervised Learning",
            explanation: "Supervised Learning menggunakan data latih yang sudah memiliki label (seperti ribuan foto yang berlabel \"Cat\") agar AI belajar mengenali polanya."
        },
        {
            num: 10,
            question: "10. When building a game where a character collects falling coins and avoids obstacles, which decomposition step should be done first?",
            options: {
                A: "Break the game into movement, scoring, and obstacles",
                B: "Draw background decorations and sound effects",
                C: "Publish the game to an online app store",
                D: "Buy a faster computer for programming"
            },
            key: "A",
            keyText: "A. Break the game into movement, scoring, and obstacles",
            explanation: "Dekomposisi awal membuat game adalah memecah struktur inti logika game menjadi: pergerakan pemain, penghitungan skor, dan rintangan."
        }
    ],

    // ==========================================
    // BAGIAN II: 5 SOAL URAIAN (BOBOT 50)
    // ==========================================
    uraian: [
        {
            num: 1,
            question: "11. Tuliskan susunan blok kode di Scratch yang digunakan untuk menggerakkan objek karakter (Sprite) ke kanan dan ke kiri menggunakan tombol panah keyboard!",
            pointsMax: 10,
            keyRef: "Susunan blok kode di Scratch yang menggunakan kejadian tombol ditekan (events): memasang blok When [Green Flag] clicked, diikuti blok forever, lalu kondisi if <key [right arrow] pressed?> then dengan perintah change x by 10, serta kondisi if <key [left arrow] pressed?> then dengan perintah change x by -10 (atau move 10 steps).",
            keywords: ["green flag", "bendera hijau", "forever", "selamanya", "if", "key", "pressed", "panah", "change x", "move", "kanan", "kiri"],
            placeholder: "Tuliskan susunan blok kode Scratch di sini..."
        },
        {
            num: 2,
            question: "12. Tuliskan nama kelompok blok kode (kategori) berdasarkan perintah berikut di Scratch:\nA. next costume\nB. set lives to 0\nC. touching Goblin?\nD. show / hide",
            pointsMax: 10,
            keyRef: "A (next costume): Blok Looks (Tampilan) | B (set lives to 0): Blok Variables (Variabel) | C (touching Goblin?): Blok Sensing (Sensor) | D (show/hide): Blok Looks (Tampilan)",
            subInputs: [
                { id: "uraian_k6_2_a", label: "A. next costume:", expected: "Looks / Tampilan", points: 2.5 },
                { id: "uraian_k6_2_b", label: "B. set lives to 0:", expected: "Variables / Variabel", points: 2.5 },
                { id: "uraian_k6_2_c", label: "C. touching Goblin?:", expected: "Sensing / Sensor", points: 2.5 },
                { id: "uraian_k6_2_d", label: "D. show / hide:", expected: "Looks / Tampilan", points: 2.5 }
            ]
        },
        {
            num: 3,
            question: "13. Tuliskan nama dan fungsi dari 2 ikon tombol di aplikasi Scratch berikut:\n• Gambar A: Ikon Kucing dengan tanda tambah (+)\n• Gambar B: Ikon Pemandangan/Latar dengan tanda tambah (+)",
            pointsMax: 10,
            keyRef: "Gambar A (Ikon Kucing +): Bernama Choose a Sprite (Pilih Sprite), berfungsi untuk menambahkan karakter atau objek baru ke dalam proyek. | Gambar B (Ikon Latar +): Bernama Choose a Backdrop (Pilih Latar Belakang), berfungsi untuk menambahkan gambar latar belakang pada panggung (stage) proyek.",
            subInputs: [
                { id: "uraian_k6_3_a", label: "Gambar A (Ikon Kucing +):", points: 5 },
                { id: "uraian_k6_3_b", label: "Gambar B (Ikon Latar +):", points: 5 }
            ]
        },
        {
            num: 4,
            question: "14. Tuliskan masing-masing 2 contoh perintah blok kode yang terdapat pada kelompok Motion dan Control di Scratch!",
            pointsMax: 10,
            keyRef: "Blok Motion: move 10 steps dan turn right 15 degrees (atau go to x: y:). | Blok Control: wait 1 secs dan repeat 10 (atau forever, if ... then).",
            subInputs: [
                { id: "uraian_k6_4_motion", label: "Contoh Blok Motion:", points: 5 },
                { id: "uraian_k6_4_control", label: "Contoh Blok Control:", points: 5 }
            ]
        },
        {
            num: 5,
            question: "15. Tuliskan 4 pilar Computational Thinking (Berpikir Komputasional) beserta pengertian singkatnya!",
            pointsMax: 10,
            keyRef: "1. Dekomposisi (Decomposition): Memecah masalah besar menjadi bagian lebih kecil. | 2. Pengenalan Pola (Pattern Recognition): Mengenali kesamaan atau keteraturan. | 3. Abstraksi (Abstraction): Fokus pada informasi penting dan mengabaikan yang tidak relevan. | 4. Algoritma (Algorithm): Menyusun langkah-langkah terurut dan logis.",
            subInputs: [
                { id: "uraian_k6_5_dekomposisi", label: "1. Dekomposisi:", points: 2.5 },
                { id: "uraian_k6_5_pola", label: "2. Pengenalan Pola:", points: 2.5 },
                { id: "uraian_k6_5_abstraksi", label: "3. Abstraksi:", points: 2.5 },
                { id: "uraian_k6_5_algoritma", label: "4. Algoritma:", points: 2.5 }
            ]
        }
    ]
};
