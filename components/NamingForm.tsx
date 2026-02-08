
import React, { useState } from 'react';
import { UserInput, Gender } from '../types';
import { Beaker, Sparkles, Wand2, Clock, MapPin, Plus } from 'lucide-react';

interface Props {
  onSubmit: (data: UserInput) => void;
  isLoading: boolean;
}

const thaiProvinces = [
  "กรุงเทพมหานคร", "กระบี่", "กาญจนบุรี", "กาฬสินธุ์", "กำแพงเพชร", "ขอนแก่น", "จันทบุรี", "ฉะเชิงเทรา", "ชลบุรี", "ชัยนาท", "ชัยภูมิ", "ชุมพร", "เชียงราย", "เชียงใหม่", "ตรัง", "ตราด", "ตาก", "นครนายก", "นครปฐม", "นครพนม", "นครราชสีมา", "นครศรีธรรมราช", "นครสวรรค์", "นนทบุรี", "นราธิวาส", "น่าน", "บึงกาฬ", "บุรีรัมย์", "ปทุมธานี", "ประจวบคีรีขันธ์", "ปราจีนบุรี", "ปัตตานี", "พระนครศรีอยุธยา", "พะเยา", "พังงา", "พัทลุง", "พิจิตร", "พิษณุโลก", "เพชรบุรี", "เพชรบูรณ์", "แพร่", "ภูเก็ต", "มหาสารคาม", "มุกดาหาร", "แม่ฮ่องสอน", "ยโสธร", "ยะลา", "ร้อยเอ็ด", "ระนอง", "ระยอง", "ราชบุรี", "ลพบุรี", "ลำปาง", "ลำพูน", "เลย", "ศรีสะเกษ", "สกลนคร", "สงขลา", "สตูล", "สมุทรปราการ", "สมุทรสงคราม", "สมุทรสาคร", "สระแก้ว", "สระบุรี", "สิงห์บุรี", "สุโขทัย", "สุพรรณบุรี", "สุราษฎร์ธานี", "สุรินทร์", "หนองคาย", "หนองบัวลำภู", "อ่างทอง", "อำนาจเจริญ", "อุดรธานี", "อุตรดิตถ์", "อุทัยธานี", "อุบลราชธานี"
];

const goalOptions = ["ความมั่งคั่งและร่ำรวย", "ความก้าวหน้าในหน้าที่การงาน", "ความรักและครอบครัวที่อบอุ่น", "สุขภาพร่างกายที่แข็งแรง", "อำนาจ บารมี และความเคารพ", "สติปัญญาและความฉลาดหลักแหลม", "ความสงบสุขในชีวิต"];
const problemOptions = ["การเงินติดขัด เก็บเงินไม่อยู่", "อุปสรรคในการทำงานเยอะ", "ความรักผิดหวังบ่อย", "ปัญหาสุขภาพเรื้อรัง", "ดวงตก รู้สึกโชคร้าย", "คนรอบข้างไม่สนับสนุน", "ขาดความมั่นใจในตัวเอง"];
const styleOptions = [
  { label: "เน้นชื่อเสียง", cat: "Real" }, { label: "โชคลาภ", cat: "Real" }, { label: "ดูผู้ดี", cat: "Real" }, { label: "ไทยดั้งเดิม", cat: "Real" }, { label: "ไทยสมัยใหม่", cat: "Real" },
  { label: "สนุกสนาน", cat: "Nick" }, { label: "มีพลัง", cat: "Nick" }, { label: "น่ารัก", cat: "Nick" }
];

const NamingForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserInput>({
    fullName: '', gender: Gender.MALE, occupation: '', birthDate: '', birthTime: '', isTimeUnknown: false,
    zodiac: '', birthDayOfWeek: 'อาทิตย์', birthPlace: 'กรุงเทพมหานคร',
    lifeGoals: [], urgentProblems: [], nameStyle: []
  });

  const [customFields, setCustomFields] = useState({ goals: '', problems: '', styles: '' });

  const fillExample = () => {
    setFormData({
      fullName: 'วิเศษ รัตนไพศาล', gender: Gender.MALE, occupation: 'นักลงทุน', birthDate: '1992-05-15', birthTime: '08:45', isTimeUnknown: false,
      zodiac: 'วอก', birthDayOfWeek: 'ศุกร์', birthPlace: 'กรุงเทพมหานคร',
      lifeGoals: ['ความมั่งคั่งและร่ำรวย', 'ความก้าวหน้าในหน้าที่การงาน'],
      urgentProblems: ['การเงินติดขัด เก็บเงินไม่อยู่'],
      nameStyle: ['เน้นชื่อเสียง', 'ดูผู้ดี']
    });
  };

  const handleToggle = (field: 'lifeGoals' | 'urgentProblems' | 'nameStyle', value: string) => {
    setFormData(prev => {
      const current = [...prev[field]];
      const index = current.indexOf(value);
      if (index > -1) current.splice(index, 1);
      else current.push(value);
      return { ...prev, [field]: current };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.zodiac) return alert("กรุณาเลือกปีนักษัตร");
    
    // Add custom values if present
    const finalData = { ...formData };
    if (customFields.goals) finalData.lifeGoals.push(customFields.goals);
    if (customFields.problems) finalData.urgentProblems.push(customFields.problems);
    if (customFields.styles) finalData.nameStyle.push(customFields.styles);

    onSubmit(finalData);
  };

  const inputClasses = "w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#d4af37] transition hover:border-gray-500";
  const labelClasses = "block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest flex items-center gap-2";
  const chipClasses = (selected: boolean) => `px-4 py-2 rounded-xl text-[13px] font-medium border transition-all cursor-pointer ${selected ? 'bg-[#d4af37] border-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20' : 'bg-gray-900/50 border-gray-800 text-gray-400 hover:border-gray-600'}`;

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-10 p-10 card-bg rounded-3xl gold-border shadow-2xl">
      <div className="flex justify-end mb-4">
        <button type="button" onClick={fillExample} className="text-xs font-bold text-[#d4af37] border border-[#d4af37]/30 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-[#d4af37]/10">
          <Beaker className="w-3.5 h-3.5" /> เติมข้อมูลตัวอย่าง
        </button>
      </div>

      <div className="text-center space-y-4 mb-14">
        <div className="inline-block p-3 rounded-2xl bg-[#d4af37]/10 mb-2">
          <Wand2 className="w-8 h-8 text-[#d4af37]" />
        </div>
        <h2 className="text-4xl font-playfair font-bold text-white uppercase tracking-tight">ข้อมูลโชคชะตา</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={labelClasses}>ชื่อ-นามสกุล ปัจจุบัน</label>
          <input required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className={inputClasses} placeholder="เช่น นายสมบูรณ์ พูลทรัพย์" />
        </div>
        <div>
          <label className={labelClasses}>เพศ</label>
          <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value as Gender})} className={inputClasses}>
            <option value={Gender.MALE}>ชาย</option>
            <option value={Gender.FEMALE}>หญิง</option>
            <option value={Gender.OTHER}>อื่นๆ</option>
          </select>
        </div>
        <div>
          <label className={labelClasses}>อาชีพ / ตำแหน่งงาน</label>
          <input required value={formData.occupation} onChange={e => setFormData({...formData, occupation: e.target.value})} className={inputClasses} placeholder="เช่น เจ้าของธุรกิจ" />
        </div>
        <div>
          <label className={labelClasses}>วันเกิด (วันตามสัปดาห์)</label>
          <select value={formData.birthDayOfWeek} onChange={e => setFormData({...formData, birthDayOfWeek: e.target.value})} className={inputClasses}>
            {['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธกลางวัน', 'พุธกลางคืน', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'].map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClasses}>วันเดือนปีเกิด</label>
          <input required type="date" value={formData.birthDate} onChange={e => setFormData({...formData, birthDate: e.target.value})} className={inputClasses} />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>เวลาเกิด <Clock className="w-3 h-3" /></label>
          <div className="flex items-center gap-4">
            <input type="time" disabled={formData.isTimeUnknown} value={formData.birthTime} onChange={e => setFormData({...formData, birthTime: e.target.value})} className={`${inputClasses} flex-1`} />
            <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
              <input type="checkbox" checked={formData.isTimeUnknown} onChange={e => setFormData({...formData, isTimeUnknown: e.target.checked})} className="rounded bg-black border-gray-700 text-[#d4af37]" />
              ไม่ทราบเวลาเกิด
            </label>
          </div>
        </div>
        <div>
          <label className={labelClasses}>ปีนักษัตร</label>
          <select required value={formData.zodiac} onChange={e => setFormData({...formData, zodiac: e.target.value})} className={inputClasses}>
            <option value="" disabled>--- เลือกปีนักษัตร ---</option>
            {['ชวด', 'ฉลู', 'ขาล', 'เถาะ', 'มะโรง', 'มะเส็ง', 'มะเมีย', 'มะแม', 'วอก', 'ระกา', 'จอ', 'กุน'].map(z => <option key={z} value={z}>{z}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClasses}>สถานที่เกิด <MapPin className="w-3 h-3" /></label>
          <select value={formData.birthPlace} onChange={e => setFormData({...formData, birthPlace: e.target.value})} className={inputClasses}>
            {thaiProvinces.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-8 pt-6 border-t border-gray-800">
        <div>
          <label className={labelClasses}>เป้าหมายชีวิต (เลือกได้หลายข้อ)</label>
          <div className="flex flex-wrap gap-2.5 mb-3">
            {goalOptions.map(opt => <button type="button" key={opt} onClick={() => handleToggle('lifeGoals', opt)} className={chipClasses(formData.lifeGoals.includes(opt))}>{opt}</button>)}
          </div>
          <div className="flex gap-2 items-center">
            <Plus className="w-4 h-4 text-gray-500" />
            <input value={customFields.goals} onChange={e => setCustomFields({...customFields, goals: e.target.value})} placeholder="ระบุเป้าหมายอื่นๆ..." className="bg-transparent border-b border-gray-700 py-1 text-sm text-gray-300 focus:outline-none focus:border-[#d4af37] flex-1" />
          </div>
        </div>

        <div>
          <label className={labelClasses}>ปัญหาเร่งด่วน (เลือกได้หลายข้อ)</label>
          <div className="flex flex-wrap gap-2.5 mb-3">
            {problemOptions.map(opt => <button type="button" key={opt} onClick={() => handleToggle('urgentProblems', opt)} className={chipClasses(formData.urgentProblems.includes(opt))}>{opt}</button>)}
          </div>
          <div className="flex gap-2 items-center">
            <Plus className="w-4 h-4 text-gray-500" />
            <input value={customFields.problems} onChange={e => setCustomFields({...customFields, problems: e.target.value})} placeholder="ระบุปัญหาอื่นๆ..." className="bg-transparent border-b border-gray-700 py-1 text-sm text-gray-300 focus:outline-none focus:border-[#d4af37] flex-1" />
          </div>
        </div>

        <div>
          <label className={labelClasses}>สไตล์ชื่อที่ต้องการ (เลือกได้หลายข้อ)</label>
          <div className="flex flex-wrap gap-2.5 mb-3">
            {styleOptions.map(opt => <button type="button" key={opt.label} onClick={() => handleToggle('nameStyle', opt.label)} className={chipClasses(formData.nameStyle.includes(opt.label))}>{opt.label}</button>)}
          </div>
          <div className="flex gap-2 items-center">
            <Plus className="w-4 h-4 text-gray-500" />
            <input value={customFields.styles} onChange={e => setCustomFields({...customFields, styles: e.target.value})} placeholder="ระบุสไตล์อื่นๆ..." className="bg-transparent border-b border-gray-700 py-1 text-sm text-gray-300 focus:outline-none focus:border-[#d4af37] flex-1" />
          </div>
        </div>
      </div>

      <button type="submit" disabled={isLoading} className="w-full py-6 gold-bg text-black font-extrabold rounded-2xl text-xl uppercase tracking-widest hover:scale-[1.01] active:scale-95 transition-all shadow-xl disabled:opacity-50">
        {isLoading ? "กำลังคำนวณวงล้อโชคชะตา..." : "วิเคราะห์ชื่อมงคล"}
      </button>
    </form>
  );
};

export default NamingForm;
