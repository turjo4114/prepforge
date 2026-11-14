import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './components/dashboard/Dashboard';
import { ModuleList } from './components/modules/ModuleList';
import { StudyPlanner } from './components/planner/StudyPlanner';
import { MockExam } from './components/exam/MockExam';
import { MistakeVault } from './components/mistakes/MistakeVault';
import { LivePreviewPlayground } from './components/interactive/LivePreviewPlayground';
import { CheatsheetView } from './components/cheatsheet/CheatsheetView';

const MainLayout: React.FC = () => {
  const { progress } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      {/* Top Navigation */}
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Navigation Sidebar */}
        <Sidebar
          isMobileMenuOpen={isMobileMenuOpen}
          onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
        />

        {/* Dynamic Main Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {progress.activeTab === 'dashboard' && <Dashboard />}
          {progress.activeTab === 'modules' && <ModuleList />}
          {progress.activeTab === 'planner' && <StudyPlanner />}
          {progress.activeTab === 'mock-exam' && <MockExam />}
          {progress.activeTab === 'mistakes' && <MistakeVault />}
          {progress.activeTab === 'playground' && <LivePreviewPlayground />}
          {progress.activeTab === 'cheatsheet' && <CheatsheetView />}
        </main>
      </div>

      {/* Global Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">PrepForge</span>
            <span>•</span>
            <span>Itransition Front-end Specialization Placement Prep (Bangladesh)</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="font-mono text-[11px] text-slate-400">
              Practice simulation portal • 48-Hour High-Yield Edition
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
