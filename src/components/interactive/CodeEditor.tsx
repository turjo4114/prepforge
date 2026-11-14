import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle2, XCircle, Lightbulb, Copy, Check, Terminal } from 'lucide-react';

interface CodeEditorProps {
  initialCode: string;
  solutionCode?: string;
  expectedOutput?: string;
  hints?: string[];
  testCases?: {
    name: string;
    expectedOutput: string;
  }[];
  onSuccess?: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  solutionCode,
  expectedOutput,
  hints = [],
  testCases = [],
  onSuccess,
}) => {
  const [code, setCode] = useState(initialCode);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [testResult, setTestResult] = useState<'idle' | 'passed' | 'failed'>('idle');
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [copied, setCopied] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setConsoleOutput([]);
    const logs: string[] = [];

    // Custom console implementation to capture logs safely
    const customConsole = {
      log: (...args: any[]) => {
        const formatted = args
          .map((arg) => {
            if (arg === null) return 'null';
            if (arg === undefined) return 'undefined';
            if (typeof arg === 'object') {
              try {
                return JSON.stringify(arg, null, 2);
              } catch (e) {
                return String(arg);
              }
            }
            return String(arg);
          })
          .join(' ');
        logs.push(formatted);
      },
      error: (...args: any[]) => {
        logs.push('[Error] ' + args.map((a) => String(a)).join(' '));
      },
      warn: (...args: any[]) => {
        logs.push('[Warn] ' + args.map((a) => String(a)).join(' '));
      },
      table: (data: any) => {
        try {
          logs.push(JSON.stringify(data, null, 2));
        } catch {
          logs.push(String(data));
        }
      },
    };

    try {
      // Execute in sandboxed browser Function environment
      const sandboxedFn = new Function('console', code);
      sandboxedFn(customConsole);

      setConsoleOutput(logs);

      // Evaluate test cases / expected output
      const fullOutput = logs.join('\n').trim();

      let passed = true;
      if (expectedOutput) {
        if (!fullOutput.includes(expectedOutput.trim())) {
          passed = false;
        }
      } else if (testCases.length > 0) {
        for (const tc of testCases) {
          if (!fullOutput.includes(tc.expectedOutput.trim())) {
            passed = false;
            break;
          }
        }
      }

      if (logs.length > 0 && passed) {
        setTestResult('passed');
        if (onSuccess) onSuccess();
      } else if (logs.length > 0 && !passed) {
        setTestResult('failed');
      } else {
        setTestResult('idle');
      }
    } catch (err: any) {
      logs.push(`Runtime Error: ${err.message || String(err)}`);
      setConsoleOutput(logs);
      setTestResult('failed');
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setConsoleOutput([]);
    setTestResult('idle');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg my-4">
      {/* Top Header / Actions Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 gap-2">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          </div>
          <span className="text-xs font-mono font-medium text-slate-400 pl-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-brand-400" />
            JavaScript Sandbox Runner
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {hints.length > 0 && (
            <button
              onClick={() => setShowHints(!showHints)}
              className="text-xs text-amber-400 hover:text-amber-300 px-2.5 py-1 rounded-md bg-amber-500/10 hover:bg-amber-500/20 transition-colors flex items-center gap-1"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              {showHints ? 'Hide Hints' : 'Hint'}
            </button>
          )}

          {solutionCode && (
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="text-xs text-indigo-400 hover:text-indigo-300 px-2.5 py-1 rounded-md bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors"
            >
              {showSolution ? 'Hide Solution' : 'View Solution'}
            </button>
          )}

          <button
            onClick={copyCode}
            className="text-xs text-slate-400 hover:text-slate-200 p-1.5 rounded-md hover:bg-slate-800 transition-colors"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={resetCode}
            className="text-xs text-slate-400 hover:text-slate-200 px-2.5 py-1 rounded-md hover:bg-slate-800 transition-colors flex items-center gap-1"
            title="Reset code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>

          <button
            onClick={runCode}
            disabled={isRunning}
            className="text-xs font-semibold px-4 py-1.5 rounded-md bg-brand-500 hover:bg-brand-400 text-slate-950 font-sans shadow transition flex items-center gap-1.5 disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Run Code
          </button>
        </div>
      </div>

      {/* Hints Banner */}
      {showHints && hints.length > 0 && (
        <div className="bg-amber-950/30 border-b border-amber-800/40 px-4 py-2.5 text-xs text-amber-200">
          <p className="font-semibold text-amber-300 mb-1 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5" /> Exercise Hints:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            {hints.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Solution Banner */}
      {showSolution && solutionCode && (
        <div className="bg-indigo-950/40 border-b border-indigo-800/50 p-4 text-xs font-mono text-indigo-200">
          <div className="flex items-center justify-between mb-2">
            <span className="font-sans font-semibold text-indigo-300">Target Solution Code:</span>
            <button
              onClick={() => {
                setCode(solutionCode);
                setShowSolution(false);
              }}
              className="px-2 py-0.5 rounded bg-indigo-600/40 hover:bg-indigo-600/70 text-indigo-100 font-sans transition"
            >
              Insert into Editor
            </button>
          </div>
          <pre className="p-3 bg-slate-950/70 rounded border border-indigo-900/50 overflow-x-auto text-emerald-400">
            {solutionCode}
          </pre>
        </div>
      )}

      {/* Code Textarea Area */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={Math.max(6, Math.min(18, code.split('\n').length + 2))}
          spellCheck={false}
          className="w-full bg-slate-900/90 text-emerald-400 font-mono text-sm p-4 outline-none resize-y border-none leading-relaxed focus:ring-1 focus:ring-brand-500/50"
          placeholder="// Type your JavaScript code here..."
        />
      </div>

      {/* Console Output Terminal */}
      <div className="border-t border-slate-800 bg-slate-950 p-4">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/60 text-xs">
          <div className="flex items-center space-x-2 text-slate-400 font-mono">
            <span>Console Output</span>
            {testResult === 'passed' && (
              <span className="flex items-center gap-1 text-emerald-400 font-medium bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50 font-sans">
                <CheckCircle2 className="w-3.5 h-3.5" /> All Tests Passed!
              </span>
            )}
            {testResult === 'failed' && (
              <span className="flex items-center gap-1 text-rose-400 font-medium bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/50 font-sans">
                <XCircle className="w-3.5 h-3.5" /> Output Mismatch / Error
              </span>
            )}
          </div>
          {consoleOutput.length > 0 && (
            <button
              onClick={() => {
                setConsoleOutput([]);
                setTestResult('idle');
              }}
              className="text-slate-500 hover:text-slate-400 transition"
            >
              Clear
            </button>
          )}
        </div>

        {consoleOutput.length === 0 ? (
          <p className="text-xs font-mono text-slate-600 italic">
            Click "Run Code" to execute script and inspect output...
          </p>
        ) : (
          <pre className="text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
            {consoleOutput.join('\n')}
          </pre>
        )}
      </div>
    </div>
  );
};
