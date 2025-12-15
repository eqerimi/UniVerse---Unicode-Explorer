import React, { useState } from 'react';
import { AppTab, UnicodeCharData } from './types';
import { TabButton } from './components/TabButton';
import { Transformer } from './components/Transformer';
import { Explorer } from './components/Explorer';
import { DetailModal } from './components/DetailModal';
import { About } from './components/About';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.EXPLORER);
  const [selectedChar, setSelectedChar] = useState<UnicodeCharData | null>(null);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans selection:bg-indigo-500/30">
      
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-indigo-500/20">
              U+
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">UniVerse</h1>
              <p className="text-xs text-gray-500">Unicode Explorer & Toolkit</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <TabButton 
              label="Explorer" 
              isActive={activeTab === AppTab.EXPLORER} 
              onClick={() => setActiveTab(AppTab.EXPLORER)}
              icon={<span className="text-lg">🔍</span>}
            />
            <TabButton 
              label="Transformer" 
              isActive={activeTab === AppTab.TRANSFORMER} 
              onClick={() => setActiveTab(AppTab.TRANSFORMER)}
              icon={<span className="text-lg">✨</span>}
            />
            <TabButton 
              label="About" 
              isActive={activeTab === AppTab.ABOUT} 
              onClick={() => setActiveTab(AppTab.ABOUT)}
              icon={<span className="text-lg">ℹ️</span>}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === AppTab.EXPLORER && (
          <Explorer onSelectChar={setSelectedChar} />
        )}
        
        {activeTab === AppTab.TRANSFORMER && (
          <Transformer />
        )}

        {activeTab === AppTab.ABOUT && (
          <About />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-900 mt-auto py-8 text-center text-gray-600 text-sm">
        <p>Powered by Gemini 2.5 Flash • Unicode 15.0 Standard • Built with React & Tailwind</p>
      </footer>

      {/* Modal Layer */}
      {selectedChar && (
        <DetailModal 
          charData={selectedChar} 
          onClose={() => setSelectedChar(null)} 
        />
      )}
    </div>
  );
};

export default App;