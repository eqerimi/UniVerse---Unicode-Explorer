import React, { useState } from 'react';
import { searchCharactersWithAI } from '../services/geminiService';
import { CharacterCard } from './CharacterCard';
import { UnicodeCharData } from '../types';

interface ExplorerProps {
  onSelectChar: (char: UnicodeCharData) => void;
}

export const Explorer: React.FC<ExplorerProps> = ({ onSelectChar }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<UnicodeCharData[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    try {
      const data = await searchCharactersWithAI(query);
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 min-h-[60vh]">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Semantic Unicode Search</h2>
        <p className="text-gray-400 max-w-lg mx-auto">
          Describe what you're looking for. From "ancient egyptian symbols" to "mathematical operators for sets". 
          Gemini will traverse the standard to find matches.
        </p>
        
        <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. 'chess pieces', 'arrows', 'gothic letters'..." 
            className="w-full bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-full py-4 px-6 pr-32 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow shadow-xl"
          />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-full px-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Search'}
          </button>
        </form>
      </div>

      <div className="min-h-[200px]">
        {loading && (
          <div className="text-center py-20 text-gray-500 animate-pulse">
            Analyzing Unicode Standard...
          </div>
        )}

        {!loading && hasSearched && results.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No glyphs found. Try a different concept.
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {results.map((item, idx) => (
              <CharacterCard 
                key={`${item.char}-${idx}`} 
                data={item} 
                onClick={onSelectChar} 
              />
            ))}
          </div>
        )}

        {!hasSearched && (
           <div className="flex flex-col items-center justify-center py-20 opacity-50">
             <div className="text-8xl mb-4">⌘</div>
             <p className="text-gray-500">Enter a prompt to begin discovery</p>
           </div>
        )}
      </div>
    </div>
  );
};