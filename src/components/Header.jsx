import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex flex-col items-center justify-center pt-12 pb-8 px-4 text-center"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
        <img 
          src="/logo.png" 
          alt="School Logo" 
          className="relative w-32 h-32 object-contain"
        />
      </div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">
        مدرسة بحرة المجاهدين الثانية
      </h1>
      <p className="text-slate-500 font-medium">
        الابتدائية والمتوسطة بمكة المكرمة
      </p>
      <div className="mt-4 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold">
        بوابة استعلام الروابط الالكترونية
      </div>
    </motion.header>
  );
};

export default Header;
