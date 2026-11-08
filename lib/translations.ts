import fs from 'fs';
import path from 'path';

export function getTranslations(locale: string = 'en') {
    const filePath = path.join(process.cwd(), 'public', 'locales', locale, 'common.json');

    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        // Fallback to English if locale file not found
        const fallbackPath = path.join(process.cwd(), 'public', 'locales', 'en', 'common.json');
        const fallbackContents = fs.readFileSync(fallbackPath, 'utf8');
        return JSON.parse(fallbackContents);
    }
}

export function getStaticPropsWithTranslations(context: any) {
    const locale = typeof context === 'string' ? context : (context?.locale || 'en');
    const translations = getTranslations(locale);

    return {
        props: {
            translations,
            locale,
        },
    };
}
