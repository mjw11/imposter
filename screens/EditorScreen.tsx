import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Save, ListPlus, Database, Copy, Check } from 'lucide-react';
import { Category } from '../types';
import { NeoButton } from '../components/NeoButton';
import { v4 as uuidv4 } from 'uuid';

interface EditorScreenProps {
  categories: Category[];
  onUpdateCategories: (categories: Category[]) => void;
  onClose: () => void;
}

export const EditorScreen: React.FC<EditorScreenProps> = ({
  categories,
  onUpdateCategories,
  onClose
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [localCategories, setLocalCategories] = useState<Category[]>(JSON.parse(JSON.stringify(categories)));
  const [bulkText, setBulkText] = useState('');
  const [copied, setCopied] = useState(false);

  const activeCategory = localCategories.find(c => c.id === editingId);

  useEffect(() => {
    setBulkText('');
  }, [editingId]);

  const handleSave = () => {
    onUpdateCategories(localCategories);
    onClose();
  };

  const handleExport = () => {
    const json = JSON.stringify(localCategories, null, 2);
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addCategory = () => {
    const newCat: Category = {
      id: uuidv4(),
      name: 'NEW CATEGORY',
      words: [],
      enabled: true
    };
    setLocalCategories([...localCategories, newCat]);
    setEditingId(newCat.id);
  };

  const deleteCategory = (id: string) => {
    setLocalCategories(localCategories.filter(c => c.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const addWord = () => {
    if (!activeCategory) return;
    const updatedCats = localCategories.map(c => {
      if (c.id === activeCategory.id) {
        return { ...c, words: [...c.words, 'New Word'] };
      }
      return c;
    });
    setLocalCategories(updatedCats);
  };

  const handleBulkAdd = () => {
    if (!activeCategory || !bulkText.trim()) return;
    
    const newWords = bulkText
      .split(',')
      .map(w => w.trim())
      .filter(w => w.length > 0);

    if (newWords.length === 0) return;

    const updatedCats = localCategories.map(c => {
      if (c.id === activeCategory.id) {
        return { ...c, words: [...c.words, ...newWords] };
      }
      return c;
    });
    
    setLocalCategories(updatedCats);
    setBulkText('');
  };

  const updateWord = (catId: string, wordIdx: number, val: string) => {
    const updatedCats = localCategories.map(c => {
      if (c.id === catId) {
        const newWords = [...c.words];
        newWords[wordIdx] = val;
        return { ...c, words: newWords };
      }
      return c;
    });
    setLocalCategories(updatedCats);
  };
  
  const deleteWord = (catId: string, wordIdx: number) => {
    const updatedCats = localCategories.map(c => {
        if (c.id === catId) {
          const newWords = [...c.words];
          newWords.splice(wordIdx, 1);
          return { ...c, words: newWords };
        }
        return c;
      });
      setLocalCategories(updatedCats);
  }

  const updateCategoryName = (id: string, name: string) => {
    setLocalCategories(localCategories.map(c => c.id === id ? { ...c, name } : c));
  };

  if (editingId && activeCategory) {
    const bulkCount = bulkText.split(',').filter(w => w.trim()).length;

    return (
      <div className="flex flex-col h-full p-4 bg-spy-base text-spy-text">
        <div className="flex items-center gap-4 mb-6 border-b border-spy-border pb-4">
          <button onClick={() => setEditingId(null)} className="p-2 hover:bg-spy-surface hover:text-spy-cyan rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-display font-bold tracking-widest text-spy-cyan">EDIT CATEGORY</h2>
        </div>

        <div className="flex-1 overflow-y-auto pb-20 pr-2">
          <div className="mb-8">
            <label className="block text-xs font-mono text-spy-dim uppercase mb-2 tracking-widest">Category Name</label>
            <input 
              className="w-full p-4 text-lg font-display font-bold bg-black border border-spy-cyan text-spy-text focus:outline-none focus:shadow-glow-cyan uppercase tracking-wider"
              value={activeCategory.name}
              onChange={(e) => updateCategoryName(activeCategory.id, e.target.value)}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
                <label className="block text-xs font-mono text-spy-dim uppercase tracking-widest">Words ({activeCategory.words.length})</label>
            </div>
            <div className="space-y-3 mb-6">
              {activeCategory.words.map((word, idx) => (
                <div key={idx} className="flex gap-2 group">
                  <div className="flex items-center justify-center w-8 font-mono text-xs text-spy-dim opacity-50">{idx + 1}</div>
                  <input 
                    className="flex-1 p-3 font-mono text-sm bg-spy-surface border border-spy-border text-spy-text focus:border-spy-cyan outline-none transition-colors"
                    value={word}
                    onChange={(e) => updateWord(activeCategory.id, idx, e.target.value)}
                  />
                  <button 
                    onClick={() => deleteWord(activeCategory.id, idx)}
                    className="p-3 text-spy-dim hover:text-spy-red hover:bg-spy-red/10 border border-transparent hover:border-spy-red/30 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            
            <button 
                onClick={addWord}
                className="w-full py-3 border border-dashed border-spy-dim/50 text-spy-dim font-mono text-sm hover:bg-spy-surface hover:text-spy-cyan hover:border-spy-cyan transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
            >
                <Plus size={16} /> Add Word
            </button>

            {/* Bulk Add Section */}
            <div className="mt-10 pt-6 border-t border-spy-border">
              <div className="flex items-center gap-2 mb-3">
                <ListPlus className="text-spy-cyan" size={18} />
                <label className="block text-xs font-mono text-spy-dim uppercase tracking-widest">Bulk Add</label>
              </div>
              <p className="text-[10px] font-mono text-spy-dim/60 mb-3 uppercase">Format: Comma separated values</p>
              <textarea
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                placeholder="WORD 1, WORD 2, WORD 3..."
                className="w-full p-4 font-mono text-sm bg-black border border-spy-border text-spy-text focus:border-spy-cyan outline-none min-h-[100px] mb-3 resize-y"
              />
              <NeoButton 
                  onClick={handleBulkAdd}
                  disabled={!bulkText.trim()}
                  variant="secondary"
                  fullWidth
                  className="border-spy-cyan text-spy-cyan"
              >
                  Add {bulkCount > 0 ? `${bulkCount}` : ''} Words
              </NeoButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-4 bg-spy-base text-spy-text">
      <div className="flex justify-between items-center mb-8 pt-2">
        <div>
            <h2 className="text-3xl font-display font-bold text-white tracking-tight">EDITOR</h2>
            <p className="text-xs font-mono text-spy-dim uppercase tracking-widest">Manage Content</p>
        </div>
        
        <div className="flex gap-2">
            <button 
                onClick={handleExport} 
                className="p-2 bg-spy-surface border border-spy-border text-spy-dim hover:text-spy-cyan hover:border-spy-cyan rounded-sm transition-all"
                title="Copy JSON Configuration"
            >
                {copied ? <Check size={20} className="text-spy-green"/> : <Copy size={20} />}
            </button>
            <button onClick={onClose} className="p-2 hover:bg-spy-surface rounded-sm border border-transparent hover:border-spy-dim transition-colors">
                <ArrowLeft />
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pb-24 pr-2">
        <div className="mb-4 p-4 border border-spy-cyan/20 bg-spy-cyan/5">
            <p className="text-xs font-mono text-spy-cyan uppercase tracking-wider leading-relaxed">
                <strong className="text-white">DEV MODE:</strong> Edits here are temporary. 
                Use the <Copy size={12} className="inline" /> button above to copy the JSON configuration, 
                then paste it into <code className="bg-black px-1">types.ts</code> to make changes permanent.
            </p>
        </div>

        {localCategories.map((cat) => (
          <div key={cat.id} className="bg-spy-surface p-4 border border-spy-border hover:border-spy-cyan/30 transition-colors flex justify-between items-center group">
            <div>
              <h3 className="font-display font-bold text-lg text-spy-text group-hover:text-spy-cyan transition-colors uppercase tracking-wide">{cat.name}</h3>
              <div className="flex items-center gap-2 text-xs font-mono text-spy-dim">
                <Database size={12} />
                <span>{cat.words.length} words</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setEditingId(cat.id)}
                className="px-4 py-2 bg-spy-base border border-spy-border hover:border-spy-cyan text-spy-dim hover:text-spy-cyan font-mono text-xs uppercase tracking-wider transition-all"
              >
                Edit
              </button>
              <button 
                onClick={() => deleteCategory(cat.id)}
                className="p-2 text-spy-dim hover:text-spy-red hover:bg-spy-red/10 border border-transparent hover:border-spy-red transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        
        <button 
            onClick={addCategory}
            className="w-full py-6 border border-dashed border-spy-dim/40 text-spy-dim hover:bg-spy-surface hover:text-spy-cyan hover:border-spy-cyan transition-all flex flex-col items-center gap-2"
        >
            <Plus size={24} />
            <span className="font-mono text-xs uppercase tracking-widest">New Category</span>
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-spy-base/90 backdrop-blur border-t border-spy-border z-20">
        <NeoButton fullWidth variant="primary" onClick={handleSave}>
          <Save size={18} /> Test Changes
        </NeoButton>
      </div>
    </div>
  );
};