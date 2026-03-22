import { useState } from "react";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DayNav } from "../components/layout/DayNav";
import { MealSlot } from "../components/meals/MealSlot";
import { VeggieCheck } from "../components/meals/VeggieCheck";
import { MealSummaryBar } from "../components/meals/MealSummaryBar";
import {
  BREAKFAST_COMPONENTS,
  LUNCH_COMPONENTS,
  EVENING_COMPONENTS,
  SNACK_COMPONENTS,
  CHEAT_COMPONENTS,
  ALL_COMPONENTS,
  BREAKFAST_COMPAT,
  SNACK_COMPAT,
} from "../data/mealSuggestions";
import { useDailyLogStore, emptyMeal } from "../stores/dailyLogStore";
import { useSettingsStore } from "../stores/settingsStore";
import { calculateGoals, getTodayCalorieGoal } from "../utils/goals";
import { computeDayTotals, SLOT_BUDGET_RATIOS } from "../utils/smartMeals";
import t from "../locales/he.json";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

const TIPS = [
  { emoji: "💧", text: "שתה כוס מים לפני כל ארוחה - זה מפחית תיאבון ומשפר עיכול." },
  { emoji: "🥚", text: "חלבון בבוקר = פחות רעב לאורך היום. אל תדלג על ארוחת הבוקר!" },
  { emoji: "🥗", text: "ירקות קודם - התחל כל ארוחה עם ירקות כדי להאיט ספיגת סוכר." },
  { emoji: "🍽️", text: "אכול לאט. לוקח לגוף 20 דקות להרגיש שובע - אל תמהר." },
  { emoji: "🏋️", text: "ביום אימון הגוף צריך יותר חלבון. תעדף עוף, דגים או ביצים." },
  { emoji: "🌙", text: "ארוחת ערב קלה = שינה טובה יותר ושריפת שומן יעילה יותר בלילה." },
  { emoji: "🍳", text: "בישול בבית = שליטה מלאה על מה שאתה אוכל. זה ההרגל הכי חשוב." },
  { emoji: "⏰", text: "נסה לשמור על שעות אכילה קבועות - זה מייצב את רמות הסוכר." },
  { emoji: "🥜", text: "שומן טוב (אבוקדו, אגוזים) לא מאחסן שומן - הוא עוזר לשרוף אותו." },
  { emoji: "📏", text: "הצלחת לא צריכה להיות מלאה. מנה בינונית + ירקות = שובע אמיתי." },
  {
    emoji: "🧠",
    text: "לחץ מעלה קורטיזול - קורטיזול מעלה תיאבון. נשום. זה חלק מהתזונה.",
  },
  { emoji: "🔄", text: `יום צ'יט? אין בעיה. חזור למסלול בארוחה הבאה, לא מחר בבוקר.` },
  { emoji: "💪", text: "שריר שורף קלוריות גם במנוחה. כל אימון הוא השקעה לטווח ארוך." },
  {
    emoji: "🫀",
    text: "אחרי ארוחה גדולה - הליכה קצרה של 10 דקות משפרת ספיגה ומוריד סוכר.",
  },
];

function TipOfTheDay({ date }: { date: string }) {
  const idx =
    date.split("-").reduce((acc, part) => acc + parseInt(part, 10), 0) % TIPS.length;
  const tip = TIPS[idx];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl bg-white border border-blue-100 px-4 py-3 flex items-start gap-3 shadow-sm"
    >
      <span className="text-xl leading-none mt-0.5">{tip.emoji}</span>
      <div className="flex-1 text-right">
        <p className="text-[11px] font-semibold text-blue-600 mb-0.5">טיפ יומי</p>
        <p className="text-xs text-gray-600 leading-relaxed">{tip.text}</p>
      </div>
    </motion.div>
  );
}

const CHEAT_SLOT_LABELS: Record<string, string> = {
  breakfast: "🌅 ארוחת בוקר",
  lunch: "☀️ ארוחת צהריים",
  evening: "🌙 ארוחת ערב",
};

