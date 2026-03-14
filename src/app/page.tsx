'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Camera, ArrowRight, Globe } from 'lucide-react';
import PhotoUploadWizard from '@/components/Wizard/PhotoUploadWizard';
import { Language } from '@/lib/types';

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const [lang, setLang] = useState<Language>('tr');

  const toggleLang = () => {
    setLang(l => l === 'tr' ? 'en' : 'tr');
  };

  const t = {
    badge: lang === 'tr' ? 'Yapay Zeka Destekli Stil Danışmanı' : 'AI-Powered Beauty & Style Advisor',
    title1: lang === 'tr' ? 'Kusursuz Tarzını' : 'Discover Your',
    title2: lang === 'tr' ? 'Keşfet' : 'Perfect Aesthetic',
    desc: lang === 'tr' 
      ? 'İki basit fotoğraf yükle; yapay zeka alt tonunu, yüz hatlarını ve şeklini analiz ederek sana özel 12-sezon renk paletini, ideal saç kesimini ve imza tarzını ortaya çıkarsın.'
      : 'Upload two simple photos and let our AI analyze your undertone, features, and face shape to reveal your 12-season color palette, ideal haircuts, and signature style.',
    btn: lang === 'tr' ? 'Analize Başla' : 'Start Analysis',
    features: lang === 'tr' 
      ? ['12 Sezon Renk', 'Yüz Şekli Uyumu', 'Makyaj Paleti', 'Saç ve Gözlük']
      : ['12-Season Colors', 'Face Shape Match', 'Makeup Palette', 'Haircut Guide']
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 overflow-hidden selection:bg-rose-500/30">
      {/* Dynamic Background Gradients */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-rose-500/10 blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px] mix-blend-screen pointer-events-none"></div>

      {/* Header Controls */}
      <div className="absolute top-0 w-full p-6 flex justify-end z-50">
        <button 
          onClick={toggleLang}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"
        >
          <Globe className="w-4 h-4" />
          {lang === 'tr' ? 'EN' : 'TR'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-screen px-6 container mx-auto text-center relative z-10"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 text-sm font-medium text-slate-300"
            >
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>{t.badge}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400"
            >
              {t.title1} <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-400">{t.title2}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed"
            >
              {t.desc}
            </motion.p>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setHasStarted(true)}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-950 font-semibold rounded-full overflow-hidden shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-rose-200 to-indigo-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Camera className="w-5 h-5 relative z-10" />
              <span className="relative z-10 text-lg">{t.btn}</span>
              <ArrowRight className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            {/* Features Row */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24 w-full max-w-4xl opacity-60"
            >
              {t.features.map((feature) => (
                <div key={feature} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-rose-400/50"></div>
                  <span className="text-sm font-medium text-center">{feature}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="wizard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen relative z-10 py-12"
          >
            <PhotoUploadWizard lang={lang} onBack={() => setHasStarted(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
