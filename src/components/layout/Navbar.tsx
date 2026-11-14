import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, Moon, Sun, Flame, RotateCcw, Menu, X, BookOpen, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileMenu, isMobileMenuOpen }) => {
  const { progress, toggleTheme, reset48HourDeadline, overallProgress } = useApp();

  // 48-hour countdown timer calculation
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number; isExpired: boolean }>({
    hours: 48,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const diff = progress.deadlineTimestamp - now;

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isExpired: true });
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds, isExpired: false });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [progress.deadlineTimestamp]);

  // Format study time (seconds to hh:mm:ss)
  const formatStudyTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand & Mobile Toggle */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-md glow-sm">
              <span className="text-lg tracking-tighter font-mono">PF</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
                  PrepForge
                </span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-500/20">
                  Itransition BD
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Front-end Specialization Placement Portal
              </p>
            </div>
          </div>
        </div>

        {/* Center: Live 48-Hour Exam Countdown */}
        <div className="hidden lg:flex items-center space-x-4 bg-slate-100 dark:bg-slate-800/80 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700/60 shadow-inner">
          <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Clock className={`w-4 h-4 ${timeLeft.hours < 12 ? 'text-rose-500 animate-pulse' : 'text-brand-500'}`} />
            <span>48h Exam Countdown:</span>
          </div>

          <div className="font-mono text-xs font-bold flex items-center space-x-1">
            <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-300 border border-slate-200 dark:border-slate-700 shadow-sm">
              {String(timeLeft.hours).padStart(2, '0')}h
            </span>
            <span className="text-slate-400">:</span>
            <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-300 border border-slate-200 dark:border-slate-700 shadow-sm">
              {String(timeLeft.minutes).padStart(2, '0')}m
            </span>
            <span className="text-slate-400">:</span>
            <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-300 border border-slate-200 dark:border-slate-700 shadow-sm">
              {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </div>

          <button
            onClick={reset48HourDeadline}
            title="Reset 48h Countdown"
            className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Study Timer, Streak & Controls */}
        <div className="flex items-center space-x-3">
          {/* Active study tracker */}
          <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="font-semibold">{formatStudyTime(progress.studyTimeSeconds)}</span>
          </div>

          {/* Learning Streak */}
          <div className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40 text-xs font-semibold">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>Day {progress.streakDays}</span>
          </div>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition"
            aria-label="Toggle Dark/Light Mode"
            title={`Switch to ${progress.theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {progress.theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
