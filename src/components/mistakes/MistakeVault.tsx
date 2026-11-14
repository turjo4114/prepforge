import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  BookOpen,
  Filter,
  Check,
  X,
  Sparkles,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MistakeVault: React.FC = () => {
  const { progress, markMistakeMastered, setActiveLessonId } = useApp();

  const [filterTopic, setFilterTopic] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unresolved' | 'mastered'>('unresolved');

  // Interactive re-attempt state: questionId -> selectedOptionIdx
  const [attemptAnswers, setAttemptAnswers] = useState<Record<string, number>>({});
  const [attemptResults, setAttemptResults] = useState<Record<string, boolean>>({});

  const mistakes = progress.mistakeVault;

  // Extract unique topics
  const topics = Array.from(new Set(mistakes.map((m) => m.topic)));

  // Filtered mistakes
  const filteredMistakes = mistakes.filter((m) => {
    if (filterTopic !== 'all' && m.topic !== filterTopic) return false;
    if (filterStatus === 'unresolved' && m.mastered) return false;
    if (filterStatus === 'mastered' && !m.mastered) return false;
    return true;
  });

  const handleRetakeSubmit = (mistakeId: string, questionId: string, correctAnswer: number) => {
    const selected = attemptAnswers[questionId];
    if (selected === undefined) return;

    const isCorrect = selected === correctAnswer;
    setAttemptResults((prev) => ({ ...prev, [questionId]: isCorrect }));

    if (isCorrect) {
      markMistakeMastered(questionId);
      try {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.7 },
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  const unresolvedCount = mistakes.filter((m) => !m.mastered).length;
  const masteredCount = mistakes.filter((m) => m.mastered).length;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              Smart Targeted Revision
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Mistake Vault &amp; Error Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Every question you miss during quizzes or mock exams is automatically collected here.
            Re-attempt and eliminate mistakes until all are mastered.
          </p>
        </div>

        {/* Counter Badges */}
        <div className="flex items-center space-x-2 font-mono text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-bold">
            {unresolvedCount} to master
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
            {masteredCount} mastered
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">Status:</span>
          <div className="flex rounded-lg bg-slate-100 dark:bg-slate-950 p-1 border border-slate-200 dark:border-slate-800 font-mono">
            <button
              onClick={() => setFilterStatus('unresolved')}
              className={`px-3 py-1 rounded-md transition ${
                filterStatus === 'unresolved'
                  ? 'bg-brand-500 text-slate-950 font-bold'
                  : 'text-slate-500 hover:text-slate-200'
              }`}
            >
              Unresolved ({unresolvedCount})
            </button>
            <button
              onClick={() => setFilterStatus('mastered')}
              className={`px-3 py-1 rounded-md transition ${
                filterStatus === 'mastered'
                  ? 'bg-brand-500 text-slate-950 font-bold'
                  : 'text-slate-500 hover:text-slate-200'
              }`}
            >
              Mastered ({masteredCount})
            </button>
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-md transition ${
                filterStatus === 'all'
                  ? 'bg-brand-500 text-slate-950 font-bold'
                  : 'text-slate-500 hover:text-slate-200'
              }`}
            >
              All ({mistakes.length})
            </button>
          </div>
        </div>

        {topics.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Topic:</span>
            <select
              value={filterTopic}
              onChange={(e) => setFilterTopic(e.target.value)}
              className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1 text-slate-700 dark:text-slate-300 font-mono focus:outline-none"
            >
              <option value="all">All Topics ({mistakes.length})</option>
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Mistake Items */}
      {filteredMistakes.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {filterStatus === 'unresolved'
              ? 'Zero Pending Mistakes!'
              : 'No Questions Found in Filter'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            {filterStatus === 'unresolved'
              ? 'Great work! You have either answered everything correctly or mastered all previous mistakes.'
              : 'Try adjusting your topic or status filter to see other questions.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMistakes.map((m) => {
            const selectedAttempt = attemptAnswers[m.questionId];
            const hasAttempted = attemptResults[m.questionId] !== undefined;
            const attemptSuccess = attemptResults[m.questionId] === true;

            return (
              <div
                key={m.id}
                className={`p-6 rounded-2xl border transition space-y-4 ${
                  m.mastered
                    ? 'bg-slate-50/60 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 opacity-90'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-brand-600 dark:text-brand-400 font-bold uppercase">
                      {m.topic}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">{m.moduleTitle}</span>
                  </div>

                  {m.mastered ? (
                    <span className="flex items-center gap-1 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Mastered
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      <AlertTriangle className="w-3.5 h-3.5" /> Needs Practice
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {m.question}
                </h3>

                {m.codeSnippet && (
                  <div className="bg-slate-950 rounded-xl border border-slate-800 p-3 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed">
                    <pre>{m.codeSnippet}</pre>
                  </div>
                )}

                {/* Interactive Re-attempt Option List */}
                <div className="space-y-2">
                  {m.options.map((opt, optIdx) => {
                    const isSelected = selectedAttempt === optIdx;
                    const isOriginalError = m.userChoice === optIdx;

                    let optStyle = 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-brand-500';

                    if (isSelected) {
                      optStyle = 'bg-brand-500/15 border-brand-400 text-brand-700 dark:text-brand-300 font-semibold';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() =>
                          setAttemptAnswers((prev) => ({
                            ...prev,
                            [m.questionId]: optIdx,
                          }))
                        }
                        className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-center justify-between ${optStyle}`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className="font-mono font-bold text-slate-400">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span>{opt}</span>
                        </div>

                        {isOriginalError && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-500">
                            Previous mistake
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Actions & Result */}
                <div className="flex flex-wrap items-center justify-between pt-2 gap-3">
                  <button
                    onClick={() =>
                      handleRetakeSubmit(m.id, m.questionId, m.correctAnswer)
                    }
                    disabled={selectedAttempt === undefined}
                    className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs shadow transition disabled:opacity-40 flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Verify Re-attempt</span>
                  </button>

                  {hasAttempted && (
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      {attemptSuccess ? (
                        <span className="text-emerald-500 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Correct! Marked as Mastered.
                        </span>
                      ) : (
                        <span className="text-rose-500 flex items-center gap-1">
                          <X className="w-4 h-4" /> Not quite! Review the explanation below.
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Explanation Box */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-xs text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 leading-relaxed font-sans">
                  <strong className="text-brand-600 dark:text-brand-400">Detailed Explanation: </strong>
                  {m.explanation}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
