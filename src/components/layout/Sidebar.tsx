import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  GraduationCap,
  AlertTriangle,
  Code2,
  FileText,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { modulesData } from '../../data/modulesData';

interface SidebarProps {
  isMobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileMenuOpen, onCloseMobileMenu }) => {
  const { progress, setActiveTab, overallProgress } = useApp();

  const totalLessons = modulesData.flatMap((m) => m.lessons).length;
  const completedLessons = progress.completedLessons.length;
  const unresolvedMistakes = progress.mistakeVault.filter((m) => !m.mastered).length;

  const navItems = [
    {
      id: 'dashboard' as const,
      label: 'Main Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'modules' as const,
      label: 'Learning Modules',
      icon: BookOpen,
      badge: `${completedLessons}/${totalLessons}`,
    },
    {
      id: 'planner' as const,
      label: '48-Hour Study Plan',
      icon: CalendarDays,
      badge: 'Day 1 & 2',
    },
    {
      id: 'mock-exam' as const,
      label: 'Mock Placement Test',
      icon: GraduationCap,
      badge: '35 Qs / 40m',
      highlight: true,
    },
    {
      id: 'mistakes' as const,
      label: 'Mistake Vault (Revision)',
      icon: AlertTriangle,
      badge: unresolvedMistakes > 0 ? `${unresolvedMistakes} to fix` : null,
      badgeColor: unresolvedMistakes > 0 ? 'bg-rose-500/20 text-rose-400' : undefined,
    },
    {
      id: 'playground' as const,
      label: 'Interactive Playground',
      icon: Code2,
      badge: 'HTML/CSS/JS',
    },
    {
      id: 'cheatsheet' as const,
      label: 'Placement Cheatsheet',
      icon: FileText,
      badge: 'High Yield',
    },
  ];

  const handleNavClick = (tab: typeof progress.activeTab) => {
    setActiveTab(tab);
    onCloseMobileMenu();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={onCloseMobileMenu}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed md:sticky top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out md:translate-x-0 overflow-y-auto ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex flex-col h-full justify-between">
          <div className="space-y-6">
            {/* Candidate Profile Widget */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-brand-500/20 border border-brand-500/40 flex items-center justify-center font-bold text-brand-600 dark:text-brand-300 text-sm">
                  IT
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                    {progress.studentName}
                  </h4>
                  <p className="text-[10px] text-brand-600 dark:text-brand-400 font-medium truncate">
                    Trainee Placement Prep
                  </p>
                </div>
              </div>

              {/* Quick Overall Progress Bar */}
              <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800/80">
                <div className="flex justify-between text-[11px] mb-1 font-medium">
                  <span className="text-slate-500 dark:text-slate-400">Total Preparation</span>
                  <span className="font-mono text-brand-600 dark:text-brand-400 font-bold">{overallProgress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-brand-500 transition-all duration-500 rounded-full"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Navigation links */}
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 px-3 mb-2">
                Navigation
              </p>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = progress.activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                        isActive
                          ? 'bg-brand-500/10 text-brand-600 dark:text-brand-300 font-semibold border-l-4 border-brand-500 pl-2'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <Icon
                          className={`w-4 h-4 transition-colors ${
                            isActive
                              ? 'text-brand-500'
                              : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                            item.badgeColor ||
                            (isActive
                              ? 'bg-brand-500/20 text-brand-600 dark:text-brand-300'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400')
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Bottom Placement Context Banner */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="p-3 rounded-lg bg-gradient-to-br from-brand-950/40 to-slate-900/60 border border-brand-800/30 text-slate-300 text-[11px]">
              <div className="flex items-center gap-1.5 font-bold text-brand-300 mb-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Target: Placement Test</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                Benchmark: 70%+ score to qualify for Itransition Front-end Specialization.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
