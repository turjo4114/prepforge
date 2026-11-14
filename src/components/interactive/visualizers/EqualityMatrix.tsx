import React, { useState } from 'react';

interface EqualityCase {
  aStr: string;
  bStr: string;
  loose: boolean;
  strict: boolean;
  stepExplanation: string;
}

const equalityCases: EqualityCase[] = [
  {
    aStr: '5',
    bStr: '"5"',
    loose: true,
    strict: false,
    stepExplanation: 'Loose == coerces string "5" into number 5. 5 === 5 is true. Strict === sees number vs string and immediately returns false.',
  },
  {
    aStr: '0',
    bStr: 'false',
    loose: true,
    strict: false,
    stepExplanation: 'Loose == coerces boolean false to number 0. 0 === 0 is true. Strict === rejects different types.',
  },
  {
    aStr: '""',
    bStr: 'false',
    loose: true,
    strict: false,
    stepExplanation: 'Loose == coerces false to 0, then empty string "" to 0. 0 === 0 is true. Strict === returns false.',
  },
  {
    aStr: 'null',
    bStr: 'undefined',
    loose: true,
    strict: false,
    stepExplanation: 'ECMAScript specification explicitly defines null == undefined as true without coercing them to numbers. Strict === returns false because types differ.',
  },
  {
    aStr: '[]',
    bStr: '0',
    loose: true,
    strict: false,
    stepExplanation: '[] is coerced to primitive via [].toString() which produces "". Then "" is converted to number 0. 0 === 0 is true.',
  },
  {
    aStr: '[]',
    bStr: '![]',
    loose: true,
    strict: false,
    stepExplanation: '![] evaluates first: [] is truthy so ![] becomes false. Then [] == false -> [] == 0 -> "" == 0 -> 0 == 0 -> true!',
  },
  {
    aStr: 'NaN',
    bStr: 'NaN',
    loose: false,
    strict: false,
    stepExplanation: 'Under IEEE 754 float specs, NaN is not equal to ANY value, including itself. Both == and === return false.',
  },
  {
    aStr: '{}',
    bStr: '{}',
    loose: false,
    strict: false,
    stepExplanation: 'Objects and arrays are compared by memory pointer reference. Each literal {} allocates a distinct address in the heap.',
  },
];

export const EqualityMatrix: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const current = equalityCases[selectedIdx];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 my-6 text-slate-200">
      <div className="pb-3 border-b border-slate-800">
        <h4 className="font-semibold text-brand-400 text-sm flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-pulse"></span>
          Interactive Equality & Coercion Matrix (== vs ===)
        </h4>
        <p className="text-xs text-slate-400">
          Click any comparison below to inspect the step-by-step ECMAScript type coercion breakdown.
        </p>
      </div>

      {/* Buttons of classic test pairs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4">
        {equalityCases.map((c, i) => (
          <button
            key={i}
            onClick={() => setSelectedIdx(i)}
            className={`p-2.5 rounded-lg border text-xs font-mono transition text-left ${
              selectedIdx === i
                ? 'bg-brand-500/15 border-brand-400 text-brand-200 font-bold'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {c.aStr} vs {c.bStr}
          </button>
        ))}
      </div>

      {/* Active Case Detail Card */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800 font-mono text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">Comparing:</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-brand-300 font-bold">{current.aStr}</span>
            <span className="text-slate-500">&amp;</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-brand-300 font-bold">{current.bStr}</span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span
              className={`px-2.5 py-1 rounded font-semibold flex items-center gap-1.5 ${
                current.loose
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-rose-950 text-rose-300 border border-rose-800'
              }`}
            >
              <code>== (Loose):</code> {current.loose ? 'TRUE' : 'FALSE'}
            </span>

            <span
              className={`px-2.5 py-1 rounded font-semibold flex items-center gap-1.5 ${
                current.strict
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-rose-950 text-rose-300 border border-rose-800'
              }`}
            >
              <code>=== (Strict):</code> {current.strict ? 'TRUE' : 'FALSE'}
            </span>
          </div>
        </div>

        <div className="mt-3">
          <h5 className="text-xs font-semibold text-slate-300 mb-1">Coercion Mechanics &amp; Explanation:</h5>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">{current.stepExplanation}</p>
        </div>
      </div>
    </div>
  );
};
