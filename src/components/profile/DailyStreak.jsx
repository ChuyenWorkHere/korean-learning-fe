import React from 'react';
import { Sprout, Check, ShoppingBag, BookOpen, Sun, Mic, Zap } from 'lucide-react';

const DailyStreak = () => {
  const weekDays = [
    { day: 'SUN', status: 'checked' },
    { day: 'MON', status: 'checked' },
    { day: 'TUE', status: 'checked' },
    { day: 'WED', status: 'current' },
    { day: 'THU', status: 'upcoming' },
    { day: 'FRI', status: 'upcoming' },
    { day: 'SAT', status: 'upcoming' },
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Streak Tracker */}
      <div className="lg:col-span-2 bg-white dark:bg-[#2d2a1a] rounded-xl p-6 shadow-sm border border-[#e7e3cf] dark:border-[#3a3625] flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">Daily Streak</h3>
            <p className="text-sm text-[#9a8d4c]">You've been busy! 15 days in a row.</p>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <Sprout className="w-8 h-8" />
            <span className="text-2xl font-bold">15</span>
          </div>
        </div>

        <div className="flex justify-between items-center bg-background-light dark:bg-[#221f10]/30 p-6 rounded-xl overflow-x-auto gap-4">
          {weekDays.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2 min-w-[40px]">
              <span className={`text-[10px] font-bold ${item.status === 'current' ? 'text-primary' : 'opacity-50'}`}>
                {item.day}
              </span>
              {item.status === 'checked' && (
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary text-primary">
                  <Check className="w-5 h-5" />
                </div>
              )}
              {item.status === 'current' && (
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 text-[#221f10]">
                  <ShoppingBag className="w-6 h-6" />
                </div>
              )}
              {item.status === 'upcoming' && (
                <div className="w-10 h-10 rounded-full bg-[#e7e3cf] dark:bg-[#3a3625] flex items-center justify-center"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Top Badges */}
      <div className="bg-white dark:bg-[#2d2a1a] rounded-xl p-6 shadow-sm border border-[#e7e3cf] dark:border-[#3a3625] flex flex-col gap-4">
        <h3 className="text-sm font-bold uppercase tracking-wider opacity-60">Top Badges</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center text-center gap-2 p-2 rounded-lg hover:bg-primary/5 transition-colors">
            <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center border-2 border-primary/50 text-primary">
              <BookOpen className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-bold">Grammar Master</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2 p-2 rounded-lg hover:bg-orange-500/5 transition-colors">
            <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center border-2 border-orange-400/50 text-orange-500">
              <Sun className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-bold">Early Bird</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2 p-2 rounded-lg hover:bg-blue-500/5 transition-colors">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center border-2 border-blue-400/50 text-blue-500">
              <Mic className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-bold">Clear Voice</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2 p-2 rounded-lg hover:bg-green-500/5 transition-colors">
            <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center border-2 border-green-400/50 text-green-500">
              <Zap className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-bold">Fast Learner</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyStreak;