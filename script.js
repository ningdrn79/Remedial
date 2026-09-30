/* ===================================================
   PORTAL CODING & AI - MENARIK & LUCU
   JavaScript Logic & Exam System
   SDS CINTA KASIH TZU CHI
   =================================================== */

// Global Audio Context for cute synthesized sound effects
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Play synthesized cute sounds
function playCuteSound(type) {
    if (!soundEnabled) return;
    try {
        initAudio();
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        if (type === 'pop') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
            osc.start(now);
            osc.stop(now + 0.08);
        } else if (type === 'correct') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(523.25, now); // C5
            osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
            osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
            osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.38);
            osc.start(now);
            osc.stop(now + 0.38);
        } else if (type === 'wrong') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(240, now);
            osc.frequency.exponentialRampToValueAtTime(160, now + 0.2);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
        } else if (type === 'fanfare') {
            [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
                const subOsc = audioCtx.createOscillator();
                const subGain = audioCtx.createGain();
                subOsc.connect(subGain);
                subGain.connect(audioCtx.destination);
                subOsc.type = 'triangle';
                subOsc.frequency.setValueAtTime(freq, now + (idx * 0.1));
                subGain.gain.setValueAtTime(0.2, now + (idx * 0.1));
                subGain.gain.linearRampToValueAtTime(0.01, now + (idx * 0.1) + 0.3);
                subOsc.start(now + (idx * 0.1));
                subOsc.stop(now + (idx * 0.1) + 0.3);
            });
        }
    } catch (e) {
        console.log("Audio feedback:", e);
    }
}

// Toggle sound button
document.getElementById('soundToggle').addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    const icon = document.getElementById('soundIcon');
    const text = document.getElementById('soundText');
    if (soundEnabled) {
        icon.className = 'fa-solid fa-volume-high';
        text.innerText = 'Suara: ON';
        showToast('🔊 Suara efek diaktifkan!');
        playCuteSound('pop');
    } else {
        icon.className = 'fa-solid fa-volume-xmark';
        text.innerText = 'Suara: OFF';
        showToast('🔇 Suara dinonaktifkan');
    }
});

// Teacher Mentor quotes & interaction
const teacherQuotes = [
    "“Keindahan sifat manusia terletak pada ketulusan hatinya. Kemuliaan sifat manusia terletak pada kejujuran.” — Master Cheng Yen 💖",
    "Di Microsoft Excel, tanda = (sama dengan) adalah kunci pembuka setiap rumus hebat! 🔑",
    "Ingat ya anak-anak: Kolom itu Huruf vertikal (A, B, C), sedangkan Baris itu Angka horisontal (1, 2, 3)! 📊",
    "Ibu Guru sangat bangga pada kalian yang belajar dengan tekun, jujur, dan penuh semangat! 🌟",
    "Perplexity AI dan Search Engine membantu kita menjadi Detektif Data yang cerdas dan bijak! 🔍",
    "Jangan takut mencoba! Setiap tantangan koding membuat logika berpikir kita semakin hebat! 🚀"
];

function interactTeacher() {
    playCuteSound('pop');
    const bubble = document.getElementById('mascotBubble');
    const randomQuote = teacherQuotes[Math.floor(Math.random() * teacherQuotes.length)];
    if (bubble) {
        bubble.innerHTML = `<span>${randomQuote}</span>`;
    }

    if (window.confetti) {
        confetti({
            particleCount: 30,
            spread: 65,
            origin: { y: 0.35 }
        });
    }
}

// Backward compatibility alias
const interactMascot = interactTeacher;

function cheerUp() {
    playCuteSound('fanfare');
    if (window.confetti) {
        confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.6 }
        });
    }
    showToast('🎉 Semangat! Kerjakan dengan hati tulus dan jujur!');
}

/* ==============================================================
   REMEDIAL KELAS 4 - EXAM SYSTEM LOGIC
   ============================================================== */
let currentStudentData = {
    name: '',
    kelas: '',
    nilaiAwal: 0,
    absen: ''
};

// 60 Minutes Countdown Timer State
let examTimeRemaining = 60 * 60; // 3600 seconds
let examTimerInterval = null;
let examDurationText = '';
let completedExamScores = {
    initial: 0,
    pg: 0,
    uraian: 0,
    final: 0,
    status: 'LULUS REMEDIAL',
    predicate: 'SANGAT MEMUASKAN'
};

function startCountdownTimer() {
    examTimeRemaining = 60 * 60;
    if (examTimerInterval) clearInterval(examTimerInterval);
    updateCountdownUI();

    examTimerInterval = setInterval(() => {
        examTimeRemaining--;
        updateCountdownUI();

        if (examTimeRemaining <= 0) {
            clearInterval(examTimerInterval);
            showToast('⏰ Waktu pengerjaan 60 menit telah habis! Mengirimkan jawaban...');
            playCuteSound('pop');
            const examForm = document.getElementById('k4ExamForm');
            if (examForm) {
                examForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }
        }
    }, 1000);
}

function updateCountdownUI() {
    const timerTag = document.getElementById('examCountdownTag');
    const timerText = document.getElementById('timerText');
    if (!timerText) return;

    const minutes = Math.floor(examTimeRemaining / 60);
    const seconds = examTimeRemaining % 60;
    const formatted = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timerText.innerText = formatted;

    if (timerTag) {
        if (examTimeRemaining <= 300) { // Warning under 5 minutes
            timerTag.classList.add('timer-warning');
        } else {
            timerTag.classList.remove('timer-warning');
        }
    }
}

// Open Kelas 4 Dedicated Exam Modal
function openRemedialKelas4() {
    playCuteSound('pop');
    const modal = document.getElementById('examModalK4');
    modal.classList.add('open');

    // Always start at identity step
    showExamStep('identity');

    document.getElementById('mascotBubble').innerHTML = `<span>Silakan isi nama, nilai awal, dan pilih kelasmu (4A-4E) untuk memulai remedial! Waktu pengerjaan: 60 Menit ⏰</span>`;
}

function closeExamModalK4() {
    playCuteSound('pop');
    if (examTimerInterval) clearInterval(examTimerInterval);
    document.getElementById('examModalK4').classList.remove('open');
}

function showExamStep(stepName) {
    document.getElementById('k4-step-identity').classList.remove('active');
    document.getElementById('k4-step-questions').classList.remove('active');
    document.getElementById('k4-step-result').classList.remove('active');

    document.getElementById(`k4-step-${stepName}`).classList.add('active');

    // Scroll exam container to top
    const modalBody = document.querySelector('.exam-modal-body');
    if (modalBody) modalBody.scrollTop = 0;
}

// Step 1: Start Exam after filling Identity
function startExamK4(event) {
    event.preventDefault();
    playCuteSound('pop');

    const name = document.getElementById('k4Name').value.trim();
    const classChecked = document.querySelector('input[name="k4ClassChoice"]:checked');
    const nilaiAwal = document.getElementById('k4NilaiAwal').value;
    const absen = document.getElementById('k4Absen').value || '-';

    if (!classChecked) {
        showToast('⚠️ Silakan pilih salah satu kelas (4A - 4E)!');
        return;
    }

    currentStudentData = {
        name: name,
        kelas: classChecked.value,
        nilaiAwal: parseInt(nilaiAwal) || 0,
        absen: absen
    };

    // Update sticky exam bar
    document.getElementById('barStudentName').innerText = currentStudentData.name;
    document.getElementById('barStudentClass').innerText = `Kelas ${currentStudentData.kelas}`;
    document.getElementById('barStudentInitialScore').innerText = currentStudentData.nilaiAwal;

    // Start 60 minutes timer
    startCountdownTimer();

    // Show Questions
    showExamStep('questions');
    showToast(`Selamat mengerjakan, ${name}! Waktu: 60 Menit ⏰`);
}

