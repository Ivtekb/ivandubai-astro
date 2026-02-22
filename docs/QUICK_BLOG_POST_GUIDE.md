cd ~/Projects/ivandubai-astro && mkdir -p docs && cat > docs/QUICK_BLOG_POST_GUIDE.md << 'EOF'
# БЫСТРОЕ ДОБАВЛЕНИЕ ПОСТА (1 минута)

## Контекст
Этот гайд для добавления постов в **английскую** версию блога.
Для русской версии — аналогично, но пути `src/content/blog/ru/`

## Алгоритм (6 команд)

### 1. Создать файл поста
```bash
touch src/content/blog/en/post-N.md
```

### 2. Скопировать структуру из последнего поста
```bash
cp src/content/blog/en/post-4.md src/content/blog/en/post-N.md
```

### 3. Заменить мета-данные (title, excerpt, publishDate, tags, seo)
```bash
cat > src/content/blog/en/post-N.md << 'EOF'
---
title: 'НОВЫЙ ЗАГОЛОВОК'
excerpt: 'Краткое описание поста'
publishDate: 'YYYY-MM-DD'
tags:
  - tag1
  - tag2
  - Dubai
seo:
  title: 'SEO заголовок'
  description: 'SEO описание для Google'
  image:
    src: '/post-N.jpg'
    alt: 'Описание картинки'
---

<picture>
  <img src="/post-N.jpg" alt="Alt текст" loading="eager">
</picture>
*Подпись под картинкой курсивом*

**Quick orientation.** Первый абзац жирным.

---

## Основной контент

Текст поста...

EOF
```

### 4. Добавить картинку в public/
```bash
# Перетащить post-N.jpg в public/ через Finder
```

### 5. Проверить локально
```bash
npm run dev
# localhost:4321/en/blog/post-N/
```

### 6. Деплой
```bash
git add . && git commit -m "feat: add post-N" && git push origin main
```

## Критические моменты

✅ НЕ используй webp если файла нет
✅ Дата publishDate актуальная (2026)
✅ Теги БЕЗ кавычек
✅ Картинка post-N.jpg в /public/
✅ Alt текст соответствует картинке

## Проблемы

**Картинка не загружается:**
- `ls -la public/post-N.jpg`
- Удали webp строку
- `rm -rf .astro && npm run dev`

**Пост не появляется:**
- Проверь YAML синтаксис
- Теги БЕЗ кавычек
- Дата формат YYYY-MM-DD
EOF