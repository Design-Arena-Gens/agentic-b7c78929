'use client';

import { useEffect, useMemo, useState, useTransition } from "react";
import { progressMetrics } from "@/data/content";

type TrackerState = Record<string, boolean[]>;

const STORAGE_KEY = "harmony-health-progress";
const DAYS = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];

function createInitialState(): TrackerState {
  return progressMetrics.reduce<TrackerState>((acc, metric) => {
    acc[metric.key] = Array(DAYS.length).fill(false);
    return acc;
  }, {});
}

export function ProgressTracker() {
  const [state, setState] = useState<TrackerState>(() =>
    createInitialState(),
  );
  const [, startTransition] = useTransition();

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as TrackerState;
        startTransition(() => {
          setState((prev) => ({
            ...prev,
            ...parsed,
          }));
        });
      } catch {
        // ignore parse errors
      }
    }
  }, [startTransition]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const totals = useMemo(
    () =>
      DAYS.map((_, index) =>
        progressMetrics.reduce((sum, metric) => {
          return state[metric.key]?.[index] ? sum + 1 : sum;
        }, 0),
      ),
    [state],
  );

  const handleToggle = (metricKey: string, dayIndex: number) => {
    setState((prev) => {
      const dayStates = prev[metricKey] ? [...prev[metricKey]] : [];
      dayStates[dayIndex] = !dayStates[dayIndex];
      return {
        ...prev,
        [metricKey]: dayStates,
      };
    });
  };

  const reset = () => setState(createInitialState());

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-[#3d7c6e]/10">
        <table className="w-full border-collapse bg-white/85 text-sm text-[#1d1c1a]">
          <thead className="bg-[#f2ece2]/80 uppercase tracking-[0.24em] text-[#3d7c6e]">
            <tr>
              <th className="px-4 py-4 text-left font-medium">Metric</th>
              {DAYS.map((day) => (
                <th key={day} className="px-3 py-4 font-medium">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {progressMetrics.map((metric) => (
              <tr
                key={metric.key}
                className="border-t border-[#3d7c6e]/10 text-[#4c4b48]"
              >
                <td className="px-4 py-3 font-medium text-[#1d1c1a]">
                  {metric.label}
                </td>
                {DAYS.map((_, index) => {
                  const checked = state[metric.key]?.[index] ?? false;

                  return (
                    <td key={index} className="px-3 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggle(metric.key, index)}
                        className={`mx-auto inline-flex h-6 w-6 items-center justify-center rounded-full border transition ${
                          checked
                            ? "border-[#3d7c6e] bg-[#3d7c6e] text-white"
                            : "border-[#caa36a]/60 text-transparent"
                        }`}
                        aria-pressed={checked}
                        aria-label={`${metric.label} ${DAYS[index]}`}
                      >
                        ✓
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-[#caa36a]/25 bg-[#fffaf3]/70 text-[#1d1c1a]">
              <td className="px-4 py-3 font-semibold uppercase tracking-[0.24em] text-[#caa36a]">
                Completion
              </td>
              {totals.map((count, index) => (
                <td key={DAYS[index]} className="px-3 py-3 text-center">
                  <span className="rounded-full border border-[#3d7c6e]/30 bg-white px-2 py-1 text-xs font-semibold">
                    {count}/{progressMetrics.length}
                  </span>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-xs leading-relaxed text-[#4c4b48]">
        <button
          type="button"
          onClick={reset}
          className="rounded-full border border-[#caa36a]/60 bg-white px-4 py-2 uppercase tracking-[0.28em] text-[#1d1c1a] transition hover:bg-[#f2ece2]"
        >
          Reset Tracker
        </button>
        <p>
          This tracker stays on your device only. Revisit nightly and celebrate
          green lights.
        </p>
      </div>
    </div>
  );
}
