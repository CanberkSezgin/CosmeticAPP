import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, ArrowRight, ArrowLeft, RefreshCw, Sparkles, Image as ImageIcon } from 'lucide-react';
import { AnalysisResult, Language } from '@/lib/types';
import ResultsDashboard from '@/components/Dashboard/ResultsDashboard';

interface PhotoUploadWizardProps {
  onBack: () => void;
  lang: Language;
}

export default function PhotoUploadWizard({ onBack, lang }: PhotoUploadWizardProps) {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [veinImage, setVeinImage] = useState<string | null>(null);
  const [faceImage, setFaceImage] = useState<string | null>(null);
  
  const veinInputRef = useRef<HTMLInputElement>(null);
  const faceInputRef = useRef<HTMLInputElement>(null);

  const t = {
    back: lang === 'tr' ? 'Geri' : 'Back',
    s1Title: lang === 'tr' ? 'Bilek Damar Fotoğrafı' : 'Wrist Vein Photo',
    s1Desc: lang === 'tr' 
      ? 'Doğru alt ton analizi için, gün ışığında çekilmiş iç bileğinizin net bir fotoğrafını yükleyin. Bu, temel sıcaklığınızı belirlememize yardımcı olur.'
      : 'For accurate undertone analysis, upload a clear picture of your inner wrist taken in natural daylight. This helps us determine your base warmth.',
    uploadBox: lang === 'tr' ? 'Fotoğraf Seç Veya Çek' : 'Choose or capture a photo',
    s1Btn: lang === 'tr' ? '2. Adıma Geç' : 'Continue to Step 2',
    s2Title: lang === 'tr' ? 'Net Yüz Fotoğrafı (Selfie)' : 'Clear Face Selfie',
    s2Desc: lang === 'tr'
      ? 'Saçınızın geriye toplandığı, önden çekilmiş bir selfie yükleyin. Doğrudan kameraya bakın. Bu, yüz oranlarınızı ve kontrast seviyenizi haritalandırır.'
      : 'Upload a front-facing selfie with your hair pulled back. Look straight at the camera. This maps your facial proportions and contrast levels.',
    s2Upload: lang === 'tr' ? 'Fotoğraf Seç veya Çek' : 'Choose or capture a photo',
    s2Change: lang === 'tr' ? 'Fotoğrafı Değiştir' : 'Change Photo',
    analyzeBtn: lang === 'tr' ? 'Yapay Zeka ile Analizi Başlat' : 'Start AI Analysis',
    analyzingTitle: lang === 'tr' ? 'Özellikler Analiz Ediliyor...' : 'Analyzing Attributes...',
    a1: lang === 'tr' ? 'Bilek damarları Yapay Zeka ile değerlendiriliyor...' : 'AI scanning wrist veins for undertone...',
    a2: lang === 'tr' ? 'Yüz koordinatları haritalanıp, Model ile eşleştiriliyor...' : 'Gemini mapping facial coordinates...',
    a3: lang === 'tr' ? 'Kontrastınız analiz edilip mevsim paleti hesaplanıyor...' : 'Calculating your season based on contrast...',
    a4: lang === 'tr' ? 'Güzellik Rehberiniz yapay zeka tarafından derleniyor...' : 'AI is compiling your beauty guide...'
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 2));
  const handlePrev = () => {
    if (step === 1) onBack();
    else setStep((s) => Math.max(s - 1, 1));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string | null>>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartAnalysis = async () => {
    if (!faceImage || !veinImage) return;

    setIsAnalyzing(true);
    setErrorMessage(null);
    setSimulatedProgress(0);
    
    // Smooth progress simulation while waiting for real backend
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 8;
      if (progress > 90) { // Hang at 90% until backend returns
        setSimulatedProgress(92);
      } else {
        setSimulatedProgress(Math.floor(progress));
      }
    }, 400);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ faceImage, veinImage, lang })
      });

      const result = await response.json();
      
      clearInterval(interval);
      setSimulatedProgress(100);

      if (!response.ok) {
        throw new Error(result.error || 'Server error occurred.');
      }
      
      setTimeout(() => {
        setAnalysisResult(result);
        setIsAnalyzing(false);
      }, 600); 

    } catch (err: any) {
      clearInterval(interval);
      setIsAnalyzing(false);
      setErrorMessage(err.message || 'There was an issue contacting the AI server.');
    }
  };

  if (analysisResult) {
    return <ResultsDashboard result={analysisResult} lang={lang} onRestart={() => {setAnalysisResult(null); setStep(1); setVeinImage(null); setFaceImage(null);}} />;
  }

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] container mx-auto text-center px-4">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 rounded-full border-t-2 border-rose-500 opacity-20"></div>
          <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-indigo-400 border-dashed animate-spin"></div>
          <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-rose-300 animate-pulse" />
        </motion.div>
        
        <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-semibold mb-2">{t.analyzingTitle}</motion.h2>
        
        <p className="text-slate-400 mb-8 max-w-sm h-12">
          {simulatedProgress < 30 && t.a1}
          {simulatedProgress >= 30 && simulatedProgress < 60 && t.a2}
          {simulatedProgress >= 60 && simulatedProgress < 90 && t.a3}
          {simulatedProgress >= 90 && t.a4}
        </p>

        <div className="w-full max-w-md bg-slate-800 rounded-full h-2 mb-2 overflow-hidden border border-white/5 relative">
          <motion.div className="h-full bg-gradient-to-r from-rose-500 to-indigo-500" animate={{ width: `${simulatedProgress}%` }} transition={{ ease: "easeOut" }}></motion.div>
        </div>
        <span className="text-sm font-mono text-slate-500">{simulatedProgress}%</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-6 h-full flex flex-col justify-center">
      <button onClick={handlePrev} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 w-fit font-medium">
        <ArrowLeft className="w-4 h-4" /> {t.back}
      </button>

      <div className="flex justify-center gap-4 mb-4">
        <div className={`h-2 rounded-full transition-all duration-300 ${step === 1 ? 'w-16 bg-rose-500' : 'w-8 bg-slate-700'}`}></div>
        <div className={`h-2 rounded-full transition-all duration-300 ${step === 2 ? 'w-16 bg-indigo-500' : 'w-8 bg-slate-700'}`}></div>
      </div>
      
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-center text-sm font-medium">
          {errorMessage}
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col items-center bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5"><Camera className="w-48 h-48" /></div>
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-6"><span className="text-2xl font-bold">1</span></div>
            <h2 className="text-3xl font-bold mb-3 text-center">{t.s1Title}</h2>
            <p className="text-slate-400 text-center max-w-md mb-10">{t.s1Desc}</p>

            <input type="file" accept="image/*" className="hidden" ref={veinInputRef} onChange={(e) => handleImageUpload(e, setVeinImage)} />

            <div onClick={() => veinInputRef.current?.click()} className="w-full h-64 border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-rose-500/50 hover:bg-white/5 transition-all cursor-pointer group mb-10 overflow-hidden relative">
              {veinImage ? (
                <>
                  <img src={veinImage} alt="Vein" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><span className="bg-slate-900/80 px-4 py-2 rounded-full text-white text-sm font-medium backdrop-blur-md">{t.s2Change}</span></div>
                </>
              ) : (
                <>
                  <div className="p-4 rounded-full bg-slate-800 group-hover:bg-rose-500/20 transition-colors"><Upload className="w-8 h-8 text-slate-400 group-hover:text-rose-400" /></div>
                  <span className="text-slate-300 font-medium">{t.uploadBox}</span><span className="text-xs text-slate-500">JPG, PNG</span>
                </>
              )}
            </div>

            <button onClick={handleNext} disabled={!veinImage} className={`px-8 py-4 bg-slate-800 text-white font-medium rounded-full flex items-center gap-2 transition-all w-full justify-center group ${!veinImage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-700 hover:scale-[1.02]'}`}>
              {t.s1Btn} <ArrowRight className={`w-4 h-4 transform ${veinImage ? 'group-hover:translate-x-1' : ''} transition-transform`} />
            </button>
            {!veinImage && <span className="text-xs text-rose-400 mt-4">* {lang === 'tr' ? 'Lütfen devam etmek için fotoğraf yükleyin' : 'Please upload a photo to continue'}</span>}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col items-center bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6"><span className="text-2xl font-bold">2</span></div>
            <h2 className="text-3xl font-bold mb-3 text-center">{t.s2Title}</h2>
            <p className="text-slate-400 text-center max-w-md mb-10">{t.s2Desc}</p>

            <input type="file" accept="image/*" className="hidden" ref={faceInputRef} onChange={(e) => handleImageUpload(e, setFaceImage)} />

            <div onClick={() => faceInputRef.current?.click()} className="w-full h-64 border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-indigo-500/50 hover:bg-white/5 transition-all cursor-pointer group mb-10 overflow-hidden relative">
              {faceImage ? (
                <>
                  <img src={faceImage} alt="Face Upload" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><span className="bg-slate-900/80 px-4 py-2 rounded-full text-white text-sm font-medium backdrop-blur-md">{t.s2Change}</span></div>
                </>
              ) : (
                <>
                  <div className="p-4 rounded-full bg-slate-800 group-hover:bg-indigo-500/20 transition-colors"><Camera className="w-8 h-8 text-slate-400 group-hover:text-indigo-400" /></div>
                  <span className="text-slate-300 font-medium">{t.s2Upload}</span>
                </>
              )}
            </div>

            <button onClick={handleStartAnalysis} disabled={!faceImage} className={`w-full relative group overflow-hidden rounded-full p-[1px] transition-all ${!faceImage ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}>
              <span className={`absolute inset-0 bg-gradient-to-r from-rose-500 to-indigo-500 rounded-full ${faceImage ? 'opacity-70 group-hover:opacity-100 transition-opacity' : 'opacity-20'}`}></span>
              <div className="relative px-8 py-4 bg-slate-950 rounded-full flex items-center justify-center gap-3 transition-colors group-hover:bg-transparent">
                <Sparkles className="w-5 h-5 text-white" />
                <span className="text-white font-bold text-lg">{t.analyzeBtn}</span>
              </div>
            </button>
            {!faceImage && <span className="text-xs text-rose-400 mt-4">* {lang === 'tr' ? 'Lütfen devam etmek için fotoğraf yükleyin' : 'Please upload a photo to continue'}</span>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
