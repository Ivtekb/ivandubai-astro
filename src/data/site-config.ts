const siteConfig = {
    website: 'https://www.ivandubai.xyz',
    title: 'Ivan Tyrtyshnyi | from Dubai',
    subtitle: 'Недвижимость ОАЭ вне шаблонов. Интеллектуальные решения.',
    description: 'Персональный бренд Ivan from Dubai: недвижимость в ОАЭ, авторский подход к инвестициям, сопровождение с ИИ, живые кейсы успешных сделок. Эксклюзивные проекты в Дубае.',
    keywords: 'недвижимость ОАЭ, недвижимость Дубай, инвестиции в недвижимость, покупка квартиры Дубай, Ivan from Dubai, консультант по недвижимости, off-plan проекты, новостройки ОАЭ',
    author: 'Ivan Tyrtyshnyi',
    locale: 'ru_RU',
    image: {
        src: '/hero.jpeg',
        alt: 'Ivan Tyrtyshnyi - консультант по недвижимости в Дубае на фоне небоскребов'
    },
    // SEO enhancements
    openGraph: {
        type: 'website',
        siteName: 'Ivan Tyrtyshnyi | from Dubai',
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
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://www.ivandubai.xyz/#person",
      "name": "Ivan Tyrtyshnyi",
      "alternateName": "Иван Тыртышный",
      "jobTitle": "Real Estate Broker",
      "url": "https://www.ivandubai.xyz/",
      "image": "https://www.ivandubai.xyz/about.jpeg",
      "workLocation": {
        "@type": "Place",
        "address": { "@type": "PostalAddress", "addressLocality": "Dubai", "addressCountry": "AE" }
      },
      "worksFor": {
        "@type": "RealEstateAgent",
        "name": "Knightsbridge Properties",
        "identifier": { "@type": "PropertyValue", "propertyID": "ORN", "value": "22004" }
      },
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "name": "Broker Registration Number (BRN)",
        "credentialCategory": "license",
        "identifier": "48861",
        "recognizedBy": {
          "@type": "GovernmentOrganization",
          "name": "Dubai Land Department",
          "url": "https://dubailand.gov.ae/"
        }
      },
      "sameAs": [
        "https://www.propertyfinder.ae/en/agent/ivan-tyrtyshnyi-171170",
        "https://www.linkedin.com/in/ivanfromdubai/",
        "https://www.instagram.com/ivan_fromdubai",
        "https://maps.google.com/?cid=5197998022612562366"
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
        { text: 'Контакты', href: '/contact' },
        { text: 'Правовая информация', href: '/terms' }
    ],
    socialLinks: [
        { text: 'X', href: 'https://x.com/IvanFromDubai' },
        { text: 'Instagram', href: 'https://www.instagram.com/ivan_fromdubai' },
        { text: 'Facebook', href: 'https://www.facebook.com/IvanGFP' }
    ],
    hero: {
        title: 'Недвижимость в ОАЭ — твой сценарий, твой ритм',
        text: 'Моя задача — помочь тебе найти то, что подходит именно под твой стиль жизни, даже если это значит отказаться от некоторых вариантов.',
        image: {
            src: '/hero.jpeg',
            alt: 'Ivan Tyrtyshnyi - персональный консультант по недвижимости в Дубае'
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