import React from 'react';
import { Player, Category } from '../types';
import { NeoButton } from '../components/NeoButton';
import { RotateCcw, User, Radar } from 'lucide-react';

interface ActionScreenProps {
  firstPlayer: Player;
  category: Category;
  onRestart: () => void;
}

export const ActionScreen: React.FC<ActionScreenProps> = ({
  firstPlayer,
  category,
  onRestart
}) => {
  return (
    <div className="flex flex-col h-full max-w-xl mx-auto p-6 bg-spy-base text-spy-text relative overflow-hidden">
       <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10 pointer-events-none"></div>
       {/* Rotating Radar Effect Background */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-spy-dim/10 rounded-full pointer-events-none"></div>
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-spy-dim/10 rounded-full pointer-events-none"></div>

      <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10">
        
        <div className="mb-16 animate-in slide-in-from-top duration-700 w-full">
          <div className="flex items-center justify-center gap-2 mb-4 opacity-70">
            <Radar className="text-spy-amber animate-spin-slow" size={20} />
            <p className="text-xs font-mono font-bold uppercase text-spy-amber tracking-[0.3em]">Category</p>
          </div>
          
          <div className="relative bg-spy-surface/50 border-y border-spy-amber/30 p-8 w-full backdrop-blur-sm">
             <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-spy-amber"></div>
             <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-spy-amber"></div>
             <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-spy-amber"></div>
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-spy-amber"></div>
             
            <h2 className="text-4xl font-display font-black text-spy-text tracking-widest uppercase drop-shadow-lg">{category.name}</h2>
          </div>
        </div>

        <div className="animate-in zoom-in duration-500 delay-200 relative">
          {/* Target Reticle */}
          <div className="absolute -inset-8 border border-dashed border-spy-cyan/30 rounded-full animate-spin-slow pointer-events-none"></div>
          
          <div className="w-32 h-32 bg-spy-surface rounded-full border-2 border-spy-cyan flex items-center justify-center mx-auto mb-8 shadow-glow-cyan relative overflow-hidden">
             <div className="absolute inset-0 bg-spy-cyan/10 animate-pulse"></div>
             <User size={56} className="text-spy-cyan relative z-10" />
             
             <div className="absolute bottom-2 w-full text-[8px] text-center font-mono text-spy-cyan/60">STARTS FIRST</div>
          </div>
          
          <p className="text-xs font-mono text-spy-dim uppercase tracking-widest mb-3">First Player</p>
          <h1 className="text-5xl font-display font-bold text-white mb-8 tracking-tight">{firstPlayer.name}</h1>
          
          <div className="border-l-2 border-spy-dim/30 pl-4 text-left max-w-xs mx-auto">
            <p className="text-sm font-mono text-spy-dim leading-relaxed">
              <span className="text-spy-cyan font-bold">></span> ASK QUESTIONS<br/>
              <span className="text-spy-cyan font-bold">></span> FIND THE IMPOSTER<br/>
              <span className="text-spy-cyan font-bold">></span> DON'T GET CAUGHT
            </p>
          </div>
        </div>

      </div>

      <div className="w-full z-20">
        <NeoButton fullWidth onClick={onRestart} variant="neutral">
          <RotateCcw size={16} />
          PLAY AGAIN
        </NeoButton>
      </div>
    </div>
  );
};