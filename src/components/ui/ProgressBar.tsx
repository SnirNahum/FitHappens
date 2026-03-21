interface ProgressBarProps {
  value: number;
  max: number;
  variant?: 'green' | 'blue' | 'amber' | 'red';
}

export function ProgressBar({ value, max, variant = 'green' }: ProgressBarProps) {
  const pct = Math.min((value / max) * 100, 100);

  const colorMap: Record<string, string> = {
    green: 'bg-green-500',
    blue: 'bg-blue-400',
    amber: 'bg-amber-400',
    red: 'bg-red-500',
  };

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
      <div
        className={`h-full rounded-full transition-all duration-300 ${colorMap[variant]}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
