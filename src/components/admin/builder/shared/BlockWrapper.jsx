import React from 'react';
import BlockControls from './BlockControls';

const BlockWrapper = ({ 
  index, 
  totalBlocks, 
  icon: Icon, 
  title, 
  children, 
  extraHeaderActions, // Dùng để truyền thêm các nút đặc biệt vào Header (như toggle AI)
  onMoveUp, 
  onMoveDown, 
  onDelete 
}) => {
  return (
    <section className="max-w-4xl mx-auto bg-white dark:bg-[#2d2916] rounded-xl shadow-sm border border-[#eecd2b]/10 relative group/block">
      {/* Header của Block */}
      <div className="p-6 border-b border-[#eecd2b]/5 flex justify-between items-center bg-[#eecd2b]/5">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5 text-[#eecd2b]" />}
          <h3 className="font-bold">0{index + 1}. {title}</h3>
        </div>
        
        <div className="flex items-center gap-6">
          {extraHeaderActions && (
            <div className="flex items-center gap-2">
              {extraHeaderActions}
            </div>
          )}
          <BlockControls 
            index={index} 
            totalBlocks={totalBlocks} 
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            onDelete={onDelete}
          />
        </div>
      </div>
      
      {/* Phần ruột (Content) đặc thù của từng Block sẽ được render ở đây */}
      {children}
    </section>
  );
};

export default BlockWrapper;