import { z } from 'zod';

export const UserSettingsSchema = z.object({
  weightKg: z.number().min(20).max(300),
  heightCm: z.number().min(50).max(250),
  age: z.number().int().min(13).max(120),
  gender: z.enum(['male', 'female']),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active']),
});

export const DailyLogSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  isTrainingDay: z.boolean(),
  isCheatDay: z.boolean(),
  cheatMealSlot: z.enum(['breakfast', 'lunch', 'evening']).nullable(),
  breakfast: z.string().nullable(),
  morningSnack: z.string().nullable(),
  lunch: z.string().nullable(),
  afternoonSnack: z.string().nullable(),
  evening: z.string().nullable(),
  ateVeggies: z.boolean(),
  waterGlasses: z.number().int().min(0).max(20),
});
