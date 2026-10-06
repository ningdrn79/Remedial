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
        midSemester: "Mid Semester 1",
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
        midSemester: "Mid Semester 1",
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

    if (announceVoice) {
        showToast((lang === 'en') ? '🌐 Switched to English' : '🌐 Beralih ke Indonesian');
        speakText(t.voiceAnnouncement, lang);
    }
}

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
    if (!isExamSessionOpen()) {
        playCuteSound('pop');
        alert("⛔ AKSES UJIAN SEDANG DITUTUP!\n\nUjian remedial saat ini sedang dikunci oleh Ibu Guru Darningsih, S.T.\n\nSiswa tidak diperkenankan mengerjakan ujian sendiri di luar jam kelas/pengawasan. Silakan tunggu instruksi guru di ruang kelas.");
        return;
    }
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
    const tokenInput = document.getElementById('k4ExamToken');
    const enteredToken = tokenInput ? tokenInput.value.trim().toUpperCase() : '';
    const correctToken = getActiveExamToken();

    if (!isExamSessionOpen()) {
        playCuteSound('pop');
        alert("⛔ AKSES UJIAN SEDANG DITUTUP!\n\nUjian remedial saat ini sedang dikunci oleh Ibu Guru Darningsih, S.T.\n\nSiswa tidak diperkenankan mengerjakan ujian sendiri di luar jam kelas/pengawasan.");
        return;
    }

    if (!classChecked) {
        showToast('⚠️ Silakan pilih salah satu kelas (4A - 4E)!');
        return;
    }

    // 1. Validasi Token Ujian dari Guru (Live Token)
    if (enteredToken !== correctToken) {
        playCuteSound('pop');
        alert(`⚠️ TOKEN UJIAN SALAH!\n\nToken yang kamu masukkan "${enteredToken || '(kosong)'}" tidak cocok.\n\nSilakan periksa kode token di papan tulis kelas atau tanyakan kepada Guru pengawas.`);
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
        alert(`⚠️ SISWA INI SUDAH PERNAH MENGERJAKAN!\n\nNama "${name}" di Kelas ${selectedClass} sudah tercatat menyelesaikan ujian remedial.\n\nSatu siswa hanya boleh mengerjakan 1 kali. Jika ada kendala teknis atau perlu remedial ulang, silakan lapor kepada Guru pengawas.`);
        return;
    }

    currentStudentData = {
        name: name,
        kelas: selectedClass,
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
        status: totalScore >= 80 ? 'LULUS REMEDIAL' : 'TUNTAS REMEDIAL',
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
        predicateBadge.innerText = '🌟 LULUS REMEDIAL DENGAN GEMILANG!';
        predicateBadge.style.background = 'linear-gradient(135deg, #059669, #10b981)';
        motivationTitle.innerHTML = `Luar Biasa, ${studentName}! Prestasi yang Sangat Membanggakan! 🎉`;
        motivationMessage.innerHTML = `
            Selamat atas keberhasilanmu! Usaha keras, ketelitian, dan ketulusan hatimu dalam belajar Koding dan Kecerdasan Artifisial hari ini membuahkan hasil yang luar biasa!
            <br><br>
            Kamu telah membuktikan bahwa dengan ketekunan, rumus Excel dan logika AI bisa kamu kuasai dengan sangat baik. Teruslah pertahankan semangat belajar yang tinggi dan jadilah inspirasi bagi teman-temanmu! 🚀✨
        `;
    } else if (totalScore >= 80) {
        mascotIcon.innerText = '🎉';
        predicateBadge.innerText = '✨ DINYATAKAN LULUS REMEDIAL (KKM 80)!';
        predicateBadge.style.background = 'linear-gradient(135deg, #0284c7, #38bdf8)';
        motivationTitle.innerHTML = `Kerja Bagus, ${studentName}! Terus Melangkah Maju! 💡`;
        motivationMessage.innerHTML = `
            Hebat sekali! Skor remedialmu berhasil melampaui batas KKM 80 dan menunjukkan peningkatan pemahaman yang sangat bagus dan menggembirakan.
            <br><br>
            Koding dan logika komputer itu seperti petualangan seru: semakin sering kamu berlatih, pikiranmu akan semakin kreatif dan tangguh! Tetaplah rajin membaca, mempraktikkan rumus-rumus koding, dan jangan pernah ragu untuk terus mencoba hal-hal baru ya! Robi dan Bapak/Ibu Guru sangat bangga padamu! 🌱
        `;
    } else {
        mascotIcon.innerText = '💪';
        predicateBadge.innerText = '📖 PERLU PENGAYAAN & TETAP SEMANGAT!';
        predicateBadge.style.background = 'linear-gradient(135deg, #f59e0b, #ea580c)';
        motivationTitle.innerHTML = `Jangan Pernah Menyerah, ${studentName}! Kamu Pasti Bisa! 💖`;
        motivationMessage.innerHTML = `
            Terima kasih banyak sudah berani berusaha dan mengerjakan soal remedial ini dengan jujur dan mandiri!
            <br><br>
            Meskipun nilaimu belum mencapai batas KKM 80, setiap kesalahan (*bug*) dalam dunia koding adalah sahabat terbaik yang mengajarkan kita untuk menjadi lebih teliti dan bijaksana. Jangan berkecil hati ya! Tetap tersenyum, teruslah berlatih bersama Bapak/Ibu Guru dan Robi. Selangkah demi selangkah, kamu pasti bisa mencapai nilai terbaik! 🤖✨
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
        status: totalScore >= 80 ? 'Lulus' : 'Tuntas',
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

const pgQuestionsK5Metadata = [
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

function openRemedialKelas5() {
    playCuteSound('pop');
    if (!isExamSessionOpen()) {
        playCuteSound('pop');
        alert("⛔ AKSES UJIAN SEDANG DITUTUP!\n\nUjian remedial saat ini sedang dikunci oleh Ibu Guru Darningsih, S.T.\n\nSiswa tidak diperkenankan mengerjakan ujian sendiri di luar jam kelas/pengawasan. Silakan tunggu instruksi guru di ruang kelas.");
        return;
    }
    const modal = document.getElementById('examModalK5');
    if (!modal) return;
    modal.classList.add('open');

    showExamStepK5('identity');

    const bubble = document.getElementById('mascotBubble');
    if (bubble) {
        bubble.innerHTML = `<span>Selamat datang di Remedial Kelas 5D! Masukkan nama, nilai awal, dan nomor absenmu. Waktu: 60 Menit ⏰</span>`;
    }
}

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
    const correctToken = getActiveExamToken();

    const selectedClass = classChecked ? classChecked.value : '5D';

    if (!isExamSessionOpen()) {
        playCuteSound('pop');
        alert("⛔ AKSES UJIAN SEDANG DITUTUP!\n\nUjian remedial saat ini sedang dikunci oleh Ibu Guru Darningsih, S.T.\n\nSiswa tidak diperkenankan mengerjakan ujian sendiri di luar jam kelas/pengawasan.");
        return;
    }

    // 1. Validasi Token Ujian dari Guru (Live Token)
    if (enteredToken !== correctToken) {
        playCuteSound('pop');
        alert(`⚠️ TOKEN UJIAN SALAH!\n\nToken yang kamu masukkan "${enteredToken || '(kosong)'}" tidak cocok.\n\nSilakan periksa kode token di papan tulis kelas atau tanyakan kepada Guru pengawas.`);
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
        alert(`⚠️ SISWA INI SUDAH PERNAH MENGERJAKAN!\n\nNama "${name}" di Kelas ${selectedClass} sudah tercatat menyelesaikan ujian remedial.\n\nSatu siswa hanya boleh mengerjakan 1 kali. Jika ada kendala teknis atau perlu remedial ulang, silakan lapor kepada Guru pengawas.`);
        return;
    }

    currentStudentDataK5 = {
        name: name,
        kelas: selectedClass,
        nilaiAwal: parseInt(nilaiAwal) || 0,
        absen: absen
    };

    document.getElementById('barStudentNameK5').innerText = currentStudentDataK5.name;
    document.getElementById('barStudentClassK5').innerText = `Kelas ${currentStudentDataK5.kelas}`;
    document.getElementById('barStudentInitialScoreK5').innerText = currentStudentDataK5.nilaiAwal;

    startCountdownTimerK5();

    showExamStepK5('questions');
    showToast(`Selamat mengerjakan remedial Kelas 5, ${name}! Waktu: 60 Menit ⏰`);
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

    completedExamScoresK5 = {
        initial: currentStudentDataK5.nilaiAwal,
        pg: pgScore,
        uraian: uraianScore,
        final: totalScore,
        status: totalScore >= 80 ? 'LULUS REMEDIAL' : 'TUNTAS REMEDIAL',
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
        predicateBadge.innerText = '🌟 LULUS REMEDIAL DENGAN GEMILANG!';
        predicateBadge.style.background = 'linear-gradient(135deg, #059669, #10b981)';
        motivationTitle.innerHTML = `Luar Biasa, ${studentName}! Presentasimu Sangat Memukau! 🚀`;
        motivationMessage.innerHTML = `
            Selamat atas keberhasilanmu! Usaha keras, ketelitian, dan kejujuranmu dalam memahami konsep Microsoft PowerPoint, efek transisi, serta kecerdasan buatan (AI) pembuat slide hari ini membuahkan hasil yang luar biasa!
            <br><br>
            Kamu telah membuktikan bahwa dengan ketekunan, kamu bisa menjadi pembuat presentasi yang kreatif dan andal. Teruslah bereksplorasi dengan berbagai ide visual yang hebat dan jadilah inspirasi bagi teman-temanmu! ✨📊
        `;
    } else if (totalScore >= 80) {
        mascotIcon.innerText = '🎉';
        predicateBadge.innerText = '✨ DINYATAKAN LULUS REMEDIAL (KKM 80)!';
        predicateBadge.style.background = 'linear-gradient(135deg, #0284c7, #38bdf8)';
        motivationTitle.innerHTML = `Kerja Bagus, ${studentName}! Terus Kembangkan Kreasimu! 💡`;
        motivationMessage.innerHTML = `
            Hebat sekali! Skor remedialmu berhasil melampaui batas KKM 80 dan membuktikan pemahaman yang sangat baik dalam mendesain slide presentasi dan memanfaatkan teknologi AI.
            <br><br>
            Presentasi adalah media komunikasi masa depan: semakin sering kamu berlatih memadukan teks, gambar, dan transisi, presentasimu akan semakin keren dan mengagumkan! Tetaplah rajin berlatih bersama Ibu Guru Darningsih ya! 🌱
        `;
    } else {
        mascotIcon.innerText = '💪';
        predicateBadge.innerText = '📖 PERLU PENGAYAAN & TETAP SEMANGAT!';
        predicateBadge.style.background = 'linear-gradient(135deg, #f59e0b, #ea580c)';
        motivationTitle.innerHTML = `Jangan Pernah Menyerah, ${studentName}! Kamu Pasti Bisa! 💖`;
        motivationMessage.innerHTML = `
            Terima kasih banyak sudah berusaha dan mengerjakan soal remedial ini secara mandiri dan jujur!
            <br><br>
            Meskipun nilaimu belum mencapai batas KKM 80, setiap tantangan adalah kesempatan terbaik untuk mengasah kreativitas kita. Jangan berkecil hati ya! Pelajari kembali menu-menu PowerPoint dan cara membuat prompt AI. Teruslah mencoba bersama Bapak/Ibu Guru, kamu pasti akan menjadi ahli presentasi yang hebat! 🤖✨
        `;
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
        status: totalScore >= 80 ? 'Lulus' : 'Tuntas',
        predicate: completedExamScoresK5.predicate,
        duration: examDurationTextK5,
        timestamp: timeString,
        date: dateFormatted,
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
    showToast(`Nilai Akhir Remedial Kelas 5: ${totalScore}! 🌟 (Waktu: ${examDurationTextK5})`);
}

function generateAndDownloadPDFK5() {
    playCuteSound('pop');
    showToast('📄 Sedang menyusun dokumen PDF Kelas 5...');

    const today = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('id-ID', options);

    document.getElementById('pdfReportNameK5').innerText = currentStudentDataK5.name || 'Siswa Kelas 5';
    document.getElementById('pdfReportClassK5').innerText = `Kelas ${currentStudentDataK5.kelas || '5D'}`;
    document.getElementById('pdfReportAbsenK5').innerText = currentStudentDataK5.absen || '-';
    document.getElementById('pdfReportDurationK5').innerText = `${examDurationTextK5} (Batas: 60 Menit)`;
    document.getElementById('pdfReportDateK5').innerText = formattedDate;

    document.getElementById('pdfReportInitialScoreK5').innerText = completedExamScoresK5.initial;
    document.getElementById('pdfReportPgScoreK5').innerText = `${completedExamScoresK5.pg} / 50 Poin`;
    document.getElementById('pdfReportUraianScoreK5').innerText = `${completedExamScoresK5.uraian} / 50 Poin`;
    document.getElementById('pdfReportFinalScoreK5').innerText = completedExamScoresK5.final;

    document.getElementById('pdfReportStatusK5').innerText = completedExamScoresK5.status;
    document.getElementById('pdfReportPredicateK5').innerText = completedExamScoresK5.predicate;
    document.getElementById('pdfReportLocationDateK5').innerText = `Jakarta, ${formattedDate}`;

    const element = document.getElementById('pdfDocumentElementK5');
    const safeStudentName = (currentStudentDataK5.name || 'Siswa_K5').replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `Laporan_Remedial_${safeStudentName}_Kelas_${currentStudentDataK5.kelas}.pdf`;

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
            showToast('✅ Berhasil mengunduh Laporan Remedial Kelas 5 (PDF)!');
        }).catch(err => {
            console.error('Error generating PDF:', err);
            window.print();
        });
    } else {
        window.print();
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

const pgQuestionsK6Metadata = [
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

function openRemedialKelas6() {
    playCuteSound('pop');
    if (!isExamSessionOpen()) {
        playCuteSound('pop');
        alert("⛔ AKSES UJIAN SEDANG DITUTUP!\n\nUjian remedial saat ini sedang dikunci oleh Ibu Guru Darningsih, S.T.\n\nSiswa tidak diperkenankan mengerjakan ujian sendiri di luar jam kelas/pengawasan. Silakan tunggu instruksi guru di ruang kelas.");
        return;
    }
    const modal = document.getElementById('examModalK6');
    if (!modal) return;
    modal.classList.add('open');

    showExamStepK6('identity');

    const bubble = document.getElementById('mascotBubble');
    if (bubble) {
        bubble.innerHTML = `<span>Selamat datang di Remedial Kelas 6! Masukkan nama, nilai awal, dan pilih kelasmu (6A-6E). Waktu: 60 Menit ⏰</span>`;
    }
}

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
    const correctToken = getActiveExamToken();

    if (!isExamSessionOpen()) {
        playCuteSound('pop');
        alert("⛔ AKSES UJIAN SEDANG DITUTUP!\n\nUjian remedial saat ini sedang dikunci oleh Ibu Guru Darningsih, S.T.\n\nSiswa tidak diperkenankan mengerjakan ujian sendiri di luar jam kelas/pengawasan.");
        return;
    }

    if (!classChecked) {
        showToast('⚠️ Silakan pilih salah satu kelas (6A - 6E)!');
        return;
    }

    // 1. Validasi Token Ujian dari Guru (Live Token)
    if (enteredToken !== correctToken) {
        playCuteSound('pop');
        alert(`⚠️ TOKEN UJIAN SALAH!\n\nToken yang kamu masukkan "${enteredToken || '(kosong)'}" tidak cocok.\n\nSilakan periksa kode token di papan tulis kelas atau tanyakan kepada Guru pengawas.`);
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
        alert(`⚠️ SISWA INI SUDAH PERNAH MENGERJAKAN!\n\nNama "${name}" di Kelas ${selectedClass} sudah tercatat menyelesaikan ujian remedial.\n\nSatu siswa hanya boleh mengerjakan 1 kali. Jika ada kendala teknis atau perlu remedial ulang, silakan lapor kepada Guru pengawas.`);
        return;
    }

    currentStudentDataK6 = {
        name: name,
        kelas: selectedClass,
        nilaiAwal: parseInt(nilaiAwal) || 0,
        absen: absen
    };

    document.getElementById('barStudentNameK6').innerText = currentStudentDataK6.name;
    document.getElementById('barStudentClassK6').innerText = `Kelas ${currentStudentDataK6.kelas}`;
    document.getElementById('barStudentInitialScoreK6').innerText = currentStudentDataK6.nilaiAwal;

    startCountdownTimerK6();

    showExamStepK6('questions');
    showToast(`Selamat mengerjakan remedial Kelas 6, ${name}! Waktu: 60 Menit ⏰`);
}

function calculateAndShowScoreK6(event) {
    event.preventDefault();
    playCuteSound('fanfare');

    let pgScore = 0;
    const collectedPgAnswers = [];

    // 1. Evaluate 10 Multiple Choice Questions (Bobot: 5 poin per soal = 50 poin max)
    for (let i = 0; i < pgQuestionsK6Metadata.length; i++) {
        const item = pgQuestionsK6Metadata[i];
        const selected = document.querySelector(`input[name="pg_k6_${item.num}"]:checked`);
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

    // Uraian 1 (No. 11): Codingan Menggerakkan Objek dengan Keyboard
    const rawAns1 = (document.getElementById('uraian_k6_1') ? document.getElementById('uraian_k6_1').value.trim() : '');
    const ans1 = rawAns1.toLowerCase();
    const hasFlag = ans1.includes('flag') || ans1.includes('bendera') || ans1.includes('event');
    const hasLoop = ans1.includes('forever') || ans1.includes('selamanya') || ans1.includes('loop') || ans1.includes('ulang');
    const hasKey = ans1.includes('right') || ans1.includes('kanan') || ans1.includes('panah') || ans1.includes('arrow') || ans1.includes('key') || ans1.includes('tombol') || ans1.includes('pressed') || ans1.includes('tekan');
    const hasMotion = ans1.includes('change x') || ans1.includes('move') || ans1.includes('gerak') || ans1.includes('langkah') || ans1.includes('10');
    
    let u1Pts = 0;
    const matchesCount = [hasFlag, hasLoop, hasKey, hasMotion].filter(Boolean).length;
    if (matchesCount >= 3) {
        u1Pts = 10;
    } else if (matchesCount === 2) {
        u1Pts = 8;
    } else if (matchesCount === 1) {
        u1Pts = 5;
    } else if (rawAns1.length > 5) {
        u1Pts = 3;
    }
    uraianScore += u1Pts;
    collectedUraianAnswers.push({
        num: 1,
        question: "11. Codingan Menggerakkan Objek dengan Keyboard (Scratch)",
        userAnswer: rawAns1 || "(Tidak diisi)",
        keyRef: "Susunan blok kode di Scratch yang menggunakan kejadian tombol ditekan (events): memasang blok When [Green Flag] clicked, diikuti blok forever, lalu kondisi if <key [right arrow] pressed?> then dengan perintah change x by 10, serta kondisi if <key [left arrow] pressed?> then dengan perintah change x by -10 (atau move 10 steps).",
        points: u1Pts,
        keterangan: u1Pts >= 10 ? "✔ Sangat Tepat: Blok Event, Loop Forever, Sensing Key Pressed, dan Motion Change X tersusun dengan benar." : getUraianKeterangan(u1Pts)
    });

    // Uraian 2 (No. 12): Nama Blok Kode Berdasarkan Perintah
    const raw2a = (document.getElementById('uraian_k6_2_a') ? document.getElementById('uraian_k6_2_a').value.trim() : '');
    const raw2b = (document.getElementById('uraian_k6_2_b') ? document.getElementById('uraian_k6_2_b').value.trim() : '');
    const raw2c = (document.getElementById('uraian_k6_2_c') ? document.getElementById('uraian_k6_2_c').value.trim() : '');
    const raw2d = (document.getElementById('uraian_k6_2_d') ? document.getElementById('uraian_k6_2_d').value.trim() : '');

    const ans2a = raw2a.toLowerCase();
    const ans2b = raw2b.toLowerCase();
    const ans2c = raw2c.toLowerCase();
    const ans2d = raw2d.toLowerCase();

    let u2Pts = 0;
    if (ans2a.includes('looks') || ans2a.includes('tampilan') || ans2a.includes('look') || ans2a.includes('kostum')) u2Pts += 2.5;
    if (ans2b.includes('variable') || ans2b.includes('variabel') || ans2b.includes('data')) u2Pts += 2.5;
    if (ans2c.includes('sensing') || ans2c.includes('sensor') || ans2c.includes('sentuh')) u2Pts += 2.5;
    if (ans2d.includes('looks') || ans2d.includes('tampilan') || ans2d.includes('look')) u2Pts += 2.5;

    u2Pts = Math.round(u2Pts);
    uraianScore += u2Pts;
    collectedUraianAnswers.push({
        num: 2,
        question: "12. Nama Blok Kode Berdasarkan Perintah (next costume, set lives to 0, touching Goblin?, show/hide)",
        userAnswer: `A: ${raw2a || '-'} | B: ${raw2b || '-'} | C: ${raw2c || '-'} | D: ${raw2d || '-'}`,
        keyRef: "A (next costume): Blok Looks (Tampilan) | B (set lives to 0): Blok Variables (Variabel) | C (touching Goblin?): Blok Sensing (Sensor) | D (show/hide): Blok Looks (Tampilan)",
        points: u2Pts,
        keterangan: u2Pts === 10 ? "✔ Sempurna: Keempat kategori kelompok blok (Looks, Variables, Sensing, Looks) dijawab dengan tepat." : `⚠ Memperoleh ${u2Pts}/10 poin. Kunci: Looks, Variables, Sensing, Looks.`
    });

    // Uraian 3 (No. 13): Nama dan Fungsi Gambar Ikon di Aplikasi Scratch
    const raw3a = (document.getElementById('uraian_k6_3_a') ? document.getElementById('uraian_k6_3_a').value.trim() : '');
    const raw3b = (document.getElementById('uraian_k6_3_b') ? document.getElementById('uraian_k6_3_b').value.trim() : '');
    const ans3a = raw3a.toLowerCase();
    const ans3b = raw3b.toLowerCase();

    let u3Pts = 0;
    if (ans3a.includes('sprite') || ans3a.includes('karakter') || ans3a.includes('kucing') || ans3a.includes('tokoh') || ans3a.includes('objek')) {
        u3Pts += 5;
    } else if (raw3a.length > 3) {
        u3Pts += 2;
    }

    if (ans3b.includes('backdrop') || ans3b.includes('background') || ans3b.includes('latar') || ans3b.includes('panggung') || ans3b.includes('stage')) {
        u3Pts += 5;
    } else if (raw3b.length > 3) {
        u3Pts += 2;
    }

    uraianScore += u3Pts;
    collectedUraianAnswers.push({
        num: 3,
        question: "13. Nama dan Fungsi Gambar Ikon di Aplikasi Scratch (Ikon A & B)",
        userAnswer: `Gambar A: ${raw3a || '-'} | Gambar B: ${raw3b || '-'}`,
        keyRef: "Gambar A (Ikon Kucing +): Bernama Choose a Sprite (Pilih Sprite), berfungsi untuk menambahkan karakter atau objek baru ke dalam proyek. | Gambar B (Ikon Latar +): Bernama Choose a Backdrop (Pilih Latar Belakang), berfungsi untuk menambahkan gambar latar belakang pada panggung (stage) proyek.",
        points: u3Pts,
        keterangan: u3Pts === 10 ? "✔ Sangat Tepat: Nama tombol dan fungsi Choose a Sprite & Choose a Backdrop dijawab dengan benar." : getUraianKeterangan(u3Pts)
    });

    // Uraian 4 (No. 14): Contoh Perintah dalam Blok Motion dan Control
    const raw4Motion = (document.getElementById('uraian_k6_4_motion') ? document.getElementById('uraian_k6_4_motion').value.trim() : '');
    const raw4Control = (document.getElementById('uraian_k6_4_control') ? document.getElementById('uraian_k6_4_control').value.trim() : '');
    const ans4Motion = raw4Motion.toLowerCase();
    const ans4Control = raw4Control.toLowerCase();

    let u4Pts = 0;
    const isMotionGood = ans4Motion.includes('move') || ans4Motion.includes('turn') || ans4Motion.includes('go to') || ans4Motion.includes('glide') || ans4Motion.includes('point') || ans4Motion.includes('change x') || ans4Motion.includes('set x') || ans4Motion.includes('langkah') || ans4Motion.includes('gerak');
    if (isMotionGood) u4Pts += 5; else if (raw4Motion.length > 3) u4Pts += 2;

    const isControlGood = ans4Control.includes('wait') || ans4Control.includes('repeat') || ans4Control.includes('forever') || ans4Control.includes('if') || ans4Control.includes('then') || ans4Control.includes('stop') || ans4Control.includes('clone') || ans4Control.includes('ulang');
    if (isControlGood) u4Pts += 5; else if (raw4Control.length > 3) u4Pts += 2;

    uraianScore += u4Pts;
    collectedUraianAnswers.push({
        num: 4,
        question: "14. Contoh Perintah dalam Blok Motion dan Control",
        userAnswer: `Blok Motion: ${raw4Motion || '-'} | Blok Control: ${raw4Control || '-'}`,
        keyRef: "Blok Motion: move 10 steps dan turn right 15 degrees (atau go to x: y:). | Blok Control: wait 1 secs dan repeat 10 (atau forever, if ... then).",
        points: u4Pts,
        keterangan: u4Pts === 10 ? "✔ Sangat Tepat: Contoh blok Motion dan Control dituliskan dengan benar." : getUraianKeterangan(u4Pts)
    });

    // Uraian 5 (No. 15): Empat Pilar Computational Thinking
    const raw5Dek = (document.getElementById('uraian_k6_5_dekomposisi') ? document.getElementById('uraian_k6_5_dekomposisi').value.trim() : '');
    const raw5Pola = (document.getElementById('uraian_k6_5_pola') ? document.getElementById('uraian_k6_5_pola').value.trim() : '');
    const raw5Abs = (document.getElementById('uraian_k6_5_abstraksi') ? document.getElementById('uraian_k6_5_abstraksi').value.trim() : '');
    const raw5Alg = (document.getElementById('uraian_k6_5_algoritma') ? document.getElementById('uraian_k6_5_algoritma').value.trim() : '');

    const ans5Dek = raw5Dek.toLowerCase();
    const ans5Pola = raw5Pola.toLowerCase();
    const ans5Abs = raw5Abs.toLowerCase();
    const ans5Alg = raw5Alg.toLowerCase();

    let u5Pts = 0;
    if (ans5Dek.includes('dekomposisi') || ans5Dek.includes('decomposition') || ans5Dek.includes('pecah') || ans5Dek.includes('bagi') || ans5Dek.includes('kecil')) u5Pts += 2.5; else if (raw5Dek.length > 2) u5Pts += 1;
    if (ans5Pola.includes('pola') || ans5Pola.includes('pattern') || ans5Pola.includes('sama') || ans5Pola.includes('kemiripan') || ans5Pola.includes('recognition')) u5Pts += 2.5; else if (raw5Pola.length > 2) u5Pts += 1;
    if (ans5Abs.includes('abstraksi') || ans5Abs.includes('abstraction') || ans5Abs.includes('penting') || ans5Abs.includes('abaikan') || ans5Abs.includes('detail')) u5Pts += 2.5; else if (raw5Abs.length > 2) u5Pts += 1;
    if (ans5Alg.includes('algoritma') || ans5Alg.includes('algorithm') || ans5Alg.includes('langkah') || ans5Alg.includes('urutan') || ans5Alg.includes('runtut') || ans5Alg.includes('logis')) u5Pts += 2.5; else if (raw5Alg.length > 2) u5Pts += 1;

    u5Pts = Math.round(u5Pts);
    uraianScore += u5Pts;
    collectedUraianAnswers.push({
        num: 5,
        question: "15. Empat Pilar Computational Thinking (Berpikir Komputasional)",
        userAnswer: `1. Dekomposisi: ${raw5Dek || '-'} | 2. Pengenalan Pola: ${raw5Pola || '-'} | 3. Abstraksi: ${raw5Abs || '-'} | 4. Algoritma: ${raw5Alg || '-'}`,
        keyRef: "1. Dekomposisi (Decomposition) | 2. Pengenalan Pola (Pattern Recognition) | 3. Abstraksi (Abstraction) | 4. Algoritma (Algorithm).",
        points: u5Pts,
        keterangan: u5Pts === 10 ? "✔ Sangat Lengkap: Keempat pilar Berpikir Komputasional (Dekomposisi, Pengenalan Pola, Abstraksi, Algoritma) dijelaskan dengan tepat." : getUraianKeterangan(u5Pts)
    });

    // Hentikan timer pengerjaan 60 menit & catat durasi
    if (examTimerIntervalK6) clearInterval(examTimerIntervalK6);
    const secondsSpent = Math.max(1, (60 * 60) - Math.max(0, examTimeRemainingK6));
    const minSpent = Math.floor(secondsSpent / 60);
    const secSpent = secondsSpent % 60;
    examDurationTextK6 = `${minSpent} Menit ${secSpent} Detik`;

    // Total Score (0 - 100)
    const totalScore = pgScore + uraianScore;
    const studentName = currentStudentDataK6.name || 'Sahabat Pintar Kelas 6';
    const studentClass = currentStudentDataK6.kelas || '6A';

    completedExamScoresK6 = {
        initial: currentStudentDataK6.nilaiAwal,
        pg: pgScore,
        uraian: uraianScore,
        final: totalScore,
        status: totalScore >= 80 ? 'LULUS REMEDIAL' : 'TUNTAS REMEDIAL',
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
        predicateBadge.innerText = '🌟 LULUS REMEDIAL DENGAN GEMILANG!';
        predicateBadge.style.background = 'linear-gradient(135deg, #059669, #10b981)';
        motivationTitle.innerHTML = `Luar Biasa, ${studentName}! Logika Kodingmu Sangat Hebat! 🚀`;
        motivationMessage.innerHTML = `
            Selamat atas keberhasilanmu! Usaha keras, ketelitian, dan kejujuranmu dalam memahami konsep Berpikir Komputasional, Machine Learning, dan pemrograman Scratch hari ini membuahkan hasil yang sangat membanggakan!
            <br><br>
            Kamu telah membuktikan bahwa tantangan koding tingkat lanjut dapat kamu selesaikan dengan gemilang. Teruslah berkarya, ciptakan proyek game dan AI yang bermanfaat, dan jadilah inspirasi bagi sesama! ✨🤖
        `;
    } else if (totalScore >= 80) {
        mascotIcon.innerText = '🎉';
        predicateBadge.innerText = '✨ DINYATAKAN LULUS REMEDIAL (KKM 80)!';
        predicateBadge.style.background = 'linear-gradient(135deg, #7e22ce, #a855f7)';
        motivationTitle.innerHTML = `Kerja Bagus, ${studentName}! Kamu Berhasil Memenuhi KKM 80! 💡`;
        motivationMessage.innerHTML = `
            Hebat sekali! Skor remedialmu berhasil melampaui batas KKM 80 dan membuktikan pemahaman logika yang kuat dan dedikasi yang tinggi.
            <br><br>
            Berpikir komputasional dan pemrograman Scratch melatih otak kita untuk selalu berpikir terstruktur dan kreatif. Teruslah bereksplorasi dengan berbagai blok kode baru di Scratch, jangan ragu mencoba algoritma yang lebih seru, dan tetaplah rajin berlatih! Ibu Guru Darningsih sangat bangga padamu! 🌱
        `;
    } else {
        mascotIcon.innerText = '💪';
        predicateBadge.innerText = '📖 PERLU PENGAYAAN & TETAP SEMANGAT!';
        predicateBadge.style.background = 'linear-gradient(135deg, #f59e0b, #ea580c)';
        motivationTitle.innerHTML = `Jangan Pernah Menyerah, ${studentName}! Kamu Pasti Bisa! 💖`;
        motivationMessage.innerHTML = `
            Terima kasih banyak sudah berusaha dan mengerjakan soal remedial ini secara mandiri dan jujur!
            <br><br>
            Meskipun nilaimu belum mencapai batas KKM 80, setiap kesalahan (*bug*) atau kesulitan adalah sahabat terbaik yang mengajarkan kita untuk menjadi lebih teliti dan bijaksana. Jangan berkecil hati ya! Pelajari kembali 4 pilar computational thinking dan blok-blok di Scratch. Selangkah demi selangkah bersama Ibu Guru, kamu pasti bisa menjadi programmer hebat! 🤖✨
        `;
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
        status: totalScore >= 80 ? 'Lulus' : 'Tuntas',
        predicate: completedExamScoresK6.predicate,
        duration: examDurationTextK6,
        timestamp: timeString,
        date: dateFormatted,
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
    showToast(`Nilai Akhir Remedial Kelas 6: ${totalScore}! 🌟 (Waktu: ${examDurationTextK6})`);
}

function generateAndDownloadPDFK6() {
    playCuteSound('pop');
    showToast('📄 Sedang menyusun dokumen PDF Kelas 6...');

    const today = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('id-ID', options);

    document.getElementById('pdfReportNameK6').innerText = currentStudentDataK6.name || 'Siswa Kelas 6';
    document.getElementById('pdfReportClassK6').innerText = `Kelas ${currentStudentDataK6.kelas || '6A'}`;
    document.getElementById('pdfReportAbsenK6').innerText = currentStudentDataK6.absen || '-';
    document.getElementById('pdfReportDurationK6').innerText = `${examDurationTextK6} (Batas: 60 Menit)`;
    document.getElementById('pdfReportDateK6').innerText = formattedDate;

    document.getElementById('pdfReportInitialScoreK6').innerText = completedExamScoresK6.initial;
    document.getElementById('pdfReportPgScoreK6').innerText = `${completedExamScoresK6.pg} / 50 Poin`;
    document.getElementById('pdfReportUraianScoreK6').innerText = `${completedExamScoresK6.uraian} / 50 Poin`;
    document.getElementById('pdfReportFinalScoreK6').innerText = completedExamScoresK6.final;

    document.getElementById('pdfReportStatusK6').innerText = completedExamScoresK6.status;
    document.getElementById('pdfReportPredicateK6').innerText = completedExamScoresK6.predicate;
    document.getElementById('pdfReportLocationDateK6').innerText = `Jakarta, ${formattedDate}`;

    const element = document.getElementById('pdfDocumentElementK6');
    const safeStudentName = (currentStudentDataK6.name || 'Siswa_K6').replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `Laporan_Remedial_${safeStudentName}_Kelas_${currentStudentDataK6.kelas}.pdf`;

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
            showToast('✅ Berhasil mengunduh Laporan Remedial Kelas 6 (PDF)!');
        }).catch(err => {
            console.error('Error generating PDF:', err);
            window.print();
        });
    } else {
        window.print();
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

function getRecapList() {
    try {
        const stored = localStorage.getItem('remedial_tzuchi_records') || localStorage.getItem('remedial_tzuchi_k4');
        if (stored) {
            let parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
                return parsed.filter(item => {
                    if (!item || typeof item !== 'object') return false;
                    const n = String(item.name || '').trim();
                    return n && n !== '-' && n !== 'null' && n !== 'undefined' && n.length >= 2;
                }).map(item => {
                    const dur = String(item.duration || '');
                    if (dur.includes('{') || dur.includes('[') || dur.length > 25) {
                        item.duration = '60 Menit';
                    }
                    const ts = String(item.timestamp || '');
                    if (ts.includes('{') || ts.includes('[') || ts.length > 35) {
                        item.timestamp = item.date || '-';
                    }
                    return item;
                });
            }
        }
    } catch (e) {
        console.warn('Error reading recap records from localStorage:', e);
    }
    return [];
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
const DEFAULT_GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbzy19oNK6N3foUZVCmPMG2Egm2fQ-CWGS4EofxYLPFhlXdEZQloL3oDusFej60MAtcv/exec"; 
let GOOGLE_SHEETS_WEBAPP_URL = localStorage.getItem('tzuchi_sheets_url') || DEFAULT_GOOGLE_SHEETS_URL;
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
    if (!isSilent) showToast('☁️ Sedang menyinkronkan data dari Google Sheets...');

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

            cloudData.forEach(c => {
                // Periksa apakah data sudah ada secara lokal
                const existingIdx = localList.findIndex(l => 
                    (c.studentId && String(l.id) === String(c.studentId)) || 
                    (String(l.name || '').toLowerCase() === String(c.studentName || '').toLowerCase() && String(l.kelas || '') === String(c.grade || ''))
                );
                const cloudNilaiAwal = c.nilaiAwal !== undefined ? c.nilaiAwal : (c.initialScore !== undefined ? c.initialScore : 0);
                if (existingIdx !== -1) {
                    if ((!localList[existingIdx].nilaiAwal || localList[existingIdx].nilaiAwal === 0) && cloudNilaiAwal) {
                        localList[existingIdx].nilaiAwal = cloudNilaiAwal;
                    }
                } else {
                    localList.unshift({
                        id: c.studentId || ('st_cloud_' + Date.now() + Math.random().toString(36).substr(2, 5)),
                        name: c.studentName || 'Siswa',
                        kelas: c.grade || '4A',
                        absen: c.absen || '-',
                        nilaiAwal: cloudNilaiAwal,
                        nilaiAkhir: Number(c.score) || 0,
                        pgScore: c.pgScore || 0,
                        uraianScore: c.uraianScore || 0,
                        status: c.status || ((c.score || 0) >= 80 ? 'Lulus' : 'Tuntas'),
                        predicate: c.predicate || 'SANGAT MEMUASKAN',
                        duration: c.duration || '-',
                        timestamp: c.timestamp || '-',
                        date: c.date || new Date().toLocaleDateString('id-ID'),
                        answers: {
                            pg: c.pgAnswers || [],
                            uraian: c.essayAnswers || []
                        }
                    });
                    addedCount++;
                }
            });

            localStorage.setItem('remedial_tzuchi_records', JSON.stringify(localList));
            localStorage.setItem('remedial_tzuchi_k4', JSON.stringify(localList));
            renderTeacherTable();
            if (addedCount > 0) {
                playCuteSound('fanfare');
                showToast(`✅ Sinkronisasi berhasil! Menambahkan ${addedCount} data siswa baru dari Cloud.`);
            } else if (!isSilent) {
                showToast('ℹ️ Seluruh data siswa dari Cloud sudah tersinkron.');
            }
        } else if (!isSilent) {
            showToast('ℹ️ Data Google Sheets masih kosong atau belum ada siswa yang mengirim.');
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

    // Pengiriman real-time ke Google Sheets (jika URL terhubung)
    if (GOOGLE_SHEETS_WEBAPP_URL && GOOGLE_SHEETS_WEBAPP_URL.trim().startsWith('http')) {
        const payload = {
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
        fetch(GOOGLE_SHEETS_WEBAPP_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(() => {
            console.log('✅ Student result synced to Google Sheets cloud:', newStudent.name);
        }).catch(err => {
            console.warn('Cloud sync error (saved locally):', err);
        });
    }
}

/* ==============================================================
   LIVE EXAM TOKEN MANAGEMENT (PENGAWAS RUANG UJIAN)
   ============================================================== */
const DEFAULT_LIVE_TOKEN = 'TZU26';

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
    if (badge) badge.innerText = getActiveExamToken();
}

function generateRandomExamToken() {
    playCuteSound('pop');
    const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const numbers = '23456789';
    let token = '';
    for (let i = 0; i < 3; i++) {
        token += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 2; i++) {
        token += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    setActiveExamToken(token);
    playCuteSound('fanfare');
    showToast(`🎲 Token baru dibuat: ${token}. Silakan tulis di papan tulis!`);
}

function editCustomExamToken() {
    playCuteSound('pop');
    const current = getActiveExamToken();
    const custom = prompt('Masukkan kode token ujian yang Anda inginkan (Contoh: KODING4, TZU26, SEMANGAT):', current);
    if (custom !== null) {
        const clean = custom.trim().toUpperCase();
        if (!clean) {
            alert('Token tidak boleh kosong!');
            return;
        }
        setActiveExamToken(clean);
        playCuteSound('fanfare');
        showToast(`💾 Token ujian berhasil diubah menjadi: ${clean}`);
    }
}

/* ==============================================================
   FITUR TEMPEL / IMPOR DATA DARI GOOGLE SPREADSHEET LANGSUNG
   ============================================================== */
function openImportSheetModal() {
    playCuteSound('pop');
    const modal = document.getElementById('importSheetModal');
    const textarea = document.getElementById('textareaSheetData');
    if (textarea) textarea.value = '';
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
        let name = '', kelas = '4C', absen = '-', score = 0, status = 'Tuntas', date = cols[0] || '', nilaiAwal = 0;

        if (cols[3] && !cols[3].match(/^\d+$/) && cols[3].length >= 2) {
            name = cols[3];
            kelas = cols[4] || '4C';
            absen = cols[5] || '-';
            score = parseInt(cols[6], 10) || 0;
            status = cols[8] || (score >= 80 ? 'Lulus' : 'Tuntas');
            if (cols[2] && cols[2].match(/^\d+$/)) {
                nilaiAwal = parseInt(cols[2], 10) || 0;
            }
        } else if (cols[2] && !cols[2].match(/^\d+$/) && cols[2].length >= 2) {
            name = cols[2];
            kelas = cols[3] || '4C';
            absen = cols[4] || '-';
            score = parseInt(cols[5], 10) || 0;
            status = cols[7] || (score >= 80 ? 'Lulus' : 'Tuntas');
        } else {
            for (let c = 0; c < Math.min(cols.length, 5); c++) {
                if (cols[c] && !cols[c].match(/^\d+$/) && !cols[c].includes('/') && cols[c].length > 2) {
                    name = cols[c];
                    kelas = cols[c + 1] || '4C';
                    absen = cols[c + 2] || '-';
                    score = parseInt(cols[c + 3], 10) || 0;
                    break;
                }
            }
        }

        if (!name || name === '-' || name.length < 2) return;

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

        const existingIdx = localList.findIndex(l => 
            String(l.name || '').trim().toLowerCase() === name.toLowerCase() &&
            String(l.kelas || '').trim().toLowerCase() === kelas.toLowerCase()
        );

        const newRec = {
            id: 'st_sheet_' + Date.now() + '_' + idx,
            name: name,
            kelas: kelas,
            absen: absen,
            nilaiAwal: nilaiAwal,
            nilaiAkhir: score,
            pgScore: Math.min(50, Math.round(score * 0.5)),
            uraianScore: Math.max(0, score - Math.min(50, Math.round(score * 0.5))),
            status: status,
            predicate: score >= 90 ? 'SANGAT MEMUASKAN' : (score >= 80 ? 'BAIK SEKALI' : 'CUKUP BAIK'),
            duration: '60 Menit',
            timestamp: (date && !date.includes('{') && !date.includes('[')) ? date : '-',
            date: (date && !date.includes('{') && !date.includes('[')) ? (date.includes(' ') ? date.split(' ')[0] : date) : new Date().toLocaleDateString('id-ID'),
            answers: { pg: parsedPg, uraian: parsedUraian }
        };

        if (existingIdx !== -1) {
            localList[existingIdx].nilaiAkhir = score;
            if (absen && absen !== '-') localList[existingIdx].absen = absen;
            localList[existingIdx].status = status;
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
    showToast(`🎉 Sukses! Memasukkan ${importedCount} data siswa baru & memperbarui ${updatedCount} siswa dari Google Sheets!`);
    alert(`🎉 BERHASIL!\n\nSebanyak ${importedCount} siswa baru dari Google Sheets berhasil dimasukkan ke tabel, dan ${updatedCount} siswa diperbarui nilainya!`);
}

/* ==============================================================
   KONTROL AKSES UJIAN SISWA & LOGIN GURU (SECURITY)
   ============================================================== */
const DEFAULT_TEACHER_PASSWORD = 'tzuchi2026';

function isExamSessionOpen() {
    return localStorage.getItem('tzuchi_exam_session_status') !== 'CLOSED';
}

function updateExamSessionDisplay() {
    const pill = document.getElementById('examStatusPill');
    const icon = document.getElementById('examSwitchIcon');
    const btn = document.getElementById('btnToggleExamSession');
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
}

function toggleExamSession() {
    playCuteSound('pop');
    const currentlyOpen = isExamSessionOpen();
    if (currentlyOpen) {
        const confirmClose = confirm('⚠️ YAKIN INGIN MENGUNCI UJIAN?\n\nJika dikunci, anak-anak TIDAK AKAN BISA membuka atau mengerjakan ujian remedial dari HP/laptop manapun.\n\nKlik OK untuk Mengunci Ujian.');
        if (!confirmClose) return;
        localStorage.setItem('tzuchi_exam_session_status', 'CLOSED');
        updateExamSessionDisplay();
        playCuteSound('fanfare');
        showToast('🔒 Ujian berhasil DITUTUP. Akses siswa terkunci!');
    } else {
        localStorage.setItem('tzuchi_exam_session_status', 'OPEN');
        updateExamSessionDisplay();
        playCuteSound('fanfare');
        showToast('🔓 Ujian berhasil DIBUKA. Siswa dapat mengerjakan!');
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
        const storedPass = localStorage.getItem('tzuchi_teacher_password') || DEFAULT_TEACHER_PASSWORD;
        const pass = prompt('🔐 AKSES KHUSUS GURU PENGAWAS\n\nSilakan masukkan Password Guru Pengawas (bawaan: tzuchi2026):');
        if (pass !== null) {
            const entered = pass.trim();
            if (entered === storedPass || entered === 'tzuchi2026' || entered === 'guru2026') {
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
    const storedPass = localStorage.getItem('tzuchi_teacher_password') || DEFAULT_TEACHER_PASSWORD;

    if (entered === storedPass || entered === 'guru2026' || entered === 'tzuchi2026') {
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
    const currentStored = localStorage.getItem('tzuchi_teacher_password') || DEFAULT_TEACHER_PASSWORD;
    const oldPass = prompt('Masukkan Password Guru saat ini:');
    if (oldPass === null) return;
    if (oldPass !== currentStored && oldPass !== 'guru2026' && oldPass !== 'tzuchi2026') {
        alert('⚠️ Password lama salah! Gagal mengubah password.');
        return;
    }
    const newPass = prompt('Masukkan Password Baru yang Anda inginkan (Minimal 4 karakter):');
    if (!newPass || newPass.trim().length < 4) {
        alert('⚠️ Password baru minimal harus 4 karakter!');
        return;
    }
    localStorage.setItem('tzuchi_teacher_password', newPass.trim());
    playCuteSound('fanfare');
    alert(`✅ BERHASIL!\n\nPassword Guru berhasil diubah menjadi: "${newPass.trim()}". Harap catat atau ingat password baru ini ya Bu.`);
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
function openTeacherPortal() {
    playCuteSound('pop');
    const modal = document.getElementById('teacherPortalModal');
    if (!modal) return;
    modal.classList.add('open');
    updateCloudStatusUI();
    updateActiveTokenDisplay();
    updateExamSessionDisplay();
    renderTeacherTable();
    showToast('🔒 Membuka Panel Khusus Guru...');

    if (GOOGLE_SHEETS_WEBAPP_URL && GOOGLE_SHEETS_WEBAPP_URL.trim().startsWith('http')) {
        syncDataFromCloud(true);
    }
}

function closeTeacherPortal() {
    playCuteSound('pop');
    const modal = document.getElementById('teacherPortalModal');
    if (modal) modal.classList.remove('open');
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
    const cols = ['no', 'name', 'kelas', 'absen', 'nilaiAwal', 'nilaiAkhir'];
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

        // Filter by Class and Search Query
        let filtered = list.filter(item => {
            try {
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
            badgeCounter.innerHTML = `<i class="fa-solid fa-users"></i> Menampilkan <strong>${filtered.length}</strong> Data Siswa`;
        }

        // Update Teacher Quick Metrics
        const totalStudentsElem = document.getElementById('teacherTotalStudents');
        const avgScoreElem = document.getElementById('teacherAverageScore');
        const highestScoreElem = document.getElementById('teacherHighestScore');
        const passedCountElem = document.getElementById('teacherPassedCount');

        if (totalStudentsElem) totalStudentsElem.innerText = list.length;
        if (list.length > 0) {
            const totalSum = list.reduce((acc, curr) => acc + Number(curr.nilaiAkhir || 0), 0);
            const maxScore = Math.max(...list.map(curr => Number(curr.nilaiAkhir || 0)));
            const passedCount = list.filter(curr => Number(curr.nilaiAkhir || 0) >= 80).length;
            const passRate = Math.round((passedCount / list.length) * 100);

            if (avgScoreElem) avgScoreElem.innerText = Math.round(totalSum / list.length);
            if (highestScoreElem) highestScoreElem.innerText = maxScore;
            if (passedCountElem) passedCountElem.innerText = `${passRate}% (${passedCount}/${list.length})`;
        } else {
            if (avgScoreElem) avgScoreElem.innerText = 0;
            if (highestScoreElem) highestScoreElem.innerText = 0;
            if (passedCountElem) passedCountElem.innerText = '0% (0/0)';
        }

        if (filtered.length === 0) {
            tbody.innerHTML = '';
            if (emptyNotice) emptyNotice.style.display = 'block';
            return;
        }

        if (emptyNotice) emptyNotice.style.display = 'none';

        tbody.innerHTML = filtered.map((st, idx) => {
            const safeName = String(st.name || '-');
            const safeKelas = String(st.kelas || '-');
            const safeAbsen = String(st.absen !== undefined && st.absen !== null ? st.absen : '-');
            const safeAwal = st.nilaiAwal !== undefined ? st.nilaiAwal : 0;
            const safeAkhir = Number(st.nilaiAkhir !== undefined ? st.nilaiAkhir : 0);
            const isPassed = safeAkhir >= 80;
            const safeStatus = st.status || (isPassed ? 'Lulus' : 'Tuntas');
            let safeTimestamp = String(st.timestamp || st.date || '-');
            if (safeTimestamp.includes('{') || safeTimestamp.includes('[') || safeTimestamp.length > 35) {
                safeTimestamp = String(st.date || '-');
                if (safeTimestamp.includes('{') || safeTimestamp.includes('[') || safeTimestamp.length > 35) {
                    safeTimestamp = '-';
                }
            }
            let safeDuration = String(st.duration || '60 Menit');
            if (safeDuration.includes('{') || safeDuration.includes('[') || safeDuration.length > 25) {
                safeDuration = '60 Menit';
            }
            const safeId = String(st.id || ('st_' + idx));

            return `
                <tr>
                    <td style="color: #64748b; font-weight: 700;">#${idx + 1}</td>
                    <td><strong>${safeName}</strong></td>
                    <td><span class="class-tag">Kelas ${safeKelas}</span></td>
                    <td><strong>${safeAbsen}</strong></td>
                    <td>
                        <button type="button" class="btn-edit-nilai-awal" onclick="editStudentNilaiAwal('${safeId}')" title="Klik untuk mengubah Nilai Awal siswa ini">
                            <span>${safeAwal}</span>
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </td>
                    <td><span class="score-badge-cell">${safeAkhir}</span></td>
                    <td style="max-width: 140px; overflow: hidden;">
                        <span style="font-size: 0.85rem; color: #475569; display: block; font-weight: 600;">${safeTimestamp}</span>
                        <small style="font-size: 0.76rem; color: #94a3b8;">${safeDuration}</small>
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
    const student = list.find(s => String(s.id) === String(studentId));
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
        localStorage.setItem('remedial_tzuchi_records', JSON.stringify(list));
        localStorage.setItem('remedial_tzuchi_k4', JSON.stringify(list));
        renderTeacherTable();
        playCuteSound('fanfare');
        showToast(`✅ Nilai Awal ${student.name} berhasil diubah menjadi ${parsed}!`);
    }
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
    const gradeLabel = document.getElementById('pdfAnsDocGradeLabel');
    if (gradeLabel) {
        if (student.kelas && String(student.kelas).startsWith('5')) {
            gradeLabel.innerText = 'Kelas 5 SD';
        } else if (student.kelas && String(student.kelas).startsWith('6')) {
            gradeLabel.innerText = 'Kelas 6 SD';
        } else {
            gradeLabel.innerText = 'Kelas 4 SD';
        }
    }
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

    document.getElementById('pdfAnsDocStatus').innerText = student.nilaiAkhir >= 80 ? 'LULUS REMEDIAL' : 'TUNTAS REMEDIAL';
    document.getElementById('pdfAnsDocPredicate').innerText = student.predicate || (student.nilaiAkhir >= 90 ? 'SANGAT MEMUASKAN' : (student.nilaiAkhir >= 80 ? 'BAIK SEKALI' : 'CUKUP BAIK'));
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
   EXPORT REKAPITULASI KESELURUHAN SISWA KE FORMAT EXCEL (.XLS)
   Tampilan tabel rapi, bersih, dan berstandar resmi
   ============================================================== */
