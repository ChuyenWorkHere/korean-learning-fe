// src/components/layout/Footer.jsx
import React from 'react';

const AppFooter = () => {
  return (
    <footer className="mt-auto px-10 py-10 border-t border-[#e7e3cf] dark:border-[#3d3821] bg-white dark:bg-[#2d2916]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-6 text-[#9a8d4c] text-sm font-medium">
          <a className="hover:text-primary transition-colors" href="#">Help Center</a>
          <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="hover:text-primary transition-colors" href="#">Terms</a>
        </div>
        <p className="text-[#9a8d4c] text-xs">© 2024 K-Bee Web. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default AppFooter;