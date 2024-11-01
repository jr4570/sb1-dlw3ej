import React from 'react';
import { Trophy } from 'lucide-react';

export function LotteryHeader() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
        <Trophy className="text-yellow-500" />
        幸運抽獎
      </h1>
      <p className="text-gray-600 mb-8">試試您的運氣！</p>
    </div>
  );
}