function exportRecapToExcel() {
    playCuteSound('pop');
    const list = getRecapList();
    if (!list || list.length === 0) {
        showToast('⚠️ Belum ada data siswa untuk diekspor!');
        return;
    }

    const today = new Date();
    const downloadDate = today.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const downloadTime = today.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

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

        return `
            <tr style="background-color: ${rowBg}; height: 26px;">
                <td style="text-align: center; border: 1px solid #cbd5e1; font-weight: bold; color: #475569;">${idx + 1}</td>
                <td style="text-align: left; border: 1px solid #cbd5e1; font-weight: 600; padding: 4px 8px; color: #0f172a;">${st.name || '-'}</td>
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
                    <x:Name>Rekap Nilai Remedial</x:Name>
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
            <td colspan="12" style="text-align: center; font-size: 14pt; font-weight: bold; color: #14532d; padding: 6px 0;">
                YAYASAN BUDDHA TZU CHI INDONESIA
            </td>
        </tr>
        <tr>
            <td colspan="12" style="text-align: center; font-size: 16pt; font-weight: bold; color: #15803d;">
                SDS CINTA KASIH TZU CHI
            </td>
        </tr>
        <tr>
            <td colspan="12" style="text-align: center; font-size: 12pt; font-weight: bold; color: #0f172a; padding: 4px 0;">
                LEMBAR REKAPITULASI EVALUASI & NILAI HASIL REMEDIAL SISWA
            </td>
        </tr>
        <tr>
            <td colspan="12" style="text-align: center; font-size: 10.5pt; color: #475569; padding-bottom: 12px;">
                Mata Pelajaran: Koding dan Kecerdasan Artifisial • TP 2026/2027 • KKM Sekolah: 80
            </td>
        </tr>
        <tr><td colspan="12" style="height: 10px;"></td></tr>

        <!-- TABEL INFORMASI METADATA & STATISTIK -->
        <tr>
            <td colspan="2" style="border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold; padding: 5px;">Guru Pengampu</td>
            <td colspan="4" style="border: 1px solid #cbd5e1; background-color: #ffffff; padding: 5px; font-weight: 600;">: Darningsih, S.T.</td>
            <td colspan="2" style="border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold; padding: 5px;">Total Peserta Remedial</td>
            <td colspan="4" style="border: 1px solid #cbd5e1; background-color: #ffffff; padding: 5px; font-weight: bold;">: ${totalCount} Siswa</td>
        </tr>
        <tr>
            <td colspan="2" style="border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold; padding: 5px;">Materi Evaluasi</td>
            <td colspan="4" style="border: 1px solid #cbd5e1; background-color: #ffffff; padding: 5px;">: Excel, PPT AI & Computational Thinking Scratch</td>
            <td colspan="2" style="border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold; padding: 5px;">Rata-Rata Nilai Akhir</td>
            <td colspan="4" style="border: 1px solid #cbd5e1; background-color: #ffffff; padding: 5px; font-weight: bold; color: #0284c7;">: ${avgAkhir} / 100</td>
        </tr>
        <tr>
            <td colspan="2" style="border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold; padding: 5px;">Tanggal Unduh</td>
            <td colspan="4" style="border: 1px solid #cbd5e1; background-color: #ffffff; padding: 5px;">: ${downloadDate} • ${downloadTime}</td>
            <td colspan="2" style="border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold; padding: 5px;">Tingkat Kelulusan KKM</td>
            <td colspan="4" style="border: 1px solid #cbd5e1; background-color: #ffffff; padding: 5px; font-weight: bold; color: #15803d;">: ${passRate}% (${passedCount} Lulus • ${failedCount} Bimbingan)</td>
        </tr>
        <tr><td colspan="12" style="height: 14px;"></td></tr>

        <!-- HEADER TABEL DATA SISWA -->
        <tr style="background-color: #15803d; color: #ffffff; font-weight: bold; height: 34px;">
            <th style="border: 1px solid #14532d; text-align: center; width: 45px;">No</th>
            <th style="border: 1px solid #14532d; text-align: left; padding-left: 8px; width: 220px;">Nama Lengkap Siswa</th>
            <th style="border: 1px solid #14532d; text-align: center; width: 80px;">Kelas</th>
            <th style="border: 1px solid #14532d; text-align: center; width: 70px;">No. Absen</th>
            <th style="border: 1px solid #14532d; text-align: center; width: 85px;">Nilai Awal</th>
            <th style="border: 1px solid #14532d; text-align: center; width: 100px;">Nilai PG (50)</th>
            <th style="border: 1px solid #14532d; text-align: center; width: 110px;">Nilai Uraian (50)</th>
            <th style="border: 1px solid #14532d; text-align: center; width: 120px;">Nilai Akhir (100)</th>
            <th style="border: 1px solid #14532d; text-align: center; width: 130px;">Status Hasil</th>
            <th style="border: 1px solid #14532d; text-align: center; width: 150px;">Predikat Capaian</th>
            <th style="border: 1px solid #14532d; text-align: center; width: 110px;">Durasi Pengerjaan</th>
            <th style="border: 1px solid #14532d; text-align: center; width: 140px;">Waktu Penyelesaian</th>
        </tr>

        <!-- ISI BARIS DATA SISWA -->
        ${rowsHtml}

        <!-- BARIS RATA-RATA KELAS -->
        <tr style="background-color: #f1f5f9; font-weight: bold; height: 30px;">
            <td colspan="4" style="text-align: right; border: 1px solid #cbd5e1; padding-right: 12px; font-weight: bold;">RATA-RATA KESELURUHAN:</td>
            <td style="text-align: center; border: 1px solid #cbd5e1; color: #475569;">${avgAwal}</td>
            <td style="text-align: center; border: 1px solid #cbd5e1; color: #0369a1;">${avgPg}</td>
            <td style="text-align: center; border: 1px solid #cbd5e1; color: #7c3aed;">${avgUraian}</td>
            <td style="text-align: center; border: 1px solid #cbd5e1; color: #15803d; font-size: 11pt; font-weight: bold; background-color: #ecfdf5;">${avgAkhir}</td>
            <td colspan="4" style="border: 1px solid #cbd5e1; text-align: center; color: #475569; font-size: 9.5pt;">Kriteria Ketuntasan Minimal (KKM) = 80</td>
        </tr>

        <!-- FOOTER & KATA PERENUNGAN -->
        <tr><td colspan="12" style="height: 18px;"></td></tr>
        <tr>
            <td colspan="12" style="text-align: center; font-style: italic; color: #334155; padding: 6px 0; font-size: 9.5pt;">
                “Keindahan sifat manusia terletak pada ketulusan hatinya. Kemuliaan sifat manusia terletak pada kejujuran.” — Kata Perenungan Master Cheng Yen
            </td>
        </tr>
        <tr><td colspan="12" style="height: 25px;"></td></tr>

        <!-- TANDA TANGAN PENGESAHAN -->
        <tr>
            <td colspan="2"></td>
            <td colspan="3" style="text-align: center; font-size: 10pt;">
                Mengetahui,<br>Kepala SDS Cinta Kasih Tzu Chi<br><br><br><br><br>
                ( .................................................. )
            </td>
            <td colspan="2"></td>
            <td colspan="4" style="text-align: center; font-size: 10pt;">
                Jakarta, ${downloadDate}<br>Guru Pengampu Koding & AI<br><br><br><br><br>
                <strong>( Darningsih, S.T. )</strong>
            </td>
            <td colspan="1"></td>
        </tr>
        <tr>
            <td colspan="12" style="text-align: right; font-size: 8pt; color: #94a3b8; padding-top: 15px;">
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
    link.setAttribute("href", url);
    link.setAttribute("download", `Rekap_Remedial_Koding_AI_TzuChi_${safeDate}.xls`);
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

// Inisialisasi data rekap dan bahasa saat halaman dimuat
window.addEventListener('DOMContentLoaded', () => {
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
});


