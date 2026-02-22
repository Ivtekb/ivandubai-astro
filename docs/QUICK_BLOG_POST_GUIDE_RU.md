# БЫСТРОЕ ДОБАВЛЕНИЕ ПОСТА (РУССКАЯ ВЕРСИЯ)

## Контекст
Этот гайд для добавления постов в **русскую** версию блога ivandubai.xyz.
Для английской версии используй QUICK_BLOG_POST_GUIDE.md

---

## Алгоритм (6 шагов)

### Шаг 1: Определить номер поста
```bash
cd ~/Projects/ivandubai-astro
ls src/content/blog/post-*.md 2>/dev/null | wc -l
# Если 3 → используем post-4.md
# Если 4 → post-5.md и т.д.
```

### Шаг 2: Создать файл поста
```bash
touch src/content/blog/post-N.md
```
**Важно:** БЕЗ /en/ — прямо в src/content/blog/

---

### Шаг 3: Скопировать структуру из последнего русского поста
```bash
cp src/content/blog/post-3.md src/content/blog/post-N.md
```

---

### Шаг 4: Заменить контент
```bash
cat > src/content/blog/post-N.md << 'INNEREOF'
---
title: 'ТВОЙ ЗАГОЛОВОК'
excerpt: 'Краткое описание (1-2 предложения)'
publishDate: '2026-02-22'
lang: 'ru'
slug: 'post-slug-translitom'
canonical: 'https://www.ivandubai.xyz/blog/post-slug-translitom'
hreflang:
  - href: 'https://www.ivandubai.xyz/blog/post-slug-translitom'
    lang: 'ru'
  - href: 'https://www.ivandubai.xyz/en/blog/post-slug-translitom'
    lang: 'en'
tags:
  - тег1
  - тег2
  - Дубай
seo:
  title: 'SEO заголовок (50-60 символов)'
  description: 'SEO описание (150-160 символов)'
image:
  src: '/post-N.jpg'
  alt: 'Описание картинки для SEO'
og:
  title: 'Open Graph заголовок'
  description: 'OG описание для соцсетей'
  image: '/post-N.jpg'
  imageAlt: 'OG alt текст'
twitter:
  card: 'summary_large_image'
  title: 'Twitter заголовок'
  description: 'Twitter описание'
  image: '/post-N.jpg'
---

<picture>
  <img src="/post-N.jpg" alt="Описание картинки" loading="eager">
</picture>
*Подпись под картинкой курсивом.*

**Быстрая ориентация.** Первый абзац жирным.

---

## Первый заголовок

Основной текст...

INNEREOF
```

**Важно:**
- slug: транслит заголовка латиницей (kebab-case)
- canonical: URL без /en/ для русской версии
- hreflang: обе ссылки (ru и en)
- lang: 'ru' обязательно
- Теги БЕЗ кавычек
- image: вне seo: (отдельный объект)

---

### Шаг 5: Добавить картинку
```bash
cp ~/Downloads/your-image.jpg public/post-N.jpg
```

**Проверка:**
```bash
ls -la public/post-N.jpg
```

---

### Шаг 6: Проверить локально
```bash
npm run dev
```
Открой: http://localhost:4321/blog/post-N/ (БЕЗ /en/)

---

### Шаг 7: Деплой
```bash
git add .
git commit -m "feat: add post-N RU"
git push origin main
```

---

## Критические различия с английской версией

❗ Путь: src/content/blog/post-N.md (без /en/)
❗ lang: обязательно 'ru'
❗ slug: транслит латиницей
❗ canonical: без /en/
❗ hreflang: массив с двумя ссылками
❗ image: отдельный объект (не внутри seo)
❗ og: Open Graph теги обязательны
❗ twitter: Twitter Cards обязательны

---

## Примеры slug

"Золотая виза ОАЭ" → golden-visa-uae
"Стратегия 50/50" → 50-50-strategy

---

## Проблемы

**Пост не появляется:**
- Файл в src/content/blog/ (не в /en/)
- lang: 'ru' присутствует
- image: вне seo:

---

## Время выполнения
⏱️ 2-3 минуты
