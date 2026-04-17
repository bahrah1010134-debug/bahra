import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import ResultCard from './components/ResultCard';
import employees from './data/employees.json';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [query, setQuery] = useState('');
  
  const foundTeacher = useMemo(() => {
    if (query.length < 5) return null;
    return employees.find(e => e.id === query.trim()) || null;
  }, [query]);

  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      <div className="max-w-screen-xl mx-auto">
        <Header />
        
        <main className="mt-4">
          <SearchInput value={query} onChange={setQuery} />
          
          <div className="mt-8">
            <AnimatePresence mode="wait">
              {foundTeacher ? (
                <ResultCard key={foundTeacher.id} teacher={foundTeacher} />
              ) : query.length >= 10 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-slate-400 mt-12 bg-white/50 backdrop-blur-sm mx-4 p-8 rounded-3xl border border-dashed border-slate-200"
                >
                  <p className="text-lg">عذراً، لم يتم العثور على سجل بهذا الرقم</p>
                  <p className="text-sm mt-2">يرجى التأكد من كتابة رقم الهوية بشكل صحيح</p>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  className="text-center text-slate-400 mt-12 px-12"
                >
                  <p className="text-sm">أدخل رقم الهوية الشخصي الخاص بك لعرض رابط المجلد والباركود</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
        
        <footer className="fixed bottom-0 left-0 right-0 p-6 pointer-events-none">
          <div className="max-w-md mx-auto text-center opacity-40 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            © مدرسة بحرة المجاهدين الثانية - مكة المكرمة
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
