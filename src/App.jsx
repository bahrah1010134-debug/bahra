import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import ResultCard from './components/ResultCard';
import ParticleField from './components/ParticleField';
import employees from './data/employees.json';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchX, Info } from 'lucide-react';

function App() {
  const [query, setQuery] = useState('');
  
  const normalizeQuery = (val) => {
    if (!val) return '';
    return val.toString()
      .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)) // Standard Arabic digits
      .replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)) // Eastern Arabic digits
      .replace(/[^\d]/g, '')
      .trim();
  };

  const foundTeacher = useMemo(() => {
    const cleanQuery = normalizeQuery(query);
    if (cleanQuery.length < 5) return null;
    return employees.find(e => e.id === cleanQuery) || null;
  }, [query]);

  return (
    <div className="min-h-screen bg-mesh relative">
      {/* Animated Background Particles */}
      <ParticleField />
      
      {/* Main Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto">
        <Header />
        
        <main className="mt-2">
          <SearchInput value={query} onChange={setQuery} />
          
          <div className="mt-8">
            <AnimatePresence mode="wait">
              {foundTeacher ? (
                <ResultCard key={foundTeacher.id} teacher={foundTeacher} />
              ) : query.length >= 10 ? (
                <motion.div
                  key="not-found"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-md mx-auto px-4 mt-8"
                >
                  <div className="glass-card rounded-3xl p-8 text-center relative overflow-hidden">
                    <div className="h-[2px] bg-gradient-to-r from-transparent via-rose-500/50 to-transparent absolute top-0 left-0 right-0" />
                    
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-4"
                    >
                      <SearchX size={28} className="text-rose-400" />
                    </motion.div>
                    
                    <h3 className="text-lg font-bold text-dark-50 mb-2">
                      لم يتم العثور على سجل
                    </h3>
                    <p className="text-dark-300 text-sm leading-relaxed">
                      يرجى التأكد من كتابة رقم الهوية الوطنية بشكل صحيح
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  className="text-center mt-16 px-8"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex items-center gap-2 text-dark-300 text-sm"
                  >
                    <Info size={16} className="text-accent-400 opacity-60" />
                    <span>أدخل رقم الهوية الوطنية للاستعلام عن رابط المجلد</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="fixed bottom-0 left-0 right-0 p-5 pointer-events-none z-20">
          <div className="max-w-md mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-800/60 backdrop-blur-md border border-dark-600/30">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-dark-300 font-semibold tracking-wider">
                مدرسة بحرة المجاهدين الثانية — مكة المكرمة
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
