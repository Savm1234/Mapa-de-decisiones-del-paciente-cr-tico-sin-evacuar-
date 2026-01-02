
import React, { useState, useRef, useEffect } from 'react';
import { protocolData } from './data';
import { MindMapNode, Severity, Reference } from './types';
import { 
  Activity, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle,
  Play,
  CheckCircle2,
  AlertTriangle,
  Skull,
  Clock,
  BookOpen
} from 'lucide-react';

const SeverityBadge: React.FC<{ severity: Severity }> = ({ severity }) => {
  const colors = {
    low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    medium: 'bg-amber-100 text-amber-700 border-amber-200',
    high: 'bg-orange-100 text-orange-700 border-orange-200',
    critical: 'bg-red-100 text-red-700 border-red-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200'
  };
  
  const labels = {
    low: 'Leve / Preventivo',
    medium: 'Intervención Moderada',
    high: 'Riesgo Elevado',
    critical: 'Crítico / Rescate',
    neutral: 'Central'
  };

  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colors[severity]} uppercase`}>
      {labels[severity]}
    </span>
  );
};

const ReferenceLinks: React.FC<{ references: Reference[] }> = ({ references }) => {
  if (!references || references.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-slate-200/50">
      <div className="w-full flex items-center gap-1 mb-1 text-slate-400">
         <BookOpen className="w-2.5 h-2.5" />
         <span className="text-[8px] font-bold uppercase tracking-wider">Evidencia Bibliográfica (Manual)</span>
      </div>
      {references.map((ref, idx) => (
        <span
          key={idx}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100/50 text-slate-500 text-[9px] font-medium transition-colors border border-slate-200"
        >
          {ref.label}
        </span>
      ))}
    </div>
  );
};

const Timeline: React.FC = () => {
  const steps = [
    { day: '1-2', label: 'Optimización', sev: 'low' },
    { day: '3-4', label: 'Laxantes', sev: 'medium' },
    { day: '5', label: 'Procinéticos', sev: 'high' },
    { day: '6+', label: 'Rescate', sev: 'critical' },
  ];

  return (
    <div className="mt-4 pt-4 border-t border-slate-700/30">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
        <Clock className="w-3 h-3" /> Cronología de Evaluación y Riesgo
      </p>
      <div className="grid grid-cols-4 gap-1">
        {steps.map((step, i) => (
          <div key={i} className="text-center">
            <div className={`
              h-1.5 rounded-full mb-2
              ${step.sev === 'low' ? 'bg-emerald-500' : ''}
              ${step.sev === 'medium' ? 'bg-amber-500' : ''}
              ${step.sev === 'high' ? 'bg-orange-500' : ''}
              ${step.sev === 'critical' ? 'bg-red-500' : ''}
            `} />
            <p className="text-[10px] font-bold leading-none">Día {step.day}</p>
            <p className="text-[8px] font-medium opacity-70 uppercase truncate">{step.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ActionCard: React.FC<{ node: MindMapNode }> = ({ node }) => (
  <div className="mt-3 p-3 bg-white border-l-4 border-blue-500 rounded-r-lg shadow-sm text-left animate-in fade-in slide-in-from-top-2 duration-300">
    <div className="flex items-start gap-2">
      <Play className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
      <div className="w-full">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Qué hacer:</p>
        <p className="text-sm text-slate-800 font-medium leading-snug">{node.action || node.description}</p>
        {node.references && <ReferenceLinks references={node.references} />}
      </div>
    </div>
  </div>
);

const NodeComponent: React.FC<{
  node: MindMapNode;
  expandedPath: string[];
  onToggle: (id: string, depth: number) => void;
  depth: number;
}> = ({ node, expandedPath, onToggle, depth }) => {
  const isExpanded = expandedPath.includes(node.id);
  const isLeaf = !node.children || node.children.length === 0;

  const getSeverityStyles = (severity: Severity, active: boolean) => {
    if (severity === 'neutral') return active ? 'border-slate-800 bg-slate-900 text-white shadow-xl' : 'border-slate-400 bg-white text-slate-700';
    if (severity === 'low') return active ? 'border-emerald-500 bg-emerald-500 text-white shadow-lg' : 'border-emerald-200 bg-emerald-50 text-emerald-800';
    if (severity === 'medium') return active ? 'border-amber-500 bg-amber-500 text-white shadow-lg' : 'border-amber-100 bg-amber-50 text-amber-800';
    if (severity === 'high') return active ? 'border-orange-500 bg-orange-500 text-white shadow-lg' : 'border-orange-100 bg-orange-50 text-orange-800';
    if (severity === 'critical') return active ? 'border-red-600 bg-red-600 text-white shadow-lg' : 'border-red-100 bg-red-50 text-red-800';
    return '';
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto mb-6">
      <div 
        onClick={() => onToggle(node.id, depth)}
        className={`
          relative w-full p-5 rounded-2xl border-2 transition-all duration-500 cursor-pointer shadow-sm
          ${getSeverityStyles(node.severity, isExpanded)}
          hover:shadow-md transform active:scale-[0.98]
        `}
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1 text-left w-full pr-8">
            <SeverityBadge severity={node.severity} />
            <h3 className={`text-lg font-bold tracking-tight ${node.type === 'central' ? 'text-xl' : ''}`}>
              {node.label}
            </h3>
          </div>
          {!isLeaf && (
            <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} absolute right-5 top-1/2 -translate-y-1/2`}>
              <ChevronDown className="w-6 h-6 opacity-60" />
            </div>
          )}
        </div>

        {isExpanded && node.description && (
          <div className="mt-2 text-sm opacity-90 font-medium italic border-t border-current/20 pt-2 text-left">
            <p>{node.description}</p>
            {!isLeaf && node.references && <ReferenceLinks references={node.references} />}
          </div>
        )}

        {isExpanded && node.id === 'root' && <Timeline />}
        
        {isExpanded && isLeaf && <ActionCard node={node} />}
      </div>

      {isExpanded && node.children && (
        <div className="w-full pl-6 mt-4 space-y-4 border-l-2 border-slate-200 animate-in fade-in slide-in-from-left-4 duration-500">
          {node.children.map(child => (
            <NodeComponent 
              key={child.id} 
              node={child} 
              expandedPath={expandedPath} 
              onToggle={onToggle}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [expandedPath, setExpandedPath] = useState<string[]>(['root']);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleToggle = (id: string, depth: number) => {
    setExpandedPath(prev => {
      if (prev.includes(id)) {
        if (id === 'root' && prev.length === 1) return prev;
        return prev.filter(item => !item.startsWith(id) || item === id ? item !== id : true);
      }
      
      const newPath = [...prev, id];
      if (depth === 1) {
        const mainNodeIds = protocolData.children?.map(c => c.id) || [];
        return prev.filter(p => !mainNodeIds.includes(p) || p === 'root').concat(id);
      }
      return newPath;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-32">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 p-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Activity className="text-teal-600" /> ESTRATEGIA GI - UCI
            </h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Protocolo de Evidencia Clínica</p>
          </div>
          <div className="flex gap-2">
             <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-[8px] font-bold">BASE</span>
             </div>
             <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-[8px] font-bold">FARMA</span>
             </div>
             <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-red-600"></div>
                <span className="text-[8px] font-bold">CRÍTICO</span>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-10" ref={mapRef}>
        <div className="mb-12 text-center">
           <div className="inline-block p-2 bg-blue-50 rounded-lg border border-blue-100 mb-4">
              <p className="text-xs font-bold text-blue-600 uppercase">Scientific Evidence & Manual Search</p>
           </div>
           <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Mapa de Decisiones UCI</h2>
           <p className="text-slate-500 mt-2">La bibliografía mostrada sirve como respaldo científico para búsqueda manual en PubMed/Medline.</p>
        </div>

        <NodeComponent 
          node={protocolData} 
          expandedPath={expandedPath} 
          onToggle={handleToggle}
          depth={0}
        />
      </main>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 z-40">
        <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-2xl flex justify-around items-center border border-white/10">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Prevención</span>
          </div>
          <div className="w-px h-4 bg-white/20"></div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Tratamiento</span>
          </div>
          <div className="w-px h-4 bg-white/20"></div>
          <div className="flex items-center gap-2">
            <Skull className="w-4 h-4 text-red-500" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Rescate Crítico</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
