import React, { useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { motion } from 'framer-motion';
import { Copy, Download, ExternalLink, CheckCircle, User, Hash, FolderOpen, Share2 } from 'lucide-react';

const ResultCard = ({ teacher }) => {
  const qrRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(teacher.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const qrCanvas = qrRef.current.querySelector('canvas');
      if (!qrCanvas) return;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const width = 800;
      const height = 1100;
      canvas.width = width;
      canvas.height = height;

      // Dark gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(0.5, '#0c1222');
      gradient.addColorStop(1, '#0a0e1a');
      ctx.fillStyle = gradient;
      
      const radius = 40;
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(width - radius, 0);
      ctx.quadraticCurveTo(width, 0, width, radius);
      ctx.lineTo(width, height - radius);
      ctx.quadraticCurveTo(width, height, width - radius, height);
      ctx.lineTo(radius, height);
      ctx.quadraticCurveTo(0, height, 0, height - radius);
      ctx.lineTo(0, radius);
      ctx.quadraticCurveTo(0, 0, radius, 0);
      ctx.closePath();
      ctx.fill();

      // Subtle border
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Top accent line
      const accentGrad = ctx.createLinearGradient(100, 0, width - 100, 0);
      accentGrad.addColorStop(0, 'transparent');
      accentGrad.addColorStop(0.3, 'rgba(99, 102, 241, 0.6)');
      accentGrad.addColorStop(0.7, 'rgba(168, 85, 247, 0.6)');
      accentGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = accentGrad;
      ctx.fillRect(100, 0, width - 200, 3);

      // School Name
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 24px "IBM Plex Sans Arabic", system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('مدرسة بحرة المجاهدين الثانية', width / 2, 80);
      
      ctx.fillStyle = '#64748b';
      ctx.font = '400 18px "IBM Plex Sans Arabic", system-ui, sans-serif';
      ctx.fillText('بوابة استعلام الروابط الإلكترونية', width / 2, 115);

      // QR Container background
      ctx.fillStyle = 'rgba(99, 102, 241, 0.05)';
      const qrContainerSize = 440;
      const qrContainerX = (width - qrContainerSize) / 2;
      const qrContainerY = 160;
      ctx.beginPath();
      const r = 24;
      ctx.moveTo(qrContainerX + r, qrContainerY);
      ctx.lineTo(qrContainerX + qrContainerSize - r, qrContainerY);
      ctx.quadraticCurveTo(qrContainerX + qrContainerSize, qrContainerY, qrContainerX + qrContainerSize, qrContainerY + r);
      ctx.lineTo(qrContainerX + qrContainerSize, qrContainerY + qrContainerSize - r);
      ctx.quadraticCurveTo(qrContainerX + qrContainerSize, qrContainerY + qrContainerSize, qrContainerX + qrContainerSize - r, qrContainerY + qrContainerSize);
      ctx.lineTo(qrContainerX + r, qrContainerY + qrContainerSize);
      ctx.quadraticCurveTo(qrContainerX, qrContainerY + qrContainerSize, qrContainerX, qrContainerY + qrContainerSize - r);
      ctx.lineTo(qrContainerX, qrContainerY + r);
      ctx.quadraticCurveTo(qrContainerX, qrContainerY, qrContainerX + r, qrContainerY);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw QR Code
      const qrSize = 380;
      ctx.drawImage(qrCanvas, (width - qrSize) / 2, 190, qrSize, qrSize);

      // Separator line
      const sepY = 650;
      const sepGrad = ctx.createLinearGradient(100, sepY, width - 100, sepY);
      sepGrad.addColorStop(0, 'transparent');
      sepGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.2)');
      sepGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = sepGrad;
      ctx.fillRect(100, sepY, width - 200, 1);

      // Teacher Name
      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 42px "IBM Plex Sans Arabic", system-ui, sans-serif';
      ctx.fillText(teacher.name, width / 2, 730);

      // ID
      ctx.fillStyle = '#a5b4fc';
      ctx.font = '500 22px "IBM Plex Sans Arabic", system-ui, sans-serif';
      ctx.fillText('رقم الهوية: ' + teacher.id, width / 2, 790);

      // Decorative dots at bottom
      const dotColors = ['#6366f1', '#8b5cf6', '#a855f7', '#8b5cf6', '#6366f1'];
      dotColors.forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.arc(width / 2 - 40 + i * 20, 880, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Footer
      ctx.fillStyle = '#475569';
      ctx.font = '400 16px "IBM Plex Sans Arabic", system-ui, sans-serif';
      ctx.fillText('الابتدائية والمتوسطة - مكة المكرمة', width / 2, 940);

      // Bottom accent line
      const bottomGrad = ctx.createLinearGradient(200, height - 3, width - 200, height - 3);
      bottomGrad.addColorStop(0, 'transparent');
      bottomGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.4)');
      bottomGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = bottomGrad;
      ctx.fillRect(200, height - 3, width - 400, 3);

      const dataUrl = canvas.toDataURL('image/png');

      if (navigator.share && navigator.canShare) {
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const file = new File([blob], `QR-${teacher.name}.png`, { type: 'image/png' });

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `رابط ملف المعلمة: ${teacher.name}`,
            text: `الاسم: ${teacher.name}\nرابط المجلد: ${teacher.link}`,
          });
          setDownloading(false);
          return;
        }
      }

      const link = document.createElement('a');
      link.download = `QR-${teacher.name}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setDownloading(false);
    }
  };

  if (!teacher) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 30 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-md mx-auto w-full px-4 mt-6 pb-16"
    >
      <div className="glass-card rounded-3xl overflow-hidden relative">
        {/* Top Accent Line */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-accent-500 to-transparent" />
        
        <div className="p-6">
          {/* Teacher Info Header */}
          <div className="flex flex-col items-center mb-6">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500/20 to-purple-500/20 flex items-center justify-center mb-4 border border-accent-500/20"
            >
              <User size={28} className="text-accent-300" />
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl font-bold text-dark-50 mb-2 text-center"
            >
              {teacher.name}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 badge badge-emerald"
            >
              <Hash size={12} />
              <span className="font-mono tracking-wider">{teacher.id}</span>
            </motion.div>
          </div>
          
          {/* QR Code Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col items-center mb-6"
          >
            <div className="relative">
              {/* QR Glow */}
              <div className="absolute inset-0 bg-accent-500/10 blur-2xl rounded-3xl qr-glow" />
              
              <div 
                className="relative bg-white p-5 rounded-2xl border border-dark-500/50 shadow-lg shadow-black/20"
                ref={qrRef}
              >
                <QRCodeCanvas 
                  value={teacher.link} 
                  size={200}
                  level="H"
                  includeMargin={false}
                  bgColor="#ffffff"
                  fgColor="#0f172a"
                />
              </div>
            </div>
            
            <p className="text-dark-300 text-xs mt-3 font-medium">
              امسح الباركود للوصول المباشر
            </p>
          </motion.div>

          {/* Separator */}
          <div className="h-px bg-gradient-to-r from-transparent via-dark-500 to-transparent mb-6" />

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Open Link */}
            <motion.a
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              href={teacher.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 btn-soft group"
              id="open-folder-link"
            >
              <FolderOpen size={20} className="group-hover:text-emerald-400 transition-colors" />
              <span>الانتقال للمجلد</span>
              <ExternalLink size={14} className="opacity-40" />
            </motion.a>

            {/* Copy Link */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              onClick={handleCopy}
              className="w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 group"
              style={{
                background: copied 
                  ? 'rgba(16, 185, 129, 0.1)' 
                  : 'rgba(30, 41, 59, 0.5)',
                border: copied 
                  ? '1px solid rgba(16, 185, 129, 0.2)' 
                  : '1px solid rgba(71, 85, 105, 0.3)',
              }}
              id="copy-link-button"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  copied 
                    ? 'bg-emerald-500/20' 
                    : 'bg-dark-600 group-hover:bg-accent-500/20'
                }`}>
                  {copied 
                    ? <CheckCircle className="text-emerald-400" size={18} /> 
                    : <Copy className="text-accent-300 group-hover:text-accent-400" size={18} />
                  }
                </div>
                <span className={`font-semibold transition-colors ${
                  copied ? 'text-emerald-300' : 'text-dark-100 group-hover:text-dark-50'
                }`}>
                  {copied ? 'تم النسخ بنجاح!' : 'نسخ رابط المجلد'}
                </span>
              </div>
            </motion.button>

            {/* Download QR */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              onClick={handleDownload}
              disabled={downloading}
              className="btn-gradient w-full flex items-center justify-center gap-3 disabled:opacity-50"
              id="download-qr-button"
            >
              {downloading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  <span>جاري التحميل...</span>
                </>
              ) : (
                <>
                  <Share2 size={20} />
                  <span>حفظ ومشاركة الباركود</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
