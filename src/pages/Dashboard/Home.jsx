import PageMeta from "../../components/common/PageMeta";
import ContinueLearningCard from "../../components/dashboard/ContinueLearningCard";
import StatCard from "../../components/dashboard/StatCard";
import { CheckCircle, Flame, Languages, PenTool, Star } from "lucide-react";
import WordDayCard from "../../components/dashboard/WordDayCard";
import QuickActionCard from "../../components/dashboard/QuickActionCard";

export default function Home() {

  const handleListen = () => {
    // Xử lý sự kiện nghe từ vựng
    console.log("Listening to the word of the day!");
  };

  const handleSave = () => {
    // Xử lý sự kiện lưu từ vựng
    console.log("Word of the day saved to vocabulary!");
  };

  return (
    <>
      <PageMeta
        title="K Bee"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
        <div>
          <h2 className="text-2xl font-black text-text-main dark:text-white tracking-wide mb-2">Annyeong, ready to study?</h2>
          <p className="text-text-muted tracking-wide text-md">You're doing great! You've learned 15 new words this week.</p>
        </div>
        <div className="relative group w-full lg:max-w-sm hidden lg:block">
          <img src="/images/brand/bee.png" alt="Dashboard Hero" className="h-auto rounded-xl max-h-15 object-contain float-end" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <StatCard
          label="Daily Streak"
          value="12 Days"
          icon={Flame}  // 2. Truyền trực tiếp tên Component (Không có dấu nháy "")
          colorTheme="text-orange-100 text-orange-600"
        />

        <StatCard
          label="XP Points"
          value="2,450 XP"
          icon={Star}   // Truyền biến Star
          colorTheme="text-yellow-100 text-yellow-600"
        />

        <StatCard
          label="Completed"
          value="48 Lessons"
          icon={CheckCircle} // Truyền biến CheckCircle
          colorTheme="text-green-100 text-green-600"
        />

      </div>
      {/* Main Grid: Chia 3 cột (Bài học chiếm 2, Từ vựng chiếm 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">

        {/* Cột trái: Bài học đang học */}
        <div className="lg:col-span-2 space-y-6">
          <ContinueLearningCard
            imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuA_UXX0QpCvVPDRV17PDMVQ60_kihWGnuJV7LHh_URmgZV0emlyPPzKvV2d5BSspZzwOyAq3KDOu0noN6CBU6MHJNpDPTduGLyWGlRv0IhocVtFYj4isPav-cbGOJiG7XuE9Bs9uieIrMty5fh75efP5f2apcSP9TPwQMttZ_gioi95QTy4NJLKXKGhFrWvzaTdDseJGEeJZSR6V2IEWD5FjW5l-bAdVpfmjHs5_Fylukfq3p85IdIxWE1i0jk-lhhgK8zGrJ3rh-gg"
            category="Intermediate"
            lessonIndex="Lesson 14"
            title="Grammar: -아/어 보이다"
            description="Master the art of expressing appearances and impressions of things you see."
            progress={65}
            completedExercises={12}
            totalExercises={20}
          />

          {/* 2. KHU VỰC 2 THẺ NHỎ (Mới thêm vào) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Thẻ Daily Flashcards */}
            <QuickActionCard
              title="Daily Flashcards"
              subtitle="24 words ready to review"
              icon={Languages} // Icon đại diện cho dịch/từ vựng
              iconColorClass="text-primary"
              badgeText="Review Due"
              badgeColorClass="text-primary bg-primary/10"
              onClick={() => console.log("Go to Flashcards")}
            />

            {/* Thẻ Writing Practice */}
            <QuickActionCard
              title="Writing Practice"
              subtitle="Sentence structure & particles"
              icon={PenTool} // Icon cây bút
              iconColorClass="text-primary"
              badgeText="In Progress"
              badgeColorClass="text-text-muted bg-soft-tan dark:bg-white/10"
              onClick={() => console.log("Go to Writing")}
            />

          </div>
        </div>

        {/* Cột phải: Từ vựng mỗi ngày */}
        <div className="lg:col-span-1">
          <WordDayCard
            level="Beginner"
            koreanWord="꿀벌"
            romanization="Kkul-beol"
            meaning="Honeybee"
            onListen={handleListen}
            onSave={handleSave}
          />
        </div>

      </div>

    </>
  );
}
