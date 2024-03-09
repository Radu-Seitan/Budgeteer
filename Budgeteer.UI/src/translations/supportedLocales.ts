import enGbLocale from 'date-fns/locale/en-GB';
import enUsLocale from 'date-fns/locale/en-US';

export const DefaultLocale = 'en-US';
export const SupportedAppLocale = ['en-US', 'en-GB', DefaultLocale] as const;

export type AppLocale = typeof SupportedAppLocale[number];

export const dateFnsLocales: Record<AppLocale, Locale> = {
    'en-GB': enGbLocale,
    'en-US': enUsLocale,
};
