import React, { useState, useEffect } from 'react';
import { LotteryHeader } from './components/LotteryHeader';
import { LotteryResult } from './components/LotteryResult';
import { TierList } from './components/TierList';
import { LanguageToggle } from './components/LanguageToggle';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLogin } from './components/AdminLogin';
import { translations } from './translations';
import { Shield } from 'lucide-react';

type DiscountTier = 'special' | 'gold' | 'silver' | 'bronze' | 'basic';
type Language = 'zh' | 'en';

interface DiscountResult {
  tier: DiscountTier;
  animation: string;
  timestamp?: number;
}

interface TierCount {
  special: number;
  gold: number;
  silver: number;
  bronze: number;
}

function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<DiscountResult | null>(null);
  const [totalPlays, setTotalPlays] = useState(0);
  const [language, setLanguage] = useState<Language>('zh');
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lotteryHistory, setLotteryHistory] = useState<DiscountResult[]>([]);
  const [remainingTiers, setRemainingTiers] = useState<TierCount>({
    special: 1,
    gold: 3,
    silver: 6,
    bronze: 90
  });

  const t = translations[language];
  const discountTiers: DiscountTier[] = ['special', 'gold', 'silver', 'bronze', 'basic'];

  const tierColors = {
    special: 'text-purple-600',
    gold: 'text-yellow-500',
    silver: 'text-gray-400',
    bronze: 'text-amber-700',
    basic: 'text-blue-500'
  };

  const animations = [
    'scale-105 rotate-2 duration-150',
    'scale-105 -rotate-2 duration-150',
    'scale-103 rotate-1 duration-150',
    'scale-103 -rotate-1 duration-150'
  ];

  useEffect(() => {
    if (totalPlays % 500 === 0 && totalPlays > 0) {
      setRemainingTiers({
        special: 1,
        gold: 3,
        silver: 6,
        bronze: 90
      });
    }
  }, [totalPlays]);

  const getRandomTier = () => {
    const totalParticipants = 500;
    
    if (remainingTiers.special > 0) {
      const chance = Math.random() * totalParticipants;
      if (chance < 1) return 'special';
    }
    if (remainingTiers.gold > 0) {
      const chance = Math.random() * totalParticipants;
      if (chance < 3) return 'gold';
    }
    if (remainingTiers.silver > 0) {
      const chance = Math.random() * totalParticipants;
      if (chance < 6) return 'silver';
    }
    if (remainingTiers.bronze > 0) {
      const chance = Math.random() * totalParticipants;
      if (chance < 90) return 'bronze';
    }
    return 'basic';
  };

  const updateTierCount = (tier: DiscountTier) => {
    if (tier === 'basic') return;
    setRemainingTiers(prev => ({
      ...prev,
      [tier]: prev[tier as keyof TierCount] - 1
    }));
  };

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    let counter = 0;
    const finalTier = getRandomTier();
    
    const spinInterval = setInterval(() => {
      const randomTier = discountTiers[Math.floor(Math.random() * discountTiers.length)];
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
      setResult({ tier: randomTier, animation: randomAnimation });
      
      counter++;
      if (counter >= 12) {
        clearInterval(spinInterval);
        setIsSpinning(false);
        const newResult = { 
          tier: finalTier, 
          animation: 'scale-100 duration-500',
          timestamp: Date.now()
        };
        setResult(newResult);
        setLotteryHistory(prev => [newResult, ...prev]);
        setTotalPlays(prev => prev + 1);
        updateTierCount(finalTier);
      }
    }, 80);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowAdmin(false);
  };

  if (showAdmin) {
    if (!isAuthenticated) {
      return (
        <AdminLogin 
          onLogin={() => setIsAuthenticated(true)}
          onBack={() => setShowAdmin(false)}
          t={t}
        />
      );
    }
    return (
      <AdminDashboard
        lotteryHistory={lotteryHistory}
        remainingTiers={remainingTiers}
        t={t}
        tierColors={tierColors}
        onBack={() => setShowAdmin(false)}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setShowAdmin(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
          >
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">{t.admin}</span>
          </button>
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>

        <LotteryHeader t={t} />

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 mb-8">
          <LotteryResult 
            result={result}
            tierColors={tierColors}
            t={t}
          />
        </div>

        <div className="space-y-4">
          <button
            onClick={spin}
            disabled={isSpinning}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${
              isSpinning
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
            }`}
          >
            {isSpinning ? t.spinning : t.startSpin}
          </button>

          <div className="text-sm text-gray-600">
            <TierList t={t} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;