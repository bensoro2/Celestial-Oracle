
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NamingForm from './components/NamingForm';
import ResultView from './components/ResultView';
import { generateAuspiciousNames } from './services/gemini';
import { UserInput, AnalysisResult, UserProfile } from './types';
import { Loader2, Sparkles, ScrollText, Compass } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);

  const handleCalculate = async (input: UserInput) => {
    setLoading(true);
    try {
      const data = await generateAuspiciousNames(input);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการคำนวณ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  const simulateLogin = () => {
    // Simulating a Google login
    setUser({
      name: "User Example",
      email: "user@example.com",
      picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky",
      likedNames: []
    });
  };

  const handleToggleLike = (name: string) => {
    if (!user) {
      alert("กรุณาเข้าสู่ระบบเพื่อบันทึกชื่อที่คุณชื่นชอบ");
      return;
    }
    setUser(prev => {
      if (!prev) return null;
      const current = [...prev.likedNames];
      const index = current.indexOf(name);
      if (index > -1) current.splice(index, 1);
      else current.push(name);
      return { ...prev, likedNames: current };
    });
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      <Header />
      <main className="pt-28 px-6">
        {!result && !loading && (
          <section className="max-w-4xl mx-auto mb-20 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4af37]/10 rounded-full gold-gradient border border-[#d4af37]/20 text-xs font-bold uppercase tracking-[0.2em]">
              <Sparkles className="w-3 h-3" /> พลิกชะตาผ่านพจนาแห่งสวรรค์
            </div>
            <h1 className="text-5xl md:text-7xl font-playfair font-bold leading-tight">
              Auspicious <span className="gold-gradient">Names</span> <br /> 
              for a Prosperous Future
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              ศาสตร์การตั้งชื่อชั้นสูงวิเคราะห์ตามหลัก "โป๊ยยี่สีเถียว" และอักษรศาสตร์มงคล
            </p>
          </section>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 space-y-8 text-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full gold-bg opacity-20"></div>
              <Loader2 className="w-16 h-16 text-[#d4af37] animate-spin relative z-10" />
            </div>
            <h3 className="text-xl font-bold tracking-widest uppercase">กำลังวิเคราะห์เส้นทางแห่งดวงดาว...</h3>
          </div>
        ) : result ? (
          <ResultView 
            result={result} 
            onReset={() => setResult(null)} 
            user={user} 
            onLogin={simulateLogin}
            onToggleLike={handleToggleLike}
          />
        ) : (
          <NamingForm onSubmit={handleCalculate} isLoading={loading} />
        )}
      </main>
      <footer className="mt-20 border-t border-gray-900 py-12 text-center text-gray-600 text-xs">
        <p>© 2024 Celestial Oracle - สงวนลิขสิทธิ์ความมงคล</p>
      </footer>
    </div>
  );
};

export default App;
