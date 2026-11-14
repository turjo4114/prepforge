import React, { useState } from 'react';
import { Eye, Code2, RotateCcw } from 'lucide-react';

const defaultHTML = `<div class="card">
  <h2>PrepForge Candidate</h2>
  <p>Itransition Placement Training</p>
  <button id="cta-btn">Start Test</button>
</div>`;

const defaultCSS = `body {
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #0f172a;
  margin: 0;
}
.card {
  background: #1e293b;
  color: #f8fafc;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  border: 1px solid #334155;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);
}
h2 {
  margin-top: 0;
  color: #2dd4bf;
}
p {
  color: #94a3b8;
  font-size: 14px;
}
button {
  background: #0d9488;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}
button:hover {
  background: #14b8a6;
}`;

export const LivePreviewPlayground: React.FC = () => {
  const [html, setHtml] = useState(defaultHTML);
  const [css, setCss] = useState(defaultCSS);
  const [activeTab, setActiveTab] = useState<'html' | 'css'>('html');

  const srcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;

  const resetPlayground = () => {
    setHtml(defaultHTML);
    setCss(defaultCSS);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl my-6">
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 gap-2">
        <div className="flex items-center space-x-2">
          <Code2 className="w-4 h-4 text-brand-400" />
          <h3 className="text-sm font-semibold text-slate-200">
            HTML &amp; CSS Live Preview Playground
          </h3>
          <span className="text-xs px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 font-mono">
            Interactive Sandboxed iframe
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={resetPlayground}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Editor Half */}
        <div className="border-r border-slate-800 flex flex-col">
          <div className="flex bg-slate-950/70 border-b border-slate-800 text-xs font-mono">
            <button
              onClick={() => setActiveTab('html')}
              className={`px-4 py-2 border-r border-slate-800 transition ${
                activeTab === 'html'
                  ? 'bg-slate-900 text-brand-300 font-bold border-b-2 border-b-brand-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              index.html
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`px-4 py-2 border-r border-slate-800 transition ${
                activeTab === 'css'
                  ? 'bg-slate-900 text-brand-300 font-bold border-b-2 border-b-brand-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              styles.css
            </button>
          </div>

          <div className="p-3 bg-slate-900/90 flex-1 min-h-[260px]">
            {activeTab === 'html' ? (
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                rows={11}
                spellCheck={false}
                className="w-full h-full bg-transparent text-amber-300 font-mono text-xs outline-none resize-none leading-relaxed"
                placeholder="Enter HTML markup here..."
              />
            ) : (
              <textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                rows={11}
                spellCheck={false}
                className="w-full h-full bg-transparent text-cyan-300 font-mono text-xs outline-none resize-none leading-relaxed"
                placeholder="Enter CSS rules here..."
              />
            )}
          </div>
        </div>

        {/* Live Preview Half */}
        <div className="flex flex-col bg-slate-950">
          <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-emerald-400" /> Live Rendered Output
            </span>
          </div>

          <div className="flex-1 min-h-[260px] bg-white rounded-b-xl overflow-hidden">
            <iframe
              srcDoc={srcDoc}
              title="Live Output"
              sandbox="allow-scripts"
              className="w-full h-full min-h-[260px] border-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
