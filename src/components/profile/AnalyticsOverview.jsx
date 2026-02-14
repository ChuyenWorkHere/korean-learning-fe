import React from 'react';
import { TrendingUp } from 'lucide-react';

// Tailwind arbitrary clip-path for radar pentagon
const radarClipPath = "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)";

const AnalyticsOverview = () => {
  const weeklyData = [
    { day: 'MON', height: '40%', active: false },
    { day: 'TUE', height: '65%', active: false },
    { day: 'WED', height: '85%', active: true },
    { day: 'THU', height: '30%', active: false },
    { day: 'FRI', height: '50%', active: false },
    { day: 'SAT', height: '45%', active: false },
    { day: 'SUN', height: '20%', active: false },
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Skill Radar Chart */}
      <div className="bg-white dark:bg-[#2d2a1a] rounded-xl p-6 shadow-sm border border-[#e7e3cf] dark:border-[#3a3625]">
        <h3 className="text-lg font-bold mb-6">Skill Analysis</h3>
        <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 border border-dashed border-[#e7e3cf] dark:border-[#3a3625] opacity-50" style={{ clipPath: radarClipPath }}></div>
          <div className="absolute inset-4 border border-dashed border-[#e7e3cf] dark:border-[#3a3625] opacity-50" style={{ clipPath: radarClipPath }}></div>
          <div className="absolute inset-8 border border-dashed border-[#e7e3cf] dark:border-[#3a3625] opacity-50" style={{ clipPath: radarClipPath }}></div>
          
          <div className="w-40 h-40 bg-primary/40 border-2 border-primary flex items-center justify-center" style={{ clipPath: radarClipPath }}>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>
          
          {/* Labels */}
          <span className="absolute top-0 text-[10px] font-bold uppercase">Grammar</span>
          <span className="absolute right-0 top-1/3 text-[10px] font-bold uppercase translate-x-4">Listening</span>
          <span className="absolute bottom-0 right-4 text-[10px] font-bold uppercase translate-y-2">Reading</span>
          <span className="absolute bottom-0 left-4 text-[10px] font-bold uppercase translate-y-2">Speaking</span>
          <span className="absolute left-0 top-1/3 text-[10px] font-bold uppercase -translate-x-4">Writing</span>
        </div>
      </div>

      {/* XP Earned Line/Bar Chart */}
      <div className="bg-white dark:bg-[#2d2a1a] rounded-xl p-6 shadow-sm border border-[#e7e3cf] dark:border-[#3a3625]">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-lg font-bold">XP Earned</h3>
          <div className="flex gap-2">
            <span className="flex items-center gap-1 text-[10px] font-bold text-[#9a8d4c]">
              <span className="w-2 h-2 rounded-full bg-primary"></span> Last 7 Days
            </span>
          </div>
        </div>

        <div className="h-56 w-full flex flex-col justify-end gap-2">
          <div className="flex-1 flex items-end justify-between px-2 gap-4">
            {weeklyData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col justify-end gap-1 group h-full">
                <div 
                  className={`w-full rounded-t-lg transition-all ${item.active ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-primary/20 hover:bg-primary'}`} 
                  style={{ height: item.height }}
                ></div>
                <span className={`text-[10px] font-bold text-center ${item.active ? 'text-primary' : 'opacity-40'}`}>
                  {item.day}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#e7e3cf] dark:border-[#3a3625] flex justify-between">
            <p className="text-xs font-medium">Weekly Total: <span className="font-bold">1,450 XP</span></p>
            <p className="text-xs font-medium text-green-500 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> +12% from last week
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsOverview;