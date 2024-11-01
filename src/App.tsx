import React, { useState, useEffect } from 'react';
import { LotteryHeader } from './components/LotteryHeader';
import { LotteryResult } from './components/LotteryResult';
import { TierList } from './components/TierList';

type DiscountTier = 'special' | 'gold' | 'silver' | 'bronze' | 'basic';

interface DiscountResult {
  tier: DiscountTier;
  animation: string;
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
  const [remainingTiers, setRemainingTiers] = useState<TierCount>({
    special: 1,
    gold: 2,
    silver: 5,
    bronze: 10
  });

  const discountTiers: DiscountTier[] = ['special', 'gold', 'silver', 'bronze', 'basic'];

  const tierColors = {
    special: 'text-purple-600',
    gold: 'text-yellow-500',
    silver: 'text-gray-400',
    bronze: 'text-amber-700',
    basic: 'text-blue-500'
  };

  const tierNames = {
    special: '特級折扣',
    gold: '黃金折扣',
    silver: '白銀折扣',
    bronze: '青銅折扣',
    basic: '基本折扣'
  };

  const animations = [
    'scale-110 rotate-3',
    'scale-110 -rotate-3',
    'scale-105 rotate-1',
    'scale-105 -rotate-1'
  ];

  useEffect(() => {
    if (totalPlays % 100 === 0 && totalPlays > 0) {
      setRemainingTiers({
        special: 1,
        gold: 2,
        silver: 5,
        bronze: 10
      });
    }
  }, [totalPlays]);

  const getRandomTier = () => {
    if (remainingTiers.special > 0) {
      const chance = Math.random() * 100;
      if (chance < 1) return 'special';
    }
    if (remainingTiers.gold > 0) {
      const chance = Math.random() * 100;
      if (chance < 2) return 'gold';
    }
    if (remainingTiers.silver > 0) {
      const chance = Math.random() * 100;
      if (chance < 5) return 'silver';
    }
    if (remainingTiers.bronze > 0) {
      const chance = Math.random() * 100;
      if (chance < 10) return 'bronze';
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
      if (counter >= 15) {
        clearInterval(spinInterval);
        setIsSpinning(false);
        setResult({ tier: finalTier, animation: 'scale-100' });
        setTotalPlays(prev => prev + 1);
        updateTierCount(finalTier);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <LotteryHeader />

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 mb-8">
          <LotteryResult 
            result={result}
            tierColors={tierColors}
            tierNames={tierNames}
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
            {isSpinning ? '抽獎中...' : '開始抽獎'}
          </button>

          <div className="text-sm text-gray-600">
            <TierList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;