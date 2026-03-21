import type { UserSettings, GoalResult } from '../types';

const ACTIVITY_MULTIPLIERS: Record<UserSettings['activityLevel'], number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
};

export function calculateGoals(settings: UserSettings): GoalResult {
  const { weightKg, heightCm, age, gender, activityLevel } = settings;

  const bmr =
    gender === 'male'
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

  const tdee = bmr * ACTIVITY_MULTIPLIERS[activityLevel];

  const restDayCalories = Math.max(Math.round(tdee - 500), 1200);
  const trainingDayCalories = Math.max(Math.round(tdee - 200), 1200);
  const cheatDayCalories = Math.round(tdee);

  const proteinGoalG = Math.round(weightKg * 1.6);

  const dailyWaterMl = weightKg * 35;
  const waterGlasses = Math.round(dailyWaterMl / 250);

  return { restDayCalories, trainingDayCalories, cheatDayCalories, proteinGoalG, waterGlasses };
}

export function getTodayCalorieGoal(
  goals: GoalResult,
  isTrainingDay: boolean,
  isCheatDay: boolean,
): number {
  if (isCheatDay) return goals.cheatDayCalories;
  if (isTrainingDay) return goals.trainingDayCalories;
  return goals.restDayCalories;
}
