import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "IMS Creators",
  description: "Docs",
  base: '/web/',
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
          {
            text: 'Space',
            link: 'https://cr5.space',
          },
          {
            text: 'Plans',
            link: 'https://ims.cr5.space/app/prices/',
          },
          {
            text: 'Feedback',
            link: 'https://ims.cr5.space/en/feedback',
          },
          {
            text: 'Blog',
            link: 'https://ims.cr5.space/en/blog',
          },
        ],
        sidebar: [
          {
            text: 'Getting started',
            items: [
              { text: "About IMS Creators", link: '/en/start/' },
              { text: "Quick start", link: '/en/start/quick-start' },
              { text: "Invitation to team", link: '/en/start/invitation-to-team' },
              { text: "Registration", link: '/en/start/register' },
              { text: "Feedback", link: '/en/start/feedback' }
            ]
          },
          {
            text: 'Game-design document',
            items: [
              { text: 'Creating Doc Sections', link: '/en/gdd/creating-doc-sections' },
              { text: 'Editing Elements', link: '/en/gdd/editing-elements' },
              { text: 'Element Templates', link: '/en/gdd/element-templates' },
              { text: 'Viewing Links', link: '/en/gdd/viewing-links' },
              { text: 'Change History', link: '/en/gdd/change-history' },
              { text: 'Setting up Access', link: '/en/gdd/setting-up-access' },
              { text: 'Import/Export', link: '/en/gdd/import-export' },
              { text: 'Structures and Enums', link: '/en/gdd/structures-and-enums' }
            ]
          },
          {
            text: 'Teamwork',
            items: [
              { text: 'Creating Tasks', link: '/en/team/creating-tasks' },
              { text: 'Task Settings', link: '/en/team/task-settings' },
              { text: 'Management', link: '/en/team/management' },
              { text: 'Notifications', link: '/en/team/notifications' }
            ]
          },
          {
            text: 'Game card',
            items: [
              { text: 'Setting up Page', link: '/en/pulse/setting-up-page' },
              { text: 'Devlog', link: '/en/pulse/devlog' },
              { text: 'Publishing Build', link: '/en/pulse/publishing-build' },
              { text: 'Statistics', link: '/en/pulse/statistics' }
            ]
          },
          {
            text: 'Project settings',
            items: [
              { text: 'Common', link: '/en/project-settings/common' },
              { text: 'Team', link: '/en/project-settings/team' },
              { text: 'Rights and Roles', link: '/en/project-settings/rights-and-roles' },
              { text: 'Menu Settings', link: '/en/project-settings/menu-settings' },
              { text: 'API', link: '/en/project-settings/api' },
              { text: 'Import/Export', link: '/en/project-settings/import-export' },
              { text: 'Other', link: '/en/project-settings/other' }
            ]
          },
          {
            text: 'Integration with Game Engines',
            items: [
              { text: 'Export Config Files', link: '/en/integration/export-config-files' },
              { text: 'Config File Structure', link: '/en/integration/config-file-structure' }
            ]
          },
          {
            text: 'Personal account',
            items: [
              { text: 'Setting up Profile', link: '/en/cabinet/setting-up-profile' },
              { text: 'My Projects and Invitations', link: '/en/cabinet/my-projects-and-invitations' },
              { text: 'Changing Password', link: '/en/cabinet/changing-password' },
              { text: 'Restoring Password', link: '/en/cabinet/restoring-password' }
            ]
          }
        ],
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
        nav: [
          { text: 'IMS Creators', link: 'https://ims.cr5.space' },
          { text: 'Space', link: 'https://cr5.space' },
          { text: 'Цены', link: 'https://ims.cr5.space/app/prices/' },
          { text: 'Обратная связь', link: 'https://ims.cr5.space/ru/feedback' },
          { text: 'Блог', link: 'https://ims.cr5.space/ru/blog' },
        ],
        sidebar: [
          {
            text: 'Старт работы',
            collapsed: false,
            items: [
              { text: 'Введение', link: '/ru/start/' },
              { text: 'Быстрый старт', link: '/ru/start/quick-start' },
              { text: 'Приглашение в команду', link: '/ru/start/invitation-to-team' },
              { text: 'Регистрация', link: '/ru/start/register' },
              { text: 'Обратная связь', link: '/ru/start/feedback' }
            ]
          },
          {
            text: 'Гейм-дизайн документ',
            collapsed: false,
            items: [
              { text: 'Создание разделов', link: '/ru/gdd/creating-doc-sections' },
              { text: 'Редактирование элементов', link: '/ru/gdd/editing-elements' },
              { text: 'Шаблоны элементов', link: '/ru/gdd/element-templates' },
              { text: 'Просмотр связей', link: '/ru/gdd/viewing-links' },
              { text: 'История изменений', link: '/ru/gdd/change-history' },
              { text: 'Настройка доступа', link: '/ru/gdd/setting-up-access' },
              { text: 'Импорт и экспорт', link: '/ru/gdd/import-export' },
              { text: 'Структуры и Enums', link: '/ru/gdd/structures-and-enums' }
            ]
          },
          {
            text: 'Командная работа',
            collapsed: false,
            items: [
              { text: 'Создание задач', link: '/ru/team/creating-tasks' },
              { text: 'Настройки задач', link: '/ru/team/task-settings' },
              { text: 'Управление', link: '/ru/team/management' },
              { text: 'Уведомления', link: '/ru/team/notifications' }
            ]
          },
          {
            text: 'Карточка игры',
            collapsed: false,
            items: [
              { text: 'Настройка страницы', link: '/ru/pulse/setting-up-page' },
              { text: 'Девлог', link: '/ru/pulse/devlog' },
              { text: 'Публикация билда', link: '/ru/pulse/publishing-build' },
              { text: 'Статистика', link: '/ru/pulse/statistics' }
            ]
          },
          {
            text: 'Настройки проекта',
            collapsed: false,
            items: [
              { text: 'Общие', link: '/ru/project-settings/common' },
              { text: 'Команда', link: '/ru/project-settings/team' },
              { text: 'Права и роли', link: '/ru/project-settings/rights-and-roles' },
              { text: 'Настройки меню', link: '/ru/project-settings/menu-settings' },
              { text: 'API', link: '/ru/project-settings/api' },
              { text: 'Импорт и экспорт', link: '/ru/project-settings/import-export' },
              { text: 'Прочее', link: '/ru/project-settings/other' }
            ]
          },
          {
            text: 'Интеграция ГДД с движками',
            collapsed: false,
            items: [
              { text: 'Экспорт конфигов', link: '/ru/integration/export-config-files' },
              { text: 'Структура файлов', link: '/ru/integration/config-file-structure' }
            ]
          },
          {
            text: 'Личный кабинет',
            collapsed: false,
            items: [
              { text: 'Настройка профиля', link: '/ru/cabinet/setting-up-profile' },
              { text: 'Мои проекты', link: '/ru/cabinet/my-projects-and-invitations' },
              { text: 'Смена пароля', link: '/ru/cabinet/changing-password' },
              { text: 'Восстановление пароля', link: '/ru/cabinet/restoring-password' }
            ]
          }
        ]
      }
    }
  }
})
