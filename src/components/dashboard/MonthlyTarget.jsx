import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { ArrowUp, Crosshair, EllipsisVertical, Flame } from "lucide-react";

export default function MonthlyTarget() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className="h-full w-full bg-white dark:bg-white/3 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
      {/* --- Header Card --- */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h5 className="text-lg font-bold text-gray-800 dark:text-white/90">Monthly Target</h5>
          <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">Level: Beginner 2 (Silver)</p>
        </div>

        <div className="relative inline-block">
          {/* Nút 3 chấm menu */}
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors dropdown-toggle" onClick={toggleDropdown}>
            <EllipsisVertical className="h-5 w-5" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              View More
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      {/* --- Phần Biểu đồ (Gauge Chart dùng SVG) --- */}
      <div className="flex flex-col items-center justify-center mb-8 relative">
        <div className="relative w-40 h-40">
          {/* Vòng tròn nền (Màu xám) */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-gray-100 dark:text-white/10"
            />
            {/* Vòng tròn tiến độ (Màu xanh - Giá trị 75%) */}
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={440} // Chu vi hình tròn ~ 2*PI*r
              strokeDashoffset={440 - (440 * 75) / 100} // Công thức: Chu vi - (Chu vi * % / 100)
              strokeLinecap="round"
              className="text-blue-600"
            />
          </svg>

          {/* Số liệu ở giữa vòng tròn */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-800 dark:text-white/90">75%</span>
            <span className="text-xs font-medium text-green-500 bg-green-50 px-2 py-0.5 rounded-full mt-1">
              +10%
            </span>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4 px-2 dark:text-white/90">
          You earned <span className="font-bold text-gray-800 dark:text-white/90">2,400 XP</span>
          <br />Get 600 XP more to reach Gold!
        </p>
      </div>

      {/* --- Phần Thống kê chi tiết (Grid 3 cột) --- */}
      <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">

        {/* Cột 1: Mục tiêu */}
        <div className="text-center border-r border-gray-100 last:border-0">
          <p className="text-xs text-gray-400 dark:text-gray-400 mb-1">Target</p>
          <h6 className="text-sm font-bold text-gray-800 dark:text-white/90">3K XP</h6>
          <div className="flex items-center justify-center gap-1 mt-1">
            {/* Icon Flag màu vàng */}
            <Crosshair className="h-4 w-4 text-yellow-500" />
            <span className="text-[12px] text-gray-500 dark:text-gray-400">Target</span>
          </div>
        </div>

        {/* Cột 2: Đã đạt được */}
        <div className="text-center border-r border-gray-100 last:border-0">
          <p className="text-xs text-gray-400 dark:text-gray-400 mb-1">Achieved</p>
          <h6 className="text-sm font-bold text-green-600">2.4K</h6>
          <div className="flex items-center justify-center gap-1 mt-1">
            {/* Icon mũi tên lên */}
            <ArrowUp className="h-4 w-4 text-green-500" />
            <span className="text-[12px] text-gray-500 dark:text-gray-400">Good</span>
          </div>
        </div>

        {/* Cột 3: Hôm nay */}
        <div className="text-center">
          <p className="text-xs text-gray-400 dark:text-gray-400 mb-1">Today</p>
          <h6 className="text-sm font-bold text-blue-600">+150</h6>
          <div className="flex items-center justify-center gap-1 mt-1">
            {/* Icon lửa (Streak) */}
            <Flame className="h-4 w-4 text-red-500" />
            <span className="text-[12px] text-gray-500 dark:text-gray-400">Streak</span>
          </div>
        </div>

      </div>
    </div>
  );
}
