// src/utils/i18n.ts
export type Language = 'ru' | 'en';

export const languages: Language[] = ['ru', 'en'];
export const defaultLanguage: Language = 'ru';

// Переводы UI элементов
export const translations = {
  ru: {
    nav: {
      projects: 'Проекты',
      cases: 'Кейсы', 
      blog: 'Блог',
      about: 'О себе',
      contact: 'Контакты'
    },
    actions: {
      viewProject: 'Смотреть проект',
      viewCase: 'Смотреть кейс',
      readMore: 'Читать далее',
      contact: 'Связаться'
    },
    meta: {
      siteName: 'Иван Тыртышный | Недвижимость в Дубае',
      defaultDescription: 'Сертифицированный брокер недвижимости в Дубае. DLD №48861.'
    }
  },
  en: {
    nav: {
      projects: 'Projects',
      cases: 'Cases',
      blog: 'Blog', 
      about: 'About',
      contact: 'Contact'
    },
    actions: {
      viewProject: 'View Project',
      viewCase: 'View Case', 
      readMore: 'Read More',
      contact: 'Get in Touch'
    },
    meta: {
      siteName: 'Ivan Tyrtyshnyi | Dubai Real Estate',
      defaultDescription: 'Certified Dubai real estate broker. DLD #48861.'
    }
  }
} as const;

// Утилиты для работы с языками
export function getLanguageFromURL(url: URL): Language {
  const pathname = url.pathname;
  if (pathname.startsWith('/en/') || pathname === '/en') {
    return 'en';
  }
  return 'ru';
}

export function getTranslations(language: Language) {
  return translations[language];
}