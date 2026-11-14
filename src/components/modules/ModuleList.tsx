import React from 'react';
import { useApp } from '../../context/AppContext';
import { modulesData } from '../../data/modulesData';
import { LessonView } from './LessonView';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Code2,
  Cpu,
  Layout,
  Paintbrush,
  Globe,
  Award,
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Code2: Code2,
  Cpu: Cpu,
  Layout: Layout,
  Paintbrush: Paintbrush,
  Globe: Globe,
};

export const ModuleList: React.FC = () => {
  const { progress, setActiveLessonId } = useApp();

  // If a specific lesson is selected, display the full interactive LessonView
  const allLessons = modulesData.flatMap((m) => m.lessons);
  const selectedLesson = allLessons.find((l) => l.id === progress.activeLessonId);

  if (selectedLesson) {
    return (
      <LessonView
        lesson={selectedLesson}
        onBackToModules={() => setActiveLessonId(null)}
      />
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-500/20">
              Complete Placement Curriculum
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Itransition Front-end Modules
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            5 intensive structured modules covering JavaScript mechanics, algorithms, HTML semantics, CSS layouts, and web concepts.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono">
          <div>
            <span className="text-slate-500 block text-[10px]">Total Progress:</span>
            <span className="text-base font-bold text-brand-600 dark:text-brand-400">
              {progress.completedLessons.length} / {allLessons.length}
            </span>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-brand-500/30 flex items-center justify-center font-bold text-brand-500">
            {Math.round((progress.completedLessons.length / allLessons.length) * 100)}%
          </div>
        </div>
      </div>

      {/* Modules Loop */}
      <div className="space-y-6">
        {modulesData.map((module, mIdx) => {
          const Icon = iconMap[module.iconName] || BookOpen;
          const completedCount = module.lessons.filter((l) =>
            progress.completedLessons.includes(l.id)
          ).length;
          const modulePercentage = Math.round(
            (completedCount / module.lessons.length) * 100
          );

          return (
            <div
              key={module.id}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
            >
              {/* Module Header Bar */}
              <div className="p-5 sm:p-6 bg-slate-50/70 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono font-bold text-brand-600 dark:text-brand-400 uppercase">
                        Module 0{mIdx + 1}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {module.badge}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      {module.title}
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 max-w-2xl leading-relaxed">
                      {module.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Progress Mini Pill */}
                <div className="flex items-center space-x-3 text-xs font-mono shrink-0">
                  <div className="text-right">
                    <span className="text-slate-400 text-[10px] block">
                      {completedCount} of {module.lessons.length} done
                    </span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      ~{module.estimatedHours} hrs study
                    </span>
                  </div>
                  <div className="w-12 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-brand-500 rounded-full"
                      style={{ width: `${modulePercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Lesson Items Grid */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {module.lessons.map((lesson, lIdx) => {
                  const isDone = progress.completedLessons.includes(lesson.id);
                  const quizScore = progress.lessonQuizScores[lesson.id];

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => setActiveLessonId(lesson.id)}
                      className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-950/40 transition cursor-pointer group"
                    >
                      <div className="flex items-center space-x-3.5">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-mono font-bold transition ${
                            isDone
                              ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-4 h-4" /> : lIdx + 1}
                        </div>

                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-brand-500 transition">
                              {lesson.title}
                            </h3>
                            {lesson.importance === 'Critical for Placement Test' && (
                              <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                                High Exam Priority
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                            {lesson.summary}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        {quizScore !== undefined && (
                          <span className="hidden sm:inline-block text-xs font-mono font-bold px-2 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-300">
                            Quiz: {quizScore}%
                          </span>
                        )}

                        <span className="text-xs text-slate-400 font-mono hidden md:inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {lesson.durationMinutes}m
                        </span>

                        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-brand-500 group-hover:bg-brand-500/10 transition">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
