import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalysisResult, Language } from '@/lib/types';
import { Palette, Scissors, Glasses, RefreshCw, Sparkles, CheckCircle2, User, X, Droplet } from 'lucide-react';

interface ResultsDashboardProps {
  result: AnalysisResult;
  lang: Language;
  onRestart: () => void;
}

type TryOnState = {
  type: 'hairColor' | 'haircut' | 'glasses' | null;
  name: string;
  hex?: string;
};

export default function ResultsDashboard({ result, lang, onRestart }: ResultsDashboardProps) {
  const [activeTryOn, setActiveTryOn] = useState<TryOnState>({ type: null, name: '' });

  const t = {
    title1: lang === 'tr' ? 'Güzellik' : 'Your Beauty',
    title2: lang === 'tr' ? 'Rehberin' : 'Blueprint',
    descPre: lang === 'tr' ? 'Algılanan' : 'Based on your',
    descMid: lang === 'tr' ? 'alt tonun ve' : 'undertone and',
    descPost: lang === 'tr' ? 'yüz şeklin için kişiselleştirilmiş rehberin:' : 'face shape, here is your customized style guide.',
    complete: lang === 'tr' ? 'Analiz Tamamlandı' : 'Analysis Complete',
    season: lang === 'tr' ? '12-Sezon Renk Analizi' : '12-Season Color',
    bestColors: lang === 'tr' ? 'İmza Renklerin' : 'Your Signature Colors',
    avoidColors: lang === 'tr' ? 'Kaçınılması Gerekenler' : 'Colors to Avoid',
    why: lang === 'tr' ? 'Neden?' : 'Why?',
    combine: lang === 'tr' ? 'Nasıl Kombinlenir?' : 'How to Combine?',
    haircutTitle: lang === 'tr' ? 'Saç Kesimi Rehberi' : 'Haircut Guide',
    haircutSub: lang === 'tr' ? 'yüz hatlarını dengeleyecek kesimler.' : 'features.',
    hairColorTitle: lang === 'tr' ? 'Saç Rengi Rehberi' : 'Hair Color Guide',
    glassesTitle: lang === 'tr' ? 'Gözlük & Çerçeve Rehberi' : 'Frame & Glasses Guide',
    tryOnBtn: lang === 'tr' ? 'Dene (Try-On)' : 'Virtual Try-On',
    restart: lang === 'tr' ? 'Yeni Analiz Başlat' : 'Start New Analysis',
    original: lang === 'tr' ? 'Orijinal Haline Dön' : 'Revert to Original'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="container mx-auto px-4 py-12 max-w-6xl">
      
      {/* Header Section */}
      <motion.div variants={itemVariants} className="text-center mb-12 relative">
        <div className="inline-flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium text-sm">
            <CheckCircle2 className="w-4 h-4" /> {t.complete}
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          {t.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-400">{t.title2}</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          {t.descPre} <span className="text-rose-300 font-semibold">{result.undertone}</span> {t.descMid} <span className="text-indigo-300 font-semibold">{result.faceShape}</span> {t.descPost}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-start">
        
        {/* Left Column: User Image & Try-On Simulator */}
        <motion.div variants={itemVariants} className="lg:col-span-4 sticky top-8">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-xl overflow-hidden relative group">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden relative bg-slate-800">
               {result.imageUrl ? (
                 <img src={result.imageUrl} alt="User Face" className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center">
                   <User className="w-16 h-16 text-slate-600" />
                 </div>
               )}

               {/* Simulated AR Overlay */}
               <AnimatePresence>
                 {activeTryOn.type === 'hairColor' && (
                   <motion.div 
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                     className="absolute inset-0 z-10 pointer-events-none transition-colors duration-700 mix-blend-color"
                     style={{ 
                       background: `radial-gradient(ellipse at 50% 20%, ${activeTryOn.hex || 'transparent'} 0%, transparent 60%)`,
                       opacity: 0.8
                     }}
                   />
                 )}
                 {activeTryOn.type === 'glasses' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                    >
                      {/* Stylized Glasses Overlay */}
                      <svg width="45%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-800 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] transform -translate-y-8">
                        <circle cx="6" cy="15" r="4"></circle><circle cx="18" cy="15" r="4"></circle><path d="M14 15a2 2 0 0 0-4 0"></path><path d="M2.5 13 6 7c.7-1 1.6-1.5 2.5-1.5h7c.9 0 1.8.5 2.5 1.5l3.5 6"></path>
                      </svg>
                    </motion.div>
                 )}
                  {activeTryOn.type === 'haircut' && (
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                      className="absolute top-4 left-0 right-0 flex justify-center z-10 pointer-events-none"
                    >
                      <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-[0_0_20px_rgba(245,158,11,0.2)] flex items-center gap-2">
                         <Sparkles className="w-3 h-3" />
                         Simulating: {activeTryOn.name}
                      </div>
                    </motion.div>
                 )}
               </AnimatePresence>

               {/* Close Try-On Button */}
               <AnimatePresence>
                {activeTryOn.type && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setActiveTryOn({ type: null, name: '' })}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg transition-colors border border-rose-400"
                  >
                    <X className="w-4 h-4" /> {t.original}
                  </motion.button>
                )}
               </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Detailed Recommendations */}
        <motion.div variants={itemVariants} className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Colors Section */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-rose-500/20 rounded-xl">
                <Palette className="w-6 h-6 text-rose-400" />
              </div>
              <h2 className="text-2xl font-bold">{t.season}</h2>
            </div>
            
            <div className="mb-8 p-6 bg-slate-950/50 rounded-2xl border border-white/5">
              <h3 className="text-3xl font-black text-rose-200 mb-3">{result.colorPalette.season}</h3>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">{result.colorPalette.description}</p>
            </div>

            <div className="space-y-8">
              {/* Best Colors */}
              <div>
                <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 block">{t.bestColors}</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {result.colorPalette.bestColors.map((color, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col gap-3 group hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full shadow-inner border border-white/10 shrink-0" style={{ backgroundColor: color.hex }}></div>
                        <div>
                          <div className="font-bold text-slate-200">{color.name}</div>
                          <div className="text-xs text-slate-500 font-mono">{color.hex}</div>
                        </div>
                      </div>
                      <div className="text-xs text-slate-400">
                        <span className="text-rose-300 font-medium">{t.why}</span> {color.reason}
                      </div>
                      <div className="text-xs text-slate-400">
                        <span className="text-indigo-300 font-medium">{t.combine}</span> {color.combinations}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Avoid Colors */}
              <div>
                <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 block">{t.avoidColors}</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {result.colorPalette.avoidColors.map((color, i) => (
                    <div key={i} className="bg-red-500/5 border border-red-500/10 rounded-2xl p-4 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full shrink-0 relative overflow-hidden" style={{ backgroundColor: color.hex }}>
                           <div className="absolute top-1/2 left-[-20%] w-[140%] h-[2px] bg-red-500/80 -rotate-45"></div>
                        </div>
                        <div>
                          <div className="font-bold text-slate-300">{color.name}</div>
                          <div className="text-xs text-slate-500 font-mono">{color.hex}</div>
                        </div>
                      </div>
                      <div className="text-xs text-slate-400">
                        <span className="text-red-400 font-medium">{t.why}</span> {color.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hair Color Section */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
             <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-pink-500/20 rounded-xl">
                <Droplet className="w-6 h-6 text-pink-400" />
              </div>
              <h2 className="text-2xl font-bold">{t.hairColorTitle}</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {result.styling.hairColors.map((color, i) => {
                const isActive = activeTryOn.type === 'hairColor' && activeTryOn.name === color.name;
                return (
                  <div key={i} className={`border rounded-2xl p-4 flex flex-col gap-4 transition-all ${isActive ? 'bg-pink-500/10 border-pink-500/30' : 'bg-white/5 border-white/5'}`}>
                    <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-start">
                       <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full shadow-inner border border-white/10 shrink-0" style={{ backgroundColor: color.hex }}></div>
                        <div>
                          <div className="font-bold text-slate-200 text-lg">{color.name}</div>
                          <div className="text-xs text-slate-500 font-mono">{color.hex}</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => setActiveTryOn({ type: 'hairColor', name: color.name, hex: color.hex })}
                        className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center justify-center transition-colors border ${isActive ? 'bg-pink-500 text-white border-pink-400' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-600'}`}
                      >
                         <Sparkles className="w-3 h-3 mr-1.5" /> {t.tryOnBtn}
                      </button>
                    </div>
                    <div className="text-sm text-slate-400">
                      <span className="text-pink-300 font-medium">{t.why}</span> {color.reason}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Haircuts Section */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-amber-500/20 rounded-xl">
                <Scissors className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{t.haircutTitle}</h2>
                <div className="text-sm text-slate-400"><span className="font-semibold text-amber-200 capitalize">{lang === 'tr' ? result.faceShape : result.faceShape + " Face"}</span> {t.haircutSub}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {result.styling.haircuts.map((cut, i) => {
                 const isActive = activeTryOn.type === 'haircut' && activeTryOn.name === cut.name;
                 return (
                  <div key={i} className={`border rounded-2xl p-4 flex flex-col gap-3 transition-all ${isActive ? 'bg-amber-500/10 border-amber-500/30' : 'bg-white/5 border-white/5'}`}>
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-slate-200 text-lg">{cut.name}</div>
                      <button 
                         onClick={() => setActiveTryOn({ type: 'haircut', name: cut.name })}
                        className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center justify-center transition-colors border ${isActive ? 'bg-amber-500 text-white border-amber-400' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-600'}`}
                      >
                         <Sparkles className="w-3 h-3 mr-1.5" /> {t.tryOnBtn}
                      </button>
                    </div>
                    <p className="text-sm text-slate-400"><span className="text-amber-300 font-medium pr-1">{t.why}</span>{cut.reason}</p>
                    <p className="text-sm text-slate-400 italic text-opacity-80">"{cut.changes}"</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Glasses Section */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-3 bg-indigo-500/20 rounded-xl">
                <Glasses className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold">{t.glassesTitle}</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {result.styling.glasses.map((style, i) => {
                const isActive = activeTryOn.type === 'glasses' && activeTryOn.name === style.name;
                return (
                  <div key={i} className={`border rounded-2xl p-4 flex flex-col gap-3 transition-all ${isActive ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-white/5 border-white/5'}`}>
                     <div className="flex justify-between items-center">
                      <div className="font-bold text-slate-200 text-lg">{style.name}</div>
                      <button 
                         onClick={() => setActiveTryOn({ type: 'glasses', name: style.name })}
                        className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center justify-center transition-colors border ${isActive ? 'bg-indigo-500 text-white border-indigo-400' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-600'}`}
                      >
                         <Sparkles className="w-3 h-3 mr-1.5" /> {t.tryOnBtn}
                      </button>
                    </div>
                    <p className="text-sm text-slate-400"><span className="text-indigo-300 font-medium pr-1">{t.why}</span>{style.reason}</p>
                    <p className="text-sm text-slate-400 italic text-opacity-80">"{style.changes}"</p>
                  </div>
                )
              })}
            </div>
          </div>

        </motion.div>
      </div>
      
      {/* Restart Button */}
      <motion.div variants={itemVariants} className="mt-16 flex justify-center pb-20">
        <button 
          onClick={onRestart}
          className="group flex items-center gap-3 px-8 py-4 rounded-full bg-slate-900 border border-white/10 hover:bg-slate-800 hover:border-white/20 transition-all shadow-lg hover:shadow-xl"
        >
          <RefreshCw className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors group-hover:rotate-180 duration-500" /> 
          <span className="text-slate-300 font-medium group-hover:text-white transition-colors">{t.restart}</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
