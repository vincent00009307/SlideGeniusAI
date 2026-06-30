import React, { useState, useEffect, useRef } from 'react';
import { 
  Wand2, LayoutTemplate, FolderOpen, Settings, 
  Plus, Search, FileText, Image as ImageIcon, 
  Type, PieChart, Share2, Play, Download, X,
  ChevronRight, BrainCircuit, Library, History,
  Moon, Sun, LayoutPanelLeft, Sparkles, Shapes,
  AlignLeft, Presentation, MessageSquare, CheckCircle2,
  BookOpen, Copy, Trash2, Edit3, HelpCircle, Save, Check,
  ChevronDown, Layers, Award, UserCheck, RefreshCw, BarChart2,
  Lock, ArrowRight, LogOut, User, Mic, Volume2, Globe, FileUp, 
  FileDown, Info, ShieldAlert, Clock, Eye, 
  Users, MessageCircle, RotateCcw, Palette, ListOrdered, GraduationCap,
  Zap, Star
} from 'lucide-react';

// --- DATABASE DEFAULT SLIDES ---
const INITIAL_SLIDES = [
  {
    id: 'slide-1',
    type: 'title',
    title: 'Dampak Artificial Intelligence pada Pendidikan Indonesia',
    subtitle: 'Mengeksplorasi integrasi teknologi AI, transformasi metode ajar, dan kesiapan talenta masa depan dalam kerangka Kurikulum Merdeka.',
    badge: 'MODUL PEMBELAJARAN',
    notes: 'Selamat pagi rekan-rekan pengajar. Hari ini kita akan membahas disrupsi sekaligus peluang emas AI dalam sistem pendidikan kita.',
    references: ['Kemendikbudristek (2024) - Panduan Pemanfaatan AI Generatif di Sekolah.', 'UNESCO (2023) - Guidance for Generative AI in Education and Research.'],
    factChecked: true,
    flashcards: [
      { id: 'f-1', front: 'Apa peran utama AI dalam Kurikulum Merdeka?', back: 'Sebagai asisten personalisasi belajar and otomatisasi administrasi guru.' }
    ],
    quizzes: [
      { id: 'q-1', question: 'Apa fokus utama pemanfaatan AI dalam ekosistem kelas modern?', options: ['Menggantikan peran guru sepenuhnya', 'Personalisasi materi belajar siswa', 'Menghapus ujian nasional', 'Membatasi interaksi sosial'], correct: 1 }
    ]
  },
  {
    id: 'slide-2',
    type: 'content',
    title: 'Evolusi Personalisasi Belajar Siswa',
    bullets: [
      'Deteksi Cepat Gaya Belajar: AI memetakan preferensi visual, auditori, atau kinestetik secara instan.',
      'Kurikulum Adaptif: Mengubah tingkat kesulitan materi secara dinamis sesuai kemampuan real-time siswa.',
      'Feedback Instan & Terukur: Memberikan evaluasi formatif dalam hitungan detik untuk perbaikan mandiri.'
    ],
    notes: 'Tekankan pada bagian ini bahwa AI berperan sebagai suplemen, bukan substitusi dari empati seorang pendidik.',
    references: ['Hattie, J. (2023) - Visible Learning with Technology.', 'Sutrisno, A. (2025) - Jurnal Teknologi Pembelajaran Indonesia.'],
    factChecked: true,
    flashcards: [
      { id: 'f-2', front: 'Apa yang dimaksud dengan kurikulum adaptif berbasis AI?', back: 'Kurikulum yang tingkat kesulitannya menyesuaikan dengan pemahaman real-time dari masing-masing siswa.' }
    ],
    quizzes: [
      { id: 'q-2', question: 'Kurikulum adaptif dirancang untuk mengatasi masalah apa?', options: ['Kesenjangan kecepatan belajar antar siswa', 'Mahalnya biaya buku cetak', 'Kurangnya fasilitas internet', 'Jam mengajar guru yang terlalu padat'], correct: 0 }
    ]
  },
  {
    id: 'slide-3',
    type: 'swot',
    title: 'Analisis SWOT Adopsi AI di Sekolah',
    swot: {
      strengths: ['Personalisasi belajar super cepat', 'Otomatisasi RPP & penilaian guru', 'Akses materi global 24/7'],
      weaknesses: ['Ketergantungan infrastruktur internet', 'Potensi plagiarisme digital', 'Kurangnya literasi digital dasar'],
      opportunities: ['Akurasi penilaian formatif', 'Penghematan waktu administrasi hingga 40%', 'Pemerataan kualitas materi di daerah 3T'],
      threats: ['Kesenjangan digital antar wilayah', 'Kehilangan aspek empati guru', 'Isu bias data algoritma lokal']
    },
    notes: 'SWOT ini penting untuk memetakan risiko integrasi AI agar implementasi Kurikulum Merdeka berjalan aman.',
    references: ['Pusdatin Kemendikbud (2025) - Laporan Kesiapan Digital Indonesia.'],
    factChecked: true,
    flashcards: [],
    quizzes: []
  },
  {
    id: 'slide-4',
    type: 'chart',
    title: 'Statistik Efisiensi Waktu Guru dengan AI',
    chartLabel: 'Waktu yang Dihemat per Minggu (Jam)',
    chartData: [
      { label: 'Koreksi Tugas', value: 8, color: 'bg-indigo-500' },
      { label: 'Desain RPP / Modul Ajar', value: 6, color: 'bg-purple-500' },
      { label: 'Riset & Kurasi Materi', value: 5, color: 'bg-pink-500' },
      { label: 'Administrasi Sekolah', value: 4, color: 'bg-amber-500' }
    ],
    notes: 'Dengan menghemat rata-rata 23 jam per minggu, guru dapat memfokuskan energinya untuk bimbingan karakter personal.',
    references: ['Riset SlideGenius AI (2026) - Laporan Efisiensi.'],
    factChecked: true,
    flashcards: [
      { id: 'f-3', front: 'Berapa rata-rata estimasi waktu yang bisa dihemat guru dengan bantuan AI?', back: 'Hingga 23 jam per minggu berdasarkan riset efisiensi aktivitas administratif.' }
    ],
    quizzes: []
  }
];

const THEMES = {
  'sunset-purple': {
    name: 'Sunset Purple',
    bg: 'bg-gradient-to-br from-indigo-900/40 to-purple-900/40',
    slideBg: 'bg-slate-900',
    textColor: 'text-white',
    subColor: 'text-purple-300',
    accentColor: 'bg-purple-600',
    borderColor: 'border-purple-500/30',
    accentText: 'text-purple-400'
  },
  'ocean-breeze': {
    name: 'Ocean Breeze',
    bg: 'bg-gradient-to-br from-blue-900/30 to-cyan-900/30',
    slideBg: 'bg-slate-900',
    textColor: 'text-white',
    subColor: 'text-cyan-300',
    accentColor: 'bg-cyan-500',
    borderColor: 'border-cyan-500/30',
    accentText: 'text-cyan-400'
  },
  'emerald-forest': {
    name: 'Emerald Forest',
    bg: 'bg-gradient-to-br from-emerald-950/40 to-teal-950/40',
    slideBg: 'bg-zinc-900',
    textColor: 'text-emerald-50',
    subColor: 'text-emerald-300',
    accentColor: 'bg-emerald-600',
    borderColor: 'border-emerald-500/30',
    accentText: 'text-emerald-400'
  },
  'minimal-classic': {
    name: 'Minimal Classic',
    bg: 'bg-slate-100',
    slideBg: 'bg-white',
    textColor: 'text-slate-900',
    subColor: 'text-slate-500',
    accentColor: 'bg-slate-800',
    borderColor: 'border-slate-300',
    accentText: 'text-slate-700'
  }
};

