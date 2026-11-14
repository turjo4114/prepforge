import React, { useState } from 'react';
import { cheatsheetData } from '../../data/cheatsheetData';
import { FileText, Sparkles, Code2, Copy, Check, Lightbulb, Zap, ShieldCheck } from 'lucide-react';

export const CheatsheetView: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copySnippet = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-500/20">
              High-Yield Placement Secrets
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Itransition Screening Cheatsheet
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Condensed formulas, edge-case quirks, and interview traps most frequently asked in technical placement screenings in Bangladesh.
          </p>
        </div>
      </div>

      {/* Cheatsheet Categories */}
      <div className="space-y-8">
        {cheatsheetData.map((cat, catIdx) => (
          <div
            key={catIdx}
            className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-brand-500" />
                {cat.title}
              </h2>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-400">
                {cat.badge}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cat.items.map((item, itemIdx) => {
                const uniqueKey = `${catIdx}-${itemIdx}`;
                const isCopied = copiedKey === uniqueKey;

                return (
                  <div
                    key={itemIdx}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                        {item.title}
                      </h3>

                      {item.code && (
                        <div className="relative my-2">
                          <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed">
                            {item.code}
                          </pre>
                          <button
                            onClick={() => copySnippet(item.code!, uniqueKey)}
                            className="absolute top-2 right-2 p-1 rounded bg-slate-800 text-slate-400 hover:text-white transition"
                            title="Copy code"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      )}

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                        {item.summary}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 text-[11px] text-brand-700 dark:text-brand-300 font-medium">
                      <span className="font-bold">Interview Context: </span>
                      {item.whyTested}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Exam Day Strategy Checklist */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-brand-950/40 via-slate-900 to-slate-950 border border-brand-800/40 shadow-lg space-y-4 text-slate-200">
          <div className="flex items-center space-x-2 text-brand-400">
            <ShieldCheck className="w-6 h-6" />
            <h2 className="text-lg font-bold text-white">
              Placement Test Day Strategy Checklist
            </h2>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
            Technical placement tests are designed not just to test syntax, but to see if you panic under time pressure. Keep these rules in mind:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="font-bold text-brand-300 block">1. Spot Edge Cases First</span>
              <p className="text-slate-400">
                Look for null, undefined, 0, empty array [], and variable shadowing before calculating output.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="font-bold text-brand-300 block">2. Trace Asynchronous Loops</span>
              <p className="text-slate-400">
                If you see `var i` with `setTimeout`, remember `var` does NOT create block scope. The final loop value runs!
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="font-bold text-brand-300 block">3. CSS Specificity Calculation</span>
              <p className="text-slate-400">
                Count IDs first! 1 ID beats 1,000 classes. If tie, the stylesheet rule declared later wins.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="font-bold text-brand-300 block">4. Pace Your Time (60s / Q)</span>
              <p className="text-slate-400">
                Never spend more than 90 seconds on one MCQ. Flag it, move forward, and return with remaining time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
