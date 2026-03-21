import { Flame, Beef, Droplets, Plus, Minus } from 'lucide-react';
import type { DailyLog, MealComponent, MealSelection } from '../../types';

function sumSelection(sel: MealSelection, all: Record<string, MealComponent>) {
  const ids = [sel.protein, sel.carbs, sel.side];
  return ids.reduce(
    (acc, id) => {
      const c = id ? all[id] : null;
      return c
        ? { calories: acc.calories + c.calories, proteinG: acc.proteinG + c.proteinG }
        : acc;
    },
    { calories: 0, proteinG: 0 },
  );
}

interface RingCardProps {
  pct: number;
  color: string;
  trackColor: string;
  icon: React.ReactNode;
  value: string | number;
  goal: string;
  onAdd?: () => void;
  onRemove?: () => void;
}

function RingCard({ pct, color, trackColor, icon, value, goal, onAdd, onRemove }: RingCardProps) {
  const r = 26;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.min(pct, 1));

  return (
    <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center py-3 px-1 gap-1.5">
      <div className="relative flex items-center justify-center" style={{ width: 64, height: 64 }}>
        <svg width="64" height="64" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r={r} fill="none" stroke={trackColor} strokeWidth="5" />
          <circle
            cx="32" cy="32" r={r} fill="none"
            stroke={color} strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center" style={{ color }}>
          {icon}
        </div>
      </div>

      <span className="text-base font-black tabular-nums text-gray-900 leading-none">{value}</span>
      <span className="text-[10px] text-gray-400 font-medium leading-none">{goal}</span>

      {(onAdd || onRemove) && (
        <div className="flex items-center gap-2 mt-0.5">
          <button
            onClick={onRemove}
            className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            aria-label="הסר כוס מים"
          >
            <Minus size={9} />
          </button>
          <button
            onClick={onAdd}
            className="flex items-center justify-center w-5 h-5 rounded-full text-white hover:opacity-80 transition-colors"
            style={{ backgroundColor: color }}
            aria-label="הוסף כוס מים"
          >
            <Plus size={9} />
          </button>
        </div>
      )}
    </div>
  );
}

interface MealSummaryBarProps {
  log: DailyLog;
  allComponents: Record<string, MealComponent>;
  calorieGoal: number;
  proteinGoal: number;
  waterGoal: number;
  onAddWater: () => void;
  onRemoveWater: () => void;
}

export function MealSummaryBar({
  log,
  allComponents,
  calorieGoal,
  proteinGoal,
  waterGoal,
  onAddWater,
  onRemoveWater,
}: MealSummaryBarProps) {
  const empty = { protein: null, carbs: null, side: null };
  const meals = [
    log.breakfast     ?? empty,
    log.morningSnack  ?? empty,
    log.lunch         ?? empty,
    log.afternoonSnack ?? empty,
    log.evening       ?? empty,
  ];
  const totals = meals.reduce(
    (acc, sel) => {
      const s = sumSelection(sel, allComponents);
      return { calories: acc.calories + s.calories, proteinG: acc.proteinG + s.proteinG };
    },
    { calories: 0, proteinG: 0 },
  );

  const calOver = totals.calories > calorieGoal;
  const calWarn = totals.calories > calorieGoal + 200;
  const calColor  = calWarn ? '#ef4444' : calOver ? '#f97316' : '#16a34a';
  const calTrack  = calWarn ? '#fee2e2' : calOver ? '#ffedd5' : '#dcfce7';

  return (
    <div>
      <div className="bg-white border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.07)] px-4 pt-3 pb-4">
        <div className="mx-auto max-w-lg">
          <div className="flex gap-2.5">
            <RingCard
              pct={totals.calories / calorieGoal}
              color={calColor}
              trackColor={calTrack}
              icon={<Flame size={16} />}
              value={totals.calories.toLocaleString()}
              goal={`/ ${calorieGoal.toLocaleString()} קל׳`}
            />
            <RingCard
              pct={log.waterGlasses / waterGoal}
              color="#06b6d4"
              trackColor="#cffafe"
              icon={<Droplets size={16} />}
              value={log.waterGlasses}
              goal={`/ ${waterGoal} כוסות`}
              onAdd={onAddWater}
              onRemove={onRemoveWater}
            />
            <RingCard
              pct={totals.proteinG / proteinGoal}
              color="#10b981"
              trackColor="#d1fae5"
              icon={<Beef size={16} />}
              value={`${totals.proteinG}g`}
              goal={`/ ${proteinGoal}g חלבון`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
