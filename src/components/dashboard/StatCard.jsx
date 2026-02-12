import React from 'react';
import PropTypes from 'prop-types'; // Nếu bạn dùng PropTypes
import { TrendingUp } from 'lucide-react';

// 1. Destructuring và đổi tên: 'icon' thành 'Icon' (viết hoa để dùng làm thẻ)
const StatCard = ({ icon: Icon, label, value, colorTheme }) => {
  return (
    <div className="flex min-w-[180px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#e7e3cf] dark:border-[#3d3821] bg-white dark:bg-[#2d2916] shadow-sm">
      <div className="flex items-center gap-2 text-[#9a8d4c]">
        <Icon className={`w-8 h-8 ${colorTheme}`} />
        <p className="text-sm font-medium leading-normal">{label}</p>
      </div>
      <p className="text-[#1b190d] dark:text-white tracking-tight text-3xl font-bold leading-tight">{value}</p>
      <p className="text-[#078814] text-sm font-medium leading-normal flex items-center gap-1">
        <TrendingUp className="w-4 h-4" /> +2% vs last week
      </p>
    </div>
  );
};

// 3. Khai báo PropTypes (Nếu bạn dùng)
StatCard.propTypes = {
  // Lúc này nó không phải .string nữa, mà là .elementType (Component)
  icon: PropTypes.elementType.isRequired,

  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  colorTheme: PropTypes.string,
};

export default StatCard;