export default function DailyPage() {
  const [date, setDate] = useState(todayISO);
  const { logs, getLog, updateLog } = useDailyLogStore();
  const { settings } = useSettingsStore();
  const log = getLog(date);

  const goals = settings ? calculateGoals(settings) : null;
  const calorieGoal = goals
    ? getTodayCalorieGoal(goals, log.isTrainingDay, log.isCheatDay)
    : 1800;
  const proteinGoal = goals?.proteinGoalG ?? 120;
  const waterGoal = goals?.waterGlasses ?? 8;

  const patch = (p: Parameters<typeof updateLog>[1]) => updateLog(date, p);

  const handleCheatToggle = (v: boolean) => {
    if (v) {
      const sun = new Date(date + "T12:00:00");
      sun.setDate(sun.getDate() - sun.getDay());
      for (let i = 0; i < 7; i++) {
        const d = new Date(sun);
        d.setDate(sun.getDate() + i);
        const iso = d.toISOString().slice(0, 10);
        if (iso !== date && logs[iso]?.isCheatDay) {
          updateLog(iso, { isCheatDay: false, cheatMealSlot: null });
        }
      }
    }
    patch({ isCheatDay: v, cheatMealSlot: v ? "lunch" : null });
  };

  const breakfastComponents =
    log.isCheatDay && log.cheatMealSlot === "breakfast"
      ? CHEAT_COMPONENTS
      : BREAKFAST_COMPONENTS;
  const lunchComponents =
    log.isCheatDay && log.cheatMealSlot === "lunch" ? CHEAT_COMPONENTS : LUNCH_COMPONENTS;
  const eveningComponents =
    log.isCheatDay && log.cheatMealSlot === "evening"
      ? CHEAT_COMPONENTS
      : EVENING_COMPONENTS;

  // ── Per-slot remaining budget (day total minus every other slot) ──────────────
  function slotRemaining(exclude: Parameters<typeof computeDayTotals>[2]) {
    const dayExcluding = computeDayTotals(log, ALL_COMPONENTS, exclude);
    return {
      calories: calorieGoal - dayExcluding.calories,
      proteinG: proteinGoal - dayExcluding.proteinG,
    };
  }
  const bfRemaining = slotRemaining("breakfast");
  const lunchRemaining = slotRemaining("lunch");
  const afternoonSnackRemaining = slotRemaining("afternoonSnack");
  const eveningRemaining = slotRemaining("evening");

  return (
    <div className="min-h-screen bg-green-50/60">
      <DayNav
        date={date}
        onDateChange={setDate}
        isTrainingDay={log.isTrainingDay}
        onTrainingToggle={(v) => patch({ isTrainingDay: v })}
        isCheatDay={log.isCheatDay}
        onCheatToggle={handleCheatToggle}
      />

      <div className="mx-auto max-w-lg px-4 pt-4 space-y-3">
        {/* Settings prompt */}
        {!settings && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white border border-amber-200 p-3.5 flex items-center justify-between shadow-sm"
          >
            <Link
              to="/settings"
              className="flex items-center gap-1.5 text-amber-600 hover:text-amber-700 text-sm font-medium"
            >
              <Settings size={15} />
              הגדרות
            </Link>
            <span className="text-sm text-amber-700">
              הגדר פרופיל לחישוב יעדים אישיים
            </span>
          </motion.div>
        )}

        {/* Banners - each in its own AnimatePresence to avoid cross-transition glitches */}
        <AnimatePresence mode="wait">
          {log.isCheatDay && (
            <motion.div
              key="cheat"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="rounded-2xl bg-linear-to-r from-yellow-400 to-orange-400 p-4 shadow-md shadow-yellow-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg">🎉</span>
                  <span className="text-sm font-bold text-white">
                    {t.day.cheatBanner}
                  </span>
                </div>
                <div className="flex gap-2 justify-end">
                  {(["breakfast", "lunch", "evening"] as const).map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => patch({ cheatMealSlot: slot, [slot]: emptyMeal() })}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        log.cheatMealSlot === slot
                          ? "bg-white text-orange-500 shadow-md"
                          : "bg-white/25 text-white hover:bg-white/40"
                      }`}
                    >
                      {CHEAT_SLOT_LABELS[slot]}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {log.isTrainingDay && !log.isCheatDay && goals && (
            <motion.div
              key="training"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="rounded-2xl bg-linear-to-r from-green-500 to-emerald-500 p-3.5 text-right text-sm font-bold text-white shadow-md shadow-green-200">
                🏋️ יום אימון - {goals.trainingDayCalories.toLocaleString()} קלוריות
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tip of the day */}
        <TipOfTheDay date={date} />

        {/* Breakfast */}
        <MealSlot
          icon={log.isCheatDay && log.cheatMealSlot === "breakfast" ? "🍔" : "🌅"}
          theme={log.isCheatDay && log.cheatMealSlot === "breakfast" ? "orange" : "amber"}
          title={t.meals.breakfast}
          note="* ביצים/גבינות: גלם | לחם: מהאריזה | ירקות: טריים"
          components={breakfastComponents}
          value={log.breakfast}
          onChange={(v) => patch({ breakfast: v })}
          remaining={bfRemaining}
          isTrainingDay={log.isTrainingDay}
          slotBudgetRatio={SLOT_BUDGET_RATIOS.breakfast}
          compatibilityMap={BREAKFAST_COMPAT}
        />
        {/* Lunch */}
        <MealSlot
          icon={log.isCheatDay && log.cheatMealSlot === "lunch" ? "🍔" : "☀️"}
          theme={log.isCheatDay && log.cheatMealSlot === "lunch" ? "orange" : "green"}
          title={
            log.isCheatDay && log.cheatMealSlot === "lunch"
              ? t.day.cheatMeal
              : t.meals.lunch
          }
          note="* חלבון (עוף/בשר): גלם | פחמימות (אורז/קוסקוס): לאחר בישול | ירקות: טריים"
          components={lunchComponents}
          value={log.lunch}
          onChange={(v) => patch({ lunch: v })}
          remaining={lunchRemaining}
          isTrainingDay={log.isTrainingDay}
          slotBudgetRatio={SLOT_BUDGET_RATIOS.lunch}
        />

        {/* Afternoon snack */}
        <MealSlot
          icon="🍊"
          theme="orange"
          title={t.meals.afternoonSnack}
          note="* משקל לפני אכילה, כמו שלוקחים מהאריזה"
          components={SNACK_COMPONENTS}
          value={log.afternoonSnack}
          onChange={(v) => patch({ afternoonSnack: v })}
          remaining={afternoonSnackRemaining}
          isTrainingDay={log.isTrainingDay}
          slotBudgetRatio={SLOT_BUDGET_RATIOS.afternoonSnack}
          compatibilityMap={SNACK_COMPAT}
          carbsLabel={{ emoji: "🥛", title: "תוספת חלבון" }}
        />

        {/* Evening */}
        <MealSlot
          icon={log.isCheatDay && log.cheatMealSlot === "evening" ? "🍔" : "🌙"}
          theme={log.isCheatDay && log.cheatMealSlot === "evening" ? "orange" : "purple"}
          title={
            log.isCheatDay && log.cheatMealSlot === "evening"
              ? t.day.cheatMeal
              : t.meals.evening
          }
          note="* חלבון (עוף/טונה): גלם | לחם/קרקרים: מהאריזה | ירקות: טריים"
          components={eveningComponents}
          value={log.evening}
          onChange={(v) => patch({ evening: v })}
          remaining={eveningRemaining}
          isTrainingDay={log.isTrainingDay}
          slotBudgetRatio={SLOT_BUDGET_RATIOS.evening}
        />

        {/* Veggies */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.32 }}
        >
          <VeggieCheck
            checked={log.ateVeggies}
            onChange={(v) => patch({ ateVeggies: v })}
          />
        </motion.div>
      </div>

      {/* Summary bar */}
      <div className="mx-auto max-w-lg mt-4">
        <MealSummaryBar
          log={log}
          allComponents={ALL_COMPONENTS}
          calorieGoal={calorieGoal}
          proteinGoal={proteinGoal}
          waterGoal={waterGoal}
          onAddWater={() => patch({ waterGlasses: Math.min(log.waterGlasses + 1, 20) })}
          onRemoveWater={() => patch({ waterGlasses: Math.max(log.waterGlasses - 1, 0) })}
        />
      </div>
    </div>
  );
}