// Answer Keys and Questions Metadata for Pilihan Ganda (10 Soal)
const pgQuestionsMetadata = [
    {
        num: 1,
        question: "1. Apa fungsi utama dari program Microsoft Excel?",
        options: {
            A: "Pengolah Kata",
            B: "Desain Grafis",
            C: "Pengolah Angka dan Tabel",
            D: "Pemutar Video Musik"
        },
        key: 'C',
        keyText: 'C. Pengolah Angka dan Tabel',
        explanation: 'Fungsi utama dari Microsoft Excel adalah sebagai program pengolah angka dan tabel.'
    },
    {
        num: 2,
        question: "2. Bagian lembar kerja Excel yang membujur secara vertikal (ke atas dan ke bawah) ditandai huruf dinamakan...",
        options: {
            A: "Column",
            B: "Row",
            C: "Cell",
            D: "Formula"
        },
        key: 'A',
        keyText: 'A. Column',
        explanation: 'Bagian Excel yang membujur secara vertikal (ke atas dan ke bawah) ditandai dengan huruf dinamakan Column (Kolom).'
    },
    {
        num: 3,
        question: "3. Baris (Row) dalam Microsoft Excel diidentifikasi dengan nomor urut...",
        options: {
            A: "Huruf abjad (A, B, C)",
            B: "Angka (1, 2, 3...)",
            C: "Simbol bintang (*)",
            D: "Warna-warni"
        },
        key: 'B',
        keyText: 'B. Angka (1, 2, 3...)',
        explanation: 'Baris (Row) dalam Microsoft Excel diidentifikasi dengan nomor urut Angka (1, 2, 3, dst).'
    },
    {
        num: 4,
        question: "4. Pengertian 'Data' dalam kehidupan sehari-hari dan komputer adalah...",
        options: {
            A: "Kumpulan informasi berupa angka atau benda",
            B: "Hanya game di handphone",
            C: "Kertas gambar kosong",
            D: "Layar monitor komputer"
        },
        key: 'A',
        keyText: 'A. Kumpulan informasi berupa angka atau benda',
        explanation: 'Data adalah kumpulan informasi atau fakta berupa angka, teks, maupun benda.'
    },
    {
        num: 5,
        question: "5. Rumus dasar di Excel yang berfungsi menjumlahkan total angka adalah...",
        options: {
            A: "SUM()",
            B: "MIN()",
            C: "AVERAGE()",
            D: "MAX()"
        },
        key: 'A',
        keyText: 'A. SUM()',
        explanation: 'Fungsi dasar Excel untuk menjumlahkan total angka adalah SUM().'
    },
    {
        num: 6,
        question: "6. In Microsoft Excel, how are columns identified?",
        options: {
            A: "By letters such as A, B and C ...",
            B: "By numbers such as 1, 2, 3 ...",
            C: "By question marks (?, !, @)",
            D: "By Roman numerals (I, II, III)"
        },
        key: 'A',
        keyText: 'A. By letters such as A, B and C ...',
        explanation: 'In Microsoft Excel, columns are identified by letters (A, B, C...).'
    },
    {
        num: 7,
        question: "7. A horizontal group of cells in Excel is called...",
        options: {
            A: "A formula",
            B: "A sheet",
            C: "A column",
            D: "A row"
        },
        key: 'D',
        keyText: 'D. A row',
        explanation: 'A horizontal group of cells in Excel is called a Row (Baris).'
    },
    {
        num: 8,
        question: "8. Menu pada aplikasi Microsoft Excel yang digunakan untuk menyimpan dokumen kerja adalah...",
        options: {
            A: "Home",
            B: "File",
            C: "Insert",
            D: "View"
        },
        key: 'B',
        keyText: 'B. File',
        explanation: 'Menu untuk menyimpan file di Microsoft Excel adalah menu File (Save / Save As).'
    },
    {
        num: 9,
        question: "9. Aplikasi pencari informasi berbasis kecerdasan buatan (Artificial Intelligence) adalah...",
        options: {
            A: "Paint",
            B: "Calculator",
            C: "Notepad",
            D: "Perplexity AI"
        },
        key: 'D',
        keyText: 'D. Perplexity AI',
        explanation: 'Aplikasi AI pencari informasi berbasis kecerdasan buatan adalah Perplexity AI.'
    },
    {
        num: 10,
        question: "10. In Microsoft Excel, the thin black cross pointer (Autofill) is used for...",
        options: {
            A: "filling continuous data like a series of numbers",
            B: "moving whole rows and columns",
            C: "deleting sheet permanently",
            D: "coloring cells randomly"
        },
        key: 'A',
        keyText: 'A. filling continuous data like a series of numbers',
        explanation: 'Autofill (pointer tanda tambah hitam tipis) berfungsi mengisi data berurutan secara otomatis.'
    }
];

// Helper Keterangan Evaluasi Jawaban Siswa
function getPgKeterangan(isCorrect, keyText, explanation) {
    if (isCorrect) {
        return `✔ Benar (+5 Poin): ${explanation || 'Sesuai konsep Microsoft Excel & AI.'}`;
    } else {
        return `✘ Belum Tepat (0 Poin): Kunci yang benar adalah ${keyText}. ${explanation || 'Pelajari kembali materi terkait.'}`;
    }
}

function getUraianKeterangan(points, defaultText) {
    if (defaultText) return defaultText;
    if (points >= 10) {
        return "✔ Sangat Tepat & Lengkap: Konsep dan penulisan rumus/uraian sesuai standar Microsoft Excel.";
    } else if (points >= 6) {
        return "⚠ Pemahaman Cukup Baik: Konsep dasar dipahami, penulisan rumus/uraian perlu disempurnakan.";
    } else if (points > 0) {
        return "⚠ Jawaban Sebagian: Penjelasan mengarah ke konsep namun belum memenuhi kata kunci esensial.";
    } else {
        return "✘ Belum Tepat: Jawaban belum memenuhi kata kunci konsep/rumus materi Excel.";
    }
}

