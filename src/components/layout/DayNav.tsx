import { motion } from 'framer-motion';
import { Dumbbell, PartyPopper, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDailyLogStore } from '../../stores/dailyLogStore';

const HEBREW_DAYS = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'];

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDays(iso: string, n: number): string {
  const d = new Date(iso + 'T12:00:00');
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

function getSundayOfWeek(iso: string): string {
  const d = new Date(iso + 'T12:00:00');
  d.setDate(d.getDate() - d.getDay());
  return d.toISOString().slice(0, 10);
}

function getWeekDays(iso: string): string[] {
  const sun = getSundayOfWeek(iso);
  return Array.from({ length: 7 }, (_, i) => addDays(sun, i));
}

interface DayNavProps {
  date: string;
  onDateChange: (date: string) => void;
  isTrainingDay: boolean;
  onTrainingToggle: (v: boolean) => void;
  isCheatDay: boolean;
  onCheatToggle: (v: boolean) => void;
}

export function DayNav({
  date,
  onDateChange,
  isTrainingDay,
  onTrainingToggle,
  isCheatDay,
  onCheatToggle,
}: DayNavProps) {
  const { logs } = useDailyLogStore();
  const today = todayISO();
  const days = getWeekDays(date);
  const sunday = getSundayOfWeek(date);

  const hasAnyLog = (d: string) => {
    const l = logs[d];
    if (!l) return false;
    const filled = (sel: typeof l.breakfast) => !!(sel?.protein || sel?.carbs || sel?.side);
    return filled(l.breakfast) || filled(l.lunch) || filled(l.evening) || filled(l.afternoonSnack);
  };

  return (
    <div className="bg-white border-b border-gray-100 shadow-sm" style={{ fontSize: '14px' }}>

      {/* ── Month label ─────────────────────────────────── */}
      <div className="text-center pt-3 pb-1">
        <span className="text-xs font-semibold text-gray-400 tracking-wide">
          {new Date(sunday + 'T12:00:00').toLocaleDateString('he-IL', { month: 'long', year: 'numeric' })}
        </span>
      </div>

      {/* ── Week strip with prev/next arrows ────────────── */}
      <div className="flex items-center gap-2 px-3 pt-1 pb-2">
        {/* Previous week */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => onDateChange(addDays(sunday, -7))}
          className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 shrink-0 transition-colors"
          aria-label="שבוע קודם"
        >
          <ChevronRight size={15} />
        </motion.button>

        {/* 7 day cards */}
        {days.map((day) => {
          const isSelected = day === date;
          const dayIsToday = day === today;
          const dayNum = new Date(day + 'T12:00:00').getDate();
          const dow = new Date(day + 'T12:00:00').getDay();
          const logged = hasAnyLog(day);
          const isFuture = day > today;
          const dayLog = logs[day];
          const dayIsCheat = !!dayLog?.isCheatDay;
          const dayIsTraining = !!dayLog?.isTrainingDay;

          return (
            <motion.button
              key={day}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDateChange(day)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-3 rounded-2xl relative transition-all ${
                isSelected
                  ? 'bg-green-900 shadow-lg shadow-green-900/30'
                  : 'bg-white shadow-sm border border-gray-100 hover:border-gray-200'
              }`}
            >
              {!isSelected && dayIsCheat && (
                <div className="absolute inset-0 rounded-2xl ring-2 ring-orange-400 ring-inset" />
              )}
              {!isSelected && !dayIsCheat && dayIsTraining && (
                <div className="absolute inset-0 rounded-2xl ring-2 ring-emerald-500 ring-inset" />
              )}
              {dayIsToday && !isSelected && !dayIsCheat && !dayIsTraining && (
                <div className="absolute inset-0 rounded-2xl ring-2 ring-green-400 ring-inset" />
              )}

              <span className={`relative z-10 text-[8px] font-bold tracking-wider uppercase transition-colors ${
                isSelected
                  ? dayIsToday ? 'text-green-400' : 'text-green-500'
                  : dayIsToday ? 'text-green-500' : 'text-gray-400'
              }`}>
                {HEBREW_DAYS[dow]}
              </span>

              <span className={`relative z-10 text-sm font-bold transition-colors ${
                isSelected ? 'text-white' : dayIsToday ? 'text-green-800' : isFuture ? 'text-gray-400' : 'text-gray-700'
              }`}>
                {dayNum}
              </span>

              <div className={`relative z-10 w-1 h-1 rounded-full transition-all duration-300 ${
                logged
                  ? isSelected ? 'bg-green-400 scale-100' : 'bg-green-500 scale-100'
                  : 'bg-transparent scale-0'
              }`} />
            </motion.button>
          );
        })}

        {/* Next week */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => onDateChange(addDays(sunday, 7))}
          className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 shrink-0 transition-colors"
          aria-label="שבוע הבא"
        >
          <ChevronLeft size={15} />
        </motion.button>
      </div>

      {/* ── Toggles - centered ──────────────────────────── */}
      <div className="flex items-center justify-center gap-2 pb-3">
        <motion.button
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={() => onDateChange(today)}
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold transition-all shadow-sm ${
            date === today
              ? 'bg-green-900 text-white shadow-green-900/30'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          היום
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={() => onCheatToggle(!isCheatDay)}
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold transition-all shadow-sm ${
            isCheatDay
              ? 'bg-linear-to-r from-yellow-400 to-orange-400 text-white shadow-yellow-200'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          <PartyPopper size={11} />
          ארוחת צ׳יט
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={() => onTrainingToggle(!isTrainingDay)}
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold transition-all shadow-sm ${
            isTrainingDay
              ? 'bg-linear-to-r from-green-500 to-emerald-500 text-white shadow-green-200'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          <Dumbbell size={11} />
          יום אימון
        </motion.button>
      </div>
    </div>
  );
}
