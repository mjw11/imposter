import React, { useState } from 'react';
import { Plus, X, Users, Play, BookOpen, Crosshair } from 'lucide-react';
import { NeoButton } from '../components/NeoButton';
import { Category } from '../types';

interface SetupScreenProps {
  players: string[];
  onPlayersChange: (players: string[]) => void;
  categories: Category[];
  onToggleCategory: (id: string) => void;
  onStartGame: () => void;
  onOpenEditor: () => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({
  players,
  onPlayersChange,
  categories,
  onToggleCategory,
  onStartGame,
  onOpenEditor
}) => {
  const [newName, setNewName] = useState('');
  const [secretTaps, setSecretTaps] = useState(0);

  const handleDevTap = () => {
    const newCount = secretTaps + 1;
    setSecretTaps(newCount);
    if (newCount >= 5) {
      onOpenEditor();
      setSecretTaps(0);
    }
  };

  const addPlayer = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (newName.trim() && players.length < 12) {
      onPlayersChange([...players, newName.trim()]);
      setNewName('');
    }
  };

  const removePlayer = (index: number) => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1);
    onPlayersChange(newPlayers);
  };

  const selectedCategoriesCount = categories.filter(c => c.enabled).length;
  const canStart = players.length >= 3 && selectedCategoriesCount > 0;

  return (
    <div className="flex flex-col h-full max-w-xl mx-auto p-4 bg-spy-base text-spy-text">
      <header className="flex justify-between items-center mb-8 pt-4">
        <div onClick={handleDevTap} className="cursor-pointer select-none active:opacity-80 transition-opacity">
            <h1 className="text-4xl font-display font-bold text-white tracking-tight">IMPOSTER<span className="text-spy-red">!</span></h1>
            <p className="text-xs font-mono text-spy-dim tracking-[0.3em] uppercase">Find the fake</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-24 pr-2">
        {/* Player Section */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4 border-b border-spy-border pb-2">
            <Users className="text-spy-cyan" size={20} />
            <h2 className="text-xl font-display font-bold tracking-wider">PLAYERS <span className="text-spy-dim text-sm ml-2 font-mono">[{players.length}/12]</span></h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            {players.map((p, idx) => (
              <div key={idx} className="group flex items-center justify-between gap-2 bg-spy-surface border border-spy-border hover:border-spy-cyan/50 px-3 py-3 animate-in zoom-in duration-200">
                <span className="font-mono font-bold text-sm truncate">{p}</span>
                <button onClick={() => removePlayer(idx)} className="text-spy-dim hover:text-spy-red transition-colors">
                  <X size={14} />
                </button>
                {/* Decor */}
                <div className="absolute top-0 left-0 w-[2px] h-full bg-spy-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
            {players.length === 0 && (
              <div className="col-span-2 p-4 border border-dashed border-spy-dim/30 text-spy-dim text-center font-mono text-sm italic">
                Add at least 3 players...
              </div>
            )}
          </div>

          <form onSubmit={addPlayer} className="flex gap-2">
            <div className="relative flex-1">
                <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="ENTER NAME"
                maxLength={12}
                className="w-full bg-black border border-spy-border px-4 py-3 font-mono text-spy-text focus:outline-none focus:border-spy-cyan focus:shadow-glow-cyan transition-all placeholder:text-spy-dim/50 uppercase"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-spy-cyan/30 pointer-events-none">
                    <Crosshair size={16} />
                </div>
            </div>
            <button 
              type="submit"
              disabled={!newName.trim() || players.length >= 12}
              className="bg-spy-surface text-spy-cyan border border-spy-border px-4 hover:bg-spy-cyan hover:text-black hover:border-spy-cyan transition-all disabled:opacity-50 disabled:hover:bg-spy-surface disabled:hover:text-spy-cyan"
            >
              <Plus size={24} />
            </button>
          </form>
        </section>

        {/* Category Section */}
        <section>
          <div className="flex items-center gap-3 mb-4 border-b border-spy-border pb-2">
            <BookOpen className="text-spy-amber" size={20} />
            <h2 className="text-xl font-display font-bold tracking-wider">CATEGORIES</h2>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onToggleCategory(cat.id)}
                className={`relative w-full text-left p-4 border transition-all group ${
                  cat.enabled 
                    ? 'bg-spy-amber/5 border-spy-amber/50' 
                    : 'bg-spy-surface border-spy-border opacity-60'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-display font-bold text-lg ${cat.enabled ? 'text-spy-amber' : 'text-spy-dim'}`}>
                    {cat.name.toUpperCase()}
                  </span>
                  <div className={`w-4 h-4 border flex items-center justify-center ${cat.enabled ? 'border-spy-amber bg-spy-amber' : 'border-spy-dim'}`}>
                    {cat.enabled && <div className="w-2 h-2 bg-black" />}
                  </div>
                </div>
                <p className="text-xs font-mono text-spy-dim mt-1 truncate uppercase tracking-tight opacity-80">
                  {cat.words.slice(0, 4).join(' / ')}...
                </p>
                
                {/* Corner Accent */}
                 {cat.enabled && <div className="absolute top-0 right-0 w-0 h-0 border-t-[10px] border-r-[10px] border-t-transparent border-r-spy-amber"></div>}
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-spy-base via-spy-base to-transparent backdrop-blur-sm z-20">
        <div className="max-w-xl mx-auto">
          <NeoButton 
            fullWidth 
            size="lg" 
            variant="primary"
            disabled={!canStart} 
            onClick={onStartGame}
            className="animate-in slide-in-from-bottom-4"
          >
            <Play size={20} fill="currentColor" />
            START GAME
          </NeoButton>
        </div>
      </div>
    </div>
  );
};