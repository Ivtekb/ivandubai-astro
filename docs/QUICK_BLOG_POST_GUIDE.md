# БЫСТРОЕ ДОБАВЛЕНИЕ ПОСТА (1 минута)

## Контекст
Этот гайд для добавления постов в **английскую** версию блога ivandubai.xyz.
Для русской версии — аналогично, но пути `src/content/blog/ru/`

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
title: 'ТВОЙ ЗАГОЛОВОК'
excerpt: 'Краткое описание (1-2 предложения)'
publishDate: '2026-02-22'
tags:
  - tag1
  - tag2
  - Dubai
seo:
  title: 'SEO заголовок (50-60 символов)'
  description: 'SEO описание (150-160 символов)'
  image:
    src: '/post-N.jpg'
    alt: 'Описание картинки для SEO'
---

<picture>
  <img src="/post-N.jpg" alt="Описание картинки" loading="eager">
</picture>
*Подпись под картинкой курсивом.*

**Quick orientation.** Первый абзац bold.

---

## Первый заголовок

Основной текст...

EOF
```

**Важно:**
- Замени `post-N.jpg` на фактический номер
- Дата в формате `YYYY-MM-DD`
- Теги **БЕЗ кавычек**: `- Dubai` а не `- 'Dubai'`

---

### Шаг 5: Добавить картинку
```bash
# Вариант 1: Через Finder
# Перетащи картинку в папку public/ и переименуй в post-N.jpg

# Вариант 2: Через терминал
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

**Если картинка не загружается:**
- Проверь `ls -la public/post-N.jpg`
- Жёсткая перезагрузка: `Cmd+Shift+R`
- Если есть строка с webp — удали её

---

### Шаг 7: Деплой
```bash
git add .
git commit -m "feat: add post-N КРАТКОЕ_ОПИСАНИЕ"
git push origin main
```

Vercel автоматически задеплоит на `ivandubai.xyz/en/blog/post-N/`

---

## Критические моменты

✅ Картинка обязательна: `post-N.jpg` в `/public/`  
✅ Только .jpg (НЕ webp если файла нет)  
✅ Теги БЕЗ кавычек  
✅ Дата актуальная (2026)  
✅ Нумерация последовательная (post-5, post-6...)

---

## Проблемы и решения

**Картинка не отображается:**
```bash
ls -la public/post-N.jpg  # Проверь файл
rm -rf .astro && npm run dev  # Очисти кэш
```

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
⏱️ **1-2 минуты** при готовом тексте и картинке