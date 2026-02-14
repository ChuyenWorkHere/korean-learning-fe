import React from 'react';
import AchievementGallery from '../../components/profile/AchievementGallery';
import AnalyticsOverview from '../../components/profile/AnalyticsOverview';
import DailyStreak from '../../components/profile/DailyStreak';
import ProfileHeader from '../../components/profile/ProfileHeader';


const UserProfilePage = () => {
  return (
    <div className="font-display text-[#1b190d] dark:text-[#f3f1e7]">
      <div className="mx-auto flex flex-col gap-8">
        <ProfileHeader />
        <DailyStreak />
        <AnalyticsOverview />
        <AchievementGallery />
      </div>
    </div>
  );
};

export default UserProfilePage;