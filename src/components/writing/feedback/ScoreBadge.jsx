import React from 'react'

const ScoreBadge = ({ performanceText, score }) => {
  return (
    <div className="flex items-center gap-4 bg-primary/10 dark:bg-primary/5 border border-primary/20 rounded-xl px-6 py-4">
        <div className="text-right">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">Performance</p>
          <p className="text-xl font-bold text-primary">{performanceText}</p>
        </div>
        <div className="h-12 w-[2px] bg-primary/20"></div>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-primary">{score}</span>
          <span className="text-lg font-medium text-primary/60">/100</span>
        </div>
      </div>
  )
}

export default ScoreBadge