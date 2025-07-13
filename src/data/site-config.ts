const siteConfig = {
    website: 'https://ivandubai.xyz',
    title: 'Ivan Tyrtyshnyy | from Dubai',
    subtitle: 'Недвижимость ОАЭ вне шаблонов. Интеллектуальные решения.',
    description: 'Главная страница личного бренда Ivan from Dubai: недвижимость в ОАЭ, авторский подход, сопровождение с ИИ и живые кейсы.',
    image: {
        src: '/hero.jpeg',
        alt: 'Атмосферное фото на фоне Дубая'
    },
    headerNavLinks: [
        { text: 'Главная', href: '/' },
        { text: 'Моя история', href: '/about' },
        { text: 'Проекты', href: '/projects' },
        { text: 'Кейсы', href: '/cases' },
        { text: 'Блог', href: '/blog' },
        { text: 'Вопросы и Ответы', href: '/faq' },
        { text: 'Контакты', href: '/contact' }
    ],
    footerNavLinks: [
        { text: 'Главная', href: '/' },
        { text: 'Моя история', href: '/about' },
        { text: 'Проекты', href: '/projects' },
        { text: 'Кейсы', href: '/cases' },
        { text: 'Блог', href: '/blog' },
        { text: 'Вопросы и Ответы', href: '/faq' },
        { text: 'Контакты', href: '/contact' }
    ],
    socialLinks: [
        { text: 'VK', href: 'https://vk.com/ivanfromdubai' },
        { text: 'Instagram', href: 'https://www.instagram.com/ivan_fromdubai' },
        { text: 'Facebook', href: 'https://www.facebook.com/IvanGFP' }
    ],
    hero: {
        title: 'Недвижимость в ОАЭ — твой сценарий, твой ритм',
        text: 'Моя задача — помочь тебе найти то, что подходит именно под твой стиль жизни, даже если это значит отказаться от некоторых вариантов.',
        image: {
            src: '/hero.jpeg',
            alt: 'Атмосферное фото на фоне Дубая'
        },
        actions: [
            { text: 'Получить подборку', href: '/#projects' },
            { text: 'Задать вопрос', href: '/#contact' }
        ]
    },
    subscribe: {
        title: 'Подписаться на обновления',
        text: 'Получай свежие кейсы и инсайты о недвижимости в ОАЭ — 1 письмо в неделю.',
        formUrl: '#' // Если есть форма рассылки, вставь здесь реальный URL.
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
