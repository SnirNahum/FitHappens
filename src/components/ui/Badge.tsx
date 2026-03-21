interface BadgeProps {
  label: string;
  value: string | number;
}

export function Badge({ label, value }: BadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
      <span className="font-medium">{value}</span>
      <span className="text-green-600">{label}</span>
    </span>
  );
}
