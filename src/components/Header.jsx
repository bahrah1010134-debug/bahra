import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center pt-12 pb-6 px-4 text-center relative"
    >
      {/* Logo Container with Glow */}
      <div className="relative mb-8">
        {/* Orbital Ring */}
        <div className="absolute -inset-4 orbit">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-400 opacity-60" />
        </div>
        
        {/* Pulse Rings */}
        <div className="absolute inset-0 rounded-full bg-accent-500/10 pulse-ring scale-150" />
        <div className="absolute inset-0 rounded-full bg-accent-500/5 pulse-ring scale-[2]" style={{ animationDelay: '1s' }} />
        
        {/* Logo Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent-500/30 to-emerald-500/20 blur-3xl rounded-full scale-150" />
        
        {/* Logo Image */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <img 
            src="/logo.png" 
            alt="شعار وزارة التعليم" 
            className="relative w-28 h-28 object-contain drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.3))' }}
          />
        </motion.div>
      </div>

      {/* School Name */}
      <motion.h1 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-2xl md:text-3xl font-bold gradient-text mb-2 leading-relaxed"
      >
        مدرسة بحرة المجاهدين الثانية
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="text-dark-200 font-medium text-sm md:text-base mb-5"
      >
        الابتدائية والمتوسطة بمكة المكرمة
      </motion.p>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        className="badge badge-indigo shimmer"
      >
        <Sparkles size={14} />
        <span>بوابة استعلام الروابط الإلكترونية</span>
      </motion.div>
    </motion.header>
  );
};

export default Header;
