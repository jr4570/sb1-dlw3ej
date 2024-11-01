import React from 'react';
import { Users, Gift } from 'lucide-react';

interface CounterDisplayProps {
  totalPlays: number;
  remainingTiers: {
    special: number;
    gold: number;
    silver: number;
    bronze: number;
  };
}

export function CounterDisplay({ totalPlays, remainingTiers }: CounterDisplayProps) {
  const currentCycle = Math.floor(totalPlays / 100) + 1;
  const remainingInCycle = 100 - (totalPlays % 100);

  return (
    <div className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="text-purple-600" />
          <span className="text-sm text-gray-600">第 {currentCycle} 輪</span>
        </div>
        <div className="flex items-center gap-2">
          <Gift className="text-blue-600" />
          <span className="text-sm text-gray-600">剩餘 {remainingInCycle} 次</span>
        </div>
      </div>
    </div>
  );
}