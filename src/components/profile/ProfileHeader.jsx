import React from 'react';
import { Award } from 'lucide-react';

const ProfileHeader = () => {
  return (
    <section className="bg-white dark:bg-[#2d2a1a] rounded-xl p-8 shadow-sm border border-[#e7e3cf] dark:border-[#3a3625]">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Avatar & Level */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-primary p-1">
            <div 
              className="w-full h-full rounded-full bg-center bg-cover" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA8bGRVpRr1dU2mE2WR0zv6qU7hGGkO0h9WEOLrhbWMEyReURoKuU6CH2ErVSuPAj9H8eIyEHSKbv_Kle4aiJEcN_edzDWHFivQwNydvDuRNqe3V5Q-lDFnhmxwpFtbBD-ZYVzCOeEU3CMbZS4i9o8JgyxjZ1Nv5nzOn9UCRYngs1q1lsGOwsNrHav_Hi5U5LCWLwreSJzmLQQcTCRCLFASfucTc2IsDrtvfO3PySw5KpaW8Lcqz5EgdhlhnKF4Rzjg9WEfC6iOsGll')" }}
            ></div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-primary text-[#221f10] px-3 py-1 rounded-full text-[10px] font-bold shadow-md">
            LEVEL 5
          </div>
        </div>

        {/* Info & Progress */}
        <div className="flex-1 space-y-4 w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">@kbee_learner</h2>
              <p className="text-[#9a8d4c] font-medium flex items-center gap-1 mt-1">
                <Award className="w-4 h-4" /> Worker Bee
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-[#e7e3cf] dark:border-[#3a3625] rounded-lg text-sm font-medium hover:bg-primary/5 transition-colors">
                Edit Profile
              </button>
              <button className="px-4 py-2 bg-primary text-[#221f10] rounded-lg text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors">
                Share Stats
              </button>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="flex flex-col gap-2 pt-2">
            <div className="flex justify-between items-end">
              <span className="text-xs font-bold opacity-60">XP PROGRESS</span>
              <span className="text-sm font-bold text-primary">1200 / 2000 XP</span>
            </div>
            <div className="w-full h-3 bg-[#e7e3cf] dark:bg-[#3a3625] rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '60%' }}></div>
            </div>
            <p className="text-xs text-[#9a8d4c]">800 XP to reach Level 6: Bumble Bee</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;