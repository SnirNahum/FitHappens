import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import type { MealComponent, MealComponentSet, MealSelection } from '../../types';

type Theme = 'amber' | 'teal' | 'green' | 'orange' | 'purple';

interface ThemeConfig {
  iconBg: string;
  accent: string;
  accentText: string;
  calBg: string;
  calText: string;
  checkBg: string;
  checkBorder: string;
  rowBg: string;
  rowSelected: string;
}

const THEMES: Record<Theme, ThemeConfig> = {
  amber: {
    iconBg:      'bg-amber-100',
    accent:      'bg-amber-500',
    accentText:  'text-amber-600',
    calBg:       'bg-amber-500',
    calText:     'text-white',
    checkBg:     'bg-amber-400',
    checkBorder: 'border-amber-300',
    rowBg:       'bg-amber-50 border-amber-100',
    rowSelected: 'bg-amber-500 border-amber-500 text-white',
  },
  teal: {
    iconBg:      'bg-teal-100',
    accent:      'bg-teal-500',
    accentText:  'text-teal-600',
    calBg:       'bg-teal-500',
    calText:     'text-white',
    checkBg:     'bg-teal-500',
    checkBorder: 'border-teal-300',
    rowBg:       'bg-teal-50 border-teal-100',
    rowSelected: 'bg-teal-500 border-teal-500 text-white',
  },
  green: {
    iconBg:      'bg-green-100',
    accent:      'bg-green-600',
    accentText:  'text-green-700',
    calBg:       'bg-green-600',
    calText:     'text-white',
    checkBg:     'bg-green-500',
    checkBorder: 'border-green-400',
    rowBg:       'bg-green-50 border-green-100',
    rowSelected: 'bg-green-600 border-green-600 text-white',
  },
  orange: {
    iconBg:      'bg-orange-100',
    accent:      'bg-orange-500',
    accentText:  'text-orange-600',
    calBg:       'bg-orange-500',
    calText:     'text-white',
    checkBg:     'bg-orange-400',
    checkBorder: 'border-orange-300',
    rowBg:       'bg-orange-50 border-orange-100',
    rowSelected: 'bg-orange-500 border-orange-500 text-white',
  },
  purple: {
    iconBg:      'bg-purple-100',
    accent:      'bg-purple-600',
    accentText:  'text-purple-700',
    calBg:       'bg-purple-600',
    calText:     'text-white',
    checkBg:     'bg-purple-500',
    checkBorder: 'border-purple-300',
    rowBg:       'bg-purple-50 border-purple-100',
    rowSelected: 'bg-purple-600 border-purple-600 text-white',
  },
};

function sumMacros(
  components: MealComponentSet,
  selection: MealSelection,
): { calories: number; proteinG: number; carbsG: number; fatG: number } {
  const lookup = (id: string | null, list: MealComponent[]) =>
    id ? (list.find((c) => c.id === id) ?? null) : null;
  const p = lookup(selection.protein, components.protein);
  const c = lookup(selection.carbs,   components.carbs);
  const s = lookup(selection.side,    components.side);
  return {
    calories: (p?.calories ?? 0) + (c?.calories ?? 0) + (s?.calories ?? 0),
    proteinG: (p?.proteinG ?? 0) + (c?.proteinG ?? 0) + (s?.proteinG ?? 0),
    carbsG:   (p?.carbsG   ?? 0) + (c?.carbsG   ?? 0) + (s?.carbsG   ?? 0),
    fatG:     (p?.fatG     ?? 0) + (c?.fatG     ?? 0) + (s?.fatG     ?? 0),
  };
}

// ─── Picker modal (bottom sheet) ──────────────────────────────────────────────

interface PickerModalProps {
  title: string;
  emoji: string;
  options: MealComponent[];
  selected: string | null;
  th: ThemeConfig;
  onSelect: (id: string | null) => void;
  onClose: () => void;
}

