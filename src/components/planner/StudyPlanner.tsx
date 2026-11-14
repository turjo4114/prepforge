import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { initialStudyTasks } from '../../data/studyPlanData';
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Flame,
  CheckSquare,
} from 'lucide-react';

export const StudyPlanner: React.FC = () => {
  const {
    progress,
    toggleTaskComplete,
    setActiveLessonId,
    day1Progress,
    day2Progress,
    addStudyTime,
  } = useApp();

  const [activeDay, setActiveDay] = useState<1 | 2>(1);

  // Active session stopwatch
  const [stopwatchSeconds, setStopwatchSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  React.useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setStopwatchSeconds((s) => s + 1);
        addStudyTime(1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, addStudyTime]);

  const filteredTasks = initialStudyTasks.filter((t) => t.day === activeDay);

  const formatStopwatch = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-500/20">
              48-Hour Exam Sprint
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Personalized 48-Hour Study Planner
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Designed to turn beginners into confident candidates for the Itransition Front-end Specialization Placement Test in 2 intensive days.
          </p>
        </div>

        {/* Study Session Stopwatch */}
        <div className="flex items-center space-x-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm font-mono">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Active Session</span>
            <span className="text-lg font-black text-brand-600 dark:text-brand-300">
              {formatStopwatch(stopwatchSeconds)}
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition ${
                isTimerRunning
                  ? 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                  : 'bg-brand-500 text-slate-950 font-bold hover:bg-brand-400'
              }`}
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={() => {
                setIsTimerRunning(false);
                setStopwatchSeconds(0);
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-200 bg-slate-100 dark:bg-slate-800 transition"
              title="Reset Stopwatch"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Day 1 vs Day 2 Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Day 1 Tab Card */}
        <div
          onClick={() => setActiveDay(1)}
          className={`p-5 rounded-2xl border cursor-pointer transition relative overflow-hidden ${
            activeDay === 1
              ? 'bg-white dark:bg-slate-900 border-brand-500 shadow-md ring-2 ring-brand-500/20'
              : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-brand-500"></span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                DAY 1: Intensive Foundation
              </h3>
            </div>
            <span className="font-mono text-xs font-bold text-brand-600 dark:text-brand-400">
              {day1Progress}% Complete
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            JavaScript variables, primitives, coercion, operators, conditions, loops, functions, HTML basics &amp; CSS box model.
          </p>
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-brand-500 rounded-full transition-all duration-300"
              style={{ width: `${day1Progress}%` }}
            />
          </div>
        </div>

        {/* Day 2 Tab Card */}
        <div
          onClick={() => setActiveDay(2)}
          className={`p-5 rounded-2xl border cursor-pointer transition relative overflow-hidden ${
            activeDay === 2
              ? 'bg-white dark:bg-slate-900 border-cyan-500 shadow-md ring-2 ring-cyan-500/20'
              : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-cyan-500"></span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                DAY 2: Advanced Logic &amp; Exam Simulation
              </h3>
            </div>
            <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400">
              {day2Progress}% Complete
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Arrays, objects, problem solving algorithms, DOM manipulation, events, web concepts &amp; full 35-question mock test.
          </p>
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-cyan-500 rounded-full transition-all duration-300"
              style={{ width: `${day2Progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Day Tasks Checklist */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-brand-500" />
            <span>Day {activeDay} Schedule ({filteredTasks.length} Study Milestones)</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">
            Click checkboxes to track completion
          </span>
        </div>

        <div className="space-y-4">
          {filteredTasks.map((task) => {
            const isCompleted = !!progress.completedTasks[task.id];

            return (
              <div
                key={task.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-slate-50/80 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/60 opacity-80'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand-500/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex items-start space-x-3.5">
                    <button
                      onClick={() => toggleTaskComplete(task.id)}
                      className="mt-0.5 text-brand-500 hover:text-brand-400 transition shrink-0"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400 hover:text-brand-500" />
                      )}
                    </button>

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {task.timeSlot}
                        </span>
                        <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {task.durationMinutes} mins
                        </span>
                      </div>

                      <h3
                        className={`text-base font-bold ${
                          isCompleted
                            ? 'line-through text-slate-500 dark:text-slate-400'
                            : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {task.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                        {task.description}
                      </p>

                      {/* Key goals */}
                      <div className="pt-2">
                        <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                          {task.keyGoals.map((g, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>
                              <span>{g}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="sm:self-center shrink-0">
                    {task.lessonId && (
                      <button
                        onClick={() => setActiveLessonId(task.lessonId!)}
                        className="w-full sm:w-auto px-4 py-2 rounded-xl bg-brand-500/10 hover:bg-brand-500 text-brand-600 dark:text-brand-300 hover:text-slate-950 font-bold text-xs transition border border-brand-500/30 flex items-center justify-center gap-1.5"
                      >
                        <span>Start Lesson</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
