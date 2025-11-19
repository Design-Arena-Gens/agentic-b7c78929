'use client';

import { useEffect, useState, useTransition } from "react";
import { miniPlan, plannerFocus, shoppingList } from "@/data/content";

type PlannerState = Record<string, boolean[]>;

const STORAGE_KEY = "harmony-weekly-planner";

const initialState = (): PlannerState =>
  plannerFocus.reduce<PlannerState>((acc, focus) => {
    acc[focus] = Array(miniPlan.length).fill(false);
    return acc;
  }, {});

export function WeeklyPlanner() {
  const [state, setState] = useState<PlannerState>(initialState);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as PlannerState;
        startTransition(() => {
          setState((prev) => ({ ...prev, ...parsed }));
        });
      } catch {
        // ignore parse errors
      }
    }
  }, [startTransition]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const toggle = (focus: string, index: number) => {
    setState((prev) => {
      const values = prev[focus] ? [...prev[focus]] : [];
      values[index] = !values[index];
      return { ...prev, [focus]: values };
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const reset = () => setState(initialState());

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.24em] text-[#4c4b48]">
        <button
          type="button"
          onClick={handlePrint}
          className="rounded-full border border-[#1d1c1a]/20 bg-[#1d1c1a] px-4 py-2 text-white transition hover:bg-[#3d7c6e]"
        >
          Print planner
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-full border border-[#caa36a]/60 bg-white px-4 py-2 text-[#1d1c1a] transition hover:bg-[#f2ece2]"
        >
          Clear marks
        </button>
        <span>Minimal ink layout for weekly review</span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#3d7c6e]/10 bg-white/85">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-[#f2ece2]/80 uppercase tracking-[0.24em] text-[#3d7c6e]">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Focus</th>
              {miniPlan.map((day) => (
                <th key={day.day} className="px-3 py-3 font-medium">
                  {day.day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {plannerFocus.map((focus) => (
              <tr
                key={focus}
                className="border-t border-[#3d7c6e]/10 text-[#4c4b48]"
              >
                <td className="px-4 py-3 font-semibold text-[#1d1c1a]">
                  {focus}
                </td>
                {miniPlan.map((_, index) => {
                  const active = state[focus]?.[index] ?? false;
                  return (
                    <td key={index} className="px-3 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => toggle(focus, index)}
                        className={`mx-auto inline-flex h-6 w-6 items-center justify-center rounded-md border text-[11px] transition ${
                          active
                            ? "border-[#1d1c1a] bg-[#1d1c1a] text-white"
                            : "border-[#caa36a]/50 text-transparent"
                        }`}
                        aria-label={`${focus} ${miniPlan[index].day}`}
                      >
                        ✓
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {shoppingList.map((group) => (
          <div
            key={group.category}
            className="rounded-2xl border border-[#3d7c6e]/12 bg-white/90 p-5"
          >
            <h3 className="font-display text-xl text-[#1d1c1a]">
              {group.category}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-[#4c4b48]">
              {group.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-[#caa36a]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
