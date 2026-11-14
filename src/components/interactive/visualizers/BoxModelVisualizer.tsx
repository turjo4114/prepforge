import React, { useState } from 'react';

export const BoxModelVisualizer: React.FC = () => {
  const [boxSizing, setBoxSizing] = useState<'content-box' | 'border-box'>('content-box');
  const [declaredWidth, setDeclaredWidth] = useState(200);
  const [padding, setPadding] = useState(20);
  const [border, setBorder] = useState(6);
  const [margin, setMargin] = useState(16);

  // Sizing mathematics
  const totalRenderedWidth =
    boxSizing === 'content-box'
      ? declaredWidth + padding * 2 + border * 2
      : declaredWidth;

  const actualContentWidth =
    boxSizing === 'content-box'
      ? declaredWidth
      : Math.max(0, declaredWidth - (padding * 2 + border * 2));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 my-6 text-slate-200">
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div>
          <h4 className="font-semibold text-brand-400 text-sm flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-pulse"></span>
            Interactive Box Model Explorer
          </h4>
          <p className="text-xs text-slate-400">
            Tweak values and toggle <code className="text-brand-300">box-sizing</code> to see real-world layout math.
          </p>
        </div>

        {/* Box sizing toggle */}
        <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setBoxSizing('content-box')}
            className={`px-3 py-1 rounded-md font-mono transition ${
              boxSizing === 'content-box'
                ? 'bg-brand-500 text-slate-950 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            content-box (default)
          </button>
          <button
            onClick={() => setBoxSizing('border-box')}
            className={`px-3 py-1 rounded-md font-mono transition ${
              boxSizing === 'border-box'
                ? 'bg-brand-500 text-slate-950 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            border-box (modern)
          </button>
        </div>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 text-xs font-mono">
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <label className="text-slate-400 block mb-1">Declared Width: {declaredWidth}px</label>
          <input
            type="range"
            min={120}
            max={280}
            value={declaredWidth}
            onChange={(e) => setDeclaredWidth(Number(e.target.value))}
            className="w-full accent-brand-500"
          />
        </div>

        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <label className="text-emerald-400 block mb-1">Padding: {padding}px</label>
          <input
            type="range"
            min={0}
            max={40}
            value={padding}
            onChange={(e) => setPadding(Number(e.target.value))}
            className="w-full accent-emerald-500"
          />
        </div>

        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <label className="text-amber-400 block mb-1">Border: {border}px</label>
          <input
            type="range"
            min={0}
            max={20}
            value={border}
            onChange={(e) => setBorder(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>

        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <label className="text-rose-400 block mb-1">Margin: {margin}px</label>
          <input
            type="range"
            min={0}
            max={30}
            value={margin}
            onChange={(e) => setMargin(Number(e.target.value))}
            className="w-full accent-rose-500"
          />
        </div>
      </div>

      {/* Visual Nested Layers */}
      <div className="flex justify-center p-6 bg-slate-950/80 rounded-xl border border-slate-800/80 overflow-x-auto">
        {/* Margin Box */}
        <div
          className="border-2 border-dashed border-rose-500/50 bg-rose-500/10 rounded p-2 text-center transition-all"
          style={{ padding: `${margin}px` }}
        >
          <div className="text-[10px] uppercase font-mono text-rose-400 font-semibold mb-1">
            Margin ({margin}px)
          </div>

          {/* Border Box */}
          <div
            className="border-2 border-amber-500 bg-amber-500/15 rounded text-center transition-all"
            style={{ borderWidth: `${border}px` }}
          >
            <div className="text-[10px] uppercase font-mono text-amber-300 font-semibold mb-1">
              Border ({border}px)
            </div>

            {/* Padding Box */}
            <div
              className="bg-emerald-500/20 border border-emerald-500/40 rounded text-center transition-all"
              style={{ padding: `${padding}px` }}
            >
              <div className="text-[10px] uppercase font-mono text-emerald-300 font-semibold mb-1">
                Padding ({padding}px)
              </div>

              {/* Content Box */}
              <div
                className="bg-brand-500/30 border border-brand-400 rounded p-3 text-center transition-all min-h-[60px] flex flex-col items-center justify-center"
                style={{ width: `${actualContentWidth}px` }}
              >
                <span className="text-[10px] font-mono font-bold text-brand-300 uppercase">Content Area</span>
                <span className="text-xs font-mono font-bold text-white">{actualContentWidth}px wide</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formula & Live Calculation Readout */}
      <div className="mt-4 p-3.5 bg-slate-950 rounded-lg border border-slate-800 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-slate-400">Total Rendered Element Width: </span>
            <span className="font-mono text-base font-bold text-brand-300">{totalRenderedWidth}px</span>
          </div>

          <div className="font-mono text-slate-400 text-[11px]">
            {boxSizing === 'content-box' ? (
              <span>
                Calculation: {declaredWidth} (content) + {padding * 2} (padding) + {border * 2} (border) ={' '}
                <strong className="text-brand-300">{totalRenderedWidth}px</strong>
              </span>
            ) : (
              <span>
                Calculation: Fixed at declared <strong className="text-brand-300">{declaredWidth}px</strong> (content
                shrunk to {actualContentWidth}px)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
