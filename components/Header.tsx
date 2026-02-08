
import React from 'react';

const Header: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center card-bg border-b border-gray-800">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 gold-bg rounded-full flex items-center justify-center text-black font-bold text-xl">
          ม
        </div>
        <h1 className="text-xl font-playfair font-bold gold-gradient tracking-widest uppercase">
          Celestial Oracle
        </h1>
      </div>
      <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400 uppercase tracking-tighter">
        <span className="cursor-pointer hover:text-white transition">ศาสตร์ฮวงจุ้ย</span>
        <span className="cursor-pointer hover:text-white transition">การตั้งชื่อ</span>
        <span className="cursor-pointer hover:text-white transition">เกี่ยวกับเรา</span>
      </div>
      <button className="px-4 py-2 border border-gold-400 gold-gradient text-xs font-bold uppercase tracking-widest rounded">
        พรีเมียม
      </button>
    </nav>
  );
};

export default Header;
