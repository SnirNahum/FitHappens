import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSettingsStore } from '../stores/settingsStore';
import { calculateGoals } from '../utils/goals';
import { UserSettingsSchema } from '../schemas/meal';
import t from '../locales/he.json';
import type { UserSettings } from '../types';

export default function SettingsPage() {
  const { settings, setSettings } = useSettingsStore();
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<UserSettings>({
    resolver: zodResolver(UserSettingsSchema),
    defaultValues: settings ?? undefined,
  });

  useEffect(() => {
    if (settings) reset(settings);
  }, [settings, reset]);

  const watchedValues = watch();
  const previewGoals =
    watchedValues.weightKg && watchedValues.heightCm && watchedValues.age && watchedValues.gender && watchedValues.activityLevel
      ? (() => {
          try {
            return calculateGoals(watchedValues as UserSettings);
          } catch {
            return null;
          }
        })()
      : null;

  const onSubmit = (data: UserSettings) => {
    setSettings(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-green-50 pb-8">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-green-100 shadow-sm">
        <div className="mx-auto max-w-lg px-4 py-3 flex items-center justify-between">
          <Link to="/daily" className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
            <ArrowRight size={16} />
          </Link>
          <h1 className="font-semibold text-gray-800">{t.settings.title}</h1>
          <div className="w-6" />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-lg px-4 pt-6 space-y-4">
        {/* Weight */}
        <div>
          <label className="block text-sm font-medium text-gray-700 text-right mb-1">
            {t.settings.weight}
          </label>
          <input
            type="number"
            step="0.1"
            placeholder={t.settings.weightPlaceholder}
            {...register('weightKg', { valueAsNumber: true })}
            className="w-full rounded-lg border border-green-200 bg-white px-3 py-2 text-right focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
          />
          {errors.weightKg && (
            <p className="text-xs text-red-500 text-right mt-1">{t.errors.required}</p>
          )}
        </div>

        {/* Height */}
        <div>
          <label className="block text-sm font-medium text-gray-700 text-right mb-1">
            {t.settings.height}
          </label>
          <input
            type="number"
            placeholder={t.settings.heightPlaceholder}
            {...register('heightCm', { valueAsNumber: true })}
            className="w-full rounded-lg border border-green-200 bg-white px-3 py-2 text-right focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
          />
          {errors.heightCm && (
            <p className="text-xs text-red-500 text-right mt-1">{t.errors.required}</p>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 text-right mb-1">
            {t.settings.age}
          </label>
          <input
            type="number"
            placeholder={t.settings.agePlaceholder}
            {...register('age', { valueAsNumber: true })}
            className="w-full rounded-lg border border-green-200 bg-white px-3 py-2 text-right focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
          />
          {errors.age && (
            <p className="text-xs text-red-500 text-right mt-1">{t.errors.required}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 text-right mb-1">
            {t.settings.gender}
          </label>
          <select
            {...register('gender')}
            className="w-full rounded-lg border border-green-200 bg-white px-3 py-2 text-right focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
          >
            <option value="">{t.errors.required}</option>
            <option value="female">{t.settings.female}</option>
            <option value="male">{t.settings.male}</option>
          </select>
          {errors.gender && (
            <p className="text-xs text-red-500 text-right mt-1">{t.errors.required}</p>
          )}
        </div>

        {/* Activity level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 text-right mb-1">
            {t.settings.activityLevel}
          </label>
          <select
            {...register('activityLevel')}
            className="w-full rounded-lg border border-green-200 bg-white px-3 py-2 text-right focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
          >
            <option value="">{t.errors.required}</option>
            <option value="sedentary">{t.settings.sedentary}</option>
            <option value="light">{t.settings.light}</option>
            <option value="moderate">{t.settings.moderate}</option>
            <option value="active">{t.settings.active}</option>
          </select>
          {errors.activityLevel && (
            <p className="text-xs text-red-500 text-right mt-1">{t.errors.required}</p>
          )}
        </div>

        {/* Live preview */}
        {previewGoals && (
          <div className="rounded-xl bg-green-100 border border-green-200 p-4 text-right space-y-1">
            <p className="text-sm font-medium text-green-800">
              {t.settings.goalSummary
                .replace('{calories}', previewGoals.restDayCalories.toLocaleString())
                .replace('{protein}', String(previewGoals.proteinGoalG))}
            </p>
            <p className="text-sm text-green-700">
              {t.settings.waterGoal.replace('{glasses}', String(previewGoals.waterGlasses))}
            </p>
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-green-500 py-3 font-semibold text-white hover:bg-green-600 transition-colors"
        >
          {saved ? t.settings.saved : t.settings.save}
        </button>
      </form>
    </div>
  );
}
