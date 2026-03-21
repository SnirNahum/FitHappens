interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  activeClass?: string;
}

export function Toggle({ checked, onChange, label, activeClass = 'bg-green-500' }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
        checked ? `${activeClass} text-white` : 'bg-gray-100 text-gray-600'
      }`}
    >
      {label}
    </button>
  );
}
