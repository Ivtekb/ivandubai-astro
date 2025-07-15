const siteConfig = {
    website: 'https://ivandubai.xyz',
    title: 'Ivan Tyrtyshnyy | from Dubai',
    subtitle: 'Недвижимость ОАЭ вне шаблонов. Интеллектуальные решения.',
    description: 'Персональный бренд Ivan from Dubai: недвижимость в ОАЭ, авторский подход к инвестициям, сопровождение с ИИ, живые кейсы успешных сделок. Эксклюзивные проекты в Дубае.',
    keywords: 'недвижимость ОАЭ, недвижимость Дубай, инвестиции в недвижимость, покупка квартиры Дубай, Ivan from Dubai, консультант по недвижимости, off-plan проекты, новостройки ОАЭ',
    author: 'Ivan Tyrtyshnyy',
    locale: 'ru_RU',
    image: {
        src: '/hero.jpeg',
        alt: 'Ivan Tyrtyshnyy - консультант по недвижимости в Дубае на фоне небоскребов'
    },
    // SEO enhancements
    openGraph: {
        type: 'website',
        siteName: 'Ivan Tyrtyshnyy | from Dubai',
        locale: 'ru_RU'
    },
    twitter: {
        card: 'summary_large_image',
        site: '@ivan_fromdubai'
    },
    // Geo targeting for Dubai
    geo: {
        region: 'AE-DU',
        placename: 'Dubai',
        position: '25.276987;55.296249',
        icbm: '25.276987, 55.296249'
    },
    // Structured data
    structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Ivan Tyrtyshnyy',
        jobTitle: 'Консультант по недвижимости в ОАЭ',
        description: 'Персональный бренд Ivan from Dubai: недвижимость в ОАЭ, авторский подход к инвестициям, сопровождение с ИИ, живые кейсы успешных сделок.',
        url: 'https://ivandubai.xyz',
        sameAs: [
            'https://vk.com/ivanfromdubai',
            'https://www.instagram.com/ivan_fromdubai',
            'https://www.facebook.com/IvanGFP'
        ],
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Dubai',
            addressCountry: 'AE'
        },
        knowsAbout: [
            'Недвижимость в ОАЭ',
            'Инвестиции в недвижимость',
            'Покупка недвижимости в Дубае',
            'Off-plan проекты',
            'Консультирование по недвижимости'
        ]
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
            alt: 'Ivan Tyrtyshnyy - персональный консультант по недвижимости в Дубае'
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