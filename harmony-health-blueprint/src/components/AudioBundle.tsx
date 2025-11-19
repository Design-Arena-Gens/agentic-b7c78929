const tracks = [
  {
    title: "Daybreak Reset - 6 minutes",
    path: "/audio/daybreak-reset.wav",
    intention:
      "Set a composed tone with diaphragmatic breath, mantra layering, and intuitive movement prompts.",
  },
  {
    title: "Evening Release - 9 minutes",
    path: "/audio/evening-release.wav",
    intention:
      "Downshift the nervous system with progressive relaxation, vagal toning hums, and gratitude cues.",
  },
];

export function AudioBundle() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {tracks.map((track) => (
        <article
          key={track.title}
          className="flex h-full flex-col justify-between rounded-2xl border border-[#3d7c6e]/12 bg-white/85 p-5 shadow-[0_18px_50px_-44px_rgba(24,23,20,0.52)]"
        >
          <div className="space-y-3">
            <h3 className="font-display text-xl text-[#1d1c1a]">
              {track.title}
            </h3>
            <p className="text-sm leading-relaxed text-[#4c4b48]">
              {track.intention}
            </p>
          </div>
          <audio
            controls
            preload="metadata"
            className="mt-4 w-full rounded-full bg-[#3d7c6e]/10 p-2"
          >
            <source src={track.path} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </article>
      ))}
    </div>
  );
}
