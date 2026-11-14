import React, { useState } from 'react';

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type JustifyContent = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
type AlignItems = 'stretch' | 'flex-start' | 'center' | 'flex-end';

export const FlexboxPlayground: React.FC = () => {
  const [flexDirection, setFlexDirection] = useState<FlexDirection>('row');
  const [justifyContent, setJustifyContent] = useState<JustifyContent>('center');
  const [alignItems, setAlignItems] = useState<AlignItems>('center');
  const [itemCount, setItemCount] = useState<number>(3);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 my-6 text-slate-200">
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div>
          <h4 className="font-semibold text-brand-400 text-sm flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-pulse"></span>
            Interactive Flexbox Alignment Studio
          </h4>
          <p className="text-xs text-slate-400">
            Switch axes and alignments to visually understand main axis vs cross axis behavior.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400 font-mono">Items:</span>
          <button
            onClick={() => setItemCount((c) => Math.max(2, c - 1))}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
          >
            -
          </button>
          <span className="font-mono px-1 font-bold text-brand-400">{itemCount}</span>
          <button
            onClick={() => setItemCount((c) => Math.min(6, c + 1))}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
          >
            +
          </button>
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 text-xs font-mono">
        <div>
          <label className="text-slate-400 block mb-1">flex-direction:</label>
          <select
            value={flexDirection}
            onChange={(e) => setFlexDirection(e.target.value as FlexDirection)}
            className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-brand-500"
          >
            <option value="row">row (default)</option>
            <option value="row-reverse">row-reverse</option>
            <option value="column">column</option>
            <option value="column-reverse">column-reverse</option>
          </select>
        </div>

        <div>
          <label className="text-brand-300 block mb-1">justify-content (Main Axis):</label>
          <select
            value={justifyContent}
            onChange={(e) => setJustifyContent(e.target.value as JustifyContent)}
            className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-brand-500"
          >
            <option value="flex-start">flex-start</option>
            <option value="center">center</option>
            <option value="flex-end">flex-end</option>
            <option value="space-between">space-between</option>
            <option value="space-around">space-around</option>
            <option value="space-evenly">space-evenly</option>
          </select>
        </div>

        <div>
          <label className="text-indigo-300 block mb-1">align-items (Cross Axis):</label>
          <select
            value={alignItems}
            onChange={(e) => setAlignItems(e.target.value as AlignItems)}
            className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-brand-500"
          >
            <option value="stretch">stretch</option>
            <option value="flex-start">flex-start</option>
            <option value="center">center</option>
            <option value="flex-end">flex-end</option>
          </select>
        </div>
      </div>

      {/* Visual Flex Container */}
      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[220px] overflow-hidden flex flex-col justify-center">
        <div
          className="w-full h-44 bg-slate-900/90 border-2 border-dashed border-slate-700 rounded-lg p-2 transition-all duration-300 flex gap-2"
          style={{
            flexDirection,
            justifyContent,
            alignItems,
          }}
        >
          {Array.from({ length: itemCount }).map((_, idx) => (
            <div
              key={idx}
              className="bg-brand-500/20 border border-brand-400 text-brand-200 rounded-lg p-3 font-mono font-bold flex flex-col items-center justify-center text-xs shadow-md transition-all min-w-[50px] min-h-[50px]"
            >
              <span>Box {idx + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Generated CSS Snippet */}
      <div className="mt-3 p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 flex items-center justify-between">
        <code>
          .container &#123; display: flex; flex-direction: {flexDirection}; justify-content: {justifyContent}; align-items: {alignItems}; &#125;
        </code>
      </div>
    </div>
  );
};
