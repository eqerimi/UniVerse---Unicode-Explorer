import React, { useEffect, useState } from 'react';
import { UnicodeCharData, EncodingDetails } from '../types';
import { getEncodingDetails } from '../utils/unicodeUtils';
import { explainCharacterWithAI } from '../services/geminiService';

interface DetailModalProps {
  charData: UnicodeCharData | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ charData, onClose }) => {
  const [details, setDetails] = useState<EncodingDetails | null>(null);
  const [explanation, setExplanation] = useState<string>('');
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    if (charData) {
      setDetails(getEncodingDetails(charData.char));
      setExplanation('');
      setLoadingAI(true);
      
      explainCharacterWithAI(charData.char, charData.name)
        .then(setExplanation)
        .finally(() => setLoadingAI(false));
    }
  }, [charData]);

  if (!charData || !details) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-gray-900 border border-gray-700 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="relative bg-gray-800 p-8 flex flex-col items-center border-b border-gray-700">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          
          <div className="text-9xl mb-4 font-mono text-white select-all">{charData.char}</div>
          <h2 className="text-2xl font-bold text-white text-center">{charData.name}</h2>
          <span className="text-indigo-400 font-medium mt-2 px-3 py-1 bg-indigo-900/30 rounded-full text-sm border border-indigo-500/30">
            {charData.category}
          </span>
        </div>

        <div className="p-8 space-y-8">
          
          {/* Encoding Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <InfoBlock label="Hex Code" value={details.hex} />
            <InfoBlock label="Decimal" value={details.decimal.toString()} />
            <InfoBlock label="HTML Entity" value={details.htmlEntity} monospace />
            <InfoBlock label="UTF-8 Bytes" value={details.utf8} monospace />
            <InfoBlock label="UTF-16 Units" value={details.utf16} monospace />
            <InfoBlock label="CSS Content" value={details.cssCode} monospace />
          </div>

          {/* AI Explanation */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">AI Analysis</span>
              {loadingAI && <span className="text-xs text-gray-500 animate-pulse">(Generating...)</span>}
            </h3>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 text-gray-300 leading-relaxed">
               {loadingAI ? (
                 <div className="space-y-2">
                   <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                   <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
                   <div className="h-4 bg-gray-700 rounded w-5/6 animate-pulse"></div>
                 </div>
               ) : (
                 <p>{explanation}</p>
               )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const InfoBlock: React.FC<{ label: string; value: string; monospace?: boolean }> = ({ label, value, monospace }) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs text-gray-500 uppercase tracking-wide">{label}</span>
    <span className={`text-gray-200 bg-gray-800 px-3 py-2 rounded-lg border border-gray-700 select-all ${monospace ? 'font-mono text-sm' : 'font-medium'}`}>
      {value}
    </span>
  </div>
);
