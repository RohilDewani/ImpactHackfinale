import React from 'react';
import { ImpactEntry, ImpactType } from '../types.ts';
// Fixed: Added ChevronRight to the list of imports from lucide-react
import { MessageSquare, ArrowBigUp, ArrowBigDown, MapPin, Users, CheckCircle, Lightbulb, UserPlus, Zap, HelpCircle, ChevronRight } from 'lucide-react';

interface Props {
  entry: ImpactEntry;
  onVote: (id: string, delta: number) => void;
  onClick: (id: string) => void;
  onJoin?: (id: string) => void;
  isJoined?: boolean;
}

const SDG_COLORS = [
  '#E5243B', '#DDA63A', '#4C9F38', '#C5192D', '#FF3A21', 
  '#26BDE2', '#FCC30B', '#A21942', '#FD6925', '#DD1367', 
  '#FD9D24', '#BF8B2E', '#3F7E44', '#0A97D9', '#56C02B', 
  '#00689D', '#19486A'
];

const getSDGColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return SDG_COLORS[Math.abs(hash) % SDG_COLORS.length];
};

const ImpactCard: React.FC<Props> = ({ entry, onVote, onClick, onJoin, isJoined }) => {
  const isProblem = entry.type === ImpactType.PROBLEM;
  const isForum = entry.type === ImpactType.FORUM;
  const sdgColor = getSDGColor(entry.tags[0] || entry.title);

  return (
    <div 
      className="group cursor-pointer"
      onClick={() => onClick(entry.id)}
    >
      <div className="aspect-[4/5] bg-slate-50 rounded-[40px] mb-8 overflow-hidden relative border border-slate-100 transition-all group-hover:shadow-2xl group-hover:shadow-indigo-100 group-hover:-translate-y-2">
        {/* SDG Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 z-10" style={{ backgroundColor: sdgColor }} />

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        {/* Category Tag */}
        <div className="absolute top-8 left-8">
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm border ${
            isProblem ? 'bg-rose-50 text-rose-700 border-rose-100' : 
            isForum ? 'bg-violet-50 text-violet-700 border-violet-100' :
            'bg-emerald-50 text-emerald-700 border-emerald-100'
          }`}>
            {entry.type === ImpactType.FORUM ? 'ADVICE' : entry.type}
          </span>
        </div>

        {/* Engagement Indicator */}
        {isJoined && (
          <div className="absolute top-8 right-8">
            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"></div>
          </div>
        )}

        {/* Vote Counter Badge */}
        <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-xl flex items-center gap-3">
          <button 
            onClick={(e) => { e.stopPropagation(); onVote(entry.id, 1); }}
            className="text-slate-400 hover:text-indigo-600 transition-colors"
          >
            <ArrowBigUp size={20} />
          </button>
          <span className="font-bold text-sm tabular-nums text-slate-900">{entry.votes}</span>
        </div>
      </div>

      <div className="px-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center font-bold text-[8px] text-slate-500 uppercase">{entry.author[0]}</div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">u/{entry.author}</span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{entry.location}</span>
        </div>

        <h3 className="text-3xl font-bold text-slate-900 tracking-tight display mb-4 leading-tight group-hover:text-indigo-600 transition-colors">
          {entry.title}
        </h3>
        
        <p className="text-slate-500 text-base line-clamp-2 font-medium leading-relaxed mb-6">
          {entry.description}
        </p>

        <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <div className="flex items-center gap-2">
             {isForum ? <HelpCircle size={14} /> : <MessageSquare size={14} />}
             <span>{entry.comments.length} {isForum ? 'Logs' : 'Comments'}</span>
          </div>
          {!isProblem && !isForum && !isJoined && (
            <button 
              onClick={(e) => { e.stopPropagation(); onJoin?.(entry.id); }}
              className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
            >
              Join <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImpactCard;
