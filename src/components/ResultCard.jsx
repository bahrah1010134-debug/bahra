import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Download, ExternalLink, CheckCircle } from 'lucide-react';
import { toPng } from 'html-to-image';

const ResultCard = ({ teacher }) => {
  const cardRef = useRef(null);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(teacher.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    if (cardRef.current === null) return;
    
    // Temporarily adjust styles for high quality download
    const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 3 });
    const link = document.createElement('a');
    link.download = `QR-${teacher.name}.png`;
    link.href = dataUrl;
    link.click();
  };

  if (!teacher) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="max-w-md mx-auto w-full px-4 mt-8 pb-12"
    >
      <div className="ios-card overflow-hidden">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold text-slate-800 mb-1 text-center">
            {teacher.name}
          </h2>
          <p className="text-slate-400 text-sm mb-6">رقم الهوية: {teacher.id}</p>
          
          {/* Printable Area */}
          <div className="p-4 bg-white rounded-2xl border border-slate-100 mb-6" ref={cardRef}>
             <div className="flex flex-col items-center p-2 bg-white">
                <p className="text-[10px] text-slate-400 mb-2 font-bold uppercase tracking-widest">مدرسة بحرة المجاهدين الثانية</p>
                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-50">
                   <QRCodeSVG 
                    value={teacher.link} 
                    size={160}
                    level="H"
                    includeMargin={false}
                    imageSettings={{
                      src: "/logo.png",
                      x: undefined,
                      y: undefined,
                      height: 24,
                      width: 24,
                      excavate: true,
                    }}
                  />
                </div>
                <p className="mt-3 text-sm font-bold text-slate-700">{teacher.name}</p>
             </div>
          </div>

          <div className="w-full space-y-3">
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-between px-6 py-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  {copied ? <CheckCircle className="text-green-500" size={20} /> : <Copy className="text-blue-500" size={20} />}
                </div>
                <span className="font-semibold text-slate-700">{copied ? 'تم النسخ!' : 'نسخ رابط المجلد'}</span>
              </div>
              <ExternalLink size={18} className="text-slate-300 group-hover:text-slate-400" />
            </button>

            <button
              onClick={handleDownload}
              className="ios-button-primary w-full flex items-center justify-center gap-3"
            >
              <Download size={20} />
              <span>حفظ الباركود كصورة</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