export default function App() {
  const [currentView, setCurrentView] = useState('login'); // 'login' | 'dashboard' | 'ai-prompt' | 'generating' | 'editor' | 'presenter'
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [slides, setSlides] = useState(INITIAL_SLIDES);
  const [activeSlideId, setActiveSlideId] = useState('slide-1');
  const [activeTheme, setActiveTheme] = useState('sunset-purple');
  const [leftTab, setLeftTab] = useState('templates'); 
  const [toastMessage, setToastMessage] = useState(null);
  const [presentationTitle, setPresentationTitle] = useState('Dampak AI pada Pendidikan Indonesia');
  
  // Auth & TIER Logic States
  const [currentUser, setCurrentUser] = useState(null);
  const [customNameInput, setCustomNameInput] = useState('');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedRegTier, setSelectedRegTier] = useState('free'); // 'free' | 'plus'

  // AI Agent States
  const [aiStep, setAiStep] = useState('research'); // 'research' | 'outline'
  const [researchTopic, setResearchTopic] = useState('');
  const [researchMode, setResearchTopicMode] = useState('prompt');
  const [isResearching, setIsResearching] = useState(false);
  const [researchSources, setResearchSources] = useState([]);
  const [aiOutline, setAiOutline] = useState([]);

  // Presenter & Coach States
  const [presenterSlideIndex, setPresenterSlideIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [coachStats, setCoachStats] = useState(null);
  const [speechTimer, setSpeechTimer] = useState(0);
  const intervalRef = useRef(null);

  // Collaboration Panel & Comments
  const [comments, setComments] = useState([
    { id: 'c-1', user: 'Diana Lestari', text: 'Materi personalisasi belajar ini sangat komprehensif, perlu ditambahkan contoh visual!', time: '10 mnt lalu', slideId: 'slide-2' }
  ]);
  const [newCommentText, setNewCommentText] = useState('');

  // Version History States
  const [versionHistory, setVersionHistory] = useState([
    { id: 'v-2', time: 'Baru saja', name: 'Revisi Struktur oleh AI', user: 'Sistem' },
    { id: 'v-1', time: '10 menit lalu', name: 'Konsep Dasar Outline', user: 'Google OAuth' }
  ]);

  // Brand Kit
  const [brandColors, setBrandColors] = useState(['#6366f1', '#a855f7', '#ec4899']);
  const [brandFont, setBrandFont] = useState('Inter');

  // Education Helpers (LKPD & Modul Ajar Generator)
  const [generatedLessonPlan, setGeneratedLessonPlan] = useState(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  // Audio Playback State
  const [isSpeakPlaying, setIsSpeakPlaying] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  // Helper toggleTheme
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Styling Variables
  const glassPanel = isDarkMode ? 'bg-slate-900/80 backdrop-blur-xl border-slate-800/60 shadow-xl' : 'bg-white/80 backdrop-blur-xl border-white/40 shadow-xl';
  const sidebarBg = isDarkMode ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white/80 border-slate-200';

  // Dynamic Slide Limit
  const slideLimit = currentUser?.tier === 'plus' ? 50 : 10;

  // LOGIN SIMULATION
  const handleGoogleLogin = () => {
    const finalName = customNameInput.trim() || 'Tamu Cerdas';
    setCurrentUser({
      displayName: finalName,
      tier: selectedRegTier, // 'free' or 'plus'
      email: `${finalName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      avatarLetter: finalName.charAt(0).toUpperCase(),
      avatarBg: selectedRegTier === 'plus' ? 'bg-gradient-to-r from-amber-500 to-orange-600' : 'bg-indigo-600',
      credits: selectedRegTier === 'plus' ? 5000 : 400
    });
    showToast(`Masuk sebagai ${finalName} (${selectedRegTier.toUpperCase()})`);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
  };

  // ADD SLIDE LIMIT LOGIC
  const handleAddSlide = (type = 'content') => {
    if (slides.length >= slideLimit) {
      setShowUpgradeModal(true);
      return;
    }
    const newId = `slide-${Date.now()}`;
    const newS = {
      id: newId,
      type: type,
      title: 'Slide Hasil Analisis AI Baru',
      bullets: ['Sistem menyinkronkan data utama otomatis.', 'Tautan orisinalitas tervalidasi Fact-Checker.'],
      notes: 'Gunakan slide tambahan ini untuk penegasan konsep.',
      references: ['Riset SlideGenius (2026)'],
      factChecked: true,
      quizzes: []
    };
    setSlides([...slides, newS]);
    setActiveSlideId(newId);
    showToast("Slide baru berhasil ditambahkan!");
  };

  const deleteSlide = (id) => {
    if (slides.length <= 1) return;
    const idx = slides.findIndex(s => s.id === id);
    const newSlides = slides.filter(s => s.id !== id);
    setSlides(newSlides);
    if (activeSlideId === id) {
      setActiveSlideId(newSlides[idx === 0 ? 0 : idx - 1].id);
    }
    showToast("Slide berhasil dihapus.");
  };

  const duplicateSlide = (s) => {
    if (slides.length >= slideLimit) {
      setShowUpgradeModal(true);
      return;
    }
    const newS = {
      ...s,
      id: `slide-${Date.now()}`,
      title: `${s.title} (Salinan)`
    };
    setSlides([...slides, newS]);
    showToast("Slide diduplikasi!");
  };

  // AI Presenter Coach Speech Recording Simulator
  const startRecordingCoach = () => {
    setIsRecording(true);
    setSpeechTimer(0);
    intervalRef.current = setInterval(() => {
      setSpeechTimer(prev => prev + 1);
    }, 1000);
    showToast("Presenter Coach aktif: Silakan mulailah berbicara...");
  };

  const stopRecordingCoach = () => {
    setIsRecording(false);
    clearInterval(intervalRef.current);
    
    setCoachStats({
      score: 88,
      speed: '124 kata/menit (Sempurna)',
      fillerWords: '3 filler words (um, uh, dsb)',
      eyeContact: '92% Fokus Kamera',
      duration: `${speechTimer} detik`,
      recommendation: 'Intonasi Anda sangat dinamis! Pertahankan tempo bicara saat menjelaskan konsep.'
    });
    showToast("Analisis performa presentasi selesai!");
  };

  // AI Research Agent Workflow
  const triggerAIResearch = () => {
    if (!researchTopic) {
      showToast("Tulis topik riset terlebih dahulu!");
      return;
    }
    setIsResearching(true);
    setTimeout(() => {
      setResearchSources([
        { title: 'Jurnal Teknologi Pendidikan Kemendikbud', url: 'https://jurnal.kemdikbud.go.id', relevance: '98%' },
        { title: 'UNESCO Global Report on AI in Classrooms', url: 'https://unesco.org', relevance: '95%' },
        { title: 'Socio-economic Impact of AI - BRIN Indonesia', url: 'https://brin.go.id', relevance: '91%' }
      ]);
      setAiOutline([
        { slide: 1, title: researchTopic, desc: 'Slide Cover Utama dengan judul riset.' },
        { slide: 2, title: 'Landasan Teori & Konteks Pembelajaran', desc: 'Pemetaan materi teoretis dan kurikulum adaptif.' },
        { slide: 3, title: 'Analisis SWOT Adopsi Sistem', desc: 'Evaluasi kekuatan, kelemahan, peluang, dan ancaman.' },
        { slide: 4, title: 'Efisiensi dan Efektivitas Waktu Pengajar', desc: 'Analisis numerik dan grafik penghematan waktu.' }
      ]);
      setAiStep('outline');
      setIsResearching(false);
      showToast("Riset & Outline berhasil dirancang oleh Agent!");
    }, 2000);
  };

  const applyAIOutlineToSlides = () => {
    const requestedCount = aiOutline.length;
    if (requestedCount > slideLimit) {
      setShowUpgradeModal(true);
      return;
    }

    const customSlides = aiOutline.map((item, idx) => {
      if (idx === 0) {
        return {
          id: 'slide-1',
          type: 'title',
          title: item.title,
          subtitle: 'Modul materi dikembangkan menggunakan SlideGenius AI Research Agent.',
          badge: 'MODUL HASIL RISET',
          notes: 'Selamat pagi rekan-rekan pengajar.',
          references: ['BRIN (2026)', 'UNESCO Education Hub'],
          factChecked: true
        };
      } else if (idx === 2) {
        return {
          id: 'slide-3',
          type: 'swot',
          title: item.title,
          swot: {
            strengths: ['Personalisasi cepat', 'Otomatisasi RPP'],
            weaknesses: ['Ketergantungan internet', 'Potensi plagiarisme'],
            opportunities: ['Efisiensi waktu', 'Pemerataan kualitas'],
            threats: ['Kesenjangan digital', 'Isu bias data']
          },
          notes: 'Analisis kekuatan dan ancaman sistem.',
          references: ['Riset Kemendikbudristek (2025)'],
          factChecked: true
        };
      } else {
        return {
          id: `slide-${Date.now() + idx}`,
          type: 'content',
          title: item.title,
          bullets: [
            'Materi utama poin pertama yang disarankan oleh Agen Riset AI.',
            'Poin kedua: Integrasi teoretis berbasis referensi sains kredibel.'
          ],
          notes: 'Presentasikan poin ini dengan metode studi kasus.',
          references: ['UNESCO Global Policy (2024)'],
          factChecked: true
        };
      }
    });

    setSlides(customSlides);
    setActiveSlideId('slide-1');
    setPresentationTitle(researchTopic);
    setCurrentView('editor');
    showToast("Slide Presentasi Berhasil Terbuat!");
  };

  // Kurikulum Merdeka Modul Ajar Generator
  const generateModulAjar = () => {
    setIsGeneratingPlan(true);
    setTimeout(() => {
      setGeneratedLessonPlan({
        mataPelajaran: 'Informatika / Ilmu Sosial',
        fase: 'Fase F (Kelas XI - XII)',
        capaian: 'Peserta didik mampu menganalisis dampak sosial kemasyarakatan dari teknologi kecerdasan buatan.',
        lkpd: {
          instruksi: '1. Buatlah kelompok berisi 4 orang. 2. Identifikasi risiko terbesar dan tulis dalam lembar SWOT.'
        }
      });
      setIsGeneratingPlan(false);
      showToast("Modul Ajar & LKPD Kurikulum Merdeka berhasil disusun!");
    }, 1500);
  };

  // Text to Speech
  const toggleTextToSpeech = () => {
    if (isSpeakPlaying) {
      setIsSpeakPlaying(false);
      showToast("Suara AI dihentikan.");
    } else {
      setIsSpeakPlaying(true);
      showToast(`AI sedang membacakan slide: "${activeSlide.title}"...`);
      setTimeout(() => {
        setIsSpeakPlaying(false);
      }, 5000);
    }
  };

  const selectedTheme = THEMES[activeTheme] || THEMES['sunset-purple'];
  const activeSlide = slides.find(s => s.id === activeSlideId) || slides[0] || {};

  return (
    <div className="flex w-full h-screen relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[999] flex items-center gap-3 bg-slate-900/95 dark:bg-white text-white dark:text-slate-900 px-5 py-4 rounded-2xl shadow-2xl border border-white/10 dark:border-slate-200 animate-bounce">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Upgrade Limit Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-amber-500/50 rounded-[2.5rem] p-10 text-center shadow-2xl">
             <div className="w-20 h-20 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 fill-current animate-pulse" />
             </div>
             <h2 className="text-3xl font-black text-white mb-4">Ups! Anda mencapai batas paket.</h2>
             <p className="text-slate-400 mb-8 leading-relaxed">
               Paket Anda saat ini dibatasi maksimal <strong>{slideLimit} slide</strong>. Upgrade ke <strong>Plus</strong> untuk membuat hingga <strong>50 slide</strong>, mengaktifkan riset ilmiah mendalam, dan menghapus seluruh watermark presentasi.
             </p>
             <div className="space-y-3">
                <button 
                  onClick={() => { 
                    setShowUpgradeModal(false); 
                    if(currentUser) {
                      setCurrentUser({ ...currentUser, tier: 'plus' });
                    }
                    showToast("Akun Anda berhasil ditingkatkan ke PLUS!");
                  }}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black rounded-2xl shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all"
                >
                  UPGRADE KE PLUS INSTAN
                </button>
                <button onClick={() => setShowUpgradeModal(false)} className="w-full py-3 text-slate-500 font-bold hover:text-white transition-colors">Nanti Saja</button>
             </div>
          </div>
        </div>
      )}

      {/* Login Screen */}
      {currentView === 'login' && (
        <LoginView 
          glassPanel={glassPanel} 
          isDark={isDarkMode}
          toggleTheme={toggleTheme}
          customNameInput={customNameInput}
          setCustomNameInput={setCustomNameInput}
          handleGoogleLogin={handleGoogleLogin}
          selectedRegTier={selectedRegTier}
          setSelectedRegTier={setSelectedRegTier}
        />
      )}

      {/* Dashboard View */}
      {currentView === 'dashboard' && currentUser && (
        <DashboardView 
          setView={setCurrentView} 
          glassPanel={glassPanel} 
          sidebarBg={sidebarBg} 
          toggleTheme={toggleTheme} 
          isDark={isDarkMode} 
          slidesCount={slides.length}
          presentationTitle={presentationTitle}
          showToast={showToast}
          currentUser={currentUser}
          handleLogout={handleLogout}
          slideLimit={slideLimit}
          slides={slides}
          setShowUpgradeModal={setShowUpgradeModal}
        />
      )}

      {/* AI Prompt Modal (Research Agent) */}
      {currentView === 'ai-prompt' && (
        <AIPromptModal 
          setView={setCurrentView} 
          glassPanel={glassPanel} 
          currentUser={currentUser}
          showToast={showToast}
          researchTopic={researchTopic}
          setResearchTopic={setResearchTopic}
          researchMode={researchMode}
          setResearchTopicMode={setResearchTopicMode}
          aiStep={aiStep}
          setAiStep={setAiStep}
          isResearching={isResearching}
          researchSources={researchSources}
          aiOutline={aiOutline}
          setAiOutline={setAiOutline}
          triggerAIResearch={triggerAIResearch}
          applyAIOutlineToSlides={applyAIOutlineToSlides}
          inputUrl={inputUrl}
          setInputUrl={setInputUrl}
          slideLimit={slideLimit}
        />
      )}

      {currentView === 'generating' && (
        <GeneratingScreen />
      )}

      {/* Workspace & Editor */}
      {currentView === 'editor' && currentUser && (
        <EditorWorkspace 
          setView={setCurrentView} 
          glassPanel={glassPanel} 
          isDark={isDarkMode}
          slides={slides}
          setSlides={setSlides}
          activeSlideId={activeSlideId}
          setActiveSlideId={setActiveSlideId}
          activeSlide={activeSlide}
          activeTheme={activeTheme}
          setActiveTheme={setActiveTheme}
          leftTab={leftTab}
          setLeftTab={setLeftTab}
          presentationTitle={presentationTitle}
          setPresentationTitle={setPresentationTitle}
          currentUser={currentUser}
          showToast={showToast}
          isRecording={isRecording}
          startRecordingCoach={startRecordingCoach}
          stopRecordingCoach={stopRecordingCoach}
          coachStats={coachStats}
          speechTimer={speechTimer}
          comments={comments}
          setComments={setComments}
          newCommentText={newCommentText}
          setNewCommentText={setNewCommentText}
          versionHistory={versionHistory}
          setVersionHistory={setVersionHistory}
          brandColors={brandColors}
          setBrandColors={setBrandColors}
          brandFont={brandFont}
          setBrandFont={setBrandFont}
          generatedLessonPlan={generatedLessonPlan}
          isGeneratingPlan={isGeneratingPlan}
          generateModulAjar = {generateModulAjar}
          isSpeakPlaying={isSpeakPlaying}
          toggleTextToSpeech={toggleTextToSpeech}
          handleAddSlide={handleAddSlide}
          duplicateSlide={duplicateSlide}
          deleteSlide={deleteSlide}
          slideLimit={slideLimit}
        />
      )}

      {/* Presenter Mode */}
      {currentView === 'presenter' && (
        <PresenterMode 
          setView={setCurrentView}
          slides={slides}
          activeTheme={activeTheme}
          presenterSlideIndex={presenterSlideIndex}
          setPresenterSlideIndex={setPresenterSlideIndex}
          showToast={showToast}
        />
      )}

    </div>
  );
}

// --- PREMIUM LOGIN VIEW ---
const LoginView = ({ glassPanel, isDark, toggleTheme, customNameInput, setCustomNameInput, handleGoogleLogin, selectedRegTier, setSelectedRegTier }) => {
  return (
    <div className="flex w-full h-screen relative items-center justify-center p-4">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <button 
        onClick={toggleTheme} 
        className="absolute top-6 right-6 p-3 bg-white/10 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:scale-105 transition-all"
      >
        {isDark ? <Sun className="w-5 h-5 text-yellow-400"/> : <Moon className="w-5 h-5 text-indigo-600"/>}
      </button>

      <div className={`w-full max-w-lg rounded-[2.5rem] p-8 md:p-10 shadow-2xl ${glassPanel} border border-white/20 dark:border-slate-800 text-center relative z-10 animate-in fade-in zoom-in-95 duration-300`}>
        <div className="inline-flex p-4 rounded-3xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-6 shadow-inner">
          <BrainCircuit className="w-12 h-12 animate-pulse" />
        </div>
        <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
          SlideGenius AI
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8">
          AI Presentation & Learning Ecosystem Kelas Dunia Buatan Indonesia.
        </p>

        <div className="space-y-4 mb-6">
          <div className="text-left">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5 ml-1">Nama Pengguna</label>
            <input 
              type="text" 
              placeholder="Tuliskan nama Anda..." 
              value={customNameInput}
              onChange={(e) => setCustomNameInput(e.target.value)}
              className="w-full bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm font-semibold text-slate-700 dark:text-slate-200"
            />
          </div>

          {/* Tier Selection Toggle */}
          <div className="text-left">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 ml-1">Pilih Paket Akun</label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setSelectedRegTier('free')}
                className={`p-3.5 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${selectedRegTier === 'free' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'}`}
              >
                <span>Paket Free (Maks 10 Slide)</span>
              </button>
              <button 
                onClick={() => setSelectedRegTier('plus')}
                className={`p-3.5 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${selectedRegTier === 'plus' ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white border-transparent' : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'}`}
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Paket Plus (Maks 50 Slide)</span>
              </button>
            </div>
          </div>

          <button 
            onClick={handleGoogleLogin}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-md hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700 hover:scale-[1.01] transition-all"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5.04c1.65 0 3.13.57 4.3 1.69l3.22-3.22C17.56 1.71 14.95 1 12 1 7.35 1 3.37 3.68 1.45 7.57l3.77 2.92C6.12 7.15 8.84 5.04 12 5.04z" />
              <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.76 2.91c2.2-2.03 3.67-5.01 3.67-8.64z" />
              <path fill="#FBBC05" d="M5.22 14.71A7.16 7.16 0 0 1 4.8 12c0-.95.16-1.88.42-2.71L1.45 6.37A11.94 11.94 0 0 0 0 12c0 2.01.5 3.9 1.45 5.63l3.77-2.92z" />
              <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.76-2.91c-1.11.75-2.53 1.19-4.2 1.19-3.16 0-5.88-2.11-6.78-5.45L1.45 15.84C3.37 20.32 7.35 23 12 23z" />
            </svg>
            <span>Masuk dengan Google Sign-In</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- DASHBOARD VIEW ---
const DashboardView = ({ setView, glassPanel, sidebarBg, toggleTheme, isDark, slidesCount, presentationTitle, showToast, currentUser, handleLogout, slideLimit, slides, setShowUpgradeModal }) => {
  return (
    <div className="flex w-full h-screen animate-in fade-in duration-500">
      <aside className={`w-64 border-r flex flex-col p-4 space-y-6 ${sidebarBg} z-20 backdrop-blur-md`}>
        <div className="flex items-center gap-2 px-2 text-indigo-600 dark:text-indigo-400">
          <BrainCircuit className="w-8 h-8" />
          <span className="text-xl font-bold tracking-tight">SlideGenius.</span>
        </div>
        
        <button 
          onClick={() => { setView('ai-prompt'); }}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/30 transform hover:scale-[1.02] active:scale-95"
        >
          <Sparkles className="w-5 h-5" />
          Riset & Buat Presentasi
        </button>

        <nav className="flex-1 space-y-1">
          <NavItem icon={<FileText />} label="Projek Presentasi" active />
          <NavItem icon={<BookOpen />} label="Modul Ajar Kurikulum" badge="NEW" onClick={() => { showToast("Modul Kurikulum Merdeka Terintegrasi."); }} />
          <NavItem icon={<GraduationCap />} label="Bahan Ujian & LKPD" onClick={() => { showToast("Sistem Evaluasi LKPD Aktif."); }} />
          <NavItem icon={<History />} label="Riwayat & Rollback" />
        </nav>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <div className="p-3 bg-slate-100/50 dark:bg-slate-900/30 rounded-2xl flex items-center gap-3 border border-slate-200/50 dark:border-slate-800">
            <span className={`w-9 h-9 rounded-xl ${currentUser.avatarBg} text-white flex items-center justify-center font-black text-sm shrink-0`}>
              {currentUser.avatarLetter}
            </span>
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 truncate">{currentUser.displayName}</h4>
              <p className="text-[10px] text-slate-400 font-semibold truncate">{currentUser.tier === 'plus' ? 'Plus User' : 'Free User'}</p>
            </div>
          </div>

          {/* Limit Status Bar */}
          <div className="px-4 py-3 bg-slate-100 dark:bg-slate-800/80 rounded-2xl text-sm mb-4 border border-slate-200/50 dark:border-slate-700/50">
            <p className="font-bold text-xs text-slate-500 dark:text-slate-400 uppercase mb-2 flex justify-between">
              <span>Kapasitas Slide</span>
              <span className="text-indigo-500">{Math.round((slides.length / slideLimit) * 100)}%</span>
            </p>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-2 overflow-hidden">
              <div className="bg-indigo-500 h-2 rounded-full transition-all" style={{ width: `${(slides.length / slideLimit) * 100}%` }}></div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">{slides.length} / {slideLimit} Slide</p>
          </div>

          {currentUser.tier === 'free' && (
            <button 
              onClick={() => setShowUpgradeModal(true)}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/15"
            >
              <Zap className="w-3.5 h-3.5 fill-current" /> UPGRADE KE PLUS
            </button>
          )}

          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 w-full rounded-xl transition-all font-bold">
            <LogOut className="w-5 h-5" />
            <span>Keluar Akun</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto relative custom-scrollbar">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 relative z-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Selamat datang, {currentUser.displayName}! 👋
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Batas pembuatan materi: maks. {slideLimit} slide ({currentUser.tier.toUpperCase()}).</p>
          </div>
          <div className={`flex items-center gap-2 p-2.5 rounded-2xl border ${glassPanel}`}>
            <Search className="w-5 h-5 text-slate-400 ml-2" />
            <input 
              type="text" 
              placeholder="Cari modul atau materi..." 
              className="bg-transparent border-none outline-none text-sm w-48 focus:w-64 transition-all text-slate-700 dark:text-slate-200"
            />
          </div>
        </header>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-pink-600/90 p-8 text-white mb-10 shadow-xl shadow-indigo-500/10 border border-white/10">
          <div className="relative z-10 max-w-2xl">
            <span className="bg-white/20 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">Teknologi Terdepan</span>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2">AI Research Agent & Fact Checker 🇮🇩</h2>
            <p className="text-indigo-100 mb-6 text-sm md:text-base">Mulai dengan riset otomatis dari referensi akademik terpercaya, verifikasi kebenaran informasi, edit outline terstruktur, dan rancang presentasi prestisius hanya dalam hitungan detik.</p>
            <button 
              onClick={() => setView('ai-prompt')}
              className="bg-white text-indigo-600 hover:bg-slate-100 font-bold px-6 py-3 rounded-xl transition-all shadow-lg transform hover:scale-[1.03]"
            >
              Mulai Riset Otomatis
            </button>
          </div>
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 flex items-center justify-center">
            <BrainCircuit className="w-72 h-72" />
          </div>
        </div>

        <section className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Projek Presentasi Akademik & Profesional</h2>
            <button className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Lihat Semua</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              onClick={() => setView('ai-prompt')}
              className={`border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-indigo-500/5 dark:hover:bg-indigo-900/10 transition-all min-h-[260px] group`}
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform shadow-md">
                <Plus className="w-8 h-8" />
              </div>
              <h3 className="font-extrabold text-slate-800 dark:text-slate-200 text-lg">Buat Baru</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-[180px]">Mulai riset otomatis & kumpulkan pustaka kredibel.</p>
            </div>

            <ProjectCard 
              title={presentationTitle} 
              time="Sedang Aktif" 
              slides={slidesCount} 
              cover="bg-gradient-to-br from-indigo-600 to-purple-600" 
              onClick={() => setView('editor')} 
            />
          </div>
        </section>
      </main>
    </div>
  );
};

// --- AI PROMPT MODAL WORKFLOW ---
const AIPromptModal = ({ 
  setView, glassPanel, currentUser, showToast,
  researchTopic, setResearchTopic, researchMode, setResearchTopicMode,
  aiStep, setAiStep, isResearching, researchSources, aiOutline, setAiOutline,
  triggerAIResearch, applyAIOutlineToSlides, inputUrl, setInputUrl, slideLimit
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-md p-4 animate-in fade-in">
      <div className={`w-full max-w-4xl rounded-[2.5rem] p-8 md:p-10 relative shadow-2xl ${glassPanel} border border-white/20 dark:border-slate-800/80 animate-in zoom-in-95 duration-300 overflow-y-auto max-h-[90vh] custom-scrollbar`}>
        <button onClick={() => setView('dashboard')} className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all bg-slate-200/50 dark:bg-slate-800 p-2.5 rounded-full">
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 mb-4 shadow-inner">
            <BrainCircuit className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold mb-2 flex items-center gap-2">
            AI Research Agent
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            AI mencari referensi ilmiah, menautkan daftar pustaka, menyusun outline komprehensif, dan Anda dapat mengoreksinya sebelum slide dibuat (Maks. {slideLimit} slide).
          </p>
        </div>

        {aiStep === 'research' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-4 flex-wrap">
               <button onClick={() => setResearchTopicMode('prompt')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${researchMode === 'prompt' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>Instruksi Prompt Bebas</button>
               <button onClick={() => setResearchTopicMode('url')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${researchMode === 'url' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>Tautan Web Jurnal</button>
            </div>

            <div className="space-y-4">
              {researchMode === 'url' && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400">Masukkan URL Jurnal / Artikel</label>
                  <input 
                    type="text" 
                    placeholder="https://contohjurnal.or.id/analisis-dampak-ai"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    className="w-full bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500 font-semibold text-sm"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400">Tulis Topik Riset Utama</label>
                <textarea 
                  value={researchTopic}
                  onChange={(e) => setResearchTopic(e.target.value)}
                  className="w-full h-32 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-base font-semibold"
                  placeholder="Contoh: Tantangan Penerapan Sistem Belajar Personalisasi Berbasis AI..."
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
              <button 
                onClick={triggerAIResearch}
                disabled={isResearching || !researchTopic}
                className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold transition-all ${researchTopic ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'}`}
              >
                {isResearching ? (
                  <><RefreshCw className="w-5 h-5 animate-spin"/> Menganalisis...</>
                ) : (
                  <>Mulai Riset Otomatis <Sparkles className="w-5 h-5" /></>
                )}
              </button>
            </div>
          </div>
        )}

        {aiStep === 'outline' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl text-xs font-bold flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>AI Fact-Checker Aktif: Seluruh materi telah diverifikasi dengan sumber akademis.</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3 bg-slate-100/50 dark:bg-slate-900/50 p-4 rounded-3xl border border-slate-200/50 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Sumber Terkait</h4>
                <div className="space-y-2">
                  {researchSources.map((src, sidx) => (
                    <div key={sidx} className="p-2.5 bg-white dark:bg-slate-950 rounded-xl text-[11px] border border-slate-200 dark:border-slate-800">
                       <p className="font-extrabold text-slate-800 dark:text-slate-100 truncate">{src.title}</p>
                       <p className="text-indigo-400 font-semibold mt-1">Relevansi: {src.relevance}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 space-y-3">
                 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Ditinjau & Edit Outline ({aiOutline.length} Slide)</h4>
                 <div className="space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
                   {aiOutline.map((item, oidx) => (
                     <div key={oidx} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between gap-4">
                        <div className="flex-1">
                          <input 
                            type="text" 
                            value={item.title}
                            onChange={(e) => {
                              const updatedTitle = e.target.value;
                              setAiOutline(prev => prev.map((it, idx) => idx === oidx ? { ...it, title: updatedTitle } : it));
                            }}
                            className="bg-transparent border-none outline-none font-bold text-xs md:text-sm text-slate-800 dark:text-white w-full"
                          />
                        </div>
                        <button 
                          onClick={() => setAiOutline(prev => prev.filter((_, idx) => idx !== oidx))}
                          className="text-red-500 hover:bg-red-500/10 p-1.5 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4"/>
                        </button>
                     </div>
                   ))}
                 </div>
                 <button 
                   onClick={() => setAiOutline([...aiOutline, { slide: aiOutline.length + 1, title: 'Slide Tambahan', desc: 'Isi kustomisasi.' }])}
                   className="w-full py-2 border-2 border-dashed border-slate-300 dark:border-slate-800 text-xs font-bold rounded-2xl hover:border-indigo-500 hover:text-indigo-500 transition-all text-slate-500"
                 >
                   + Tambah Halaman Slide Baru dalam Outline
                 </button>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-slate-200 dark:border-slate-800">
              <button onClick={() => setAiStep('research')} className="text-xs font-bold text-slate-400 hover:text-slate-100">Kembali</button>
              <button 
                onClick={applyAIOutlineToSlides}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-8 py-3 rounded-2xl shadow-lg transform hover:scale-105 active:scale-95"
              >
                Buat Slide Sekarang <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// --- WORKSPACE & EDITOR COMPONENTS ---
const EditorWorkspace = ({ 
  setView, glassPanel, isDark, 
  slides, setSlides, activeSlideId, setActiveSlideId, activeSlide, 
  activeTheme, setActiveTheme, leftTab, setLeftTab,
  presentationTitle, setPresentationTitle, currentUser, showToast,
  isRecording, startRecordingCoach, stopRecordingCoach, coachStats, speechTimer,
  comments, setComments, newCommentText, setNewCommentText,
  versionHistory, setVersionHistory, brandColors, setBrandColors, brandFont, setBrandFont,
  generatedLessonPlan, isGeneratingPlan, generateModulAjar,
  isSpeakPlaying, toggleTextToSpeech, handleAddSlide, duplicateSlide, deleteSlide, slideLimit
}) => {
  const [imageGenerating, setImageGenerating] = useState(false);
  const [generatedImg, setGeneratedImg] = useState(null);

  // New quiz state
  const [newQuestion, setNewQuestion] = useState('');
  const [newOpt1, setNewOpt1] = useState('');
  const [newOpt2, setNewOpt2] = useState('');
  const [newCorrect, setNewCorrect] = useState(0);

  const handleGenerateImage = () => {
    setImageGenerating(true);
    setTimeout(() => {
      setImageGenerating(false);
      setGeneratedImg('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80');
      showToast("Ilustrasi AI Berhasil Terbuat!");
    }, 1500);
  };

  const handleAddQuiz = () => {
    if(!newQuestion || !newOpt1 || !newOpt2) return;
    const updatedQuizzes = [...(activeSlide.quizzes || [])];
    updatedQuizzes.push({
      id: `q-${Date.now()}`,
      question: newQuestion,
      options: [newOpt1, newOpt2],
      correct: newCorrect
    });
    setSlides(prev => prev.map(s => s.id === activeSlide.id ? { ...s, quizzes: updatedQuizzes } : s));
    setNewQuestion('');
    setNewOpt1('');
    setNewOpt2('');
    showToast("Soal Kuis Berhasil Ditambahkan!");
  };

  const handleAddComment = () => {
    if (!newCommentText) return;
    setComments([
      ...comments,
      { id: `c-${Date.now()}`, user: currentUser.displayName, text: newCommentText, time: 'Baru saja', slideId: activeSlide.id }
    ]);
    setNewCommentText('');
    showToast("Komentar ditambahkan!");
  };

  const selectedTheme = THEMES[activeTheme] || THEMES['sunset-purple'];

  return (
    <div className="flex flex-1 overflow-hidden relative">
      
      {/* Tool Sidebar */}
      <aside className={`w-16 border-r flex flex-col items-center py-6 space-y-5 ${isDark ? 'bg-slate-900/80 border-slate-800/80' : 'bg-white border-slate-200'} z-20 backdrop-blur-md`}>
        <ToolIcon icon={<LayoutPanelLeft />} tooltip="Gaya & Tema" active={leftTab === 'templates'} onClick={() => setLeftTab('templates')} />
        <ToolIcon icon={<Type />} tooltip="Teks & AI Rewrite" active={leftTab === 'text'} onClick={() => setLeftTab('text')} />
        <ToolIcon icon={<ImageIcon />} tooltip="Gambar AI" active={leftTab === 'media'} onClick={() => setLeftTab('media')} />
        <ToolIcon icon={<Shapes />} tooltip="SWOT & Analisis" active={leftTab === 'diagrams'} onClick={() => setLeftTab('diagrams')} />
        <ToolIcon icon={<BookOpen />} tooltip="Kurikulum Merdeka" active={leftTab === 'education'} onClick={() => setLeftTab('education')} />
        <ToolIcon icon={<Mic />} tooltip="Presenter Coach & Speak" active={leftTab === 'coach'} onClick={() => setLeftTab('coach')} />
        <div className="w-8 h-[1px] bg-slate-200 dark:bg-slate-800 my-1"></div>
        <ToolIcon icon={<Palette />} tooltip="Brand Kit" active={leftTab === 'brand'} onClick={() => setLeftTab('brand')} />
        <ToolIcon icon={<MessageCircle />} tooltip="Kolaborasi" active={leftTab === 'collaboration'} onClick={() => setLeftTab('collaboration')} />
        <ToolIcon icon={<History />} tooltip="Riwayat Versi" active={leftTab === 'history'} onClick={() => setLeftTab('history')} />
      </aside>

      {/* Floating Panel Panel */}
      <div className={`w-64 md:w-72 border-r overflow-y-auto p-5 space-y-6 ${isDark ? 'bg-slate-900/40 border-slate-800/60' : 'bg-slate-50/75 border-slate-200'} z-10 backdrop-blur-sm custom-scrollbar`}>
        {leftTab === 'templates' && (
          <div className="space-y-4 animate-in fade-in duration-300">
             <h3 className="font-extrabold text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">Tema Slide</h3>
             <div className="space-y-2 pt-2">
               {Object.keys(THEMES).map(k => (
                 <button 
                   key={k} onClick={() => { setActiveTheme(k); showToast(`Tema berganti.`); }}
                   className={`w-full p-3 rounded-2xl flex items-center justify-between border text-left transition-all ${activeTheme === k ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50'}`}
                 >
                   <span className="text-xs font-bold">{THEMES[k].name}</span>
                 </button>
               ))}
             </div>
          </div>
        )}

        {leftTab === 'text' && (
          <div className="space-y-4 animate-in fade-in duration-300">
             <h3 className="font-extrabold text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">AI Content Rewrite</h3>
             <div className="grid grid-cols-1 gap-2 pt-2">
                <button onClick={() => handleAIRewrite('Akademik')} className="p-3 bg-white/40 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-left rounded-2xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-indigo-500" /> Nada Akademik / Formal
                </button>
             </div>
          </div>
        )}

        {leftTab === 'media' && (
          <div className="space-y-4 animate-in fade-in duration-300">
             <h3 className="font-extrabold text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">AI Image Generator</h3>
             <button 
               onClick={handleGenerateImage} disabled={imageGenerating}
               className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2"
             >
               {imageGenerating ? <RefreshCw className="w-4 h-4 animate-spin"/> : <Sparkles className="w-4 h-4"/>} Buat Ilustrasi AI
             </button>
          </div>
        )}

        {leftTab === 'diagrams' && (
          <div className="space-y-4 animate-in fade-in duration-300">
             <h3 className="font-extrabold text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">AI Struktur & Model</h3>
             <button onClick={() => {
                setSlides(prev => prev.map(s => s.id === activeSlide.id ? { ...s, type: 'swot', swot: { strengths: ['Kekuatan'], weaknesses: ['Kelemahan'], opportunities: ['Peluang'], threats: ['Ancaman'] } } : s));
                showToast("Struktur diganti ke SWOT!");
             }} className="w-full p-3 bg-white/40 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-left font-bold hover:bg-slate-100 dark:hover:bg-slate-850 flex items-center gap-2">
                <Shapes className="w-4 h-4 text-purple-500" /> SWOT Analysis Layout
             </button>
          </div>
        )}

        {leftTab === 'education' && (
          <div className="space-y-4 animate-in fade-in duration-300">
             <h3 className="font-extrabold text-sm text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-2">Kurikulum Merdeka 2.0</h3>
             <button 
               onClick={generateModulAjar} disabled={isGeneratingPlan}
               className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-2xl text-xs"
             >
               {isGeneratingPlan ? 'Menyusun Rencana...' : 'Buat Modul Ajar & LKPD'}
             </button>

             {generatedLessonPlan && (
               <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-amber-500/20 text-[11px] space-y-2">
                  <p className="font-extrabold text-amber-500 text-xs">Modul Ajar Pembelajaran</p>
                  <p className="text-slate-400"><strong className="text-slate-200">Mata Pelajaran:</strong> {generatedLessonPlan.mataPelajaran}</p>
                  <p className="text-slate-400">{generatedLessonPlan.lkpd.instruksi}</p>
               </div>
             )}
          </div>
        )}

        {leftTab === 'coach' && (
          <div className="space-y-4 animate-in fade-in duration-300">
             <h3 className="font-extrabold text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">AI Presenter Coach</h3>
             {isRecording ? (
               <div className="space-y-3">
                 <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-center text-xs font-bold animate-pulse">
                    🔴 Sedang Merekam ({speechTimer}s)
                 </div>
                 <button onClick={stopRecordingCoach} className="w-full py-3 bg-slate-800 text-white rounded-2xl text-xs font-bold">Hentikan Latihan</button>
               </div>
             ) : (
               <button onClick={startRecordingCoach} className="w-full py-3 bg-indigo-600 text-white rounded-2xl text-xs font-bold">Mulai Latihan</button>
             )}

             {coachStats && (
               <div className="p-4 bg-slate-100/50 dark:bg-slate-900/50 rounded-2xl border text-[11px] space-y-2">
                 <p className="font-extrabold text-indigo-400 text-xs">Skor Performa: {coachStats.score}/100</p>
                 <p className="text-slate-400"><strong className="text-slate-200">Rekomendasi:</strong> {coachStats.recommendation}</p>
               </div>
             )}
          </div>
        )}

        {leftTab === 'brand' && (
          <div className="space-y-4 animate-in fade-in duration-300">
             <h3 className="font-extrabold text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">Brand Kit</h3>
             <div className="space-y-2">
               <label className="text-[11px] font-bold text-slate-400">Pilihan Font</label>
               <select value={brandFont} onChange={(e) => setBrandFont(e.target.value)} className="w-full bg-white dark:bg-slate-900 border border-slate-200 p-2.5 rounded-xl text-xs">
                 <option>Inter</option>
                 <option>Geist</option>
               </select>
             </div>
          </div>
        )}

        {leftTab === 'collaboration' && (
          <div className="space-y-4 animate-in fade-in duration-300">
             <h3 className="font-extrabold text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">Kolaborasi</h3>
             <div className="space-y-3">
               <div className="space-y-2 max-h-[160px] overflow-y-auto custom-scrollbar">
                 {comments.map((comm) => (
                   <div key={comm.id} className="p-2.5 bg-white dark:bg-slate-900 rounded-xl text-[11px] border border-slate-200 space-y-1">
                      <p className="font-extrabold text-slate-700 dark:text-slate-200">{comm.user}</p>
                      <p className="text-slate-500">{comm.text}</p>
                   </div>
                 ))}
               </div>
               <div className="flex gap-2">
                  <input 
                    type="text" placeholder="Tulis diskusi..." value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)}
                    className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 rounded-xl p-2 text-xs outline-none"
                  />
                  <button onClick={handleAddComment} className="px-3 py-2 bg-indigo-600 text-white rounded-xl text-xs">Kirim</button>
               </div>
             </div>
          </div>
        )}

        {leftTab === 'history' && (
          <div className="space-y-4 animate-in fade-in duration-300">
             <h3 className="font-extrabold text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">Riwayat Versi</h3>
             <div className="space-y-2">
               {versionHistory.map((v) => (
                 <div key={v.id} className="p-3 bg-white/40 dark:bg-slate-900/40 border border-slate-200 rounded-2xl flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs">{v.name}</h4>
                      <p className="text-[10px] text-slate-400">{v.user} • {v.time}</p>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        )}
      </div>

      {/* Slide Navigator */}
      <aside className="w-48 md:w-52 border-r border-slate-800 overflow-y-auto p-4 space-y-4 custom-scrollbar">
         <div className="flex justify-between items-center px-1">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Navigator Slide</span>
            <span className="text-xs font-bold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-full">{slides.length}</span>
         </div>
         
         <div className="space-y-3">
           {slides.map((s, idx) => (
             <div 
                key={s.id} onClick={() => setActiveSlideId(s.id)}
                className={`group/item aspect-video rounded-2xl border-2 cursor-pointer transition-all relative ${activeSlideId === s.id ? 'border-indigo-500' : 'border-slate-200 dark:border-slate-800'}`}
              >
                <span className="absolute -top-2 -left-2 w-5 h-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-bold rounded-full flex items-center justify-center border border-white/20 shadow-md">
                  {idx + 1}
                </span>

                <div className="absolute top-1.5 right-1.5 opacity-0 group-hover/item:opacity-100 flex gap-1 z-20">
                  <button onClick={(e) => { e.stopPropagation(); duplicateSlide(s); }} className="p-1 bg-slate-800 text-white rounded"><Copy className="w-3" /></button>
                  <button onClick={(e) => { e.stopPropagation(); deleteSlide(s.id); }} className="p-1 bg-red-600 text-white rounded"><Trash2 className="w-3" /></button>
                </div>

                <div className={`w-full h-full rounded-2xl ${isDark ? 'bg-slate-900' : 'bg-white'} p-2.5 flex flex-col justify-between overflow-hidden`}>
                   <div className="w-full h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full animate-pulse"></div>
                   <div className="flex justify-between items-center pt-1 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-[9px] text-slate-400 font-bold uppercase truncate max-w-[70px]">{s.type}</span>
                   </div>
                </div>
             </div>
           ))}
         </div>
         
         <button 
           onClick={() => handleAddSlide('content')}
           className="w-full py-3.5 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-800/80 flex flex-col items-center justify-center text-slate-500 hover:text-indigo-500 hover:border-indigo-500 transition-all font-bold gap-1 mt-4"
         >
            <Plus className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-wider">Tambah Slide</span>
         </button>
      </aside>

      {/* Slide Canvas */}
      <main className="flex-1 overflow-auto flex flex-col items-center justify-start bg-slate-200/40 dark:bg-slate-950 relative custom-scrollbar pb-16">
        <div className="w-[92%] max-w-[950px] aspect-video mt-10 rounded-3xl relative overflow-hidden p-10 md:p-12 border shadow-2xl transition-all" style={{ backgroundColor: selectedTheme.slideBg, borderColor: selectedTheme.borderColor }}>
          <div className="flex justify-between items-center mb-6">
            <span className={`px-3 py-1 ${selectedTheme.accentColor} text-white font-bold text-xs tracking-widest rounded-full uppercase`}>
              {activeSlide.badge || 'MODUL INTERAKTIF'}
            </span>
          </div>

          <div className="flex-grow flex flex-col justify-center">
             {activeSlide.type === 'title' && (
               <div>
                 <h1 className={`text-4xl md:text-5xl font-black mb-5 tracking-tight ${selectedTheme.textColor}`}>{activeSlide.title}</h1>
                 <p className={`text-base md:text-lg leading-relaxed font-medium ${selectedTheme.subColor}`}>{activeSlide.subtitle}</p>
               </div>
             )}

             {activeSlide.type === 'content' && (
               <div>
                 <h2 className={`text-3xl md:text-4xl font-extrabold mb-6 tracking-tight ${selectedTheme.textColor}`}>{activeSlide.title}</h2>
                 <div className="flex gap-8">
                   <div className="w-1/2 space-y-4">
                     {activeSlide.bullets && activeSlide.bullets.map((b, idx) => (
                       <p key={idx} className={`text-sm md:text-base leading-relaxed font-medium ${selectedTheme.textColor}/90`}>• {b}</p>
                     ))}
                   </div>
                   <div className="w-1/2 rounded-2xl bg-slate-800/40 border-2 border-dashed border-slate-700/60 flex items-center justify-center min-h-[220px]">
                      {generatedImg ? (
                        <img src={generatedImg} className="w-full h-full object-cover rounded-2xl" />
                      ) : (
                        <button onClick={handleGenerateImage} className="flex items-center gap-2 bg-indigo-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs">
                          <Sparkles className="w-4 h-4"/> Buat Ilustrasi Baru
                        </button>
                      )}
                   </div>
                 </div>
               </div>
             )}

             {activeSlide.type === 'swot' && (
               <div className="animate-in fade-in">
                  <h2 className="text-3xl font-extrabold text-white mb-6">{activeSlide.title}</h2>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-indigo-600/10 border border-indigo-500/25 p-4 rounded-2xl">
                        <h4 className="font-extrabold text-indigo-400 text-xs mb-2">Strengths</h4>
                        <p className="text-xs text-slate-300">• {activeSlide.swot?.strengths[0]}</p>
                     </div>
                     <div className="bg-pink-600/10 border border-pink-500/25 p-4 rounded-2xl">
                        <h4 className="font-extrabold text-pink-400 text-xs mb-2">Weaknesses</h4>
                        <p className="text-xs text-slate-300">• {activeSlide.swot?.weaknesses[0]}</p>
                     </div>
                  </div>
               </div>
             )}
          </div>
          
          {currentUser?.tier === 'free' && (
             <div className="absolute bottom-4 right-6 opacity-30 text-[10px] font-black text-slate-500 tracking-widest uppercase">MADE WITH SLIDEGENIUS FREE</div>
          )}
        </div>

        {/* Bottom Panel */}
        <div className="w-[92%] max-w-[950px] mt-6 bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-800 flex overflow-hidden p-5 gap-6">
           <div className="w-1/2 space-y-2">
             <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Catatan Pembicara</label>
             <textarea 
               className="w-full h-24 bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 resize-none outline-none text-slate-600 dark:text-slate-400 text-xs border focus:ring-1 focus:ring-indigo-500"
               value={activeSlide.notes || ''}
               onChange={(e) => {
                 const notes = e.target.value;
                 setSlides(prev => prev.map(s => s.id === activeSlide.id ? { ...s, notes: notes } : s));
               }}
             />
           </div>
           
           <div className="w-1/2 space-y-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Daftar Kuis Adaptif ({activeSlide.quizzes?.length || 0})</label>
              <div className="space-y-2">
                 <input type="text" placeholder="Buat Pertanyaan Kuis..." value={newQuestion} onChange={(e)=>setNewQuestion(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 rounded-xl p-2 text-xs outline-none" />
                 <div className="flex gap-2">
                    <input type="text" placeholder="Opsi A..." value={newOpt1} onChange={(e)=>setNewOpt1(e.target.value)} className="w-1/2 bg-slate-50 dark:bg-slate-950 border border-slate-300 rounded-xl p-2 text-xs outline-none" />
                    <input type="text" placeholder="Opsi B..." value={newOpt2} onChange={(e)=>setNewOpt2(e.target.value)} className="w-1/2 bg-slate-50 dark:bg-slate-950 border border-slate-300 rounded-xl p-2 text-xs outline-none" />
                 </div>
                 <button onClick={handleAddQuiz} className="w-full py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs hover:bg-indigo-500">Tambah Kuis</button>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

// --- PRESENTER FULLSCREEN MODE ---
const PresenterMode = ({ setView, slides, activeTheme, presenterSlideIndex, setPresenterSlideIndex, showToast }) => {
  const currentSlide = slides[presenterSlideIndex] || {};
  const selectedTheme = THEMES[activeTheme] || THEMES['sunset-purple'];
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState(null);

  const nextPresenterSlide = () => {
    if(presenterSlideIndex < slides.length - 1) {
      setPresenterSlideIndex(prev => prev + 1);
      setSelectedQuizAnswer(null);
    } else {
      showToast("Akhir modul materi pembelajaran.");
    }
  };

  const prevPresenterSlide = () => {
    if(presenterSlideIndex > 0) {
      setPresenterSlideIndex(prev => prev - 1);
      setSelectedQuizAnswer(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 text-white flex flex-col justify-between p-8 md:p-12 animate-in fade-in">
       <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${selectedTheme.bg} rounded-full blur-[110px] opacity-30 pointer-events-none`}></div>
       
       <header className="flex justify-between items-center relative z-10">
         <div className="flex items-center gap-3">
           <BrainCircuit className="w-8 h-8 text-indigo-400 animate-pulse" />
           <span className="text-lg font-bold tracking-tight">SlideGenius Presenter Mode</span>
         </div>
         <button onClick={() => setView('editor')} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-xl text-xs font-bold border border-white/15">
           Keluar Modul <X className="w-4 h-4"/>
         </button>
       </header>

       <div className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full relative z-10 py-10">
          <div className="w-full text-center space-y-6">
             <span className={`px-4 py-1.5 ${selectedTheme.accentColor} text-white font-bold text-xs tracking-widest rounded-full uppercase`}>
               {currentSlide.badge || 'MODUL INTERAKTIF'}
             </span>
             <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight">
               {currentSlide.title}
             </h1>
          </div>
       </div>

       <footer className="flex justify-between items-center border-t border-white/10 pt-6 relative z-10">
          <div className="text-xs text-slate-400 font-medium font-bold">
             Slide <strong className="text-white">{presenterSlideIndex + 1}</strong> dari <strong className="text-white">{slides.length}</strong>
          </div>
          <div className="flex gap-2">
             <button onClick={prevPresenterSlide} disabled={presenterSlideIndex === 0} className="px-5 py-2.5 bg-slate-900 hover:bg-slate-850 disabled:opacity-30 text-white rounded-xl text-xs font-bold border border-slate-800">Kembali</button>
             <button onClick={nextPresenterSlide} disabled={presenterSlideIndex === slides.length - 1} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold">Berikutnya</button>
          </div>
       </footer>
    </div>
  );
};

// --- SUBSIDIARY COMPONENTS ---
const NavItem = ({ icon, label, active, badge, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center justify-between w-full p-3 rounded-xl transition-all ${active ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold border-l-4 border-indigo-500' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850/50 hover:text-slate-900 dark:hover:text-white'}`}
  >
    <div className="flex items-center gap-3">
      {React.cloneElement(icon, { className: 'w-5 h-5' })}
      <span className="text-sm">{label}</span>
    </div>
    {badge && <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{badge}</span>}
  </button>
);

const ProjectCard = ({ title, time, slides, cover, onClick }) => (
  <div onClick={onClick} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-[1.8rem] overflow-hidden shadow-sm hover:shadow-2xl hover:border-indigo-500/30 transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
    <div className={`h-40 w-full ${cover} relative p-4 flex flex-col justify-between`}>
      <div className="self-end bg-white/20 backdrop-blur-md text-white text-xs px-2 py-1 rounded-lg font-medium border border-white/20">
        {slides} Slides
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center backdrop-blur-[1px]">
         <div className="bg-white text-indigo-600 rounded-full p-3.5 opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 shadow-xl">
           <Play className="w-6 h-6 ml-1 fill-current" />
         </div>
      </div>
    </div>
    <div className="p-5">
      <h3 className="font-extrabold text-slate-800 dark:text-slate-100 mb-2 truncate text-lg">{title}</h3>
      <div className="flex justify-between items-center text-xs text-slate-400">
        <span className="flex items-center gap-1"><History className="w-4 h-4"/> {time}</span>
      </div>
    </div>
  </div>
);

const Badge = ({ icon, text, onClick }) => (
  <button onClick={onClick} className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-3.5 py-2.5 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 text-xs font-bold text-slate-600 dark:text-slate-300 transition-all">
    {icon} {text}
  </button>
);

const ToolIcon = ({ icon, active, tooltip, onClick }) => (
  <div className="group relative">
    <button 
      onClick={onClick}
      className={`p-3.5 rounded-2xl transition-all duration-200 ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white'}`}
    >
      {React.cloneElement(icon, { className: 'w-5 h-5' })}
    </button>
    <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-md font-bold">
      {tooltip}
    </div>
  </div>
);
