import type { DailyLog, MealComponent, MealSelection } from "../types";

// ─── Slot budget ratios ────────────────────────────────────────────────────────
// Typical % of daily calories/protein each meal slot should cover

export const SLOT_BUDGET_RATIOS: Record<string, number> = {
  breakfast:      0.30,
  lunch:          0.40,
  afternoonSnack: 0.10,
  evening:        0.20,
};

// ─── Day totals ────────────────────────────────────────────────────────────────

const MEAL_SLOTS = [
  "breakfast",
  "lunch",
  "afternoonSnack",
  "evening",
] as const;

type MealSlotKey = (typeof MEAL_SLOTS)[number];

function selectionTotals(
  sel: MealSelection | null | undefined,
  allComponents: Record<string, MealComponent>,
): { calories: number; proteinG: number } {
  if (!sel) return { calories: 0, proteinG: 0 };
  let calories = 0;
  let proteinG = 0;
  for (const id of [sel.protein, sel.carbs, sel.side]) {
    if (id && allComponents[id]) {
      calories += allComponents[id].calories;
      proteinG += allComponents[id].proteinG;
    }
  }
  return { calories, proteinG };
}

/** Sum macros across all meal slots, optionally skipping one slot. */
export function computeDayTotals(
  log: DailyLog,
  allComponents: Record<string, MealComponent>,
  excludeSlot?: MealSlotKey,
): { calories: number; proteinG: number } {
  let calories = 0;
  let proteinG = 0;
  for (const slot of MEAL_SLOTS) {
    if (slot === excludeSlot) continue;
    const t = selectionTotals(log[slot], allComponents);
    calories += t.calories;
    proteinG += t.proteinG;
  }
  return { calories, proteinG };
}

/** Macros for a single slot selection. */
export function computeSlotTotals(
  sel: MealSelection | null | undefined,
  allComponents: Record<string, MealComponent>,
): { calories: number; proteinG: number } {
  return selectionTotals(sel, allComponents);
}

// ─── Scoring ───────────────────────────────────────────────────────────────────

/**
 * Score a meal component 0–100 based on how well it fits the remaining daily budget.
 *
 * Factors:
 *  • Calorie fit  (0–50 pts): how close to the ideal for this slot
 *  • Protein fit  (0–40 pts): rewards high protein when goal not yet met
 *  • Training day bonus (0–10 pts): +10 for ≥20g protein on training days
 */
export function scoreComponent(
  component: MealComponent,
  remaining: { calories: number; proteinG: number },
  slotBudgetRatio: number,
  isTrainingDay: boolean,
): number {
  let score = 0;

  // ── Calorie fit (0–50 pts) ──────────────────────────────────────────────────
  const idealCal = remaining.calories * slotBudgetRatio;
  if (remaining.calories <= 0) {
    // Already over budget - prefer the lightest option
    score += Math.max(0, 25 - component.calories / 10);
  } else if (component.calories > remaining.calories) {
    // Would push over budget - rank low but don't hide
    score += 5;
  } else if (idealCal > 0) {
    const diff = Math.abs(component.calories - idealCal) / idealCal;
    score += Math.round(50 * Math.max(0, 1 - diff));
  } else {
    score += 25;
  }

  // ── Protein fit (0–40 pts) ──────────────────────────────────────────────────
  if (remaining.proteinG > 10) {
    // Still need protein - reward proportional contribution
    const ratio = Math.min(component.proteinG / remaining.proteinG, 1);
    score += Math.round(40 * ratio);
  } else if (remaining.proteinG <= 0) {
    // Protein goal already met - mildly prefer lighter protein
    score += Math.round(40 * Math.max(0, 1 - component.proteinG / 60));
  } else {
    // Small remaining need - neutral scoring
    score += 20;
  }

  // ── Training day bonus (0–10 pts) ──────────────────────────────────────────
  if (isTrainingDay && component.proteinG >= 20) {
    score += 10;
  }

  return Math.min(100, Math.max(0, score));
}
