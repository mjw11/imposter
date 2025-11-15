import React, { useState } from 'react';
import { Player, Category } from '../types';
import { NeoButton } from '../components/NeoButton';
import { SecretRevealer } from '../components/SecretRevealer';
import { Lock, Check, X, FileText } from 'lucide-react';

interface RevealScreenProps {
  players: Player[];
  currentCategory: Category;
  currentWord: string;
  onPlayerViewed: (playerId: string) => void;
  onBeginRound: () => void;
}

export const RevealScreen: React.FC<RevealScreenProps> = ({
  players,
  currentCategory,
  currentWord,
  onPlayerViewed,
  onBeginRound
}) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  const selectedPlayer = players.find(p => p.id === selectedPlayerId);
  const allViewed = players.every(p => p.hasViewed);

  if (selectedPlayer) {
    return (
      <div className="fixed inset-0 bg-spy-base z-50">
        <button 
          onClick={() => setSelectedPlayerId(null)}
          className="absolute top-4 right-4 z-50 p-2 text-spy-dim hover:text-spy-red transition-colors border border-transparent hover:border-spy-red"
        >
          <X />
        </button>
        <SecretRevealer 
          isImposter={selectedPlayer.isImposter}
          category={currentCategory.name}
          secretWord={currentWord}
          playerName={selectedPlayer.name}
          onComplete={() => {
            onPlayerViewed(selectedPlayer.id);
            setSelectedPlayerId(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-xl mx-auto p-4 bg-spy-base text-spy-text">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10 pointer-events-none"></div>

      <header className="text-center mb-8 relative z-10 pt-4">
        <h2 className="text-3xl font-display font-bold text-spy-cyan tracking-wider mb-1">WHO ARE YOU?</h2>
        <div className="h-[1px] w-24 bg-spy-cyan/50 mx-auto mb-2"></div>
        <p className="text-spy-dim font-mono text-xs uppercase tracking-[0.2em]">Pass the phone to each player</p>
      </header>

      <div className="grid grid-cols-2 gap-4 overflow-y-auto pb-24 px-2 relative z-10">
        {players.map((player) => (
          <button
            key={player.id}
            onClick={() => !player.hasViewed && setSelectedPlayerId(player.id)}
            disabled={player.hasViewed}
            className={`
              group relative p-4 aspect-square flex flex-col items-center justify-center transition-all border
              ${player.hasViewed 
                ? 'bg-spy-surface/50 border-spy-border/50 text-spy-dim cursor-default' 
                : 'bg-spy-surface border-spy-border hover:border-spy-cyan hover:bg-spy-cyan/5 active:scale-[0.98]'
              }
            `}
          >
            {/* Tech Corners */}
            {!player.hasViewed && (
              <>
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-spy-cyan opacity-50 group-hover:opacity-100"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-spy-cyan opacity-50 group-hover:opacity-100"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-spy-cyan opacity-50 group-hover:opacity-100"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-spy-cyan opacity-50 group-hover:opacity-100"></div>
              </>
            )}

            {player.hasViewed ? (
              <div className="relative">
                <FileText className="text-spy-dim opacity-20 mb-2" size={40} />
                <Check className="text-spy-green absolute -bottom-1 -right-1 bg-black rounded-full border border-spy-green" size={20} />
              </div>
            ) : (
              <Lock className="text-spy-cyan mb-2 group-hover:animate-pulse" size={32} />
            )}
            
            <span className="font-mono font-bold text-sm uppercase tracking-wider w-full text-center break-words leading-tight mt-2">
                {player.name}
            </span>
            
            {player.hasViewed && (
              <span className="absolute bottom-2 text-[10px] font-mono text-spy-green uppercase tracking-widest border border-spy-green/30 px-2 py-0.5 bg-spy-green/5">Ready</span>
            )}
          </button>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-spy-base/90 backdrop-blur-sm border-t border-spy-border z-20">
        <div className="max-w-xl mx-auto">
          <NeoButton 
            fullWidth 
            size="lg" 
            variant={allViewed ? 'success' : 'neutral'}
            disabled={!allViewed} 
            onClick={onBeginRound}
          >
            {allViewed ? "START GAME" : `WAITING FOR PLAYERS [${players.filter(p => p.hasViewed).length}/${players.length}]`}
          </NeoButton>
        </div>
      </div>
    </div>
  );
};