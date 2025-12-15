import React, { useState } from 'react';
import { transformText, STYLE_LABELS } from '../utils/unicodeUtils';
import { TransformStyle } from '../types';

const STYLES = Object.keys(STYLE_LABELS) as TransformStyle[];

export const Transformer: React.FC = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, style: string) => {
    navigator.clipboard.writeText(text);
    setCopied(style);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="space-y-2">
        <label className="text-sm font-medium text-indigo-400 uppercase tracking-wide">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something here to transform it..."
          className="w-full h-32 bg-gray-900 border border-gray-700 rounded-xl p-4 text-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-gray-600 resize-none font-sans"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STYLES.map((style) => {
          const transformed = transformText(input || 'Sample Text', style);
          
          return (
            <div key={style} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col gap-2 hover:bg-gray-800 transition-colors">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-500 uppercase">{style}</span>
                <button
                  onClick={() => handleCopy(transformed, style)}
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    copied === style 
                      ? 'bg-green-900/50 text-green-400' 
                      : 'bg-gray-700 hover:bg-indigo-600 text-gray-300 hover:text-white'
                  }`}
                >
                  {copied === style ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="text-xl text-white break-words font-medium min-h-[1.75rem]">
                {transformed}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};