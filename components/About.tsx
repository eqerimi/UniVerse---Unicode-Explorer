import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in pb-12">
      
      {/* Hero Section */}
      <div className="text-center space-y-6 py-8">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-900/30 rounded-2xl mb-4 border border-indigo-500/30">
          <span className="text-4xl">⌘</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          The Semantic <span className="text-indigo-500">Unicode</span> Companion
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          UniVerse bridges the gap between human concepts and machine text. 
          Powered by Gemini AI, it helps you discover, understand, and transform the world's writing systems.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard 
          icon="🔍"
          title="Semantic Discovery"
          description="Forget searching by exact names. Ask for 'ancient egypt' or 'set theory operators', and our AI finds the relevant glyphs instantly."
        />
        <FeatureCard 
          icon="✨"
          title="Text Transformer"
          description="Convert plain text into mathematical alphanumeric symbols (Bold, Fraktur, Script) for use in social media and specialized UIs."
        />
        <FeatureCard 
          icon="🛠️"
          title="Deep Inspection"
          description="Get low-level technical data for any character: UTF-8/16 byte sequences, HTML entities, and CSS escape codes."
        />
      </div>

      {/* Technical Detail Section */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-6">
        <h3 className="text-2xl font-bold text-white">How it works</h3>
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>
            UniVerse is built on the intersection of modern web standards and Generative AI.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-400 ml-2">
            <li>
              <strong className="text-indigo-400">Gemini 2.5 Flash</strong> provides the semantic understanding, allowing us to query the Unicode standard using natural language concepts instead of rigid hex codes.
            </li>
            <li>
              <strong className="text-indigo-400">Mathematical Alphanumerics</strong> are used in the Transformer tab. These aren't fonts—they are distinct code points defined in the Unicode Mathematical Alphanumeric Symbols block (U+1D400–U+1D7FF).
            </li>
            <li>
              <strong className="text-indigo-400">Browser Native APIs</strong> like <code>TextEncoder</code> and <code>codePointAt</code> are used to calculate precise encoding details on the fly.
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
};

const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl hover:bg-gray-800 transition-colors">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);