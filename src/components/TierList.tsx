import React from 'react';
import { Sparkles } from 'lucide-react';

const tiers = [
  { name: '特級折扣', color: 'text-purple-600', limit: '打5折' },
  { name: '黃金折扣', color: 'text-yellow-500', limit: '打6折' },
  { name: '白銀折扣', color: 'text-gray-400', limit: '打7折' },
  { name: '青銅折扣', color: 'text-amber-700', limit: '打8折' },
  { name: '基本折扣', color: 'text-blue-500', limit: '打9折' }
];

export function TierList() {
  return (
    <div className="grid grid-cols-1 gap-2">
      {tiers.map(({ name, color, limit }) => (
        <div key={name} className="flex items-center gap-2">
          <Sparkles className={color} />
          <span>{name}: {limit}</span>
        </div>
      ))}
    </div>
  );
}