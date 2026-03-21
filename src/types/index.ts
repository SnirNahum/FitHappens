export interface MealComponent {
  id: string;
  label: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}

export interface MealComponentSet {
  protein: MealComponent[];
  carbs: MealComponent[];
  side: MealComponent[];
}

export interface MealSelection {
  protein: string | null;
  carbs: string | null;
  side: string | null;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  isTrainingDay: boolean;
  isCheatDay: boolean;
  cheatMealSlot: 'breakfast' | 'lunch' | 'evening' | null;
  breakfast: MealSelection;
  morningSnack: MealSelection;
  lunch: MealSelection;
  afternoonSnack: MealSelection;
  evening: MealSelection;
  ateVeggies: boolean;
  waterGlasses: number;
}

export interface UserSettings {
  weightKg: number;
  heightCm: number;
  age: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active';
}

export interface GoalResult {
  restDayCalories: number;
  trainingDayCalories: number;
  cheatDayCalories: number;
  proteinGoalG: number;
  waterGlasses: number;
}
