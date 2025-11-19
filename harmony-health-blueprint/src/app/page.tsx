import { AudioBundle } from "@/components/AudioBundle";
import { DownloadPdfButton } from "@/components/DownloadPdfButton";
import { HerbCard } from "@/components/HerbCard";
import { Hero } from "@/components/Hero";
import { JournalPrompts } from "@/components/JournalPrompts";
import { ProgressTracker } from "@/components/ProgressTracker";
import { Section } from "@/components/Section";
import { TonicCard } from "@/components/TonicCard";
import { WeeklyPlanner } from "@/components/WeeklyPlanner";
import {
  harmonyPillars,
  herbs,
  miniPlan,
  relaxationPractices,
  tonics,
} from "@/data/content";

export default function Home() {
  return (
    <div className="grid-luxury min-h-screen">
      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 md:gap-16 md:px-10 md:py-20 lg:py-24">
        <Hero />

        <Section
          id="download"
          eyebrow="Minimalist PDF"
          title="Your compact, screen-optimized reference"
          description="Download the Harmony Health Blueprint as a restrained, luxury-styled PDF. Includes the ritual map, guided relaxation scripts, signature tonics, herbal highlights, movement micro-practices, and printable planner spreads."
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <ul className="grid gap-3 text-sm text-[#4c4b48] md:max-w-2xl md:text-base">
              <li className="flex items-start gap-3">
                <span className="mt-[6px] h-2 w-2 rounded-full bg-[#3d7c6e]" />
                <span>Designed in calming neutrals with generous white space for on-screen reading.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-[6px] h-2 w-2 rounded-full bg-[#3d7c6e]" />
                <span>Print-ready planner and shopping checklist on separate pages for effortless use.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-[6px] h-2 w-2 rounded-full bg-[#3d7c6e]" />
                <span>Optional audio bundle download instructions embedded for deeper relaxation.</span>
              </li>
            </ul>
            <DownloadPdfButton />
          </div>
        </Section>

        <Section
          eyebrow="Harmony pillars"
          title="Align brain, heart, body, and beauty"
          description="Anchor your day with practices that fit into elegant micro-moments. Start with the ritual, hydrate with intention, and punctuate the hours with movement and breath recalibrations."
        >
          <div className="grid gap-6 md:grid-cols-3">
            {harmonyPillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-2xl border border-[#3d7c6e]/12 bg-white/85 p-6 shadow-[0_24px_60px_-50px_rgba(24,23,20,0.55)]"
              >
                <h3 className="font-display text-2xl text-[#1d1c1a]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4c4b48]">
                  {pillar.description}
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#4c4b48]">
                  {pillar.steps.map((step) => (
                    <li key={step} className="flex items-start gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#caa36a]" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Guided relaxation program"
          title="Concise audio journeys for daybreak and twilight"
          description="Micro-scripts paired with minimalist soundscapes help you shift state quickly. Use headphones for a cocooned experience or play softly into your space."
        >
          <AudioBundle />
        </Section>

        <Section
          eyebrow="Three signature tonics"
          title="Quick recipes with deep nourishment"
          description="Prep ingredients once, mix in seconds, and sip your way into sustained glow. Each tonic layers minerals, phytonutrients, and adaptogenic support."
        >
          <div className="grid gap-6 md:grid-cols-3">
            {tonics.map((tonic) => (
              <TonicCard key={tonic.name} {...tonic} />
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Herbal core six"
          title="Targeted botanical allies"
          description="These six herbs cover calm, radiance, mineral density, stamina, and hormonal balance. Rotate based on the rhythms of your week."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {herbs.map((herb) => (
              <HerbCard key={herb.name} {...herb} />
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Relaxation scripts"
          title="Daily and evening practices at a glance"
          description="Keep the flows in mind with succinct scripts you can read directly from your device or print as cards."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {relaxationPractices.map((practice) => (
              <div
                key={practice.name}
                className="rounded-2xl border border-[#3d7c6e]/12 bg-white/85 p-6 shadow-[0_18px_50px_-44px_rgba(24,23,20,0.55)]"
              >
                <h3 className="font-display text-2xl text-[#1d1c1a]">
                  {practice.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4c4b48]">
                  {practice.description}
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#4c4b48]">
                  {practice.steps.map((step) => (
                    <li key={step} className="flex items-start gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#3d7c6e]" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="7-day mini plan"
          title="One elegant shift each day"
          description="Focus on presence over perfection. Each day stacks one new highlight so you build harmony without overwhelm."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {miniPlan.map((day) => (
              <article
                key={day.day}
                className="rounded-2xl border border-[#3d7c6e]/10 bg-white/80 p-6 shadow-[0_20px_55px_-46px_rgba(24,23,20,0.55)]"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-[#3d7c6e]">
                  {day.day}
                </p>
                <h3 className="mt-2 font-display text-2xl text-[#1d1c1a]">
                  {day.focus}
                </h3>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#4c4b48]">
                  {day.actions.map((action) => (
                    <li key={action} className="flex items-start gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#caa36a]" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Planner"
          title="Printable weekly planner & shopping checklist"
          description="Plan micro-touchpoints, mark your rhythm, and keep your apothecary stocked. Built for A4 or US Letter printing, and works with your tablet stylus."
        >
          <WeeklyPlanner />
        </Section>

        <Section
          eyebrow="Reflect & track"
          title="Journal prompts and progress tracker"
          description="Capture qualitative reflections alongside daily micro-metrics. Your data stays on your device only."
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <JournalPrompts />
            <ProgressTracker />
          </div>
        </Section>
      </main>

      <footer className="mx-auto w-full max-w-6xl px-6 pb-10 text-xs uppercase tracking-[0.32em] text-[#4c4b48] md:px-10">
        Copyright {new Date().getFullYear()} Mary&apos;s Digital Lab | Harmony Health Blueprint
      </footer>
    </div>
  );
}
