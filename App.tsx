import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GamePhase, GameState, Player, Category, SERVER_CATEGORIES } from './types';
import { SetupScreen } from './screens/SetupScreen';
import { RevealScreen } from './screens/RevealScreen';
import { ActionScreen } from './screens/ActionScreen';
import { EditorScreen } from './screens/EditorScreen';

const STORAGE_KEY_PLAYERS = 'imposter_last_players';

function App() {
  // -- State --
  // Categories are now initialized from the hardcoded SERVER_CATEGORIES
  // We do not load from localStorage to ensure consistency across all players
  const [categories, setCategories] = useState<Category[]>(SERVER_CATEGORIES);
  const [playersList, setPlayersList] = useState<string[]>([]);
  
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    currentCategory: null,
    currentWord: null,
    phase: GamePhase.SETUP
  });

  // -- Effects --
  useEffect(() => {
    // Only load players from storage, categories are fixed/hardcoded
    const savedPlayers = localStorage.getItem(STORAGE_KEY_PLAYERS);
    if (savedPlayers) {
      try {
        setPlayersList(JSON.parse(savedPlayers));
      } catch (e) {
        console.error("Failed to parse players", e);
      }
    }
  }, []);

  // Updates the in-memory categories (for testing in dev mode), but does not persist to localStorage
  const updateCategories = (newCats: Category[]) => {
    setCategories(newCats);
  };

  const updatePlayersList = (newPlayers: string[]) => {
    setPlayersList(newPlayers);
    localStorage.setItem(STORAGE_KEY_PLAYERS, JSON.stringify(newPlayers));
  };

  const toggleCategory = (id: string) => {
    const newCats = categories.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c);
    setCategories(newCats); // Only updates session state
  };

  // -- Game Logic --

  const startGame = () => {
    // 1. Select Category
    const enabledCats = categories.filter(c => c.enabled);
    if (enabledCats.length === 0) return; // Should be blocked by UI
    
    const randomCat = enabledCats[Math.floor(Math.random() * enabledCats.length)];
    
    // 2. Select Word
    if (randomCat.words.length === 0) return;
    const randomWord = randomCat.words[Math.floor(Math.random() * randomCat.words.length)];

    // 3. Create Players
    // We keep the order from the setup screen (no shuffle) so users can find their names easily
    let gamePlayers: Player[] = playersList.map(name => ({
      id: uuidv4(),
      name,
      isImposter: false,
      hasViewed: false,
      isFirstPlayer: false
    }));

    // 4. Assign Roles Randomly
    // Pick random imposter
    const imposterIndex = Math.floor(Math.random() * gamePlayers.length);
    gamePlayers[imposterIndex].isImposter = true;

    // 5. Assign First Player (Random index)
    const firstPlayerIdx = Math.floor(Math.random() * gamePlayers.length);
    gamePlayers[firstPlayerIdx].isFirstPlayer = true;

    setGameState({
      players: gamePlayers,
      currentCategory: randomCat,
      currentWord: randomWord,
      phase: GamePhase.REVEAL
    });
  };

  const markPlayerViewed = (playerId: string) => {
    setGameState(prev => ({
      ...prev,
      players: prev.players.map(p => p.id === playerId ? { ...p, hasViewed: true } : p)
    }));
  };

  const beginRound = () => {
    setGameState(prev => ({ ...prev, phase: GamePhase.ACTION }));
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      players: [],
      currentCategory: null,
      currentWord: null,
      phase: GamePhase.SETUP
    }));
  };

  // -- Render --

  return (
    <main className="h-[100dvh] w-full bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {gameState.phase === GamePhase.SETUP && (
        <SetupScreen 
          players={playersList}
          onPlayersChange={updatePlayersList}
          categories={categories}
          onToggleCategory={toggleCategory}
          onStartGame={startGame}
          onOpenEditor={() => setGameState(prev => ({ ...prev, phase: GamePhase.EDITOR }))}
        />
      )}

      {gameState.phase === GamePhase.EDITOR && (
        <EditorScreen 
          categories={categories}
          onUpdateCategories={updateCategories}
          onClose={() => setGameState(prev => ({ ...prev, phase: GamePhase.SETUP }))}
        />
      )}

      {gameState.phase === GamePhase.REVEAL && gameState.currentCategory && gameState.currentWord && (
        <RevealScreen 
          players={gameState.players}
          currentCategory={gameState.currentCategory}
          currentWord={gameState.currentWord}
          onPlayerViewed={markPlayerViewed}
          onBeginRound={beginRound}
        />
      )}

      {gameState.phase === GamePhase.ACTION && gameState.currentCategory && (
        <ActionScreen 
          firstPlayer={gameState.players.find(p => p.isFirstPlayer)!}
          category={gameState.currentCategory}
          onRestart={resetGame}
        />
      )}
    </main>
  );
}

export default App;