# БЫСТРОЕ ДОБАВЛЕНИЕ ПОСТА (АНГЛИЙСКАЯ ВЕРСИЯ)

## Контекст
Этот гайд для добавления постов в **английскую** версию блога ivandubai.xyz.
Для русской версии используй QUICK_BLOG_POST_GUIDE_RU.md

---

## Алгоритм (6 шагов)

### Шаг 1: Определить номер поста
```bash
cd ~/Projects/ivandubai-astro
ls src/content/blog/en/post-*.md 2>/dev/null | wc -l
# Если 0 → используем post-1.md
# Если 1 → post-2.md и т.д.
```

### Шаг 2: Создать файл поста
```bash
touch src/content/blog/en/post-N.md
```
Замени `N` на номер (например, `post-5.md`)

---

### Шаг 3: Скопировать структуру из рабочего поста
```bash
cp src/content/blog/en/post-4.md src/content/blog/en/post-N.md
```

---

### Шаг 4: Заменить контент
```bash
cat > src/content/blog/en/post-N.md << 'EOF'
---
title: 'YOUR TITLE'
excerpt: 'Short description (1-2 sentences)'
publishDate: '2026-02-22'
lang: 'en'
slug: 'post-slug-in-english'
canonical: 'https://www.ivandubai.xyz/en/blog/post-slug-in-english'
hreflang:
  - href: 'https://www.ivandubai.xyz/blog/post-slug-in-english'
    lang: 'ru'
  - href: 'https://www.ivandubai.xyz/en/blog/post-slug-in-english'
    lang: 'en'
tags:
  - tag1
  - tag2
  - Dubai
seo:
  title: 'SEO title (50-60 chars)'
  description: 'SEO description (150-160 chars)'
  image:
    src: '/post-N.jpg'
    alt: 'Image description for OG preview in social media'
image:
  src: '/post-N.jpg'
  alt: 'Image description for SEO'
og:
  title: 'Open Graph title'
  description: 'OG description for social media'
  image: '/post-N.jpg'
  imageAlt: 'OG alt text'
twitter:
  card: 'summary_large_image'
  title: 'Twitter title'
  description: 'Twitter description'
  image: '/post-N.jpg'
---

<picture>
  <img src="/post-N.jpg" alt="Image description" loading="eager">
</picture>
*Caption in italics.*

**Quick orientation.** First paragraph bold.

---

## First Heading

Main text...

EOF
```

**Важно:**
- lang: 'en' обязательно
- canonical: с /en/ префиксом
- seo.image: ОБЯЗАТЕЛЬНО — картинка OG для соцсетей (Facebook, LinkedIn, Telegram)
- image: отдельный объект вне seo — для отображения на сайте
- Теги БЕЗ кавычек: `- Dubai` а не `- 'Dubai'`
- Дата в формате `YYYY-MM-DD`

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
Открой: `http://localhost:4321/en/blog/post-N/`

---

### Шаг 7: Деплой
```bash
git add . && git commit -m "feat: add post-N EN" && git push origin main
```

Vercel автоматически задеплоит на `ivandubai.xyz/en/blog/post-N/`

---

## Критические моменты

✅ lang: 'en' обязательно
✅ canonical: с /en/ префиксом
✅ seo.image ОБЯЗАТЕЛЬНО — иначе соцсети покажут дефолтную hero.jpeg
✅ image: отдельный объект вне seo (для сайта)
✅ Картинка: `post-N.jpg` в `/public/`
✅ Только .jpg (НЕ webp если файла нет)
✅ Теги БЕЗ кавычек
✅ Нумерация последовательная (post-5, post-6...)

---

## Проблемы и решения

**Картинка не отображается:**
```bash
ls -la public/post-N.jpg
rm -rf .astro && npm run dev
```

**Картинка не подтягивается в превью соцсетей:**
- Проверь что seo.image.src прописан внутри seo: блока
- После деплоя сбросить кэш: https://developers.facebook.com/tools/debug/

**Пост не появляется в списке:**
- Проверь YAML синтаксис (отступы 2 пробела)
- Теги без кавычек
- Перезапусти: `Ctrl+C` → `npm run dev`

**Dev сервер не запускается:**
```bash
rm -rf node_modules .astro
npm install
npm run dev
```

---

## Время выполнения
⏱️ **2-3 минуты** при готовом тексте и картинке
