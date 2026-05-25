
import React from 'react';
import { Milestone } from '../types.ts';
import { CheckCircle2, Circle, Clock, Zap, Target } from 'lucide-react';

interface Props {
  milestones: Milestone[];
  onToggle: (milestoneId: string) => void;
}

const MilestoneTracker: React.FC<Props> = ({ milestones, onToggle }) => {
  const completedCount = milestones.filter(m => m.isCompleted).length;
  const progress = milestones.length > 0 ? (completedCount / milestones.length) * 100 : 0;

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
        <div className="space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-indigo-600">Roadmap Progress</span>
          <h4 className="text-5xl font-black text-slate-900 tracking-tighter display">
            {completedCount} OF {milestones.length} <br />
            <span className="text-slate-300">NODES SECURED.</span>
          </h4>
        </div>
        <div className="text-right">
          <span className="text-8xl font-black text-slate-900 tracking-tighter display tabular-nums">{Math.round(progress)}%</span>
        </div>
      </div>
      
      <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden shadow-inner border border-slate-100">
        <div 
          className="bg-indigo-600 h-full transition-all duration-1000 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid gap-6 mt-16">
        {milestones.map((m, idx) => (
          <div 
            key={m.id} 
            className={`flex items-start gap-8 p-10 rounded-[40px] border-2 transition-all group ${
              m.isCompleted 
                ? 'bg-emerald-50 border-emerald-100' 
                : 'bg-white border-slate-100 hover:border-slate-900'
            }`}
          >
            <button 
              onClick={() => onToggle(m.id)}
              className={`mt-1 transition-all transform hover:scale-125 ${
                m.isCompleted ? 'text-emerald-500' : 'text-slate-300 hover:text-slate-900'
              }`}
            >
              {m.isCompleted ? <CheckCircle2 size={32} /> : <Circle size={32} strokeWidth={1.5} />}
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Step {idx + 1}</span>
                {m.isCompleted && <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">Completed</span>}
              </div>
              <p className={`text-2xl font-bold tracking-tight display ${m.isCompleted ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                {m.title}
              </p>
              <p className={`text-lg mt-3 leading-relaxed font-medium ${m.isCompleted ? 'text-slate-400 opacity-60' : 'text-slate-500'}`}>
                {m.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MilestoneTracker;
