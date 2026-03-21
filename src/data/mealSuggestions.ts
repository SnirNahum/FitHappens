import type { MealComponent, MealComponentSet } from "../types";

// ─── Breakfast ────────────────────────────────────────────────────────────────
export const BREAKFAST_COMPONENTS: MealComponentSet = {
  protein: [
    {
      id: "bf-p-eggs2",
      label: "2 ביצים",
      calories: 140,
      proteinG: 12,
      carbsG: 1,
      fatG: 10,
    },
    { id: "bf-p-egg1", label: "ביצה 1", calories: 70, proteinG: 6, carbsG: 0, fatG: 5 },
    {
      id: "bf-p-cottage",
      label: "קוטג׳ 5% (150g)",
      calories: 120,
      proteinG: 15,
      carbsG: 5,
      fatG: 4,
    },
    {
      id: "bf-p-yogurt",
      label: "יוגורט יווני (200g)",
      calories: 130,
      proteinG: 17,
      carbsG: 6,
      fatG: 4,
    },
    {
      id: "bf-p-cheese",
      label: "גבינה צהובה (30g)",
      calories: 110,
      proteinG: 8,
      carbsG: 0,
      fatG: 9,
    },
    {
      id: "bf-p-tuna",
      label: "טונה (100g)",
      calories: 90,
      proteinG: 20,
      carbsG: 0,
      fatG: 1,
    },
  ],
  carbs: [
    {
      id: "bf-c-bread",
      label: "לחם מלא (35g)",
      calories: 80,
      proteinG: 3,
      carbsG: 15,
      fatG: 1,
    },
    {
      id: "bf-c-crackers",
      label: "2 קרקרים (30g)",
      calories: 70,
      proteinG: 2,
      carbsG: 14,
      fatG: 1,
    },
    {
      id: "bf-c-oatmeal",
      label: "שיבולת שועל (60g)",
      calories: 220,
      proteinG: 8,
      carbsG: 38,
      fatG: 4,
    },
    {
      id: "bf-c-pita",
      label: "פיתה מלאה (70g)",
      calories: 160,
      proteinG: 5,
      carbsG: 32,
      fatG: 1,
    },
  ],
  side: [
    {
      id: "bf-s-salad",
      label: "סלט (150g)",
      calories: 40,
      proteinG: 2,
      carbsG: 6,
      fatG: 1,
    },
    {
      id: "bf-s-veggies",
      label: "ירקות טריים (150g)",
      calories: 35,
      proteinG: 2,
      carbsG: 6,
      fatG: 0,
    },
    {
      id: "bf-s-avocado",
      label: "אבוקדו (50g)",
      calories: 80,
      proteinG: 1,
      carbsG: 4,
      fatG: 7,
    },
    {
      id: "bf-s-fruit",
      label: "פרי (120g)",
      calories: 70,
      proteinG: 1,
      carbsG: 17,
      fatG: 0,
    },
    {
      id: "bf-s-tahini",
      label: "טחינה (20g)",
      calories: 110,
      proteinG: 3,
      carbsG: 4,
      fatG: 10,
    },
  ],
};

// ─── Lunch ────────────────────────────────────────────────────────────────────
export const LUNCH_COMPONENTS: MealComponentSet = {
  protein: [
    {
      id: "ln-p-chicken",
      label: "חזה עוף (150g)",
      calories: 165,
      proteinG: 32,
      carbsG: 0,
      fatG: 4,
    },
    {
      id: "ln-p-thigh",
      label: "פרגית (150g)",
      calories: 210,
      proteinG: 28,
      carbsG: 0,
      fatG: 11,
    },
    {
      id: "ln-p-beef",
      label: "בשר טחון (140g)",
      calories: 250,
      proteinG: 28,
      carbsG: 0,
      fatG: 16,
    },
    {
      id: "ln-p-schnitzel",
      label: "שניצל אפוי (140g)",
      calories: 210,
      proteinG: 28,
      carbsG: 6,
      fatG: 8,
    },
    {
      id: "ln-p-tuna",
      label: "טונה (100g)",
      calories: 90,
      proteinG: 20,
      carbsG: 0,
      fatG: 1,
    },
    {
      id: "ln-p-eggs",
      label: "2 ביצים (100g)",
      calories: 140,
      proteinG: 12,
      carbsG: 1,
      fatG: 10,
    },
    {
      id: "ln-p-salmon",
      label: "סלמון (150g)",
      calories: 220,
      proteinG: 30,
      carbsG: 0,
      fatG: 11,
    },
  ],
  carbs: [
    {
      id: "ln-c-rice",
      label: "אורז מלא (180g בישול)",
      calories: 240,
      proteinG: 5,
      carbsG: 50,
      fatG: 2,
    },
    {
      id: "ln-c-couscous",
      label: "קוסקוס (180g בישול)",
      calories: 220,
      proteinG: 5,
      carbsG: 46,
      fatG: 1,
    },
    {
      id: "ln-c-sweet-pot",
      label: "בטטה אפויה (200g)",
      calories: 180,
      proteinG: 3,
      carbsG: 42,
      fatG: 0,
    },
    {
      id: "ln-c-quinoa",
      label: "קינואה (180g בישול)",
      calories: 220,
      proteinG: 8,
      carbsG: 40,
      fatG: 4,
    },
    {
      id: "ln-c-pasta",
      label: "פסטה (200g בישול)",
      calories: 260,
      proteinG: 8,
      carbsG: 52,
      fatG: 2,
    },
    {
      id: "ln-c-mash",
      label: "פירה (200g)",
      calories: 180,
      proteinG: 4,
      carbsG: 40,
      fatG: 2,
    },
    {
      id: "ln-c-pita",
      label: "פיתה מלאה (70g)",
      calories: 160,
      proteinG: 5,
      carbsG: 32,
      fatG: 1,
    },
  ],
  side: [
    {
      id: "ln-s-salad",
      label: "סלט גדול (200g)",
      calories: 50,
      proteinG: 2,
      carbsG: 8,
      fatG: 1,
    },
    {
      id: "ln-s-veggies",
      label: "ירקות מאודים (150g)",
      calories: 40,
      proteinG: 2,
      carbsG: 7,
      fatG: 0,
    },
    {
      id: "ln-s-tahini",
      label: "טחינה (20g)",
      calories: 110,
      proteinG: 3,
      carbsG: 4,
      fatG: 10,
    },
  ],
};

