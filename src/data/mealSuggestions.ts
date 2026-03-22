import type { MealComponent, MealComponentSet } from "../types";

// ─── Breakfast ────────────────────────────────────────────────────────────────
export const BREAKFAST_COMPONENTS: MealComponentSet = {
  protein: [
    { id: "bf-p-eggs2",   label: "2 ביצים (קשות / עין / חביתה)", calories: 140, proteinG: 12, carbsG: 1,  fatG: 10 },
    { id: "bf-p-cottage", label: "חצי קוטג׳ 5%",                 calories: 120, proteinG: 15, carbsG: 5,  fatG: 4  },
    { id: "bf-p-yogurt",  label: "יוגורט יווני 0% (200g)",        calories: 110, proteinG: 20, carbsG: 8,  fatG: 0  },
    { id: "bf-p-labaneh", label: "לבנה (80g)",                    calories: 110, proteinG: 8,  carbsG: 2,  fatG: 8  },
    { id: "bf-p-bulgarit",label: "גבינה בולגרית 5% (100g)",       calories: 110, proteinG: 12, carbsG: 3,  fatG: 5  },
    { id: "bf-p-tuna",    label: "טונה במים (100g)",               calories: 90,  proteinG: 20, carbsG: 0,  fatG: 1  },
    { id: "bf-p-cheese",  label: "2 פרוסות גבינה צהובה",           calories: 110, proteinG: 8,  carbsG: 0,  fatG: 9  },
  ],
  carbs: [
    { id: "bf-c-bread",    label: "פרוסת לחם מלא (35g)",     calories: 80,  proteinG: 3, carbsG: 15, fatG: 1 },
    { id: "bf-c-crackers", label: "2 קרקרים מלאים (30g)",    calories: 70,  proteinG: 2, carbsG: 14, fatG: 1 },
    { id: "bf-c-oatmeal",  label: "שיבולת שועל (60g)",       calories: 220, proteinG: 8, carbsG: 38, fatG: 4 },
    { id: "bf-c-pita",     label: "פיתה מלאה (70g)",         calories: 160, proteinG: 5, carbsG: 32, fatG: 1 },
    { id: "bf-c-fruit",    label: "פרי עונתי (150g)",         calories: 80,  proteinG: 1, carbsG: 20, fatG: 0 },
    { id: "bf-c-avocado",  label: "אבוקדו + ירקות (50g+150g)", calories: 115, proteinG: 3, carbsG: 10, fatG: 7 },
  ],
  side: [],
};

// ─── Lunch ────────────────────────────────────────────────────────────────────
export const LUNCH_COMPONENTS: MealComponentSet = {
  protein: [
    { id: "ln-p-meatballs", label: "קציצות (150g)", calories: 250, proteinG: 25, carbsG: 5, fatG: 15 },
    { id: "ln-p-thigh", label: "פרגית (150g)", calories: 210, proteinG: 28, carbsG: 0, fatG: 11 },
    { id: "ln-p-chicken", label: "חזה עוף (200g)", calories: 220, proteinG: 42, carbsG: 0, fatG: 5 },
    { id: "ln-p-drumsticks", label: "שוקיים (150g)", calories: 240, proteinG: 24, carbsG: 0, fatG: 16 },
    { id: "ln-p-eggs", label: "2 ביצים", calories: 140, proteinG: 12, carbsG: 1, fatG: 10 },
    { id: "ln-p-salmon", label: "סלמון (150g)", calories: 220, proteinG: 30, carbsG: 0, fatG: 11 },
    { id: "ln-p-tilapia", label: "דג אמנון (150g)", calories: 165, proteinG: 30, carbsG: 0, fatG: 3 },
  ],
  carbs: [
    { id: "ln-c-ptitim", label: "פתיתים (110g מבושל)", calories: 155, proteinG: 5, carbsG: 32, fatG: 1 },
    { id: "ln-c-rice", label: "אורז (150g מבושל)", calories: 195, proteinG: 4, carbsG: 43, fatG: 0 },
    { id: "ln-c-pasta", label: "פסטה (110g מבושל)", calories: 155, proteinG: 5, carbsG: 31, fatG: 1 },
    { id: "ln-c-couscous", label: "קוסקוס (150g מבושל)", calories: 165, proteinG: 4, carbsG: 34, fatG: 1 },
    { id: "ln-c-bread", label: "2 פרוסות לחם לבן", calories: 140, proteinG: 5, carbsG: 28, fatG: 2 },
  ],
  side: [
    { id: "ln-s-salad", label: "סלט ירקות (250g)", calories: 65, proteinG: 3, carbsG: 10, fatG: 2 },
  ],
};

