import { useState } from 'react';
import { Header } from '@/app/components/header';
import { BookOpen, Shield, AlertTriangle, Package, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { educationTips, getEducationByLanguage } from '@/app/data/education';

interface EducationScreenProps {
  onBack: () => void;
}

export function EducationScreen({ onBack }: EducationScreenProps) {
  const [language, setLanguage] = useState<'en' | 'lg' | 'ach'>('en');
  const tips = getEducationByLanguage(language);

  const categories = [
    { id: 'spotting', icon: Shield, label: 'Spotting Fakes', color: 'bg-red-500' },
    { id: 'safety', icon: AlertTriangle, label: 'Safety Practices', color: 'bg-orange-500' },
    { id: 'resistance', icon: Package, label: 'Antimicrobial Resistance', color: 'bg-purple-500' },
    { id: 'storage', icon: BookOpen, label: 'Storage', color: 'bg-blue-500' }
  ];

  const languages = [
    { code: 'en' as const, label: 'English', flag: '🇬🇧' },
    { code: 'lg' as const, label: 'Luganda', flag: '🇺🇬' },
    { code: 'ach' as const, label: 'Acholi', flag: '🇺🇬' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <Header title="Tips & Education" onBack={onBack} />

      <div className="p-6 space-y-6">
        {/* Language Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-[#006400]" />
            <h3 className="font-bold text-gray-900">Language / Olulimi / Leb</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`py-3 px-2 rounded-xl font-semibold text-sm transition-all active:scale-95 ${
                  language === lang.code
                    ? 'bg-gradient-to-br from-[#006400] to-[#228B22] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div>{lang.flag}</div>
                <div className="mt-1">{lang.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const count = tips.filter(t => t.category === cat.id).length;
            return (
              <div
                key={cat.id}
                className={`${cat.color} flex-shrink-0 rounded-xl px-4 py-2 text-white flex items-center gap-2 shadow-md`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold text-sm">{cat.label}</span>
                <span className="bg-white/20 rounded-full px-2 py-0.5 text-xs font-bold">{count}</span>
              </div>
            );
          })}
        </div>

        {/* Tips Cards */}
        <div className="space-y-4">
          {tips.map((tip, index) => {
            const category = categories.find(c => c.id === tip.category);
            const Icon = category?.icon || BookOpen;

            return (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-5 border-l-4"
                style={{ borderColor: category?.color.replace('bg-', '#') }}
              >
                <div className="flex items-start gap-4">
                  <div className={`${category?.color} p-3 rounded-xl flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">{tip.title}</h4>
                    <p className="text-gray-700 leading-relaxed">{tip.content}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Resources */}
        <div className="bg-gradient-to-br from-[#006400] to-[#228B22] rounded-2xl p-6 text-white shadow-xl">
          <h3 className="font-bold text-xl mb-3">Need More Help?</h3>
          <p className="mb-4 opacity-90">
            For questions about medicine safety, contact the National Drug Authority (NDA)
          </p>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-sm font-semibold">NDA Toll-Free Hotline</p>
            <p className="text-2xl font-bold mt-1">0800-101-606</p>
          </div>
        </div>
      </div>
    </div>
  );
}