// ─── Evening ──────────────────────────────────────────────────────────────────
export const EVENING_COMPONENTS: MealComponentSet = {
  protein: [
    {
      id: "ev-p-tuna",
      label: "טונה (100g)",
      calories: 90,
      proteinG: 20,
      carbsG: 0,
      fatG: 1,
    },
    {
      id: "ev-p-chicken",
      label: "עוף מבושל (120g)",
      calories: 130,
      proteinG: 26,
      carbsG: 0,
      fatG: 3,
    },
    {
      id: "ev-p-eggs2",
      label: "חביתה 2 ביצים",
      calories: 160,
      proteinG: 12,
      carbsG: 1,
      fatG: 12,
    },
    {
      id: "ev-p-cottage",
      label: "קוטג׳ 5% (150g)",
      calories: 120,
      proteinG: 15,
      carbsG: 5,
      fatG: 4,
    },
    {
      id: "ev-p-cheese",
      label: "גבינה צהובה (30g)",
      calories: 110,
      proteinG: 8,
      carbsG: 0,
      fatG: 9,
    },
  ],
  carbs: [
    {
      id: "ev-c-bread",
      label: "לחם מלא (50g)",
      calories: 110,
      proteinG: 4,
      carbsG: 22,
      fatG: 1,
    },
    {
      id: "ev-c-crackers",
      label: "3 קרקרים (45g)",
      calories: 110,
      proteinG: 3,
      carbsG: 22,
      fatG: 2,
    },
    {
      id: "ev-c-pita",
      label: "פיתה מלאה (70g)",
      calories: 160,
      proteinG: 5,
      carbsG: 32,
      fatG: 1,
    },
  ],
  side: [
    {
      id: "ev-s-salad",
      label: "סלט גדול (200g)",
      calories: 50,
      proteinG: 2,
      carbsG: 8,
      fatG: 1,
    },
    {
      id: "ev-s-veggies",
      label: "ירקות (150g)",
      calories: 40,
      proteinG: 2,
      carbsG: 7,
      fatG: 0,
    },
    {
      id: "ev-s-tahini",
      label: "טחינה (15g)",
      calories: 80,
      proteinG: 2,
      carbsG: 3,
      fatG: 7,
    },
    {
      id: "ev-s-avocado",
      label: "אבוקדו (50g)",
      calories: 80,
      proteinG: 1,
      carbsG: 4,
      fatG: 7,
    },
  ],
};

// ─── Snacks ───────────────────────────────────────────────────────────────────
export const SNACK_COMPONENTS: MealComponentSet = {
  protein: [
    {
      id: "sn-fruit-almonds",
      label: "פרי + 10 שקדים",
      calories: 130,
      proteinG: 4,
      carbsG: 18,
      fatG: 6,
    },
    {
      id: "sn-veggies-hummus",
      label: "ירקות + חומוס (60g)",
      calories: 100,
      proteinG: 4,
      carbsG: 12,
      fatG: 4,
    },
    {
      id: "sn-cottage-fruit",
      label: "קוטג׳ (100g) + פרי",
      calories: 150,
      proteinG: 11,
      carbsG: 20,
      fatG: 3,
    },
    {
      id: "sn-protbar",
      label: "חטיף חלבון",
      calories: 200,
      proteinG: 20,
      carbsG: 22,
      fatG: 6,
    },
    {
      id: "sn-crackers-tahini",
      label: "2 קרקרים + טחינה (15g)",
      calories: 150,
      proteinG: 4,
      carbsG: 16,
      fatG: 8,
    },
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
