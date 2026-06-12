export default function SummaryCard({ title, value, subtitle, trend = 'neutral' }) {
  const valueColor =
    trend === 'positive'
      ? 'text-emerald-400'
      : trend === 'negative'
      ? 'text-red-400'
      : 'text-white';

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
      <p className="text-slate-400 text-sm font-medium mb-2">{title}</p>
      <p className={`text-2xl font-bold ${valueColor} mb-1`}>{value}</p>
      {subtitle && <p className="text-slate-500 text-xs">{subtitle}</p>}
    </div>
  );
}
