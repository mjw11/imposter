import React, { useState, useRef, useEffect } from 'react';
import { Fingerprint, ShieldAlert, CheckCircle2, ScanLine } from 'lucide-react';

interface SecretRevealerProps {
  isImposter: boolean;
  category: string;
  secretWord: string;
  playerName: string;
  onComplete: () => void;
}

export const SecretRevealer: React.FC<SecretRevealerProps> = ({
  isImposter,
  category,
  secretWord,
  playerName,
  onComplete
}) => {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const requestRef = useRef<number>(0);

  const HOLD_DURATION = 750; 

  const startHolding = () => {
    if (revealed) return;
    setHolding(true);
  };

  const stopHolding = () => {
    if (revealed) return;
    setHolding(false);
    setProgress(0);
  };

  const animate = (time: number) => {
    if (holding && !revealed) {
      setProgress((prev) => {
        const next = prev + (16 / HOLD_DURATION) * 100; 
        if (next >= 100) {
          setRevealed(true);
          return 100;
        }
        return next;
      });
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (holding) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [holding, revealed]);

  if (revealed) {
    return (
      <div className={`relative flex flex-col items-center justify-center h-full w-full p-6 text-center animate-in fade-in zoom-in duration-300 overflow-hidden ${isImposter ? 'bg-spy-red/10' : 'bg-spy-green/10'}`}>
        {/* Background Grids */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none"></div>
        
        <h2 className="text-4xl font-display font-bold mb-2 text-spy-text tracking-widest">{playerName.toUpperCase()}</h2>
        <p className={`text-sm font-mono font-bold uppercase tracking-[0.2em] mb-8 ${isImposter ? 'text-spy-red' : 'text-spy-green'}`}>
          {isImposter ? '/// SECRET IDENTITY: IMPOSTER ///' : '/// SECRET IDENTITY: CONFIRMED ///'}
        </p>
        
        <div className={`relative w-full max-w-sm p-8 border-2 backdrop-blur-md mb-8 ${
          isImposter 
            ? 'border-spy-red bg-spy-red/10 shadow-glow-red' 
            : 'border-spy-green bg-spy-green/10 shadow-glow-green'
        }`}>
           {/* Decorative Corners */}
           <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-current"></div>
           <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-current"></div>
           <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-current"></div>
           <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-current"></div>

          {isImposter ? (
            <>
              <ShieldAlert size={64} className="mx-auto mb-6 animate-pulse text-spy-red" />
              <h1 className="text-5xl font-display font-black mb-4 text-spy-red uppercase leading-none tracking-tighter">IMPOSTER</h1>
              <p className="text-lg font-mono text-spy-red/80">FAKE IT UNTIL YOU MAKE IT</p>
              <div className="mt-8 pt-6 border-t border-spy-red/30">
                <p className="text-xs uppercase font-bold mb-1 text-spy-red/60 tracking-widest">CATEGORY</p>
                <p className="text-2xl font-display font-bold text-spy-text">{category}</p>
              </div>
            </>
          ) : (
            <>
              <CheckCircle2 size={64} className="mx-auto mb-6 text-spy-green" />
              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-xs uppercase font-bold mb-1 text-spy-green/60 tracking-widest">CATEGORY</p>
                  <p className="text-xl font-display font-bold text-spy-text">{category}</p>
                </div>
                <div className="bg-spy-base/50 border border-spy-green/30 p-4">
                  <p className="text-xs uppercase font-bold mb-2 text-spy-green/60 tracking-widest">SECRET WORD</p>
                  <p className="text-3xl font-display font-black text-spy-green tracking-wide">{secretWord}</p>
                </div>
              </div>
            </>
          )}
        </div>

        <button 
          onClick={onComplete}
          className={`w-full max-w-xs text-lg font-display font-bold py-4 border transition-all uppercase tracking-wider
            ${isImposter 
                ? 'bg-spy-red text-black border-spy-red hover:bg-red-500' 
                : 'bg-spy-green text-black border-spy-green hover:bg-green-400'
            }`}
        >
          OK, GOT IT
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 relative overflow-hidden bg-spy-base">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10 pointer-events-none"></div>
      
      <div className="text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 border border-spy-cyan/30 px-4 py-1 rounded-full bg-spy-cyan/5 mb-6">
           <div className="w-2 h-2 bg-spy-cyan rounded-full animate-pulse"></div>
           <span className="text-spy-cyan text-xs font-mono uppercase tracking-widest">Private Eye Only</span>
        </div>
        <h2 className="text-4xl font-display font-bold text-spy-text mb-2 tracking-tight">IDENTIFY YOURSELF</h2>
        <p className="text-spy-dim text-sm font-mono uppercase tracking-wider">
          Pass the phone to {playerName}
        </p>
      </div>

      <div className="relative z-10">
        <button
          className="relative w-56 h-56 rounded-full bg-spy-surface border border-spy-border flex items-center justify-center shadow-inner group overflow-hidden"
          onMouseDown={startHolding}
          onMouseUp={stopHolding}
          onMouseLeave={stopHolding}
          onTouchStart={startHolding}
          onTouchEnd={stopHolding}
        >
            {/* Scan Overlay */}
            <div 
                className="absolute bottom-0 left-0 right-0 bg-spy-cyan/20 transition-all duration-75 ease-linear border-t-2 border-spy-cyan shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                style={{ height: `${progress}%` }}
            />
            
            {/* Grid background inside circle */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>

            <div className="relative z-20 flex flex-col items-center text-spy-dim group-active:text-spy-cyan transition-colors">
                <Fingerprint size={80} strokeWidth={1} className={progress > 0 ? "animate-pulse text-spy-cyan" : ""} />
                <span className="font-mono font-bold mt-4 uppercase tracking-widest text-xs">{holding ? "REVEALING..." : "HOLD TO REVEAL"}</span>
            </div>
        </button>
      </div>

      <div className="mt-12 w-full max-w-xs">
        <div className="flex justify-between text-xs font-mono text-spy-dim mb-2 uppercase">
            <span>Scanning</span>
            <span>{Math.floor(progress)}%</span>
        </div>
        <div className="h-1 w-full bg-spy-surface overflow-hidden">
            <div 
                className="h-full bg-spy-cyan shadow-glow-cyan transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
            />
        </div>
      </div>
    </div>
  );
};