// Calculate and Show Score
function calculateAndShowScore(event) {
    event.preventDefault();
    playCuteSound('fanfare');

    let pgScore = 0;
    const collectedPgAnswers = [];

    // 1. Evaluate 10 Multiple Choice Questions (Bobot: 5 poin per soal = 50 poin max)
    for (let i = 0; i < pgQuestionsMetadata.length; i++) {
        const item = pgQuestionsMetadata[i];
        const selected = document.querySelector(`input[name="pg_${item.num}"]:checked`);
        const userChoice = selected ? selected.value : '';
        const userChoiceText = userChoice ? `${userChoice}. ${item.options[userChoice] || ''}` : '(Tidak dijawab)';
        const isCorrect = (userChoice === item.key);
        const pts = isCorrect ? 5 : 0;

        if (isCorrect) {
            pgScore += 5;
        }

        const keteranganText = getPgKeterangan(isCorrect, item.keyText, item.explanation);

        collectedPgAnswers.push({
            num: item.num,
            question: item.question,
            userChoice: userChoice || '-',
            userChoiceText: userChoiceText,
            key: item.key,
            keyText: item.keyText,
            explanation: item.explanation,
            isCorrect: isCorrect,
            points: pts,
            keterangan: keteranganText
        });
    }

    // 2. Evaluate 5 Uraian Questions (Bobot: 10 poin per soal = 50 poin max)
    let uraianScore = 0;
    const collectedUraianAnswers = [];

    // Uraian 1: =AVERAGE()
    const rawAns1 = document.getElementById('uraian_1').value.trim();
    const ans1 = rawAns1.toLowerCase();
    const isUraian1Correct = ans1.includes('rata') || ans1.includes('average') || ans1.includes('tengah');
    const u1Pts = isUraian1Correct ? 10 : (ans1.length > 5 ? 6 : (rawAns1.length > 0 ? 3 : 0));
    uraianScore += u1Pts;
    collectedUraianAnswers.push({
        num: 1,
        question: "Jelaskan pengertian dari rumus =AVERAGE()",
        userAnswer: rawAns1 || "(Tidak diisi)",
        keyRef: "Rumus =AVERAGE() digunakan untuk menghitung nilai rata-rata dari sekumpulan angka dalam rentang sel yang ditentukan.",
        points: u1Pts,
        keterangan: getUraianKeterangan(u1Pts)
    });

    // Uraian 2: =SUM()
    const rawAns2 = document.getElementById('uraian_2').value.trim();
    const ans2 = rawAns2.toLowerCase();
    const isUraian2Correct = ans2.includes('jumlah') || ans2.includes('total') || ans2.includes('tambah') || ans2.includes('sum');
    const u2Pts = isUraian2Correct ? 10 : (ans2.length > 5 ? 6 : (rawAns2.length > 0 ? 3 : 0));
    uraianScore += u2Pts;
    collectedUraianAnswers.push({
        num: 2,
        question: "Jelaskan pengertian dari rumus =SUM()",
        userAnswer: rawAns2 || "(Tidak diisi)",
        keyRef: "Rumus =SUM() digunakan untuk menjumlahkan seluruh nilai angka yang ada di dalam rentang sel yang telah ditentukan.",
        points: u2Pts,
        keterangan: getUraianKeterangan(u2Pts)
    });

    // Uraian 3: =COUNT()
    const rawAns3 = document.getElementById('uraian_3').value.trim();
    const ans3 = rawAns3.toLowerCase();
    const isUraian3Correct = ans3.includes('banyak') || ans3.includes('hitung') || ans3.includes('jumlah sel') || ans3.includes('count') || ans3.includes('sel berisi') || ans3.includes('data');
    const u3Pts = isUraian3Correct ? 10 : (ans3.length > 5 ? 6 : (rawAns3.length > 0 ? 3 : 0));
    uraianScore += u3Pts;
    collectedUraianAnswers.push({
        num: 3,
        question: "Jelaskan pengertian dari rumus =COUNT()",
        userAnswer: rawAns3 || "(Tidak diisi)",
        keyRef: "Rumus =COUNT() digunakan untuk menghitung banyaknya sel yang berisi angka dalam rentang yang dipilih (tidak menghitung sel teks/kosong).",
        points: u3Pts,
        keterangan: getUraianKeterangan(u3Pts)
    });

    // Uraian 4: Penunjuk Mouse Tanda Tambah Hitam Tipis (Autofill)
    const rawAns4 = document.getElementById('uraian_4').value.trim();
    const ans4 = rawAns4.toLowerCase();
    const isUraian4Correct = ans4.includes('otomatis') || ans4.includes('urutan') || ans4.includes('berurutan') || ans4.includes('autofill') || ans4.includes('mengisi') || ans4.includes('deret') || ans4.includes('salin') || ans4.includes('copy') || ans4.includes('tarik') || ans4.includes('drag') || ans4.includes('lebar') || ans4.includes('tinggi') || ans4.includes('ukuran');
    const u4Pts = isUraian4Correct ? 10 : (ans4.length > 5 ? 6 : (rawAns4.length > 0 ? 3 : 0));
    uraianScore += u4Pts;
    collectedUraianAnswers.push({
        num: 4,
        question: "Apa fungsi penunjuk mouse berbentuk tanda tambah hitam tipis (Autofill)?",
        userAnswer: rawAns4 || "(Tidak diisi)",
        keyRef: "Berfungsi untuk mengisi data secara otomatis dan berurutan ke sel-sel berikutnya (angka, tanggal, atau pola berulang) dengan cepat.",
        points: u4Pts,
        keterangan: getUraianKeterangan(u4Pts)
    });

    // Uraian 5: Rumus sel E9, E10, E11
    const cleanFormula = str => str.replace(/\s+/g, '').toUpperCase();
    const rawAnsE9 = document.getElementById('uraian_5_e9').value.trim();
    const rawAnsE10 = document.getElementById('uraian_5_e10').value.trim();
    const rawAnsE11 = document.getElementById('uraian_5_e11').value.trim();
    const ansE9 = cleanFormula(rawAnsE9);
    const ansE10 = cleanFormula(rawAnsE10);
    const ansE11 = cleanFormula(rawAnsE11);

    let u5Pts = 0;
    if (ansE9.includes('SUM(E2:E7)') || ansE9.includes('SUM(E3:E8)') || ansE9.includes('SUM(E2:E8)') || (ansE9.includes('SUM') && ansE9.includes('E'))) {
        u5Pts += 4;
    }
    if (ansE10.includes('AVERAGE(E2:E7)') || ansE10.includes('AVERAGE(E3:E8)') || ansE10.includes('AVERAGE(E2:E8)') || (ansE10.includes('AVERAGE') && ansE10.includes('E'))) {
        u5Pts += 3;
    }
    if (ansE11.includes('COUNT(A2:A7)') || ansE11.includes('COUNT(A3:A8)') || ansE11.includes('COUNT(E2:E7)') || ansE11.includes('COUNT(E3:E8)') || ansE11.includes('COUNT')) {
        u5Pts += 3;
    }

    uraianScore += u5Pts;
    collectedUraianAnswers.push({
        num: 5,
        question: "Penulisan Rumus pada Tabel Hewan (Sel E9: Total Kaki, Sel E10: Rata-rata Kaki, Sel E11: Banyak Data)",
        userAnswer: `Sel E9: ${rawAnsE9 || '-'} | Sel E10: ${rawAnsE10 || '-'} | Sel E11: ${rawAnsE11 || '-'}`,
        keyRef: "E9: =SUM(E2:E7) | E10: =AVERAGE(E2:E7) | E11: =COUNT(A2:A7)",
        points: u5Pts,
        keterangan: u5Pts === 10 ? "✔ Penulisan ketiga rumus sel E9, E10, E11 tepat dan sesuai kaidah Excel." : `⚠ Memperoleh ${u5Pts}/10 poin. Periksa kembali penulisan rentang sel dan nama fungsinya.`
    });

    // Hentikan timer pengerjaan 60 menit & catat waktu yang digunakan
    if (examTimerInterval) clearInterval(examTimerInterval);
    const secondsSpent = Math.max(1, (60 * 60) - Math.max(0, examTimeRemaining));
    const minSpent = Math.floor(secondsSpent / 60);
    const secSpent = secondsSpent % 60;
    examDurationText = `${minSpent} Menit ${secSpent} Detik`;

    // Total Score (0 - 100)
    const totalScore = pgScore + uraianScore;
    const studentName = currentStudentData.name || 'Sahabat Pintar';
    const studentClass = currentStudentData.kelas || '4A';

    // Simpan data nilai untuk dicetak ke PDF
    completedExamScores = {
        initial: currentStudentData.nilaiAwal,
        pg: pgScore,
        uraian: uraianScore,
        final: totalScore,
        status: totalScore >= 70 ? 'LULUS REMEDIAL' : 'TUNTAS REMEDIAL',
        predicate: totalScore >= 85 ? 'SANGAT MEMUASKAN' : (totalScore >= 70 ? 'BAIK SEKALI' : 'CUKUP BAIK')
    };

    // Tampilkan Nama & Nilai Akhir dengan TULISAN BESAR
    document.getElementById('scoreStudentSummary').innerText = `${studentName} • Kelas ${studentClass} (Absen: ${currentStudentData.absen})`;
    document.getElementById('hugeFinalScore').innerText = totalScore;

    const mascotIcon = document.getElementById('scoreMascotIcon');
    const predicateBadge = document.getElementById('hugePredicateBadge');
    const motivationTitle = document.getElementById('motivationTitle');
    const motivationMessage = document.getElementById('motivationMessage');

    if (totalScore >= 85) {
        mascotIcon.innerText = '🏆';
        predicateBadge.innerText = '🌟 LULUS REMEDIAL DENGAN GEMILANG!';
        predicateBadge.style.background = 'linear-gradient(135deg, #059669, #10b981)';
        motivationTitle.innerHTML = `Luar Biasa, ${studentName}! Prestasi yang Sangat Membanggakan! 🎉`;
        motivationMessage.innerHTML = `
            Selamat atas keberhasilanmu! Usaha keras, ketelitian, dan ketulusan hatimu dalam belajar Koding dan Kecerdasan Artifisial hari ini membuahkan hasil yang luar biasa!
            <br><br>
            Kamu telah membuktikan bahwa dengan ketekunan, rumus Excel dan logika AI bisa kamu kuasai dengan sangat baik. Teruslah pertahankan semangat belajar yang tinggi dan jadilah inspirasi bagi teman-temanmu! 🚀✨
        `;
    } else if (totalScore >= 70) {
        mascotIcon.innerText = '🎉';
        predicateBadge.innerText = '✨ DINYATAKAN TUNTAS REMEDIAL!';
        predicateBadge.style.background = 'linear-gradient(135deg, #0284c7, #38bdf8)';
        motivationTitle.innerHTML = `Kerja Bagus, ${studentName}! Terus Melangkah Maju! 💡`;
        motivationMessage.innerHTML = `
            Hebat sekali! Skor remedialmu menunjukkan peningkatan pemahaman yang sangat bagus dan menggembirakan.
            <br><br>
            Koding dan logika komputer itu seperti petualangan seru: semakin sering kamu berlatih, pikiranmu akan semakin kreatif dan tangguh! Tetaplah rajin membaca, mempraktikkan rumus-rumus koding, dan jangan pernah ragu untuk terus mencoba hal-hal baru ya! Robi dan Bapak/Ibu Guru sangat bangga padamu! 🌱
        `;
    } else {
        mascotIcon.innerText = '💪';
        predicateBadge.innerText = '📖 TETAP SEMANGAT BELAJAR!';
        predicateBadge.style.background = 'linear-gradient(135deg, #f59e0b, #ea580c)';
        motivationTitle.innerHTML = `Jangan Pernah Menyerah, ${studentName}! Kamu Pasti Bisa! 💖`;
        motivationMessage.innerHTML = `
            Terima kasih banyak sudah berani berusaha dan mengerjakan soal remedial ini dengan jujur dan mandiri!
            <br><br>
            Dalam dunia koding dan teknologi, setiap kesalahan (*bug*) bukanlah kegagalan, melainkan sahabat terbaik yang mengajarkan kita untuk menjadi lebih teliti dan bijaksana. Jangan berkecil hati ya! Tetap tersenyum, teruslah berlatih bersama Bapak/Ibu Guru dan Robi. Selangkah demi selangkah, kamu pasti bisa menjadi juara! 🤖✨
        `;
    }

    // Simpan riwayat pengerjaan siswa & LEMBAR JAWABAN LENGKAP ke Panel Guru (localStorage)
    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    const dateFormatted = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    
    const newStudentRecord = {
        id: 'st_' + Date.now(),
        name: studentName,
        kelas: studentClass,
        absen: currentStudentData.absen,
        nilaiAwal: currentStudentData.nilaiAwal,
        nilaiAkhir: totalScore,
        pgScore: pgScore,
        uraianScore: uraianScore,
        status: totalScore >= 70 ? 'Lulus' : 'Tuntas',
        predicate: completedExamScores.predicate,
        duration: examDurationText,
        timestamp: timeString,
        date: dateFormatted,
        answers: {
            pg: collectedPgAnswers,
            uraian: collectedUraianAnswers
        }
    };

    saveStudentToRecap(newStudentRecord);

    // Trigger celebration confetti
    if (window.confetti) {
        confetti({
            particleCount: 130,
            spread: 95,
            origin: { y: 0.4 }
        });
    }

    // Switch to result view
    showExamStep('result');
    showToast(`Nilai Akhir Remedial: ${totalScore}! 🌟 (Waktu: ${examDurationText})`);
}

// Fungsi Unduh Laporan Remedial Siswa dari Layar Hasil Siswa (PDF Ringkas)
function generateAndDownloadPDF() {
    playCuteSound('pop');
    showToast('📄 Sedang menyusun dokumen PDF...');

    const today = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('id-ID', options);

    // Isi template dokumen dengan data siswa
    document.getElementById('pdfReportName').innerText = currentStudentData.name || 'Siswa';
    document.getElementById('pdfReportClass').innerText = `Kelas ${currentStudentData.kelas || '4A'}`;
    document.getElementById('pdfReportAbsen').innerText = currentStudentData.absen || '-';
    document.getElementById('pdfReportDuration').innerText = `${examDurationText} (Batas: 60 Menit)`;
    document.getElementById('pdfReportDate').innerText = formattedDate;

    document.getElementById('pdfReportInitialScore').innerText = completedExamScores.initial;
    document.getElementById('pdfReportPgScore').innerText = `${completedExamScores.pg} / 50 Poin`;
    document.getElementById('pdfReportUraianScore').innerText = `${completedExamScores.uraian} / 50 Poin`;
    document.getElementById('pdfReportFinalScore').innerText = completedExamScores.final;

    document.getElementById('pdfReportStatus').innerText = completedExamScores.status;
    document.getElementById('pdfReportPredicate').innerText = completedExamScores.predicate;
    document.getElementById('pdfReportLocationDate').innerText = `Jakarta, ${formattedDate}`;

    const element = document.getElementById('pdfDocumentElement');
    const safeStudentName = (currentStudentData.name || 'Siswa').replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `Laporan_Remedial_${safeStudentName}_Kelas_${currentStudentData.kelas}.pdf`;

    if (typeof html2pdf !== 'undefined') {
        const opt = {
            margin: [8, 8, 8, 8],
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, letterRendering: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            playCuteSound('fanfare');
            showToast('✅ Berhasil mengunduh Laporan Remedial (PDF)!');
        }).catch(err => {
            console.error('Error generating PDF:', err);
            window.print();
        });
    } else {
        window.print();
    }
}

