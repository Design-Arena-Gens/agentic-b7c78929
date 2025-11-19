type TonicCardProps = {
  name: string;
  timing: string;
  elements: string[];
  benefits: string[];
};

export function TonicCard({
  name,
  timing,
  elements,
  benefits,
}: TonicCardProps) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-[#3d7c6e]/15 bg-white/85 p-6 shadow-[0_18px_46px_-38px_rgba(24,23,20,0.45)]">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-[#3d7c6e]">
          {timing}
        </p>
        <h3 className="mt-2 font-display text-2xl text-[#1d1c1a]">{name}</h3>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.22em] text-[#caa36a]">
            Ingredients
          </p>
          <ul className="space-y-2 text-sm leading-relaxed text-[#4c4b48]">
            {elements.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#3d7c6e]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.22em] text-[#caa36a]">
            Benefits
          </p>
          <ul className="space-y-2 text-sm leading-relaxed text-[#4c4b48]">
            {benefits.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#caa36a]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
