import i18next, { FormatFunction, InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { format as fnsFormat, startOfDay, formatISO } from 'date-fns';

import enGB from './translations/en-GB/common.json';
import enUS from './translations/en-US/common.json';
import {
    AppLocale,
    dateFnsLocales,
    DefaultLocale,
} from './translations/supportedLocales';

export const dateFormat: FormatFunction = (value): string => {
    return fnsFormat(
        value,
        dateFnsLocales[i18next.language as AppLocale].formatLong?.date({
            width: 'short',
        })
    );
};

export const formatLong: FormatFunction = (value): string => {
    return formatISO(
        value,
        dateFnsLocales[i18next.language as AppLocale].formatLong?.date({
            width: 'short',
        })
    );
};

export const initOpts: InitOptions = {
    interpolation: {
        escapeValue: false, // react already escapes
        format: dateFormat,
    },
    // lng: 'en-GB', // if you're using a language detector, do not define the lng option
    fallbackLng: DefaultLocale,
    ns: ['common'],
    defaultNS: 'common',
    keySeparator: false, // we want a.b.c.d.e strings for easy lookup
    detection: {
        order: [
            'customRegionLanguageDetector',
            'querystring',
            'cookie',
            'localStorage',
            'navigator',
            'htmlTag',
        ],
    },
    resources: {
        'en-GB': {
            common: { ...enGB },
        },
        'en-US': {
            common: { ...enUS },
        },
    },
    react: {
        useSuspense: false, // we don't wait for resource loading
    },
};
export const initTranslations = () =>
    i18next.use(initReactI18next).init(initOpts);

export const getFnsDate = (): Date => {
    return startOfDay(new Date());
};
