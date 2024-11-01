import React from 'react';
import { Gift } from 'lucide-react';

interface LotteryResultProps {
  result: {
    tier: string;
    animation: string;
  } | null;
  tierColors: Record<string, string>;
  tierNames: Record<string, string>;
}

export function LotteryResult({ result, tierColors, tierNames }: LotteryResultProps) {
  if (!result) {
    return (
      <div className="text-center text-gray-400">
        <Gift className="w-16 h-16 mx-auto mb-4" />
        <div className="text-xl">等待抽獎...</div>
      </div>
    );
  }

  return (
    <div className={`text-center transition-all duration-300 ${result.animation}`}>
      <Gift className={`w-16 h-16 mx-auto mb-4 ${tierColors[result.tier]}`} />
      <div className={`text-2xl font-bold mb-2 ${tierColors[result.tier]}`}>
        恭喜獲得
      </div>
      <div className={`text-3xl font-bold ${tierColors[result.tier]}`}>
        {tierNames[result.tier]}
      </div>
    </div>
  );
}