
import React, { useState } from 'react';
import { AnalysisResult, NameEntry, UserProfile } from '../types';
import { Search, Heart, Copy, Filter, TrendingUp, Lightbulb, ArrowRight, ShieldCheck, LogIn, User } from 'lucide-react';

interface Props {
  result: AnalysisResult;
  onReset: () => void;
  user: UserProfile | null;
  onLogin: () => void;
  onToggleLike: (name: string) => void;
}

const thaiAlphabet = "กขคฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ".split("");

const ResultView: React.FC<Props> = ({ result, onReset, user, onLogin, onToggleLike }) => {
  const [activeTab, setActiveTab] = useState<'real' | 'nick'>('real');
  const [searchTerm, setSearchTerm] = useState('');
  const [startLetter, setStartLetter] = useState<string | null>(null);

  const namesToDisplay = activeTab === 'real' ? result.realNames : result.nickNames;
  const filteredNames = namesToDisplay.filter(n => {
    const matchesSearch = n.thai.includes(searchTerm) || n.meaning.includes(searchTerm);
    const matchesLetter = startLetter ? n.thai.startsWith(startLetter) : true;
    return matchesSearch && matchesLetter;
  });

  const elementColors: Record<string, string> = {
    'ไม้': 'from-green-600 to-emerald-900', 'ไฟ': 'from-red-600 to-orange-900', 'ดิน': 'from-yellow-600 to-amber-900', 'ทอง': 'from-gray-300 to-slate-700', 'น้ำ': 'from-blue-600 to-indigo-900',
  };

  const handleCopy = (text: string) => navigator.clipboard.writeText(text);

  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-32 px-4">
      {/* Auth Prompt for Saving */}
      {!user && (
        <div className="bg-indigo-900/30 border border-indigo-500/30 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LogIn className="text-indigo-400" />
            <p className="text-indigo-200 text-sm">เข้าสู่ระบบด้วย Google เพื่อบันทึกชื่อมงคลที่คุณชื่นชอบ</p>
          </div>
          <button onClick={onLogin} className="px-6 py-2 bg-white text-indigo-900 font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-indigo-50 transition-colors">
            Login with Google
          </button>
        </div>
      )}

      {user && (
        <div className="bg-gray-900/50 border border-[#d4af37]/20 p-4 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={user.picture} alt="" className="w-10 h-10 rounded-full border border-[#d4af37]/30" />
            <div>
              <p className="text-white text-sm font-bold">{user.name}</p>
              <p className="text-[#d4af37] text-[10px] uppercase font-bold">{user.likedNames.length} ชื่อที่บันทึกไว้</p>
            </div>
          </div>
          <button onClick={onReset} className="text-gray-500 text-xs hover:text-white">ออกจากระบบ</button>
        </div>
      )}

      {/* Summary Section */}
      <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] p-1.5 shadow-2xl overflow-hidden">
        <div className="bg-[#f8f9fc] rounded-[2.3rem] p-10 md:p-14 flex flex-col items-center text-center space-y-10">
          <h2 className="text-3xl font-black text-gray-900">Your Destiny Summary</h2>
          <div className="w-full bg-white rounded-3xl p-10 border border-gray-100 space-y-6">
            <h3 className="text-6xl font-black text-gray-900">{result.currentNameScore}</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Current Name Auspicious Score</p>
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 text-left">
              <p className="text-[15px] text-orange-900 leading-relaxed font-medium italic">
                <span className="font-bold block mb-1 uppercase text-[11px] text-orange-600 not-italic">การวิเคราะห์แบบเจาะลึก:</span>
                {result.currentNameAnalysis}
              </p>
            </div>
          </div>
          <div className="w-full bg-indigo-900 rounded-3xl p-10 text-left text-white space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-xs font-bold text-indigo-300 uppercase tracking-widest">Potential with New Name</p>
              <TrendingUp className="text-indigo-400" />
            </div>
            <h3 className="text-7xl font-black">{result.auspiciousPotential}%</h3>
            <p className="text-indigo-200 text-sm">{result.potentialResult}</p>
          </div>
          <button onClick={() => document.getElementById('names-section')?.scrollIntoView({ behavior: 'smooth' })} className="w-full py-6 bg-indigo-600 text-white font-black rounded-2xl uppercase">ดูรายชื่อมงคล</button>
        </div>
      </div>

      {/* Alphabet and Search Filters */}
      <div id="names-section" className="space-y-8">
        <div className="flex flex-col gap-6 p-8 card-bg rounded-3xl border border-gray-800">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
              <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="ค้นหาตามความหมาย หรือคำอ่าน..." className="w-full bg-black/40 border border-gray-700 rounded-2xl pl-14 pr-6 py-4 text-base focus:ring-2 focus:ring-[#d4af37]/30 transition-all shadow-inner" />
            </div>
            <div className="flex p-1 bg-gray-900 rounded-2xl border border-gray-800">
              <button onClick={() => setActiveTab('real')} className={`px-8 py-3 rounded-xl text-xs font-bold transition ${activeTab === 'real' ? 'bg-[#d4af37] text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}>Real Names</button>
              <button onClick={() => setActiveTab('nick')} className={`px-8 py-3 rounded-xl text-xs font-bold transition ${activeTab === 'nick' ? 'bg-[#d4af37] text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}>Nicknames</button>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] block">ค้นหาตามตัวอักษรนำหน้า</label>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setStartLetter(null)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${!startLetter ? 'bg-[#d4af37] border-[#d4af37] text-black' : 'bg-transparent border-gray-800 text-gray-500'}`}>ทั้งหมด</button>
              {thaiAlphabet.map(l => (
                <button key={l} onClick={() => setStartLetter(l === startLetter ? null : l)} className={`w-8 h-8 rounded-lg text-xs font-bold border transition flex items-center justify-center ${l === startLetter ? 'bg-[#d4af37] border-[#d4af37] text-black' : 'bg-transparent border-gray-800 text-gray-500 hover:border-gray-600'}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Name Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNames.length > 0 ? filteredNames.map((item, idx) => (
            <div key={idx} className="group relative card-bg p-10 rounded-[2.5rem] border border-gray-900 hover:border-[#d4af37]/40 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between shadow-lg">
              <div className="absolute top-6 right-6 flex gap-2">
                <button onClick={() => onToggleLike(item.thai)} className={`p-3 rounded-full transition-all shadow-xl ${user?.likedNames.includes(item.thai) ? 'bg-red-500 text-white' : 'bg-gray-800/80 text-gray-400 hover:text-white'}`}>
                  <Heart className={`w-5 h-5 ${user?.likedNames.includes(item.thai) ? 'fill-white' : ''}`} />
                </button>
                <button onClick={() => handleCopy(item.thai)} className="p-3 bg-gray-800/80 text-gray-400 backdrop-blur rounded-full hover:bg-white hover:text-black transition-all">
                  <Copy className="w-5 h-5" />
                </button>
              </div>
              <div>
                <div className="flex items-baseline gap-4 mb-6">
                  <h4 className="text-4xl font-bold text-white tracking-tighter">{item.thai}</h4>
                  <span className="text-gray-600 text-[10px] font-mono uppercase">{item.english}</span>
                </div>
                <p className="text-gray-400 text-base leading-relaxed mb-10 min-h-[50px]">{item.meaning}</p>
              </div>
              <div className="flex justify-between items-center pt-6 border-t border-gray-800/30">
                <span className="text-[11px] font-black text-gray-600 uppercase tracking-widest">Numerology</span>
                <span className="text-2xl font-black text-[#d4af37] font-mono">{item.numerologySum}</span>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-40 text-center text-gray-600 font-medium">ไม่พบข้อมูลที่ตรงกับเงื่อนไขการค้นหา...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultView;
