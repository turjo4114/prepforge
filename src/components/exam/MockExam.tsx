import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { mockExamQuestions } from '../../data/mockExamData';
import { MockExamResult } from '../../types';
import {
  GraduationCap,
  Clock,
  Flag,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Award,
  Check,
  X,
  BookOpen,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MockExam: React.FC = () => {
  const { recordMockExamResult, addMistake, setActiveLessonId } = useApp();

  const [examState, setExamState] = useState<'intro' | 'active' | 'results'>('intro');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(40 * 60); // 40 minutes
  const [timeTakenSeconds, setTimeTakenSeconds] = useState<number>(0);

  // Result metrics
  const [examResult, setExamResult] = useState<MockExamResult | null>(null);

  // Timer effect during active exam
  useEffect(() => {
    let interval: any = null;
    if (examState === 'active') {
      interval = setInterval(() => {
        setTimeRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
        setTimeTakenSeconds((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [examState]);

  const handleStartExam = () => {
    setUserAnswers({});
    setFlaggedQuestions([]);
    setCurrentQuestionIdx(0);
    setTimeRemainingSeconds(40 * 60);
    setTimeTakenSeconds(0);
    setExamState('active');
  };

  const handleSelectOption = (optionIdx: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIdx]: optionIdx,
    }));
  };

  const handleToggleFlag = (idx: number) => {
    setFlaggedQuestions((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleFinishExam = () => {
    let score = 0;
    const total = mockExamQuestions.length;
    const topicBreakdown: Record<string, { correct: number; total: number }> = {};

    mockExamQuestions.forEach((q, idx) => {
      const userChoice = userAnswers[idx];
      const isCorrect = userChoice === q.correctAnswer;

      if (!topicBreakdown[q.topic]) {
        topicBreakdown[q.topic] = { correct: 0, total: 0 };
      }
      topicBreakdown[q.topic].total += 1;

      if (isCorrect) {
        score += 1;
        topicBreakdown[q.topic].correct += 1;
      } else {
        // Record into Mistake Vault for smart revision
        addMistake(q, userChoice !== undefined ? userChoice : -1);
      }
    });

    const percentage = Math.round((score / total) * 100);

    const resultRecord: MockExamResult = {
      id: `mock-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      score,
      total,
      percentage,
      timeTakenSeconds,
      topicBreakdown,
      userAnswers,
      flaggedQuestions,
    };

    setExamResult(resultRecord);
    recordMockExamResult(resultRecord);
    setExamState('results');

    if (percentage >= 70) {
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // INTRO SCREEN
  if (examState === 'intro') {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-500/10 text-brand-500 border border-brand-500/20 flex items-center justify-center mx-auto">
            <GraduationCap className="w-8 h-8" />
          </div>

          <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-xs font-semibold">
            Practice Simulation • Not an Official Itransition Examination
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Itransition Front-end Technical Placement Mock Exam
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Test your readiness under real examination conditions. This simulation includes 35 questions covering
            JavaScript mechanics, programming logic, HTML semantics, CSS layouts, DOM events, and output prediction.
          </p>

          {/* Exam Specs Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto my-6 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">Questions</span>
              <span className="font-bold text-slate-900 dark:text-white text-base">35 Qs</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">Time Limit</span>
              <span className="font-bold text-slate-900 dark:text-white text-base">40 Mins</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">Benchmark</span>
              <span className="font-bold text-emerald-500 text-base">70% Pass</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">Formats</span>
              <span className="font-bold text-brand-400 text-base">MCQ &amp; Output</span>
            </div>
          </div>

          {/* Instructions List */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-left text-xs text-slate-600 dark:text-slate-400 space-y-2 max-w-xl mx-auto">
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-brand-500" />
              <span>Examination Rules:</span>
            </div>
            <ul className="list-disc list-inside space-y-1">
              <li>You can navigate back and forth between questions using the Question Navigator.</li>
              <li>Use the "Flag" button to mark tricky questions and revisit them before submitting.</li>
              <li>Answers are saved automatically as you make your selections.</li>
              <li>Incorrect answers will be automatically added to your Mistake Vault for smart revision.</li>
            </ul>
          </div>

          <div className="pt-4">
            <button
              onClick={handleStartExam}
              className="px-8 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-sm shadow-lg hover:shadow-brand-500/20 transition flex items-center gap-2 mx-auto"
            >
              <span>Begin Timed Mock Examination</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE EXAM SCREEN
  if (examState === 'active') {
    const currentQ = mockExamQuestions[currentQuestionIdx];
    const isFlagged = flaggedQuestions.includes(currentQuestionIdx);
    const selectedOption = userAnswers[currentQuestionIdx];
    const answeredCount = Object.keys(userAnswers).length;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Floating Control Bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-brand-500/10 text-brand-500">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xs text-slate-900 dark:text-white block">
                Question {currentQuestionIdx + 1} of {mockExamQuestions.length}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {answeredCount} answered • {mockExamQuestions.length - answeredCount} remaining
              </span>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm font-bold border border-slate-200 dark:border-slate-700">
            <Clock className={`w-4 h-4 ${timeRemainingSeconds < 300 ? 'text-rose-500 animate-pulse' : 'text-brand-500'}`} />
            <span>{formatTimer(timeRemainingSeconds)}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleToggleFlag(currentQuestionIdx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                isFlagged
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              <span>{isFlagged ? 'Flagged' : 'Flag'}</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to finish and submit the mock examination?')) {
                  handleFinishExam();
                }
              }}
              className="px-4 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs shadow transition"
            >
              Submit Exam
            </button>
          </div>
        </div>

        {/* Question Palette / Navigator */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="text-slate-500 font-semibold">Question Navigator Palette</span>
            <div className="flex items-center space-x-3 text-[10px] font-mono">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-brand-500"></span> Answered
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-amber-500"></span> Flagged
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-slate-200 dark:bg-slate-800"></span> Unvisited
              </span>
            </div>
          </div>

          <div className="grid grid-cols-7 sm:grid-cols-12 md:grid-cols-18 gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            {mockExamQuestions.map((_, i) => {
              const isAnswered = userAnswers[i] !== undefined;
              const isCurrent = currentQuestionIdx === i;
              const hasFlag = flaggedQuestions.includes(i);

              let paletteStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400';
              if (isAnswered) {
                paletteStyle = 'bg-brand-500 text-slate-950 font-bold';
              }
              if (hasFlag) {
                paletteStyle = 'bg-amber-500 text-slate-950 font-bold';
              }
              if (isCurrent) {
                paletteStyle += ' ring-2 ring-brand-400 ring-offset-2 dark:ring-offset-slate-900';
              }

              return (
                <button
                  key={i}
                  onClick={() => setCurrentQuestionIdx(i)}
                  className={`w-7 h-7 rounded text-xs font-mono font-semibold flex items-center justify-center transition ${paletteStyle}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Question Body */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-brand-600 dark:text-brand-400 font-bold uppercase tracking-wider">
              {currentQ.topic}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono text-[10px]">
              {currentQ.difficulty}
            </span>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
            {currentQ.question}
          </h2>

          {currentQ.codeSnippet && (
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed">
              <pre>{currentQ.codeSnippet}</pre>
            </div>
          )}

          {/* Options */}
          <div className="space-y-2.5 pt-2">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedOption === optIdx;

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-brand-500/10 border-brand-500 text-brand-700 dark:text-brand-300 font-semibold ring-1 ring-brand-500'
                      : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                        isSelected
                          ? 'bg-brand-500 text-slate-950'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-brand-500 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestionIdx === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition disabled:opacity-40"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentQuestionIdx < mockExamQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIdx((prev) => prev + 1)}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs shadow transition"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  if (window.confirm('You have reached the end. Ready to submit?')) {
                    handleFinishExam();
                  }
                }}
                className="px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow transition"
              >
                Submit &amp; Review
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // RESULTS & ANALYTICS REPORT SCREEN
  if (examState === 'results' && examResult) {
    const isPassing = examResult.percentage >= 70;

    return (
      <div className="max-w-4xl mx-auto space-y-8 pb-16">
        {/* Pass / Fail Banner */}
        <div
          className={`p-6 sm:p-8 rounded-2xl border shadow-lg text-center space-y-4 ${
            isPassing
              ? 'bg-gradient-to-br from-emerald-950/40 to-slate-900 border-emerald-500/40 text-emerald-100'
              : 'bg-gradient-to-br from-rose-950/40 to-slate-900 border-rose-500/40 text-rose-100'
          }`}
        >
          <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center bg-white/10 backdrop-blur-md">
            {isPassing ? (
              <Award className="w-10 h-10 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-10 h-10 text-rose-400" />
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {isPassing ? 'Placement Benchmark Cleared!' : 'Placement Benchmark Not Met'}
          </h1>

          <p className="text-sm max-w-xl mx-auto opacity-90 leading-relaxed font-sans">
            {isPassing
              ? `Outstanding performance! You scored ${examResult.percentage}% (${examResult.score}/${examResult.total}), clearing the 70% threshold required for the Itransition Front-end Specialization Training Program.`
              : `You scored ${examResult.percentage}% (${examResult.score}/${examResult.total}). You need 70%+ to qualify. Review your incorrect answers below and practice the weak topics before retaking.`}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto my-4 text-xs font-mono text-slate-100">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10">
              <span className="opacity-70 block text-[10px]">Total Score</span>
              <span className="font-bold text-lg">{examResult.score} / {examResult.total}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10">
              <span className="opacity-70 block text-[10px]">Accuracy</span>
              <span className="font-bold text-lg">{examResult.percentage}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10">
              <span className="opacity-70 block text-[10px]">Time Taken</span>
              <span className="font-bold text-lg">{formatTimer(examResult.timeTakenSeconds)}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10">
              <span className="opacity-70 block text-[10px]">Benchmark</span>
              <span className="font-bold text-lg">70% Pass</span>
            </div>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={handleStartExam}
              className="px-6 py-2.5 rounded-xl bg-white text-slate-950 font-bold text-xs shadow hover:bg-slate-100 transition flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Mock Exam</span>
            </button>
          </div>
        </div>

        {/* Topic Breakdown Analytics */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-500" />
            Topic-Wise Performance Breakdown
          </h2>

          <div className="space-y-3">
            {Object.entries(examResult.topicBreakdown).map(([topic, stats]) => {
              const accuracy = Math.round((stats.correct / stats.total) * 100);
              const isTopicPass = accuracy >= 70;

              return (
                <div key={topic} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{topic}</span>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                      {stats.correct} / {stats.total} ({accuracy}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isTopicPass ? 'bg-emerald-500' : 'bg-rose-500'}`}
                      style={{ width: `${accuracy}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full Question-by-Question Review */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Full Answer Key &amp; Technical Explanations
            </h2>
            <span className="text-xs font-mono text-slate-400">
              35 Questions Verified
            </span>
          </div>

          <div className="space-y-4">
            {mockExamQuestions.map((q, idx) => {
              const userChoice = examResult.userAnswers[idx];
              const isCorrect = userChoice === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`p-5 sm:p-6 rounded-2xl border space-y-3 ${
                    isCorrect
                      ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                      : 'bg-rose-50/20 dark:bg-rose-950/15 border-rose-200 dark:border-rose-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold text-slate-500">
                      Question {idx + 1} • {q.topic}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] font-mono flex items-center gap-1 ${
                        isCorrect
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {q.question}
                  </p>

                  {q.codeSnippet && (
                    <div className="bg-slate-950 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-x-auto border border-slate-800">
                      <pre>{q.codeSnippet}</pre>
                    </div>
                  )}

                  <div className="space-y-1.5 text-xs">
                    {q.options.map((opt, optIdx) => {
                      const isUserChoice = userChoice === optIdx;
                      const isCorrectChoice = optIdx === q.correctAnswer;

                      let rowClass = 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400';

                      if (isCorrectChoice) {
                        rowClass = 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-semibold';
                      } else if (isUserChoice && !isCorrect) {
                        rowClass = 'bg-rose-500/10 border-rose-500 text-rose-700 dark:text-rose-300 font-semibold';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-lg border flex items-center justify-between ${rowClass}`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="font-mono font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                            <span>{opt}</span>
                          </div>
                          {isCorrectChoice && <span className="text-[10px] uppercase font-bold text-emerald-500">Correct Answer</span>}
                          {isUserChoice && !isCorrectChoice && <span className="text-[10px] uppercase font-bold text-rose-500">Your Selection</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Technical Explanation */}
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans border border-slate-200 dark:border-slate-800/80">
                    <strong className="text-brand-600 dark:text-brand-400">Technical Explanation: </strong>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