function PickerModal({ title, emoji, options, selected, th, onSelect, onClose }: PickerModalProps) {
  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Sheet */}
        <motion.div
          className="relative w-full max-w-lg bg-white rounded-t-3xl shadow-2xl overflow-hidden"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        >
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-gray-200" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
            >
              <X size={15} />
            </button>
            <span className="font-bold text-gray-900 text-sm">{emoji} {title}</span>
            <div className="w-8" />
          </div>

          {/* Options */}
          <div className="px-4 py-4 space-y-2 max-h-[60vh] overflow-y-auto">
            {/* Clear option */}
            {selected && (
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => { onSelect(null); onClose(); }}
                className="w-full text-right px-4 py-3 rounded-xl border border-dashed border-gray-300 text-sm text-gray-400 hover:bg-gray-50 transition-colors"
              >
                הסר בחירה ✕
              </motion.button>
            )}
            {options.map((opt) => {
              const isSelected = opt.id === selected;
              return (
                <motion.button
                  key={opt.id}
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { onSelect(opt.id); onClose(); }}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all ${
                    isSelected ? th.rowSelected : 'bg-white border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  <div className={`flex items-center gap-2 text-xs font-medium ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                    <span>{opt.calories} קל׳</span>
                    <span>·</span>
                    <span>{opt.proteinG}g חלבון</span>
                  </div>
                  <span className={`font-semibold text-sm text-right ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                    {opt.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Safe area spacer */}
          <div className="pb-6" />
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

// ─── Component row button ─────────────────────────────────────────────────────

interface ComponentRowProps {
  emoji: string;
  label: string;
  options: MealComponent[];
  selected: string | null;
  th: ThemeConfig;
  onOpen: () => void;
}

function ComponentRow({ emoji, label, options, selected, th, onOpen }: ComponentRowProps) {
  if (options.length === 0) return null;
  const selectedOpt = selected ? options.find((o) => o.id === selected) : null;

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onClick={onOpen}
      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all ${
        selectedOpt ? th.rowBg : 'bg-gray-50 border-gray-100 hover:bg-gray-100'
      }`}
    >
      <ChevronDown size={14} className={selectedOpt ? th.accentText : 'text-gray-400'} />
      <div className="flex items-center gap-2 text-right">
        {selectedOpt ? (
          <span className={`text-sm font-semibold ${th.accentText}`}>{selectedOpt.label}</span>
        ) : (
          <span className="text-sm text-gray-400">בחר {label}...</span>
        )}
        <span className="text-base">{emoji}</span>
      </div>
    </motion.button>
  );
}

// ─── MealSlot ─────────────────────────────────────────────────────────────────

interface MealSlotProps {
  icon: string;
  title: string;
  note?: string;
  theme?: Theme;
  components: MealComponentSet;
  value: MealSelection;
  onChange: (v: MealSelection) => void;
  index?: number;
}

export function MealSlot({
  icon,
  title,
  note,
  theme = 'green',
  components,
  value,
  onChange,
  index = 0,
}: MealSlotProps) {
  const [openPicker, setOpenPicker] = useState<'protein' | 'carbs' | 'side' | null>(null);
  const th = THEMES[theme];
  const sel: MealSelection = value ?? { protein: null, carbs: null, side: null };
  const totals = sumMacros(components, sel);
  const hasAny = !!(sel.protein || sel.carbs || sel.side);

  const pickerConfig = {
    protein: { emoji: '🥩', label: 'חלבון',    options: components.protein, selected: sel.protein, onSelect: (id: string | null) => onChange({ ...sel, protein: id }) },
    carbs:   { emoji: '🌾', label: 'פחמימות',  options: components.carbs,   selected: sel.carbs,   onSelect: (id: string | null) => onChange({ ...sel, carbs: id   }) },
    side:    { emoji: '🥗', label: 'תוספת',    options: components.side,    selected: sel.side,    onSelect: (id: string | null) => onChange({ ...sel, side: id    }) },
  } as const;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <motion.div
            animate={hasAny ? { scale: [1, 1.15, 1] } : { scale: 1 }}
            transition={{ duration: 0.25 }}
            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
              hasAny ? `${th.checkBg} border-transparent` : `bg-white ${th.checkBorder}`
            }`}
          >
            {hasAny && <Check size={11} className="text-white" strokeWidth={3} />}
          </motion.div>

          <div className="flex items-center gap-2.5">
            <span className="font-bold text-sm text-gray-900">{title}</span>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full text-xl shrink-0 ${th.iconBg}`}>
              {icon}
            </div>
          </div>
        </div>

        {/* Note */}
        {note && (
          <p className="text-right text-[10px] text-gray-400 leading-relaxed">{note}</p>
        )}

        {/* Component row buttons */}
        <div className="space-y-2">
          <ComponentRow {...pickerConfig.protein} th={th} onOpen={() => setOpenPicker('protein')} />
          <ComponentRow {...pickerConfig.carbs}   th={th} onOpen={() => setOpenPicker('carbs')} />
          <ComponentRow {...pickerConfig.side}    th={th} onOpen={() => setOpenPicker('side')} />
        </div>

        {/* Totals bar */}
        <AnimatePresence>
          {hasAny && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
                <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                  <span>{totals.proteinG}g חלבון</span>
                  <span className="text-gray-300">·</span>
                  <span>{totals.carbsG}g פחמ׳</span>
                  <span className="text-gray-300">·</span>
                  <span>{totals.fatG}g שומן</span>
                </div>
                <div className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold ${th.calBg} ${th.calText}`}>
                  🔥 {totals.calories}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Picker modal */}
      {openPicker && (
        <PickerModal
          {...pickerConfig[openPicker]}
          th={th}
          onClose={() => setOpenPicker(null)}
        />
      )}
    </>
  );
}