// Tombol Kembali ke Menu Utama
function returnToMainMenu() {
    playCuteSound('pop');
    closeExamModalK4();
    showToast('✨ Kembali ke Menu Utama. Terima kasih telah belajar dengan giat!');
}

// Toggle Browser Fullscreen
function toggleScreenExpand() {
    const icon = document.getElementById('fullscreenIcon');
    const text = document.getElementById('fullscreenText');

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            icon.className = 'fa-solid fa-compress';
            text.innerText = 'Keluar Layar Penuh';
            showToast('🖥️ Mode Layar Penuh Diaktifkan');
        }).catch(() => {
            showToast('Layar penuh aktif');
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen().then(() => {
                icon.className = 'fa-solid fa-expand';
                text.innerText = 'Layar Penuh';
            });
        }
    }
}

/* ==============================================================
   DATA SEED DENGAN JAWABAN LENGKAP SISWA
   ============================================================== */
const DEFAULT_STUDENTS_SEED = [
    {
        id: 'seed_1',
        name: 'Budi Santoso',
        kelas: '4A',
        absen: '05',
        nilaiAwal: 60,
        nilaiAkhir: 100,
        pgScore: 50,
        uraianScore: 50,
        status: 'Lulus',
        predicate: 'SANGAT MEMUASKAN',
        duration: '38 Menit 15 Detik',
        timestamp: '07:45 WIB',
        date: '30 September 2026',
        answers: {
            pg: [
                { num: 1, question: "1. Apa fungsi utama dari program Microsoft Excel?", userChoice: 'C', userChoiceText: 'C. Pengolah Angka dan Tabel', key: 'C', keyText: 'C. Pengolah Angka dan Tabel', isCorrect: true, points: 5 },
                { num: 2, question: "2. Bagian lembar kerja Excel yang membujur secara vertikal...", userChoice: 'A', userChoiceText: 'A. Column', key: 'A', keyText: 'A. Column', isCorrect: true, points: 5 },
                { num: 3, question: "3. Baris (Row) dalam Microsoft Excel diidentifikasi dengan...", userChoice: 'B', userChoiceText: 'B. Angka (1, 2, 3...)', key: 'B', keyText: 'B. Angka (1, 2, 3...)', isCorrect: true, points: 5 },
                { num: 4, question: "4. Pengertian 'Data' dalam kehidupan sehari-hari dan komputer...", userChoice: 'A', userChoiceText: 'A. Kumpulan informasi berupa angka atau benda', key: 'A', keyText: 'A. Kumpulan informasi berupa angka atau benda', isCorrect: true, points: 5 },
                { num: 5, question: "5. Rumus dasar di Excel yang berfungsi menjumlahkan total angka...", userChoice: 'A', userChoiceText: 'A. SUM()', key: 'A', keyText: 'A. SUM()', isCorrect: true, points: 5 },
                { num: 6, question: "6. In Microsoft Excel, how are columns identified?", userChoice: 'A', userChoiceText: 'A. By letters such as A, B and C ...', key: 'A', keyText: 'A. By letters such as A, B and C ...', isCorrect: true, points: 5 },
                { num: 7, question: "7. A horizontal group of cells in Excel is called...", userChoice: 'D', userChoiceText: 'D. A row', key: 'D', keyText: 'D. A row', isCorrect: true, points: 5 },
                { num: 8, question: "8. Menu pada aplikasi Microsoft Excel untuk menyimpan dokumen...", userChoice: 'B', userChoiceText: 'B. File', key: 'B', keyText: 'B. File', isCorrect: true, points: 5 },
                { num: 9, question: "9. Aplikasi pencari informasi berbasis kecerdasan buatan...", userChoice: 'D', userChoiceText: 'D. Perplexity AI', key: 'D', keyText: 'D. Perplexity AI', isCorrect: true, points: 5 },
                { num: 10, question: "10. In Microsoft Excel, the thin black cross pointer (Autofill)...", userChoice: 'A', userChoiceText: 'A. filling continuous data like a series of numbers', key: 'A', keyText: 'A. filling continuous data like a series of numbers', isCorrect: true, points: 5 }
            ],
            uraian: [
                { num: 1, question: "Jelaskan pengertian dari rumus =AVERAGE()", userAnswer: "Rumus =AVERAGE() digunakan untuk menghitung nilai rata-rata dari sekumpulan angka yang berada dalam rentang sel yang ditentukan.", points: 10 },
                { num: 2, question: "Jelaskan pengertian dari rumus =SUM()", userAnswer: "Rumus =SUM() digunakan untuk menjumlahkan seluruh nilai angka yang ada di dalam rentang sel yang telah ditentukan.", points: 10 },
                { num: 3, question: "Jelaskan pengertian dari rumus =COUNT()", userAnswer: "Rumus =COUNT() digunakan untuk menghitung banyaknya sel yang berisi angka dalam rentang yang dipilih. Rumus ini tidak menghitung teks maupun sel kosong.", points: 10 },
                { num: 4, question: "Apa fungsi penunjuk mouse berbentuk tanda tambah hitam tipis (Autofill)?", userAnswer: "Berfungsi untuk mengisi data secara otomatis dan berurutan ke sel-sel berikutnya, misalnya urutan angka, tanggal, atau pola data berulang.", points: 10 },
                { num: 5, question: "Penulisan Rumus pada Tabel Hewan", userAnswer: "Sel E9: =SUM(E2:E7) | Sel E10: =AVERAGE(E2:E7) | Sel E11: =COUNT(A2:A7)", points: 10 }
            ]
        }
    },
    {
        id: 'seed_2',
        name: 'Chelsea Olivia',
        kelas: '4B',
        absen: '12',
        nilaiAwal: 65,
        nilaiAkhir: 95,
        pgScore: 50,
        uraianScore: 45,
        status: 'Lulus',
        predicate: 'SANGAT MEMUASKAN',
        duration: '42 Menit 10 Detik',
        timestamp: '08:05 WIB',
        date: '30 September 2026',
        answers: {
            pg: [
                { num: 1, question: "1. Apa fungsi utama dari program Microsoft Excel?", userChoice: 'C', userChoiceText: 'C. Pengolah Angka dan Tabel', key: 'C', keyText: 'C. Pengolah Angka dan Tabel', isCorrect: true, points: 5 },
                { num: 2, question: "2. Bagian lembar kerja Excel yang membujur secara vertikal...", userChoice: 'A', userChoiceText: 'A. Column', key: 'A', keyText: 'A. Column', isCorrect: true, points: 5 },
                { num: 3, question: "3. Baris (Row) dalam Microsoft Excel diidentifikasi dengan...", userChoice: 'B', userChoiceText: 'B. Angka (1, 2, 3...)', key: 'B', keyText: 'B. Angka (1, 2, 3...)', isCorrect: true, points: 5 },
                { num: 4, question: "4. Pengertian 'Data' dalam kehidupan sehari-hari dan komputer...", userChoice: 'A', userChoiceText: 'A. Kumpulan informasi berupa angka atau benda', key: 'A', keyText: 'A. Kumpulan informasi berupa angka atau benda', isCorrect: true, points: 5 },
                { num: 5, question: "5. Rumus dasar di Excel yang berfungsi menjumlahkan total angka...", userChoice: 'A', userChoiceText: 'A. SUM()', key: 'A', keyText: 'A. SUM()', isCorrect: true, points: 5 },
                { num: 6, question: "6. In Microsoft Excel, how are columns identified?", userChoice: 'A', userChoiceText: 'A. By letters such as A, B and C ...', key: 'A', keyText: 'A. By letters such as A, B and C ...', isCorrect: true, points: 5 },
                { num: 7, question: "7. A horizontal group of cells in Excel is called...", userChoice: 'D', userChoiceText: 'D. A row', key: 'D', keyText: 'D. A row', isCorrect: true, points: 5 },
                { num: 8, question: "8. Menu pada aplikasi Microsoft Excel untuk menyimpan dokumen...", userChoice: 'B', userChoiceText: 'B. File', key: 'B', keyText: 'B. File', isCorrect: true, points: 5 },
                { num: 9, question: "9. Aplikasi pencari informasi berbasis kecerdasan buatan...", userChoice: 'D', userChoiceText: 'D. Perplexity AI', key: 'D', keyText: 'D. Perplexity AI', isCorrect: true, points: 5 },
                { num: 10, question: "10. In Microsoft Excel, the thin black cross pointer (Autofill)...", userChoice: 'A', userChoiceText: 'A. filling continuous data like a series of numbers', key: 'A', keyText: 'A. filling continuous data like a series of numbers', isCorrect: true, points: 5 }
            ],
            uraian: [
                { num: 1, question: "Jelaskan pengertian dari rumus =AVERAGE()", userAnswer: "Untuk mencari rata rata angka di sel.", points: 10 },
                { num: 2, question: "Jelaskan pengertian dari rumus =SUM()", userAnswer: "Untuk menjumlahkan total nilai angka dari sel yang kita pilih.", points: 10 },
                { num: 3, question: "Jelaskan pengertian dari rumus =COUNT()", userAnswer: "Untuk menghitung banyak sel yang berisi angka.", points: 10 },
                { num: 4, question: "Apa fungsi penunjuk mouse berbentuk tanda tambah hitam tipis (Autofill)?", userAnswer: "Untuk autofill atau mengisi data urutan angka secara otomatis ke bawah.", points: 10 },
                { num: 5, question: "Penulisan Rumus pada Tabel Hewan", userAnswer: "Sel E9: =SUM(E3:E8) | Sel E10: =AVERAGE(E3:E8) | Sel E11: =COUNT(A3:A8)", points: 5 }
            ]
        }
    },
    {
        id: 'seed_3',
        name: 'David Chen',
        kelas: '4C',
        absen: '08',
        nilaiAwal: 55,
        nilaiAkhir: 90,
        pgScore: 45,
        uraianScore: 45,
        status: 'Lulus',
        predicate: 'SANGAT MEMUASKAN',
        duration: '47 Menit 30 Detik',
        timestamp: '08:15 WIB',
        date: '30 September 2026',
        answers: {
            pg: [
                { num: 1, question: "1. Apa fungsi utama dari program Microsoft Excel?", userChoice: 'C', userChoiceText: 'C. Pengolah Angka dan Tabel', key: 'C', keyText: 'C. Pengolah Angka dan Tabel', isCorrect: true, points: 5 },
                { num: 2, question: "2. Bagian lembar kerja Excel yang membujur secara vertikal...", userChoice: 'A', userChoiceText: 'A. Column', key: 'A', keyText: 'A. Column', isCorrect: true, points: 5 },
                { num: 3, question: "3. Baris (Row) dalam Microsoft Excel diidentifikasi dengan...", userChoice: 'B', userChoiceText: 'B. Angka (1, 2, 3...)', key: 'B', keyText: 'B. Angka (1, 2, 3...)', isCorrect: true, points: 5 },
                { num: 4, question: "4. Pengertian 'Data' dalam kehidupan sehari-hari dan komputer...", userChoice: 'A', userChoiceText: 'A. Kumpulan informasi berupa angka atau benda', key: 'A', keyText: 'A. Kumpulan informasi berupa angka atau benda', isCorrect: true, points: 5 },
                { num: 5, question: "5. Rumus dasar di Excel yang berfungsi menjumlahkan total angka...", userChoice: 'A', userChoiceText: 'A. SUM()', key: 'A', keyText: 'A. SUM()', isCorrect: true, points: 5 },
                { num: 6, question: "6. In Microsoft Excel, how are columns identified?", userChoice: 'A', userChoiceText: 'A. By letters such as A, B and C ...', key: 'A', keyText: 'A. By letters such as A, B and C ...', isCorrect: true, points: 5 },
                { num: 7, question: "7. A horizontal group of cells in Excel is called...", userChoice: 'C', userChoiceText: 'C. A column', key: 'D', keyText: 'D. A row', isCorrect: false, points: 0 },
                { num: 8, question: "8. Menu pada aplikasi Microsoft Excel untuk menyimpan dokumen...", userChoice: 'B', userChoiceText: 'B. File', key: 'B', keyText: 'B. File', isCorrect: true, points: 5 },
                { num: 9, question: "9. Aplikasi pencari informasi berbasis kecerdasan buatan...", userChoice: 'D', userChoiceText: 'D. Perplexity AI', key: 'D', keyText: 'D. Perplexity AI', isCorrect: true, points: 5 },
                { num: 10, question: "10. In Microsoft Excel, the thin black cross pointer (Autofill)...", userChoice: 'A', userChoiceText: 'A. filling continuous data like a series of numbers', key: 'A', keyText: 'A. filling continuous data like a series of numbers', isCorrect: true, points: 5 }
            ],
            uraian: [
                { num: 1, question: "Jelaskan pengertian dari rumus =AVERAGE()", userAnswer: "Rumus =AVERAGE() berguna untuk menghitung nilai rata-rata dari data angka yang dipilih.", points: 10 },
                { num: 2, question: "Jelaskan pengertian dari rumus =SUM()", userAnswer: "Rumus =SUM() digunakan untuk menjumlahkan semua angka dalam rentang sel.", points: 10 },
                { num: 3, question: "Jelaskan pengertian dari rumus =COUNT()", userAnswer: "Rumus =COUNT() berguna untuk menghitung jumlah sel yang terisi angka.", points: 10 },
                { num: 4, question: "Apa fungsi penunjuk mouse berbentuk tanda tambah hitam tipis (Autofill)?", userAnswer: "Berfungsi untuk mengisi data otomatis seperti urutan angka 1, 2, 3 dst.", points: 10 },
                { num: 5, question: "Penulisan Rumus pada Tabel Hewan", userAnswer: "Sel E9: =SUM(E2:E7) | Sel E10: =AVERAGE(E2:E7) | Sel E11: =COUNT(A2:A7)", points: 5 }
            ]
        }
    },
    {
        id: 'seed_4',
        name: 'Evelyn Wijaya',
        kelas: '4D',
        absen: '14',
        nilaiAwal: 62,
        nilaiAkhir: 85,
        pgScore: 45,
        uraianScore: 40,
        status: 'Lulus',
        predicate: 'SANGAT MEMUASKAN',
        duration: '51 Menit 20 Detik',
        timestamp: '08:22 WIB',
        date: '30 September 2026',
        answers: {
            pg: [
                { num: 1, question: "1. Apa fungsi utama dari program Microsoft Excel?", userChoice: 'C', userChoiceText: 'C. Pengolah Angka dan Tabel', key: 'C', keyText: 'C. Pengolah Angka dan Tabel', isCorrect: true, points: 5 },
                { num: 2, question: "2. Bagian lembar kerja Excel yang membujur secara vertikal...", userChoice: 'A', userChoiceText: 'A. Column', key: 'A', keyText: 'A. Column', isCorrect: true, points: 5 },
                { num: 3, question: "3. Baris (Row) dalam Microsoft Excel diidentifikasi dengan...", userChoice: 'B', userChoiceText: 'B. Angka (1, 2, 3...)', key: 'B', keyText: 'B. Angka (1, 2, 3...)', isCorrect: true, points: 5 },
                { num: 4, question: "4. Pengertian 'Data' dalam kehidupan sehari-hari dan komputer...", userChoice: 'A', userChoiceText: 'A. Kumpulan informasi berupa angka atau benda', key: 'A', keyText: 'A. Kumpulan informasi berupa angka atau benda', isCorrect: true, points: 5 },
                { num: 5, question: "5. Rumus dasar di Excel yang berfungsi menjumlahkan total angka...", userChoice: 'A', userChoiceText: 'A. SUM()', key: 'A', keyText: 'A. SUM()', isCorrect: true, points: 5 },
                { num: 6, question: "6. In Microsoft Excel, how are columns identified?", userChoice: 'B', userChoiceText: 'B. By numbers such as 1, 2, 3 ...', key: 'A', keyText: 'A. By letters such as A, B and C ...', isCorrect: false, points: 0 },
                { num: 7, question: "7. A horizontal group of cells in Excel is called...", userChoice: 'D', userChoiceText: 'D. A row', key: 'D', keyText: 'D. A row', isCorrect: true, points: 5 },
                { num: 8, question: "8. Menu pada aplikasi Microsoft Excel untuk menyimpan dokumen...", userChoice: 'B', userChoiceText: 'B. File', key: 'B', keyText: 'B. File', isCorrect: true, points: 5 },
                { num: 9, question: "9. Aplikasi pencari informasi berbasis kecerdasan buatan...", userChoice: 'D', userChoiceText: 'D. Perplexity AI', key: 'D', keyText: 'D. Perplexity AI', isCorrect: true, points: 5 },
                { num: 10, question: "10. In Microsoft Excel, the thin black cross pointer (Autofill)...", userChoice: 'A', userChoiceText: 'A. filling continuous data like a series of numbers', key: 'A', keyText: 'A. filling continuous data like a series of numbers', isCorrect: true, points: 5 }
            ],
            uraian: [
                { num: 1, question: "Jelaskan pengertian dari rumus =AVERAGE()", userAnswer: "Untuk mencari rata rata.", points: 10 },
                { num: 2, question: "Jelaskan pengertian dari rumus =SUM()", userAnswer: "Untuk menjumlahkan angka di sel.", points: 10 },
                { num: 3, question: "Jelaskan pengertian dari rumus =COUNT()", userAnswer: "Untuk menghitung banyak sel.", points: 10 },
                { num: 4, question: "Apa fungsi penunjuk mouse berbentuk tanda tambah hitam tipis (Autofill)?", userAnswer: "Mengisi angka otomatis secara berurutan.", points: 10 },
                { num: 5, question: "Penulisan Rumus pada Tabel Hewan", userAnswer: "Sel E9: =SUM(E2:E7) | Sel E10: =AVERAGE(E2:E7) | Sel E11: =COUNT(A2:A7)", points: 0 }
            ]
        }
    },
    {
        id: 'seed_5',
        name: 'Farel Pratama',
        kelas: '4E',
        absen: '19',
        nilaiAwal: 58,
        nilaiAkhir: 88,
        pgScore: 50,
        uraianScore: 38,
        status: 'Lulus',
        predicate: 'SANGAT MEMUASKAN',
        duration: '45 Menit 10 Detik',
        timestamp: '08:30 WIB',
        date: '30 September 2026',
        answers: {
            pg: [
                { num: 1, question: "1. Apa fungsi utama dari program Microsoft Excel?", userChoice: 'C', userChoiceText: 'C. Pengolah Angka dan Tabel', key: 'C', keyText: 'C. Pengolah Angka dan Tabel', isCorrect: true, points: 5 },
                { num: 2, question: "2. Bagian lembar kerja Excel yang membujur secara vertikal...", userChoice: 'A', userChoiceText: 'A. Column', key: 'A', keyText: 'A. Column', isCorrect: true, points: 5 },
                { num: 3, question: "3. Baris (Row) dalam Microsoft Excel diidentifikasi dengan...", userChoice: 'B', userChoiceText: 'B. Angka (1, 2, 3...)', key: 'B', keyText: 'B. Angka (1, 2, 3...)', isCorrect: true, points: 5 },
                { num: 4, question: "4. Pengertian 'Data' dalam kehidupan sehari-hari dan komputer...", userChoice: 'A', userChoiceText: 'A. Kumpulan informasi berupa angka atau benda', key: 'A', keyText: 'A. Kumpulan informasi berupa angka atau benda', isCorrect: true, points: 5 },
                { num: 5, question: "5. Rumus dasar di Excel yang berfungsi menjumlahkan total angka...", userChoice: 'A', userChoiceText: 'A. SUM()', key: 'A', keyText: 'A. SUM()', isCorrect: true, points: 5 },
                { num: 6, question: "6. In Microsoft Excel, how are columns identified?", userChoice: 'A', userChoiceText: 'A. By letters such as A, B and C ...', key: 'A', keyText: 'A. By letters such as A, B and C ...', isCorrect: true, points: 5 },
                { num: 7, question: "7. A horizontal group of cells in Excel is called...", userChoice: 'D', userChoiceText: 'D. A row', key: 'D', keyText: 'D. A row', isCorrect: true, points: 5 },
                { num: 8, question: "8. Menu pada aplikasi Microsoft Excel untuk menyimpan dokumen...", userChoice: 'B', userChoiceText: 'B. File', key: 'B', keyText: 'B. File', isCorrect: true, points: 5 },
                { num: 9, question: "9. Aplikasi pencari informasi berbasis kecerdasan buatan...", userChoice: 'D', userChoiceText: 'D. Perplexity AI', key: 'D', keyText: 'D. Perplexity AI', isCorrect: true, points: 5 },
                { num: 10, question: "10. In Microsoft Excel, the thin black cross pointer (Autofill)...", userChoice: 'A', userChoiceText: 'A. filling continuous data like a series of numbers', key: 'A', keyText: 'A. filling continuous data like a series of numbers', isCorrect: true, points: 5 }
            ],
            uraian: [
                { num: 1, question: "Jelaskan pengertian dari rumus =AVERAGE()", userAnswer: "Menghitung rata-rata sekumpulan angka.", points: 10 },
                { num: 2, question: "Jelaskan pengertian dari rumus =SUM()", userAnswer: "Menjumlahkan seluruh angka di rentang sel.", points: 10 },
                { num: 3, question: "Jelaskan pengertian dari rumus =COUNT()", userAnswer: "Menghitung banyaknya sel yang ada angkanya.", points: 10 },
                { num: 4, question: "Apa fungsi penunjuk mouse berbentuk tanda tambah hitam tipis (Autofill)?", userAnswer: "Menarik dan mengisi deret angka otomatis.", points: 8 },
                { num: 5, question: "Penulisan Rumus pada Tabel Hewan", userAnswer: "E9: =SUM(E2:E7), E10: =AVERAGE(E2:E7)", points: 0 }
            ]
        }
    }
];