// ─── Evening ──────────────────────────────────────────────────────────────────
export const EVENING_COMPONENTS: MealComponentSet = {
  protein: [
    { id: "ev-p-omelette-cottage", label: "חביתה 2 ביצים + חצי קוטג׳", calories: 280, proteinG: 27, carbsG: 6, fatG: 16 },
    { id: "ev-p-eggs-cottage", label: "2 ביצים עין + חצי קוטג׳", calories: 230, proteinG: 27, carbsG: 5, fatG: 15 },
    { id: "ev-p-tuna", label: "2.5 קופסאות טונה במים", calories: 165, proteinG: 37, carbsG: 0, fatG: 2 },
    { id: "ev-p-toast-cheese", label: "טוסט פיתה עם גבינה 9% + רסק עגבניות", calories: 240, proteinG: 10, carbsG: 33, fatG: 6 },
    { id: "ev-p-salmon", label: "סלמון (150g)", calories: 220, proteinG: 30, carbsG: 0, fatG: 11 },
  ],
  carbs: [
    { id: "ev-c-bread", label: "2 פרוסות לחם לבן (70g)", calories: 155, proteinG: 5, carbsG: 30, fatG: 2 },
    { id: "ev-c-potato", label: "תפוח אדמה (220g)", calories: 185, proteinG: 4, carbsG: 42, fatG: 0 },
    { id: "ev-c-rice", label: "אורז לבן (150g מבושל)", calories: 195, proteinG: 4, carbsG: 43, fatG: 0 },
  ],
  side: [
    { id: "ev-s-salad", label: "סלט ירקות (250g)", calories: 65, proteinG: 3, carbsG: 10, fatG: 2 },
    { id: "ev-s-beans", label: "שעועית ירוקה (250g)", calories: 80, proteinG: 5, carbsG: 18, fatG: 0 },
  ],
};

// ─── Snacks ───────────────────────────────────────────────────────────────────
export const SNACK_COMPONENTS: MealComponentSet = {
  protein: [
    { id: "sn-protshake", label: "מעדן חלבון / שייק", calories: 150, proteinG: 15, carbsG: 15, fatG: 3 },
    { id: "sn-rice-cakes", label: "פריכיות", calories: 90, proteinG: 2, carbsG: 18, fatG: 1 },
    { id: "sn-bread-cheese", label: "3 פרוסות לחם + 2 פרוסות גבינה צהובה", calories: 220, proteinG: 12, carbsG: 30, fatG: 8 },
    { id: "sn-protein-powder", label: "אבקת חלבון", calories: 120, proteinG: 25, carbsG: 3, fatG: 1 },
    { id: "sn-light-pita", label: "פיתה קלה", calories: 100, proteinG: 4, carbsG: 20, fatG: 1 },
    { id: "sn-tuna", label: "חפיסת טונה 9% במים", calories: 100, proteinG: 20, carbsG: 0, fatG: 1 },
    { id: "sn-cottage", label: "חצי קוטג׳", calories: 120, proteinG: 15, carbsG: 5, fatG: 4 },
    { id: "sn-labaneh", label: "לבנה", calories: 70, proteinG: 5, carbsG: 3, fatG: 4 },
    { id: "sn-eggs", label: "2 ביצים", calories: 140, proteinG: 12, carbsG: 1, fatG: 10 },
  ],
  carbs: [],
  side: [],
};

// ─── Cheat meal ───────────────────────────────────────────────────────────────
export const CHEAT_COMPONENTS: MealComponentSet = {
  protein: [
    {
      id: "ch-hamburger",
      label: "המבורגר",
      calories: 580,
      proteinG: 36,
      carbsG: 42,
      fatG: 26,
    },
    {
      id: "ch-pizza",
      label: "פיצה (2 פרוסות)",
      calories: 520,
      proteinG: 22,
      carbsG: 62,
      fatG: 18,
    },
    {
      id: "ch-shawarma",
      label: "שווארמה",
      calories: 560,
      proteinG: 32,
      carbsG: 48,
      fatG: 22,
    },
    {
      id: "ch-sushi",
      label: "סושי (12 יח׳)",
      calories: 480,
      proteinG: 22,
      carbsG: 72,
      fatG: 10,
    },
    {
      id: "ch-falafel",
      label: "פלאפל + פיתה",
      calories: 480,
      proteinG: 18,
      carbsG: 62,
      fatG: 18,
    },
    { id: "ch-pasta", label: "פסטה", calories: 450, proteinG: 16, carbsG: 80, fatG: 8 },
  ],
  carbs: [],
  side: [],
};

// ─── Flat lookup map (all components by id) ───────────────────────────────────
function buildLookup(...sets: MealComponentSet[]): Record<string, MealComponent> {
  const map: Record<string, MealComponent> = {};
  for (const set of sets) {
    for (const c of [...set.protein, ...set.carbs, ...set.side]) {
      map[c.id] = c;
    }
  }
  return map;
}

export const ALL_COMPONENTS: Record<string, MealComponent> = buildLookup(
  BREAKFAST_COMPONENTS,
  LUNCH_COMPONENTS,
  EVENING_COMPONENTS,
  SNACK_COMPONENTS,
  CHEAT_COMPONENTS,
);
