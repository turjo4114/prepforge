import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LessonContent, QuizQuestion } from '../../types';
import { modulesData } from '../../data/modulesData';
import { CodeEditor } from '../interactive/CodeEditor';
import { BoxModelVisualizer } from '../interactive/visualizers/BoxModelVisualizer';
import { FlexboxPlayground } from '../interactive/visualizers/FlexboxPlayground';
import { EqualityMatrix } from '../interactive/visualizers/EqualityMatrix';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Check,
  X,
  HelpCircle,
  Award,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LessonViewProps {
  lesson: LessonContent;
  onBackToModules: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({ lesson, onBackToModules }) => {
  const {
    progress,
    markLessonComplete,
    setLessonQuizScore,
    addMistake,
    setActiveLessonId,
  } = useApp();

  const isCompleted = progress.completedLessons.includes(lesson.id);

  // Knowledge check state: questionIndex -> selectedIndex
  const [kcAnswers, setKcAnswers] = useState<Record<number, number>>({});

  // Final assessment state
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, number>>({});
  const [submittedAssessment, setSubmittedAssessment] = useState(false);
  const [assessmentScore, setAssessmentScore] = useState<number | null>(null);

  // Find current module and adjacent lessons
  const currentModule = modulesData.find((m) => m.id === lesson.moduleId);
  const allLessons = modulesData.flatMap((m) => m.lessons);
  const currentIdx = allLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIdx > 0 ? allLessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null;

  const handleKnowledgeCheckSelect = (qIdx: number, optIdx: number) => {
    setKcAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleAssessmentSelect = (qId: string, optIdx: number) => {
    if (submittedAssessment) return;
    setAssessmentAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleAssessmentSubmit = () => {
    if (lesson.finalAssessment.length === 0) return;

    let correctCount = 0;
    lesson.finalAssessment.forEach((q) => {
      const userChoice = assessmentAnswers[q.id];
      if (userChoice === q.correctAnswer) {
        correctCount += 1;
      } else {
        // Record mistake to Mistake Vault for smart revision!
        addMistake(q, userChoice !== undefined ? userChoice : -1);
      }
    });

    const pct = Math.round((correctCount / lesson.finalAssessment.length) * 100);
    setAssessmentScore(pct);
    setSubmittedAssessment(true);
    setLessonQuizScore(lesson.id, pct);

    if (pct >= 70) {
      markLessonComplete(lesson.id);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  const handleRetakeAssessment = () => {
    setAssessmentAnswers({});
    setSubmittedAssessment(false);
    setAssessmentScore(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <button
          onClick={onBackToModules}
          className="flex items-center gap-1.5 hover:text-brand-500 font-semibold transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Modules</span>
        </button>

        <div className="flex items-center space-x-2 font-mono">
          <span>{currentModule?.title.split(':')[0]}</span>
          <span>•</span>
          <span className="text-slate-700 dark:text-slate-300 font-semibold">{lesson.title}</span>
        </div>
      </div>

      {/* Lesson Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-500/20">
              {lesson.importance}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5" /> {lesson.durationMinutes} mins
            </span>
          </div>

          {isCompleted && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Lesson Completed
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {lesson.title}
        </h1>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
          {lesson.summary}
        </p>

        {/* Key Takeaways Pill List */}
        <div className="pt-2">
          <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 mb-2">
            Core Competencies:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
            {lesson.keyPoints.map((kp, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80"
              >
                <Check className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <span>{kp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1. Beginner-Friendly Simple Explanations */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-500" />
          1. Concept Explanation (Simplified)
        </h2>

        <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
          {lesson.simpleExplanation.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {/* 2. Interactive Visual Demonstrations (If available) */}
      {lesson.visualDemo && (
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            2. Visual Demonstration: {lesson.visualDemo.title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {lesson.visualDemo.description}
          </p>

          {lesson.visualDemo.type === 'box-model' && <BoxModelVisualizer />}
          {lesson.visualDemo.type === 'flexbox' && <FlexboxPlayground />}
          {lesson.visualDemo.type === 'equality-matrix' && <EqualityMatrix />}
          {lesson.visualDemo.type === 'type-coercion' && <EqualityMatrix />}
        </section>
      )}

      {/* 3. Practical Code Examples & Expected Output */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-brand-500" />
          3. Practical Code Examples
        </h2>

        <div className="space-y-6">
          {lesson.practicalExamples.map((ex, i) => (
            <div key={i} className="space-y-2">
              <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                {ex.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{ex.explanation}</p>

              <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
                <div className="px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-slate-400 flex items-center justify-between">
                  <span>{ex.language || 'javascript'} snippet</span>
                  <span className="text-[10px] text-slate-500">Read &amp; analyze</span>
                </div>
                <pre className="p-4 text-emerald-400 overflow-x-auto leading-relaxed">
                  {ex.code}
                </pre>
                <div className="p-3 bg-slate-900/60 border-t border-slate-800/80 text-slate-300 text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                    Expected Output:
                  </span>
                  <pre className="text-slate-200 font-mono whitespace-pre-wrap">{ex.expectedOutput}</pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Common Mistakes & Explanations */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-500" />
          4. Common Interview Mistakes &amp; Traps
        </h2>

        <div className="space-y-3">
          {lesson.commonMistakes.map((m, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-2 text-xs"
            >
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-bold">
                <X className="w-4 h-4 shrink-0" />
                <span>Mistake: {m.mistake}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                <strong className="text-slate-700 dark:text-slate-300">Why it happens: </strong>
                {m.whyItHappens}
              </p>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-medium flex items-start gap-2">
                <Check className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
                <span>
                  <strong>How to fix: </strong>
                  {m.howToFix}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Short Knowledge Checks (Instant Feedback) */}
      {lesson.knowledgeChecks.length > 0 && (
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-500" />
            5. Quick Knowledge Check
          </h2>

          <div className="space-y-4">
            {lesson.knowledgeChecks.map((kc, qIdx) => {
              const selectedOpt = kcAnswers[qIdx];
              const isAnswered = selectedOpt !== undefined;

              return (
                <div key={qIdx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3">
                  <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                    {kc.question}
                  </p>

                  <div className="space-y-2">
                    {kc.options.map((opt, optIdx) => {
                      const isChosen = selectedOpt === optIdx;
                      const isCorrect = optIdx === kc.correctIndex;

                      let btnStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400';
                      if (isAnswered) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-semibold';
                        } else if (isChosen && !isCorrect) {
                          btnStyle = 'bg-rose-500/10 border-rose-500 text-rose-700 dark:text-rose-300';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleKnowledgeCheckSelect(qIdx, optIdx)}
                          className={`w-full text-left p-3 rounded-lg border text-xs transition flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && isCorrect && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                          {isAnswered && isChosen && !isCorrect && <X className="w-4 h-4 text-rose-500 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 text-xs text-indigo-800 dark:text-indigo-200 leading-relaxed font-sans">
                      <strong>Explanation: </strong> {kc.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 6. Practice Exercise with Interactive Code Editor */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-brand-500" />
          6. Interactive Practice Exercise: {lesson.practiceExercise.title}
        </h2>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          {lesson.practiceExercise.instructions}
        </p>

        <CodeEditor
          initialCode={lesson.practiceExercise.starterCode}
          solutionCode={lesson.practiceExercise.solutionCode}
          hints={lesson.practiceExercise.hints}
          testCases={lesson.practiceExercise.testCases}
          onSuccess={() => {
            // Give instant feedback and mark completed
            markLessonComplete(lesson.id);
          }}
        />
      </section>

      {/* 7. Final Topic Assessment */}
      {lesson.finalAssessment.length > 0 && (
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                7. Final Topic Assessment
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Score 70%+ to unlock completion checkmark and record topic mastery.
              </p>
            </div>

            {submittedAssessment && assessmentScore !== null && (
              <span
                className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
                  assessmentScore >= 70
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/40'
                }`}
              >
                Score: {assessmentScore}%
              </span>
            )}
          </div>

          <div className="space-y-6">
            {lesson.finalAssessment.map((q, idx) => {
              const selectedOption = assessmentAnswers[q.id];

              return (
                <div
                  key={q.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-500 font-semibold">
                      Question {idx + 1} of {lesson.finalAssessment.length}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {q.difficulty}
                    </span>
                  </div>

                  <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                    {q.question}
                  </p>

                  {q.codeSnippet && (
                    <pre className="p-3 bg-slate-900 text-emerald-400 rounded-lg text-xs font-mono overflow-x-auto border border-slate-800">
                      {q.codeSnippet}
                    </pre>
                  )}

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOption === optIdx;
                      const isCorrect = optIdx === q.correctAnswer;

                      let optClass = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-brand-500';

                      if (submittedAssessment) {
                        if (isCorrect) {
                          optClass = 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-semibold';
                        } else if (isSelected && !isCorrect) {
                          optClass = 'bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-300';
                        }
                      } else if (isSelected) {
                        optClass = 'bg-brand-500/10 border-brand-500 text-brand-700 dark:text-brand-300 font-semibold';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={submittedAssessment}
                          onClick={() => handleAssessmentSelect(q.id, optIdx)}
                          className={`w-full text-left p-3 rounded-lg border text-xs transition flex items-center justify-between ${optClass}`}
                        >
                          <span>{opt}</span>
                          {submittedAssessment && isCorrect && <Check className="w-4 h-4 text-emerald-500" />}
                          {submittedAssessment && isSelected && !isCorrect && <X className="w-4 h-4 text-rose-500" />}
                        </button>
                      );
                    })}
                  </div>

                  {submittedAssessment && (
                    <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans border border-slate-200 dark:border-slate-800">
                      <strong className="text-brand-600 dark:text-brand-400">Detailed Explanation: </strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex items-center justify-between">
            {!submittedAssessment ? (
              <button
                onClick={handleAssessmentSubmit}
                disabled={Object.keys(assessmentAnswers).length < lesson.finalAssessment.length}
                className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs shadow transition disabled:opacity-40"
              >
                Submit Assessment Answers
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleRetakeAssessment}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition"
                >
                  Retake Assessment
                </button>
                {assessmentScore !== null && assessmentScore >= 70 && (
                  <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Lesson Passed &amp; Recorded!
                  </span>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Lesson Navigation Footer */}
      <div className="flex flex-wrap items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800 gap-4">
        {prevLesson ? (
          <button
            onClick={() => setActiveLessonId(prevLesson.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 text-xs font-semibold text-slate-700 dark:text-slate-300 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous: {prevLesson.title}</span>
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={() => markLessonComplete(lesson.id)}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            isCompleted
              ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
              : 'bg-brand-500 hover:bg-brand-400 text-slate-950 shadow'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isCompleted ? 'Marked Completed' : 'Mark Lesson Complete'}</span>
        </button>

        {nextLesson ? (
          <button
            onClick={() => setActiveLessonId(nextLesson.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/30 text-xs font-semibold text-brand-600 dark:text-brand-300 transition"
          >
            <span>Next: {nextLesson.title}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
