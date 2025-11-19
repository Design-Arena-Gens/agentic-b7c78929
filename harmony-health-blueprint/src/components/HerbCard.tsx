type HerbCardProps = {
  name: string;
  signature: string;
  usage: string;
};

export function HerbCard({ name, signature, usage }: HerbCardProps) {
  return (
    <div className="rounded-2xl border border-[#3d7c6e]/12 bg-white/80 p-5 transition hover:border-[#caa36a]/50 hover:bg-white shadow-[0_20px_50px_-44px_rgba(24,23,20,0.55)]">
      <p className="text-xs uppercase tracking-[0.24em] text-[#caa36a]">
        {signature}
      </p>
      <h3 className="mt-2 font-display text-2xl text-[#1d1c1a]">{name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[#4c4b48]">{usage}</p>
    </div>
  );
}
