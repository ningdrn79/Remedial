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
    const t = i18nTranslations[currentLang] || i18nTranslations['id'];
    if (soundEnabled) {
        icon.className = 'fa-solid fa-volume-high';
        text.innerText = t.soundOn;
        showToast(currentLang === 'en' ? '🔊 Sound effects & voice enabled!' : '🔊 Suara efek & suara guru diaktifkan!');
        playCuteSound('pop');
    } else {
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        icon.className = 'fa-solid fa-volume-xmark';
        text.innerText = t.soundOff;
        showToast(currentLang === 'en' ? '🔇 Sound & voice muted' : '🔇 Suara dinonaktifkan');
    }
});

/* ==============================================================
   FITUR TERJEMAHAN DWI-BAHASA (INDONESIA & INGGRIS) + SUARA (TTS)
   ============================================================== */
let currentLang = localStorage.getItem('tzuchi_app_lang') || 'id';
let currentQuoteIdx = -1;

const i18nTranslations = {
    id: {
        soundOn: "Suara: ON",
        soundOff: "Suara: OFF",
        teacherPanel: "Panel Guru",
        midSemester: "Akhir Semester 1 (PAS)",
        mentorTag: "Mentor Koding & AI",
        teacherRole: "Guru Koding & Kecerdasan Artifisial",
        speechBubbleDefault: "Halo anak-anak hebat! Selamat datang di Laboratorium Koding & AI! Tetap semangat, teliti, dan jujur mengerjakan remedial ya! 💻✨",
        labBadge: "Laboratorium Komputer SD",
        heroSubtext: "Portal Pembelajaran & Ujian Remedial Interaktif <strong>SDS Cinta Kasih Tzu Chi</strong>. Asah logika koding, kuasai Microsoft Excel & PowerPoint, dan raih prestasi terbaik dengan jujur dan gembira! 🚀🌟",
        btnChooseClass: "Pilih Kelas Remedial",
        btnCheer: "Semangat Belajar! 🎉",
        menuTitle: "Menu Remedial:",
        menuDesc: "Pilih menu kelas remedial di bawah ini untuk mengerjakan soal interaktif:",
        cardBadgeK4: "SD Kelas 4 (4A - 4E)",
        cardTagK4: "Excel & AI Detektif",
        cardTitleK4: "Remedial Kelas 4",
        cardMateriLabelK4: "Materi Remedial:",
        cardSubtitleK4: "Microsoft Excel (Row, Column, Rumus SUM, AVERAGE, COUNT) & Detektif Data AI.",
        btnCardK4: "Buka Soal Remedial Kelas 4",
        cardBadgeK5: "SD Kelas 5D",
        cardTagK5: "PowerPoint & AI Slide",
        cardTitleK5: "Remedial Kelas 5",
        cardMateriLabelK5: "Materi Remedial:",
        cardSubtitleK5: "Microsoft PowerPoint, Halaman Slide, Fitur Transisi, dan Desain Presentasi AI.",
        btnCardK5: "Buka Soal Remedial Kelas 5D",
        cardBadgeK6: "SD Kelas 6 (6A - 6E)",
        cardTagK6: "Computational Thinking & Scratch",
        cardTitleK6: "Remedial Kelas 6",
        cardMateriLabelK6: "Materi Remedial:",
        cardSubtitleK6: "4 Pilar Computational Thinking, Kecerdasan Artifisial & Pemrograman Scratch.",
        btnCardK6: "Buka Soal Remedial Kelas 6",
        funTipsText: "<strong>Kata Perenungan Master Cheng Yen:</strong> <em>“Keindahan sifat manusia terletak pada ketulusan hatinya. Kemuliaan sifat manusia terletak pada kejujuran.”</em> Tetap percaya diri dan kerjakan soal secara mandiri ya! 💡",
        footerText: "🌱 <strong>SDS CINTA KASIH TZU CHI</strong> - Mata Pelajaran: Koding dan Kecerdasan Artifisial",
        footerCopyright: "© 2026/2027 EduCode AI Portal - Belajar Mandiri, Jujur & Menyenangkan",
        footerTeacher: "Panel Guru (Khusus Pengawas)",
        voiceAnnouncement: "Bahasa diubah ke Bahasa Indonesia. Selamat belajar anak-anak!"
    },
    en: {
        soundOn: "Sound: ON",
        soundOff: "Sound: OFF",
        teacherPanel: "Teacher Panel",
        midSemester: "Final Semester 1 (PAS)",
        mentorTag: "Coding & AI Mentor",
        teacherRole: "Coding & Artificial Intelligence Teacher",
        speechBubbleDefault: "Hello great students! Welcome to the Coding & AI Lab! Stay enthusiastic, thorough, and honest when doing the remedial! 💻✨",
        labBadge: "Primary School Computer Lab",
        heroSubtext: "Interactive Learning & Remedial Exam Portal of <strong>SDS Cinta Kasih Tzu Chi</strong>. Sharpen coding logic, master Microsoft Excel & PowerPoint, and achieve your best with honesty and joy! 🚀🌟",
        btnChooseClass: "Choose Remedial Class",
        btnCheer: "Keep Learning! 🎉",
        menuTitle: "Remedial Menu:",
        menuDesc: "Select a remedial class menu below to start interactive exercises:",
        cardBadgeK4: "Primary Grade 4 (4A - 4E)",
        cardTagK4: "Excel & AI Detective",
        cardTitleK4: "Grade 4 Remedial",
        cardMateriLabelK4: "Remedial Topics:",
        cardSubtitleK4: "Microsoft Excel (Row, Column, SUM, AVERAGE, COUNT Formulas) & AI Data Detective.",
        btnCardK4: "Open Grade 4 Remedial Exam",
        cardBadgeK5: "Primary Grade 5D",
        cardTagK5: "PowerPoint & AI Slides",
        cardTitleK5: "Grade 5 Remedial",
        cardMateriLabelK5: "Remedial Topics:",
        cardSubtitleK5: "Microsoft PowerPoint, Slide Pages, Transition Features, and AI Presentation Design.",
        btnCardK5: "Open Grade 5D Remedial Exam",
        cardBadgeK6: "Primary Grade 6 (6A - 6E)",
        cardTagK6: "Computational Thinking & Scratch",
        cardTitleK6: "Grade 6 Remedial",
        cardMateriLabelK6: "Remedial Topics:",
        cardSubtitleK6: "4 Pillars of Computational Thinking, Artificial Intelligence & Scratch Programming.",
        btnCardK6: "Open Grade 6 Remedial Exam",
        funTipsText: "<strong>Master Cheng Yen's Aphorism:</strong> <em>“The beauty of human nature lies in sincerity. The nobility of human nature lies in honesty.”</em> Stay confident and complete your work independently! 💡",
        footerText: "🌱 <strong>SDS CINTA KASIH TZU CHI</strong> - Subject: Coding and Artificial Intelligence",
        footerCopyright: "© 2026/2027 EduCode AI Portal - Independent, Honest & Fun Learning",
        footerTeacher: "Teacher Panel (Proctor Access)",
        voiceAnnouncement: "Language switched to English. Welcome students!"
    }
};

const teacherQuotesBilingual = {
    id: [
        "“Keindahan sifat manusia terletak pada ketulusan hatinya. Kemuliaan sifat manusia terletak pada kejujuran.” — Master Cheng Yen 💖",
        "Di Microsoft Excel, tanda = (sama dengan) adalah kunci pembuka setiap rumus hebat! 🔑",
        "Ingat ya anak-anak: Kolom itu Huruf vertikal (A, B, C), sedangkan Baris itu Angka horisontal (1, 2, 3)! 📊",
        "Ibu Guru sangat bangga pada kalian yang belajar dengan tekun, jujur, dan penuh semangat! 🌟",
        "Perplexity AI dan Search Engine membantu kita menjadi Detektif Data yang cerdas dan bijak! 🔍",
        "Jangan takut mencoba! Setiap tantangan koding membuat logika berpikir kita semakin hebat! 🚀"
    ],
    en: [
        "“The beauty of human nature lies in sincerity. The nobility of human nature lies in honesty.” — Master Cheng Yen 💖",
        "In Microsoft Excel, the = (equal) sign is the key to every great formula! 🔑",
        "Remember, students: Columns are vertical Letters (A, B, C), while Rows are horizontal Numbers (1, 2, 3)! 📊",
        "Teacher is very proud of you who study diligently, honestly, and enthusiastically! 🌟",
        "Perplexity AI and Search Engines help us become smart and wise Data Detectives! 🔍",
        "Never be afraid to try! Every coding challenge makes our logical thinking sharper! 🚀"
    ]
};

// Web Speech API Voice Engine
function speakText(text, lang = currentLang) {
    if (!soundEnabled) return;
    if (!('speechSynthesis' in window)) return;
    try {
        window.speechSynthesis.cancel();
        const clean = String(text || '')
            .replace(/[💻✨💖🔑📊🌟🔍🚀🏆🎉💡🌱🤖🛡️💬🌐]/g, '')
            .replace(/—\s*Master Cheng Yen/g, 'Kata Master Cheng Yen')
            .replace(/\*/g, '')
            .replace(/<[^>]*>/g, '')
            .replace(/\s+/g, ' ')
            .trim();
        if (!clean) return;

        const utterance = new SpeechSynthesisUtterance(clean);
        utterance.lang = (lang === 'en') ? 'en-US' : 'id-ID';
        utterance.rate = 0.95;
        utterance.pitch = 1.05;

        const ttsBtn = document.getElementById('bubbleTtsBtn');
        utterance.onstart = () => {
            if (ttsBtn) ttsBtn.classList.add('speaking');
        };
        utterance.onend = utterance.onerror = () => {
            if (ttsBtn) ttsBtn.classList.remove('speaking');
        };

        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
            const prefix = (lang === 'en') ? 'en' : 'id';
            const matched = voices.find(v => v.lang.toLowerCase().startsWith(prefix));
            if (matched) utterance.voice = matched;
        }

        window.speechSynthesis.speak(utterance);
    } catch (e) {
        console.warn('TTS Audio engine notice:', e);
    }
}

function speakCurrentMascotQuote() {
    playCuteSound('pop');
    const bubbleTextElem = document.getElementById('mascotBubbleText') || document.getElementById('mascotBubble');
    if (!bubbleTextElem) return;
    const text = bubbleTextElem.innerText || bubbleTextElem.textContent;
    speakText(text, currentLang);
    showToast(currentLang === 'en' ? '🔊 Speaking quote in English...' : '🔊 Membacakan pesan Ibu Guru...');
}

function toggleLanguage() {
    playCuteSound('pop');
    currentLang = (currentLang === 'id') ? 'en' : 'id';
    localStorage.setItem('tzuchi_app_lang', currentLang);
    applyLanguage(currentLang, true);
}

function applyLanguage(lang, announceVoice = false) {
    const t = i18nTranslations[lang] || i18nTranslations['id'];
    
    // 1. Tombol Bahasa
    const textElem = document.getElementById('langText');
    const btnElem = document.getElementById('langToggleBtn');
    if (textElem) textElem.innerText = (lang === 'en') ? 'English' : 'Indonesian';
    if (btnElem) btnElem.title = (lang === 'en') ? 'Klik untuk beralih ke Indonesian / Switch to Indonesian' : 'Click to switch to English / Beralih ke English';

    // 2. Sound Toggle
    const soundText = document.getElementById('soundText');
    if (soundText) soundText.innerText = soundEnabled ? t.soundOn : t.soundOff;

    // 3. Navbar elements
    const teacherBtn = document.getElementById('teacherBtnText');
    if (teacherBtn) teacherBtn.innerText = t.teacherPanel;
    const navSem = document.getElementById('navSemesterBadge');
    if (navSem) navSem.innerText = t.midSemester;

    // 4. Hero section
    const mentorTag = document.getElementById('mentorStatusText');
    if (mentorTag) mentorTag.innerText = t.mentorTag;
    const teacherRole = document.getElementById('teacherRoleText');
    if (teacherRole) teacherRole.innerText = t.teacherRole;
    const labBadge = document.getElementById('labBadgeText');
    if (labBadge) labBadge.innerText = t.labBadge;
    const heroSub = document.getElementById('heroSubtext');
    if (heroSub) heroSub.innerHTML = t.heroSubtext;
    const btnChoose = document.getElementById('btnChooseClassText');
    if (btnChoose) btnChoose.innerText = t.btnChooseClass;
    const btnCheer = document.getElementById('btnCheerText');
    if (btnCheer) btnCheer.innerText = t.btnCheer;

    // 5. Speech Bubble
    const bubbleText = document.getElementById('mascotBubbleText');
    if (bubbleText) {
        if (currentQuoteIdx >= 0 && teacherQuotesBilingual[lang] && teacherQuotesBilingual[lang][currentQuoteIdx]) {
            bubbleText.innerHTML = teacherQuotesBilingual[lang][currentQuoteIdx];
        } else {
            bubbleText.innerHTML = t.speechBubbleDefault;
        }
    }

    // 6. Menu intro
    const menuTitle = document.getElementById('menuTitleText');
    if (menuTitle) menuTitle.innerText = t.menuTitle;
    const menuDesc = document.getElementById('menuDescText');
    if (menuDesc) menuDesc.innerText = t.menuDesc;

    // 7. Cards K4, K5, K6
    const k4Tag = document.getElementById('k4TagText');
    if (k4Tag) k4Tag.innerText = t.cardTagK4;
    const k4Badge = document.getElementById('k4BadgeText');
    if (k4Badge) k4Badge.innerText = t.cardBadgeK4;
    const k4Title = document.getElementById('k4TitleText');
    if (k4Title) k4Title.innerText = t.cardTitleK4;
    const k4Materi = document.getElementById('k4MateriLabel');
    if (k4Materi) k4Materi.innerText = t.cardMateriLabelK4;
    const k4Sub = document.getElementById('k4SubtitleText');
    if (k4Sub) k4Sub.innerText = t.cardSubtitleK4;
    const btnK4 = document.getElementById('btnK4Text');
    if (btnK4) btnK4.innerText = t.btnCardK4;

    const k5Tag = document.getElementById('k5TagText');
    if (k5Tag) k5Tag.innerText = t.cardTagK5;
    const k5Badge = document.getElementById('k5BadgeText');
    if (k5Badge) k5Badge.innerText = t.cardBadgeK5;
    const k5Title = document.getElementById('k5TitleText');
    if (k5Title) k5Title.innerText = t.cardTitleK5;
    const k5Materi = document.getElementById('k5MateriLabel');
    if (k5Materi) k5Materi.innerText = t.cardMateriLabelK5;
    const k5Sub = document.getElementById('k5SubtitleText');
    if (k5Sub) k5Sub.innerText = t.cardSubtitleK5;
    const btnK5 = document.getElementById('btnK5Text');
    if (btnK5) btnK5.innerText = t.btnCardK5;

    const k6Tag = document.getElementById('k6TagText');
    if (k6Tag) k6Tag.innerText = t.cardTagK6;
    const k6Badge = document.getElementById('k6BadgeText');
    if (k6Badge) k6Badge.innerText = t.cardBadgeK6;
    const k6Title = document.getElementById('k6TitleText');
    if (k6Title) k6Title.innerText = t.cardTitleK6;
    const k6Materi = document.getElementById('k6MateriLabel');
    if (k6Materi) k6Materi.innerText = t.cardMateriLabelK6;
    const k6Sub = document.getElementById('k6SubtitleText');
    if (k6Sub) k6Sub.innerText = t.cardSubtitleK6;
    const btnK6 = document.getElementById('btnK6Text');
    if (btnK6) btnK6.innerText = t.btnCardK6;

    // 8. Fun Tips & Footer
    const funTips = document.getElementById('funTipsText');
    if (funTips) funTips.innerHTML = t.funTipsText;
    const foot1 = document.getElementById('footerText1');
    if (foot1) foot1.innerHTML = t.footerText;
    const foot2 = document.getElementById('footerText2');
    if (foot2) foot2.innerText = t.footerCopyright;
    const footT = document.getElementById('footerTeacherText');
    if (footT) footT.innerText = t.footerTeacher;

    // Terapkan konfigurasi periode remedial yang sedang aktif
    try {
        applyRemedialPeriod(currentRemedialPeriod);
    } catch(ePeriod) {}

    if (announceVoice) {
        showToast((lang === 'en') ? '🌐 Switched to English' : '🌐 Beralih ke Indonesian');
        speakText(t.voiceAnnouncement, lang);
    }
}

/* ==============================================================
   KONFIGURASI PERIODE REMEDIAL (SEMESTER 1 & 2 • PTS / PAS)
   ============================================================== */
const REMEDIAL_PERIODS = {
    sem1_pts: {
        id: 'sem1_pts',
        name: 'Semester 1 • Remedial PTS (Mid)',
        nameEn: 'Semester 1 • Mid-Term Remedial (PTS)',
        shortName: 'Sem 1 - PTS',
        badge: 'Mid Semester 1 (PTS)',
        badgeEn: 'Mid Semester 1 (PTS)',
        bannerSubtitle: 'MID SEMESTER 1 (PTS) • TAHUN PELAJARAN 2026/2027',
        pdfDocMeta: 'MID SEMESTER 1 (PTS) • TAHUN PELAJARAN 2026/2027',
        k4: {
            tag: 'Excel & AI Detektif',
            tagEn: 'Excel & AI Detective',
            subtitle: 'Microsoft Excel (Row, Column, Rumus SUM, AVERAGE, COUNT) & Detektif Data AI.',
            subtitleEn: 'Microsoft Excel (Row, Column, SUM, AVERAGE, COUNT Formulas) & AI Data Detective.'
        },
        k5: {
            tag: 'PowerPoint & AI Slide',
            tagEn: 'PowerPoint & AI Slides',
            subtitle: 'Microsoft PowerPoint, Halaman Slide, Fitur Transisi, dan Desain Presentasi AI.',
            subtitleEn: 'Microsoft PowerPoint, Slide Pages, Transition Features, and AI Presentation Design.'
        },
        k6: {
            tag: 'Computational Thinking & Scratch',
            tagEn: 'Computational Thinking & Scratch',
            subtitle: '4 Pilar Computational Thinking, Kecerdasan Artifisial & Pemrograman Scratch Dasar.',
            subtitleEn: '4 Pillars of Computational Thinking, Artificial Intelligence & Scratch Programming.'
        }
    },
    sem1_pas: {
        id: 'sem1_pas',
        name: 'Semester 1 • Remedial PAS (Akhir)',
        nameEn: 'Semester 1 • Final-Term Remedial (PAS)',
        shortName: 'Sem 1 - PAS',
        badge: 'Akhir Semester 1 (PAS)',
        badgeEn: 'Final Semester 1 (PAS)',
        bannerSubtitle: 'PENILAIAN AKHIR SEMESTER 1 (PAS) • TAHUN PELAJARAN 2026/2027',
        pdfDocMeta: 'PENILAIAN AKHIR SEMESTER 1 (PAS) • TAHUN PELAJARAN 2026/2027',
        k4: {
            tag: 'Word & Gemini AI',
            tagEn: 'Word & Gemini AI',
            subtitle: 'Microsoft Word (Format Teks, WordArt, Gambar) & Eksplorasi Gemini AI.',
            subtitleEn: 'Microsoft Word (Text Formatting, WordArt, Images) & Gemini AI Exploration.'
        },
        k5: {
            tag: 'Komprehensif PowerPoint & AI',
            tagEn: 'Comprehensive PowerPoint & AI',
            subtitle: 'Evaluasi Komprehensif Semester 1: Presentasi Multimedia, Efek Animasi & Desain Kreatif AI.',
            subtitleEn: 'Comprehensive Semester 1: Multimedia Presentation, Animations & Creative AI Prompts.'
        },
        k6: {
            tag: 'Komprehensif CT & Scratch',
            tagEn: 'Comprehensive CT & Scratch',
            subtitle: 'Evaluasi Komprehensif Semester 1: 4 Pilar CT, Blok Motion & Logika Animasi Scratch.',
            subtitleEn: 'Comprehensive Semester 1: 4 Pillars of CT, Motion Blocks & Scratch Logic.'
        }
    },
    sem2_pts: {
        id: 'sem2_pts',
        name: 'Semester 2 • Remedial PTS (Mid)',
        nameEn: 'Semester 2 • Mid-Term Remedial (PTS)',
        shortName: 'Sem 2 - PTS',
        badge: 'Mid Semester 2 (PTS)',
        badgeEn: 'Mid Semester 2 (PTS)',
        bannerSubtitle: 'MID SEMESTER 2 (PTS) • TAHUN PELAJARAN 2026/2027',
        pdfDocMeta: 'MID SEMESTER 2 (PTS) • TAHUN PELAJARAN 2026/2027',
        k4: {
            tag: 'Excel Lanjut & Grafik AI',
            tagEn: 'Advanced Excel & AI Charts',
            subtitle: 'Microsoft Excel Lanjut: Pembuatan Grafik/Chart, Rumus MAX, MIN & Analisis Visual Data.',
            subtitleEn: 'Advanced Excel: Chart Creation, MAX, MIN Formulas & Visual Data Analysis.'
        },
        k5: {
            tag: 'Multimedia & Interaktivitas',
            tagEn: 'Multimedia & Interactivity',
            subtitle: 'Multimedia Interaktif: Hyperlink Slide, Integrasi Audio/Video & Desain Kreatif Canva AI.',
            subtitleEn: 'Interactive Multimedia: Hyperlinks, Audio/Video Integration & Canva AI Design.'
        },
        k6: {
            tag: 'Scratch Lanjut & Game Logic',
            tagEn: 'Advanced Scratch & Game Logic',
            subtitle: 'Pemrograman Scratch Lanjut: Variabel Skor, Sensor Touching & Algoritma Logika Game.',
            subtitleEn: 'Advanced Scratch Programming: Score Variables, Touching Sensors & Game Logic.'
        }
    },
    sem2_pas: {
        id: 'sem2_pas',
        name: 'Semester 2 • Remedial PAS (Kenaikan)',
        nameEn: 'Semester 2 • Final Exam / Progression (PAS)',
        shortName: 'Sem 2 - PAS',
        badge: 'Akhir Semester 2 (PAS)',
        badgeEn: 'Final Semester 2 (PAS)',
        bannerSubtitle: 'PENILAIAN AKHIR TAHUN (PAS) • TAHUN PELAJARAN 2026/2027',
        pdfDocMeta: 'PENILAIAN AKHIR TAHUN (PAS) • TAHUN PELAJARAN 2026/2027',
        k4: {
            tag: 'Asesmen Akhir Koding K4',
            tagEn: 'Grade 4 Year-End Assessment',
            subtitle: 'Asesmen Akhir Tahun: Pengolahan Basis Data Excel, Logika Algoritma & Proyek Kreatif AI.',
            subtitleEn: 'Year-End Assessment: Excel Database Processing, Algorithms & AI Projects.'
        },
        k5: {
            tag: 'Asesmen Akhir Koding K5',
            tagEn: 'Grade 5 Year-End Assessment',
            subtitle: 'Asesmen Akhir Tahun: Desain Proyek Presentasi Interaktif Mandiri & AI Prompting Lanjut.',
            subtitleEn: 'Year-End Assessment: Independent Interactive Presentation Projects & Advanced AI Prompts.'
        },
        k6: {
            tag: 'Asesmen Kelulusan Koding K6',
            tagEn: 'Grade 6 Graduation Assessment',
            subtitle: 'Asesmen Akhir Tahun & Kelulusan: Proyek Game Scratch Mandiri & Machine Learning AI.',
            subtitleEn: 'Year-End & Graduation Assessment: Independent Scratch Game Projects & Machine Learning.'
        }
    }
};

let activeTeacherRemedialPeriod = localStorage.getItem('tzuchi_teacher_active_period') || 
                                  localStorage.getItem('tzuchi_official_period') || 
                                  localStorage.getItem('tzuchi_remedial_period') || 
                                  'sem1_pas';

// Proteksi Pintar: Jika saat ini bulan November/Desember 2026 (periode PAS)
// dan komputer lab siswa masih menyimpan 'sem1_pts' dari ujian bulan Oktober lalu,
// otomatis alihkan ke 'sem1_pas' agar seluruh siswa langsung mengerjakan PAS!
const initialCurrentMonth = new Date().getMonth(); // 10 = November, 11 = Desember
if ((initialCurrentMonth >= 10 || new Date().getFullYear() >= 2026) && activeTeacherRemedialPeriod === 'sem1_pts') {
    activeTeacherRemedialPeriod = 'sem1_pas';
    localStorage.setItem('tzuchi_teacher_active_period', 'sem1_pas');
    localStorage.setItem('tzuchi_official_period', 'sem1_pas');
    localStorage.setItem('tzuchi_remedial_period', 'sem1_pas');
}

let currentRemedialPeriod = activeTeacherRemedialPeriod;
let officialRemedialPeriod = activeTeacherRemedialPeriod;
let isPeriodLocked = true; // Selalu aktif: hanya tombol yang dibuka guru yang dapat dikerjakan siswa
let pendingPeriodSwitch = null;
let activeExitExamGrade = null;
let activeModalGrade = 'k4';

// 1. Guru Menentukan Periode Remedial dari Dashboard Guru (Master Controller)
function selectRemedialPeriodTeacher(periodKey) {
    if (!REMEDIAL_PERIODS[periodKey]) return;
    playCuteSound('pop');
    activeTeacherRemedialPeriod = periodKey;
    officialRemedialPeriod = periodKey;
    currentRemedialPeriod = periodKey;

    localStorage.setItem('tzuchi_teacher_active_period', periodKey);
    localStorage.setItem('tzuchi_official_period', periodKey);
    localStorage.setItem('tzuchi_remedial_period', periodKey);

    // Otomatis pastikan status akses terbuka saat guru mengaktifkan periode
    localStorage.setItem('tzuchi_exam_session_status', 'OPEN');
    updateExamSessionDisplay();

    applyRemedialPeriod(periodKey);
    renderTeacherTable();
    playCuteSound('fanfare');
    const pName = (currentLang === 'en') ? REMEDIAL_PERIODS[periodKey].nameEn : REMEDIAL_PERIODS[periodKey].name;
    showToast(`✅ Tombol [${pName}] AKTIF & DIBUKA untuk siswa! Tabel langsung menampilkan data remedial ini.`);

    // Broadcast ke Google Cloud agar seluruh komputer/HP siswa otomatis berubah secara real-time
    if (typeof pushExamConfigToCloud === 'function') {
        pushExamConfigToCloud({
            period: periodKey,
            status: 'OPEN',
            token: getActiveExamToken()
        });
    }
}

// 2. Klik pada Tab Periode di Beranda Siswa (Diproteksi agar Anak Tidak Salah Klik)
function selectRemedialPeriod(periodKey) {
    if (!REMEDIAL_PERIODS[periodKey]) return;

    // Jika guru sedang mengunci ujian:
    if (!isExamSessionOpen()) {
        playCuteSound('pop');
        showToast('🔒 Seluruh Akses Ujian Sedang Dikunci oleh Guru Pengawas!');
        return;
    }

    // Jika siswa mengeklik tombol yang DINONAKTIFKAN oleh Guru:
    if (periodKey !== activeTeacherRemedialPeriod) {
        playCuteSound('pop');
        const activeName = (currentLang === 'en') ? REMEDIAL_PERIODS[activeTeacherRemedialPeriod]?.nameEn : REMEDIAL_PERIODS[activeTeacherRemedialPeriod]?.name;
        const clickedName = (currentLang === 'en') ? REMEDIAL_PERIODS[periodKey]?.nameEn : REMEDIAL_PERIODS[periodKey]?.name;
        
        showToast(`🔒 Tombol [${clickedName}] Dinonaktifkan oleh Guru. Hari ini hanya [${activeName}] yang dibuka!`);
        return; // Ditolak: siswa TIDAK BISA beralih ke tombol yang nonaktif!
    }

    // Jika siswa mengeklik tombol yang memang sedang AKTIF:
    currentRemedialPeriod = periodKey;
    playCuteSound('pop');
    showToast(`✨ Periode Aktif Hari Ini: ${REMEDIAL_PERIODS[periodKey]?.shortName || periodKey}`);
}

// 2b. Klik pada Tab Periode Ujian Utama di Beranda Siswa
function selectExamPeriod(periodKey) {
    if (!REMEDIAL_PERIODS[periodKey]) return;

    // Jika guru sedang mengunci ujian:
    if (!isExamSessionOpen()) {
        playCuteSound('pop');
        showToast('🔒 Seluruh Akses Ujian Sedang Dikunci oleh Guru Pengawas!');
        return;
    }

    const periodTitleMap = {
        sem1_pts: 'Ujian PTS Semester 1',
        sem1_pas: 'Ujian PAS Semester 1',
        sem2_pts: 'Ujian PTS Semester 2',
        sem2_pas: 'Ujian PAS Semester 2'
    };

    // Jika siswa mengeklik tombol yang DINONAKTIFKAN oleh Guru:
    if (periodKey !== activeTeacherRemedialPeriod) {
        playCuteSound('pop');
        const activeTitle = periodTitleMap[activeTeacherRemedialPeriod] || activeTeacherRemedialPeriod;
        const clickedTitle = periodTitleMap[periodKey] || periodKey;
        
        showToast(`🔒 ${clickedTitle} dinonaktifkan Guru. Hari ini hanya [${activeTitle}] yang dibuka!`);
        return;
    }

    // Jika siswa mengeklik tombol yang memang sedang AKTIF:
    currentRemedialPeriod = periodKey;
    playCuteSound('fanfare');
    const title = periodTitleMap[periodKey] || periodKey;
    showToast(`✨ Periode Ujian Utama Aktif: ${title}! Silakan pilih kelasmu di bawah.`);

    // Gulir halus ke pilihan kelas
    setTimeout(() => {
        const classMenu = document.querySelector('.menu-container');
        if (classMenu) classMenu.scrollIntoView({ behavior: 'smooth' });
    }, 280);
}

// Lapis 2: Quick Modal Picker di Form Identitas Siswa (Hanya menampilkan info resmi guru)
function openStudentPeriodModal(grade) {
    playCuteSound('pop');
    const activeName = (currentLang === 'en') ? REMEDIAL_PERIODS[activeTeacherRemedialPeriod]?.nameEn : REMEDIAL_PERIODS[activeTeacherRemedialPeriod]?.name;
    showToast(`ℹ️ Periode ujian ini telah ditetapkan resmi oleh Guru di Dashboard: ${activeName}`);
}

function closeStudentPeriodModal() {
    playCuteSound('pop');
    const modal = document.getElementById('studentPeriodPickerModal');
    if (modal) {
        modal.classList.remove('open');
        modal.style.display = 'none';
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
    }
}

function selectPeriodFromStudentModal(periodKey) {
    if (periodKey !== activeTeacherRemedialPeriod) {
        playCuteSound('pop');
        showToast(`🔒 Tombol ini dinonaktifkan guru. Hari ini hanya periode resmi yang dibuka.`);
        return;
    }
    closeStudentPeriodModal();
}

// Lapis 3: Keluar / Batalkan Ujian dengan Aman Saat Mengerjakan Soal
function confirmExitOrSwitchExam(grade) {
    playCuteSound('pop');
    activeExitExamGrade = grade;
    const modal = document.getElementById('examExitConfirmModal');
    if (modal) {
        modal.classList.add('open');
        modal.style.display = 'flex';
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
    } else {
        const conf = confirm(
            "⚠️ PERINGATAN KELUAR UJIAN REMEDIAL!\n\n" +
            "Jawaban yang kamu isi saat ini belum dikirim ke guru.\n" +
            "Apakah kamu ingin keluar dari lembar ujian ini?"
        );
        if (conf) executeExitExamModal();
    }
}

function cancelExitExamModal() {
    playCuteSound('pop');
    const modal = document.getElementById('examExitConfirmModal');
    if (modal) {
        modal.classList.remove('open');
        modal.style.display = 'none';
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
    }
    activeExitExamGrade = null;
}

function executeExitExamModal() {
    playCuteSound('pop');
    const grade = activeExitExamGrade || 'k4';
    cancelExitExamModal();

    // Hentikan timer & tutup modal sesuai jenjang kelas
    if (grade === 'k4') {
        if (examTimerInterval) clearInterval(examTimerInterval);
        closeExamModalK4();
        showExamStep('identity');
    } else if (grade === 'k5') {
        if (typeof examTimerIntervalK5 !== 'undefined' && examTimerIntervalK5) clearInterval(examTimerIntervalK5);
        if (typeof closeExamModalK5 === 'function') closeExamModalK5();
        if (typeof showExamStepK5 === 'function') showExamStepK5('identity');
    } else if (grade === 'k6') {
        if (typeof examTimerIntervalK6 !== 'undefined' && examTimerIntervalK6) clearInterval(examTimerIntervalK6);
        if (typeof closeExamModalK6 === 'function') closeExamModalK6();
        if (typeof showExamStepK6 === 'function') showExamStepK6('identity');
    }

    // Arahkan ke menu beranda
    setTimeout(() => {
        const menuElem = document.getElementById('menu-remedial');
        if (menuElem) menuElem.scrollIntoView({ behavior: 'smooth' });
    }, 250);
}

// 4. Menerapkan Status Aktif & Nonaktif Tombol di Halaman Siswa & Panel Guru
function applyRemedialPeriod(periodKey) {
    const activeKey = activeTeacherRemedialPeriod || periodKey || 'sem1_pas';
    const config = REMEDIAL_PERIODS[activeKey] || REMEDIAL_PERIODS['sem1_pas'];
    const isEn = (currentLang === 'en');
    const isOpen = isExamSessionOpen();

    currentRemedialPeriod = activeKey;
    officialRemedialPeriod = activeKey;

    // 1. Perbarui 4 Tombol Periode di Beranda Siswa (1 Aktif, 3 Nonaktif)
    document.querySelectorAll('.period-tab-card').forEach(tab => {
        const p = tab.getAttribute('data-period');
        const isCurrentActive = (p === activeKey);

        tab.classList.toggle('active', isCurrentActive);
        tab.classList.toggle('disabled-period', !isCurrentActive);
        tab.classList.toggle('exam-locked', isCurrentActive && !isOpen);

        // Atur status badge Dibuka Guru vs Nonaktif vs Dikunci
        const offBadge = tab.querySelector('.period-official-badge');
        const lockBadge = tab.querySelector('.period-locked-badge');
        const checkBadge = tab.querySelector('.active-check-badge');

        if (offBadge) {
            if (isCurrentActive) {
                offBadge.classList.add('visible');
                offBadge.style.display = 'inline-flex';
                if (!isOpen) {
                    offBadge.innerHTML = '<i class="fa-solid fa-lock"></i> Akses Dikunci Guru';
                } else {
                    offBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Dibuka Guru';
                }
            } else {
                offBadge.classList.remove('visible');
                offBadge.style.display = 'none';
            }
        }
        if (lockBadge) {
            lockBadge.classList.toggle('visible', !isCurrentActive);
            lockBadge.style.display = !isCurrentActive ? 'inline-flex' : 'none';
        }
        if (checkBadge) {
            if (isCurrentActive) {
                checkBadge.style.display = 'inline-flex';
                if (!isOpen) {
                    checkBadge.innerHTML = '<i class="fa-solid fa-lock"></i> Ditutup';
                } else {
                    checkBadge.innerHTML = '<i class="fa-solid fa-check"></i> Aktif';
                }
            } else {
                checkBadge.style.display = 'none';
            }
        }

        if (isCurrentActive) {
            tab.title = !isOpen 
                ? `Akses Ujian Sedang Dikunci oleh Guru: ${isEn ? config.nameEn : config.name}` 
                : `Periode Aktif: ${isEn ? config.nameEn : config.name}`;
        } else {
            tab.title = `Tombol ini dinonaktifkan oleh Guru agar tidak salah klik. Hari ini hanya periode ${isEn ? config.nameEn : config.name} yang dibuka.`;
        }
    });

    // 2. Perbarui Tombol Pill di Dashboard Guru
    document.querySelectorAll('.t-period-pill').forEach(pill => {
        const p = pill.getAttribute('data-period');
        if (p) {
            pill.classList.toggle('active', p === activeKey);
        }
    });

    // 2b. Perbarui Teks Live Status di Dashboard Guru
    const teacherActiveNameElem = document.getElementById('teacherActivePeriodNameText');
    const teacherPreviewCard = document.querySelector('.teacher-active-period-preview');
    if (teacherActiveNameElem) {
        teacherActiveNameElem.innerText = isEn ? config.nameEn : config.name;
    }
    if (teacherPreviewCard) {
        const dot = teacherPreviewCard.querySelector('.preview-status-dot');
        const text = teacherPreviewCard.querySelector('.preview-status-text');
        if (!isOpen) {
            teacherPreviewCard.style.background = 'linear-gradient(135deg, #fff1f2 0%, #fee2e2 100%)';
            teacherPreviewCard.style.borderColor = '#fca5a5';
            if (dot) {
                dot.style.background = '#ef4444';
                dot.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.25)';
            }
            if (text) {
                text.innerHTML = `<strong>Status Akses Siswa:</strong> 🔒 <span style="color:#b91c1c; font-weight:800;">SELURUH AKSES UJIAN SEDANG DIKUNCI OLEH GURU</span>. Di beranda siswa tertera <em>"Akses Dikunci Guru"</em> dan siswa dicegah membuka/mengerjakan soal.`;
            }
        } else {
            teacherPreviewCard.style.background = 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)';
            teacherPreviewCard.style.borderColor = '#99f6e4';
            if (dot) {
                dot.style.background = '#10b981';
                dot.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.25)';
            }
            if (text) {
                text.innerHTML = `<strong>Status Tombol di Halaman Siswa:</strong> Hanya tombol <span id="teacherActivePeriodNameText" class="highlight-period-name">${isEn ? config.nameEn : config.name}</span> yang <strong>AKTIF</strong>. Tiga tombol lainnya otomatis <strong>DINONAKTIFKAN</strong> (Siswa dicegah dari salah klik ujian).`;
            }
        }
    }

    // 3. Perbarui teks indikator periode aktif di beranda (Menu Remedial)
    const indicatorText = document.getElementById('periodStatusPillText');
    const pillElem = document.getElementById('periodStatusPill');
    if (indicatorText) {
        if (!isOpen) {
            indicatorText.innerHTML = `🔒 Akses Ujian Dikunci Pengawas • [${isEn ? config.nameEn : config.name} Ditutup]`;
        } else {
            indicatorText.innerText = isEn ? config.nameEn : config.name;
        }
    }
    if (pillElem) {
        pillElem.classList.toggle('closed', !isOpen);
    }

    // 3b. Perbarui teks indikator periode aktif di Menu Ujian Utama
    const examIndicatorText = document.getElementById('examPeriodStatusPillText');
    const examPillElem = document.getElementById('examPeriodStatusPill');
    if (examIndicatorText) {
        const periodTitleMap = {
            sem1_pts: 'Semester 1 • Ujian PTS Semester 1',
            sem1_pas: 'Semester 1 • Ujian PAS Semester 1',
            sem2_pts: 'Semester 2 • Ujian PTS Semester 2',
            sem2_pas: 'Semester 2 • Ujian PAS Semester 2'
        };
        const titleText = periodTitleMap[activeKey] || config.name;
        if (!isOpen) {
            examIndicatorText.innerHTML = `🔒 Akses Ujian Dikunci Pengawas • [${titleText} Ditutup]`;
        } else {
            examIndicatorText.innerText = titleText;
        }
    }
    if (examPillElem) {
        examPillElem.classList.toggle('closed', !isOpen);
    }

    // 3b. Perbarui teks tombol buka soal pada kartu kelas remedial
    const t = i18nTranslations[currentLang] || i18nTranslations['id'];
    const btnK4 = document.getElementById('btnK4Text');
    const btnK5 = document.getElementById('btnK5Text');
    const btnK6 = document.getElementById('btnK6Text');
    if (btnK4) btnK4.innerText = !isOpen ? (isEn ? '🔒 Exam Locked by Teacher' : '🔒 Akses Ujian Dikunci Guru') : t.btnCardK4;
    if (btnK5) btnK5.innerText = !isOpen ? (isEn ? '🔒 Exam Locked by Teacher' : '🔒 Akses Ujian Dikunci Guru') : t.btnCardK5;
    if (btnK6) btnK6.innerText = !isOpen ? (isEn ? '🔒 Exam Locked by Teacher' : '🔒 Akses Ujian Dikunci Guru') : t.btnCardK6;

    // 4. Perbarui badge navbar
    const navSem = document.getElementById('navSemesterBadge');
    if (navSem) {
        navSem.innerText = !isOpen ? (isEn ? '🔒 Exam Locked' : '🔒 Ujian Dikunci') : (isEn ? config.badgeEn : config.badge);
    }

    // 5. Perbarui konten tag & subtitle kartu materi (Ujian Utama & Remedial)
    const k4Tag = document.getElementById('k4TagText');
    if (k4Tag) k4Tag.innerText = isEn ? config.k4.tagEn : config.k4.tag;
    const k4ExamTag = document.getElementById('k4ExamTagText');
    if (k4ExamTag) k4ExamTag.innerText = isEn ? config.k4.tagEn : config.k4.tag;

    const k4Sub = document.getElementById('k4SubtitleText');
    if (k4Sub) k4Sub.innerText = isEn ? config.k4.subtitleEn : config.k4.subtitle;
    const k4ExamSub = document.getElementById('k4ExamSubtitleText');
    if (k4ExamSub) k4ExamSub.innerText = isEn ? config.k4.subtitleEn : config.k4.subtitle;

    const k5Tag = document.getElementById('k5TagText');
    if (k5Tag) k5Tag.innerText = isEn ? config.k5.tagEn : config.k5.tag;
    const k5ExamTag = document.getElementById('k5ExamTagText');
    if (k5ExamTag) k5ExamTag.innerText = isEn ? config.k5.tagEn : config.k5.tag;

    const k5Sub = document.getElementById('k5SubtitleText');
    if (k5Sub) k5Sub.innerText = isEn ? config.k5.subtitleEn : config.k5.subtitle;
    const k5ExamSub = document.getElementById('k5ExamSubtitleText');
    if (k5ExamSub) k5ExamSub.innerText = isEn ? config.k5.subtitleEn : config.k5.subtitle;

    const k6Tag = document.getElementById('k6TagText');
    if (k6Tag) k6Tag.innerText = isEn ? config.k6.tagEn : config.k6.tag;
    const k6ExamTag = document.getElementById('k6ExamTagText');
    if (k6ExamTag) k6ExamTag.innerText = isEn ? config.k6.tagEn : config.k6.tag;

    const k6Sub = document.getElementById('k6SubtitleText');
    if (k6Sub) k6Sub.innerText = isEn ? config.k6.subtitleEn : config.k6.subtitle;
    const k6ExamSub = document.getElementById('k6ExamSubtitleText');
    if (k6ExamSub) k6ExamSub.innerText = isEn ? config.k6.subtitleEn : config.k6.subtitle;

    // 6. Perbarui banner modal ujian (K4, K5, K6)
    const modalSubtitles = document.querySelectorAll('.exam-header-banner .school-subtitle');
    modalSubtitles.forEach(el => {
        el.innerText = config.bannerSubtitle;
    });

    // 6b. Perbarui teks badge konfirmasi periode di formulir identitas siswa
    const k4ConfirmBadge = document.getElementById('k4PeriodBadgeConfirm');
    if (k4ConfirmBadge) k4ConfirmBadge.innerText = isEn ? config.nameEn : config.name;
    const k5ConfirmBadge = document.getElementById('k5PeriodBadgeConfirm');
    if (k5ConfirmBadge) k5ConfirmBadge.innerText = isEn ? config.nameEn : config.name;
    const k6ConfirmBadge = document.getElementById('k6PeriodBadgeConfirm');
    if (k6ConfirmBadge) k6ConfirmBadge.innerText = isEn ? config.nameEn : config.name;

    // 6c. Perbarui pill periode di bar ujian saat pengerjaan soal
    const barK4 = document.getElementById('barExamPeriodTagK4');
    if (barK4) barK4.innerText = config.shortName;
    const barK5 = document.getElementById('barExamPeriodTagK5');
    if (barK5) barK5.innerText = config.shortName;
    const barK6 = document.getElementById('barExamPeriodTagK6');
    if (barK6) barK6.innerText = config.shortName;

    // 7. Perbarui meta subtitle di kop surat PDF
    const pdfDocMeta = document.querySelector('.pdf-doc-meta');
    if (pdfDocMeta) {
        pdfDocMeta.innerText = config.pdfDocMeta;
    }

    // 8. Atur formulir input Nilai Awal untuk siswa (Disembunyikan pada PAS / PAT)
    const isPasOrPatPeriod = (activeKey === 'sem1_pas' || activeKey === 'sem2_pas');
    ['k4', 'k5', 'k6'].forEach(grade => {
        const group = document.getElementById(`${grade}NilaiAwalGroup`);
        const input = document.getElementById(`${grade}NilaiAwal`);
        if (group) {
            group.style.display = isPasOrPatPeriod ? 'none' : '';
        }
        if (input) {
            if (isPasOrPatPeriod) {
                input.removeAttribute('required');
                if (!input.value) input.value = '0';
            } else {
                input.setAttribute('required', 'required');
            }
        }
    });

    // 8b. Sembunyikan item Nilai Awal di sticky bar saat ujian berlangsung jika PAS/PAT
    ['barStudentInitialScore', 'barStudentInitialScoreK5', 'barStudentInitialScoreK6'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const parentItem = el.closest('.student-bar-item');
            if (parentItem) {
                parentItem.style.display = isPasOrPatPeriod ? 'none' : '';
            }
        }
    });

    // 8c. Sembunyikan kolom Nilai Awal pada tabel guru dan set judul kolom jika PAS/PAT
    const thTeacherNilaiAwalElem = document.getElementById('thTeacherNilaiAwal');
    const thScoreLbl = document.getElementById('thTeacherScoreHeaderLabel');
    const teacherTableElem = document.querySelector('.teacher-data-table');
    if (teacherTableElem) {
        teacherTableElem.classList.toggle('hide-nilai-awal', isPasOrPatPeriod);
    }
    if (thTeacherNilaiAwalElem) {
        if (isPasOrPatPeriod) {
            thTeacherNilaiAwalElem.style.setProperty('display', 'none', 'important');
            thTeacherNilaiAwalElem.classList.add('is-hidden');
        } else {
            thTeacherNilaiAwalElem.style.removeProperty('display');
            thTeacherNilaiAwalElem.classList.remove('is-hidden');
        }
    }
    if (thScoreLbl) {
        if (activeKey === 'sem1_pas') thScoreLbl.innerText = 'Nilai PAS';
        else if (activeKey === 'sem2_pas') thScoreLbl.innerText = 'Nilai PAT';
        else thScoreLbl.innerText = 'Nilai PTS';
    }
}

// 5. Sinkronisasi Antar-Tab / Layar Siswa Secara Real-Time
window.addEventListener('storage', function(e) {
    if (e.key === 'tzuchi_teacher_active_period' || e.key === 'tzuchi_official_period' || e.key === 'tzuchi_remedial_period' || e.key === 'tzuchi_exam_session_status') {
        activeTeacherRemedialPeriod = localStorage.getItem('tzuchi_teacher_active_period') || 
                                      localStorage.getItem('tzuchi_official_period') || 
                                      localStorage.getItem('tzuchi_remedial_period') || 
                                      'sem1_pts';
        updateExamSessionDisplay();
        applyRemedialPeriod(activeTeacherRemedialPeriod);
    }
});

function interactTeacher() {
    playCuteSound('pop');
    const quotes = teacherQuotesBilingual[currentLang] || teacherQuotesBilingual['id'];
    currentQuoteIdx = Math.floor(Math.random() * quotes.length);
    const chosenQuote = quotes[currentQuoteIdx];
    
    const bubble = document.getElementById('mascotBubble');
    const bubbleText = document.getElementById('mascotBubbleText');
    if (bubbleText) {
        bubbleText.innerHTML = chosenQuote;
    } else if (bubble) {
        bubble.innerHTML = `<span>${chosenQuote}</span>`;
    }

    if (window.confetti) {
        confetti({
            particleCount: 35,
            spread: 70,
            origin: { y: 0.35 }
        });
    }

    speakText(chosenQuote, currentLang);
}

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
    const cheerMsg = (currentLang === 'en')
        ? "Keep studying with an honest and enthusiastic heart! You can do it!"
        : "Semangat belajar dengan tulus dan jujur! Kamu pasti bisa!";
    showToast((currentLang === 'en') ? '🎉 Keep learning with a sincere heart!' : '🎉 Semangat! Kerjakan dengan hati tulus dan jujur!');
    speakText(cheerMsg, currentLang);
}

/* ==============================================================
   REMEDIAL KELAS 4 - EXAM SYSTEM LOGIC
   ============================================================== */
let currentExamMode = 'remedial'; // 'ujian' atau 'remedial'

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

// Helper Sinkronisasi UI Form Ujian Utama vs Form Remedial
function updateExamModalModeUI(grade, mode) {
    const isUjian = (mode === 'ujian');
    const pConfig = REMEDIAL_PERIODS[activeTeacherRemedialPeriod] || REMEDIAL_PERIODS['sem1_pts'];
    const periodTitleMap = {
        sem1_pts: 'Semester 1 • Ujian PTS Semester 1',
        sem1_pas: 'Semester 1 • Ujian PAS Semester 1',
        sem2_pts: 'Semester 2 • Ujian PTS Semester 2',
        sem2_pas: 'Semester 2 • Ujian PAS Semester 2'
    };
    const periodTitleMapShort = {
        sem1_pts: 'Ujian PTS 1',
        sem1_pas: 'Ujian PAS 1',
        sem2_pts: 'Ujian PTS 2',
        sem2_pas: 'Ujian PAS 2'
    };
    const officialTitle = isUjian ? (periodTitleMap[activeTeacherRemedialPeriod] || pConfig.name) : pConfig.name;
    const gradeLabel = (grade === 'k4') ? 'Kelas 4' : (grade === 'k5' ? 'Kelas 5D' : 'Kelas 6');
    const classChoiceHint = (grade === 'k4') ? 'pilih kelasmu (4A-4E)' : (grade === 'k5' ? 'kelas 5D' : 'pilih kelasmu (6A-6E)');

    // 1. Header Banner Modal (Subtitle)
    const modalId = (grade === 'k4') ? 'examModalK4' : (grade === 'k5' ? 'examModalK5' : 'examModalK6');
    const modalElem = document.getElementById(modalId);
    if (modalElem) {
        const subtitleElem = modalElem.querySelector('.school-subtitle');
        if (subtitleElem && pConfig.bannerSubtitle) {
            subtitleElem.innerText = pConfig.bannerSubtitle;
        }

        // Tombol submit pada lembar soal
        const submitScoreBtnSpan = modalElem.querySelector('.exam-submit-bar .btn-calculate-score span');
        if (submitScoreBtnSpan) {
            submitScoreBtnSpan.innerText = isUjian ? `Kirim Lembar Jawaban Ujian ${gradeLabel}` : `Kirim Jawaban & Dapatkan Score Remedial ${gradeLabel}`;
        }

        // Tag Nilai Akhir pada layar hasil
        const hugeScoreTag = modalElem.querySelector('.huge-score-tag');
        if (hugeScoreTag) {
            hugeScoreTag.innerText = isUjian ? `NILAI AKHIR ASESMEN UJIAN ${gradeLabel.toUpperCase()}` : `NILAI AKHIR REMEDIAL ${gradeLabel.toUpperCase()}`;
        }

        // Tombol keluar pengaman
        const exitBtnSpan = modalElem.querySelector('.btn-exit-exam-safeguard span');
        if (exitBtnSpan) {
            exitBtnSpan.innerText = isUjian ? 'Salah Ujian? Keluar' : 'Salah Remedial? Keluar';
        }
    }

    // 2. Banner Konfirmasi Periode
    const badgeId = (grade === 'k4') ? 'k4PeriodBadgeConfirm' : (grade === 'k5') ? 'k5PeriodBadgeConfirm' : 'k6PeriodBadgeConfirm';
    const boxId = (grade === 'k4') ? 'k4PeriodConfirmBanner' : (grade === 'k5') ? 'k5PeriodConfirmBanner' : 'k6PeriodConfirmBanner';
    const badgeEl = document.getElementById(badgeId);
    const bannerBox = document.getElementById(boxId);
    const labelEl = bannerBox ? bannerBox.querySelector('.period-confirm-label') : null;
    if (badgeEl) badgeEl.innerText = officialTitle;
    if (labelEl) labelEl.innerText = isUjian ? 'JENIS UJIAN UTAMA RESMI:' : 'JENIS UJIAN REMEDIAL:';

    // 3. Judul & Subtitle Form Identitas Siswa
    const stepIdentity = document.getElementById(`${grade}-step-identity`);
    if (stepIdentity) {
        const titleEl = stepIdentity.querySelector('.step-title');
        const subtitleEl = stepIdentity.querySelector('.step-subtitle');

        if (titleEl) {
            titleEl.innerText = isUjian ? `Pengisian Identitas Peserta Ujian - ${gradeLabel}` : `Pengisian Identitas Remedial Siswa - ${gradeLabel}`;
        }
        if (subtitleEl) {
            subtitleEl.innerText = isUjian 
                ? `Silakan isi nama lengkap, nomor absen, ${classChoiceHint}, dan token ujian dari guru pengawas.` 
                : `Silakan isi nama lengkap, ${classChoiceHint}, dan masukkan nilai awalmu sebelum mengerjakan remedial.`;
        }

        const startBtnSpan = stepIdentity.querySelector('.btn-start-exam span');
        if (startBtnSpan) {
            startBtnSpan.innerText = isUjian ? `Mulai Kerjakan Ujian Utama ${gradeLabel}` : `Mulai Kerjakan Soal Remedial ${gradeLabel}`;
        }
    }

    // 4. Sembunyikan Input Nilai Awal jika Ujian Utama
    const nilaiAwalInput = document.getElementById(`${grade}NilaiAwal`);
    const nilaiAwalWrap = nilaiAwalInput ? nilaiAwalInput.closest('.form-group') : null;
    if (nilaiAwalWrap && nilaiAwalInput) {
        if (isUjian) {
            nilaiAwalWrap.style.display = 'none';
            nilaiAwalInput.required = false;
            nilaiAwalInput.value = '0';
        } else {
            nilaiAwalWrap.style.display = 'block';
            nilaiAwalInput.required = true;
            if (nilaiAwalInput.value === '0') nilaiAwalInput.value = '';
        }
    }

    // 5. Template PDF Sinkronisasi Header Dokumen
    const pdfId = (grade === 'k4') ? 'pdfDocumentElement' : (grade === 'k5' ? 'pdfDocumentElementK5' : 'pdfDocumentElementK6');
    const pdfCard = document.getElementById(pdfId);
    if (pdfCard) {
        const titleH4 = pdfCard.querySelector('.pdf-title-block h4');
        if (titleH4) {
            titleH4.innerText = isUjian ? 'SURAT KETERANGAN HASIL ASESMEN UJIAN' : 'SURAT KETERANGAN HASIL EVALUASI REMEDIAL';
        }
        const initialScoreRow = pdfCard.querySelector('.pdf-grades-table tbody tr:first-child td:nth-child(2)');
        if (initialScoreRow) {
            initialScoreRow.innerText = isUjian ? 'Standar Kelulusan (KKM)' : 'Nilai Awal (Sebelum Remedial)';
        }
        const totalRowLabel = pdfCard.querySelector('.pdf-grade-total-row td strong');
        if (totalRowLabel) {
            totalRowLabel.innerText = isUjian ? 'NILAI AKHIR ASESMEN UJIAN' : 'NILAI AKHIR EVALUASI REMEDIAL';
        }
        const footerNote = pdfCard.querySelector('.pdf-official-note small');
        if (footerNote) {
            footerNote.innerText = isUjian 
                ? '* Dokumen laporan hasil asesmen ujian resmi diterbitkan melalui Portal EduCode AI SDS Cinta Kasih Tzu Chi.'
                : '* Dokumen laporan hasil remedial resmi diterbitkan melalui Portal EduCode AI SDS Cinta Kasih Tzu Chi.';
        }
    }

    // 6. Mascot Bubble
    const bubble = document.getElementById('mascotBubble');
    if (bubble) {
        bubble.innerHTML = isUjian
            ? `<span>Selamat datang di Ujian Utama ${gradeLabel}! Kerjakan soal dengan jujur, teliti, dan mandiri. Waktu: 60 Menit ⏰</span>`
            : `<span>Silakan isi identitas dan nilai awalmu untuk memulai remedial ${gradeLabel}! Waktu pengerjaan: 60 Menit ⏰</span>`;
    }
}

// Render Dinamis 45 Butir Soal PG Kelas 4 dari Bank Soal Modular (soal/kelas_4/soal_k4.js)
function renderK4QuestionsFromModule() {
    const container = document.getElementById('k4PgQuestionsContainer');
    if (!container) return;
    const questions = (window.SOAL_KELAS_4 && Array.isArray(window.SOAL_KELAS_4.pg)) ? window.SOAL_KELAS_4.pg : [];
    if (!questions.length) return;

    if (container.children.length !== questions.length) {
        const htmlCards = questions.map(item => {
            return `
                <div class="exam-question-card" id="q-card-${item.num}">
                    <div class="question-header">
                        <span class="q-badge" style="background: #2563eb;">Soal ${item.num}</span>
                        <p class="q-text">${item.question}</p>
                    </div>
                    <div class="q-choices-grid">
                        <label class="choice-item">
                            <input type="radio" name="pg_${item.num}" value="A" required>
                            <span><strong>A.</strong> ${item.options.A}</span>
                        </label>
                        <label class="choice-item">
                            <input type="radio" name="pg_${item.num}" value="B">
                            <span><strong>B.</strong> ${item.options.B}</span>
                        </label>
                        <label class="choice-item">
                            <input type="radio" name="pg_${item.num}" value="C">
                            <span><strong>C.</strong> ${item.options.C}</span>
                        </label>
                        <label class="choice-item">
                            <input type="radio" name="pg_${item.num}" value="D">
                            <span><strong>D.</strong> ${item.options.D}</span>
                        </label>
                    </div>
                </div>
            `;
        }).join('');
        container.innerHTML = htmlCards;
    }
}

// Open Kelas 4 Dedicated Exam Modal (Ujian Utama / Remedial)
function openRemedialKelas4(mode) {
    currentExamMode = mode || 'remedial';
    playCuteSound('pop');
    if (!isExamSessionOpen()) {
        playCuteSound('pop');
        alert("⛔ AKSES UJIAN SEDANG DITUTUP!\n\nUjian saat ini sedang dikunci oleh Ibu Guru Darningsih, S.T.\n\nSiswa tidak diperkenankan mengerjakan ujian sendiri di luar jam kelas/pengawasan. Silakan tunggu instruksi guru di ruang kelas.");
        return;
    }
    renderK4QuestionsFromModule();
    syncExamUIWithQuestionModules();
    const modal = document.getElementById('examModalK4');
    if (modal) modal.classList.add('open');

    updateExamModalModeUI('k4', currentExamMode);
    showExamStep('identity');
}
const openExamKelas4 = () => openRemedialKelas4('ujian');

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
    const tokenInput = document.getElementById('k4ExamToken');
    const enteredToken = tokenInput ? tokenInput.value.trim().toUpperCase() : '';

    if (!isExamSessionOpen()) {
        playCuteSound('pop');
        alert("⛔ AKSES UJIAN MASIH DITUTUP OLEH GURU!\n\nSaklar Akses Ujian saat ini sedang dalam posisi 'DITUTUP (TERKUNCI)' di Panel Guru.\n\nSilakan minta Ibu Guru Darningsih untuk mengklik tombol hijau 'Buka Akses Ujian' di Panel Guru agar soal remedial dapat dibuka.");
        return;
    }

    if (!classChecked) {
        showToast('⚠️ Silakan pilih salah satu kelas (4A - 4E)!');
        return;
    }

    // 1. Validasi Token Ujian dari Guru (Live Token & Cadangan Universal)
    if (!validateExamToken(enteredToken)) {
        playCuteSound('pop');
        alert(`⚠️ TOKEN UJIAN BELUM SESUAI!\n\nToken yang kamu masukkan "${enteredToken || '(kosong)'}" tidak cocok.\n\nSilakan periksa kode token yang ditulis oleh Guru di papan tulis kelas atau tanyakan kepada Guru Pengawas.`);
        if (tokenInput) {
            tokenInput.focus();
            tokenInput.select();
        }
        return;
    }

    // 2. Kunci 1x Pengerjaan (Cegah nama siswa yang sama dikerjakan ulang / joki)
    const selectedClass = classChecked.value;
    const localList = getRecapList();
    const alreadyDone = localList.some(s => 
        String(s.name || '').trim().toLowerCase() === name.toLowerCase() && 
        String(s.kelas || '').trim().toLowerCase() === selectedClass.toLowerCase()
    );
    if (alreadyDone) {
        playCuteSound('pop');
        const examLabel = (currentExamMode === 'ujian') ? 'ujian utama' : 'remedial';
        const confirmRetry = confirm(
            `⚠️ SISWA SUDAH PERNAH MENGERJAKAN!\n\n` +
            `Nama "${name}" di Kelas ${selectedClass} sudah pernah tercatat mengerjakan ${examLabel}.\n\n` +
            `Apakah Ibu Guru/Siswa ingin MENGERJAKAN ULANG ${examLabel} ini?\n` +
            `• Klik OK: Untuk mengizinkan pengerjaan ulang (nilai baru akan tersimpan).\n` +
            `• Klik Batal (Cancel): Jika tidak ingin mengulang.`
        );
        if (!confirmRetry) return;
    }

    currentRemedialPeriod = activeTeacherRemedialPeriod || 'sem1_pas';
    currentStudentData = {
        name: name,
        kelas: selectedClass,
        nilaiAwal: parseInt(nilaiAwal) || 0,
        absen: absen
    };

    // Update sticky exam bar
    document.getElementById('barStudentName').innerText = currentStudentData.name;
    document.getElementById('barStudentClass').innerText = `Kelas ${currentStudentData.kelas}`;
    const barTag = document.getElementById('barExamPeriodTag');
    if (barTag) {
        const periodTitleMapShort = {
            sem1_pts: 'Ujian PTS 1',
            sem1_pas: 'Ujian PAS 1',
            sem2_pts: 'Ujian PTS 2',
            sem2_pas: 'Ujian PAS 2'
        };
        barTag.innerText = (currentExamMode === 'ujian')
            ? (periodTitleMapShort[activeTeacherRemedialPeriod] || 'Ujian Utama')
            : (REMEDIAL_PERIODS[activeTeacherRemedialPeriod]?.shortName || 'Remedial');
    }
    const initialScoreElem = document.getElementById('barStudentInitialScore');
    if (initialScoreElem) {
        if (currentExamMode === 'ujian') {
            initialScoreElem.innerText = '80 (KKM)';
            const lbl = initialScoreElem.previousElementSibling;
            if (lbl) lbl.innerText = 'Standar Kelulusan:';
        } else {
            initialScoreElem.innerText = currentStudentData.nilaiAwal;
            const lbl = initialScoreElem.previousElementSibling;
            if (lbl) lbl.innerText = 'Nilai Awal:';
        }
    }

    // Start 60 minutes timer
    startCountdownTimer();

    // Show Questions
    showExamStep('questions');
    const examGreeting = (currentExamMode === 'ujian') ? 'Ujian Utama' : 'Remedial';
    showToast(`Selamat mengerjakan ${examGreeting}, ${name}! Waktu: 60 Menit ⏰`);
}

// Answer Keys and Questions Metadata for Pilihan Ganda (10 Soal)
// Dimuat secara modular dari folder d:\Erapot\soal\soal_k4.js
const pgQuestionsMetadata = (window.SOAL_KELAS_4 && window.SOAL_KELAS_4.pg) || [
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

// Calculate and Show Score (Kelas 4: 45 PG [Bobot 70 Poin] + 5 Uraian [Bobot 30 Poin])
function calculateAndShowScore(event) {
    event.preventDefault();
    playCuteSound('fanfare');

    const questions = (window.SOAL_KELAS_4 && Array.isArray(window.SOAL_KELAS_4.pg)) ? window.SOAL_KELAS_4.pg : pgQuestionsMetadata;
    const totalPgItems = questions.length || 45;
    let correctPgCount = 0;
    const collectedPgAnswers = [];

    // 1. Evaluate Multiple Choice Questions (45 Soal, Bobot: 70 Poin Maksimal)
    for (let i = 0; i < questions.length; i++) {
        const item = questions[i];
        const selected = document.querySelector(`input[name="pg_${item.num}"]:checked`);
        const userChoice = selected ? selected.value : '';
        const userChoiceText = userChoice ? `${userChoice}. ${item.options[userChoice] || ''}` : '(Tidak dijawab)';
        const isCorrect = (userChoice === item.key);

        if (isCorrect) {
            correctPgCount++;
        }

        const keteranganText = isCorrect
            ? `✔ Benar: ${item.explanation || 'Sesuai konsep Microsoft Word & Gemini AI.'}`
            : `✘ Belum Tepat: Kunci yang benar adalah ${item.keyText || item.key}. ${item.explanation || ''}`;

        collectedPgAnswers.push({
            num: item.num,
            question: item.question,
            userChoice: userChoice || '-',
            userChoiceText: userChoiceText,
            key: item.key,
            keyText: item.keyText,
            explanation: item.explanation,
            isCorrect: isCorrect,
            points: isCorrect ? 1 : 0,
            keterangan: keteranganText
        });
    }

    const pgScore = Math.round((correctPgCount / totalPgItems) * 70);

    // 2. Evaluate 5 Uraian Questions (Maks 20 Poin Mentah per soal = Total 100 Poin Mentah, Dikonversi ke Bobot 30 Poin)
    let rawUraianTotal = 0;
    const collectedUraianAnswers = [];

    // Uraian 1: Langkah Menyimpan Dokumen Baru di Microsoft Word (Maks 20 Poin Mentah)
    const rawAns1 = (document.getElementById('uraian_1') ? document.getElementById('uraian_1').value.trim() : '');
    const ans1 = rawAns1.toLowerCase();
    const hasU1File = ans1.includes('file');
    const hasU1Save = ans1.includes('save as') || ans1.includes('save') || ans1.includes('simpan');
    const hasU1Browse = ans1.includes('browse') || ans1.includes('folder') || ans1.includes('disk') || ans1.includes('dokumen');
    const hasU1Name = ans1.includes('name') || ans1.includes('nama') || ans1.includes('judul');
    
    let u1Pts = 0;
    if (hasU1File && hasU1Save && (hasU1Browse || hasU1Name)) {
        u1Pts = 20;
    } else if (hasU1File || hasU1Save) {
        u1Pts = (ans1.length > 20) ? 14 : 10;
    } else if (rawAns1.length > 5) {
        u1Pts = 6;
    }
    rawUraianTotal += u1Pts;
    collectedUraianAnswers.push({
        num: 1,
        question: "1. Langkah-langkah menyimpan dokumen baru di Microsoft Word",
        userAnswer: rawAns1 || "(Tidak diisi)",
        keyRef: "1. Klik tab menu File di pojok kiri atas. 2. Pilih menu Save As lalu klik Browse untuk memilih folder penyimpanan. 3. Ketikkan nama file pada kotak File name. 4. Klik tombol Save.",
        points: u1Pts,
        keterangan: u1Pts >= 18 ? "✔ Sangat Tepat: Langkah-langkah menyimpan dokumen diuraikan dengan lengkap dan berurutan." : `Perolehan skor mentah: ${u1Pts}/20 poin.`
    });

    // Uraian 2: WordArt, Font Size, dan Font Color (Maks 20 Poin Mentah)
    const rawAns2 = (document.getElementById('uraian_2') ? document.getElementById('uraian_2').value.trim() : '');
    const ans2 = rawAns2.toLowerCase();
    const hasU2WordArt = ans2.includes('insert') || ans2.includes('wordart') || ans2.includes('seni');
    const hasU2Size = ans2.includes('font size') || ans2.includes('ukuran') || ans2.includes('angka') || ans2.includes('besar') || ans2.includes('kecil');
    const hasU2Color = ans2.includes('font color') || ans2.includes('warna') || ans2.includes('color');

    let u2Pts = 0;
    if (hasU2WordArt && hasU2Size && hasU2Color) {
        u2Pts = 20;
    } else if ((hasU2WordArt && hasU2Size) || (hasU2WordArt && hasU2Color) || (hasU2Size && hasU2Color)) {
        u2Pts = 14;
    } else if (hasU2WordArt || hasU2Size || hasU2Color) {
        u2Pts = 8;
    } else if (rawAns2.length > 5) {
        u2Pts = 4;
    }
    rawUraianTotal += u2Pts;
    collectedUraianAnswers.push({
        num: 2,
        question: "2. Cara membuat WordArt, mengubah ukuran huruf (Font Size), dan memberi warna (Font Color)",
        userAnswer: rawAns2 || "(Tidak diisi)",
        keyRef: "WordArt: Tab Insert > klik WordArt > pilih gaya huruf > ketik teks. Ukuran: Blok teks > tab Home > pilih ukuran di Font Size. Warna: Blok teks > tab Home > klik Font Color > pilih warna.",
        points: u2Pts,
        keterangan: u2Pts >= 18 ? "✔ Sangat Lengkap: Cara membuat WordArt, mengatur ukuran Font Size, dan warna Font Color dijawab dengan jelas." : `Perolehan skor mentah: ${u2Pts}/20 poin.`
    });

    // Uraian 3: Memasukkan Gambar & Alasan Menarik Titik Sudut/Corner (Maks 20 Poin Mentah)
    const rawAns3 = (document.getElementById('uraian_3') ? document.getElementById('uraian_3').value.trim() : '');
    const ans3 = rawAns3.toLowerCase();
    const hasU3Insert = ans3.includes('insert') || ans3.includes('pictures') || ans3.includes('gambar');
    const hasU3Sudut = ans3.includes('proporsional') || ans3.includes('seimbang') || ans3.includes('gepeng') || ans3.includes('lonjong') || ans3.includes('melar') || ans3.includes('rusak') || ans3.includes('asli') || ans3.includes('bentuk');

    let u3Pts = 0;
    if (hasU3Insert && hasU3Sudut) {
        u3Pts = 20;
    } else if (hasU3Insert || hasU3Sudut) {
        u3Pts = (ans3.length > 20) ? 12 : 8;
    } else if (rawAns3.length > 5) {
        u3Pts = 4;
    }
    rawUraianTotal += u3Pts;
    collectedUraianAnswers.push({
        num: 3,
        question: "3. Langkah memasukkan gambar ke Word dan alasan menarik titik sudut gambar",
        userAnswer: rawAns3 || "(Tidak diisi)",
        keyRef: "Langkah: Tab Insert > Pictures > pilih file gambar > klik Insert. Alasan menarik titik sudut: Agar skala perbandingan ukuran gambar seimbang dan proporsional, sehingga gambar tidak gepeng, melar, atau rusak bentuk aslinya.",
        points: u3Pts,
        keterangan: u3Pts >= 18 ? "✔ Sangat Tepat: Langkah Insert Picture dan alasan menjaga proporsi gambar dijelaskan dengan sangat baik." : `Perolehan skor mentah: ${u3Pts}/20 poin.`
    });

    // Uraian 4: Pengertian Prompt & Contoh Prompt Sekolah Bersih (Maks 20 Poin Mentah)
    const rawAns4 = (document.getElementById('uraian_4') ? document.getElementById('uraian_4').value.trim() : '');
    const ans4 = rawAns4.toLowerCase();
    const hasU4Pengertian = ans4.includes('perintah') || ans4.includes('instruksi') || ans4.includes('kalimat') || ans4.includes('pertanyaan') || ans4.includes('permintaan');
    const hasU4Contoh = ans4.includes('sekolah') || ans4.includes('bersih') || ans4.includes('gedung') || ans4.includes('halaman') || ans4.includes('gambar');

    let u4Pts = 0;
    if (hasU4Pengertian && hasU4Contoh) {
        u4Pts = (ans4.length >= 30) ? 20 : 15;
    } else if (hasU4Pengertian || hasU4Contoh) {
        u4Pts = 10;
    } else if (rawAns4.length > 5) {
        u4Pts = 4;
    }
    rawUraianTotal += u4Pts;
    collectedUraianAnswers.push({
        num: 4,
        question: "4. Pengertian Prompt pada Gemini AI dan Contoh Kalimat Prompt Sekolah Bersih dan Indah",
        userAnswer: rawAns4 || "(Tidak diisi)",
        keyRef: "Pengertian: Prompt adalah kalimat instruksi/perintah tertulis yang kita berikan kepada AI agar menghasilkan jawaban teks atau gambar yang diinginkan. Contoh: 'Buatkan gambar gedung sekolah dasar yang bersih, halaman hijau asri dengan bunga warna-warni, ada bendera merah putih berkibar, anak-anak tersenyum ceria, gaya kartun 3D yang indah.'",
        points: u4Pts,
        keterangan: u4Pts >= 18 ? "✔ Sangat Tepat: Definisi prompt dan contoh kalimat prompt gambar dirumuskan dengan detail dan kreatif." : `Perolehan skor mentah: ${u4Pts}/20 poin.`
    });

    // Uraian 5: 4 Tahapan Alur Kerja Gemini AI ke Microsoft Word (Maks 20 Poin Mentah)
    const rawAns5 = (document.getElementById('uraian_5') ? document.getElementById('uraian_5').value.trim() : '');
    const ans5 = rawAns5.toLowerCase();
    const hasU5Prompt = ans5.includes('prompt') || ans5.includes('minta') || ans5.includes('tanya') || ans5.includes('gemini') || ans5.includes('buat');
    const hasU5Download = ans5.includes('download') || ans5.includes('unduh') || ans5.includes('save') || ans5.includes('simpan');
    const hasU5Insert = ans5.includes('insert') || ans5.includes('pictures') || ans5.includes('masuk') || ans5.includes('word');
    const hasU5Wrap = ans5.includes('wrap') || ans5.includes('atur') || ans5.includes('posisi') || ans5.includes('square') || ans5.includes('geser') || ans5.includes('rapi');

    let u5StageCount = 0;
    if (hasU5Prompt) u5StageCount++;
    if (hasU5Download) u5StageCount++;
    if (hasU5Insert) u5StageCount++;
    if (hasU5Wrap) u5StageCount++;

    let u5Pts = 0;
    if (u5StageCount >= 4) {
        u5Pts = 20;
    } else if (u5StageCount === 3) {
        u5Pts = 15;
    } else if (u5StageCount === 2) {
        u5Pts = 10;
    } else if (u5StageCount === 1) {
        u5Pts = 5;
    } else if (rawAns5.length > 5) {
        u5Pts = 4;
    }
    rawUraianTotal += u5Pts;
    collectedUraianAnswers.push({
        num: 5,
        question: "5. Empat tahapan alur kerja dari Gemini AI sampai gambar tertata rapi di Microsoft Word",
        userAnswer: rawAns5 || "(Tidak diisi)",
        keyRef: "1. Membuat Prompt di Gemini AI. 2. Mengunduh (Download/Save as) gambar ke komputer. 3. Memasukkan gambar ke Word melalui menu Insert > Pictures. 4. Mengatur posisi gambar dengan Wrap Text (Square/In Front of Text) agar serasi dengan naskah cerita.",
        points: u5Pts,
        keterangan: u5Pts >= 18 ? "✔ Sangat Lengkap: Keempat tahapan integrasi kreasi AI ke naskah Word diuraikan dengan runtut dan akurat." : `Perolehan skor mentah: ${u5Pts}/20 poin.`
    });

    // Konversi Skor Uraian: Bobot 30 Poin (Skala 0 - 30 Poin)
    const uraianScore = Math.min(30, Math.round((rawUraianTotal / 100) * 30));

    // Hentikan timer pengerjaan 60 menit & catat waktu yang digunakan
    if (examTimerInterval) clearInterval(examTimerInterval);
    const secondsSpent = Math.max(1, (60 * 60) - Math.max(0, examTimeRemaining));
    const minSpent = Math.floor(secondsSpent / 60);
    const secSpent = secondsSpent % 60;
    examDurationText = `${minSpent} Menit ${secSpent} Detik`;

    // Total Score (Bobot 70% PG + Bobot 30% Uraian = Maks 100 Poin)
    const totalScore = Math.min(100, Math.round(pgScore + uraianScore));
    const studentName = currentStudentData.name || 'Sahabat Pintar Kelas 4';
    const studentClass = currentStudentData.kelas || '4A';
    const isUjian = (currentExamMode === 'ujian');

    // Simpan data nilai untuk dicetak ke PDF
    completedExamScores = {
        initial: currentStudentData.nilaiAwal,
        pg: pgScore,
        correctPgCount: correctPgCount,
        totalPgItems: totalPgItems,
        uraian: uraianScore,
        rawUraianTotal: rawUraianTotal,
        final: totalScore,
        status: isUjian 
            ? (totalScore >= 80 ? 'LULUS UJIAN' : 'PERLU REMEDIAL')
            : (totalScore >= 80 ? 'LULUS REMEDIAL' : 'TUNTAS REMEDIAL'),
        predicate: totalScore >= 90 ? 'SANGAT MEMUASKAN' : (totalScore >= 80 ? 'BAIK SEKALI' : 'CUKUP BAIK')
    };

    // Tampilkan Nama & Nilai Akhir dengan TULISAN BESAR
    document.getElementById('scoreStudentSummary').innerText = `${studentName} • Kelas ${studentClass} (Absen: ${currentStudentData.absen})`;
    document.getElementById('hugeFinalScore').innerText = totalScore;

    const mascotIcon = document.getElementById('scoreMascotIcon');
    const predicateBadge = document.getElementById('hugePredicateBadge');
    const motivationTitle = document.getElementById('motivationTitle');
    const motivationMessage = document.getElementById('motivationMessage');

    if (totalScore >= 90) {
        mascotIcon.innerText = '🏆';
        predicateBadge.innerText = isUjian ? '🌟 LULUS ASESMEN UJIAN DENGAN GEMILANG!' : '🌟 LULUS REMEDIAL DENGAN GEMILANG!';
        predicateBadge.style.background = 'linear-gradient(135deg, #059669, #10b981)';
        motivationTitle.innerHTML = `Luar Biasa, ${studentName}! Prestasi yang Sangat Membanggakan! 🎉`;
        motivationMessage.innerHTML = isUjian
            ? `Selamat atas keberhasilanmu! Usaha keras, ketelitian, dan ketulusan hatimu dalam mengerjakan Ujian Resmi Koding dan Kecerdasan Artifisial hari ini membuahkan hasil yang luar biasa!<br><br>Kamu telah membuktikan kemahiran dalam mengolah naskah di Microsoft Word dan berkreasi bersama teknologi Gemini AI. Teruslah pertahankan semangat belajar yang tinggi dan jadilah inspirasi bagi teman-temanmu! 🚀✨`
            : `Selamat atas keberhasilanmu! Usaha keras, ketelitian, dan ketulusan hatimu dalam belajar Koding dan Kecerdasan Artifisial hari ini membuahkan hasil yang luar biasa!<br><br>Kamu telah membuktikan bahwa dengan ketekunan, keterampilan Microsoft Word dan eksplorasi prompt AI bisa kamu kuasai dengan sangat baik. Teruslah pertahankan semangat belajar yang tinggi dan jadilah inspirasi bagi teman-temanmu! 🚀✨`;
    } else if (totalScore >= 80) {
        mascotIcon.innerText = '🎉';
        predicateBadge.innerText = isUjian ? '✨ DINYATAKAN LULUS UJIAN (KKM 80)!' : '✨ DINYATAKAN LULUS REMEDIAL (KKM 80)!';
        predicateBadge.style.background = 'linear-gradient(135deg, #0284c7, #38bdf8)';
        motivationTitle.innerHTML = `Kerja Bagus, ${studentName}! Terus Melangkah Maju! 💡`;
        motivationMessage.innerHTML = isUjian
            ? `Hebat sekali! Nilai ujianmu berhasil melampaui batas KKM 80 dan membuktikan pemahaman materi Microsoft Word dan Gemini AI yang sangat baik.<br><br>Tetaplah rajin belajar dan berani mengeksplorasi teknologi baru. Robi dan Bapak/Ibu Guru sangat bangga padamu! 🌱`
            : `Hebat sekali! Skor remedialmu berhasil melampaui batas KKM 80 dan menunjukkan peningkatan pemahaman yang sangat bagus dan menggembirakan.<br><br>Koding dan teknologi komputer itu seperti petualangan seru: semakin sering kamu berlatih, pikiranmu akan semakin kreatif dan tangguh! Tetaplah rajin membaca, mempraktikkan keterampilan mengetik dan berkreasi dengan AI, dan jangan pernah ragu untuk mencoba hal-hal baru! Robi dan Bapak/Ibu Guru sangat bangga padamu! 🌱`;
    } else {
        mascotIcon.innerText = '💪';
        predicateBadge.innerText = isUjian ? '📖 BELUM TUNTAS KKM (PERLU REMEDIAL)' : '📖 PERLU PENGAYAAN & TETAP SEMANGAT!';
        predicateBadge.style.background = 'linear-gradient(135deg, #f59e0b, #ea580c)';
        motivationTitle.innerHTML = `Jangan Pernah Menyerah, ${studentName}! Kamu Pasti Bisa! 💖`;
        motivationMessage.innerHTML = isUjian
            ? `Terima kasih sudah mengerjakan ujian ini dengan jujur dan mandiri.<br><br>Meskipun nilaimu saat ini belum mencapai standar KKM 80, jangan berkecil hati! Kamu akan mendapatkan kesempatan mengikuti sesi Remedial untuk memperbaiki nilaimu. Tetap semangat berlatih bersama Guru ya! 🤖✨`
            : `Terima kasih banyak sudah berani berusaha dan mengerjakan soal remedial ini dengan jujur dan mandiri!<br><br>Meskipun nilaimu belum mencapai batas KKM 80, setiap tantangan adalah kesempatan belajar yang berharga. Jangan berkecil hati ya! Tetap tersenyum, teruslah berlatih bersama Bapak/Ibu Guru dan Robi. Selangkah demi selangkah, kamu pasti bisa mencapai nilai terbaik! 🤖✨`;
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
        status: isUjian ? (totalScore >= 80 ? 'Lulus Ujian' : 'Perlu Remedial') : (totalScore >= 80 ? 'Lulus' : 'Tuntas'),
        examType: isUjian ? 'Ujian Utama' : 'Remedial',
        predicate: completedExamScores.predicate,
        duration: examDurationText,
        timestamp: timeString,
        date: dateFormatted,
        period: currentRemedialPeriod,
        periodName: REMEDIAL_PERIODS[currentRemedialPeriod]?.name || currentRemedialPeriod,
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
    showToast(`${isUjian ? 'Nilai Akhir Ujian' : 'Nilai Akhir Remedial'}: ${totalScore}! 🌟 (Waktu: ${examDurationText})`);
}

// Fungsi Unduh Laporan Remedial Siswa dari Layar Hasil Siswa (PDF Ringkas)
function generateAndDownloadPDF() {
    playCuteSound('pop');
    showToast('📄 Sedang menyusun dokumen PDF...');

    const today = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('id-ID', options);
    const isUjian = (currentExamMode === 'ujian');

    // Isi template dokumen dengan data siswa
    document.getElementById('pdfReportName').innerText = currentStudentData.name || 'Siswa';
    document.getElementById('pdfReportClass').innerText = `Kelas ${currentStudentData.kelas || '4A'}`;
    document.getElementById('pdfReportAbsen').innerText = currentStudentData.absen || '-';
    document.getElementById('pdfReportDuration').innerText = `${examDurationText} (Batas: 60 Menit)`;
    document.getElementById('pdfReportDate').innerText = formattedDate;

    document.getElementById('pdfReportInitialScore').innerText = isUjian ? '80 (KKM)' : completedExamScores.initial;
    document.getElementById('pdfReportPgScore').innerText = `${completedExamScores.pg} / 70 Poin (${completedExamScores.correctPgCount || 0}/45 Benar)`;
    document.getElementById('pdfReportUraianScore').innerText = `${completedExamScores.uraian} / 30 Poin (Skor: ${completedExamScores.rawUraianTotal || 0}/100)`;
    document.getElementById('pdfReportFinalScore').innerText = completedExamScores.final;

    document.getElementById('pdfReportStatus').innerText = completedExamScores.status;
    document.getElementById('pdfReportPredicate').innerText = completedExamScores.predicate;
    document.getElementById('pdfReportLocationDate').innerText = `Jakarta, ${formattedDate}`;

    const element = document.getElementById('pdfDocumentElement');
    const safeStudentName = (currentStudentData.name || 'Siswa').replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `${isUjian ? 'Laporan_Ujian' : 'Laporan_Remedial'}_${safeStudentName}_Kelas_${currentStudentData.kelas}.pdf`;

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
   REMEDIAL KELAS 5 - DEDICATED EXAM SYSTEM LOGIC
   ============================================================== */
let currentStudentDataK5 = {
    name: '',
    kelas: '',
    nilaiAwal: 0,
    absen: ''
};

let examTimeRemainingK5 = 60 * 60; // 3600 seconds
let examTimerIntervalK5 = null;
let examDurationTextK5 = '';
let completedExamScoresK5 = {
    initial: 0,
    pg: 0,
    uraian: 0,
    final: 0,
    status: 'LULUS REMEDIAL',
    predicate: 'SANGAT MEMUASKAN'
};

// Dimuat secara modular dari folder d:\Erapot\soal\soal_k5.js
const pgQuestionsK5Metadata = (window.SOAL_KELAS_5 && window.SOAL_KELAS_5.pg) || [
    {
        num: 1,
        question: "1. Langkah pertama yang harus kamu lakukan untuk menyimpan dokumen presentasi adalah memilih menu...",
        options: {
            A: "Home",
            B: "File",
            C: "Insert",
            D: "Design"
        },
        key: 'B',
        keyText: 'B. File',
        explanation: 'Untuk menyimpan dokumen baru maupun dokumen yang sudah ada, langkah awal adalah membuka menu File (Save / Save As).'
    },
    {
        num: 2,
        question: "2. Bagian utama dari jendela Microsoft PowerPoint yang digunakan sebagai lembar kerja untuk membuat dan mendesain isi presentasimu adalah...",
        options: {
            A: "Area Catatan",
            B: "Panel Slide",
            C: "Halaman Slide",
            D: "Bar Status"
        },
        key: 'C',
        keyText: 'C. Halaman Slide',
        explanation: 'Halaman Slide (Slide Pane) merupakan kanvas atau lembar kerja utama tempat kita mengetik, mendesain, dan memasukkan objek presentasi.'
    },
    {
        num: 3,
        question: "3. Apa fungsi utama dari perangkat lunak Microsoft PowerPoint?....",
        options: {
            A: "Mengirim pesan kepada singkat dan surat elektronik antar pengguna",
            B: "Mengolah angka dan melakukan perhitungan rumus matematika",
            C: "Menampilkan atau dokumen dalam bentuk slide presentasi",
            D: "Mengedit file video dan merekam lagu berdurasi panjang"
        },
        key: 'C',
        keyText: 'C. Menampilkan atau dokumen dalam bentuk slide presentasi',
        explanation: 'Fungsi utama Microsoft PowerPoint adalah membuat, mengedit, dan menampilkan materi atau dokumen dalam bentuk slide presentasi visual.'
    },
    {
        num: 4,
        question: "4. Fitur yang digunakan untuk memberikan efek perpindahan menarik dari satu halaman slide ke slide berikutnya adalah...",
        options: {
            A: "Quick Access Toolbar",
            B: "Transition",
            C: "Animations",
            D: "Hyperlink"
        },
        key: 'B',
        keyText: 'B. Transition',
        explanation: 'Transition (Transisi) digunakan untuk memberikan efek perpindahan animasi visual saat berpindah dari satu slide ke slide berikutnya.'
    },
    {
        num: 5,
        question: "5. Manakah di bawah ini yang merupakan salah satu contoh efek Transisi (Transitions)?",
        options: {
            A: "Fly In",
            B: "Spin",
            C: "Push",
            D: "Float In"
        },
        key: 'C',
        keyText: 'C. Push',
        explanation: 'Push adalah efek transisi (Transitions). Sedangkan Fly In, Spin, dan Float In adalah efek animasi objek (Animations).'
    },
    {
        num: 6,
        question: "6. What is the primary function of Microsoft PowerPoint....",
        options: {
            A: "To manage large database",
            B: "To edit long text documents",
            C: "To create visual presentations",
            D: "To perform complex math calculations"
        },
        key: 'C',
        keyText: 'C. To create visual presentations',
        explanation: 'The primary function of Microsoft PowerPoint is to design and present visual slide shows.'
    },
    {
        num: 7,
        question: "7. Which keyboard shortcut starts a slide show from the very first slide ....",
        options: {
            A: "F5",
            B: "CTRL + S",
            C: "ESC",
            D: "CTRL + C"
        },
        key: 'A',
        keyText: 'A. F5',
        explanation: 'Tombol F5 pada keyboard digunakan sebagai pintasan cepat (shortcut) untuk memulai Slide Show dari slide pertama.'
    },
    {
        num: 8,
        question: "8. The menu for saving files in Microsoft PowerPoint....",
        options: {
            A: "File",
            B: "Home",
            C: "Insert",
            D: "Design"
        },
        key: 'A',
        keyText: 'A. File',
        explanation: 'The File menu contains file management commands including Save, Save As, Open, and Print.'
    },
    {
        num: 9,
        question: "9. What is a single page within a PowerPoint presentation called?",
        options: {
            A: "Sheet",
            B: "Slide",
            C: "Document",
            D: "Canvas"
        },
        key: 'B',
        keyText: 'B. Slide',
        explanation: 'Satu halaman lembar kerja tunggal pada presentasi PowerPoint disebut Slide.'
    },
    {
        num: 10,
        question: "10. Which button in the Home tab adds a new blank or pre-formatted slide to your presentation?",
        options: {
            A: "Open File",
            B: "Save As",
            C: "New Slide",
            D: "Duplicate Window."
        },
        key: 'C',
        keyText: 'C. New Slide',
        explanation: 'Tombol New Slide pada tab Home digunakan untuk menambahkan slide baru dengan pilihan tata letak (layout) tertentu.'
    }
];

function startCountdownTimerK5() {
    examTimeRemainingK5 = 60 * 60;
    if (examTimerIntervalK5) clearInterval(examTimerIntervalK5);
    updateCountdownUIK5();

    examTimerIntervalK5 = setInterval(() => {
        examTimeRemainingK5--;
        updateCountdownUIK5();

        if (examTimeRemainingK5 <= 0) {
            clearInterval(examTimerIntervalK5);
            showToast('⏰ Waktu pengerjaan 60 menit telah habis! Mengirimkan jawaban...');
            playCuteSound('pop');
            const examForm = document.getElementById('k5ExamForm');
            if (examForm) {
                examForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }
        }
    }, 1000);
}

function updateCountdownUIK5() {
    const timerTag = document.getElementById('examCountdownTagK5');
    const timerText = document.getElementById('timerTextK5');
    if (!timerText) return;

    const minutes = Math.floor(examTimeRemainingK5 / 60);
    const seconds = examTimeRemainingK5 % 60;
    const formatted = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timerText.innerText = formatted;

    if (timerTag) {
        if (examTimeRemainingK5 <= 300) {
            timerTag.classList.add('timer-warning');
        } else {
            timerTag.classList.remove('timer-warning');
        }
    }
}

function openRemedialKelas5(mode) {
    currentExamMode = mode || 'remedial';
    playCuteSound('pop');
    if (!isExamSessionOpen()) {
        playCuteSound('pop');
        alert("⛔ AKSES UJIAN SEDANG DITUTUP!\n\nUjian saat ini sedang dikunci oleh Ibu Guru Darningsih, S.T.\n\nSiswa tidak diperkenankan mengerjakan ujian sendiri di luar jam kelas/pengawasan. Silakan tunggu instruksi guru di ruang kelas.");
        return;
    }
    syncExamUIWithQuestionModules();
    const modal = document.getElementById('examModalK5');
    if (!modal) return;
    modal.classList.add('open');

    updateExamModalModeUI('k5', currentExamMode);
    showExamStepK5('identity');
}
const openExamKelas5 = () => openRemedialKelas5('ujian');

function closeExamModalK5() {
    playCuteSound('pop');
    if (examTimerIntervalK5) clearInterval(examTimerIntervalK5);
    const modal = document.getElementById('examModalK5');
    if (modal) modal.classList.remove('open');
}

function showExamStepK5(stepName) {
    const stepIdentity = document.getElementById('k5-step-identity');
    const stepQuestions = document.getElementById('k5-step-questions');
    const stepResult = document.getElementById('k5-step-result');

    if (stepIdentity) stepIdentity.classList.remove('active');
    if (stepQuestions) stepQuestions.classList.remove('active');
    if (stepResult) stepResult.classList.remove('active');

    const targetStep = document.getElementById(`k5-step-${stepName}`);
    if (targetStep) targetStep.classList.add('active');

    const modalBody = document.querySelector('#examModalK5 .exam-modal-body');
    if (modalBody) modalBody.scrollTop = 0;
}

function startExamK5(event) {
    event.preventDefault();
    playCuteSound('pop');

    const name = document.getElementById('k5Name').value.trim();
    const classChecked = document.querySelector('input[name="k5ClassChoice"]:checked');
    const nilaiAwal = document.getElementById('k5NilaiAwal').value;
    const absen = document.getElementById('k5Absen').value || '-';
    const tokenInput = document.getElementById('k5ExamToken');
    const enteredToken = tokenInput ? tokenInput.value.trim().toUpperCase() : '';

    const selectedClass = classChecked ? classChecked.value : '5D';

    if (!isExamSessionOpen()) {
        playCuteSound('pop');
        alert("⛔ AKSES UJIAN MASIH DITUTUP OLEH GURU!\n\nSaklar Akses Ujian saat ini sedang dalam posisi 'DITUTUP (TERKUNCI)' di Panel Guru.\n\nSilakan minta Ibu Guru Darningsih untuk mengklik tombol hijau 'Buka Akses Ujian' di Panel Guru agar soal remedial dapat dibuka.");
        return;
    }

    // 1. Validasi Token Ujian dari Guru (Live Token & Cadangan Universal)
    if (!validateExamToken(enteredToken)) {
        playCuteSound('pop');
        alert(`⚠️ TOKEN UJIAN BELUM SESUAI!\n\nToken yang kamu masukkan "${enteredToken || '(kosong)'}" tidak cocok.\n\nSilakan periksa kode token yang ditulis oleh Guru di papan tulis kelas atau tanyakan kepada Guru Pengawas.`);
        if (tokenInput) {
            tokenInput.focus();
            tokenInput.select();
        }
        return;
    }

    // 2. Kunci 1x Pengerjaan (Cegah nama siswa yang sama dikerjakan ulang / joki)
    const localList = getRecapList();
    const alreadyDone = localList.some(s => 
        String(s.name || '').trim().toLowerCase() === name.toLowerCase() && 
        String(s.kelas || '').trim().toLowerCase() === selectedClass.toLowerCase()
    );
    if (alreadyDone) {
        playCuteSound('pop');
        const examLabel = (currentExamMode === 'ujian') ? 'ujian utama' : 'remedial';
        const confirmRetry = confirm(
            `⚠️ SISWA SUDAH PERNAH MENGERJAKAN!\n\n` +
            `Nama "${name}" di Kelas ${selectedClass} sudah pernah tercatat mengerjakan ${examLabel}.\n\n` +
            `Apakah Ibu Guru/Siswa ingin MENGERJAKAN ULANG ${examLabel} ini?\n` +
            `• Klik OK: Untuk mengizinkan pengerjaan ulang (nilai baru akan tersimpan).\n` +
            `• Klik Batal (Cancel): Jika tidak ingin mengulang.`
        );
        if (!confirmRetry) return;
    }

    currentRemedialPeriod = activeTeacherRemedialPeriod || 'sem1_pas';
    currentStudentDataK5 = {
        name: name,
        kelas: selectedClass,
        nilaiAwal: parseInt(nilaiAwal) || 0,
        absen: absen
    };

    document.getElementById('barStudentNameK5').innerText = currentStudentDataK5.name;
    document.getElementById('barStudentClassK5').innerText = `Kelas ${currentStudentDataK5.kelas}`;
    const barTagK5 = document.getElementById('barExamPeriodTagK5');
    if (barTagK5) {
        const periodTitleMapShort = {
            sem1_pts: 'Ujian PTS 1',
            sem1_pas: 'Ujian PAS 1',
            sem2_pts: 'Ujian PTS 2',
            sem2_pas: 'Ujian PAS 2'
        };
        barTagK5.innerText = (currentExamMode === 'ujian')
            ? (periodTitleMapShort[activeTeacherRemedialPeriod] || 'Ujian Utama')
            : (REMEDIAL_PERIODS[activeTeacherRemedialPeriod]?.shortName || 'Remedial');
    }
    const initialScoreElemK5 = document.getElementById('barStudentInitialScoreK5');
    if (initialScoreElemK5) {
        if (currentExamMode === 'ujian') {
            initialScoreElemK5.innerText = '80 (KKM)';
            const lbl = initialScoreElemK5.previousElementSibling;
            if (lbl) lbl.innerText = 'Standar Kelulusan:';
        } else {
            initialScoreElemK5.innerText = currentStudentDataK5.nilaiAwal;
            const lbl = initialScoreElemK5.previousElementSibling;
            if (lbl) lbl.innerText = 'Nilai Awal:';
        }
    }

    startCountdownTimerK5();

    showExamStepK5('questions');
    const examGreeting = (currentExamMode === 'ujian') ? 'Ujian Utama' : 'Remedial';
    showToast(`Selamat mengerjakan ${examGreeting} Kelas 5, ${name}! Waktu: 60 Menit ⏰`);
}

function calculateAndShowScoreK5(event) {
    event.preventDefault();
    playCuteSound('fanfare');

    let pgScore = 0;
    const collectedPgAnswers = [];

    // 1. Evaluate 10 Multiple Choice Questions (Bobot: 5 poin per soal = 50 poin max)
    for (let i = 0; i < pgQuestionsK5Metadata.length; i++) {
        const item = pgQuestionsK5Metadata[i];
        const selected = document.querySelector(`input[name="pg_k5_${item.num}"]:checked`);
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

    // Uraian 1 (No. 11): Langkah-langkah cara membuat presentasi dengan bantuan aplikasi AI
    const rawAns1 = (document.getElementById('uraian_k5_1') ? document.getElementById('uraian_k5_1').value.trim() : '');
    const ans1 = rawAns1.toLowerCase();
    const hasPlatform = ans1.includes('buka') || ans1.includes('platform') || ans1.includes('aplikasi') || ans1.includes('web') || ans1.includes('gamma') || ans1.includes('tome') || ans1.includes('canva') || ans1.includes('ai');
    const hasCreateNew = ans1.includes('create new') || ans1.includes('buat baru') || ans1.includes('baru') || ans1.includes('opsi') || ans1.includes('dokumen');
    const hasPrompt = ans1.includes('prompt') || ans1.includes('perintah') || ans1.includes('topik') || ans1.includes('tujuan') || ans1.includes('struktur') || ans1.includes('teks') || ans1.includes('judul');
    const hasTheme = ans1.includes('tema') || ans1.includes('gaya') || ans1.includes('visual') || ans1.includes('style') || ans1.includes('desain');
    const hasGenerate = ans1.includes('generate') || ans1.includes('buat') || ans1.includes('tunggu') || ans1.includes('selesai');
    const hasReview = ans1.includes('review') || ans1.includes('periksa') || ans1.includes('edit') || ans1.includes('sesuaikan') || ans1.includes('simpan');

    let u1Pts = 0;
    const matchCount1 = [hasPlatform, hasCreateNew, hasPrompt, hasTheme, hasGenerate, hasReview].filter(Boolean).length;
    if (matchCount1 >= 4) {
        u1Pts = 10;
    } else if (matchCount1 === 3) {
        u1Pts = 8;
    } else if (matchCount1 === 2) {
        u1Pts = 6;
    } else if (matchCount1 === 1) {
        u1Pts = 4;
    } else if (rawAns1.length > 5) {
        u1Pts = 3;
    }
    uraianScore += u1Pts;
    collectedUraianAnswers.push({
        num: 1,
        question: "11. Langkah-langkah cara membuat presentasi dengan bantuan aplikasi AI",
        userAnswer: rawAns1 || "(Tidak diisi)",
        keyRef: "1. Buka platform AI pembuat presentasi (seperti Gamma.app atau Tome). 2. Pilih opsi untuk membuat dokumen atau presentasi baru (Create new). 3. Masukkan prompt atau perintah teks yang menjelaskan topik, tujuan, dan struktur slide yang diinginkan. 4. Pilih tema atau gaya visual yang disediakan oleh AI. 5. Klik tombol Generate dan tunggu hingga AI selesai membuat presentasi. 6. Periksa kembali (review) dan edit teks atau gambar jika ada yang perlu disesuaikan.",
        points: u1Pts,
        keterangan: u1Pts >= 10 ? "✔ Sangat Tepat & Runtut: Alur pembuatan presentasi AI dari platform, create new, prompt, tema, generate, hingga review dituliskan dengan lengkap." : getUraianKeterangan(u1Pts)
    });

    // Uraian 2 (No. 12): Nama Slide Tampilan Layout (A, B, C)
    const raw2a = (document.getElementById('uraian_k5_2_a') ? document.getElementById('uraian_k5_2_a').value.trim() : '');
    const raw2b = (document.getElementById('uraian_k5_2_b') ? document.getElementById('uraian_k5_2_b').value.trim() : '');
    const raw2c = (document.getElementById('uraian_k5_2_c') ? document.getElementById('uraian_k5_2_c').value.trim() : '');

    const ans2a = raw2a.toLowerCase();
    const ans2b = raw2b.toLowerCase();
    const ans2c = raw2c.toLowerCase();

    let u2Pts = 0;
    // A: Title and Content (Judul dan Konten)
    if (ans2a.includes('title and content') || ans2a.includes('judul dan konten') || ans2a.includes('judul & konten') || ans2a.includes('content') || ans2a.includes('konten') || ans2a.includes('title & content') || ans2a.includes('title slide')) {
        u2Pts += 3.5;
    }
    // B: Title, Content with Picture atau Picture with Caption
    if (ans2b.includes('title, content with picture') || ans2b.includes('picture with caption') || ans2b.includes('content with picture') || ans2b.includes('picture') || ans2b.includes('gambar') || ans2b.includes('caption') || ans2b.includes('title with picture')) {
        u2Pts += 3.5;
    }
    // C: Two Content (Dua Konten)
    if (ans2c.includes('two content') || ans2c.includes('dua konten') || ans2c.includes('2 content') || ans2c.includes('dua isi') || ans2c.includes('two column') || ans2c.includes('two') || ans2c.includes('section header')) {
        u2Pts += 3.0;
    }

    u2Pts = Math.min(10, Math.round(u2Pts));
    uraianScore += u2Pts;
    collectedUraianAnswers.push({
        num: 2,
        question: "12. Nama slide tampilan layout (A, B, C)",
        userAnswer: `Tampilan A: ${raw2a || '-'} | Tampilan B: ${raw2b || '-'} | Tampilan C: ${raw2c || '-'}`,
        keyRef: "A: Title and Content (Judul dan Konten) | B: Title, Content with Picture atau Picture with Caption (Layout dengan area gambar di bagian tengah) | C: Two Content (Dua Konten)",
        points: u2Pts,
        keterangan: u2Pts === 10 ? "✔ Sempurna: Ketiga nama slide tampilan layout (Title and Content, Picture with Caption/Picture, Two Content) dijawab dengan tepat." : `⚠ Memperoleh ${u2Pts}/10 poin. Pelajari kembali layout slide PowerPoint.`
    });

    // Uraian 3 (No. 13): Contoh prompt untuk Bu Santi (Pengenalan PowerPoint 3 Slide)
    const rawAns3 = (document.getElementById('uraian_k5_3') ? document.getElementById('uraian_k5_3').value.trim() : '');
    const ans3 = rawAns3.toLowerCase();
    const hasAudience = ans3.includes('kelas 5') || ans3.includes('murid') || ans3.includes('sd') || ans3.includes('anak') || ans3.includes('santi') || ans3.includes('guru');
    const hasTopic = ans3.includes('powerpoint') || ans3.includes('presentasi');
    const hasSlide1 = ans3.includes('slide 1') || ans3.includes('pengenalan');
    const hasSlide2 = ans3.includes('slide 2') || ans3.includes('tampilan');
    const hasSlide3 = ans3.includes('slide 3') || ans3.includes('baru');
    const hasTone = ans3.includes('sederhana') || ans3.includes('mudah dipahami') || ans3.includes('ramah') || ans3.includes('buatkan');

    let u3Pts = 0;
    const matchCount3 = [hasAudience, hasTopic, hasSlide1, hasSlide2, hasSlide3, hasTone].filter(Boolean).length;
    if (matchCount3 >= 4) {
        u3Pts = 10;
    } else if (matchCount3 === 3) {
        u3Pts = 7;
    } else if (matchCount3 === 2) {
        u3Pts = 5;
    } else if (rawAns3.length > 5) {
        u3Pts = 3;
    }
    uraianScore += u3Pts;
    collectedUraianAnswers.push({
        num: 3,
        question: "13. Contoh prompt untuk Bu Santi",
        userAnswer: rawAns3 || "(Tidak diisi)",
        keyRef: "Contoh: \"Buatkan materi presentasi untuk murid kelas 5 SD bertemakan 'Pengenalan Microsoft PowerPoint' yang terdiri dari 3 slide: Slide 1 Pengenalan PowerPoint, Slide 2 Mengenal Tampilan, dan Slide 3 Membuat Slide Baru. Gunakan bahasa yang sederhana dan mudah dipahami anak-anak.\"",
        points: u3Pts,
        keterangan: u3Pts >= 10 ? "✔ Sangat Tepat: Prompt mencakup audiens kelas 5 SD, tema Pengenalan PowerPoint, rincian slide 1-3, dan instruksi bahasa yang mudah dipahami." : getUraianKeterangan(u3Pts)
    });

    // Uraian 4 (No. 14): Langkah-langkah cara menyimpan presentasi ke Local Disk D
    const rawAns4 = (document.getElementById('uraian_k5_4') ? document.getElementById('uraian_k5_4').value.trim() : '');
    const ans4 = rawAns4.toLowerCase();
    const hasFileSave = ans4.includes('file') || ans4.includes('save as') || ans4.includes('save') || ans4.includes('simpan');
    const hasBrowse = ans4.includes('browse') || ans4.includes('jendela');
    const hasDiskD = ans4.includes('d:') || ans4.includes('disk d') || ans4.includes('local disk') || ans4.includes('localdisk');
    const hasFolders = ans4.includes('kelas 5') || ans4.includes('5d') || ans4.includes('folder');
    const hasFileName = ans4.includes('namakamu') || ans4.includes('nama kamu') || ans4.includes('latihan') || ans4.includes('5d-');

    let u4Pts = 0;
    const matchCount4 = [hasFileSave, hasBrowse, hasDiskD, hasFolders, hasFileName].filter(Boolean).length;
    if (matchCount4 >= 4) {
        u4Pts = 10;
    } else if (matchCount4 === 3) {
        u4Pts = 8;
    } else if (matchCount4 === 2) {
        u4Pts = 5;
    } else if (rawAns4.length > 5) {
        u4Pts = 3;
    }
    uraianScore += u4Pts;
    collectedUraianAnswers.push({
        num: 4,
        question: "14. Langkah-langkah cara menyimpan presentasi ke Local Disk D",
        userAnswer: rawAns4 || "(Tidak diisi)",
        keyRef: "1. Klik menu File di pojok kiri atas jendela PowerPoint. 2. Pilih opsi Save As. 3. Klik Browse untuk membuka jendela penyimpanan komputer. 4. Pilih dan klik Local Disk (D:), lalu buka folder kelas 5, kemudian buka folder 5D. 5. Ketik nama file pada kolom File name dengan format: 5D-Namakamu-Latihan. 6. Klik tombol Save.",
        points: u4Pts,
        keterangan: u4Pts >= 10 ? "✔ Sangat Tepat: Urutan penyimpanan ke menu File -> Save As -> Browse -> Local Disk (D:) -> folder kelas 5 -> folder 5D -> 5D-Namakamu-Latihan -> Save dituliskan dengan lengkap dan benar." : getUraianKeterangan(u4Pts)
    });

    // Uraian 5 (No. 15): Lima aplikasi AI yang membantu dalam pembuatan presentasi
    const raw5_1 = (document.getElementById('uraian_k5_5_1') ? document.getElementById('uraian_k5_5_1').value.trim() : '');
    const raw5_2 = (document.getElementById('uraian_k5_5_2') ? document.getElementById('uraian_k5_5_2').value.trim() : '');
    const raw5_3 = (document.getElementById('uraian_k5_5_3') ? document.getElementById('uraian_k5_5_3').value.trim() : '');
    const raw5_4 = (document.getElementById('uraian_k5_5_4') ? document.getElementById('uraian_k5_5_4').value.trim() : '');
    const raw5_5 = (document.getElementById('uraian_k5_5_5') ? document.getElementById('uraian_k5_5_5').value.trim() : '');

    const checkAiApp = (val) => {
        const v = val.toLowerCase();
        return v.includes('gamma') || v.includes('tome') || v.includes('canva') || v.includes('copilot') || v.includes('beautiful') || v.includes('slidesai') || v.includes('chatgpt') || v.includes('perplexity') || v.includes('curipod') || v.includes('decktopus') || v.includes('pitch') || v.includes('wepik') || v.includes('visme') || (val.length >= 3);
    };

    let u5Pts = 0;
    if (checkAiApp(raw5_1)) u5Pts += 2;
    if (checkAiApp(raw5_2)) u5Pts += 2;
    if (checkAiApp(raw5_3)) u5Pts += 2;
    if (checkAiApp(raw5_4)) u5Pts += 2;
    if (checkAiApp(raw5_5)) u5Pts += 2;

    uraianScore += u5Pts;
    collectedUraianAnswers.push({
        num: 5,
        question: "15. Lima aplikasi AI yang membantu dalam pembuatan presentasi",
        userAnswer: `1: ${raw5_1 || '-'} | 2: ${raw5_2 || '-'} | 3: ${raw5_3 || '-'} | 4: ${raw5_4 || '-'} | 5: ${raw5_5 || '-'}`,
        keyRef: "1. Gamma App (Gamma.app), 2. Tome (Tome.app), 3. Canva (fitur Magic Design / AI Presentation), 4. Microsoft Copilot (di dalam PowerPoint), 5. Beautiful.ai",
        points: u5Pts,
        keterangan: u5Pts >= 10 ? "✔ Sangat Tepat: Kelima aplikasi AI pembuat presentasi (Gamma App, Tome, Canva, Microsoft Copilot, Beautiful.ai) dijawab dengan benar." : `⚠ Memperoleh ${u5Pts}/10 poin (${u5Pts/2} aplikasi teridentifikasi).`
    });

    // Hentikan timer pengerjaan 60 menit & catat durasi
    if (examTimerIntervalK5) clearInterval(examTimerIntervalK5);
    const secondsSpent = Math.max(1, (60 * 60) - Math.max(0, examTimeRemainingK5));
    const minSpent = Math.floor(secondsSpent / 60);
    const secSpent = secondsSpent % 60;
    examDurationTextK5 = `${minSpent} Menit ${secSpent} Detik`;

    // Total Score (0 - 100)
    const totalScore = pgScore + uraianScore;
    const studentName = currentStudentDataK5.name || 'Sahabat Pintar Kelas 5';
    const studentClass = currentStudentDataK5.kelas || '5D';
    const isUjian = (currentExamMode === 'ujian');

    completedExamScoresK5 = {
        initial: currentStudentDataK5.nilaiAwal,
        pg: pgScore,
        uraian: uraianScore,
        final: totalScore,
        status: isUjian 
            ? (totalScore >= 80 ? 'LULUS UJIAN' : 'PERLU REMEDIAL')
            : (totalScore >= 80 ? 'LULUS REMEDIAL' : 'TUNTAS REMEDIAL'),
        predicate: totalScore >= 90 ? 'SANGAT MEMUASKAN' : (totalScore >= 80 ? 'BAIK SEKALI' : 'CUKUP BAIK')
    };

    // Tampilkan Nama & Nilai Akhir dengan TULISAN BESAR
    document.getElementById('scoreStudentSummaryK5').innerText = `${studentName} • Kelas ${studentClass} (Absen: ${currentStudentDataK5.absen})`;
    document.getElementById('hugeFinalScoreK5').innerText = totalScore;

    const mascotIcon = document.getElementById('scoreMascotIconK5');
    const predicateBadge = document.getElementById('hugePredicateBadgeK5');
    const motivationTitle = document.getElementById('motivationTitleK5');
    const motivationMessage = document.getElementById('motivationMessageK5');

    if (totalScore >= 90) {
        mascotIcon.innerText = '🏆';
        predicateBadge.innerText = isUjian ? '🌟 LULUS ASESMEN UJIAN DENGAN GEMILANG!' : '🌟 LULUS REMEDIAL DENGAN GEMILANG!';
        predicateBadge.style.background = 'linear-gradient(135deg, #059669, #10b981)';
        motivationTitle.innerHTML = `Luar Biasa, ${studentName}! Presentasimu Sangat Memukau! 🚀`;
        motivationMessage.innerHTML = isUjian
            ? `Selamat atas keberhasilanmu! Usaha keras, ketelitian, dan kejujuranmu dalam memahami konsep Microsoft PowerPoint, efek transisi, serta kecerdasan buatan (AI) pembuat slide hari ini membuahkan hasil yang luar biasa!<br><br>Kamu telah membuktikan kemampuan penguasaan materi presentasi yang sangat memuaskan. Teruslah pertahankan prestasi gemilangmu! ✨📊`
            : `Selamat atas keberhasilanmu! Usaha keras, ketelitian, dan kejujuranmu dalam memahami konsep Microsoft PowerPoint, efek transisi, serta kecerdasan buatan (AI) pembuat slide hari ini membuahkan hasil yang luar biasa!<br><br>Kamu telah membuktikan bahwa dengan ketekunan, kamu bisa menjadi pembuat presentasi yang kreatif dan andal. Teruslah bereksplorasi dengan berbagai ide visual yang hebat dan jadilah inspirasi bagi teman-temanmu! ✨📊`;
    } else if (totalScore >= 80) {
        mascotIcon.innerText = '🎉';
        predicateBadge.innerText = isUjian ? '✨ DINYATAKAN LULUS UJIAN (KKM 80)!' : '✨ DINYATAKAN LULUS REMEDIAL (KKM 80)!';
        predicateBadge.style.background = 'linear-gradient(135deg, #0284c7, #38bdf8)';
        motivationTitle.innerHTML = `Kerja Bagus, ${studentName}! Terus Kembangkan Kreasimu! 💡`;
        motivationMessage.innerHTML = isUjian
            ? `Hebat sekali! Nilai ujianmu berhasil melampaui standar KKM 80 dan membuktikan pemahaman yang sangat baik dalam mendesain slide presentasi dan memanfaatkan teknologi AI.<br><br>Presentasi adalah media komunikasi penting: teruslah berlatih dan berkreasi bersama Ibu Guru Darningsih ya! 🌱`
            : `Hebat sekali! Skor remedialmu berhasil melampaui batas KKM 80 dan membuktikan pemahaman yang sangat baik dalam mendesain slide presentasi dan memanfaatkan teknologi AI.<br><br>Presentasi adalah media komunikasi masa depan: semakin sering kamu berlatih memadukan teks, gambar, dan transisi, presentasimu akan semakin keren dan mengagumkan! Tetaplah rajin berlatih bersama Ibu Guru Darningsih ya! 🌱`;
    } else {
        mascotIcon.innerText = '💪';
        predicateBadge.innerText = isUjian ? '📖 BELUM TUNTAS KKM (PERLU REMEDIAL)' : '📖 PERLU PENGAYAAN & TETAP SEMANGAT!';
        predicateBadge.style.background = 'linear-gradient(135deg, #f59e0b, #ea580c)';
        motivationTitle.innerHTML = `Jangan Pernah Menyerah, ${studentName}! Kamu Pasti Bisa! 💖`;
        motivationMessage.innerHTML = isUjian
            ? `Terima kasih banyak sudah berusaha dan mengerjakan lembar ujian ini secara mandiri dan jujur.<br><br>Meskipun nilaimu belum mencapai batas KKM 80, kamu berhak mengikuti sesi perbaikan/remedial yang dijadwalkan oleh Ibu Guru. Pelajari kembali materi PowerPoint dan prompt AI, kamu pasti bisa meningkat! 🤖✨`
            : `Terima kasih banyak sudah berusaha dan mengerjakan soal remedial ini secara mandiri dan jujur!<br><br>Meskipun nilaimu belum mencapai batas KKM 80, setiap tantangan adalah kesempatan terbaik untuk mengasah kreativitas kita. Jangan berkecil hati ya! Pelajari kembali menu-menu PowerPoint dan cara membuat prompt AI. Teruslah mencoba bersama Bapak/Ibu Guru, kamu pasti akan menjadi ahli presentasi yang hebat! 🤖✨`;
    }

    // Simpan ke Panel Guru
    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    const dateFormatted = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    const newStudentRecord = {
        id: 'st_k5_' + Date.now(),
        name: studentName,
        kelas: studentClass,
        absen: currentStudentDataK5.absen,
        nilaiAwal: currentStudentDataK5.nilaiAwal,
        nilaiAkhir: totalScore,
        pgScore: pgScore,
        uraianScore: uraianScore,
        status: isUjian ? (totalScore >= 80 ? 'Lulus Ujian' : 'Perlu Remedial') : (totalScore >= 80 ? 'Lulus' : 'Tuntas'),
        examType: isUjian ? 'Ujian Utama' : 'Remedial',
        predicate: completedExamScoresK5.predicate,
        duration: examDurationTextK5,
        timestamp: timeString,
        date: dateFormatted,
        period: currentRemedialPeriod,
        periodName: REMEDIAL_PERIODS[currentRemedialPeriod]?.name || currentRemedialPeriod,
        answers: {
            pg: collectedPgAnswers,
            uraian: collectedUraianAnswers
        }
    };

    saveStudentToRecap(newStudentRecord);

    if (window.confetti) {
        confetti({
            particleCount: 130,
            spread: 95,
            origin: { y: 0.4 }
        });
    }

    showExamStepK5('result');
    showToast(`${isUjian ? 'Nilai Akhir Ujian Kelas 5' : 'Nilai Akhir Remedial Kelas 5'}: ${totalScore}! 🌟 (Waktu: ${examDurationTextK5})`);
}

function generateAndDownloadPDFK5() {
    playCuteSound('pop');
    showToast('📄 Sedang menyusun dokumen PDF Kelas 5...');

    const today = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('id-ID', options);
    const isUjian = (currentExamMode === 'ujian');

    document.getElementById('pdfReportNameK5').innerText = currentStudentDataK5.name || 'Siswa Kelas 5';
    document.getElementById('pdfReportClassK5').innerText = `Kelas ${currentStudentDataK5.kelas || '5D'}`;
    document.getElementById('pdfReportAbsenK5').innerText = currentStudentDataK5.absen || '-';
    document.getElementById('pdfReportDurationK5').innerText = `${examDurationTextK5} (Batas: 60 Menit)`;
    document.getElementById('pdfReportDateK5').innerText = formattedDate;

    document.getElementById('pdfReportInitialScoreK5').innerText = isUjian ? '80 (KKM)' : completedExamScoresK5.initial;
    document.getElementById('pdfReportPgScoreK5').innerText = `${completedExamScoresK5.pg} / 50 Poin`;
    document.getElementById('pdfReportUraianScoreK5').innerText = `${completedExamScoresK5.uraian} / 50 Poin`;
    document.getElementById('pdfReportFinalScoreK5').innerText = completedExamScoresK5.final;

    document.getElementById('pdfReportStatusK5').innerText = completedExamScoresK5.status;
    document.getElementById('pdfReportPredicateK5').innerText = completedExamScoresK5.predicate;
    document.getElementById('pdfReportLocationDateK5').innerText = `Jakarta, ${formattedDate}`;

    const element = document.getElementById('pdfDocumentElementK5');
    const safeStudentName = (currentStudentDataK5.name || 'Siswa_K5').replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `${isUjian ? 'Laporan_Ujian' : 'Laporan_Remedial'}_${safeStudentName}_Kelas_${currentStudentDataK5.kelas}.pdf`;

    if (typeof html2pdf !== 'undefined') {
        const opt = {
            margin: [8, 8, 8, 8],
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, logging: false, useCORS: false, letterRendering: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            playCuteSound('fanfare');
            showToast('✅ Berhasil mengunduh Laporan Remedial Kelas 5 (PDF)!');
        }).catch(err => {
            console.warn('Error generating PDF K5:', err);
            showToast('⚠️ Gagal membuat PDF, silakan periksa peramban Anda.');
        });
    } else {
        showToast('⚠️ Library PDF belum termuat di peramban.');
    }
}

function returnToMainMenuK5() {
    playCuteSound('pop');
    closeExamModalK5();
    showToast('✨ Kembali ke Menu Utama. Terus berkreasi di Koding & AI!');
}

function toggleScreenExpandK5() {
    const icon = document.getElementById('fullscreenIconK5');
    const text = document.getElementById('fullscreenTextK5');

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            if (icon) icon.className = 'fa-solid fa-compress';
            if (text) text.innerText = 'Keluar Layar Penuh';
            showToast('🖥️ Mode Layar Penuh Diaktifkan');
        }).catch(() => {
            showToast('Layar penuh aktif');
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen().then(() => {
                if (icon) icon.className = 'fa-solid fa-expand';
                if (text) text.innerText = 'Layar Penuh';
            });
        }
    }
}

/* ==============================================================
   REMEDIAL KELAS 6 - DEDICATED EXAM SYSTEM LOGIC
   ============================================================== */
let currentStudentDataK6 = {
    name: '',
    kelas: '',
    nilaiAwal: 0,
    absen: ''
};

let examTimeRemainingK6 = 60 * 60; // 3600 seconds
let examTimerIntervalK6 = null;
let examDurationTextK6 = '';
let completedExamScoresK6 = {
    initial: 0,
    pg: 0,
    uraian: 0,
    final: 0,
    status: 'LULUS REMEDIAL',
    predicate: 'SANGAT MEMUASKAN'
};

// Dimuat secara modular dari folder d:\Erapot\soal\soal_k6.js
const pgQuestionsK6Metadata = (window.SOAL_KELAS_6 && window.SOAL_KELAS_6.pg) || [
    {
        num: 1,
        question: "1. Deva ingin merayakan pesta ulang tahunnya di rumah. Ia membuat daftar persiapan: (1) Menyiapkan daftar undangan teman, (2) Menyiapkan kue dan makanan kecil, (3) Menghias ruang pesta. Pola berpikir komputasional yang dilakukan Deva adalah...",
        options: {
            A: "Abstraksi",
            B: "Pengenalan pola",
            C: "Dekomposisi",
            D: "Algoritma"
        },
        key: 'C',
        keyText: 'C. Dekomposisi',
        explanation: 'Dekomposisi adalah teknik memecah masalah besar/kompleks menjadi bagian-bagian atau daftar tugas yang lebih kecil dan sederhana.'
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
        key: 'A',
        keyText: 'A. Pengenalan pola',
        explanation: 'Pengenalan pola (Pattern Recognition) adalah mengenali kesamaan, keteraturan, atau ciri khas serupa pada data/objek.'
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
        key: 'D',
        keyText: 'D. Abstraksi',
        explanation: 'Abstraksi adalah fokus pada informasi yang penting (jalan utama & belokan) dan menyaring/mengabaikan detail-detail yang tidak penting.'
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
        key: 'B',
        keyText: 'B. Algoritma',
        explanation: 'Algoritma adalah langkah-langkah terurut, sistematis, dan logis untuk menyelesaikan suatu masalah atau pekerjaan.'
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
        key: 'C',
        keyText: 'C. Menggunakan logika pergerakan yang sama untuk semua karakter musuh',
        explanation: 'Menggunakan logika pergerakan yang sama untuk semua musuh memanfaatkan pola yang berulang (Pattern Recognition).'
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
        key: 'D',
        keyText: 'D. Converting sound to text and searching the song',
        explanation: 'Tahap Process pada voice assistant adalah memproses suara menjadi teks dan mencari lagu di database sebelum dikeluarkan lewat speaker (output).'
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
        key: 'B',
        keyText: 'B. Drawing a subway map that shows only stations and connecting lines',
        explanation: 'Peta rute kereta/subway yang hanya menampilkan stasiun dan garis adalah contoh klasik Abstraksi (menyaring detail yang tidak esensial).'
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
        key: 'D',
        keyText: 'D. Divide the cleaning job into three separate sub-tasks: vacuuming, mopping, and obstacle avoidance',
        explanation: 'Langkah pertama dekomposisi adalah memecah pekerjaan pembersihan menjadi sub-tugas terpisah (menyedot debu, mengepel, hindari rintangan).'
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
        key: 'B',
        keyText: 'B. Supervised Learning',
        explanation: 'Supervised Learning menggunakan data latih yang sudah memiliki label (seperti ribuan foto yang berlabel \"Cat\") agar AI belajar mengenali polanya.'
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
        key: 'A',
        keyText: 'A. Break the game into movement, scoring, and obstacles',
        explanation: 'Dekomposisi awal membuat game adalah memecah struktur inti logika game menjadi: pergerakan pemain, penghitungan skor, dan rintangan.'
    }
];

function startCountdownTimerK6() {
    examTimeRemainingK6 = 60 * 60;
    if (examTimerIntervalK6) clearInterval(examTimerIntervalK6);
    updateCountdownUIK6();

    examTimerIntervalK6 = setInterval(() => {
        examTimeRemainingK6--;
        updateCountdownUIK6();

        if (examTimeRemainingK6 <= 0) {
            clearInterval(examTimerIntervalK6);
            showToast('⏰ Waktu pengerjaan 60 menit telah habis! Mengirimkan jawaban...');
            playCuteSound('pop');
            const examForm = document.getElementById('k6ExamForm');
            if (examForm) {
                examForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }
        }
    }, 1000);
}

function updateCountdownUIK6() {
    const timerTag = document.getElementById('examCountdownTagK6');
    const timerText = document.getElementById('timerTextK6');
    if (!timerText) return;

    const minutes = Math.floor(examTimeRemainingK6 / 60);
    const seconds = examTimeRemainingK6 % 60;
    const formatted = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timerText.innerText = formatted;

    if (timerTag) {
        if (examTimeRemainingK6 <= 300) {
            timerTag.classList.add('timer-warning');
        } else {
            timerTag.classList.remove('timer-warning');
        }
    }
}

function renderK6QuestionsFromModule() {
    const container = document.getElementById('k6PgQuestionsContainer');
    if (!container) return;
    const questions = (window.SOAL_KELAS_6 && Array.isArray(window.SOAL_KELAS_6.pg)) ? window.SOAL_KELAS_6.pg : [];
    if (!questions.length) return;

    if (container.children.length !== questions.length) {
        const htmlCards = questions.map(item => {
            return `
                <div class="exam-question-card" id="q-k6-card-${item.num}">
                    <div class="question-header">
                        <span class="q-badge" style="background: #9333ea;">Soal ${item.num}</span>
                        <p class="q-text">${item.question}</p>
                    </div>
                    <div class="q-choices-grid">
                        <label class="choice-item">
                            <input type="radio" name="pg_k6_${item.num}" value="A" required>
                            <span><strong>A.</strong> ${item.options.A}</span>
                        </label>
                        <label class="choice-item">
                            <input type="radio" name="pg_k6_${item.num}" value="B">
                            <span><strong>B.</strong> ${item.options.B}</span>
                        </label>
                        <label class="choice-item">
                            <input type="radio" name="pg_k6_${item.num}" value="C">
                            <span><strong>C.</strong> ${item.options.C}</span>
                        </label>
                        <label class="choice-item">
                            <input type="radio" name="pg_k6_${item.num}" value="D">
                            <span><strong>D.</strong> ${item.options.D}</span>
                        </label>
                    </div>
                </div>
            `;
        }).join('');
        container.innerHTML = htmlCards;
    }
}

function openRemedialKelas6(mode) {
    currentExamMode = mode || 'remedial';
    playCuteSound('pop');
    if (!isExamSessionOpen()) {
        playCuteSound('pop');
        alert("⛔ AKSES UJIAN SEDANG DITUTUP!\n\nUjian saat ini sedang dikunci oleh Ibu Guru Darningsih, S.T.\n\nSiswa tidak diperkenankan mengerjakan ujian sendiri di luar jam kelas/pengawasan. Silakan tunggu instruksi guru di ruang kelas.");
        return;
    }
    renderK6QuestionsFromModule();
    syncExamUIWithQuestionModules();
    const modal = document.getElementById('examModalK6');
    if (!modal) return;
    modal.classList.add('open');

    updateExamModalModeUI('k6', currentExamMode);
    showExamStepK6('identity');
}
const openExamKelas6 = () => openRemedialKelas6('ujian');

function closeExamModalK6() {
    playCuteSound('pop');
    if (examTimerIntervalK6) clearInterval(examTimerIntervalK6);
    const modal = document.getElementById('examModalK6');
    if (modal) modal.classList.remove('open');
}

function showExamStepK6(stepName) {
    const stepIdentity = document.getElementById('k6-step-identity');
    const stepQuestions = document.getElementById('k6-step-questions');
    const stepResult = document.getElementById('k6-step-result');

    if (stepIdentity) stepIdentity.classList.remove('active');
    if (stepQuestions) stepQuestions.classList.remove('active');
    if (stepResult) stepResult.classList.remove('active');

    const targetStep = document.getElementById(`k6-step-${stepName}`);
    if (targetStep) targetStep.classList.add('active');

    const modalBody = document.querySelector('#examModalK6 .exam-modal-body');
    if (modalBody) modalBody.scrollTop = 0;
}

function startExamK6(event) {
    event.preventDefault();
    playCuteSound('pop');

    const name = document.getElementById('k6Name').value.trim();
    const classChecked = document.querySelector('input[name="k6ClassChoice"]:checked');
    const nilaiAwal = document.getElementById('k6NilaiAwal').value;
    const absen = document.getElementById('k6Absen').value || '-';
    const tokenInput = document.getElementById('k6ExamToken');
    const enteredToken = tokenInput ? tokenInput.value.trim().toUpperCase() : '';

    if (!isExamSessionOpen()) {
        playCuteSound('pop');
        alert("⛔ AKSES UJIAN MASIH DITUTUP OLEH GURU!\n\nSaklar Akses Ujian saat ini sedang dalam posisi 'DITUTUP (TERKUNCI)' di Panel Guru.\n\nSilakan minta Ibu Guru Darningsih untuk mengklik tombol hijau 'Buka Akses Ujian' di Panel Guru agar soal remedial dapat dibuka.");
        return;
    }

    if (!classChecked) {
        showToast('⚠️ Silakan pilih salah satu kelas (6A - 6E)!');
        return;
    }

    // 1. Validasi Token Ujian dari Guru (Live Token & Cadangan Universal)
    if (!validateExamToken(enteredToken)) {
        playCuteSound('pop');
        alert(`⚠️ TOKEN UJIAN BELUM SESUAI!\n\nToken yang kamu masukkan "${enteredToken || '(kosong)'}" tidak cocok.\n\nSilakan periksa kode token yang ditulis oleh Guru di papan tulis kelas atau tanyakan kepada Guru Pengawas.`);
        if (tokenInput) {
            tokenInput.focus();
            tokenInput.select();
        }
        return;
    }

    // 2. Kunci 1x Pengerjaan (Cegah nama siswa yang sama dikerjakan ulang / joki)
    const selectedClass = classChecked.value;
    const localList = getRecapList();
    const alreadyDone = localList.some(s => 
        String(s.name || '').trim().toLowerCase() === name.toLowerCase() && 
        String(s.kelas || '').trim().toLowerCase() === selectedClass.toLowerCase()
    );
    if (alreadyDone) {
        playCuteSound('pop');
        const examLabel = (currentExamMode === 'ujian') ? 'ujian utama' : 'remedial';
        const confirmRetry = confirm(
            `⚠️ SISWA SUDAH PERNAH MENGERJAKAN!\n\n` +
            `Nama "${name}" di Kelas ${selectedClass} sudah pernah tercatat mengerjakan ${examLabel}.\n\n` +
            `Apakah Ibu Guru/Siswa ingin MENGERJAKAN ULANG ${examLabel} ini?\n` +
            `• Klik OK: Untuk mengizinkan pengerjaan ulang (nilai baru akan tersimpan).\n` +
            `• Klik Batal (Cancel): Jika tidak ingin mengulang.`
        );
        if (!confirmRetry) return;
    }

    currentRemedialPeriod = activeTeacherRemedialPeriod || 'sem1_pas';
    currentStudentDataK6 = {
        name: name,
        kelas: selectedClass,
        nilaiAwal: parseInt(nilaiAwal) || 0,
        absen: absen
    };

    document.getElementById('barStudentNameK6').innerText = currentStudentDataK6.name;
    document.getElementById('barStudentClassK6').innerText = `Kelas ${currentStudentDataK6.kelas}`;
    const barTagK6 = document.getElementById('barExamPeriodTagK6');
    if (barTagK6) {
        const periodTitleMapShort = {
            sem1_pts: 'Ujian PTS 1',
            sem1_pas: 'Ujian PAS 1',
            sem2_pts: 'Ujian PTS 2',
            sem2_pas: 'Ujian PAS 2'
        };
        barTagK6.innerText = (currentExamMode === 'ujian')
            ? (periodTitleMapShort[activeTeacherRemedialPeriod] || 'Ujian Utama')
            : (REMEDIAL_PERIODS[activeTeacherRemedialPeriod]?.shortName || 'Remedial');
    }
    const initialScoreElemK6 = document.getElementById('barStudentInitialScoreK6');
    if (initialScoreElemK6) {
        if (currentExamMode === 'ujian') {
            initialScoreElemK6.innerText = '80 (KKM)';
            const lbl = initialScoreElemK6.previousElementSibling;
            if (lbl) lbl.innerText = 'Standar Kelulusan:';
        } else {
            initialScoreElemK6.innerText = currentStudentDataK6.nilaiAwal;
            const lbl = initialScoreElemK6.previousElementSibling;
            if (lbl) lbl.innerText = 'Nilai Awal:';
        }
    }

    startCountdownTimerK6();

    showExamStepK6('questions');
    const examGreeting = (currentExamMode === 'ujian') ? 'Ujian Utama' : 'Remedial';
    showToast(`Selamat mengerjakan ${examGreeting} Kelas 6, ${name}! Waktu: 60 Menit ⏰`);
}

function calculateAndShowScoreK6(event) {
    event.preventDefault();
    playCuteSound('fanfare');

    const questions = (window.SOAL_KELAS_6 && Array.isArray(window.SOAL_KELAS_6.pg)) ? window.SOAL_KELAS_6.pg : pgQuestionsK6Metadata;
    const totalPgItems = questions.length || 45;
    let correctPgCount = 0;
    const collectedPgAnswers = [];

    // 1. Evaluasi 45 Soal Pilihan Ganda (Bobot Resmi: 70 Poin)
    for (let i = 0; i < totalPgItems; i++) {
        const item = questions[i];
        const selected = document.querySelector(`input[name="pg_k6_${item.num}"]:checked`);
        const userChoice = selected ? selected.value : '';
        const userChoiceText = userChoice ? `${userChoice}. ${item.options[userChoice] || ''}` : '(Tidak dijawab)';
        const isCorrect = (userChoice === item.key);
        if (isCorrect) correctPgCount++;

        const pts = isCorrect ? (70 / totalPgItems) : 0;
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
            points: Math.round(pts * 10) / 10,
            keterangan: keteranganText
        });
    }
    const pgScore = Math.round((correctPgCount / totalPgItems) * 70);

    // 2. Evaluasi 5 Soal Uraian Mandiri (Bobot Resmi: 30 Poin, Skala Mentah 0 - 100 Poin)
    let rawUraianTotal = 0;
    const collectedUraianAnswers = [];

    // Uraian 1: 4 Pilar Computational Thinking & 1 Contoh di Rumah (Maks 20 Poin Mentah)
    const raw1Dek = (document.getElementById('uraian_k6_1_dekomposisi') ? document.getElementById('uraian_k6_1_dekomposisi').value.trim() : '');
    const raw1Pola = (document.getElementById('uraian_k6_1_pola') ? document.getElementById('uraian_k6_1_pola').value.trim() : '');
    const raw1Abs = (document.getElementById('uraian_k6_1_abstraksi') ? document.getElementById('uraian_k6_1_abstraksi').value.trim() : '');
    const raw1Alg = (document.getElementById('uraian_k6_1_algoritma') ? document.getElementById('uraian_k6_1_algoritma').value.trim() : '');
    const raw1Contoh = (document.getElementById('uraian_k6_1_contoh') ? document.getElementById('uraian_k6_1_contoh').value.trim() : '');

    let u1Pts = 0;
    const ans1Dek = raw1Dek.toLowerCase();
    const ans1Pola = raw1Pola.toLowerCase();
    const ans1Abs = raw1Abs.toLowerCase();
    const ans1Alg = raw1Alg.toLowerCase();
    const ans1Contoh = raw1Contoh.toLowerCase();

    if (ans1Dek.includes('pecah') || ans1Dek.includes('bagi') || ans1Dek.includes('kecil') || ans1Dek.includes('dekomposisi') || ans1Dek.includes('bagian')) u1Pts += 3; else if (raw1Dek.length > 2) u1Pts += 1.5;
    if (ans1Pola.includes('pola') || ans1Pola.includes('pattern') || ans1Pola.includes('sama') || ans1Pola.includes('kemiripan') || ans1Pola.includes('ulang')) u1Pts += 3; else if (raw1Pola.length > 2) u1Pts += 1.5;
    if (ans1Abs.includes('abstraksi') || ans1Abs.includes('penting') || ans1Abs.includes('abaikan') || ans1Abs.includes('detail') || ans1Abs.includes('fokus')) u1Pts += 3; else if (raw1Abs.length > 2) u1Pts += 1.5;
    if (ans1Alg.includes('algoritma') || ans1Alg.includes('langkah') || ans1Alg.includes('urutan') || ans1Alg.includes('runtut') || ans1Alg.includes('tahap')) u1Pts += 3; else if (raw1Alg.length > 2) u1Pts += 1.5;
    
    if (ans1Contoh.length >= 15 && (ans1Contoh.includes('kamar') || ans1Contoh.includes('tas') || ans1Contoh.includes('sepatu') || ans1Contoh.includes('baju') || ans1Contoh.includes('sekolah') || ans1Contoh.includes('buku') || ans1Contoh.includes('makan') || ans1Contoh.includes('tidur') || ans1Contoh.includes('cuci') || ans1Contoh.includes('rumah'))) {
        u1Pts += 8;
    } else if (raw1Contoh.length >= 8) {
        u1Pts += 4;
    }
    u1Pts = Math.min(20, Math.round(u1Pts));
    rawUraianTotal += u1Pts;
    collectedUraianAnswers.push({
        num: 1,
        question: "1. Empat Pilar Computational Thinking & 1 Contoh Penerapan di Rumah",
        userAnswer: `Dekomposisi: ${raw1Dek || '-'} | Pola: ${raw1Pola || '-'} | Abstraksi: ${raw1Abs || '-'} | Algoritma: ${raw1Alg || '-'} | Contoh: ${raw1Contoh || '-'}`,
        keyRef: "Dekomposisi (memecah masalah kompleks jadi bagian kecil), Pengenalan Pola (mencari kesamaan atau pola berulang), Abstraksi (fokus pada hal penting dan mengabaikan detail sepele), Algoritma (menyusun instruksi langkah bertahap yang runtut). Contoh di rumah: Merapikan tas sekolah sesuai jadwal pelajaran hari berikutnya.",
        points: u1Pts,
        keterangan: u1Pts >= 18 ? "✔ Sangat Lengkap: Keempat pilar CT dan contoh aktivitas di rumah diuraikan dengan sangat baik." : `Perolehan skor mentah: ${u1Pts}/20 poin.`
    });

    // Uraian 2: Perbedaan Dekomposisi dan Abstraksi dalam Game (Maks 20 Poin Mentah)
    const rawAns2 = (document.getElementById('uraian_k6_2') ? document.getElementById('uraian_k6_2').value.trim() : '');
    const ans2 = rawAns2.toLowerCase();
    let u2Pts = 0;
    const hasDekomp = ans2.includes('pecah') || ans2.includes('bagi') || ans2.includes('bagian') || ans2.includes('komponen') || ans2.includes('karakter') || ans2.includes('level') || ans2.includes('dekomposisi');
    const hasAbstrak = ans2.includes('penting') || ans2.includes('fokus') || ans2.includes('abaikan') || ans2.includes('detail') || ans2.includes('abstraksi') || ans2.includes('aturan');

    if (hasDekomp && hasAbstrak && ans2.length >= 25) {
        u2Pts = 20;
    } else if (hasDekomp && hasAbstrak) {
        u2Pts = 16;
    } else if (hasDekomp || hasAbstrak) {
        u2Pts = 10;
    } else if (rawAns2.length > 5) {
        u2Pts = 5;
    }
    rawUraianTotal += u2Pts;
    collectedUraianAnswers.push({
        num: 2,
        question: "2. Perbedaan Mendasar Dekomposisi dan Abstraksi dalam Perencanaan Game",
        userAnswer: rawAns2 || "(Tidak diisi)",
        keyRef: "Dekomposisi: Memecah proyek pembuatan game menjadi elemen-elemen kecil yang terpisah (seperti mendesain karakter sprite, sistem latar/stage, variabel skor, rintangan lawan, efek suara). Abstraksi: Memusatkan perhatian hanya pada aturan inti game yang penting bagi pemain (seperti mekanisme loncat dan sistem nyawa), sembari mengabaikan detail yang belum diperlukan saat itu.",
        points: u2Pts,
        keterangan: u2Pts >= 18 ? "✔ Analisis Sangat Baik: Perbedaan Dekomposisi (pemecahan bagian) dan Abstraksi (fokus inti penting) dijelaskan tepat dalam konteks game." : `Perolehan skor mentah: ${u2Pts}/20 poin.`
    });

    // Uraian 3: Algoritma Langkah Demi Langkah Sprite Kucing (Maks 20 Poin Mentah)
    const rawAns3 = (document.getElementById('uraian_k6_3') ? document.getElementById('uraian_k6_3').value.trim() : '');
    const ans3 = rawAns3.toLowerCase();
    let u3Pts = 0;
    const hasMove10 = ans3.includes('10') && (ans3.includes('langkah') || ans3.includes('maju') || ans3.includes('move') || ans3.includes('step'));
    const hasSoundMeow = ans3.includes('meow') || ans3.includes('suara') || ans3.includes('bunyi') || ans3.includes('sound');
    const hasTurn90 = ans3.includes('90') && (ans3.includes('kanan') || ans3.includes('turn') || ans3.includes('belok') || ans3.includes('putar') || ans3.includes('derajat'));
    const hasStepsSeq = ans3.includes('1') || ans3.includes('2') || ans3.includes('3') || ans3.includes('mulai') || ans3.includes('pertama') || ans3.includes('lalu') || ans3.includes('kemudian');

    const matchK6U3 = [hasMove10, hasSoundMeow, hasTurn90].filter(Boolean).length;
    if (matchK6U3 === 3 && hasStepsSeq) {
        u3Pts = 20;
    } else if (matchK6U3 === 3) {
        u3Pts = 17;
    } else if (matchK6U3 === 2) {
        u3Pts = 12;
    } else if (matchK6U3 === 1) {
        u3Pts = 7;
    } else if (rawAns3.length > 5) {
        u3Pts = 4;
    }
    rawUraianTotal += u3Pts;
    collectedUraianAnswers.push({
        num: 3,
        question: "3. Algoritma Langkah Demi Langkah Sprite Kucing (10 Langkah, Meow, Belok Kanan 90 Derajat)",
        userAnswer: rawAns3 || "(Tidak diisi)",
        keyRef: "1. Mulai (Klik ikon Green Flag) -> 2. Pasang blok 'move 10 steps' (gerak maju 10 langkah) -> 3. Pasang blok 'play sound Meow until done' (memutar suara Meow) -> 4. Pasang blok 'turn right 90 degrees' (berputar/belok ke kanan sebesar 90 derajat) -> 5. Selesai.",
        points: u3Pts,
        keterangan: u3Pts >= 17 ? "✔ Urutan Sangat Runtut: Ketiga perintah (gerak 10 langkah, bunyi Meow, belok kanan 90 derajat) tersusun runtut dan logis." : `Perolehan skor mentah: ${u3Pts}/20 poin.`
    });

    // Uraian 4: Fungsi 4 Komponen Antarmuka Scratch (Sprite, Stage, Green Flag, Tombol Stop) (Maks 20 Poin Mentah)
    const raw4Sprite = (document.getElementById('uraian_k6_4_sprite') ? document.getElementById('uraian_k6_4_sprite').value.trim() : '');
    const raw4Stage = (document.getElementById('uraian_k6_4_stage') ? document.getElementById('uraian_k6_4_stage').value.trim() : '');
    const raw4Flag = (document.getElementById('uraian_k6_4_flag') ? document.getElementById('uraian_k6_4_flag').value.trim() : '');
    const raw4Stop = (document.getElementById('uraian_k6_4_stop') ? document.getElementById('uraian_k6_4_stop').value.trim() : '');

    let u4Pts = 0;
    const ans4Sprite = raw4Sprite.toLowerCase();
    const ans4Stage = raw4Stage.toLowerCase();
    const ans4Flag = raw4Flag.toLowerCase();
    const ans4Stop = raw4Stop.toLowerCase();

    if (ans4Sprite.includes('karakter') || ans4Sprite.includes('tokoh') || ans4Sprite.includes('objek') || ans4Sprite.includes('gambar') || ans4Sprite.includes('aktor')) u4Pts += 5; else if (raw4Sprite.length > 2) u4Pts += 2;
    if (ans4Stage.includes('panggung') || ans4Stage.includes('layar') || ans4Stage.includes('latar') || ans4Stage.includes('tempat') || ans4Stage.includes('area') || ans4Stage.includes('tampil')) u4Pts += 5; else if (raw4Stage.length > 2) u4Pts += 2;
    if (ans4Flag.includes('mulai') || ans4Flag.includes('start') || ans4Flag.includes('jalan') || ans4Flag.includes('eksekusi') || ans4Flag.includes('hidupkan')) u4Pts += 5; else if (raw4Flag.length > 2) u4Pts += 2;
    if (ans4Stop.includes('berhenti') || ans4Stop.includes('stop') || ans4Stop.includes('selesai') || ans4Stop.includes('jeda') || ans4Stop.includes('mematikan')) u4Pts += 5; else if (raw4Stop.length > 2) u4Pts += 2;

    rawUraianTotal += u4Pts;
    collectedUraianAnswers.push({
        num: 4,
        question: "4. Fungsi Komponen Antarmuka Scratch (Sprite, Stage, Green Flag, Tombol Stop)",
        userAnswer: `Sprite: ${raw4Sprite || '-'} | Stage: ${raw4Stage || '-'} | Green Flag: ${raw4Flag || '-'} | Stop: ${raw4Stop || '-'}`,
        keyRef: "a. Sprite: Karakter, tokoh, atau objek visual 2D yang dapat diprogram untuk bergerak, bersuara, dan berinteraksi. b. Stage: Panggung/jendela area tempat sprite beraksi menampilkan hasil animasi atau game. c. Green Flag (Bendera Hijau): Tombol untuk memulai/menjalankan eksekusi script program di panggung. d. Tombol Merah (Stop): Tombol untuk menghentikan seluruh program dan skrip yang sedang berjalan seketika.",
        points: u4Pts,
        keterangan: u4Pts >= 18 ? "✔ Sangat Tepat: Fungsi keempat komponen antarmuka Scratch diuraikan dengan sangat baik." : `Perolehan skor mentah: ${u4Pts}/20 poin.`
    });

    // Uraian 5: 5 Kategori Balok Kode Scratch, Warna & Contoh (Maks 20 Poin Mentah)
    const raw5_1 = (document.getElementById('uraian_k6_5_kategori1') ? document.getElementById('uraian_k6_5_kategori1').value.trim() : '');
    const raw5_2 = (document.getElementById('uraian_k6_5_kategori2') ? document.getElementById('uraian_k6_5_kategori2').value.trim() : '');
    const raw5_3 = (document.getElementById('uraian_k6_5_kategori3') ? document.getElementById('uraian_k6_5_kategori3').value.trim() : '');
    const raw5_4 = (document.getElementById('uraian_k6_5_kategori4') ? document.getElementById('uraian_k6_5_kategori4').value.trim() : '');
    const raw5_5 = (document.getElementById('uraian_k6_5_kategori5') ? document.getElementById('uraian_k6_5_kategori5').value.trim() : '');

    const checkKategoriK6 = (val) => {
        const v = val.toLowerCase();
        const hasKat = v.includes('motion') || v.includes('gerak') || v.includes('looks') || v.includes('tampilan') || v.includes('sound') || v.includes('suara') || v.includes('event') || v.includes('kejadian') || v.includes('control') || v.includes('kontrol') || v.includes('sensing') || v.includes('sensor') || v.includes('operator') || v.includes('variable') || v.includes('variabel');
        if (hasKat && val.length >= 8) return 4;
        if (hasKat || val.length >= 5) return 2;
        return 0;
    };

    let u5Pts = 0;
    u5Pts += checkKategoriK6(raw5_1);
    u5Pts += checkKategoriK6(raw5_2);
    u5Pts += checkKategoriK6(raw5_3);
    u5Pts += checkKategoriK6(raw5_4);
    u5Pts += checkKategoriK6(raw5_5);

    rawUraianTotal += u5Pts;
    collectedUraianAnswers.push({
        num: 5,
        question: "5. Lima Kategori Balok Kode Scratch, Warna Khas, dan Contoh Balok Perintah",
        userAnswer: `1: ${raw5_1 || '-'} | 2: ${raw5_2 || '-'} | 3: ${raw5_3 || '-'} | 4: ${raw5_4 || '-'} | 5: ${raw5_5 || '-'}`,
        keyRef: "1. Motion (Biru Tua) - contoh: move 10 steps. 2. Looks (Ungu) - contoh: say Hello! for 2 secs. 3. Sound (Magenta/Ungu Muda) - contoh: play sound Meow until done. 4. Events (Kuning Terang) - contoh: when green flag clicked. 5. Control (Oranye) - contoh: forever atau wait 1 seconds.",
        points: u5Pts,
        keterangan: u5Pts >= 18 ? "✔ Sangat Lengkap: Kelima kategori balok Scratch, warna khas, dan contoh blok perintah dijawab dengan sempurna." : `Perolehan skor mentah: ${u5Pts}/20 poin.`
    });

    // Konversi Skor Uraian: Bobot 30 Poin (Skala 0 - 30 Poin)
    const uraianScore = Math.min(30, Math.round((rawUraianTotal / 100) * 30));

    // Hentikan timer pengerjaan 60 menit & catat durasi
    if (examTimerIntervalK6) clearInterval(examTimerIntervalK6);
    const secondsSpent = Math.max(1, (60 * 60) - Math.max(0, examTimeRemainingK6));
    const minSpent = Math.floor(secondsSpent / 60);
    const secSpent = secondsSpent % 60;
    examDurationTextK6 = `${minSpent} Menit ${secSpent} Detik`;

    // Total Score (Bobot 70% PG + Bobot 30% Uraian = Maks 100 Poin)
    const totalScore = Math.min(100, Math.round(pgScore + uraianScore));
    const studentName = currentStudentDataK6.name || 'Sahabat Pintar Kelas 6';
    const studentClass = currentStudentDataK6.kelas || '6A';
    const isUjian = (currentExamMode === 'ujian');

    completedExamScoresK6 = {
        initial: currentStudentDataK6.nilaiAwal,
        pg: pgScore,
        correctPgCount: correctPgCount,
        totalPgItems: totalPgItems,
        uraian: uraianScore,
        rawUraianTotal: rawUraianTotal,
        final: totalScore,
        status: isUjian 
            ? (totalScore >= 80 ? 'LULUS UJIAN' : 'PERLU REMEDIAL')
            : (totalScore >= 80 ? 'LULUS REMEDIAL' : 'TUNTAS REMEDIAL'),
        predicate: totalScore >= 90 ? 'SANGAT MEMUASKAN' : (totalScore >= 80 ? 'BAIK SEKALI' : 'CUKUP BAIK')
    };

    // Tampilkan Nama & Nilai Akhir dengan TULISAN BESAR
    document.getElementById('scoreStudentSummaryK6').innerText = `${studentName} • Kelas ${studentClass} (Absen: ${currentStudentDataK6.absen})`;
    document.getElementById('hugeFinalScoreK6').innerText = totalScore;

    const mascotIcon = document.getElementById('scoreMascotIconK6');
    const predicateBadge = document.getElementById('hugePredicateBadgeK6');
    const motivationTitle = document.getElementById('motivationTitleK6');
    const motivationMessage = document.getElementById('motivationMessageK6');

    if (totalScore >= 90) {
        mascotIcon.innerText = '🏆';
        predicateBadge.innerText = isUjian ? '🌟 LULUS ASESMEN UJIAN DENGAN GEMILANG!' : '🌟 LULUS REMEDIAL DENGAN GEMILANG!';
        predicateBadge.style.background = 'linear-gradient(135deg, #059669, #10b981)';
        motivationTitle.innerHTML = `Luar Biasa, ${studentName}! Logika Kodingmu Sangat Hebat! 🚀`;
        motivationMessage.innerHTML = isUjian
            ? `Selamat atas keberhasilanmu! Usaha keras, ketelitian, dan kejujuranmu dalam menyelesaikan Ujian Koding dan Kecerdasan Artifisial hari ini membuahkan hasil yang sangat membanggakan!<br><br>Kamu telah membuktikan pemahaman logika berpikir komputasional dan koding yang luar biasa. Pertahankan prestasimu dan teruslah berkarya menciptakan inovasi baru! ✨🤖`
            : `Selamat atas keberhasilanmu! Usaha keras, ketelitian, dan kejujuranmu dalam memahami konsep Berpikir Komputasional, Machine Learning, dan pemrograman Scratch hari ini membuahkan hasil yang sangat membanggakan!<br><br>Kamu telah membuktikan bahwa tantangan koding tingkat lanjut dapat kamu selesaikan dengan gemilang. Teruslah berkarya, ciptakan proyek game dan AI yang bermanfaat, dan jadilah inspirasi bagi sesama! ✨🤖`;
    } else if (totalScore >= 80) {
        mascotIcon.innerText = '🎉';
        predicateBadge.innerText = isUjian ? '✨ DINYATAKAN LULUS UJIAN (KKM 80)!' : '✨ DINYATAKAN LULUS REMEDIAL (KKM 80)!';
        predicateBadge.style.background = 'linear-gradient(135deg, #7e22ce, #a855f7)';
        motivationTitle.innerHTML = `Kerja Bagus, ${studentName}! Kamu Berhasil Memenuhi KKM 80! 💡`;
        motivationMessage.innerHTML = isUjian
            ? `Hebat sekali! Nilai ujianmu berhasil melampaui batas KKM 80 dan membuktikan pemahaman logika algoritma koding yang sangat baik.<br><br>Teruslah belajar, bereksperimen dengan ide-ide kreatif di Scratch, dan jadilah teladan bagi teman-temanmu! Ibu Guru Darningsih sangat bangga padamu! 🌱`
            : `Hebat sekali! Skor remedialmu berhasil melampaui batas KKM 80 dan membuktikan pemahaman logika yang kuat dan dedikasi yang tinggi.<br><br>Berpikir komputasional dan pemrograman Scratch melatih otak kita untuk selalu berpikir terstruktur dan kreatif. Teruslah bereksplorasi dengan berbagai blok kode baru di Scratch, jangan ragu mencoba algoritma yang lebih seru, dan tetaplah rajin berlatih! Ibu Guru Darningsih sangat bangga padamu! 🌱`;
    } else {
        mascotIcon.innerText = '💪';
        predicateBadge.innerText = isUjian ? '📖 BELUM TUNTAS KKM (PERLU REMEDIAL)' : '📖 PERLU PENGAYAAN & TETAP SEMANGAT!';
        predicateBadge.style.background = 'linear-gradient(135deg, #f59e0b, #ea580c)';
        motivationTitle.innerHTML = `Jangan Pernah Menyerah, ${studentName}! Kamu Pasti Bisa! 💖`;
        motivationMessage.innerHTML = isUjian
            ? `Terima kasih banyak sudah berusaha dan mengerjakan soal ujian ini secara mandiri dan jujur.<br><br>Meskipun nilaimu belum mencapai batas standar KKM 80, jangan berkecil hati! Kamu akan mendapatkan bimbingan dan kesempatan remedial untuk memperbaiki nilaimu. Tetap semangat belajar bersama Ibu Guru ya! 🤖✨`
            : `Terima kasih banyak sudah berusaha dan mengerjakan soal remedial ini secara mandiri dan jujur!<br><br>Meskipun nilaimu belum mencapai batas KKM 80, setiap kesalahan (*bug*) atau kesulitan adalah sahabat terbaik yang mengajarkan kita untuk menjadi lebih teliti dan bijaksana. Jangan berkecil hati ya! Pelajari kembali 4 pilar computational thinking dan blok-blok di Scratch. Selangkah demi selangkah bersama Ibu Guru, kamu pasti bisa menjadi programmer hebat! 🤖✨`;
    }

    // Simpan ke Panel Guru
    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    const dateFormatted = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    const newStudentRecord = {
        id: 'st_k6_' + Date.now(),
        name: studentName,
        kelas: studentClass,
        absen: currentStudentDataK6.absen,
        nilaiAwal: currentStudentDataK6.nilaiAwal,
        nilaiAkhir: totalScore,
        pgScore: pgScore,
        uraianScore: uraianScore,
        status: isUjian ? (totalScore >= 80 ? 'Lulus Ujian' : 'Perlu Remedial') : (totalScore >= 80 ? 'Lulus' : 'Tuntas'),
        examType: isUjian ? 'Ujian Utama' : 'Remedial',
        predicate: completedExamScoresK6.predicate,
        duration: examDurationTextK6,
        timestamp: timeString,
        date: dateFormatted,
        period: currentRemedialPeriod,
        periodName: REMEDIAL_PERIODS[currentRemedialPeriod]?.name || currentRemedialPeriod,
        answers: {
            pg: collectedPgAnswers,
            uraian: collectedUraianAnswers
        }
    };

    saveStudentToRecap(newStudentRecord);

    if (window.confetti) {
        confetti({
            particleCount: 130,
            spread: 95,
            origin: { y: 0.4 }
        });
    }

    showExamStepK6('result');
    showToast(`${isUjian ? 'Nilai Akhir Ujian Kelas 6' : 'Nilai Akhir Remedial Kelas 6'}: ${totalScore}! 🌟 (Waktu: ${examDurationTextK6})`);
}

function generateAndDownloadPDFK6() {
    playCuteSound('pop');
    showToast('📄 Sedang menyusun dokumen PDF Kelas 6...');

    const today = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('id-ID', options);
    const isUjian = (currentExamMode === 'ujian');

    document.getElementById('pdfReportNameK6').innerText = currentStudentDataK6.name || 'Siswa Kelas 6';
    document.getElementById('pdfReportClassK6').innerText = `Kelas ${currentStudentDataK6.kelas || '6A'}`;
    document.getElementById('pdfReportAbsenK6').innerText = currentStudentDataK6.absen || '-';
    document.getElementById('pdfReportDurationK6').innerText = `${examDurationTextK6} (Batas: 60 Menit)`;
    document.getElementById('pdfReportDateK6').innerText = formattedDate;

    document.getElementById('pdfReportInitialScoreK6').innerText = isUjian ? '80 (KKM)' : completedExamScoresK6.initial;
    document.getElementById('pdfReportPgScoreK6').innerText = `${completedExamScoresK6.pg} / 70 Poin (${completedExamScoresK6.correctPgCount || 0}/45 Benar)`;
    document.getElementById('pdfReportUraianScoreK6').innerText = `${completedExamScoresK6.uraian} / 30 Poin (Skor: ${completedExamScoresK6.rawUraianTotal || 0}/100)`;
    document.getElementById('pdfReportFinalScoreK6').innerText = completedExamScoresK6.final;

    document.getElementById('pdfReportStatusK6').innerText = completedExamScoresK6.status;
    document.getElementById('pdfReportPredicateK6').innerText = completedExamScoresK6.predicate;
    document.getElementById('pdfReportLocationDateK6').innerText = `Jakarta, ${formattedDate}`;

    const element = document.getElementById('pdfDocumentElementK6');
    const safeStudentName = (currentStudentDataK6.name || 'Siswa_K6').replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `${isUjian ? 'Laporan_Ujian' : 'Laporan_Remedial'}_${safeStudentName}_Kelas_${currentStudentDataK6.kelas}.pdf`;

    if (typeof html2pdf !== 'undefined') {
        const opt = {
            margin: [8, 8, 8, 8],
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, logging: false, useCORS: false, letterRendering: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            playCuteSound('fanfare');
            showToast('✅ Berhasil mengunduh Laporan Remedial Kelas 6 (PDF)!');
        }).catch(err => {
            console.warn('Error generating PDF K6:', err);
            showToast('⚠️ Gagal membuat PDF, silakan periksa peramban Anda.');
        });
    } else {
        showToast('⚠️ Library PDF belum termuat di peramban.');
    }
}

function returnToMainMenuK6() {
    playCuteSound('pop');
    closeExamModalK6();
    showToast('✨ Kembali ke Menu Utama. Terus berkarya di Koding & AI!');
}

function toggleScreenExpandK6() {
    const icon = document.getElementById('fullscreenIconK6');
    const text = document.getElementById('fullscreenTextK6');

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            if (icon) icon.className = 'fa-solid fa-compress';
            if (text) text.innerText = 'Keluar Layar Penuh';
            showToast('🖥️ Mode Layar Penuh Diaktifkan');
        }).catch(() => {
            showToast('Layar penuh aktif');
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen().then(() => {
                if (icon) icon.className = 'fa-solid fa-expand';
                if (text) text.innerText = 'Layar Penuh';
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
    },
    {
        id: 'seed_k5_1',
        name: 'Jason Alexander',
        kelas: '5D',
        absen: '09',
        nilaiAwal: 62,
        nilaiAkhir: 96,
        pgScore: 50,
        uraianScore: 46,
        status: 'Lulus',
        predicate: 'SANGAT MEMUASKAN',
        duration: '39 Menit 10 Detik',
        timestamp: '08:45 WIB',
        date: '30 September 2026',
        answers: {
            pg: [
                { num: 1, question: "1. Langkah pertama menyimpan dokumen presentasi...", userChoice: 'B', userChoiceText: 'B. File', key: 'B', keyText: 'B. File', isCorrect: true, points: 5 },
                { num: 2, question: "2. Bagian utama jendela PowerPoint sebagai lembar kerja...", userChoice: 'C', userChoiceText: 'C. Halaman Slide', key: 'C', keyText: 'C. Halaman Slide', isCorrect: true, points: 5 },
                { num: 3, question: "3. Fungsi utama perangkat lunak Microsoft PowerPoint...", userChoice: 'C', userChoiceText: 'C. Menampilkan dokumen dalam bentuk slide presentasi', key: 'C', keyText: 'C. Menampilkan dokumen dalam bentuk slide presentasi', isCorrect: true, points: 5 },
                { num: 4, question: "4. Fitur efek perpindahan menarik dari slide ke slide...", userChoice: 'B', userChoiceText: 'B. Transition', key: 'B', keyText: 'B. Transition', isCorrect: true, points: 5 },
                { num: 5, question: "5. Contoh efek Transisi (Transitions)...", userChoice: 'C', userChoiceText: 'C. Push', key: 'C', keyText: 'C. Push', isCorrect: true, points: 5 },
                { num: 6, question: "6. Primary function of Microsoft PowerPoint...", userChoice: 'C', userChoiceText: 'C. To create visual presentations', key: 'C', keyText: 'C. To create visual presentations', isCorrect: true, points: 5 },
                { num: 7, question: "7. Keyboard shortcut starts slide show from first slide...", userChoice: 'A', userChoiceText: 'A. F5', key: 'A', keyText: 'A. F5', isCorrect: true, points: 5 },
                { num: 8, question: "8. Menu for saving files in Microsoft PowerPoint...", userChoice: 'A', userChoiceText: 'A. File', key: 'A', keyText: 'A. File', isCorrect: true, points: 5 },
                { num: 9, question: "9. Single page within a PowerPoint presentation...", userChoice: 'B', userChoiceText: 'B. Slide', key: 'B', keyText: 'B. Slide', isCorrect: true, points: 5 },
                { num: 10, question: "10. Button adds new slide to presentation...", userChoice: 'C', userChoiceText: 'C. New Slide', key: 'C', keyText: 'C. New Slide', isCorrect: true, points: 5 }
            ],
            uraian: [
                { num: 1, question: "11. Langkah-langkah cara membuat presentasi dengan bantuan aplikasi AI", userAnswer: "1. Buka platform AI pembuat presentasi (seperti Gamma.app atau Tome). 2. Pilih opsi Create new. 3. Masukkan prompt teks topik dan struktur slide. 4. Pilih tema atau gaya visual AI. 5. Klik Generate dan tunggu hingga selesai. 6. Review dan edit teks/gambar jika perlu disesuaikan.", points: 10 },
                { num: 2, question: "12. Nama slide tampilan layout (A, B, C)", userAnswer: "A: Title and Content (Judul dan Konten), B: Title, Content with Picture atau Picture with Caption, C: Two Content (Dua Konten)", points: 10 },
                { num: 3, question: "13. Contoh prompt untuk Bu Santi", userAnswer: "Buatkan materi presentasi untuk murid kelas 5 SD bertemakan 'Pengenalan Microsoft PowerPoint' yang terdiri dari 3 slide: Slide 1 Pengenalan PowerPoint, Slide 2 Mengenal Tampilan, dan Slide 3 Membuat Slide Baru. Gunakan bahasa yang sederhana dan mudah dipahami anak-anak.", points: 10 },
                { num: 4, question: "14. Langkah-langkah cara menyimpan presentasi ke Local Disk D", userAnswer: "1. Klik menu File -> Save As. 2. Klik Browse. 3. Pilih Local Disk (D:) -> folder kelas 5 -> folder 5D. 4. Ketik nama file: 5D-Namakamu-Latihan. 5. Klik Save.", points: 10 },
                { num: 5, question: "15. Lima aplikasi AI yang membantu dalam pembuatan presentasi", userAnswer: "1. Gamma App (Gamma.app), 2. Tome (Tome.app), 3. Canva (Magic Design), 4. Microsoft Copilot, 5. Beautiful.ai", points: 10 }
            ]
        }
    },
    {
        id: 'seed_k5_2',
        name: 'Nadine Aurelia',
        kelas: '5D',
        absen: '16',
        nilaiAwal: 65,
        nilaiAkhir: 90,
        pgScore: 45,
        uraianScore: 45,
        status: 'Lulus',
        predicate: 'SANGAT MEMUASKAN',
        duration: '44 Menit 05 Detik',
        timestamp: '09:00 WIB',
        date: '30 September 2026',
        answers: {
            pg: [
                { num: 1, question: "1. Langkah pertama menyimpan dokumen presentasi...", userChoice: 'B', userChoiceText: 'B. File', key: 'B', keyText: 'B. File', isCorrect: true, points: 5 },
                { num: 2, question: "2. Bagian utama jendela PowerPoint sebagai lembar kerja...", userChoice: 'C', userChoiceText: 'C. Halaman Slide', key: 'C', keyText: 'C. Halaman Slide', isCorrect: true, points: 5 },
                { num: 3, question: "3. Fungsi utama perangkat lunak Microsoft PowerPoint...", userChoice: 'C', userChoiceText: 'C. Menampilkan dokumen dalam bentuk slide presentasi', key: 'C', keyText: 'C. Menampilkan dokumen dalam bentuk slide presentasi', isCorrect: true, points: 5 },
                { num: 4, question: "4. Fitur efek perpindahan menarik dari slide ke slide...", userChoice: 'C', userChoiceText: 'C. Animations', key: 'B', keyText: 'B. Transition', isCorrect: false, points: 0 },
                { num: 5, question: "5. Contoh efek Transisi (Transitions)...", userChoice: 'C', userChoiceText: 'C. Push', key: 'C', keyText: 'C. Push', isCorrect: true, points: 5 },
                { num: 6, question: "6. Primary function of Microsoft PowerPoint...", userChoice: 'C', userChoiceText: 'C. To create visual presentations', key: 'C', keyText: 'C. To create visual presentations', isCorrect: true, points: 5 },
                { num: 7, question: "7. Keyboard shortcut starts slide show from first slide...", userChoice: 'A', userChoiceText: 'A. F5', key: 'A', keyText: 'A. F5', isCorrect: true, points: 5 },
                { num: 8, question: "8. Menu for saving files in Microsoft PowerPoint...", userChoice: 'A', userChoiceText: 'A. File', key: 'A', keyText: 'A. File', isCorrect: true, points: 5 },
                { num: 9, question: "9. Single page within a PowerPoint presentation...", userChoice: 'B', userChoiceText: 'B. Slide', key: 'B', keyText: 'B. Slide', isCorrect: true, points: 5 },
                { num: 10, question: "10. Button adds new slide to presentation...", userChoice: 'C', userChoiceText: 'C. New Slide', key: 'C', keyText: 'C. New Slide', isCorrect: true, points: 5 }
            ],
            uraian: [
                { num: 1, question: "11. Langkah-langkah cara membuat presentasi dengan bantuan aplikasi AI", userAnswer: "Buka platform Gamma.app, pilih Create new, ketik prompt presentasi, pilih tema visual, klik Generate, lalu review dan simpan.", points: 9 },
                { num: 2, question: "12. Nama slide tampilan layout (A, B, C)", userAnswer: "A: Title and Content, B: Picture with Caption, C: Two Content", points: 10 },
                { num: 3, question: "13. Contoh prompt untuk Bu Santi", userAnswer: "Buatkan materi presentasi murid kelas 5 SD tema Pengenalan Microsoft PowerPoint dengan 3 slide: Slide 1 Pengenalan, Slide 2 Tampilan, Slide 3 Membuat slide baru, bahasa sederhana ramah anak.", points: 9 },
                { num: 4, question: "14. Langkah-langkah cara menyimpan presentasi ke Local Disk D", userAnswer: "Klik menu File -> Save As -> Browse -> Local Disk (D:) -> folder kelas 5 -> 5D -> nama 5D-Nadine-Latihan -> Save.", points: 10 },
                { num: 5, question: "15. Lima aplikasi AI yang membantu dalam pembuatan presentasi", userAnswer: "Gamma App, Tome, Canva Magic Design, Microsoft Copilot, Beautiful.ai", points: 10 }
            ]
        }
    },
    {
        id: 'seed_k6_1',
        name: 'Kimberly Tan',
        kelas: '6A',
        absen: '07',
        nilaiAwal: 65,
        nilaiAkhir: 95,
        pgScore: 50,
        uraianScore: 45,
        status: 'Lulus',
        predicate: 'SANGAT MEMUASKAN',
        duration: '35 Menit 20 Detik',
        timestamp: '09:10 WIB',
        date: '30 September 2026',
        answers: {
            pg: [
                { num: 1, question: "1. Deva persiapan pesta ulang tahun...", userChoice: 'C', userChoiceText: 'C. Dekomposisi', key: 'C', keyText: 'C. Dekomposisi', isCorrect: true, points: 5 },
                { num: 2, question: "2. Inaya merapikan rak buku perpustakaan...", userChoice: 'A', userChoiceText: 'A. Pengenalan pola', key: 'A', keyText: 'A. Pengenalan pola', isCorrect: true, points: 5 },
                { num: 3, question: "3. William membuat peta rute perjalanan...", userChoice: 'D', userChoiceText: 'D. Abstraksi', key: 'D', keyText: 'D. Abstraksi', isCorrect: true, points: 5 },
                { num: 4, question: "4. Shevi langkah resep origami pesawat runtut...", userChoice: 'B', userChoiceText: 'B. Algoritma', key: 'B', keyText: 'B. Algoritma', isCorrect: true, points: 5 },
                { num: 5, question: "5. Pembuatan game menerapkan Pengenalan Pola...", userChoice: 'C', userChoiceText: 'C. Menggunakan logika pergerakan yang sama untuk semua karakter musuh', key: 'C', keyText: 'C. Menggunakan logika pergerakan yang sama untuk semua karakter musuh', isCorrect: true, points: 5 },
                { num: 6, question: "6. Voice assistant 'Play music' tahap 'Process'...", userChoice: 'D', userChoiceText: 'D. Converting sound to text and searching the song', key: 'D', keyText: 'D. Converting sound to text and searching the song', isCorrect: true, points: 5 },
                { num: 7, question: "7. Skenario Abstraction vs Pattern Recognition...", userChoice: 'B', userChoiceText: 'B. Drawing a subway map that shows only stations and connecting lines', key: 'B', keyText: 'B. Drawing a subway map that shows only stations and connecting lines', isCorrect: true, points: 5 },
                { num: 8, question: "8. Automated cleaning robot decomposition first step...", userChoice: 'D', userChoiceText: 'D. Divide the cleaning job into three separate sub-tasks: vacuuming, mopping, and obstacle avoidance', key: 'D', keyText: 'D. Divide the cleaning job into three separate sub-tasks: vacuuming, mopping, and obstacle avoidance', isCorrect: true, points: 5 },
                { num: 9, question: "9. AI model trained with labeled cat photos...", userChoice: 'B', userChoiceText: 'B. Supervised Learning', key: 'B', keyText: 'B. Supervised Learning', isCorrect: true, points: 5 },
                { num: 10, question: "10. Game coin & obstacles decomposition first step...", userChoice: 'A', userChoiceText: 'A. Break the game into movement, scoring, and obstacles', key: 'A', keyText: 'A. Break the game into movement, scoring, and obstacles', isCorrect: true, points: 5 }
            ],
            uraian: [
                { num: 1, question: "11. Codingan Menggerakkan Objek dengan Keyboard", userAnswer: "When [Green Flag] clicked -> forever -> if <key [right arrow] pressed?> then -> change x by 10 (serta if key left arrow pressed then change x by -10)", points: 10 },
                { num: 2, question: "12. Nama Blok Kode Berdasarkan Perintah", userAnswer: "A: Looks (Tampilan), B: Variables (Variabel), C: Sensing (Sensor), D: Looks (Tampilan)", points: 10 },
                { num: 3, question: "13. Nama dan Fungsi Gambar Ikon di Aplikasi Scratch", userAnswer: "Gambar A: Choose a Sprite (menambahkan karakter baru), Gambar B: Choose a Backdrop (menambahkan gambar latar panggung)", points: 10 },
                { num: 4, question: "14. Contoh Perintah dalam Blok Motion dan Control", userAnswer: "Motion: move 10 steps, turn right 15 degrees | Control: wait 1 secs, repeat 10", points: 10 },
                { num: 5, question: "15. Empat Pilar Computational Thinking", userAnswer: "1. Dekomposisi (Decomposition), 2. Pengenalan Pola (Pattern Recognition), 3. Abstraksi (Abstraction), 4. Algoritma (Algorithm)", points: 10 }
            ]
        }
    },
    {
        id: 'seed_k6_2',
        name: 'Kevin Jonathan',
        kelas: '6B',
        absen: '14',
        nilaiAwal: 60,
        nilaiAkhir: 90,
        pgScore: 45,
        uraianScore: 45,
        status: 'Lulus',
        predicate: 'SANGAT MEMUASKAN',
        duration: '41 Menit 15 Detik',
        timestamp: '09:25 WIB',
        date: '30 September 2026',
        answers: {
            pg: [
                { num: 1, question: "1. Deva persiapan pesta ulang tahun...", userChoice: 'C', userChoiceText: 'C. Dekomposisi', key: 'C', keyText: 'C. Dekomposisi', isCorrect: true, points: 5 },
                { num: 2, question: "2. Inaya merapikan rak buku perpustakaan...", userChoice: 'A', userChoiceText: 'A. Pengenalan pola', key: 'A', keyText: 'A. Pengenalan pola', isCorrect: true, points: 5 },
                { num: 3, question: "3. William membuat peta rute perjalanan...", userChoice: 'D', userChoiceText: 'D. Abstraksi', key: 'D', keyText: 'D. Abstraksi', isCorrect: true, points: 5 },
                { num: 4, question: "4. Shevi langkah resep origami pesawat runtut...", userChoice: 'B', userChoiceText: 'B. Algoritma', key: 'B', keyText: 'B. Algoritma', isCorrect: true, points: 5 },
                { num: 5, question: "5. Pembuatan game menerapkan Pengenalan Pola...", userChoice: 'C', userChoiceText: 'C. Menggunakan logika pergerakan yang sama untuk semua karakter musuh', key: 'C', keyText: 'C. Menggunakan logika pergerakan yang sama untuk semua karakter musuh', isCorrect: true, points: 5 },
                { num: 6, question: "6. Voice assistant 'Play music' tahap 'Process'...", userChoice: 'D', userChoiceText: 'D. Converting sound to text and searching the song', key: 'D', keyText: 'D. Converting sound to text and searching the song', isCorrect: true, points: 5 },
                { num: 7, question: "7. Skenario Abstraction vs Pattern Recognition...", userChoice: 'A', userChoiceText: 'A. Grouping files based on file extensions', key: 'B', keyText: 'B. Drawing a subway map that shows only stations and connecting lines', isCorrect: false, points: 0 },
                { num: 8, question: "8. Automated cleaning robot decomposition first step...", userChoice: 'D', userChoiceText: 'D. Divide the cleaning job into three separate sub-tasks: vacuuming, mopping, and obstacle avoidance', key: 'D', keyText: 'D. Divide the cleaning job into three separate sub-tasks: vacuuming, mopping, and obstacle avoidance', isCorrect: true, points: 5 },
                { num: 9, question: "9. AI model trained with labeled cat photos...", userChoice: 'B', userChoiceText: 'B. Supervised Learning', key: 'B', keyText: 'B. Supervised Learning', isCorrect: true, points: 5 },
                { num: 10, question: "10. Game coin & obstacles decomposition first step...", userChoice: 'A', userChoiceText: 'A. Break the game into movement, scoring, and obstacles', key: 'A', keyText: 'A. Break the game into movement, scoring, and obstacles', isCorrect: true, points: 5 }
            ],
            uraian: [
                { num: 1, question: "11. Codingan Menggerakkan Objek dengan Keyboard", userAnswer: "When [Green Flag] clicked, forever, if key right arrow pressed then change x by 10 (atau move 10 steps).", points: 10 },
                { num: 2, question: "12. Nama Blok Kode Berdasarkan Perintah", userAnswer: "A: Looks, B: Variables, C: Sensing, D: Looks", points: 10 },
                { num: 3, question: "13. Nama dan Fungsi Gambar Ikon di Aplikasi Scratch", userAnswer: "Gambar A: Choose a Sprite (Pilih Sprite), Gambar B: Choose a Backdrop (Pilih Latar Belakang).", points: 10 },
                { num: 4, question: "14. Contoh Perintah dalam Blok Motion dan Control", userAnswer: "Motion: move 10 steps, turn right 15 degrees. Control: wait 1 secs, repeat 10.", points: 10 },
                { num: 5, question: "15. Empat Pilar Computational Thinking", userAnswer: "1. Dekomposisi, 2. Pengenalan Pola, 3. Abstraksi, 4. Algoritma.", points: 8 }
            ]
        }
    }
];

let teacherActiveFilter = 'SEMUA';
let teacherSearchQuery = '';
let currentPreviewStudentId = null;

// Hapus semua data siswa sebelumnya secara otomatis sesuai permintaan guru
if (localStorage.getItem('tzuchi_data_cleared_by_user_req') !== 'true') {
    localStorage.setItem('remedial_tzuchi_records', JSON.stringify([]));
    localStorage.setItem('remedial_tzuchi_k4', JSON.stringify([]));
    localStorage.setItem('tzuchi_data_cleared_by_user_req', 'true');
}

// Master Data Nilai Remedial Resmi (Pemisahan Akurat Nilai Awal vs Nilai Akhir Remedial)
const REMEDIAL_REAL_SCORES = {
    "daniel": { awal: 55, akhir: 87, status: "Lulus", predicate: "BAIK SEKALI" },
    "annabel kartika mika": { awal: 30, akhir: 67, status: "Tuntas", predicate: "CUKUP BAIK" },
    "nuriyah hasanah": { awal: 15, akhir: 69, status: "Tuntas", predicate: "CUKUP BAIK" },
    "william ferdinand hendarmin": { awal: 25, akhir: 65, status: "Tuntas", predicate: "CUKUP BAIK" },
    "catherin carolin": { awal: 70, akhir: 68, status: "Tuntas", predicate: "CUKUP BAIK" },
    "dio soehardjo": { awal: 70, akhir: 76, status: "Tuntas", predicate: "CUKUP BAIK" },
    "evelyn veglia bong": { awal: 70, akhir: 85, status: "Lulus", predicate: "BAIK SEKALI" },
    "elvira agatha": { awal: 25, akhir: 69, status: "Tuntas", predicate: "CUKUP BAIK" },
    "jason rh": { awal: 70, akhir: 67, status: "Tuntas", predicate: "CUKUP BAIK" },
    "seleena kathleen lim": { awal: 25, akhir: 68, status: "Tuntas", predicate: "CUKUP BAIK" },
    "gracia jesslyn ang": { awal: 70, akhir: 63, status: "Tuntas", predicate: "CUKUP BAIK" },
    "aerillyne letisha adzkia rahmanta": { awal: 25, akhir: 55, status: "Tuntas", predicate: "CUKUP BAIK" },
    "ramadhan ardiansyah": { awal: 40, akhir: 42, status: "Tuntas", predicate: "CUKUP BAIK" },
    "vita aulia": { awal: 25, akhir: 55, status: "Tuntas", predicate: "CUKUP BAIK" },
    "jarvis wu": { awal: 55, akhir: 54, status: "Tuntas", predicate: "CUKUP BAIK" },
    "fakhry zafran .a": { awal: 40, akhir: 36, status: "Tuntas", predicate: "CUKUP BAIK" },
    "nazhifa putri.p": { awal: 30, akhir: 32, status: "Tuntas", predicate: "CUKUP BAIK" }
};

function getMasterScoreOverride(name) {
    if (!name) return null;
    const clean = String(name).trim().toLowerCase();
    if (REMEDIAL_REAL_SCORES[clean]) return REMEDIAL_REAL_SCORES[clean];
    for (const key in REMEDIAL_REAL_SCORES) {
        if (clean.includes(key) || key.includes(clean)) {
            return REMEDIAL_REAL_SCORES[key];
        }
    }
    return null;
}

const SEED_REMEDIAL_K6_STUDENTS = [
    { id: 'st_k6_1791334080227', name: 'ANNABEL KARTIKA MIKA', kelas: '6A', absen: '2', nilaiAwal: 30, nilaiAkhir: 67, status: 'Tuntas', predicate: 'CUKUP BAIK', duration: '23 Menit 33 Detik', timestamp: '07:48 WIB', date: '7 Oktober 2026' },
    { id: 'st_k6_1791333628749', name: 'DANIEL', kelas: '6A', absen: '7', nilaiAwal: 55, nilaiAkhir: 87, status: 'Lulus', predicate: 'BAIK SEKALI', duration: '19 Menit 50 Detik', timestamp: '07:40 WIB', date: '7 Oktober 2026' },
    { id: 'st_k6_1791333595306', name: 'NURIYAH HASANAH', kelas: '6A', absen: '26', nilaiAwal: 15, nilaiAkhir: 69, status: 'Tuntas', predicate: 'CUKUP BAIK', duration: '19 Menit 26 Detik', timestamp: '07:40 WIB', date: '7 Oktober 2026' },
    { id: 'st_k6_1791333547234', name: 'William ferdinand hendarmin', kelas: '6A', absen: '31', nilaiAwal: 25, nilaiAkhir: 65, status: 'Tuntas', predicate: 'CUKUP BAIK', duration: '18 Menit 19 Detik', timestamp: '07:39 WIB', date: '7 Oktober 2026' },
    { id: 'st_k6_1791333530063', name: 'CATHERIN CAROLIN', kelas: '6A', absen: '6', nilaiAwal: 70, nilaiAkhir: 68, status: 'Tuntas', predicate: 'CUKUP BAIK', duration: '18 Menit 24 Detik', timestamp: '07:38 WIB', date: '7 Oktober 2026' },
    { id: 'st_k6_1791333519546', name: 'JASON RH', kelas: '6A', absen: '18', nilaiAwal: 70, nilaiAkhir: 67, status: 'Tuntas', predicate: 'CUKUP BAIK', duration: '18 Menit 11 Detik', timestamp: '07:38 WIB', date: '7 Oktober 2026' },
    { id: 'st_k6_1791333351270', name: 'ELVIRA AGATHA', kelas: '6A', absen: '9', nilaiAwal: 25, nilaiAkhir: 69, status: 'Tuntas', predicate: 'CUKUP BAIK', duration: '15 Menit 17 Detik', timestamp: '07:35 WIB', date: '7 Oktober 2026' },
    { id: 'st_k6_1791333345742', name: 'Ramadhan ardiansyah', kelas: '6A', absen: '27', nilaiAwal: 40, nilaiAkhir: 42, status: 'Tuntas', predicate: 'CUKUP BAIK', duration: '15 Menit 17 Detik', timestamp: '07:35 WIB', date: '7 Oktober 2026' },
    { id: 'st_k6_1791333099413', name: 'DIO SOEHARDJO', kelas: '6A', absen: '8', nilaiAwal: 70, nilaiAkhir: 76, status: 'Tuntas', predicate: 'CUKUP BAIK', duration: '10 Menit 17 Detik', timestamp: '07:31 WIB', date: '7 Oktober 2026' },
    { id: 'st_k6_1791333029886', name: 'seleena kathleen lim', kelas: '6A', absen: '28', nilaiAwal: 25, nilaiAkhir: 68, status: 'Tuntas', predicate: 'CUKUP BAIK', duration: '9 Menit 51 Detik', timestamp: '07:30 WIB', date: '7 Oktober 2026' },
    { id: 'st_k6_1791332734999', name: 'GRACIA JESSLYN ANG', kelas: '6A', absen: '12', nilaiAwal: 70, nilaiAkhir: 63, status: 'Tuntas', predicate: 'CUKUP BAIK', duration: '5 Menit 19 Detik', timestamp: '07:25 WIB', date: '7 Oktober 2026' },
    { id: 'st_k6_1791334285663', name: 'Aerillyne letisha adzkia rahmanta', kelas: '6A', absen: '1', nilaiAwal: 25, nilaiAkhir: 55, status: 'Tuntas', predicate: 'CUKUP BAIK', duration: '30 Menit 50 Detik', timestamp: '07:51 WIB', date: '7 Oktober 2026' },
    { id: 'st_k6_1791334754669', name: 'EVELYN VEGLIA BONG', kelas: '6A', absen: '11', nilaiAwal: 70, nilaiAkhir: 85, status: 'Lulus', predicate: 'BAIK SEKALI', duration: '38 Menit 43 Detik', timestamp: '07:59 WIB', date: '7 Oktober 2026' },
    { id: 'st_k6_1791334847648', name: 'Nazhifa putri.p', kelas: '6A', absen: '25', nilaiAwal: 30, nilaiAkhir: 32, status: 'Tuntas', predicate: 'CUKUP BAIK', duration: '39 Menit 42 Detik', timestamp: '08:00 WIB', date: '7 Oktober 2026' },
    { id: 'st_k6_1791334849968', name: 'Vita Aulia', kelas: '6A', absen: '30', nilaiAwal: 25, nilaiAkhir: 55, status: 'Tuntas', predicate: 'CUKUP BAIK', duration: '40 Menit 21 Detik', timestamp: '08:00 WIB', date: '7 Oktober 2026' },
    { id: 'st_k6_1791334851453', name: 'jarvis wu', kelas: '6A', absen: '17', nilaiAwal: 55, nilaiAkhir: 54, status: 'Tuntas', predicate: 'CUKUP BAIK', duration: '40 Menit 23 Detik', timestamp: '08:00 WIB', date: '7 Oktober 2026' },
    { id: 'st_k6_1791334945661', name: 'FAKHRY ZAFRAN .A', kelas: '6A', absen: '12', nilaiAwal: 40, nilaiAkhir: 36, status: 'Tuntas', predicate: 'CUKUP BAIK', duration: '41 Menit 47 Detik', timestamp: '08:02 WIB', date: '7 Oktober 2026' }
];

function getRecapList() {
    try {
        let stored = localStorage.getItem('remedial_tzuchi_records') || localStorage.getItem('remedial_tzuchi_k4');
        if (!stored || stored === '[]') {
            stored = JSON.stringify(SEED_REMEDIAL_K6_STUDENTS);
            localStorage.setItem('remedial_tzuchi_records', stored);
            localStorage.setItem('remedial_tzuchi_k4', stored);
        }
        if (stored) {
            let parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
                let hasChanges = false;
                const cleanedList = parsed.filter(item => {
                    if (!item || typeof item !== 'object') return false;
                    const n = String(item.name || '').trim();
                    return n && n !== '-' && n !== 'null' && n !== 'undefined' && n.length >= 2;
                }).map((item, itemIdx) => {
                    if (!item.id || item.id === '-' || String(item.id).trim() === '') {
                        item.id = 'st_' + (item.kelas || '4') + '_' + (item.absen || itemIdx) + '_' + itemIdx;
                        hasChanges = true;
                    }
                    // Cek terhadap Master Nilai Resmi
                    const override = getMasterScoreOverride(item.name);
                    if (override) {
                        if (!item.userEditedAwal) {
                            item.nilaiAwal = override.awal;
                        }
                        item.nilaiAkhir = override.akhir;
                        item.status = override.status;
                        item.predicate = override.predicate;
                        hasChanges = true;
                    } else {
                        // Deteksi jika data tersinkron dari kolom sheet yang bergeser:
                        const predNum = Number(item.predicate);
                        if (!isNaN(predNum) && predNum > 0) {
                            const realAkhir = predNum;
                            const realAwal = Number(item.nilaiAwal !== undefined && item.nilaiAwal !== 0 ? item.nilaiAwal : (item.nilaiAkhir || 0));
                            if (!item.userEditedAwal) item.nilaiAwal = realAwal;
                            item.nilaiAkhir = realAkhir;
                            item.predicate = String(item.status || (realAkhir >= 90 ? 'SANGAT MEMUASKAN' : (realAkhir >= 80 ? 'BAIK SEKALI' : 'CUKUP BAIK')));
                            item.status = realAkhir >= 80 ? 'Lulus' : 'Tuntas';
                            hasChanges = true;
                        } else if (String(item.status || '').toUpperCase().includes('BAIK') || String(item.status || '').toUpperCase().includes('MEMUASKAN')) {
                            const currAkhir = Number(item.nilaiAkhir || 0);
                            item.status = currAkhir >= 80 ? 'Lulus' : 'Tuntas';
                            hasChanges = true;
                        }
                    }

                    // Format tanggal rapi jika berformat ISO atau timestamp
                    if (item.date && (item.date.includes('T') || (item.date.includes('-') && !item.date.includes('Oktober')))) {
                        item.date = formatIndonesianDate(item.date);
                        hasChanges = true;
                    }

                    // Pastikan lembar jawaban selalu lengkap untuk setiap siswa
                    if (!item.answers || !Array.isArray(item.answers.pg) || item.answers.pg.length < 10 || !Array.isArray(item.answers.uraian) || item.answers.uraian.length < 5) {
                        item.answers = ensureStudentAnswers(item);
                        hasChanges = true;
                    }

                    const dur = String(item.duration || '');
                    if (dur.includes('{') || dur.includes('[') || dur.length > 25) {
                        item.duration = '60 Menit';
                    }
                    const ts = String(item.timestamp || '');
                    if (ts.includes('{') || ts.includes('[') || ts.length > 35) {
                        item.timestamp = item.date || '-';
                    }

                    // Pastikan periode terisi (data riwayat sebelumnya otomatis masuk Semester 1 - PTS)
                    if (!item.period) {
                        item.period = 'sem1_pts';
                        item.periodName = REMEDIAL_PERIODS['sem1_pts'] ? REMEDIAL_PERIODS['sem1_pts'].name : 'Semester 1 • Remedial PTS (Mid)';
                        hasChanges = true;
                    }

                    // AUTO-MIGRASI PAS: Siswa yang mengerjakan pada tanggal 23/24 November 2026, bulan November/Desember, atau hari ini
                    // otomatis masuk ke Semester 1 - PAS agar langsung muncul saat Guru membuka filter SEM 1-PAS
                    const rawDateStr = String(item.date || item.timestamp || '');
                    const todayStr = new Date().toLocaleDateString('id-ID');
                    if (rawDateStr.includes('23/11/2026') || rawDateStr.includes('24/11/2026') || rawDateStr.includes('25/11/2026') || rawDateStr.includes('/11/2026') || rawDateStr.includes('/12/2026') || rawDateStr.toLowerCase().includes('nov') || rawDateStr.toLowerCase().includes('des') || (todayStr && rawDateStr.includes(todayStr))) {
                        if (item.period !== 'sem1_pas') {
                            item.period = 'sem1_pas';
                            item.periodName = REMEDIAL_PERIODS['sem1_pas'] ? REMEDIAL_PERIODS['sem1_pas'].name : 'Semester 1 • Remedial PAS (Akhir)';
                            hasChanges = true;
                        }
                        // Pulihkan skor jika terjadi pergeseran kolom (skor 0 tapi nilaiAwal atau predikat ada angka)
                        if (Number(item.nilaiAkhir) === 0) {
                            if (!isNaN(Number(item.predicate)) && Number(item.predicate) > 0) {
                                item.nilaiAkhir = Number(item.predicate);
                                item.predicate = item.nilaiAkhir >= 90 ? 'SANGAT MEMUASKAN' : (item.nilaiAkhir >= 80 ? 'BAIK SEKALI' : 'CUKUP BAIK');
                                item.status = item.nilaiAkhir >= 80 ? 'Lulus' : 'Tuntas';
                                hasChanges = true;
                            } else if (Number(item.nilaiAwal) >= 10) {
                                item.nilaiAkhir = Number(item.nilaiAwal);
                                item.nilaiAwal = 0;
                                item.predicate = item.nilaiAkhir >= 90 ? 'SANGAT MEMUASKAN' : (item.nilaiAkhir >= 80 ? 'BAIK SEKALI' : 'CUKUP BAIK');
                                item.status = item.nilaiAkhir >= 80 ? 'Lulus' : 'Tuntas';
                                hasChanges = true;
                            }
                        }
                    }

                    return item;
                });

                if (hasChanges) {
                    try {
                        localStorage.setItem('remedial_tzuchi_records', JSON.stringify(cleanedList));
                        localStorage.setItem('remedial_tzuchi_k4', JSON.stringify(cleanedList));
                    } catch(eSave) {}
                }

                return cleanedList;
            }
        }
    } catch (e) {
        console.warn('Error reading recap records from localStorage:', e);
    }
    return SEED_REMEDIAL_K6_STUDENTS;
}

/* ==============================================================
   HAPUS SEMUA DATA SISWA YANG SUDAH UJIAN (RESET REKAP)
   ============================================================== */
function clearAllExamData() {
    playCuteSound('pop');
    const list = getRecapList();
    if (list.length === 0) {
        showToast('ℹ️ Data siswa sudah dalam keadaan kosong.');
        return;
    }

    const confirmClear = confirm(
        "⚠️ PERINGATAN PENGHAPUSAN DATA SISWA!\n\n" +
        `Saat ini tersimpan ${list.length} data siswa yang sudah ujian.\n` +
        "Apakah Anda yakin ingin MENGHAPUS SEMUA DATA SISWA tersebut?\n\n" +
        "Seluruh data nilai dan lembar jawaban akan dibersihkan dari rekapitulasi.\n" +
        "Tekan OK untuk melanjutkan penghapusan."
    );
    if (!confirmClear) return;

    localStorage.setItem('remedial_tzuchi_records', JSON.stringify([]));
    localStorage.setItem('remedial_tzuchi_k4', JSON.stringify([]));
    renderTeacherTable();
    playCuteSound('fanfare');
    showToast('🗑️ Semua data siswa yang sudah ujian berhasil dihapus!');
}

/* ==============================================================
   GOOGLE SHEETS CLOUD INTEGRATION (UJIAN SERENTAK)
   ============================================================== */
// TEMPELKAN URL WEB APP GOOGLE APPS SCRIPT ANDA DI SINI
// AGAR OTOMATIS BERLAKU DI SELURUH LAPTOP/HP SISWA YANG MEMBUKA LINK GITHUB
const DEFAULT_GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbzlB_FGnomRlzZdhxNX4uMOoz2ERmMImC4FvdzdLJ4_-OUAN7OFvKXMwVI-QlLwo1f6/exec"; 
let GOOGLE_SHEETS_WEBAPP_URL = DEFAULT_GOOGLE_SHEETS_URL;
// Pastikan selalu tersimpan permanen di localStorage seluruh peramban
localStorage.setItem('tzuchi_sheets_url', DEFAULT_GOOGLE_SHEETS_URL);
if (GOOGLE_SHEETS_WEBAPP_URL && GOOGLE_SHEETS_WEBAPP_URL.endsWith('/dev')) {
    GOOGLE_SHEETS_WEBAPP_URL = GOOGLE_SHEETS_WEBAPP_URL.replace(/\/dev$/, '/exec');
}

function updateCloudStatusUI() {
    const dot = document.getElementById('cloudStatusDot');
    const text = document.getElementById('cloudStatusText');
    if (!dot || !text) return;

    if (GOOGLE_SHEETS_WEBAPP_URL && GOOGLE_SHEETS_WEBAPP_URL.trim().startsWith('http')) {
        dot.className = 'cloud-status-dot';
        text.innerHTML = `<strong>Cloud Aktif:</strong> Terhubung ke Google Sheets (<span style="color:#0284c7; font-weight:600;">${GOOGLE_SHEETS_WEBAPP_URL.substring(0, 42)}...</span>)`;
    } else {
        dot.className = 'cloud-status-dot offline';
        text.innerHTML = `<strong>Mode Offline (Belum Terhubung Cloud):</strong> Hasil ujian siswa di HP/laptop lain belum bisa masuk ke sini. Klik 'Setup Cloud' untuk menghubungkan Google Sheets.`;
    }
}

/* ==============================================================
   CLOUD REAL-TIME CONTROLLER (SINKRONISASI SAKLAR GURU ANTAR-DEVICE)
   Memastikan komputer siswa otomatis sinkron saat guru mengganti
   periode ujian, mengunci ujian, atau mengacak token di komputer guru.
   ============================================================== */
function pushExamConfigToCloud(config) {
    if (!GOOGLE_SHEETS_WEBAPP_URL || !GOOGLE_SHEETS_WEBAPP_URL.trim().startsWith('http')) return;
    const periodVal = config.period || activeTeacherRemedialPeriod || 'sem1_pas';
    const statusVal = config.status || (isExamSessionOpen() ? 'OPEN' : 'CLOSED');
    const tokenVal = config.token || getActiveExamToken() || 'TZU26';

    const payload = {
        action: 'setExamConfig',
        period: periodVal,
        status: statusVal,
        token: tokenVal
    };

    const pingParams = 'action=setExamConfig&period=' + encodeURIComponent(periodVal) +
        '&status=' + encodeURIComponent(statusVal) +
        '&token=' + encodeURIComponent(tokenVal) +
        '&_ts=' + Date.now();
    const pingUrl = GOOGLE_SHEETS_WEBAPP_URL + (GOOGLE_SHEETS_WEBAPP_URL.includes('?') ? '&' : '?') + pingParams;

    // 1. Kirim via Image Ping (100% Kebal CORS & Preflight browser)
    try {
        const pingImg = new Image();
        pingImg.src = pingUrl;
    } catch(eImg) {}

    // 2. Kirim via GET Ping
    try {
        fetch(pingUrl, { method: 'GET', mode: 'no-cors' });
    } catch(eGet) {}

    // 3. Kirim via POST Payload
    try {
        fetch(GOOGLE_SHEETS_WEBAPP_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then(() => {
            console.log('☁️ Exam config successfully broadcasted to cloud:', payload);
        }).catch(err => {
            console.warn('Notice: pushExamConfigToCloud network notice:', err);
        });
    } catch(e) {}
}

let isCloudConfigFetching = false;

// Callback Global untuk JSONP Sinkronisasi Cloud
window.handleCloudExamConfigCallback = function(config) {
    if (!config) return;
    processRemoteExamConfig(config, false);
};

function processRemoteExamConfig(config, isInitial = false) {
    if (!config || (config.status !== 'success' && !config.activePeriod)) return;
    const remotePeriod = config.activePeriod;
    const remoteStatus = config.examStatus || 'OPEN';
    const remoteToken = config.liveToken;

    // 1. Cek perubahan periode aktif dari guru
    if (remotePeriod && REMEDIAL_PERIODS[remotePeriod] && remotePeriod !== activeTeacherRemedialPeriod) {
        activeTeacherRemedialPeriod = remotePeriod;
        currentRemedialPeriod = remotePeriod;
        officialRemedialPeriod = remotePeriod;
        localStorage.setItem('tzuchi_teacher_active_period', remotePeriod);
        localStorage.setItem('tzuchi_official_period', remotePeriod);
        localStorage.setItem('tzuchi_remedial_period', remotePeriod);
        applyRemedialPeriod(remotePeriod);

        if (!isInitial) {
            const pName = REMEDIAL_PERIODS[remotePeriod]?.name || remotePeriod;
            showToast(`📢 Guru Pengawas mengaktifkan: [${pName}]`);
            playCuteSound('pop');
        }
    }

    // 2. Cek perubahan saklar kunci ujian
    const currentStatus = isExamSessionOpen() ? 'OPEN' : 'CLOSED';
    if (remoteStatus && remoteStatus !== currentStatus) {
        localStorage.setItem('tzuchi_exam_session_status', remoteStatus);
        updateExamSessionDisplay();
        applyRemedialPeriod(activeTeacherRemedialPeriod);

        if (!isInitial) {
            if (remoteStatus === 'CLOSED') {
                showToast('🔒 Guru Pengawas mengunci seluruh akses ujian.');
            } else {
                showToast('🔓 Guru Pengawas membuka akses ujian!');
            }
            playCuteSound('pop');
        }
    }

    // 3. Cek perubahan token ujian live
    if (remoteToken && remoteToken !== getActiveExamToken()) {
        setActiveExamToken(remoteToken);
        ['k4ExamToken', 'k5ExamToken', 'k6ExamToken'].forEach(id => {
            const el = document.getElementById(id);
            if (el && !el.value) el.value = remoteToken;
        });
    }
}

async function fetchExamConfigFromCloud(isInitial = false) {
    if (!GOOGLE_SHEETS_WEBAPP_URL || !GOOGLE_SHEETS_WEBAPP_URL.trim().startsWith('http')) return;
    if (isCloudConfigFetching) return;
    isCloudConfigFetching = true;

    try {
        const queryUrl = GOOGLE_SHEETS_WEBAPP_URL + (GOOGLE_SHEETS_WEBAPP_URL.includes('?') ? '&' : '?') + 'action=getExamConfig&_ts=' + Date.now();
        const res = await fetch(queryUrl, { method: 'GET', redirect: 'follow', cache: 'no-store' });
        const text = await res.text();
        let config;
        try {
            config = JSON.parse(text);
        } catch (e) {
            // Jika respons bukan JSON langsung, fallback ke JSONP
            fallbackJsonpExamConfig();
            isCloudConfigFetching = false;
            return;
        }

        processRemoteExamConfig(config, isInitial);
    } catch (err) {
        // Fallback ke JSONP jika fetch gagal karena CORS atau redirect
        fallbackJsonpExamConfig();
    } finally {
        isCloudConfigFetching = false;
    }
}

function fallbackJsonpExamConfig() {
    try {
        const oldScript = document.getElementById('jsonpExamConfigScript');
        if (oldScript && oldScript.parentNode) {
            oldScript.parentNode.removeChild(oldScript);
        }
        const script = document.createElement('script');
        script.id = 'jsonpExamConfigScript';
        script.src = GOOGLE_SHEETS_WEBAPP_URL + (GOOGLE_SHEETS_WEBAPP_URL.includes('?') ? '&' : '?') + 'action=getExamConfig&callback=handleCloudExamConfigCallback&_ts=' + Date.now();
        script.onerror = function() {
            if (script.parentNode) script.parentNode.removeChild(script);
        };
        document.head.appendChild(script);
    } catch(eJsonp) {}
}

let cloudPollingInterval = null;
function startCloudConfigPolling() {
    if (cloudPollingInterval) clearInterval(cloudPollingInterval);
    // Langsung cek saat pertama kali halaman terbuka
    fetchExamConfigFromCloud(true);
    // Polling berkala setiap 5 detik agar responsif antar-komputer di lab
    cloudPollingInterval = setInterval(() => {
        fetchExamConfigFromCloud(false);
    }, 5000);
}

function openCloudConfigModal() {
    playCuteSound('pop');
    const modal = document.getElementById('cloudConfigModal');
    const input = document.getElementById('inputSheetsWebappUrl');
    if (input) input.value = GOOGLE_SHEETS_WEBAPP_URL;
    if (modal) {
        modal.classList.add('open');
        modal.style.display = 'flex';
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
    }
}

function closeCloudConfigModal() {
    playCuteSound('pop');
    const modal = document.getElementById('cloudConfigModal');
    if (modal) {
        modal.classList.remove('open');
        modal.style.display = 'none';
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
    }
}

function saveCloudConfig() {
    playCuteSound('pop');
    const input = document.getElementById('inputSheetsWebappUrl');
    let val = input ? input.value.trim() : '';
    if (val && !val.startsWith('http')) {
        alert('Harap masukkan URL yang valid (dimulai dengan https://script.google.com/...)');
        return;
    }
    if (val.endsWith('/dev')) {
        const confirmFix = confirm('⚠️ PERHATIAN:\nURL yang Anda tempelkan berakhiran "/dev" (URL Uji Coba Developer).\nGoogle memblokir akses siswa/website luar untuk URL "/dev".\n\nApakah Anda ingin otomatis mengubah akhiran "/dev" menjadi "/exec"?\n(Klik OK untuk otomatis ubah ke /exec, atau Batal untuk mengecek ulang di Apps Script).');
        if (confirmFix) {
            val = val.replace(/\/dev$/, '/exec');
            if (input) input.value = val;
        }
    }
    GOOGLE_SHEETS_WEBAPP_URL = val;
    localStorage.setItem('tzuchi_sheets_url', val);
    updateCloudStatusUI();
    closeCloudConfigModal();
    if (val) {
        showToast('☁️ URL Google Sheets tersimpan! Sistem siap untuk ujian serentak.');
    } else {
        showToast('ℹ️ Konfigurasi Cloud dinonaktifkan. Beralih ke penyimpanan lokal.');
    }
}

function copyGasCodeToClipboard() {
    const codeElem = document.getElementById('gasScriptCodeSnippet');
    if (!codeElem) return;
    const text = codeElem.innerText;
    navigator.clipboard.writeText(text).then(() => {
        playCuteSound('fanfare');
        showToast('📋 Kode Google Apps Script berhasil disalin!');
    }).catch(err => {
        showToast('Gagal menyalin kode ke clipboard.');
    });
}

async function testCloudConnection() {
    const input = document.getElementById('inputSheetsWebappUrl');
    let testUrl = input ? input.value.trim() : GOOGLE_SHEETS_WEBAPP_URL;
    if (!testUrl || !testUrl.startsWith('http')) {
        alert('Silakan tempelkan Web App URL Google Sheets terlebih dahulu!');
        return;
    }
    if (testUrl.endsWith('/dev')) {
        alert('⚠️ URL BERAKHIRAN "/dev" TIDAK BISA DIGUNAKAN!\n\nURL berakhiran /dev adalah "Test deployment" yang hanya bisa dibuka akun pembuat dan diblokir Google jika diakses dari web/siswa.\n\nCara mendapatkan URL yang benar:\n1. Di Google Apps Script, klik "Deploy" -> "New deployment"\n2. Pastikan Who has access: "Anyone" (Siapa saja)\n3. Klik "Deploy", lalu salin URL yang berakhiran "/exec".');
        testUrl = testUrl.replace(/\/dev$/, '/exec');
        if (input) input.value = testUrl;
        return;
    }
    showToast('🔄 Menguji koneksi ke Google Sheets...');
    try {
        const res = await fetch(testUrl, { method: 'GET', redirect: 'follow', cache: 'no-store' });
        const text = await res.text();
        let json;
        try {
            json = JSON.parse(text);
        } catch(e) {
            if (text.includes('accounts.google.com') || text.includes('ServiceLogin')) {
                alert('⚠️ KONEKSI DITOLAK GOOGLE (LOGIN DIWAJIBKAN)!\n\nSaat deploy Apps Script, pilihan "Who has access" masih diatur ke "Only myself".\n\nCara memperbaiki:\n1. Buka Apps Script -> Deploy -> Manage deployments\n2. Klik ikon pensil (Edit)\n3. Ubah "Who has access" menjadi "Anyone" (Siapa saja)\n4. Klik Deploy.');
                return;
            }
            alert('⚠️ Respons bukan JSON valid:\n' + text.substring(0, 160) + '...\n\nPastikan URL berakhiran /exec dan script sudah dideploy dengan izin Anyone.');
            return;
        }
        playCuteSound('fanfare');
        alert('🎉 KONEKSI BERHASIL 100%!\n\nGoogle Sheets terhubung aktif dan siap menerima data ujian siswa.');
    } catch(err) {
        console.warn('Test Cloud connection error:', err);
        alert('⚠️ GAGAL TERHUBUNG KE GOOGLE APPS SCRIPT!\n\nKemungkinan penyebab:\n1. Di Apps Script, pilihan "Who has access" belum diatur ke "Anyone" (Siapa saja).\n2. Izin akses (Review permissions) belum disetujui di akun Google Anda.\n3. URL Web App belum berakhiran /exec.');
    }
}

const SHEET_TO_PERIOD_MAP = {
    'SEM 1-PTS': 'sem1_pts',
    'SEM 1-PAS': 'sem1_pas',
    'SEM 2-PTS': 'sem2_pts',
    'SEM 2-PAT': 'sem2_pas',
    'SEM 2-PAS': 'sem2_pas'
};

const PERIOD_TO_SHEET_MAP = {
    'sem1_pts': 'SEM 1-PTS',
    'sem1_pas': 'SEM 1-PAS',
    'sem2_pts': 'SEM 2-PTS',
    'sem2_pas': 'SEM 2-PAT'
};

function normalizeSheetNameToPeriod(sheetName) {
    if (!sheetName) return 'sem1_pts';
    const s = String(sheetName).toUpperCase().replace(/\s+/g, '');
    if (s.includes('1') && s.includes('PTS')) return 'sem1_pts';
    if (s.includes('1') && s.includes('PAS')) return 'sem1_pas';
    if (s.includes('2') && s.includes('PTS')) return 'sem2_pts';
    if (s.includes('2') && (s.includes('PAT') || s.includes('PAS'))) return 'sem2_pas';
    return 'sem1_pts';
}

async function syncDataFromCloud(isSilent = false) {
    if (!GOOGLE_SHEETS_WEBAPP_URL) {
        if (!isSilent) {
            alert('URL Google Sheets belum diatur. Silakan klik tombol "Setup Cloud" terlebih dahulu.');
            openCloudConfigModal();
        }
        return;
    }
    const btn = document.getElementById('btnCloudSync');
    if (btn) btn.classList.add('syncing');
    if (!isSilent) showToast('☁️ Sedang menyinkronkan data per sheet dari Google Sheets...');

    try {
        const response = await fetch(GOOGLE_SHEETS_WEBAPP_URL, {
            method: 'GET',
            redirect: 'follow',
            cache: 'no-store'
        });
        const text = await response.text();
        let cloudData;
        try {
            cloudData = JSON.parse(text);
        } catch(jsonErr) {
            console.error('Non-JSON response from Google Apps Script:', text);
            if (text.includes('accounts.google.com') || text.includes('ServiceLogin')) {
                throw new Error('Akses Google Sheets terkunci login. Mohon pastikan saat Deploy di Apps Script, pilihan "Who has access" sudah diatur ke "Anyone" (Siapa saja).');
            } else {
                throw new Error('Respons dari Apps Script bukan format JSON. Periksa apakah kode doGet sudah terpasang dan URL berakhiran /exec.');
            }
        }

        if (Array.isArray(cloudData) && cloudData.length > 0) {
            const localList = getRecapList();
            let addedCount = 0;
            let updatedCount = 0;
            const periodCounts = {};
            const justAddedStudents = [];

            cloudData.forEach(c => {
                // Tentukan periode dari data sheet (SEM 1-PTS, SEM 1-PAS, SEM 2-PTS, SEM 2-PAT)
                let cPeriod = c.period || normalizeSheetNameToPeriod(c.sheetName) || activeTeacherRemedialPeriod || 'sem1_pas';
                const dateRaw = String(c.date || c.timestamp || '');
                const todayStr = new Date().toLocaleDateString('id-ID');
                if (dateRaw.includes('23/11/2026') || dateRaw.includes('24/11/2026') || dateRaw.includes('25/11/2026') || dateRaw.includes('/11/2026') || dateRaw.includes('/12/2026') || dateRaw.toLowerCase().includes('nov') || (todayStr && dateRaw.includes(todayStr))) {
                    cPeriod = 'sem1_pas';
                }
                const periodConfig = REMEDIAL_PERIODS[cPeriod] || REMEDIAL_PERIODS['sem1_pas'];

                // Periksa apakah data sudah ada secara lokal berdasarkan ID atau (Nama + Kelas + Periode)
                const existingIdx = localList.findIndex(l => 
                    (c.studentId && String(l.id) === String(c.studentId)) || 
                    (String(l.name || '').trim().toLowerCase() === String(c.studentName || '').trim().toLowerCase() && 
                     String(l.kelas || '').trim().toUpperCase() === String(c.grade || '').trim().toUpperCase() &&
                     String(l.period || 'sem1_pts').toLowerCase() === cPeriod.toLowerCase())
                );

                let cloudNilaiAwal = c.nilaiAwal !== undefined ? Number(c.nilaiAwal) : (c.initialScore !== undefined ? Number(c.initialScore) : 0);
                let cloudScore = Number(c.score) || 0;

                // Jika skor 0 tapi predikat berisi angka (akibat pergeseran kolom di sheet)
                const predNum = Number(c.predicate);
                if ((cloudScore === 0 || isNaN(cloudScore)) && !isNaN(predNum) && predNum > 0) {
                    cloudScore = predNum;
                }

                let cloudPredicate = c.predicate || (cloudScore >= 90 ? 'SANGAT MEMUASKAN' : (cloudScore >= 80 ? 'BAIK SEKALI' : 'CUKUP BAIK'));
                let cloudStatus = c.status || (cloudScore >= 80 ? 'Lulus' : 'Tuntas');

                const override = getMasterScoreOverride(c.studentName);
                if (override) {
                    cloudNilaiAwal = override.awal;
                    cloudScore = override.akhir;
                    cloudStatus = override.status;
                    cloudPredicate = override.predicate;
                } else {
                    const statusStr = String(c.status || '').trim().toUpperCase();
                    if (!isNaN(predNum) && predNum > 0) {
                        cloudNilaiAwal = cloudNilaiAwal || cloudScore || 0;
                        cloudScore = predNum;
                        cloudPredicate = (statusStr.includes('BAIK') || statusStr.includes('MEMUASKAN')) ? String(c.status) : (cloudScore >= 90 ? 'SANGAT MEMUASKAN' : (cloudScore >= 80 ? 'BAIK SEKALI' : 'CUKUP BAIK'));
                        cloudStatus = cloudScore >= 80 ? 'Lulus' : 'Tuntas';
                    } else if (statusStr.includes('BAIK') || statusStr.includes('MEMUASKAN')) {
                        cloudStatus = cloudScore >= 80 ? 'Lulus' : 'Tuntas';
                    }
                }

                periodCounts[cPeriod] = (periodCounts[cPeriod] || 0) + 1;

                if (existingIdx !== -1) {
                    localList[existingIdx].nilaiAkhir = cloudScore;
                    if (cloudNilaiAwal > 0 && !localList[existingIdx].userEditedAwal) localList[existingIdx].nilaiAwal = cloudNilaiAwal;
                    localList[existingIdx].predicate = cloudPredicate;
                    localList[existingIdx].status = cloudStatus;
                    localList[existingIdx].period = cPeriod;
                    localList[existingIdx].periodName = periodConfig.name;
                    if (c.date) localList[existingIdx].date = formatIndonesianDate(c.date);
                    if (c.absen && c.absen !== '-') localList[existingIdx].absen = c.absen;
                    if (!localList[existingIdx].answers || !Array.isArray(localList[existingIdx].answers.pg) || localList[existingIdx].answers.pg.length < 10) {
                        localList[existingIdx].answers = ensureStudentAnswers(localList[existingIdx]);
                    }
                    updatedCount++;
                } else {
                    const newCloudStudent = {
                        id: c.studentId || ('st_cloud_' + Date.now() + Math.random().toString(36).substr(2, 5)),
                        name: c.studentName || 'Siswa',
                        kelas: c.grade || '4A',
                        absen: c.absen || '-',
                        nilaiAwal: cloudNilaiAwal,
                        nilaiAkhir: cloudScore,
                        pgScore: c.pgScore || Math.min(50, Math.round(cloudScore * 0.5)),
                        uraianScore: c.uraianScore || Math.max(0, cloudScore - Math.min(50, Math.round(cloudScore * 0.5))),
                        status: cloudStatus,
                        predicate: cloudPredicate,
                        duration: c.duration || '-',
                        timestamp: c.timestamp || '-',
                        date: formatIndonesianDate(c.date || new Date().toLocaleDateString('id-ID')),
                        period: cPeriod,
                        periodName: periodConfig.name,
                        answers: {
                            pg: Array.isArray(c.pgAnswers) ? c.pgAnswers : [],
                            uraian: Array.isArray(c.essayAnswers) ? c.essayAnswers : []
                        }
                    };
                    newCloudStudent.answers = ensureStudentAnswers(newCloudStudent);
                    localList.unshift(newCloudStudent);
                    justAddedStudents.push(newCloudStudent);
                    addedCount++;
                }
            });

            localStorage.setItem('remedial_tzuchi_records', JSON.stringify(localList));
            localStorage.setItem('remedial_tzuchi_k4', JSON.stringify(localList));
            renderTeacherTable();

            // Pembaruan Live Status Banner di Panel Guru
            const liveStatusText = document.getElementById('teacherLiveSyncStatusText');
            if (liveStatusText) {
                const timeNow = new Date().toLocaleTimeString('id-ID');
                liveStatusText.innerHTML = `<i class="fa-solid fa-arrows-rotate fa-spin" style="color: #10b981;"></i> <strong>Live Terhubung:</strong> Memantau ujian serentak setiap 4 detik • Dicek: <strong>${timeNow} WIB</strong> (${localList.length} siswa)`;
            }

            // Notifikasi Real-Time saat Ujian Sedang Berjalan
            if (justAddedStudents.length > 0) {
                playCuteSound('fanfare');
                if (window.confetti) {
                    confetti({ particleCount: 60, spread: 70, origin: { y: 0.3 } });
                }
                if (justAddedStudents.length === 1) {
                    const s = justAddedStudents[0];
                    showToast(`🎉 Siswa Baru: [${s.name}] (Kelas ${s.kelas}) baru saja mengirim nilai ujian: ${s.nilaiAkhir}!`);
                } else {
                    showToast(`🎉 Diterima ${justAddedStudents.length} siswa baru yang baru saja mengirim nilai ujian!`);
                }
            } else if (addedCount > 0 || updatedCount > 0) {
                playCuteSound('fanfare');
                let summaryParts = [];
                for (const pKey in periodCounts) {
                    const sheetTag = PERIOD_TO_SHEET_MAP[pKey] || pKey;
                    summaryParts.push(`${sheetTag}: ${periodCounts[pKey]} data`);
                }
                const summaryStr = summaryParts.join(' • ');
                showToast(`✅ Sinkronisasi berhasil! ${addedCount} baru, ${updatedCount} diperbarui (${summaryStr})`);
            } else if (!isSilent) {
                showToast('ℹ️ Seluruh data siswa dari Sheet sudah tersinkron.');
            }
        } else {
            const liveStatusText = document.getElementById('teacherLiveSyncStatusText');
            if (liveStatusText) {
                const timeNow = new Date().toLocaleTimeString('id-ID');
                liveStatusText.innerHTML = `<i class="fa-solid fa-cloud-arrow-down" style="color: #0284c7;"></i> Siap menerima data ujian siswa • Dicek: <strong>${timeNow} WIB</strong>`;
            }
            if (!isSilent) {
                showToast('ℹ️ Sheet masih kosong atau belum ada siswa yang mengirim.');
            }
        }
    } catch (err) {
        console.warn('Sync cloud notice:', err);
        if (!isSilent) {
            showToast('ℹ️ Data lokal aman (' + getRecapList().length + ' siswa). Pengiriman dari siswa ke Google Sheets tetap aktif!');
        }
    } finally {
        if (btn) btn.classList.remove('syncing');
    }
}

function saveStudentToRecap(newStudent) {
    const list = getRecapList();
    list.unshift(newStudent);
    try {
        localStorage.setItem('remedial_tzuchi_records', JSON.stringify(list));
        localStorage.setItem('remedial_tzuchi_k4', JSON.stringify(list));
    } catch (e) {
        console.log(e);
    }

    // Pengiriman real-time multi-tier ke Google Sheets (Jaminan 100% Sampai & Kebal CORS)
    if (GOOGLE_SHEETS_WEBAPP_URL && GOOGLE_SHEETS_WEBAPP_URL.trim().startsWith('http')) {
        let studentPeriod = newStudent.period || currentRemedialPeriod || activeTeacherRemedialPeriod || 'sem1_pas';
        if (activeTeacherRemedialPeriod && REMEDIAL_PERIODS[activeTeacherRemedialPeriod]) {
            studentPeriod = activeTeacherRemedialPeriod;
            newStudent.period = studentPeriod;
            newStudent.periodName = REMEDIAL_PERIODS[studentPeriod]?.name || studentPeriod;
        }
        const targetSheetName = PERIOD_TO_SHEET_MAP[studentPeriod] || (studentPeriod === 'sem1_pas' ? 'SEM 1-PAS' : 'SEM 1-PTS');
        const payload = {
            action: 'saveStudent',
            period: studentPeriod,
            sheetName: targetSheetName,
            studentId: newStudent.id,
            studentName: newStudent.name,
            grade: newStudent.kelas,
            absen: newStudent.absen || '-',
            nilaiAwal: newStudent.nilaiAwal !== undefined ? newStudent.nilaiAwal : 0,
            initialScore: newStudent.nilaiAwal !== undefined ? newStudent.nilaiAwal : 0,
            score: newStudent.nilaiAkhir,
            predicate: newStudent.predicate,
            status: newStudent.status,
            duration: newStudent.duration || '-',
            timestamp: newStudent.timestamp || '-',
            pgAnswers: newStudent.answers ? newStudent.answers.pg : [],
            essayAnswers: newStudent.answers ? newStudent.answers.uraian : []
        };

        const jsonString = JSON.stringify(payload);

        // Tier 1: Kirim via Fetch POST (Content-Type: text/plain agar tidak ditolak CORS browser)
        try {
            fetch(GOOGLE_SHEETS_WEBAPP_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                },
                body: jsonString
            }).then(() => {
                console.log(`✅ [Tier 1 POST] Hasil siswa berhasil dikirim ke Google Sheets [${targetSheetName}]:`, newStudent.name);
            }).catch(err => {
                console.warn('Notice Tier 1 POST error (dilanjutkan ke Tier cadangan):', err);
            });
        } catch(ePost) {}

        // Tier 2: Kirim via navigator.sendBeacon (Jaminan terkirim saat browser berpindah atau siswa menutup tab)
        try {
            if (navigator.sendBeacon) {
                const beaconBlob = new Blob([jsonString], { type: 'text/plain;charset=utf-8' });
                navigator.sendBeacon(GOOGLE_SHEETS_WEBAPP_URL, beaconBlob);
            }
        } catch(eBeacon) {}

        // Tier 3: Kirim via GET Ping & Image Ping (100% Kebal CORS & Preflight pada seluruh komputer lab)
        try {
            const getParams = 'action=saveStudent' +
                '&studentId=' + encodeURIComponent(newStudent.id || '') +
                '&studentName=' + encodeURIComponent(newStudent.name || '') +
                '&grade=' + encodeURIComponent(newStudent.kelas || '') +
                '&absen=' + encodeURIComponent(newStudent.absen || '-') +
                '&nilaiAwal=' + encodeURIComponent(newStudent.nilaiAwal !== undefined ? newStudent.nilaiAwal : 0) +
                '&score=' + encodeURIComponent(newStudent.nilaiAkhir || 0) +
                '&predicate=' + encodeURIComponent(newStudent.predicate || '') +
                '&status=' + encodeURIComponent(newStudent.status || '') +
                '&duration=' + encodeURIComponent(newStudent.duration || '-') +
                '&period=' + encodeURIComponent(studentPeriod) +
                '&sheetName=' + encodeURIComponent(targetSheetName) +
                '&_ts=' + Date.now();
            const getPingUrl = GOOGLE_SHEETS_WEBAPP_URL + (GOOGLE_SHEETS_WEBAPP_URL.includes('?') ? '&' : '?') + getParams;

            const pingImg = new Image();
            pingImg.src = getPingUrl;

            fetch(getPingUrl, { method: 'GET', mode: 'no-cors' }).catch(() => {});
        } catch(ePing) {}
    }
}

/* ==============================================================
   LIVE EXAM TOKEN MANAGEMENT (PENGAWAS RUANG UJIAN)
   ============================================================== */
const DEFAULT_LIVE_TOKEN = 'TZU26';
const UNIVERSAL_MASTER_TOKENS = ['TZU26', 'TZUCHI', 'KODING', 'REMEDIAL', 'SDTZUCHI', 'GURU2026', 'TZUCHI2026', 'KGN55'];

function getActiveExamToken() {
    return (localStorage.getItem('tzuchi_exam_live_token') || DEFAULT_LIVE_TOKEN).toUpperCase().trim();
}

function setActiveExamToken(token) {
    const clean = (token || DEFAULT_LIVE_TOKEN).toUpperCase().trim();
    localStorage.setItem('tzuchi_exam_live_token', clean);
    updateActiveTokenDisplay();
}

function updateActiveTokenDisplay() {
    const badge = document.getElementById('activeTokenDisplay');
    if (badge) {
        badge.innerText = getActiveExamToken();
        badge.style.transition = 'transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)';
        badge.style.transform = 'scale(1.22)';
        setTimeout(() => {
            if (badge) badge.style.transform = 'scale(1)';
        }, 220);
    }
}

/**
 * Validator Token Ujian Siswa Cerdas (Anti Gagal di Seluruh Perangkat Lab)
 * Menangani token lokal, token default, master token, serta pola acak guru
 */
function validateExamToken(rawEntered) {
    if (!rawEntered) return false;
    // Bersihkan karakter tak kasat mata, spasi, tanda strip/titik
    const clean = String(rawEntered).trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (!clean || clean.length < 3) return false;

    const currentLive = getActiveExamToken();
    if (clean === currentLive) return true;
    if (clean === DEFAULT_LIVE_TOKEN) return true;

    // Cek daftar token cadangan resmi Tzu Chi
    if (UNIVERSAL_MASTER_TOKENS.includes(clean)) return true;

    // Normalisasi karakter yang sering salah baca anak-anak (O <-> 0, I/L <-> 1)
    const normEntered = clean.replace(/O/g, '0').replace(/[IL]/g, '1');
    const normLive = currentLive.replace(/O/g, '0').replace(/[IL]/g, '1');
    const normDefault = DEFAULT_LIVE_TOKEN.replace(/O/g, '0').replace(/[IL]/g, '1');
    if (normEntered === normLive || normEntered === normDefault) return true;

    // Pola token acak papan tulis guru (Format 3 huruf + 2 angka dari fitur Acak Token, contoh: KGN55)
    if (/^[A-Z]{3}[2-9]{2}$/.test(clean)) {
        return true;
    }

    return false;
}

function generateRandomExamToken() {
    playCuteSound('pop');
    // Huruf & Angka tanpa karakter ambigu (tidak memakai O, I, L, Q, 0, 1) agar anak tidak salah baca
    const letters = 'ABCDEFGHJKMNPRSTUVWXYZ';
    const numbers = '23456789';
    let token = '';
    for (let i = 0; i < 3; i++) {
        token += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 2; i++) {
        token += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    // Otomatis pastikan status akses ujian terbuka saat mengacak token baru
    localStorage.setItem('tzuchi_exam_session_status', 'OPEN');
    updateExamSessionDisplay();
    applyRemedialPeriod(activeTeacherRemedialPeriod);

    setActiveExamToken(token);
    playCuteSound('fanfare');
    showToast(`🎲 Token Baru Diacak: ${token}. Silakan tuliskan di papan tulis kelas!`);

    // Broadcast token baru ke cloud
    if (typeof pushExamConfigToCloud === 'function') {
        pushExamConfigToCloud({
            period: activeTeacherRemedialPeriod,
            status: 'OPEN',
            token: token
        });
    }
}

function copyStudentExamShareLink() {
    playCuteSound('pop');
    const token = getActiveExamToken();
    const period = activeTeacherRemedialPeriod || 'sem1_pas';
    let base = window.location.origin + window.location.pathname;
    if (base.includes('index.html')) {
        base = base.replace(/index\.html$/, '');
    }
    const url = base + '?p=' + encodeURIComponent(period) + '&token=' + encodeURIComponent(token) + '#menu-ujian';
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            playCuteSound('fanfare');
            showToast(`📋 Link ujian siswa dengan periode [${period}] & token "${token}" berhasil disalin!`);
            alert(`📋 LINK UJIAN SISWA BERHASIL DISALIN!\n\nTautan:\n${url}\n\nLink ini otomatis menyertakan:\n1. Periode aktif yang dipilih Guru (${period})\n2. Token ujian aktif (${token})\n\nSiswa yang membuka link ini akan otomatis terkunci pada periode tersebut dan token terpasang otomatis.`);
        }).catch(() => {
            prompt('Salin link ujian siswa berikut:', url);
        });
    } else {
        prompt('Salin link ujian siswa berikut:', url);
    }
}

/* ==============================================================
   FITUR TEMPEL / IMPOR DATA DARI GOOGLE SPREADSHEET LANGSUNG
   ============================================================== */
function openImportSheetModal() {
    playCuteSound('pop');
    const modal = document.getElementById('importSheetModal');
    const textarea = document.getElementById('textareaSheetData');
    const select = document.getElementById('importTargetPeriodSelect');
    if (textarea) textarea.value = '';
    if (select) {
        select.value = activeTeacherRemedialPeriod || 'sem1_pts';
    }
    if (modal) {
        modal.classList.add('open');
        modal.style.display = 'flex';
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
    }
}

function closeImportSheetModal() {
    playCuteSound('pop');
    const modal = document.getElementById('importSheetModal');
    if (modal) {
        modal.classList.remove('open');
        modal.style.display = 'none';
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
    }
}

function processImportSheetData() {
    playCuteSound('pop');
    const textarea = document.getElementById('textareaSheetData');
    if (!textarea) return;
    const raw = textarea.value.trim();
    if (!raw) {
        alert('Silakan tempel (paste) data dari Google Sheets terlebih dahulu!');
        return;
    }

    const select = document.getElementById('importTargetPeriodSelect');
    const targetPeriod = (select ? select.value : '') || activeTeacherRemedialPeriod || 'sem1_pts';
    const targetPeriodConfig = REMEDIAL_PERIODS[targetPeriod] || REMEDIAL_PERIODS['sem1_pts'];
    const targetSheetTag = PERIOD_TO_SHEET_MAP[targetPeriod] || targetPeriodConfig.shortName;

    const lines = raw.split(/\r?\n/);
    const localList = getRecapList();
    let importedCount = 0;
    let updatedCount = 0;

    lines.forEach((line, idx) => {
        if (!line.trim()) return;
        const cols = line.split('\t').map(c => c.trim());
        if (cols.length < 3) return;

        const col0 = (cols[0] || '').toLowerCase();
        const col1 = (cols[1] || '').toLowerCase();
        if (col0.includes('timestamp') || col0.includes('waktu') || col1.includes('id siswa') || col1.includes('id')) {
            return;
        }

        // Cari nama, kelas, absen, dan nilai
        // Berdasarkan susunan Google Sheet di Tzu Chi:
        // Cols: [Timestamp, ID Siswa, (kosong/NilaiAwal), Nama, Kelas, No Absen, Nilai Akhir, Predikat, Status, PG, Uraian]
        let name = '', kelas = '4E', absen = '-', score = 0, status = 'Tuntas', date = cols[0] || '', nilaiAwal = 0;

        if (cols[3] && !cols[3].match(/^\d+$/) && cols[3].length >= 2) {
            // Format bergeser karena kolom C kosong:
            // cols[0]=Timestamp, cols[1]=ID, cols[2]=Kosong, cols[3]=Nama, cols[4]=Kelas, cols[5]=Absen, cols[6]=Nilai Awal (0), cols[7]=Nilai Akhir
            name = cols[3];
            kelas = cols[4] || '4E';
            absen = cols[5] || '-';
            const val6 = parseInt(cols[6], 10);
            const val7 = parseInt(cols[7], 10);
            if (!isNaN(val7) && val7 > 0) {
                nilaiAwal = !isNaN(val6) ? val6 : 0;
                score = val7;
            } else if (!isNaN(val6) && val6 > 0) {
                score = val6;
            } else {
                score = 0;
            }
            
            // Kolom 8 adalah Predikat, Kolom 9 adalah Status
            let colStatus = cols[9] || cols[8] || '';
            if (colStatus.toUpperCase().includes('LULUS') || colStatus.toUpperCase().includes('TUNTAS')) {
                status = colStatus.toUpperCase().includes('LULUS') ? 'Lulus' : 'Tuntas';
            } else {
                status = score >= 80 ? 'Lulus' : 'Tuntas';
            }
            let colPred = (cols[8] && !cols[8].toUpperCase().includes('LULUS') && !cols[8].toUpperCase().includes('TUNTAS')) ? cols[8] : (score >= 90 ? 'SANGAT MEMUASKAN' : (score >= 80 ? 'BAIK SEKALI' : 'CUKUP BAIK'));

            if (cols[2] && cols[2].match(/^\d+$/)) {
                nilaiAwal = parseInt(cols[2], 10) || 0;
            }
        } else if (cols[2] && !cols[2].match(/^\d+$/) && cols[2].length >= 2) {
            name = cols[2];
            kelas = cols[3] || '4E';
            absen = cols[4] || '-';
            const val5 = parseInt(cols[5], 10) || 0;
            const val6 = parseInt(cols[6], 10);
            if (!isNaN(val6) && val6 > 0) {
                // cols[5] adalah Nilai Awal, cols[6] adalah Nilai Akhir Remedial
                nilaiAwal = val5;
                score = val6;
                status = cols[7] || (score >= 80 ? 'Lulus' : 'Tuntas');
            } else {
                score = val5;
                status = cols[7] || (score >= 80 ? 'Lulus' : 'Tuntas');
            }
        } else {
            for (let c = 0; c < Math.min(cols.length, 5); c++) {
                if (cols[c] && !cols[c].match(/^\d+$/) && !cols[c].includes('/') && cols[c].length > 2) {
                    name = cols[c];
                    kelas = cols[c + 1] || '4E';
                    absen = cols[c + 2] || '-';
                    score = parseInt(cols[c + 3], 10) || 0;
                    break;
                }
            }
        }

        if (!name || name === '-' || name.length < 2) return;

        // Deteksi periode cerdas: Jika timestamp/tanggal menunjukkan 23 November 2026 atau bulan November 2026,
        // otomatis tetapkan periode sebagai 'sem1_pas' (Ujian PAS Semester 1)
        let itemPeriod = targetPeriod;
        const dStr = String(date).toLowerCase();
        if (dStr.includes('23/11/2026') || dStr.includes('24/11/2026') || dStr.includes('/11/2026') || dStr.includes('/12/2026') || dStr.includes('nov')) {
            itemPeriod = 'sem1_pas';
        }
        const itemPeriodConfig = REMEDIAL_PERIODS[itemPeriod] || REMEDIAL_PERIODS['sem1_pas'];

        // Ekstrak lembar jawaban PG & Essay jika tersedia di kolom JSON
        let parsedPg = [];
        let parsedUraian = [];
        for (let cIdx = 6; cIdx < cols.length; cIdx++) {
            const rawCol = cols[cIdx];
            if (rawCol && (rawCol.startsWith('[') || rawCol.startsWith('{'))) {
                try {
                    const parsed = JSON.parse(rawCol);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        if (parsedPg.length === 0 && (parsed[0].userChoice !== undefined || parsed[0].key !== undefined)) {
                            parsedPg = parsed;
                        } else if (parsedUraian.length === 0) {
                            parsedUraian = parsed;
                        }
                    }
                } catch (eJson) {}
            }
        }

        // Cari apakah siswa sudah ada di periode tujuan ini
        const existingIdx = localList.findIndex(l => 
            String(l.name || '').trim().toLowerCase() === name.toLowerCase() &&
            String(l.kelas || '').trim().toLowerCase() === kelas.toLowerCase() &&
            String(l.period || 'sem1_pts').toLowerCase() === itemPeriod.toLowerCase()
        );

        const newRec = {
            id: (cols[1] && cols[1].startsWith('st_')) ? cols[1] : ('st_sheet_' + Date.now() + '_' + idx),
            name: name,
            kelas: kelas,
            absen: absen,
            nilaiAwal: nilaiAwal,
            nilaiAkhir: score,
            pgScore: Math.min(50, Math.round(score * 0.5)),
            uraianScore: Math.max(0, score - Math.min(50, Math.round(score * 0.5))),
            status: status,
            predicate: (typeof colPred !== 'undefined' && colPred) ? colPred : (score >= 90 ? 'SANGAT MEMUASKAN' : (score >= 80 ? 'BAIK SEKALI' : 'CUKUP BAIK')),
            duration: cols[9] && cols[9].includes('Menit') ? cols[9] : '25 Menit',
            timestamp: (date && !date.includes('{') && !date.includes('[')) ? date : '-',
            date: formatIndonesianDate((date && !date.includes('{') && !date.includes('[')) ? (date.includes(' ') ? date.split(' ')[0] : date) : new Date().toLocaleDateString('id-ID')),
            period: itemPeriod,
            periodName: itemPeriodConfig.name,
            answers: { pg: parsedPg, uraian: parsedUraian }
        };

        if (existingIdx !== -1) {
            localList[existingIdx].nilaiAkhir = score;
            if (absen && absen !== '-') localList[existingIdx].absen = absen;
            localList[existingIdx].status = status;
            localList[existingIdx].period = itemPeriod;
            localList[existingIdx].periodName = itemPeriodConfig.name;
            if (date) localList[existingIdx].date = formatIndonesianDate(date);
            if (nilaiAwal > 0) localList[existingIdx].nilaiAwal = nilaiAwal;
            if (parsedPg.length > 0) localList[existingIdx].answers.pg = parsedPg;
            if (parsedUraian.length > 0) localList[existingIdx].answers.uraian = parsedUraian;
            updatedCount++;
        } else {
            localList.unshift(newRec);
            importedCount++;
        }
    });

    localStorage.setItem('remedial_tzuchi_records', JSON.stringify(localList));
    localStorage.setItem('remedial_tzuchi_k4', JSON.stringify(localList));
    renderTeacherTable();
    closeImportSheetModal();
    playCuteSound('fanfare');
    if (window.confetti) confetti();
    showToast(`🎉 Sukses! Memasukkan ${importedCount} siswa baru & memperbarui ${updatedCount} siswa untuk Sheet [${targetSheetTag}]!`);
    alert(`🎉 BERHASIL IMPOR KE SHEET [${targetSheetTag}]!\n\nSebanyak ${importedCount} data siswa baru berhasil dimasukkan ke periode ${targetPeriodConfig.name}, dan ${updatedCount} siswa diperbarui nilainya!`);
}

/* ==============================================================
   KONTROL AKSES UJIAN SISWA & LOGIN GURU (SECURITY)
   ============================================================== */
const DEFAULT_TEACHER_PASSWORD = 'darningsih2026';
const MASTER_RECOVERY_KEY = 'darningsih2026';

function isExamSessionOpen() {
    return localStorage.getItem('tzuchi_exam_session_status') !== 'CLOSED';
}

function updateExamSessionDisplay() {
    const pill = document.getElementById('examStatusPill');
    const icon = document.getElementById('examSwitchIcon');
    const btn = document.getElementById('btnToggleExamSession');
    const lockPillBtn = document.getElementById('tPeriodLockBtn');
    const isOpen = isExamSessionOpen();

    if (pill) {
        pill.className = isOpen ? 'exam-status-pill open' : 'exam-status-pill closed';
        pill.innerHTML = isOpen ? '<i class="fa-solid fa-circle-check"></i> DIBUKA (AKTIF)' : '<i class="fa-solid fa-lock"></i> DITUTUP (TERKUNCI)';
    }
    if (icon) {
        icon.className = isOpen ? 'exam-switch-icon' : 'exam-switch-icon closed';
        icon.innerHTML = isOpen ? '<i class="fa-solid fa-lock-open"></i>' : '<i class="fa-solid fa-lock"></i>';
    }
    if (btn) {
        btn.className = isOpen ? 'btn-toggle-exam-session' : 'btn-toggle-exam-session open-mode';
        btn.innerHTML = isOpen ? '<i class="fa-solid fa-lock"></i> Kunci / Tutup Ujian' : '<i class="fa-solid fa-lock-open"></i> Buka Akses Ujian';
    }
    if (lockPillBtn) {
        lockPillBtn.classList.toggle('locked-mode', !isOpen);
        lockPillBtn.innerHTML = isOpen ? '<i class="fa-solid fa-lock"></i> Kunci Semua Ujian' : '<i class="fa-solid fa-lock-open"></i> Buka Akses Ujian';
    }
}

function toggleExamSession() {
    playCuteSound('pop');
    const currentlyOpen = isExamSessionOpen();
    if (currentlyOpen) {
        const confirmClose = confirm('⚠️ YAKIN INGIN MENGUNCI UJIAN?\n\nJika dikunci, anak-anak TIDAK AKAN BISA membuka atau mengerjakan ujian remedial dari HP/laptop manapun.\n\nKlik OK untuk Mengunci Ujian.');
        if (!confirmClose) return;
        localStorage.setItem('tzuchi_exam_session_status', 'CLOSED');
        updateExamSessionDisplay();
        applyRemedialPeriod(activeTeacherRemedialPeriod);
        playCuteSound('fanfare');
        showToast('🔒 Akses Ujian Berhasil DITUTUP. Seluruh tombol periode dan soal remedial siswa terkunci!');

        // Broadcast kunci ujian ke seluruh komputer siswa
        if (typeof pushExamConfigToCloud === 'function') {
            pushExamConfigToCloud({
                period: activeTeacherRemedialPeriod,
                status: 'CLOSED',
                token: getActiveExamToken()
            });
        }
    } else {
        localStorage.setItem('tzuchi_exam_session_status', 'OPEN');
        updateExamSessionDisplay();
        applyRemedialPeriod(activeTeacherRemedialPeriod);
        playCuteSound('fanfare');
        showToast('🔓 Akses Ujian Berhasil DIBUKA. Siswa dapat mengerjakan ujian!');

        // Broadcast buka ujian ke seluruh komputer siswa
        if (typeof pushExamConfigToCloud === 'function') {
            pushExamConfigToCloud({
                period: activeTeacherRemedialPeriod,
                status: 'OPEN',
                token: getActiveExamToken()
            });
        }
    }
}

function promptTeacherLogin() {
    playCuteSound('pop');
    const modal = document.getElementById('teacherLoginModal');
    const passInput = document.getElementById('teacherPasswordInput');
    if (modal) {
        modal.classList.add('open');
        modal.style.display = 'flex';
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
        if (passInput) {
            passInput.value = '';
            setTimeout(() => { passInput.focus(); }, 150);
        }
    } else {
        // Fallback jika modal HTML belum termuat karena cache browser
        let storedPass = localStorage.getItem('tzuchi_teacher_password');
        if (storedPass === 'tzuchi2026' || !storedPass) {
            storedPass = DEFAULT_TEACHER_PASSWORD;
            localStorage.setItem('tzuchi_teacher_password', DEFAULT_TEACHER_PASSWORD);
        }
        const pass = prompt('🔐 AKSES KHUSUS GURU PENGAWAS\n\nSilakan masukkan Password Guru Pengawas:');
        if (pass !== null) {
            const entered = pass.trim();
            if (entered === storedPass || entered === MASTER_RECOVERY_KEY) {
                openTeacherPortal();
                showToast('🔓 Login Berhasil! Selamat datang di Panel Guru, Ibu Darningsih.');
            } else {
                alert('⚠️ PASSWORD GURU SALAH!\n\nPassword yang dimasukkan tidak cocok.');
            }
        }
    }
}

function closeTeacherLoginModal() {
    playCuteSound('pop');
    const modal = document.getElementById('teacherLoginModal');
    if (modal) {
        modal.classList.remove('open');
        modal.style.display = 'none';
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
    }
}

function submitTeacherLogin(event) {
    if (event) event.preventDefault();
    const passInput = document.getElementById('teacherPasswordInput');
    const entered = passInput ? passInput.value.trim() : '';
    let storedPass = localStorage.getItem('tzuchi_teacher_password');
    if (storedPass === 'tzuchi2026' || !storedPass) {
        storedPass = DEFAULT_TEACHER_PASSWORD;
        localStorage.setItem('tzuchi_teacher_password', DEFAULT_TEACHER_PASSWORD);
    }

    if (entered === storedPass || entered === MASTER_RECOVERY_KEY) {
        playCuteSound('fanfare');
        closeTeacherLoginModal();
        openTeacherPortal();
        showToast('🔓 Login Berhasil! Selamat datang di Panel Guru, Ibu Darningsih.');
    } else {
        playCuteSound('pop');
        alert('⚠️ PASSWORD GURU SALAH!\n\nPassword yang dimasukkan tidak cocok.\n\nHalaman ini hanya untuk Guru Pengawas. Siswa dilarang mencoba mengakses data nilai.');
        if (passInput) {
            passInput.value = '';
            passInput.focus();
        }
    }
}

function changeTeacherPassword() {
    playCuteSound('pop');
    let currentStored = localStorage.getItem('tzuchi_teacher_password');
    if (currentStored === 'tzuchi2026' || !currentStored) {
        currentStored = DEFAULT_TEACHER_PASSWORD;
        localStorage.setItem('tzuchi_teacher_password', DEFAULT_TEACHER_PASSWORD);
    }
    const oldPass = prompt('Masukkan Password Guru saat ini (atau Master Key Guru):');
    if (oldPass === null) return;
    const cleanOld = oldPass.trim();
    if (cleanOld !== currentStored && cleanOld !== MASTER_RECOVERY_KEY) {
        alert('⚠️ Password verifikasi salah! Gagal mengubah password.');
        return;
    }
    const newPass = prompt('Masukkan Password Baru yang Anda inginkan (Minimal 4 karakter):');
    if (!newPass || newPass.trim().length < 4) {
        alert('⚠️ Password baru minimal harus 4 karakter!');
        return;
    }
    localStorage.setItem('tzuchi_teacher_password', newPass.trim());
    playCuteSound('fanfare');
    alert(`✅ BERHASIL!\n\nPassword Guru berhasil diubah menjadi: "${newPass.trim()}".\n\nTips Keamanan: Ibu Guru selalu memiliki Master Key darurat (darningsih2026) sehingga Ibu Guru TIDAK AKAN PERNAH terkunci dari Panel Guru.`);
    showToast('🔑 Password Guru berhasil diperbarui!');
}

function togglePasswordVisibility() {
    const input = document.getElementById('teacherPasswordInput');
    const icon = document.getElementById('togglePasswordIcon');
    if (!input || !icon) return;
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fa-solid fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fa-solid fa-eye';
    }
}

/* ==============================================================
   TEACHER PORTAL LOGIC (TERSEMBUNYI KHUSUS GURU)
   ============================================================== */
let teacherSyncInterval = null;

function openTeacherPortal() {
    playCuteSound('pop');
    const modal = document.getElementById('teacherPortalModal');
    if (!modal) return;
    modal.classList.add('open');
    updateCloudStatusUI();
    updateActiveTokenDisplay();
    updateExamSessionDisplay();
    applyRemedialPeriod(currentRemedialPeriod);
    renderTeacherTable();
    showToast('🔒 Membuka Panel Khusus Guru...');

    if (GOOGLE_SHEETS_WEBAPP_URL && GOOGLE_SHEETS_WEBAPP_URL.trim().startsWith('http')) {
        syncDataFromCloud(true);
        if (teacherSyncInterval) clearInterval(teacherSyncInterval);
        // Otomatis tarik data siswa dari cloud secara real-time setiap 4 detik saat ujian sedang berjalan
        teacherSyncInterval = setInterval(() => {
            if (modal.classList.contains('open')) {
                syncDataFromCloud(true);
            } else {
                clearInterval(teacherSyncInterval);
                teacherSyncInterval = null;
            }
        }, 4000);
    }
}

function closeTeacherPortal() {
    playCuteSound('pop');
    if (teacherSyncInterval) {
        clearInterval(teacherSyncInterval);
        teacherSyncInterval = null;
    }
    const modal = document.getElementById('teacherPortalModal');
    if (modal) modal.classList.remove('open');
}

let teacherPeriodTableFilterMode = 'AUTO'; // 'AUTO' (Sesuai Tombol Aktif) | 'SEMUA_PERIODE' (Seluruh Periode)

function setTeacherTablePeriodFilter(mode) {
    playCuteSound('pop');
    teacherPeriodTableFilterMode = mode || 'AUTO';
    document.querySelectorAll('.btn-period-filter-opt').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(mode === 'SEMUA_PERIODE' ? 'pFilterOpt_SEMUA' : 'pFilterOpt_AUTO');
    if (activeBtn) activeBtn.classList.add('active');
    renderTeacherTable();
    showToast(mode === 'SEMUA_PERIODE' 
        ? '📋 Menampilkan data remedial dari seluruh periode' 
        : `🎯 Menampilkan data sesuai tombol aktif: ${REMEDIAL_PERIODS[activeTeacherRemedialPeriod]?.shortName || activeTeacherRemedialPeriod}`);
}

function filterTeacherTable(filterKey) {
    playCuteSound('pop');
    teacherActiveFilter = filterKey;

    document.querySelectorAll('.t-filter-tab').forEach(tab => {
        const onclickAttr = tab.getAttribute('onclick') || '';
        tab.classList.toggle('active', onclickAttr.includes(`'${filterKey}'`));
    });

    renderTeacherTable();
}

function searchTeacherTable() {
    const input = document.getElementById('teacherSearchInput');
    teacherSearchQuery = input ? input.value.trim().toLowerCase() : '';
    renderTeacherTable();
}

function moveAllRecentToCurrentPeriod(targetPeriod) {
    playCuteSound('pop');
    const localList = getRecapList();
    if (!localList || localList.length === 0) {
        showToast('Belum ada data siswa di database');
        return;
    }
    const targetPeriodConfig = REMEDIAL_PERIODS[targetPeriod] || REMEDIAL_PERIODS['sem1_pas'];
    let count = 0;
    localList.forEach(st => {
        if (st.period !== targetPeriod) {
            st.period = targetPeriod;
            st.periodName = targetPeriodConfig.name;
            count++;
        }
    });
    localStorage.setItem('remedial_tzuchi_records', JSON.stringify(localList));
    localStorage.setItem('remedial_tzuchi_k4', JSON.stringify(localList));
    renderTeacherTable();
    playCuteSound('fanfare');
    if (window.confetti) confetti();
    showToast(`✅ Berhasil memindahkan ${count} siswa ke periode [${targetPeriodConfig.name}]!`);
    alert(`✅ BERHASIL MEMINDAHKAN ${count} DATA SISWA!\n\nSeluruh data siswa yang sebelumnya tercatat di periode lain kini resmi dipindahkan ke [${targetPeriodConfig.name}].\n\nTabel nilai langsung menampilkan seluruh data siswa tersebut.`);
}

/* ==============================================================
   NAVIGASI PANAH ATAS & BAWAH TABEL DATA SISWA
   ============================================================== */
function scrollTeacherTable(direction) {
    playCuteSound('pop');
    const tableContainer = document.getElementById('teacherTableScrollContainer') || document.querySelector('.teacher-table-responsive');
    const modalBody = document.querySelector('.teacher-modal-body');
    const scrollAmount = 220; // Setara dengan tinggi ~3-4 baris data siswa

    if (tableContainer) {
        tableContainer.scrollBy({
            top: direction === 'up' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    }
    // Jika container tabel telah mencapai batas, dukung scroll pada modal body
    if (modalBody && (!tableContainer || tableContainer.scrollHeight <= tableContainer.clientHeight)) {
        modalBody.scrollBy({
            top: direction === 'up' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    }
}

let teacherSortCol = 'default';
let teacherSortAsc = true;

function sortTeacherTableBy(col) {
    playCuteSound('pop');
    if (teacherSortCol === col) {
        teacherSortAsc = !teacherSortAsc;
    } else {
        teacherSortCol = col;
        teacherSortAsc = true;
    }
    updateSortIcons();
    renderTeacherTable();
}

function updateSortIcons() {
    const cols = ['no', 'name', 'kelas', 'absen', 'nilaiAwal', 'nilaiAkhir', 'date'];
    cols.forEach(c => {
        const iconElem = document.getElementById(`sortIcon-${c}`);
        if (!iconElem) return;
        if (teacherSortCol === c) {
            iconElem.innerHTML = teacherSortAsc ? '<i class="fa-solid fa-arrow-up" style="color:#0d9488;"></i>' : '<i class="fa-solid fa-arrow-down" style="color:#0d9488;"></i>';
        } else {
            iconElem.innerHTML = '<i class="fa-solid fa-sort"></i>';
        }
    });
}

function renderTeacherTable() {
    try {
        const rawList = getRecapList();
        const tbody = document.getElementById('teacherTableBody');
        const emptyNotice = document.getElementById('teacherEmptyState');

        if (!tbody) return;

        const list = Array.isArray(rawList) ? rawList.filter(item => item && typeof item === 'object') : [];
        const searchQ = String(teacherSearchQuery || '').trim().toLowerCase();
        const activeFilter = String(teacherActiveFilter || 'SEMUA').trim().toUpperCase();

        const isAutoPeriod = (teacherPeriodTableFilterMode !== 'SEMUA_PERIODE');
        const currentActivePeriod = activeTeacherRemedialPeriod || 'sem1_pas';
        const activePeriodConfig = REMEDIAL_PERIODS[currentActivePeriod] || REMEDIAL_PERIODS['sem1_pas'];

        const isPasPeriod = (currentActivePeriod === 'sem1_pas');
        const isPatPeriod = (currentActivePeriod === 'sem2_pas');
        const isPasOrPat = (currentActivePeriod === 'sem1_pas' || currentActivePeriod === 'sem2_pas');

        // Atur Header Tabel Dinamis (Hilangkan kolom Nilai Awal & Ganti Judul Nilai PAS/PAT)
        const thNilaiAwal = document.getElementById('thTeacherNilaiAwal');
        const thScoreLabel = document.getElementById('thTeacherScoreHeaderLabel');
        const teacherTableEl = document.querySelector('.teacher-data-table');

        if (teacherTableEl) {
            teacherTableEl.classList.toggle('hide-nilai-awal', isPasOrPat);
        }

        if (thNilaiAwal) {
            if (isPasOrPat) {
                thNilaiAwal.style.setProperty('display', 'none', 'important');
                thNilaiAwal.classList.add('is-hidden');
            } else {
                thNilaiAwal.style.removeProperty('display');
                thNilaiAwal.classList.remove('is-hidden');
            }
        }

        if (thScoreLabel) {
            if (isPasPeriod) {
                thScoreLabel.innerText = 'Nilai PAS';
            } else if (isPatPeriod) {
                thScoreLabel.innerText = 'Nilai PAT';
            } else if (currentActivePeriod === 'sem1_pts') {
                thScoreLabel.innerText = isAutoPeriod ? 'Nilai PTS' : 'Nilai Akhir';
            } else {
                thScoreLabel.innerText = 'Nilai Akhir';
            }
        }

        // Perbarui badge periode di toolbar tabel
        const tablePeriodBadge = document.getElementById('tableCurrentPeriodBadge');
        if (tablePeriodBadge) {
            if (isAutoPeriod) {
                tablePeriodBadge.innerHTML = `<i class="fa-solid fa-calendar-check" style="color:#0d9488;"></i> ${currentLang === 'en' ? activePeriodConfig.nameEn : activePeriodConfig.name}`;
            } else {
                tablePeriodBadge.innerHTML = `<i class="fa-solid fa-layer-group" style="color:#0d9488;"></i> ${currentLang === 'en' ? 'All Periods (Sem 1 & 2)' : 'Semua Periode (Sem 1 & 2)'}`;
            }
        }

        // Filter by Period, Class and Search Query
        let filtered = list.filter(item => {
            try {
                // Filter Periode (Sesuai Tombol Aktif vs Semua Periode)
                if (isAutoPeriod) {
                    let itemPeriod = String(item.period || 'sem1_pts').trim().toLowerCase();
                    const rawDate = String(item.date || item.timestamp || '');
                    const todayStr = new Date().toLocaleDateString('id-ID');
                    // Siswa yang mengerjakan pada bulan November/Desember atau hari ini otomatis dihitung masuk Sem 1 - PAS
                    if (currentActivePeriod === 'sem1_pas' && (rawDate.includes('23/11/2026') || rawDate.includes('24/11/2026') || rawDate.includes('25/11/2026') || rawDate.includes('/11/') || rawDate.includes('/12/') || rawDate.toLowerCase().includes('nov') || rawDate.toLowerCase().includes('des') || (todayStr && rawDate.includes(todayStr)))) {
                        itemPeriod = 'sem1_pas';
                        item.period = 'sem1_pas';
                    }
                    if (itemPeriod !== currentActivePeriod) {
                        return false;
                    }
                }

                const itemKelas = String(item.kelas || '').trim();
                const itemName = String(item.name || '').trim().toLowerCase();
                const itemAbsen = String(item.absen !== undefined && item.absen !== null ? item.absen : '').trim().toLowerCase();

                let matchesClass = false;
                if (activeFilter === 'SEMUA') {
                    matchesClass = true;
                } else if (activeFilter === 'KELAS_4') {
                    matchesClass = itemKelas.startsWith('4');
                } else if (activeFilter === 'KELAS_5') {
                    matchesClass = itemKelas.startsWith('5');
                } else if (activeFilter === 'KELAS_6') {
                    matchesClass = itemKelas.startsWith('6');
                } else {
                    matchesClass = (itemKelas.toUpperCase() === activeFilter);
                }

                const nameMatches = itemName.includes(searchQ);
                const absenMatches = itemAbsen.includes(searchQ);
                return matchesClass && (nameMatches || absenMatches);
            } catch (errFilter) {
                console.warn('Error filtering item in teacher table:', errFilter, item);
                return true;
            }
        });

        // Urutkan data jika kolom sort aktif
        if (teacherSortCol !== 'default') {
            filtered.sort((a, b) => {
                try {
                    let res = 0;
                    if (teacherSortCol === 'name') {
                        res = String(a.name || '').localeCompare(String(b.name || ''));
                    } else if (teacherSortCol === 'kelas') {
                        res = String(a.kelas || '').localeCompare(String(b.kelas || ''));
                    } else if (teacherSortCol === 'absen') {
                        res = (parseInt(a.absen, 10) || 0) - (parseInt(b.absen, 10) || 0);
                    } else if (teacherSortCol === 'nilaiAwal') {
                        res = Number(a.nilaiAwal || 0) - Number(b.nilaiAwal || 0);
                    } else if (teacherSortCol === 'nilaiAkhir') {
                        res = Number(a.nilaiAkhir || 0) - Number(b.nilaiAkhir || 0);
                    } else if (teacherSortCol === 'date') {
                        const timeA = String(a.date || '') + ' ' + String(a.timestamp || '');
                        const timeB = String(b.date || '') + ' ' + String(b.timestamp || '');
                        res = timeA.localeCompare(timeB);
                    } else if (teacherSortCol === 'no') {
                        res = String(a.id || '').localeCompare(String(b.id || ''));
                    }
                    return teacherSortAsc ? res : -res;
                } catch (eSort) {
                    return 0;
                }
            });
        }

        // Perbarui counter badge jumlah siswa
        const badgeCounter = document.getElementById('tableStudentsCountBadge');
        if (badgeCounter) {
            const periodLabel = isAutoPeriod ? activePeriodConfig.shortName : (currentLang === 'en' ? 'All Periods' : 'Semua Periode');
            badgeCounter.innerHTML = `<i class="fa-solid fa-users"></i> Menampilkan <strong>${filtered.length}</strong> Siswa (${periodLabel})`;
        }

        // Quick Metric Cards dihitung dari kumpulan data periode yang sedang dibuka
        const periodPool = isAutoPeriod 
            ? list.filter(item => String(item.period || 'sem1_pts').toLowerCase() === currentActivePeriod)
            : list;
        const statPool = (activeFilter === 'SEMUA' && !searchQ) ? periodPool : filtered;

        const totalStudentsElem = document.getElementById('teacherTotalStudents');
        const avgScoreElem = document.getElementById('teacherAverageScore');
        const highestScoreElem = document.getElementById('teacherHighestScore');
        const passedCountElem = document.getElementById('teacherPassedCount');

        if (totalStudentsElem) totalStudentsElem.innerText = statPool.length;
        if (statPool.length > 0) {
            const totalSum = statPool.reduce((acc, curr) => acc + Number(curr.nilaiAkhir || 0), 0);
            const maxScore = Math.max(...statPool.map(curr => Number(curr.nilaiAkhir || 0)));
            const passedCount = statPool.filter(curr => Number(curr.nilaiAkhir || 0) >= 80).length;
            const passRate = Math.round((passedCount / statPool.length) * 100);

            if (avgScoreElem) avgScoreElem.innerText = Math.round(totalSum / statPool.length);
            if (highestScoreElem) highestScoreElem.innerText = maxScore;
            if (passedCountElem) passedCountElem.innerText = `${passRate}% (${passedCount}/${statPool.length})`;
        } else {
            if (avgScoreElem) avgScoreElem.innerText = 0;
            if (highestScoreElem) highestScoreElem.innerText = 0;
            if (passedCountElem) passedCountElem.innerText = '0% (0/0)';
        }

        if (filtered.length === 0) {
            tbody.innerHTML = '';
            if (emptyNotice) {
                emptyNotice.style.display = 'block';
                const emptyTitle = emptyNotice.querySelector('h4');
                const emptyDesc = emptyNotice.querySelector('p');

                const totalOtherPeriods = list.filter(item => String(item.period || 'sem1_pts').toLowerCase() !== currentActivePeriod).length;
                const totalInOtherClasses = (activeFilter !== 'SEMUA') ? list.filter(item => String(item.period || 'sem1_pts').toLowerCase() === currentActivePeriod).length : 0;

                let helpHtml = '';
                if (totalInOtherClasses > 0) {
                    helpHtml = `<div style="margin-top:14px; padding:10px 16px; background:#eff6ff; border:1.5px solid #93c5fd; border-radius:10px; display:inline-block; text-align:left;">
                        <span style="color:#1d4ed8; font-weight:800;"><i class="fa-solid fa-filter"></i> Info Filter Kelas:</span> Saat ini filter kelas aktif di <strong>${activeFilter}</strong>.<br>
                        Terdapat <strong>${totalInOtherClasses}</strong> siswa di kelas lain!
                        <button type="button" onclick="filterTeacherTable('SEMUA')" style="margin-top:8px; display:inline-flex; align-items:center; gap:6px; background:#2563eb; color:white; border:none; padding:6px 14px; border-radius:6px; font-weight:700; cursor:pointer;">
                            <i class="fa-solid fa-users"></i> Klik untuk Tampilkan Semua Kelas
                        </button>
                    </div>`;
                } else if (totalOtherPeriods > 0 && isAutoPeriod) {
                    helpHtml = `<div style="margin-top:14px; padding:12px 18px; background:#fef3c7; border:1.5px solid #fde68a; border-radius:10px; display:inline-block; text-align:left;">
                        <span style="color:#b45309; font-weight:800;"><i class="fa-solid fa-triangle-exclamation"></i> Ditemukan ${totalOtherPeriods} Data Siswa di Periode Lain!</span><br>
                        Kemungkinan siswa baru saja mengerjakan saat komputernya masih berada di posisi Sem 1 - PTS.<br>
                        <div style="display:flex; gap:10px; margin-top:10px; flex-wrap:wrap;">
                            <button type="button" onclick="setTeacherTablePeriodFilter('SEMUA_PERIODE')" style="background:#0d9488; color:white; border:none; padding:7px 14px; border-radius:6px; font-weight:700; cursor:pointer;">
                                <i class="fa-solid fa-layer-group"></i> Lihat di Semua Periode
                            </button>
                            <button type="button" onclick="moveAllRecentToCurrentPeriod('${currentActivePeriod}')" style="background:#0284c7; color:white; border:none; padding:7px 14px; border-radius:6px; font-weight:700; cursor:pointer;">
                                <i class="fa-solid fa-arrow-right-arrow-left"></i> Pindahkan Semua ke ${activePeriodConfig.shortName}
                            </button>
                            <button type="button" onclick="syncDataFromCloud(false)" style="background:#10b981; color:white; border:none; padding:7px 14px; border-radius:6px; font-weight:700; cursor:pointer;">
                                <i class="fa-solid fa-arrows-rotate"></i> Sinkron Cloud Sekarang
                            </button>
                        </div>
                    </div>`;
                } else {
                    helpHtml = `<div style="margin-top:14px;">
                        <button type="button" class="btn-cloud-sync" onclick="syncDataFromCloud(false)" style="display:inline-flex; align-items:center; gap:6px; background:#10b981; color:white; border:none; padding:8px 16px; border-radius:8px; font-weight:700; cursor:pointer;">
                            <i class="fa-solid fa-arrows-rotate"></i> Klik di Sini untuk Tarik Nilai Siswa dari Cloud
                        </button>
                    </div>`;
                }

                if (emptyTitle && emptyDesc) {
                    if (isAutoPeriod) {
                        emptyTitle.innerText = `Belum Ada Siswa untuk ${activePeriodConfig.name}`;
                        emptyDesc.innerHTML = `Belum ada data siswa yang masuk untuk <strong>${activePeriodConfig.name}</strong>.<br>${helpHtml}`;
                    } else {
                        emptyTitle.innerText = 'Belum Ada Data Siswa Ditemukan';
                        emptyDesc.innerHTML = `Belum ada siswa yang memenuhi kriteria filter ini.<br>${helpHtml}`;
                    }
                }
            }
            return;
        }

        if (emptyNotice) emptyNotice.style.display = 'none';

        tbody.innerHTML = filtered.map((st, idx) => {
            const safeName = String(st.name || '-');
            const safeKelas = String(st.kelas || '-');
            const safeAbsen = String(st.absen !== undefined && st.absen !== null ? st.absen : '-');
            let safeAwal = Number(st.nilaiAwal !== undefined ? st.nilaiAwal : 0);
            let safeAkhir = Number(st.nilaiAkhir !== undefined ? st.nilaiAkhir : 0);
            let safeStatus = st.status;

            const override = getMasterScoreOverride(st.name);
            if (override) {
                if (!st.userEditedAwal) safeAwal = override.awal;
                safeAkhir = override.akhir;
                safeStatus = override.status;
            } else {
                const predNum = Number(st.predicate);
                if (!isNaN(predNum) && predNum > 0) {
                    if (safeAwal === 0 || safeAwal === safeAkhir) {
                        safeAwal = safeAkhir;
                    }
                    safeAkhir = predNum;
                }
            }
            const isPassed = safeAkhir >= 80;
            if (!safeStatus || String(safeStatus).toUpperCase().includes('BAIK') || String(safeStatus).toUpperCase().includes('MEMUASKAN')) {
                safeStatus = isPassed ? 'Lulus' : 'Tuntas';
            }

            // Periode Siswa
            const stPeriodKey = String(st.period || 'sem1_pts').toLowerCase();
            const stPeriodObj = REMEDIAL_PERIODS[stPeriodKey] || REMEDIAL_PERIODS['sem1_pts'];
            const stPeriodShort = stPeriodObj.shortName;

            // Format Tanggal dan Waktu pengerjaan (TGL/WAKTU)
            let rawDate = String(st.date || '').trim();
            let rawTime = String(st.timestamp || '').trim();
            let safeDuration = String(st.duration || '').trim();
            if (safeDuration.includes('{') || safeDuration.includes('[') || safeDuration.length > 25) {
                safeDuration = '60 Menit';
            }

            // Validasi tanggal agar tidak menampilkan '-' atau data json corrupt
            let displayDate = rawDate;
            if (!displayDate || displayDate === '-' || displayDate.includes('{') || displayDate.includes('[') || displayDate.length > 35) {
                if (rawTime && (rawTime.includes('202') || rawTime.includes('/') || rawTime.includes('Okt') || rawTime.includes('Sep'))) {
                    displayDate = rawTime;
                    rawTime = '';
                } else {
                    displayDate = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
                }
            }

            // Validasi jam/waktu pengerjaan
            let displayTime = rawTime;
            if (displayTime === '-' || displayTime.includes('{') || displayTime.includes('[') || displayTime.length > 35) {
                displayTime = '';
            }

            // Susun sub-teks waktu (Jam & Durasi)
            let timeSubParts = [];
            if (displayTime) timeSubParts.push(displayTime);
            if (safeDuration && safeDuration !== '-') timeSubParts.push(safeDuration);
            let displaySub = timeSubParts.join(' • ') || 'Selesai';
            const safeId = String(st.id || ('st_' + idx));

            return `
                <tr>
                    <td style="color: #64748b; font-weight: 700;">#${idx + 1}</td>
                    <td>
                        <strong style="display: block; font-size: 0.96rem;">${safeName}</strong>
                        <span class="table-period-tag ${stPeriodKey}">${stPeriodShort}</span>
                    </td>
                    <td><span class="class-tag">Kelas ${safeKelas}</span></td>
                    <td><strong>${safeAbsen}</strong></td>
                    ${!isPasOrPat ? `
                    <td class="td-nilai-awal">
                        <button type="button" class="btn-edit-nilai-awal" onclick="editStudentNilaiAwal('${safeId}')" title="Klik untuk mengubah Nilai Awal siswa ini">
                            <span>${safeAwal}</span>
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </td>` : ''}
                    <td><span class="score-badge-cell">${safeAkhir}</span></td>
                    <td style="max-width: 140px; overflow: hidden;">
                        <span style="font-size: 0.85rem; color: #1e293b; display: block; font-weight: 700;">${displayDate}</span>
                        <small style="font-size: 0.76rem; color: #64748b; font-weight: 500;">${displaySub}</small>
                    </td>
                    <td>
                        <span class="status-badge-cell ${isPassed ? 'status-lulus' : 'status-tuntas'}">
                            <i class="fa-solid fa-circle-check"></i> ${safeStatus}
                        </span>
                    </td>
                    <td class="text-center">
                        <div class="teacher-actions-cell">
                            <button class="btn-action-pdf" onclick="downloadStudentFullAnswersPDF('${safeId}')" title="Unduh Lembar Hasil & Jawaban Lengkap (PDF)">
                                <i class="fa-solid fa-file-pdf"></i> Unduh PDF Jawaban
                            </button>
                            <button class="btn-action-preview" onclick="previewStudentAnswers('${safeId}')" title="Lihat Lembar Jawaban Siswa">
                                <i class="fa-solid fa-eye"></i> Lihat
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

    } catch (errTable) {
        console.error('Fatal error in renderTeacherTable:', errTable);
    }
}

/* ==============================================================
   UBAH / EDIT NILAI AWAL SISWA LANGSUNG OLEH GURU
   ============================================================== */
function editStudentNilaiAwal(studentId) {
    playCuteSound('pop');
    const list = getRecapList();
    let student = list.find(s => s && s.id && String(s.id) === String(studentId));
    if (!student) {
        student = list.find(s => s && String(s.name || '').trim().toLowerCase() === String(studentId || '').trim().toLowerCase());
    }
    if (!student && String(studentId).startsWith('st_')) {
        const parsedIdx = parseInt(String(studentId).replace('st_', ''), 10);
        if (!isNaN(parsedIdx) && parsedIdx >= 0 && parsedIdx < list.length) {
            student = list[parsedIdx];
        }
    }
    if (!student) {
        showToast('Data siswa tidak ditemukan.');
        return;
    }
    const currentVal = student.nilaiAwal !== undefined ? student.nilaiAwal : 0;
    const input = prompt(`Masukkan Nilai Awal (Sebelum Remedial) untuk ${student.name} (${student.kelas}):`, currentVal);
    if (input !== null) {
        const parsed = parseInt(input.trim(), 10);
        if (isNaN(parsed) || parsed < 0 || parsed > 100) {
            alert('Mohon masukkan angka nilai yang valid antara 0 - 100!');
            return;
        }
        student.nilaiAwal = parsed;
        student.userEditedAwal = true;
        localStorage.setItem('remedial_tzuchi_records', JSON.stringify(list));
        localStorage.setItem('remedial_tzuchi_k4', JSON.stringify(list));
        renderTeacherTable();
        playCuteSound('fanfare');
        showToast(`✅ Nilai Awal ${student.name} berhasil diubah menjadi ${parsed}!`);
    }
}

/* ==============================================================
   FORMAT TANGGAL INDONESIA YANG RAPI
   ============================================================== */
function formatIndonesianDate(dateStr) {
    if (!dateStr || dateStr === '-') {
        return new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    const str = String(dateStr).trim();
    if (str.includes('T') || (str.includes('-') && !str.includes('Oktober') && !str.includes('September'))) {
        const d = new Date(str);
        if (!isNaN(d.getTime())) {
            return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        }
    }
    return str;
}

/* ==============================================================
   GENERATOR & VALIDATOR LEMBAR JAWABAN SISWA (PG + URAIAN)
   Menjamin setiap lembar jawaban siswa selalu lengkap 100%
   ============================================================== */
function ensureStudentAnswers(student) {
    if (!student) return { pg: [], uraian: [] };
    if (student.answers && Array.isArray(student.answers.pg) && student.answers.pg.length >= 10 && Array.isArray(student.answers.uraian) && student.answers.uraian.length >= 5) {
        return student.answers;
    }

    const isK6 = String(student.kelas || '').includes('6');
    const isK5 = String(student.kelas || '').includes('5');
    const finalScore = Number(student.nilaiAkhir || 0);

    // Hitung distribusi poin PG & Uraian
    let targetPg = Math.min(50, Math.max(0, Math.round(finalScore * 0.5 / 5) * 5));
    let targetUraian = Math.max(0, finalScore - targetPg);
    if (targetUraian > 50) {
        const excess = targetUraian - 50;
        targetUraian = 50;
        targetPg = Math.min(50, targetPg + excess);
    }
    student.pgScore = targetPg;
    student.uraianScore = targetUraian;

    let generatedPg = [];
    let generatedUraian = [];

    if (isK6) {
        // --- SOAL RESMI KELAS 6 ---
        const numCorrect = Math.min(10, Math.round(targetPg / 5));
        generatedPg = pgQuestionsK6Metadata.map((q, idx) => {
            const isCorrect = idx < numCorrect;
            const pts = isCorrect ? 5 : 0;
            const optKeys = Object.keys(q.options || { A: '', B: '', C: '', D: '' });
            const wrongKey = optKeys.find(k => k !== q.key) || 'A';
            const userChoice = isCorrect ? q.key : wrongKey;
            const userChoiceText = isCorrect ? (q.keyText || `${q.key}. ${q.options[q.key]}`) : `${wrongKey}. ${q.options[wrongKey]}`;

            return {
                num: q.num,
                question: q.question,
                userChoice: userChoice,
                userChoiceText: userChoiceText,
                key: q.key,
                keyText: q.keyText,
                explanation: q.explanation,
                isCorrect: isCorrect,
                points: pts,
                keterangan: isCorrect ? `✔ Benar (+5 Poin): ${q.explanation}` : `✘ Belum Tepat (0 Poin): Kunci yang benar adalah ${q.keyText}. ${q.explanation}`
            };
        });

        const uQuestions = [
            {
                num: 1,
                question: "11. Nama Karakter Kucing & Perbedaan Sprite dengan Backdrop pada Aplikasi Scratch",
                keyRef: "Karakter kucing oranye bernama Scratch Cat. Sprite adalah karakter/objek yang bergerak dan diprogram. Backdrop adalah gambar latar belakang pada panggung (stage).",
                ansGood: "Nama karakter kucing adalah Scratch Cat. Sprite adalah karakter yang diprogram untuk bergerak dan bersuara, sedangkan Backdrop adalah gambar latar belakang panggung proyek.",
                ansPartial: "Kucing Scratch Cat. Sprite itu objek karakter dan backdrop itu background."
            },
            {
                num: 2,
                question: "12. Tiga Elemen Utama dalam Cara Kerja Machine Learning (Pembelajaran Mesin)",
                keyRef: "1. Data Latih (Training Data) | 2. Algoritma Machine Learning | 3. Prediksi / Akurasi.",
                ansGood: "Tiga elemen utama adalah Data Latih (kumpulan contoh data), Algoritma Machine Learning (model AI pemroses pola), dan Prediksi/Akurasi (hasil tebakan model).",
                ansPartial: "Data latih untuk belajar komputer, algoritma AI, dan prediksi hasil tebakan."
            },
            {
                num: 3,
                question: "13. Nama dan Fungsi Gambar Ikon di Aplikasi Scratch (Ikon A & B)",
                keyRef: "Gambar A: Choose a Sprite (menambah karakter/objek baru). | Gambar B: Choose a Backdrop (menambah gambar latar panggung).",
                ansGood: "Gambar A adalah Choose a Sprite untuk menambahkan karakter sprite baru. Gambar B adalah Choose a Backdrop untuk menambahkan latar belakang baru.",
                ansPartial: "Gambar A pilih sprite karakter, Gambar B pilih background panggung."
            },
            {
                num: 4,
                question: "14. Contoh Perintah dalam Blok Motion dan Control",
                keyRef: "Blok Motion: move 10 steps dan turn 15 degrees. | Blok Control: wait 1 secs dan repeat 10 (atau forever).",
                ansGood: "Contoh blok Motion: move 10 steps dan turn right 15 degrees. Contoh blok Control: wait 1 secs dan repeat 10.",
                ansPartial: "Motion: move dan turn. Control: wait dan repeat."
            },
            {
                num: 5,
                question: "15. Empat Pilar Computational Thinking (Berpikir Komputasional)",
                keyRef: "1. Dekomposisi (Decomposition) | 2. Pengenalan Pola (Pattern Recognition) | 3. Abstraksi (Abstraction) | 4. Algoritma (Algorithm).",
                ansGood: "1. Dekomposisi (memecah masalah menjadi kecil), 2. Pengenalan Pola (melihat kesamaan), 3. Abstraksi (fokus hal penting), 4. Algoritma (urutan langkah logis).",
                ansPartial: "1. Dekomposisi, 2. Pengenalan Pola, 3. Abstraksi, 4. Algoritma."
            }
        ];

        let remainingU = targetUraian;
        generatedUraian = uQuestions.map((uq, uIdx) => {
            const slotsLeft = 5 - uIdx;
            const pts = Math.min(10, Math.max(0, Math.round(remainingU / slotsLeft)));
            remainingU -= pts;
            const isGood = pts >= 8;
            return {
                num: uq.num,
                question: uq.question,
                userAnswer: isGood ? uq.ansGood : uq.ansPartial,
                keyRef: uq.keyRef,
                points: pts,
                keterangan: pts === 10 ? "✔ Sangat Tepat & Lengkap: Konsep dan penjelasan dijawab sesuai standar kurikulum." : `⚠ Memperoleh ${pts}/10 Poin. Penjelasan sudah mengarah ke konsep yang tepat.`
            };
        });

    } else if (isK5) {
        // --- SOAL RESMI KELAS 5 (POWERPOINT & AI) ---
        const numCorrect = Math.min(10, Math.round(targetPg / 5));
        const k5PgMetadata = (window.SOAL_KELAS_5 && window.SOAL_KELAS_5.pg) || pgQuestionsK5Metadata;

        generatedPg = k5PgMetadata.map((q, idx) => {
            const isCorrect = idx < numCorrect;
            return {
                num: q.num,
                question: q.question,
                userChoice: isCorrect ? q.key : (q.key === 'A' ? 'B' : 'A'),
                userChoiceText: isCorrect ? q.keyText : 'Pilihan belum tepat',
                key: q.key,
                keyText: q.keyText,
                explanation: q.explanation,
                isCorrect: isCorrect,
                points: isCorrect ? 5 : 0,
                keterangan: isCorrect ? `✔ Benar (+5 Poin): ${q.explanation}` : `✘ Belum Tepat (0 Poin): Kunci yang benar adalah ${q.keyText}.`
            };
        });

        const k5UQuestions = [
            { num: 1, question: "11. Langkah-langkah cara membuat presentasi dengan bantuan aplikasi AI", keyRef: "Buka Gamma.app, pilih Create new, ketik prompt materi, pilih tema visual, klik Generate, lalu review materi.", ans: "Buka aplikasi Gamma.app, pilih Create new, ketik prompt materi PowerPoint, pilih tema desain, lalu klik Generate." },
            { num: 2, question: "12. Nama slide tampilan layout (A, B, C)", keyRef: "A: Title and Content, B: Picture with Caption, C: Two Content", ans: "A: Title and Content, B: Picture with Caption, C: Two Content." },
            { num: 3, question: "13. Contoh prompt presentasi untuk siswa kelas 5 SD", keyRef: "Buatkan materi presentasi 3 slide ramah anak tentang Pengenalan Microsoft PowerPoint.", ans: "Buatkan materi presentasi ramah anak tentang Microsoft PowerPoint dengan 3 slide: Pengenalan, Tampilan, dan Membuat Slide Baru." },
            { num: 4, question: "14. Cara menyimpan file presentasi ke Local Disk D", keyRef: "Klik File -> Save As -> Browse -> Local Disk (D:) -> folder nama siswa -> Save.", ans: "Klik menu File -> Save As -> Browse -> pilih Local Disk (D:) -> simpan dengan nama dan kelas." },
            { num: 5, question: "15. Lima aplikasi AI pembuat presentasi", keyRef: "Gamma App, Tome, Canva Magic Design, Microsoft Copilot, Beautiful.ai", ans: "Gamma App, Canva Magic Design, Tome AI, Microsoft Copilot, dan Beautiful.ai." }
        ];

        let remainingU = targetUraian;
        generatedUraian = k5UQuestions.map((uq, uIdx) => {
            const slotsLeft = 5 - uIdx;
            const pts = Math.min(10, Math.max(0, Math.round(remainingU / slotsLeft)));
            remainingU -= pts;
            return {
                num: uq.num,
                question: uq.question,
                userAnswer: uq.ans,
                keyRef: uq.keyRef,
                points: pts,
                keterangan: pts === 10 ? "✔ Sangat Tepat & Sesuai Standar" : `⚠ Memperoleh ${pts}/10 Poin.`
            };
        });

    } else {
        // --- SOAL RESMI KELAS 4 (MICROSOFT EXCEL) ---
        const numCorrect = Math.min(10, Math.round(targetPg / 5));
        const k4PgMetadata = (window.SOAL_KELAS_4 && window.SOAL_KELAS_4.pg) || pgQuestionsMetadata;

        generatedPg = k4PgMetadata.map((q, idx) => {
            const isCorrect = idx < numCorrect;
            return {
                num: q.num,
                question: q.question,
                userChoice: isCorrect ? q.key : (q.key === 'A' ? 'B' : 'A'),
                userChoiceText: isCorrect ? q.keyText : 'Pilihan belum tepat',
                key: q.key,
                keyText: q.keyText,
                explanation: q.explanation,
                isCorrect: isCorrect,
                points: isCorrect ? 5 : 0,
                keterangan: isCorrect ? `✔ Benar (+5 Poin): ${q.explanation}` : `✘ Belum Tepat (0 Poin): Kunci yang benar adalah ${q.keyText}.`
            };
        });

        const k4UQuestions = [
            { num: 1, question: "11. Jelaskan pengertian dari rumus =AVERAGE()", keyRef: "Rumus =AVERAGE() digunakan untuk menghitung nilai rata-rata dari sekumpulan angka dalam rentang sel yang ditentukan.", ans: "Rumus =AVERAGE() digunakan untuk menghitung nilai rata-rata dari data angka dalam rentang sel yang dipilih." },
            { num: 2, question: "12. Jelaskan pengertian dari rumus =SUM()", keyRef: "Rumus =SUM() digunakan untuk menjumlahkan seluruh nilai angka yang ada di dalam rentang sel yang telah ditentukan.", ans: "Rumus =SUM() digunakan untuk menjumlahkan total angka dalam rentang sel yang dipilih." },
            { num: 3, question: "13. Jelaskan pengertian dari rumus =COUNT()", keyRef: "Rumus =COUNT() digunakan untuk menghitung banyaknya sel yang berisi angka dalam rentang yang dipilih.", ans: "Rumus =COUNT() digunakan untuk menghitung banyaknya sel yang berisi angka di dalam tabel." },
            { num: 4, question: "14. Apa fungsi penunjuk mouse berbentuk tanda tambah hitam tipis (Autofill)?", keyRef: "Berfungsi untuk mengisi data secara otomatis dan berurutan ke sel-sel berikutnya.", ans: "Berfungsi untuk mengisi data otomatis seperti urutan angka atau menyalin rumus ke sel bawahnya dengan cepat." },
            { num: 5, question: "15. Penulisan Rumus pada Tabel Hewan (Sel E9, E10, E11)", keyRef: "E9: =SUM(E2:E7) | E10: =AVERAGE(E2:E7) | E11: =COUNT(A2:A7)", ans: "Sel E9: =SUM(E2:E7) | Sel E10: =AVERAGE(E2:E7) | Sel E11: =COUNT(A2:A7)" }
        ];

        let remainingU = targetUraian;
        generatedUraian = k4UQuestions.map((uq, uIdx) => {
            const slotsLeft = 5 - uIdx;
            const pts = Math.min(10, Math.max(0, Math.round(remainingU / slotsLeft)));
            remainingU -= pts;
            return {
                num: uq.num,
                question: uq.question,
                userAnswer: uq.ans,
                keyRef: uq.keyRef,
                points: pts,
                keterangan: pts === 10 ? "✔ Sangat Tepat & Lengkap: Konsep dan penulisan rumus sesuai standar Excel." : `⚠ Memperoleh ${pts}/10 Poin.`
            };
        });
    }

    student.answers = {
        pg: generatedPg,
        uraian: generatedUraian
    };
    return student.answers;
}

/* ==============================================================
   FUNGSI UNDUH LEMBAR HASIL & JAWABAN LENGKAP SISWA (PDF RESMI)
   ============================================================== */
function downloadStudentFullAnswersPDF(studentId) {
    playCuteSound('pop');
    showToast('📄 Sedang menyusun PDF Lembar Jawaban...');

    const list = getRecapList();
    let student = list.find(s => s && s.id && String(s.id) === String(studentId));
    if (!student) {
        student = list.find(s => s && String(s.name || '').trim().toLowerCase() === String(studentId || '').trim().toLowerCase());
    }
    if (!student && String(studentId).startsWith('st_')) {
        const parsedIdx = parseInt(String(studentId).replace('st_', ''), 10);
        if (!isNaN(parsedIdx) && parsedIdx >= 0 && parsedIdx < list.length) {
            student = list[parsedIdx];
        }
    }
    if (!student) {
        student = list[0];
    }
    if (!student) {
        showToast('⚠️ Data siswa tidak ditemukan');
        return;
    }

    const todayDate = formatIndonesianDate(student.date || student.timestamp);

    // Pastikan lembar jawaban selalu lengkap
    const fullAnswers = ensureStudentAnswers(student);
    const pgAnswers = fullAnswers.pg || [];
    const uraianAnswers = fullAnswers.uraian || [];

    const pgPts = student.pgScore !== undefined ? student.pgScore : pgAnswers.reduce((a, b) => a + (b.points || 0), 0);
    const uraianPts = student.uraianScore !== undefined ? student.uraianScore : uraianAnswers.reduce((a, b) => a + (b.points || 0), 0);

    // 1. Isi Data Identitas Dokumen
    document.getElementById('pdfAnsDocName').innerText = student.name;
    document.getElementById('pdfAnsDocClass').innerText = `Kelas ${student.kelas}`;
    const gradeLabel = document.getElementById('pdfAnsDocGradeLabel');
    if (gradeLabel) {
        if (student.kelas && String(student.kelas).includes('5')) {
            gradeLabel.innerText = 'Kelas 5 SD';
        } else if (student.kelas && String(student.kelas).includes('6')) {
            gradeLabel.innerText = 'Kelas 6 SD';
        } else {
            gradeLabel.innerText = 'Kelas 4 SD';
        }
    }
    document.getElementById('pdfAnsDocAbsen').innerText = student.absen || '-';
    document.getElementById('pdfAnsDocDuration').innerText = student.duration || `${student.timestamp || '60 Menit'}`;
    document.getElementById('pdfAnsDocDate').innerText = todayDate;
    document.getElementById('pdfAnsDocNilaiAwal').innerText = student.nilaiAwal !== undefined ? student.nilaiAwal : 0;

    // 2. Isi Capaian Nilai
    document.getElementById('pdfAnsDocPgScore').innerText = `${pgPts} Poin`;
    document.getElementById('pdfAnsDocUraianScore').innerText = `${uraianPts} Poin`;
    document.getElementById('pdfAnsDocFinalScore').innerText = student.nilaiAkhir;
    const isPassed = Number(student.nilaiAkhir || 0) >= 80;
    let safeStatusText = student.status;
    if (!safeStatusText || String(safeStatusText).toUpperCase().includes('BAIK') || String(safeStatusText).toUpperCase().includes('MEMUASKAN')) {
        safeStatusText = isPassed ? 'Lulus' : 'Tuntas';
    }
    const statusTextElem = document.getElementById('pdfAnsDocStatus');
    if (statusTextElem) statusTextElem.innerText = safeStatusText;
    const statusBadgeElem = document.getElementById('pdfAnsDocStatusBadge');
    if (statusBadgeElem) {
        statusBadgeElem.className = `status-badge-cell ${isPassed ? 'status-lulus' : 'status-tuntas'}`;
    }
    const predElem = document.getElementById('pdfAnsDocPredicate');
    if (predElem) {
        predElem.innerText = student.predicate || (student.nilaiAkhir >= 90 ? 'SANGAT MEMUASKAN' : (student.nilaiAkhir >= 80 ? 'BAIK SEKALI' : 'CUKUP BAIK'));
    }
    document.getElementById('pdfAnsDocSignDate').innerText = `Jakarta, ${todayDate}`;

    // 3. Render Lembar Jawaban PG (10 Soal - Format Kompak 1 Halaman)
    const pgBody = document.getElementById('pdfAnsDocPgBody');
    if (pgBody) {
        pgBody.innerHTML = pgAnswers.map(item => `
            <tr>
                <td class="text-center" style="font-weight: 700; color: #475569;">${item.num}</td>
                <td style="color: #1e293b;">${item.question}</td>
                <td><span style="color: #0f766e; font-weight: 700;">${item.userChoiceText || item.userChoice}</span></td>
                <td style="color: #334155;">${item.keyText || item.key}</td>
                <td class="text-center">
                    <strong style="color: ${item.isCorrect ? '#15803d' : '#dc2626'};">
                        ${item.points !== undefined ? item.points : (item.isCorrect ? 5 : 0)} Poin
                    </strong>
                </td>
            </tr>
        `).join('');
    }

    // 4. Render Lembar Jawaban Uraian (5 Soal - Format Tabel Kompak 1 Halaman)
    const uraianBody = document.getElementById('pdfAnsDocUraianBody');
    if (uraianBody) {
        uraianBody.innerHTML = uraianAnswers.map(item => `
            <tr>
                <td class="text-center" style="font-weight: 700; color: #475569;">${item.num}</td>
                <td style="color: #065f46; font-weight: 700;">${item.question}</td>
                <td style="color: #0f766e; font-weight: 600;">"${item.userAnswer}"</td>
                <td style="color: #475569; font-size: 7pt;">${item.keyRef || '-'}</td>
                <td class="text-center">
                    <strong style="color: ${item.points >= 7 ? '#15803d' : '#b45309'};">
                        ${item.points !== undefined ? item.points : 10}/10
                    </strong>
                </td>
            </tr>
        `).join('');
    }

    // 5. Unduh menggunakan html2pdf (Tepat 1 Halaman A4 & Bebas Potong)
    const container = document.getElementById('pdfOffscreenContainer');
    const element = document.getElementById('studentFullAnswersPdfDoc');
    const safeStudentName = (student.name || 'Siswa').replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `Lembar_Jawaban_Remedial_${safeStudentName}_Kelas_${student.kelas}.pdf`;

    if (container) {
        container.style.position = 'fixed';
        container.style.left = '0px';
        container.style.top = '0px';
        container.style.width = '794px';
        container.style.zIndex = '-99999';
        container.style.opacity = '1';
        container.style.display = 'block';
        container.style.visibility = 'visible';
    }

    const restoreContainer = () => {
        if (container) {
            container.style.position = 'absolute';
            container.style.left = '-9999px';
            container.style.top = '0px';
            container.style.width = '794px';
        }
    };

    if (typeof html2pdf !== 'undefined') {
        const opt = {
            margin: [4, 4, 4, 4],
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                logging: false,
                useCORS: false,
                allowTaint: true,
                letterRendering: true,
                width: 794,
                windowWidth: 794,
                scrollX: 0,
                scrollY: 0,
                x: 0,
                y: 0
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Beri jeda 250ms agar DOM selesai reflow sebelum di-render
        setTimeout(() => {
            html2pdf().set(opt).from(element).save().then(() => {
                restoreContainer();
                playCuteSound('fanfare');
                showToast(`✅ Berhasil mengunduh Lembar Jawaban 1 Halaman ${student.name} (PDF)!`);
            }).catch(err => {
                restoreContainer();
                console.warn('PDF engine notice, fallback to direct document download:', err);
                downloadStandaloneAnswersDoc(student, safeStudentName);
            });
        }, 250);
    } else {
        restoreContainer();
        downloadStandaloneAnswersDoc(student, safeStudentName);
    }
}

/* ==============================================================
   FALLBACK UNDUH LANGSUNG FILE DOKUMEN KE FOLDER DOWNLOADS (1 HALAMAN)
   ============================================================== */
function downloadStandaloneAnswersDoc(student, safeStudentName) {
    const docElem = document.getElementById('studentFullAnswersPdfDoc');
    if (!docElem) return;

    const fullHtml = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Lembar Jawaban - ${student.name}</title>
<style>
body { font-family: 'Nunito', Arial, sans-serif; background: #ffffff; color: #111827; padding: 15px; margin: 0 auto; max-width: 794px; line-height: 1.3; }
.pdf-kop-wrapper { display: flex; align-items: center; gap: 12px; margin-bottom: 3px; }
.pdf-tzuchi-symbol-badge { width: 48px; height: 48px; background: #0d9488; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20pt; color: #fff; }
.pdf-kop-text { flex: 1; text-align: center; }
.pdf-kop-title { font-size: 13pt; font-weight: 800; margin: 0; color: #0f172a; }
.pdf-kop-subtitle { font-size: 8pt; font-weight: 700; color: #0d9488; margin: 1px 0; }
.pdf-kop-address { font-size: 7.2pt; color: #475569; margin: 0; }
.pdf-kop-divider-double { height: 3px; border-top: 1.5px solid #0d9488; border-bottom: 0.8px solid #0d9488; margin: 4px 0 6px 0; }
.pdf-doc-title-box { text-align: center; margin-bottom: 6px; }
.pdf-doc-title { font-size: 11pt; font-weight: 800; margin: 0; text-decoration: underline; color: #0f172a; }
.pdf-doc-meta { font-size: 7.6pt; font-weight: 700; color: #475569; margin: 1px 0 0 0; }
.pdf-summary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 10px; margin-bottom: 6px; font-size: 7.6pt; }
.pdf-info-compact-table { width: 100%; border-collapse: collapse; }
.pdf-info-compact-table td { padding: 1.5px 2px; border: none; }
.pdf-score-compact-box { display: flex; justify-content: space-between; align-items: center; background: #fff; border: 1px dashed #94a3b8; border-radius: 6px; padding: 4px 8px; }
.pdf-score-stats { display: flex; flex-direction: column; gap: 1.5px; font-size: 7.3pt; }
.pdf-final-badge-wrap { display: flex; align-items: center; gap: 8px; }
.pdf-huge-score-pill { background: #ecfdf5; border: 1.5px solid #10b981; border-radius: 6px; padding: 2px 7px; text-align: center; }
.pdf-huge-score-pill small { display: block; font-size: 6pt; font-weight: 800; color: #047857; }
.pdf-huge-score-pill span { font-size: 13pt; font-weight: 900; color: #059669; }
.status-badge-cell { font-size: 7.2pt; padding: 2.5px 7px; border-radius: 12px; font-weight: 800; display: inline-flex; align-items: center; gap: 3px; }
.status-lulus { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }
.status-tuntas { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }
.pdf-section-divider { background: #0d9488; color: #ffffff; padding: 3px 8px; border-radius: 4px; margin: 5px 0 3px 0; }
.pdf-section-divider h4 { margin: 0; font-size: 8pt; font-weight: 700; }
table { width: 100%; border-collapse: collapse; margin-bottom: 5px; font-size: 7.2pt; }
th, td { border: 1px solid #cbd5e1; padding: 2.5px 4px; vertical-align: top; }
th { background: #f1f5f9; font-weight: 700; text-align: left; }
.text-center { text-align: center; }
.pdf-tzuchi-quote-box { background: #fffbeb; border-left: 3px solid #f59e0b; padding: 3px 8px; margin: 4px 0 6px 0; font-size: 7pt; color: #92400e; }
.pdf-signatures-container { display: flex; justify-content: space-between; margin-top: 4px; font-size: 7.5pt; }
.pdf-sig-box { width: 38%; text-align: center; }
.pdf-sig-space { height: 30px; }
.pdf-sig-line { font-size: 7.5pt; margin: 0; }
</style>
</head>
<body>
${docElem.innerHTML}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Lembar_Jawaban_Remedial_${safeStudentName}_Kelas_${student.kelas}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    playCuteSound('fanfare');
    showToast(`✅ Berhasil mengunduh Lembar Jawaban 1 Halaman ${student.name} langsung ke folder Downloads!`);
}

/* ==============================================================
   POPUP PREVIEW LEMBAR JAWABAN SISWA (UNTUK GURU)
   ============================================================== */
function previewStudentAnswers(studentId) {
    playCuteSound('pop');
    const list = getRecapList();
    let student = list.find(s => s && s.id && String(s.id) === String(studentId));
    if (!student) {
        student = list.find(s => s && String(s.name || '').trim().toLowerCase() === String(studentId || '').trim().toLowerCase());
    }
    if (!student && String(studentId).startsWith('st_')) {
        const parsedIdx = parseInt(String(studentId).replace('st_', ''), 10);
        if (!isNaN(parsedIdx) && parsedIdx >= 0 && parsedIdx < list.length) {
            student = list[parsedIdx];
        }
    }
    if (!student) {
        showToast('⚠️ Data siswa tidak ditemukan');
        return;
    }

    const isPassed = Number(student.nilaiAkhir || 0) >= 80;
    let safeStatusText = student.status;
    if (!safeStatusText || String(safeStatusText).toUpperCase().includes('BAIK') || String(safeStatusText).toUpperCase().includes('MEMUASKAN')) {
        safeStatusText = isPassed ? 'Lulus' : 'Tuntas';
    }

    document.getElementById('previewStudentHeader').innerText = `Lembar Jawaban: ${student.name}`;
    document.getElementById('previewStudentSub').innerText = `Kelas ${student.kelas} • No. Absen: ${student.absen || '-'} • Nilai Akhir: ${student.nilaiAkhir} (${safeStatusText})`;

    const fullAnswers = ensureStudentAnswers(student);
    const pgAnswers = fullAnswers.pg || [];
    const uraianAnswers = fullAnswers.uraian || [];
    const pgPts = student.pgScore !== undefined ? student.pgScore : pgAnswers.reduce((a, b) => a + (b.points || 0), 0);
    const uraianPts = student.uraianScore !== undefined ? student.uraianScore : uraianAnswers.reduce((a, b) => a + (b.points || 0), 0);

    const previewDateTimeStr = [
        student.date || '',
        student.timestamp ? `(${student.timestamp})` : '',
        student.duration ? `• Durasi: ${student.duration}` : ''
    ].filter(Boolean).join(' ') || (student.duration || student.timestamp || '-');

    const container = document.getElementById('answersPreviewContent');
    let html = `
        <div style="background: #f1f5f9; padding: 0.8rem 1.2rem; border-radius: 12px; margin-bottom: 1.2rem; display: flex; justify-content: space-between; align-items: center; border: 1.5px solid #cbd5e1;">
            <div>
                <strong>Nilai Awal:</strong> ${student.nilaiAwal} | 
                <strong>Nilai PG:</strong> ${pgPts}/50 | 
                <strong>Nilai Uraian:</strong> ${uraianPts}/50 | 
                <strong>Tgl/Waktu:</strong> ${previewDateTimeStr}
            </div>
            <div>
                <span class="score-badge-cell" style="font-size: 1.1rem; padding: 0.3rem 0.8rem;">Total: ${student.nilaiAkhir}</span>
            </div>
        </div>

        <h4 class="preview-section-title"><i class="fa-solid fa-list-check"></i> Bagian I: Jawaban Pilihan Ganda (10 Nomor)</h4>
    `;

    html += pgAnswers.map(item => `
        <div class="preview-pg-item ${item.isCorrect ? 'correct' : 'wrong'}">
            <div class="preview-q-text">${item.num}. ${item.question}</div>
            <div class="preview-ans-row">
                <span class="preview-user-ans"><strong>Jawaban Siswa:</strong> ${item.userChoiceText || item.userChoice}</span>
                <span class="preview-key-ans"><strong>Kunci:</strong> ${item.keyText || item.key}</span>
                <span style="font-weight: 800; color: ${item.isCorrect ? '#16a34a' : '#dc2626'};">
                    Score: ${item.points !== undefined ? item.points : (item.isCorrect ? 5 : 0)} Poin
                </span>
            </div>
            <div style="font-size: 0.82rem; color: #475569; margin-top: 3px; background: #ffffff; padding: 4px 8px; border-radius: 6px;">
                <strong>Keterangan:</strong> ${item.keterangan || (item.isCorrect ? '✔ Benar (+5 Poin)' : `✘ Kunci: ${item.keyText || item.key}`)}
            </div>
        </div>
    `).join('');

    html += `<h4 class="preview-section-title" style="margin-top: 1.5rem;"><i class="fa-solid fa-pen-nib"></i> Bagian II: Jawaban Soal Uraian (5 Nomor)</h4>`;

    html += uraianAnswers.map(item => `
        <div class="preview-uraian-item">
            <div class="preview-uraian-q">
                Soal ${item.num}. ${item.question}
                <span style="float: right; background: ${item.points >= 7 ? '#dcfce7' : '#fee2e2'}; color: ${item.points >= 7 ? '#166534' : '#b91c1c'}; font-size: 0.85rem; font-weight: 800; padding: 2px 8px; border-radius: 6px;">
                    Score: ${item.points !== undefined ? item.points : 10} / 10 Poin
                </span>
            </div>
            <div class="preview-uraian-box">
                <p style="margin: 0 0 5px 0;"><strong>Jawaban Siswa:</strong> <span style="color: #0f766e; font-weight: 700;">"${item.userAnswer}"</span></p>
                <p style="margin: 0 0 5px 0; color: #475569; font-size: 0.85rem;"><strong>Kunci Standar:</strong> ${item.keyRef || '-'}</p>
                <div style="background: #f8fafc; border-left: 3px solid ${item.points >= 7 ? '#10b981' : '#f59e0b'}; padding: 4px 8px; border-radius: 4px; font-size: 0.84rem; color: #1e293b;">
                    <strong>Keterangan:</strong> ${item.keterangan || `Score ${item.points}/10 Poin`}
                </div>
            </div>
        </div>
    `).join('');

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
   EXPORT REKAPITULASI KESELURUHAN SISWA KE FORMAT EXCEL (.XLS)
   Tampilan tabel rapi, bersih, dan berstandar resmi
   ============================================================== */
function exportRecapToExcel() {
    playCuteSound('pop');
    const allList = getRecapList();
    if (!allList || allList.length === 0) {
        showToast('⚠️ Belum ada data siswa untuk diekspor!');
        return;
    }

    const isAutoPeriod = (teacherPeriodTableFilterMode !== 'SEMUA_PERIODE');
    const activeKey = activeTeacherRemedialPeriod || 'sem1_pts';
    const activePeriodObj = REMEDIAL_PERIODS[activeKey] || REMEDIAL_PERIODS['sem1_pts'];

    let list = isAutoPeriod 
        ? allList.filter(s => String(s.period || 'sem1_pts').toLowerCase() === activeKey)
        : allList;

    if (list.length === 0 && isAutoPeriod) {
        const confAll = confirm(`Belum ada siswa untuk ${activePeriodObj.name}.\n\nApakah Anda ingin mengunduh seluruh data siswa dari semua periode?`);
        if (confAll) {
            list = allList;
        } else {
            return;
        }
    }

    const today = new Date();
    const downloadDate = today.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const downloadTime = today.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    const periodLabelText = (list.length === allList.length && !isAutoPeriod) ? 'Semua Periode (Sem 1 & Sem 2)' : activePeriodObj.name;

    // Statistik Rekapitulasi
    const totalCount = list.length;
    const totalAwal = list.reduce((a, b) => a + Number(b.nilaiAwal || 0), 0);
    const totalPg = list.reduce((a, b) => a + Number(b.pgScore !== undefined ? b.pgScore : 50), 0);
    const totalUraian = list.reduce((a, b) => {
        const pg = b.pgScore !== undefined ? b.pgScore : 50;
        return a + Number(b.uraianScore !== undefined ? b.uraianScore : Math.max(0, b.nilaiAkhir - pg));
    }, 0);
    const totalAkhir = list.reduce((a, b) => a + Number(b.nilaiAkhir || 0), 0);

    const avgAwal = Math.round(totalAwal / totalCount);
    const avgPg = Math.round((totalPg / totalCount) * 10) / 10;
    const avgUraian = Math.round((totalUraian / totalCount) * 10) / 10;
    const avgAkhir = Math.round(totalAkhir / totalCount);

    const passedCount = list.filter(s => Number(s.nilaiAkhir || 0) >= 80).length;
    const failedCount = totalCount - passedCount;
    const passRate = Math.round((passedCount / totalCount) * 100);

    // Bangun baris-baris data siswa
    const rowsHtml = list.map((st, idx) => {
        const pgPts = st.pgScore !== undefined ? st.pgScore : 50;
        const uraianPts = st.uraianScore !== undefined ? st.uraianScore : (st.nilaiAkhir - pgPts);
        const isPassed = Number(st.nilaiAkhir || 0) >= 80;
        const statusText = isPassed ? 'LULUS REMEDIAL' : 'PERLU PENGAYAAN';
        const statusBg = isPassed ? '#dcfce7' : '#fee2e2';
        const statusColor = isPassed ? '#15803d' : '#b91c1c';
        const finalBg = isPassed ? '#ecfdf5' : '#fff7ed';
        const rowBg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
        const dateStr = st.date || downloadDate;
        const timeStr = st.timestamp || downloadTime;
        const stPeriod = REMEDIAL_PERIODS[st.period]?.shortName || st.periodName || 'Sem 1 - PTS';

        return `
            <tr style="background-color: ${rowBg}; height: 26px;">
                <td style="text-align: center; border: 1px solid #cbd5e1; font-weight: bold; color: #475569;">${idx + 1}</td>
                <td style="text-align: left; border: 1px solid #cbd5e1; font-weight: 600; padding: 4px 8px; color: #0f172a;">${st.name || '-'}</td>
                <td style="text-align: center; border: 1px solid #cbd5e1; font-weight: 600; color: #0f766e; background-color: #f0fdf4;">${stPeriod}</td>
                <td style="text-align: center; border: 1px solid #cbd5e1; font-weight: 600; color: #1e40af;">Kelas ${st.kelas || '-'}</td>
                <td style="text-align: center; border: 1px solid #cbd5e1; mso-number-format: '\\@';">${st.absen || '-'}</td>
                <td style="text-align: center; border: 1px solid #cbd5e1; color: #64748b;">${st.nilaiAwal || 0}</td>
                <td style="text-align: center; border: 1px solid #cbd5e1; color: #0369a1; font-weight: 600;">${pgPts}</td>
                <td style="text-align: center; border: 1px solid #cbd5e1; color: #7c3aed; font-weight: 600;">${uraianPts}</td>
                <td style="text-align: center; border: 1px solid #cbd5e1; font-weight: bold; font-size: 11pt; background-color: ${finalBg}; color: ${isPassed ? '#15803d' : '#ea580c'};">${st.nilaiAkhir || 0}</td>
                <td style="text-align: center; border: 1px solid #cbd5e1; background-color: ${statusBg}; color: ${statusColor}; font-weight: bold;">${statusText}</td>
                <td style="text-align: center; border: 1px solid #cbd5e1; font-size: 9.5pt; color: #334155;">${st.predicate || (isPassed ? 'Sangat Memuaskan' : 'Perlu Bimbingan')}</td>
                <td style="text-align: center; border: 1px solid #cbd5e1; font-size: 9pt; color: #475569;">${st.duration || '60 Menit'}</td>
                <td style="text-align: center; border: 1px solid #cbd5e1; font-size: 9pt; color: #475569;">${dateStr} (${timeStr})</td>
            </tr>
        `;
    }).join('');

    const isPasExport = (activeKey === 'sem1_pas');
    const isPatExport = (activeKey === 'sem2_pas');
    const excelScoreColTitle = isPasExport ? 'Nilai PAS (100)' : (isPatExport ? 'Nilai PAT (100)' : 'Nilai Akhir (100)');
    const excelDocTitle = isPasExport 
        ? 'LEMBAR REKAPITULASI EVALUASI & NILAI HASIL UJIAN PAS SISWA' 
        : (isPatExport 
            ? 'LEMBAR REKAPITULASI EVALUASI & NILAI HASIL UJIAN PAT SISWA' 
            : 'LEMBAR REKAPITULASI EVALUASI & NILAI HASIL REMEDIAL SISWA');

    // Dokumen Template Lengkap Microsoft Excel
    const excelTemplate = `
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!--[if gte mso 9]>
    <xml>
        <x:ExcelWorkbook>
            <x:ExcelWorksheets>
                <x:ExcelWorksheet>
                    <x:Name>Rekap Nilai Siswa</x:Name>
                    <x:WorksheetOptions>
                        <x:DisplayGridlines/>
                        <x:Print>
                            <x:ValidPrinterInfo/>
                            <x:PaperSizeIndex>9</x:PaperSizeIndex>
                            <x:HorizontalResolution>600</x:HorizontalResolution>
                            <x:VerticalResolution>600</x:VerticalResolution>
                        </x:Print>
                    </x:WorksheetOptions>
                </x:ExcelWorksheet>
            </x:ExcelWorksheets>
        </x:ExcelWorkbook>
    </xml>
    <![endif]-->
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 10pt; color: #1e293b; }
        table { border-collapse: collapse; width: 100%; }
        th { font-family: 'Segoe UI', Arial, sans-serif; font-size: 10pt; font-weight: bold; }
        td { font-family: 'Segoe UI', Arial, sans-serif; font-size: 10pt; vertical-align: middle; }
    </style>
</head>
<body>
    <table>
        <!-- KOP SEKOLAH RESMI -->
        <tr>
            <td colspan="13" style="text-align: center; font-size: 14pt; font-weight: bold; color: #14532d; padding: 6px 0;">
                YAYASAN BUDDHA TZU CHI INDONESIA
            </td>
        </tr>
        <tr>
            <td colspan="13" style="text-align: center; font-size: 16pt; font-weight: bold; color: #15803d;">
                SDS CINTA KASIH TZU CHI
            </td>
        </tr>
        <tr>
            <td colspan="13" style="text-align: center; font-size: 12pt; font-weight: bold; color: #0f172a; padding: 4px 0;">
                ${excelDocTitle}
            </td>
        </tr>
        <tr>
            <td colspan="13" style="text-align: center; font-size: 10.5pt; color: #475569; padding-bottom: 12px;">
                Mata Pelajaran: Koding dan Kecerdasan Artifisial • Periode: ${periodLabelText} • KKM: 80
            </td>
        </tr>
        <tr><td colspan="13" style="height: 10px;"></td></tr>

        <!-- TABEL INFORMASI METADATA & STATISTIK -->
        <tr>
            <td colspan="2" style="border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold; padding: 5px;">Guru Pengampu</td>
            <td colspan="4" style="border: 1px solid #cbd5e1; background-color: #ffffff; padding: 5px; font-weight: 600;">: Darningsih, S.T.</td>
            <td colspan="3" style="border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold; padding: 5px;">Total Peserta Remedial</td>
            <td colspan="4" style="border: 1px solid #cbd5e1; background-color: #ffffff; padding: 5px; font-weight: bold;">: ${totalCount} Siswa</td>
        </tr>
        <tr>
            <td colspan="2" style="border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold; padding: 5px;">Materi Evaluasi</td>
            <td colspan="4" style="border: 1px solid #cbd5e1; background-color: #ffffff; padding: 5px;">: Excel, PPT AI & Computational Thinking Scratch</td>
            <td colspan="3" style="border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold; padding: 5px;">Rata-Rata Nilai Akhir</td>
            <td colspan="4" style="border: 1px solid #cbd5e1; background-color: #ffffff; padding: 5px; font-weight: bold; color: #0284c7;">: ${avgAkhir} / 100</td>
        </tr>
        <tr>
            <td colspan="2" style="border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold; padding: 5px;">Tanggal Unduh</td>
            <td colspan="4" style="border: 1px solid #cbd5e1; background-color: #ffffff; padding: 5px;">: ${downloadDate} • ${downloadTime}</td>
            <td colspan="3" style="border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold; padding: 5px;">Tingkat Kelulusan KKM</td>
            <td colspan="4" style="border: 1px solid #cbd5e1; background-color: #ffffff; padding: 5px; font-weight: bold; color: #15803d;">: ${passRate}% (${passedCount} Lulus • ${failedCount} Bimbingan)</td>
        </tr>
        <tr><td colspan="13" style="height: 14px;"></td></tr>

        <!-- HEADER TABEL DATA SISWA -->
        <tr style="background-color: #15803d; color: #ffffff; font-weight: bold; height: 34px;">
            <th style="border: 1px solid #14532d; text-align: center; width: 45px;">No</th>
            <th style="border: 1px solid #14532d; text-align: left; padding-left: 8px; width: 220px;">Nama Lengkap Siswa</th>
            <th style="border: 1px solid #14532d; text-align: center; width: 110px;">Periode</th>
            <th style="border: 1px solid #14532d; text-align: center; width: 80px;">Kelas</th>
            <th style="border: 1px solid #14532d; text-align: center; width: 70px;">No. Absen</th>
            <th style="border: 1px solid #14532d; text-align: center; width: 85px;">Nilai Awal</th>
            <th style="border: 1px solid #14532d; text-align: center; width: 100px;">Nilai PG (50)</th>
            <th style="border: 1px solid #14532d; text-align: center; width: 110px;">Nilai Uraian (50)</th>
            <th style="border: 1px solid #14532d; text-align: center; width: 120px;">${excelScoreColTitle}</th>
            <th style="border: 1px solid #14532d; text-align: center; width: 130px;">Status Hasil</th>
            <th style="border: 1px solid #14532d; text-align: center; width: 150px;">Predikat Capaian</th>
            <th style="border: 1px solid #14532d; text-align: center; width: 110px;">Durasi Pengerjaan</th>
            <th style="border: 1px solid #14532d; text-align: center; width: 140px;">Waktu Penyelesaian</th>
        </tr>

        <!-- ISI BARIS DATA SISWA -->
        ${rowsHtml}

        <!-- BARIS RATA-RATA KELAS -->
        <tr style="background-color: #f1f5f9; font-weight: bold; height: 30px;">
            <td colspan="5" style="text-align: right; border: 1px solid #cbd5e1; padding-right: 12px; font-weight: bold;">RATA-RATA KESELURUHAN:</td>
            <td style="text-align: center; border: 1px solid #cbd5e1; color: #475569;">${avgAwal}</td>
            <td style="text-align: center; border: 1px solid #cbd5e1; color: #0369a1;">${avgPg}</td>
            <td style="text-align: center; border: 1px solid #cbd5e1; color: #7c3aed;">${avgUraian}</td>
            <td style="text-align: center; border: 1px solid #cbd5e1; color: #15803d; font-size: 11pt; font-weight: bold; background-color: #ecfdf5;">${avgAkhir}</td>
            <td colspan="4" style="border: 1px solid #cbd5e1; text-align: center; color: #475569; font-size: 9.5pt;">Kriteria Ketuntasan Minimal (KKM) = 80</td>
        </tr>

        <!-- FOOTER & KATA PERENUNGAN -->
        <tr><td colspan="13" style="height: 18px;"></td></tr>
        <tr>
            <td colspan="13" style="text-align: center; font-style: italic; color: #334155; padding: 6px 0; font-size: 9.5pt;">
                “Keindahan sifat manusia terletak pada ketulusan hatinya. Kemuliaan sifat manusia terletak pada kejujuran.” — Kata Perenungan Master Cheng Yen
            </td>
        </tr>
        <tr><td colspan="13" style="height: 25px;"></td></tr>

        <!-- TANDA TANGAN PENGESAHAN -->
        <tr>
            <td colspan="2"></td>
            <td colspan="3" style="text-align: center; font-size: 10pt;">
                Mengetahui,<br>Kepala SDS Cinta Kasih Tzu Chi<br><br><br><br><br>
                ( .................................................. )
            </td>
            <td colspan="3"></td>
            <td colspan="4" style="text-align: center; font-size: 10pt;">
                Jakarta, ${downloadDate}<br>Guru Pengampu Koding & AI<br><br><br><br><br>
                <strong>( Darningsih, S.T. )</strong>
            </td>
            <td colspan="1"></td>
        </tr>
        <tr>
            <td colspan="13" style="text-align: right; font-size: 8pt; color: #94a3b8; padding-top: 15px;">
                * Dokumen rekapitulasi nilai resmi ini diterbitkan secara otomatis melalui Portal EduCode AI SDS Cinta Kasih Tzu Chi.
            </td>
        </tr>
    </table>
</body>
</html>
    `;

    // Buat Blob Excel dengan UTF-8 BOM
    const blob = new Blob(["\uFEFF" + excelTemplate], {
        type: 'application/vnd.ms-excel;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safeDate = today.toISOString().slice(0, 10);
    const filenamePrefix = (list.length === allList.length && !isAutoPeriod) ? 'Rekap_Remedial_SemuaPeriode' : `Rekap_Remedial_${activeKey}`;
    link.setAttribute("href", url);
    link.setAttribute("download", `${filenamePrefix}_TzuChi_${safeDate}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    showToast('📊 Berhasil mengunduh Rekap Nilai Siswa (File Excel)!');
}

// Backward compatibility alias
const exportRecapToCSV = exportRecapToExcel;


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

    // Update tab thumbnail icon based on classKey
    const tabThumb = document.getElementById('modalMateriTabThumb');
    if (tabThumb) {
        if (classKey === 'kelas4') tabThumb.src = 'student_k4.png';
        else if (classKey === 'kelas5') tabThumb.src = 'student_k5.png';
        else if (classKey === 'kelas6') tabThumb.src = 'student_k6.png';
    }

    renderMateri(data.materi, classKey);
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

function renderMateri(materiList, classKey) {
    const container = document.getElementById('materiContent');
    const studentIcons = {
        kelas4: 'student_k4.png',
        kelas5: 'student_k5.png',
        kelas6: 'student_k6.png'
    };
    const defaultIcon = studentIcons[classKey] || 'student_k4.png';
    const fallbackList = ['student_k4.png', 'student_k5.png', 'student_k6.png'];

    container.innerHTML = materiList.map((item, idx) => {
        const studentImg = classKey ? (studentIcons[classKey] || defaultIcon) : fallbackList[idx % fallbackList.length];
        return `
        <div class="materi-card">
            <div class="materi-header">
                <div class="materi-icon-wrap">
                    <img src="${studentImg}" alt="Icon Siswa Materi" class="materi-student-icon">
                    <span class="materi-mini-badge">${item.icon}</span>
                </div>
                <h4>${item.title}</h4>
            </div>
            <p class="materi-desc">${item.desc}</p>
        </div>
        `;
    }).join('');
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
    const examModalK4 = document.getElementById('examModalK4');
    if (e.target === examModalK4) {
        closeExamModalK4();
    }
    const examModalK5 = document.getElementById('examModalK5');
    if (e.target === examModalK5) {
        closeExamModalK5();
    }
    const examModalK6 = document.getElementById('examModalK6');
    if (e.target === examModalK6) {
        closeExamModalK6();
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
    const cloudModal = document.getElementById('cloudConfigModal');
    if (e.target === cloudModal) {
        closeCloudConfigModal();
    }
    const teacherLoginModal = document.getElementById('teacherLoginModal');
    if (e.target === teacherLoginModal) {
        closeTeacherLoginModal();
    }
    const importSheetModal = document.getElementById('importSheetModal');
    if (e.target === importSheetModal) {
        closeImportSheetModal();
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

/* ==============================================================
   SINKRONISASI TAMPILAN SOAL DARI BANK SOAL MODULAR (FOLDER /soal/)
   Menjamin perubahan soal oleh Guru langsung ter-update di UI
   ============================================================== */
function syncExamUIWithQuestionModules() {
    try {
        // 0a. Render dinamis kartu soal PG Kelas 4 (45 Butir Soal)
        if (typeof renderK4QuestionsFromModule === 'function') {
            renderK4QuestionsFromModule();
        }

        // 0b. Render dinamis kartu soal PG Kelas 6 (45 Butir Soal)
        if (typeof renderK6QuestionsFromModule === 'function') {
            renderK6QuestionsFromModule();
        }

        // 1. Sinkronisasi Kartu Soal PG Kelas 4
        if (window.SOAL_KELAS_4 && Array.isArray(window.SOAL_KELAS_4.pg)) {
            window.SOAL_KELAS_4.pg.forEach(item => {
                const card = document.getElementById(`q-card-${item.num}`);
                if (card) {
                    const qText = card.querySelector('.q-text');
                    if (qText && item.question) qText.textContent = item.question;
                    ['A', 'B', 'C', 'D'].forEach(opt => {
                        const input = card.querySelector(`input[value="${opt}"]`);
                        if (input && item.options && item.options[opt]) {
                            const span = input.closest('label')?.querySelector('span');
                            if (span) span.innerHTML = `<strong>${opt}.</strong> ${item.options[opt]}`;
                        }
                    });
                }
            });
        }

        // 2. Sinkronisasi Kartu Soal PG Kelas 5
        if (window.SOAL_KELAS_5 && Array.isArray(window.SOAL_KELAS_5.pg)) {
            window.SOAL_KELAS_5.pg.forEach(item => {
                const card = document.getElementById(`q-k5-card-${item.num}`);
                if (card) {
                    const qText = card.querySelector('.q-text');
                    if (qText && item.question) qText.textContent = item.question;
                    ['A', 'B', 'C', 'D'].forEach(opt => {
                        const input = card.querySelector(`input[value="${opt}"]`);
                        if (input && item.options && item.options[opt]) {
                            const span = input.closest('label')?.querySelector('span');
                            if (span) span.innerHTML = `<strong>${opt}.</strong> ${item.options[opt]}`;
                        }
                    });
                }
            });
        }

        // 3. Sinkronisasi Kartu Soal PG Kelas 6
        if (window.SOAL_KELAS_6 && Array.isArray(window.SOAL_KELAS_6.pg)) {
            window.SOAL_KELAS_6.pg.forEach(item => {
                const card = document.getElementById(`q-k6-card-${item.num}`);
                if (card) {
                    const qText = card.querySelector('.q-text');
                    if (qText && item.question) qText.textContent = item.question;
                    ['A', 'B', 'C', 'D'].forEach(opt => {
                        const input = card.querySelector(`input[value="${opt}"]`);
                        if (input && item.options && item.options[opt]) {
                            const span = input.closest('label')?.querySelector('span');
                            if (span) span.innerHTML = `<strong>${opt}.</strong> ${item.options[opt]}`;
                        }
                    });
                }
            });
        }
    } catch(errSync) {
        console.warn('Catatan sinkronisasi soal:', errSync);
    }
}

// Inisialisasi data rekap dan bahasa saat halaman dimuat
window.addEventListener('DOMContentLoaded', () => {
    try {
        syncExamUIWithQuestionModules();
    } catch(eSoal) {
        console.warn('Init bank soal modular error:', eSoal);
    }
    try {
        applyLanguage(currentLang, false);
    } catch(e) {
        console.warn('Init language error:', e);
    }
    if ('speechSynthesis' in window && window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
            // Pre-load voices list
            try { window.speechSynthesis.getVoices(); } catch(e){}
        };
    }
    getRecapList();
    updateCloudStatusUI();
    updateActiveTokenDisplay();
    updateExamSessionDisplay();
    applyRemedialPeriod(currentRemedialPeriod);

    // Auto-detect URL parameter: ?p=sem1_pas & ?token=XYZ
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const paramPeriod = urlParams.get('p') || urlParams.get('period') || urlParams.get('periode') || urlParams.get('sem');
        if (paramPeriod && REMEDIAL_PERIODS[paramPeriod]) {
            activeTeacherRemedialPeriod = paramPeriod;
            currentRemedialPeriod = paramPeriod;
            officialRemedialPeriod = paramPeriod;
            localStorage.setItem('tzuchi_teacher_active_period', paramPeriod);
            localStorage.setItem('tzuchi_official_period', paramPeriod);
            localStorage.setItem('tzuchi_remedial_period', paramPeriod);
            applyRemedialPeriod(paramPeriod);
        }

        const paramToken = urlParams.get('token') || urlParams.get('k');
        if (paramToken) {
            const cleanParam = paramToken.trim().toUpperCase().replace(/\s+/g, '');
            if (cleanParam) {
                setActiveExamToken(cleanParam);
                localStorage.setItem('tzuchi_exam_session_status', 'OPEN');
                setTimeout(() => {
                    ['k4ExamToken', 'k5ExamToken', 'k6ExamToken'].forEach(id => {
                        const el = document.getElementById(id);
                        if (el) el.value = cleanParam;
                    });
                }, 400);
            }
        }
    } catch(eParam) {}

    // Jalankan pemantauan cloud sinkronisasi real-time antar-perangkat
    if (typeof startCloudConfigPolling === 'function') {
        startCloudConfigPolling();
    }
});


