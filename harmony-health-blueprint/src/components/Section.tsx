import { ReactNode } from "react";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  accent?: string;
  children: ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  accent,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className="relative overflow-hidden rounded-[28px] border border-white/40 bg-white/75 p-8 shadow-[0_28px_60px_-36px_rgba(24,23,20,0.45)] backdrop-blur-xl transition hover:shadow-[0_40px_80px_-42px_rgba(24,23,20,0.55)] md:p-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/90 via-white to-[#f4eee3]" />
      <div className="relative space-y-5">
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.28em] text-[#caa36a]">
            {eyebrow}
          </p>
        )}

        <div className="space-y-3">
          <h2 className="font-display text-3xl text-[#1d1c1a] md:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="max-w-2xl text-base leading-relaxed text-[#4c4b48] md:text-lg">
              {description}
            </p>
          )}
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 rounded-[22px] border border-white/70" />
          <div
            className="relative rounded-[22px] border border-[#3d7c6e]/10 bg-white/80 p-6 md:p-8"
            style={{
              boxShadow:
                "inset 0 1px 1px rgba(255,255,255,0.6), 0 25px 60px -50px rgba(24,23,20,0.55)",
            }}
          >
            {accent ? (
              <div className="mb-6 rounded-xl border border-[#3d7c6e]/20 bg-[#3d7c6e]/8 px-4 py-3 text-sm uppercase tracking-[0.32em] text-[#3d7c6e]">
                {accent}
              </div>
            ) : null}
            <div className="space-y-6">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
