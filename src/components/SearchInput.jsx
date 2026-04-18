import React, { useState, useRef, useEffect } from 'react';
import { Search, Fingerprint, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchInput = ({ value, onChange }) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const digitCount = value.replace(/[^\d]/g, '').length;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="relative max-w-md mx-auto w-full px-4"
    >
      {/* Ambient glow behind input */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 mx-4 rounded-2xl bg-accent-500/10 blur-xl -z-10"
          />
        )}
      </AnimatePresence>

      {/* Input Container */}
      <div className="relative">
        {/* Icon */}
        <div className={`absolute right-6 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
          isFocused ? 'text-accent-400' : 'text-dark-300'
        }`}>
          <Fingerprint size={22} />
        </div>

        {/* Clear Button */}
        <AnimatePresence>
          {value.length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={() => onChange('')}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-dark-300 hover:text-accent-400 transition-colors"
            >
              <X size={18} />
            </motion.button>
          )}
        </AnimatePresence>

        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          placeholder="أدخل رقم الهوية الوطنية"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="premium-input"
          id="national-id-search"
          autoComplete="off"
          maxLength={12}
        />
      </div>

      {/* Digit Counter */}
      <div className="flex items-center justify-center mt-3 gap-2">
        <div className="flex gap-1">
          {Array.from({ length: 10 }, (_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                backgroundColor: i < digitCount 
                  ? digitCount === 10 
                    ? 'rgb(16, 185, 129)' 
                    : 'rgb(99, 102, 241)' 
                  : 'rgba(71, 85, 105, 0.3)'
              }}
              transition={{ delay: 0.6 + i * 0.03, type: "spring", stiffness: 300 }}
              className="w-2 h-2 rounded-full"
            />
          ))}
        </div>
        <span className={`text-xs font-medium transition-colors duration-300 ${
          digitCount === 10 ? 'text-emerald-400' : 'text-dark-300'
        }`}>
          {digitCount}/10
        </span>
      </div>
    </motion.div>
  );
};

export default SearchInput;
