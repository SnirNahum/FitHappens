import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface SelectOption {
  id: string;
  label: string;
}

interface SelectProps {
  value: string | null;
  onChange: (id: string | null) => void;
  options: SelectOption[];
  placeholder: string;
  nullLabel?: string;
  theme?: 'green' | 'amber' | 'teal' | 'orange' | 'purple';
}

const THEMES = {
  green:  { border: 'border-green-200',  ring: 'focus:ring-green-300',  hover: 'hover:bg-green-50',  active: 'bg-green-50 text-green-700',  check: 'text-green-500',  open: 'border-green-400', trigger: 'hover:border-green-300'  },
  amber:  { border: 'border-amber-200',  ring: 'focus:ring-amber-300',  hover: 'hover:bg-amber-50',  active: 'bg-amber-50 text-amber-700',  check: 'text-amber-500',  open: 'border-amber-400', trigger: 'hover:border-amber-300'  },
  teal:   { border: 'border-teal-200',   ring: 'focus:ring-teal-300',   hover: 'hover:bg-teal-50',   active: 'bg-teal-50 text-teal-700',   check: 'text-teal-500',   open: 'border-teal-400',  trigger: 'hover:border-teal-300'   },
  orange: { border: 'border-orange-200', ring: 'focus:ring-orange-300', hover: 'hover:bg-orange-50', active: 'bg-orange-50 text-orange-700', check: 'text-orange-500', open: 'border-orange-400', trigger: 'hover:border-orange-300' },
  purple: { border: 'border-purple-200', ring: 'focus:ring-purple-300', hover: 'hover:bg-purple-50', active: 'bg-purple-50 text-purple-700', check: 'text-purple-500', open: 'border-purple-400', trigger: 'hover:border-purple-300' },
};

export function Select({ value, onChange, options, placeholder, nullLabel, theme = 'green' }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = THEMES[theme];

  const selected = options.find((o) => o.id === value) ?? null;

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (dropdownRef.current?.contains(target)) return;
      close();
    }
    function onScroll(e: Event) {
      if (dropdownRef.current?.contains(e.target as Node)) return;
      close();
    }
    document.addEventListener('mousedown', onOutside);
    window.addEventListener('scroll', onScroll, true);
    return () => {
      document.removeEventListener('mousedown', onOutside);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [open, close]);

  // Recompute position on window resize
  useEffect(() => {
    if (!open) return;
    function onResize() {
      if (triggerRef.current) setRect(triggerRef.current.getBoundingClientRect());
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [open]);

  const handleToggle = () => {
    if (!open && triggerRef.current) {
      setRect(triggerRef.current.getBoundingClientRect());
    }
    setOpen((o) => !o);
  };

  const handleSelect = (id: string | null) => {
    onChange(id);
    close();
  };

  const dropdownStyle: React.CSSProperties = rect
    ? {
        position: 'fixed',
        top: rect.bottom + 6,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      }
    : {};

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        className={`w-full flex items-center justify-between gap-2 rounded-xl border bg-white px-4 py-3 shadow-sm transition-all focus:outline-none focus:ring-2 ${t.ring} ${open ? t.open : t.border} ${t.trigger} hover:shadow-md`}
      >
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="text-gray-400 shrink-0" />
        </motion.div>
        <span className={`text-sm flex-1 text-right leading-snug ${selected ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
          {selected ? selected.label : (nullLabel ?? placeholder)}
        </span>
      </button>

      {open && createPortal(
        <AnimatePresence>
          <motion.div
            ref={dropdownRef}
            key="dropdown"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={dropdownStyle}
            className="max-h-72 overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-2xl dropdown-scroll"
          >
            <button
              type="button"
              onClick={() => handleSelect(null)}
              className="w-full px-4 py-3 text-right text-sm text-gray-400 hover:bg-gray-50 border-b border-gray-100 transition-colors"
            >
              {nullLabel ?? placeholder}
            </button>
            {options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelect(opt.id)}
                className={`w-full flex items-center gap-2 px-4 py-3 text-right text-sm transition-colors ${
                  opt.id === value ? t.active + ' font-semibold' : 'text-gray-700 ' + t.hover
                }`}
              >
                <div className="shrink-0 w-4">
                  {opt.id === value && <Check size={14} className={t.check} />}
                </div>
                <span className="flex-1 leading-snug">{opt.label}</span>
              </button>
            ))}
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