let teacherActiveFilter = 'SEMUA';
let teacherSearchQuery = '';
let currentPreviewStudentId = null;

function getRecapList() {
    try {
        const stored = localStorage.getItem('remedial_tzuchi_k4');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch (e) {
        console.log(e);
    }
    // Jika belum ada data, simpan seed default
    localStorage.setItem('remedial_tzuchi_k4', JSON.stringify(DEFAULT_STUDENTS_SEED));
    return DEFAULT_STUDENTS_SEED;
}

function saveStudentToRecap(newStudent) {
    const list = getRecapList();
    list.unshift(newStudent);
    try {
        localStorage.setItem('remedial_tzuchi_k4', JSON.stringify(list));
    } catch (e) {
        console.log(e);
    }
}

/* ==============================================================
   TEACHER PORTAL LOGIC (TERSEMBUNYI KHUSUS GURU)
   ============================================================== */
function openTeacherPortal() {
    playCuteSound('pop');
    const modal = document.getElementById('teacherPortalModal');
    if (!modal) return;
    modal.classList.add('open');
    renderTeacherTable();
    showToast('🔒 Membuka Panel Khusus Guru...');
}

function closeTeacherPortal() {
    playCuteSound('pop');
    const modal = document.getElementById('teacherPortalModal');
    if (modal) modal.classList.remove('open');
}

function filterTeacherTable(className) {
    playCuteSound('pop');
    teacherActiveFilter = className;

    document.querySelectorAll('.t-filter-tab').forEach(tab => {
        tab.classList.toggle('active', tab.innerText.includes(className) || (className === 'SEMUA' && tab.innerText.includes('Semua')));
    });

    renderTeacherTable();
}

function searchTeacherTable() {
    const input = document.getElementById('teacherSearchInput');
    teacherSearchQuery = input ? input.value.trim().toLowerCase() : '';
    renderTeacherTable();
}

function renderTeacherTable() {
    const list = getRecapList();
    const tbody = document.getElementById('teacherTableBody');
    const emptyNotice = document.getElementById('teacherEmptyState');

    if (!tbody) return;

    // Filter by Class and Search Query
    const filtered = list.filter(item => {
        const matchesClass = (teacherActiveFilter === 'SEMUA') || (item.kelas === teacherActiveFilter);
        const nameMatches = (item.name || '').toLowerCase().includes(teacherSearchQuery);
        const absenMatches = (item.absen || '').toLowerCase().includes(teacherSearchQuery);
        return matchesClass && (nameMatches || absenMatches);
    });

    // Update Teacher Quick Metrics
    const totalStudentsElem = document.getElementById('teacherTotalStudents');
    const avgScoreElem = document.getElementById('teacherAverageScore');
    const highestScoreElem = document.getElementById('teacherHighestScore');
    const passedCountElem = document.getElementById('teacherPassedCount');

    if (totalStudentsElem) totalStudentsElem.innerText = list.length;
    if (list.length > 0) {
        const totalSum = list.reduce((acc, curr) => acc + Number(curr.nilaiAkhir || 0), 0);
        const maxScore = Math.max(...list.map(curr => Number(curr.nilaiAkhir || 0)));
        const passedCount = list.filter(curr => Number(curr.nilaiAkhir || 0) >= 70).length;
        const passRate = Math.round((passedCount / list.length) * 100);

        if (avgScoreElem) avgScoreElem.innerText = Math.round(totalSum / list.length);
        if (highestScoreElem) highestScoreElem.innerText = maxScore;
        if (passedCountElem) passedCountElem.innerText = `${passRate}% (${passedCount}/${list.length})`;
    }

    if (filtered.length === 0) {
        tbody.innerHTML = '';
        if (emptyNotice) emptyNotice.style.display = 'block';
        return;
    }

    if (emptyNotice) emptyNotice.style.display = 'none';

    tbody.innerHTML = filtered.map((st, idx) => `
        <tr>
            <td style="color: #64748b; font-weight: 700;">#${idx + 1}</td>
            <td>
                <strong>${st.name}</strong>
            </td>
            <td><span class="class-tag">Kelas ${st.kelas}</span></td>
            <td><strong>${st.absen || '-'}</strong></td>
            <td><span style="color: #64748b; font-weight: 700;">${st.nilaiAwal}</span></td>
            <td>
                <span class="score-badge-cell">${st.nilaiAkhir}</span>
            </td>
            <td>
                <span style="font-size: 0.85rem; color: #475569; display: block; font-weight: 600;">${st.timestamp || '-'}</span>
                <small style="font-size: 0.76rem; color: #94a3b8;">${st.duration || '60 Menit'}</small>
            </td>
            <td>
                <span class="status-badge-cell ${st.nilaiAkhir >= 70 ? 'status-lulus' : 'status-tuntas'}">
                    <i class="fa-solid fa-circle-check"></i> ${st.status || 'Lulus'}
                </span>
            </td>
            <td class="text-center">
                <div class="teacher-actions-cell">
                    <button class="btn-action-pdf" onclick="downloadStudentFullAnswersPDF('${st.id}')" title="Unduh Lembar Hasil & Jawaban Lengkap (PDF)">
                        <i class="fa-solid fa-file-pdf"></i> Unduh PDF Jawaban
                    </button>
                    <button class="btn-action-preview" onclick="previewStudentAnswers('${st.id}')" title="Lihat Lembar Jawaban Siswa">
                        <i class="fa-solid fa-eye"></i> Lihat
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

/* ==============================================================
   FUNGSI UNDUH LEMBAR HASIL & JAWABAN LENGKAP SISWA (PDF RESMI)
   ============================================================== */
function downloadStudentFullAnswersPDF(studentId) {
    playCuteSound('pop');
    showToast('📄 Sedang menyusun PDF Lembar Jawaban...');

    const list = getRecapList();
    const student = list.find(s => String(s.id) === String(studentId)) || list[0];
    if (!student) {
        showToast('⚠️ Data siswa tidak ditemukan');
        return;
    }

    const todayDate = student.date || (new Date()).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    // 1. Isi Data Identitas Dokumen
    document.getElementById('pdfAnsDocName').innerText = student.name;
    document.getElementById('pdfAnsDocClass').innerText = `Kelas ${student.kelas}`;
    document.getElementById('pdfAnsDocAbsen').innerText = student.absen || '-';
    document.getElementById('pdfAnsDocDuration').innerText = student.duration || `${student.timestamp || ''}`;
    document.getElementById('pdfAnsDocDate').innerText = todayDate;
    document.getElementById('pdfAnsDocNilaiAwal').innerText = student.nilaiAwal;

    // 2. Isi Capaian Nilai
    const pgPts = student.pgScore !== undefined ? student.pgScore : (student.answers ? student.answers.pg.reduce((a, b) => a + (b.points || 0), 0) : 50);
    const uraianPts = student.uraianScore !== undefined ? student.uraianScore : (student.answers ? student.answers.uraian.reduce((a, b) => a + (b.points || 0), 0) : Math.max(0, student.nilaiAkhir - pgPts));
    
    document.getElementById('pdfAnsDocPgScore').innerText = `${pgPts} Poin`;
    document.getElementById('pdfAnsDocUraianScore').innerText = `${uraianPts} Poin`;
    document.getElementById('pdfAnsDocFinalScore').innerText = student.nilaiAkhir;

    document.getElementById('pdfAnsDocStatus').innerText = student.nilaiAkhir >= 70 ? 'LULUS REMEDIAL' : 'TUNTAS REMEDIAL';
    document.getElementById('pdfAnsDocPredicate').innerText = student.predicate || (student.nilaiAkhir >= 85 ? 'SANGAT MEMUASKAN' : 'BAIK');
    document.getElementById('pdfAnsDocSignDate').innerText = `Jakarta, ${todayDate}`;

    // 3. Render Lembar Jawaban PG (10 Soal)
    const pgBody = document.getElementById('pdfAnsDocPgBody');
    const pgAnswers = (student.answers && student.answers.pg) ? student.answers.pg : [];

    if (pgAnswers.length > 0) {
        pgBody.innerHTML = pgAnswers.map(item => `
            <tr>
                <td class="text-center" style="font-weight: 700; color: #475569;">${item.num}</td>
                <td><strong>${item.question}</strong></td>
                <td><span style="color: #0f766e; font-weight: 700;">${item.userChoiceText || item.userChoice}</span></td>
                <td style="color: #334155;">${item.keyText || item.key}</td>
                <td class="text-center">
                    <strong style="color: ${item.isCorrect ? '#15803d' : '#dc2626'}; font-size: 9.5pt;">
                        ${item.points !== undefined ? item.points : (item.isCorrect ? 5 : 0)} Poin
                    </strong>
                </td>
                <td style="font-size: 8.5pt; color: #334155; line-height: 1.35;">
                    ${item.keterangan || getPgKeterangan(item.isCorrect, item.keyText, item.explanation)}
                </td>
            </tr>
        `).join('');
    } else {
        pgBody.innerHTML = `<tr><td colspan="6" class="text-center">10 Soal Pilihan Ganda telah dijawab dengan skor: ${pgPts} / 50</td></tr>`;
    }

    // 4. Render Lembar Jawaban Uraian (5 Soal)
    const uraianBody = document.getElementById('pdfAnsDocUraianBody');
    const uraianAnswers = (student.answers && student.answers.uraian) ? student.answers.uraian : [];

    if (uraianAnswers.length > 0) {
        uraianBody.innerHTML = uraianAnswers.map(item => `
            <div class="pdf-uraian-item-box">
                <div class="pdf-uraian-q-title">
                    <span>Soal ${item.num}. ${item.question}</span>
                    <span style="float: right; background: ${item.points >= 7 ? '#dcfce7' : (item.points >= 5 ? '#fef3c7' : '#fee2e2')}; color: ${item.points >= 7 ? '#166534' : (item.points >= 5 ? '#b45309' : '#b91c1c')}; padding: 2px 8px; border-radius: 4px; font-weight: 800; font-size: 8.5pt;">
                        Score: ${item.points !== undefined ? item.points : 10} / 10 Poin
                    </span>
                </div>
                <div class="pdf-uraian-ans-content">
                    <p style="margin: 0 0 5px 0;"><strong>Jawaban Siswa:</strong> <span style="color: #0f766e; font-weight: 700;">"${item.userAnswer}"</span></p>
                    <p style="margin: 0 0 5px 0; color: #475569; font-size: 8.5pt;"><strong>Kunci / Alternatif Standar:</strong> ${item.keyRef || '-'}</p>
                    <div style="background: #f8fafc; border-left: 3px solid ${item.points >= 7 ? '#10b981' : (item.points >= 5 ? '#f59e0b' : '#ef4444')}; padding: 4px 8px; font-size: 8.5pt; color: #1e293b; margin-top: 3px;">
                        <strong>Keterangan Evaluasi:</strong> ${item.keterangan || getUraianKeterangan(item.points)}
                    </div>
                </div>
            </div>
        `).join('');
    } else {
        uraianBody.innerHTML = `<div class="pdf-uraian-item-box"><div class="pdf-uraian-ans-content">5 Soal Uraian Mandiri telah diselesaikan dengan skor: ${uraianPts} / 50</div></div>`;
    }

    // 5. Unduh menggunakan html2pdf
    const element = document.getElementById('studentFullAnswersPdfDoc');
    const safeStudentName = (student.name || 'Siswa').replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `Lembar_Jawaban_Remedial_${safeStudentName}_Kelas_${student.kelas}.pdf`;

    if (typeof html2pdf !== 'undefined') {
        const opt = {
            margin: [8, 8, 8, 8],
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, letterRendering: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            playCuteSound('fanfare');
            showToast(`✅ Berhasil mengunduh Lembar Jawaban ${student.name} (PDF)!`);
        }).catch(err => {
            console.error('Error generating full answers PDF:', err);
            window.print();
        });
    } else {
        window.print();
    }
}

/* ==============================================================
   POPUP PREVIEW LEMBAR JAWABAN SISWA (UNTUK GURU)
   ============================================================== */
function previewStudentAnswers(studentId) {
    playCuteSound('pop');
    const list = getRecapList();
    const student = list.find(s => String(s.id) === String(studentId));
    if (!student) {
        showToast('⚠️ Data siswa tidak ditemukan');
        return;
    }

    currentPreviewStudentId = studentId;

    document.getElementById('previewStudentHeader').innerText = `Lembar Jawaban: ${student.name}`;
    document.getElementById('previewStudentSub').innerText = `Kelas ${student.kelas} • No. Absen: ${student.absen || '-'} • Nilai Akhir: ${student.nilaiAkhir} (${student.status || 'Lulus'})`;

    const container = document.getElementById('answersPreviewContent');
    const pgAnswers = (student.answers && student.answers.pg) ? student.answers.pg : [];
    const uraianAnswers = (student.answers && student.answers.uraian) ? student.answers.uraian : [];

    let html = `
        <div style="background: #f1f5f9; padding: 0.8rem 1.2rem; border-radius: 12px; margin-bottom: 1.2rem; display: flex; justify-content: space-between; align-items: center; border: 1.5px solid #cbd5e1;">
            <div>
                <strong>Nilai Awal:</strong> ${student.nilaiAwal} | 
                <strong>Nilai PG:</strong> ${student.pgScore || 50}/50 | 
                <strong>Nilai Uraian:</strong> ${student.uraianScore || 50}/50 | 
                <strong>Waktu:</strong> ${student.duration || student.timestamp}
            </div>
            <div>
                <span class="score-badge-cell" style="font-size: 1.1rem; padding: 0.3rem 0.8rem;">Total: ${student.nilaiAkhir}</span>
            </div>
        </div>

        <h4 class="preview-section-title"><i class="fa-solid fa-list-check"></i> Bagian I: Jawaban Pilihan Ganda (10 Nomor)</h4>
    `;

    if (pgAnswers.length > 0) {
        html += pgAnswers.map(item => `
            <div class="preview-pg-item ${item.isCorrect ? 'correct' : 'wrong'}">
                <div class="preview-q-text">${item.question}</div>
                <div class="preview-ans-row">
                    <span class="preview-user-ans"><strong>Jawaban Siswa:</strong> ${item.userChoiceText || item.userChoice}</span>
                    <span class="preview-key-ans"><strong>Kunci:</strong> ${item.keyText || item.key}</span>
                    <span style="font-weight: 800; color: ${item.isCorrect ? '#16a34a' : '#dc2626'};">
                        Score: ${item.points !== undefined ? item.points : (item.isCorrect ? 5 : 0)} Poin
                    </span>
                </div>
                <div style="font-size: 0.82rem; color: #475569; margin-top: 3px; background: #ffffff; padding: 4px 8px; border-radius: 6px;">
                    <strong>Keterangan:</strong> ${item.keterangan || getPgKeterangan(item.isCorrect, item.keyText, item.explanation)}
                </div>
            </div>
        `).join('');
    } else {
        html += `<p style="color: #64748b;">Jawaban pilihan ganda tercatat nilai: ${student.pgScore || 50} poin.</p>`;
    }

    html += `<h4 class="preview-section-title" style="margin-top: 1.5rem;"><i class="fa-solid fa-pen-nib"></i> Bagian II: Jawaban Soal Uraian (5 Nomor)</h4>`;

    if (uraianAnswers.length > 0) {
        html += uraianAnswers.map(item => `
            <div class="preview-uraian-item">
                <div class="preview-uraian-q">
                    Soal ${item.num}. ${item.question}
                    <span style="float: right; background: #dcfce7; color: #166534; font-size: 0.85rem; font-weight: 800; padding: 2px 8px; border-radius: 6px;">
                        Score: ${item.points !== undefined ? item.points : 10} / 10 Poin
                    </span>
                </div>
                <div class="preview-uraian-box">
                    <p style="margin: 0 0 5px 0;"><strong>Jawaban Siswa:</strong> <span style="color: #0f766e; font-weight: 700;">"${item.userAnswer}"</span></p>
                    <p style="margin: 0 0 5px 0; color: #475569; font-size: 0.85rem;"><strong>Kunci Standar:</strong> ${item.keyRef || '-'}</p>
                    <div style="background: #f8fafc; border-left: 3px solid ${item.points >= 7 ? '#10b981' : '#f59e0b'}; padding: 4px 8px; border-radius: 4px; font-size: 0.84rem; color: #1e293b;">
                        <strong>Keterangan:</strong> ${item.keterangan || getUraianKeterangan(item.points)}
                    </div>
                </div>
            </div>
        `).join('');
    } else {
        html += `<p style="color: #64748b;">Jawaban uraian siswa tercatat nilai: ${student.uraianScore || 50} poin.</p>`;
    }

    container.innerHTML = html;
    document.getElementById('answersPreviewModal').classList.add('open');
}

function closeAnswersPreview() {
    playCuteSound('pop');
    document.getElementById('answersPreviewModal').classList.remove('open');
}

function downloadCurrentPreviewPDF() {
    if (currentPreviewStudentId) {
        downloadStudentFullAnswersPDF(currentPreviewStudentId);
    }
}

/* ==============================================================
   EXPORT REKAPITULASI KE EXCEL (CSV)
   ============================================================== */
function exportRecapToCSV() {
    playCuteSound('pop');
    const list = getRecapList();
    if (!list || list.length === 0) {
        showToast('⚠️ Belum ada data untuk diekspor!');
        return;
    }

    let csvContent = "\uFEFF"; // UTF-8 BOM agar rapi di Microsoft Excel
    csvContent += "No,Nama Siswa,Kelas,No Absen,Nilai Awal,Nilai PG (50),Nilai Uraian (50),Nilai Akhir Remedial (100),Status Kelulusan,Predikat,Durasi Pengerjaan,Waktu Selesai\n";

    list.forEach((st, idx) => {
        const cleanName = (st.name || '').replace(/"/g, '""');
        const pgPts = st.pgScore !== undefined ? st.pgScore : 50;
        const uraianPts = st.uraianScore !== undefined ? st.uraianScore : (st.nilaiAkhir - pgPts);
        csvContent += `"${idx + 1}","${cleanName}","${st.kelas}","${st.absen || '-'}","${st.nilaiAwal}","${pgPts}","${uraianPts}","${st.nilaiAkhir}","${st.status || 'Lulus'}","${st.predicate || 'Sangat Memuaskan'}","${st.duration || '-'}","${st.timestamp || '-'}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Rekap_Remedial_Koding_AI_Kelas4_TzuChi_${(new Date()).toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('📊 Berhasil mengunduh Rekap Excel (CSV)!');
}


/* ==============================================================
   GENERAL MODAL FOR KELAS 5 & 6
   ============================================================== */
const remedialData = {
    k5: {
        title: "Remedial Kelas 5",
        badge: "SD Kelas V • Logika Percabangan & Sensor AI",
        themeGradient: "linear-gradient(135deg, #0284c7, #38bdf8)",
        materi: [
            {
                title: "1. Logika Percabangan (If - Then - Else)",
                icon: "🔀",
                desc: "Komputer bisa membuat keputusan layaknya kita manusia! Contoh logika: JIKA hari hujan, MAKA kita membawa payung. JIKA TIDAK hujan, MAKA kita memakai topi."
            },
            {
                title: "2. Perulangan (Loop / Repeat)",
                icon: "🔁",
                desc: "Daripada menulis perintah 'Maju 1 langkah' sebanyak 100 kali, programmer cerdas menggunakan blok perulangan 'Ulangi 100 kali: Maju 1 langkah'. Kode jadi rapi dan hemat waktu!"
            },
            {
                title: "3. Machine Learning (Mesin yang Belajar)",
                icon: "🧠",
                desc: "Bagaimana mobil otonom tanpa supir bisa tahu tanda lampu merah? Mobil itu dilatih menggunakan ribuan foto lampu lalu lintas. Proses mesin belajar dari data inilah yang disebut Machine Learning!"
            }
        ],
        quiz: [
            {
                question: "1. Jika kamu ingin robot bergerak terus-menerus tanpa henti, blok apa yang digunakan?",
                options: [
                    { text: "Blok Ulangi Selamanya (Forever Loop)", correct: true },
                    { text: "Blok Hentikan Semua (Stop All)", correct: false },
                    { text: "Blok Tunggu 1 Detik", correct: false }
                ]
            },
            {
                question: "2. 'JIKA skor >= 75 MAKA lulus, JIKA TIDAK MAKA remedial'. Ini adalah contoh konsep...",
                options: [
                    { text: "Perulangan (Looping)", correct: false },
                    { text: "Percabangan Logika (Conditional If-Else)", correct: true },
                    { text: "Menghapus program", correct: false }
                ]
            },
            {
                question: "3. Agar AI bisa mengenali suara kucing, apa yang harus diberikan kepadanya?",
                options: [
                    { text: "Banyak contoh rekaman suara 'meong' kucing untuk dipelajari", correct: true },
                    { text: "Makanan kucing", correct: false },
                    { text: "Baterai baru berkali-kali", correct: false }
                ]
            }
        ]
    },

    k6: {
        title: "Remedial Kelas 6",
        badge: "SD Kelas VI • Kreator Web & Chatbot Pintar",
        themeGradient: "linear-gradient(135deg, #9333ea, #c084fc)",
        materi: [
            {
                title: "1. Mengenal Bahasa Pembuat Web (HTML)",
                icon: "🌐",
                desc: "Website dibangun menggunakan bahasa penanda bernama HTML. Tag <h1> digunakan untuk judul utama yang besar, <p> untuk paragraf cerita, dan <img> untuk menampilkan gambar seru!"
            },
            {
                title: "2. Bagaimana Cara Kerja Chatbot AI?",
                icon: "💬",
                desc: "Chatbot membaca pertanyaan kita, mencocokkan kata kunci, lalu memprediksi jawaban paling ramah dan tepat menggunakan Natural Language Processing (NLP)."
            },
            {
                title: "3. Etika & Kebaikan Menggunakan AI",
                icon: "🛡️",
                desc: "AI adalah asisten hebat untuk membantu kita belajar dan menemukan ide. Namun kejujuran tetap yang utama! Kita tidak boleh menggunakan AI untuk kecurangan."
            }
        ],
        quiz: [
            {
                question: "1. Tag HTML manakah yang digunakan untuk membuat judul utama paling besar?",
                options: [
                    { text: "<title>", correct: false },
                    { text: "<h1>", correct: true },
                    { text: "<p>", correct: false }
                ]
            },
            {
                question: "2. Kemampuan AI untuk memahami kalimat bahasa manusia disebut...",
                options: [
                    { text: "Natural Language Processing (NLP)", correct: true },
                    { text: "Super Graphic Card", correct: false },
                    { text: "Bluetooth Sharing", correct: false }
                ]
            },
            {
                question: "3. Sikap yang paling tepat saat memanfaatkan teknologi AI untuk tugas sekolah adalah...",
                options: [
                    { text: "Memanfaatkan AI untuk mencari ide dan penjelasan, lalu menulis jawaban dengan pemikiran sendiri", correct: true },
                    { text: "Menyalin 100% tanpa dibaca dan mengakuinya sebagai tulisan sendiri", correct: false },
                    { text: "Menolak teknologi sama sekali", correct: false }
                ]
            }
        ]
    }
};

function openClassModal(classKey) {
    playCuteSound('pop');
    const data = remedialData[classKey];

    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalClassBadge').innerText = data.badge;
    document.getElementById('modalHeaderBg').style.background = data.themeGradient;
    document.getElementById('studentClass').value = data.title;

    renderMateri(data.materi);
    renderQuiz(data.quiz);

    document.getElementById('submissionForm').reset();
    document.getElementById('studentClass').value = data.title;

    switchTab('materi');
    document.getElementById('remedialModal').classList.add('open');
}

function closeClassModal() {
    playCuteSound('pop');
    document.getElementById('remedialModal').classList.remove('open');
}

function switchTab(tabName) {
    playCuteSound('pop');
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    const tabButtons = document.querySelectorAll('.tab-btn');
    if (tabName === 'materi') tabButtons[0].classList.add('active');
    if (tabName === 'kuis') tabButtons[1].classList.add('active');
    if (tabName === 'tugas') tabButtons[2].classList.add('active');

    document.getElementById(`tab-${tabName}`).classList.add('active');
}

function renderMateri(materiList) {
    const container = document.getElementById('materiContent');
    container.innerHTML = materiList.map(item => `
        <div class="materi-card">
            <div class="materi-header">
                <span class="materi-icon">${item.icon}</span>
                <h4>${item.title}</h4>
            </div>
            <p class="materi-desc">${item.desc}</p>
        </div>
    `).join('');
}

function renderQuiz(quizList) {
    const container = document.getElementById('quizContainer');
    container.innerHTML = quizList.map(q => `
        <div class="quiz-box">
            <div class="quiz-question">${q.question}</div>
            <div class="quiz-options">
                ${q.options.map((opt, optIndex) => `
                    <button class="quiz-option-btn" onclick="checkGeneralQuiz(this, ${opt.correct})">
                        <span>${String.fromCharCode(65 + optIndex)}.</span> ${opt.text}
                    </button>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function checkGeneralQuiz(btnElement, isCorrect) {
    const parentOptions = btnElement.parentElement;
    parentOptions.querySelectorAll('.quiz-option-btn').forEach(btn => btn.disabled = true);

    if (isCorrect) {
        btnElement.classList.add('correct');
        btnElement.innerHTML += ' <span>🎉 Benar!</span>';
        playCuteSound('correct');
        if (window.confetti) {
            confetti({ particleCount: 35, spread: 60, origin: { y: 0.5 } });
        }
        showToast('🌟 Jawaban Benar!');
    } else {
        btnElement.classList.add('wrong');
        btnElement.innerHTML += ' <span>❌ Coba lagi ya!</span>';
        playCuteSound('wrong');
        showToast('💡 Belum tepat, terus semangat!');
    }
}

function submitRemedial(event) {
    event.preventDefault();
    playCuteSound('fanfare');
    const name = document.getElementById('studentName').value;
    const kelas = document.getElementById('studentClass').value;

    if (window.confetti) {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.4 } });
    }
    showToast(`🎉 Hebat ${name}! Tugas remedial ${kelas} berhasil dikirim!`);
    setTimeout(() => {
        closeClassModal();
    }, 1800);
}

// Global modal background click handler
window.addEventListener('click', (e) => {
    const examModal = document.getElementById('examModalK4');
    if (e.target === examModal) {
        closeExamModalK4();
    }
    const generalModal = document.getElementById('remedialModal');
    if (e.target === generalModal) {
        closeClassModal();
    }
    const teacherModal = document.getElementById('teacherPortalModal');
    if (e.target === teacherModal) {
        closeTeacherPortal();
    }
    const previewModal = document.getElementById('answersPreviewModal');
    if (e.target === previewModal) {
        closeAnswersPreview();
    }
});

// Toast notification helper
let toastTimeout;
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast || !toastMsg) return;
    toastMsg.innerText = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

// Inisialisasi data rekap awal saat halaman dimuat
window.addEventListener('DOMContentLoaded', () => {
    getRecapList();
});

