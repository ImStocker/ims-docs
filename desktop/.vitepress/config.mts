import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "IMS Creators Desktop",
  description: "Documentation",
  base: '/desktop/',
  appearance: 'dark',
  themeConfig: {
    search: {
      provider: 'local'
    }
  },
  locales: {
    en: {
      label: 'English',
      lang: 'en',
      themeConfig: {

        nav: [
          {
            text: 'IMS Creators',
            link: 'https://ims.cr5.space',
          },
        ],
        sidebar: [
          {
            text: 'Getting Started',
            items: [
              { text: 'Start Screen', link: '/en/getting-started/start-screen' },
              { text: 'Creating a Project', link: '/en/getting-started/create-project' },
            ]
          },
          {
            text: 'Working in the Program',
            items: [
              { text: 'Editor Interface', link: '/en/main-editor/editor-interface' },
              { text: 'Element Types', link: '/en/main-editor/element-types' },
              { text: 'Block Types', link: '/en/main-editor/block-types' },
              { text: 'Game Objects and Templates', link: '/en/main-editor/game-objects-and-templates' },
              { text: 'Content Organization', link: '/en/main-editor/organize-content' },
              { text: 'Cloud Sync', link: '/en/main-editor/cloud-sync' },
              { text: 'Export', link: '/en/main-editor/export' },
            ]
          },
          {
            text: 'Engine Integration',
            link: '/en/integration',
            items: [
              { text: 'General asset file structure', link: '/en/integration/asset-structure' },
              { text: 'Individual Block Structure', link: '/en/integration/block-structure' },
              {
                text: 'Storing Scripts (Dialogues)', link: '/en/integration/block-script-structure'
              },
              { text: 'Level Storage', link: '/en/integration/block-level-structure' },
              { text: 'Export to your own format', link: '/en/integration/export-format' },
            ]
          }
        ],

        socialLinks: [
          { icon: 'github', link: 'https://github.com/ImStocker/ims-creators' }
        ]
      }
    },
    ru: {
      label: 'Русский',
      lang: 'ru',
      themeConfig: {
        outline: { label: 'Содержание страницы' },

        docFooter: {
          prev: 'Предыдущая страница',
          next: 'Следующая страница'
        },

        lastUpdated: {
          text: 'Обновлено'
        },

        notFound: {
          title: 'СТРАНИЦА НЕ НАЙДЕНА',
          quote:
            'Но если ты не изменишь направление и продолжишь искать, ты можешь оказаться там, куда направляешься.',
          linkLabel: 'перейти на главную',
          linkText: 'Отведи меня домой'
        },

        darkModeSwitchLabel: 'Оформление',
        lightModeSwitchTitle: 'Переключить на светлую тему',
        darkModeSwitchTitle: 'Переключить на тёмную тему',
        sidebarMenuLabel: 'Меню',
        returnToTopLabel: 'Вернуться к началу',
        langMenuLabel: 'Изменить язык',
        skipToContentLabel: 'Перейти к содержимому',

        // https://vitepress.dev/reference/default-theme-config
        nav: [
          {
            text: 'IMS Creators',
            link: 'https://ims.cr5.space',
          },
        ],

        sidebar: [
          {
            text: 'Начало работы',
            items: [
              { text: 'Стартовый экран', link: '/ru/getting-started/start-screen' },
              { text: 'Создание проекта', link: '/ru/getting-started/create-project' },
            ]
          },
          {
            text: 'Работа в программе',
            items: [
              { text: 'Интерфейс редактора', link: '/ru/main-editor/editor-interface' },
              { text: 'Типы элементов', link: '/ru/main-editor/element-types' },
              { text: 'Типы блоков', link: '/ru/main-editor/block-types' },
              { text: 'Игровые объекты и шаблоны', link: '/ru/main-editor/game-objects-and-templates' },
              { text: 'Организация содержимого', link: '/ru/main-editor/organize-content' },
              { text: 'Синхронизация с облаком', link: '/ru/main-editor/cloud-sync' },
              { text: 'Экспорт', link: '/ru/main-editor/export' },
            ]
          },
          {
            text: 'Интеграция с движками',
            link: '/ru/integration',
            items: [
              { text: 'Общая структура файла элемента', link: '/ru/integration/asset-structure' },
              { text: 'Структура отдельного блока', link: '/ru/integration/block-structure' },
              { text: 'Хранение сценариев (диалогов)', link: '/ru/integration/block-script-structure' },
              { text: 'Хранение уровня', link: '/ru/integration/block-level-structure' },
              { text: 'Экспорт в свой формат', link: '/ru/integration/export-format' },
            ]
          }
        ],

        socialLinks: [
          { icon: 'github', link: 'https://github.com/ImStocker/ims-creators' }
        ]
      }
    }
  }
})
