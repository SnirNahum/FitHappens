import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import t from '../../locales/he.json';

interface VeggieCheckProps {
  checked: boolean;
  onChange: (v: boolean) => void;
}

export function VeggieCheck({ checked, onChange }: VeggieCheckProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-right"
    >
      <div className="flex items-center justify-between">
        {/* Checkbox */}
        <motion.div
          animate={checked ? { scale: [1, 1.15, 1] } : { scale: 1 }}
          transition={{ duration: 0.25 }}
          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
            checked ? 'bg-green-500 border-transparent' : 'bg-white border-green-300'
          }`}
        >
          {checked && <Check size={11} className="text-white" strokeWidth={3} />}
        </motion.div>

        {/* Icon + title */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="font-bold text-sm text-gray-900 leading-tight">{t.meals.ateVeggies}</div>
            <div className="text-[11px] text-gray-400 mt-0.5">{t.meals.veggieReminder}</div>
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-xl shrink-0">
            🥦
          </div>
        </div>
      </div>
    </button>
  );
}
