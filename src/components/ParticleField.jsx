import React, { useMemo } from 'react';

const ParticleField = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: Math.random() * 15 + 15,
      opacity: Math.random() * 0.3 + 0.1,
      color: i % 3 === 0 
        ? 'rgba(99, 102, 241, VAR)' 
        : i % 3 === 1 
          ? 'rgba(16, 185, 129, VAR)' 
          : 'rgba(168, 85, 247, VAR)',
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size + 'px',
            height: p.size + 'px',
            left: p.left + '%',
            backgroundColor: p.color.replace('VAR', p.opacity),
            animationDelay: p.delay + 's',
            animationDuration: p.duration + 's',
          }}
        />
      ))}
      
      {/* Ambient Orbs */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.03] blur-[100px]"
        style={{
          background: 'radial-gradient(circle, #6366f1, transparent)',
          top: '10%',
          right: '-10%',
          animation: 'float-particle 30s linear infinite alternate',
        }}
      />
      <div 
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[80px]"
        style={{
          background: 'radial-gradient(circle, #10b981, transparent)',
          bottom: '10%',
          left: '-5%',
          animation: 'float-particle 25s linear infinite alternate-reverse',
        }}
      />
    </div>
  );
};

export default ParticleField;
