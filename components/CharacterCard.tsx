import React from 'react';
import { UnicodeCharData } from '../types';

interface CharacterCardProps {
  data: UnicodeCharData;
  onClick: (data: UnicodeCharData) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ data, onClick }) => {
  return (
    <div 
      onClick={() => onClick(data)}
      className="group relative flex flex-col items-center justify-between p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-indigo-500/50 hover:shadow-indigo-500/10 hover:shadow-lg transition-all cursor-pointer overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="text-5xl mb-4 font-mono text-white transition-transform group-hover:scale-110">
        {data.char}
      </div>
      
      <div className="text-center w-full z-10">
        <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider truncate mb-1">
          {data.name}
        </h3>
        <p className="text-[10px] text-gray-500 line-clamp-1">{data.category}</p>
      </div>
    </div>
  );
};