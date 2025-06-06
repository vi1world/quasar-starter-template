import {
  biApp,
  biArrowDownCircle,
  biArrowDownUp,
  biArrowLeftRight,
  biArrowsMove,
  biBack,
  biBrush,
  biBug,
  biCalendar,
  biChatDots,
  biChevronExpand,
  biChevronRight,
  biCreditCard2Front,
  biCrop,
  biCursorText,
  biDatabase,
  biEmojiSmile,
  biFile,
  biFileEarmark,
  biFileImage,
  biFolder,
  biGear,
  biHouseDoor,
  biInputCursorText,
  biLayers,
  biLayoutSidebar,
  biList,
  biMarkdown,
  biPeople, biPerson, biPersonBadge,
  biPersonCircle,
  biPieChart,
  biSegmentedNav,
  biShieldCheck,
  biTable,
  biToggleOff,
  biUpload,
  biWindowSidebar,
  biGrid3x3Gap,
  biNewspaper,
  biBriefcase,
  biBookmark,
  biChatText,
  biCash,
  biPersonGear,
  biAward,
  biVoicemail,
  biPower
} from '@quasar/extras/bootstrap-icons';
import { mdiRobotConfused } from '@quasar/extras/mdi-v7';
import type { LabelValue } from 'src/types/common';
export const appNavs: LabelValue<any>[] = [
  {
    children: [
      {
        icon: biHouseDoor,
        label: 'nav.dashboard',
        to: '/',
        permissions: ['backend_login'],
      }
    ]
  },
  {
    label: 'nav.developers',
    children: [
      {
        label: 'nav.systemData',
        icon: biGear,
        children: [
          {
            label: 'model_permission',
            icon: biShieldCheck,
            to: '/permission',
            permissions: ['permission_list']
          }
        ]
      }
    ]
  },
  {
    label: 'nav.forAdmin',
    children: [
      {
        label: 'nav.userData',
        icon: biPersonBadge,
        children: [
          {
            label: 'nav.userRole',
            icon: biPeople,
            to: '/role',
            permissions: ['role_list']
          },
          {
            label: 'nav.appUser',
            icon: biPerson,
            to: '/user',
            permissions: ['user_list']
          }
        ]
      }
    ]
  },
  {
    label: 'nav.more',
    children: [
      {
        label: 'model_files_manager',
        icon: biFolder,
        to: '/myFiles?_id=root',
        permissions: ['file_manager_manage']
      }
    ]
  }
];

export const additionalMenu: LabelValue<any>[] = [
  {
    avatar: { src: 'https://cdn.quasar.dev/img/avatar3.jpg' },
    label: 'My profile',
    translateLabel: false,
  },
  {
    border: true,
    translateLabel: false,
    label: 'Example',
    children: [
      {
        icon: biHouseDoor,
        label: 'nav.dashboard',
        to: '/',
      },
      {
        icon: biList,
        label: 'Composables',
        translateLabel: false,
        children: [
          {
            icon: biChevronRight,
            label: 'useBase',
            translateLabel: false,
            to: '/example/composables/use-base'
          },
          {
            icon: biDatabase,
            label: 'useAxios',
            translateLabel: false,
            to: '/example/composables/use-axios'
          },
          {
            icon: biFileEarmark,
            label: 'usePageFetch',
            translateLabel: false,
            to: '/example/composables/use-pagefecth'
          },
        ]
      },
      {
        icon: biBrush,
        label: 'Components',
        translateLabel: false,
        children: [
          {
            icon: biPersonCircle,
            label: 'Avatar',
            translateLabel: false,
            to: '/example/ui/avatar'
          },
          {
            icon: biApp,
            label: 'Button',
            translateLabel: false,
            to: '/example/ui/button'
          },
          {
            icon: biCreditCard2Front,
            label: 'Card',
            translateLabel: false,
            to: '/example/ui/card'
          },
          {
            icon: biCalendar,
            label: 'Date-time picker',
            translateLabel: false,
            to: '/example/ui/date-picker'
          },
          {
            icon: biBack,
            label: 'Dialog',
            description: 'dialog, popconfirm, menu',
            translateLabel: false,
            to: '/example/ui/dialog'
          },
          {
            icon: biUpload,
            label: 'File picker',
            translateLabel: false,
            to: '/example/ui/file-picker'
          },
          {
            icon: biInputCursorText,
            label: 'Form Input',
            description: 'Form, Input, Textarea',
            translateLabel: false,
            to: '/example/ui/input-text'
          },
          {
            icon: biLayoutSidebar,
            label: 'Menu',
            description: 'Dropdown, Menu, Breadcrumb',
            translateLabel: false,
            to: '/example/ui/menu'
          },
          {
            icon: biChevronExpand,
            label: 'Select',
            description: 'Select, Command palette',
            translateLabel: false,
            to: '/example/ui/select'
          },
          {
            icon: biSegmentedNav,
            label: 'Tabs',
            translateLabel: false,
            to: '/example/ui/tabs'
          },
          {
            icon: biToggleOff,
            description: 'Toggle,Options,Radios',
            label: 'Options group',
            translateLabel: false,
            to: '/example/ui/toggle'
          },
          {
            icon: biLayers,
            label: 'Transitions',
            translateLabel: false,
            to: '/example/ui/transitions'
          },
          {
            icon: biPerson,
            label: 'User',
            translateLabel: false,
            to: '/example/ui/user'
          },
        ],
      },
      {
        icon: biWindowSidebar,
        label: 'Social feed',
        translateLabel: false,
        to: '/example/feed',
      },
      {
        icon: biPieChart,
        label: 'Charts',
        translateLabel: false,
        to: '/example/charts'
      },
      {
        icon: biChatDots,
        label: 'Chat',
        translateLabel: false,
        to: '/example/chats'
      },
      {
        icon: biTable,
        label: 'Crud table',
        translateLabel: false,
        to: '/example/crud-table'
      },
      {
        icon: biCursorText,
        label: 'Content text',
        description: 'Display user input',
        translateLabel: false,
        to: '/example/content-text'
      },
      {
        icon: biArrowsMove,
        label: 'Darg and Drop',
        translateLabel: false,
        to: '/example/drag-drop'
      },
      {
        icon: biEmojiSmile,
        label: 'Icon/Emoji picker',
        description: 'Emoji and Icon',
        translateLabel: false,
        to: '/example/emoji-picker'
      },
      {
        icon: biCrop,
        label: 'Image cropper',
        translateLabel: false,
        to: '/example/image-cropper'
      },
      {
        icon: biFileImage,
        label: 'Image/Pdf View',
        translateLabel: false,
        to: '/example/image-view'
      },
      {
        icon: biArrowDownCircle,
        label: 'Infinite scroll',
        translateLabel: false,
        to: '/example/infinite-scroll'
      },
      {
        icon: biMarkdown,
        label: 'Markdown editor',
        translateLabel: false,
        to: '/example/markdown-editor'
      },
      {
        icon: biFile,
        label: 'Result',
        description: 'Error, Success, 404, Alert',
        translateLabel: false,
        to: '/example/result'
      },
      {
        icon: biArrowLeftRight,
        label: 'Swiper Carousel',
        description: 'Swiper js',
        translateLabel: false,
        to: '/example/swiper'
      },
      {
        icon: biArrowDownUp,
        label: 'Virtual scroller',
        translateLabel: false,
        to: '/example/virtual-scroller'
      },
      {
        icon: biBug,
        label: 'Test page',
        translateLabel: false,
        to: '/test'
      },
      {
        icon: biFile,
        label: 'Blank page',
        translateLabel: false,
        to: '/blank-page'
      },
      {
        icon: mdiRobotConfused,
        label: '404 page',
        translateLabel: false,
        to: '/notfound'
      },
    ]
  },
];

// Alumni Navigation Menu - Mirrors Laravel Blade sidebar functionality
export const alumniMenu: LabelValue<any>[] = [
  {
    children: [
      // Admin Dashboard (only for admins)
      {
        icon: biGrid3x3Gap,
        label: 'Dashboard',
        translateLabel: false,
        to: '/admin/dashboard',
        permissions: ['admin'],
        roles: ['admin']
      },
      // Home (for alumni and admins)
      {
        icon: biHouseDoor,
        label: 'Home',
        translateLabel: false,
        to: '/home',
        permissions: ['alumni', 'admin'],
        roles: ['alumni', 'admin']
      }
    ]
  },
  {
    border: true,
    translateLabel: false,
    label: 'Main Menu',
    children: [
      // My Event
      {
        icon: biCalendar,
        label: 'My Event',
        translateLabel: false,
        permissions: ['Manage Event'],
        children: [
          {
            label: 'Event Category',
            translateLabel: false,
            to: '/admin/event/category',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Pending Event',
            translateLabel: false,
            to: '/admin/event/pending',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Create Event',
            translateLabel: false,
            to: '/event/create',
            permissions: ['alumni'],
            roles: ['alumni']
          },
          {
            label: 'My Event',
            translateLabel: false,
            to: '/event/my-event',
            permissions: ['alumni'],
            roles: ['alumni']
          },
          {
            label: 'All Event',
            translateLabel: false,
            to: '/event/all',
            permissions: ['alumni', 'admin'],
            roles: ['alumni', 'admin']
          },
          {
            label: 'My Ticket',
            translateLabel: false,
            to: '/event/my-ticket',
            permissions: ['alumni'],
            roles: ['alumni']
          }
        ]
      },
      // Job Post
      {
        icon: biBriefcase,
        label: 'Job Post',
        translateLabel: false,
        permissions: ['Manage Job Post'],
        children: [
          {
            label: 'Create Post',
            translateLabel: false,
            to: '/jobPost/create',
            permissions: ['alumni'],
            roles: ['alumni']
          },
          {
            label: 'Pending Post',
            translateLabel: false,
            to: '/admin/jobPost/pending-job-post',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'My Post',
            translateLabel: false,
            to: '/jobPost/my-job-post',
            permissions: ['alumni'],
            roles: ['alumni']
          },
          {
            label: 'All Post',
            translateLabel: false,
            to: '/jobPost/all-job-post',
            permissions: ['alumni', 'admin'],
            roles: ['alumni', 'admin']
          }
        ]
      },
      // Articles
      {
        icon: biNewspaper,
        label: 'Articles',
        translateLabel: false,
        permissions: ['Manage Article'],
        children: [
          {
            label: 'Create Article',
            translateLabel: false,
            to: '/articles/create',
            permissions: ['alumni'],
            roles: ['alumni']
          },
          {
            label: 'Pending Articles',
            translateLabel: false,
            to: '/admin/articles/pending',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'My Articles',
            translateLabel: false,
            to: '/articles/my-articles',
            permissions: ['alumni'],
            roles: ['alumni']
          },
          {
            label: 'All Articles',
            translateLabel: false,
            to: '/all/articles',
            permissions: ['alumni', 'admin'],
            roles: ['alumni', 'admin'],
            external: true
          }
        ]
      },
      // Groups
      {
        icon: biPeople,
        label: 'Groups',
        translateLabel: false,
        children: [
          {
            label: 'All Groups',
            translateLabel: false,
            to: '/groups',
            permissions: ['alumni', 'admin'],
            roles: ['alumni', 'admin']
          },
          {
            label: 'My Groups',
            translateLabel: false,
            to: '/groups/my-groups',
            permissions: ['alumni', 'admin'],
            roles: ['alumni', 'admin']
          },
          {
            label: 'Joined Groups',
            translateLabel: false,
            to: '/groups/joined-groups',
            permissions: ['alumni', 'admin'],
            roles: ['alumni', 'admin']
          },
          {
            label: 'Create Group',
            translateLabel: false,
            to: '/groups/create',
            permissions: ['alumni', 'admin'],
            roles: ['alumni', 'admin']
          }
        ]
      },
      // Alumni
      {
        icon: biPersonBadge,
        label: 'Alumni',
        translateLabel: false,
        to: '/alumni/list-search-with-filter',
        permissions: ['alumni', 'admin'],
        roles: ['alumni', 'admin']
      },
      // Membership
      {
        icon: biAward,
        label: 'Membership',
        translateLabel: false,
        to: '/membership-package',
        permissions: ['alumni', 'admin'],
        roles: ['alumni', 'admin']
      },
      // Election (Addon)
      {
        icon: biVoicemail,
        label: 'Election',
        translateLabel: false,
        permissions: ['alumni', 'admin'],
        roles: ['alumni', 'admin'],
        addon: 'ALUCOMMITTEE',
        children: [
          {
            label: 'Nomination',
            translateLabel: false,
            to: '/committee/alumni/nominations/apply_list',
            permissions: ['alumni', 'admin'],
            roles: ['alumni', 'admin']
          },
          {
            label: 'Vote',
            translateLabel: false,
            to: '/committee/alumni/votes/list',
            permissions: ['alumni', 'admin'],
            roles: ['alumni', 'admin']
          }
        ]
      },
      // Messages
      {
        icon: biChatText,
        label: 'Messages',
        translateLabel: false,
        to: '/chats',
        permissions: ['alumni', 'admin'],
        roles: ['alumni', 'admin']
      }
    ]
  },
  {
    border: true,
    translateLabel: false,
    label: 'User Settings',
    children: [
      // Transaction List
      {
        icon: biCash,
        label: 'Transaction List',
        translateLabel: false,
        to: '/transaction/list',
        permissions: ['alumni', 'admin'],
        roles: ['alumni', 'admin']
      },
      // Profile
      {
        icon: biPerson,
        label: 'Profile',
        translateLabel: false,
        to: '/profile',
        permissions: ['alumni', 'admin'],
        roles: ['alumni', 'admin']
      },
      // Settings
      {
        icon: biGear,
        label: 'Settings',
        translateLabel: false,
        to: '/settings',
        permissions: ['alumni', 'admin'],
        roles: ['alumni', 'admin']
      }
    ]
  },
  {
    border: true,
    translateLabel: false,
    label: 'Admin Menu',
    children: [
      // Alumni Management
      {
        icon: biPersonBadge,
        label: 'Manage Alumni',
        translateLabel: false,
        permissions: ['Manage Alumni'],
        roles: ['admin'],
        children: [
          {
            label: 'Add New',
            translateLabel: false,
            to: '/admin/alumni/create',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'All List',
            translateLabel: false,
            to: '/admin/alumni/list-search-with-filter',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Pending List',
            translateLabel: false,
            to: '/admin/alumni/list-pending-alumni-with-filter',
            permissions: ['admin'],
            roles: ['admin']
          }
        ]
      },
      // Membership Management
      {
        icon: biAward,
        label: 'Manage Membership',
        translateLabel: false,
        permissions: ['Manage Membership'],
        roles: ['admin'],
        children: [
          {
            label: 'Membership Plan',
            translateLabel: false,
            to: '/admin/membership',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Member List',
            translateLabel: false,
            to: '/admin/membership/list',
            permissions: ['admin'],
            roles: ['admin']
          }
        ]
      },
      // Notice Management
      {
        icon: biVoicemail,
        label: 'Manage Notice',
        translateLabel: false,
        permissions: ['Manage Notice'],
        roles: ['admin'],
        children: [
          {
            label: 'Category',
            translateLabel: false,
            to: '/admin/notices/categories',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Notice',
            translateLabel: false,
            to: '/admin/notices',
            permissions: ['admin'],
            roles: ['admin']
          }
        ]
      },
      // News Management
      {
        icon: biNewspaper,
        label: 'Manage News',
        translateLabel: false,
        permissions: ['Manage News'],
        roles: ['admin'],
        children: [
          {
            label: 'Tag',
            translateLabel: false,
            to: '/admin/news/tags',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Category',
            translateLabel: false,
            to: '/admin/news/categories',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'News',
            translateLabel: false,
            to: '/admin/news',
            permissions: ['admin'],
            roles: ['admin']
          }
        ]
      },
      // Transaction Management
      {
        icon: biCash,
        label: 'Manage Transaction',
        translateLabel: false,
        permissions: ['Manage Transaction'],
        roles: ['admin'],
        children: [
          {
            label: 'Pending Transaction',
            translateLabel: false,
            to: '/admin/transactions/pending/list',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'All Transaction',
            translateLabel: false,
            to: '/admin/transactions/all/list',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Event Transaction',
            translateLabel: false,
            to: '/admin/transactions/event/list',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Membership Transaction',
            translateLabel: false,
            to: '/admin/transactions/membership/list',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Subscription Transaction',
            translateLabel: false,
            to: '/admin/subscription/transaction/list',
            permissions: ['admin'],
            roles: ['admin'],
            addon: 'ALUSAAS'
          }
        ]
      },
      // Donation Management (Addon)
      {
        icon: biCash,
        label: 'Manage Donation',
        translateLabel: false,
        permissions: ['Manage Donation'],
        roles: ['admin'],
        addon: 'ALUDONATION',
        children: [
          {
            label: 'Categories',
            translateLabel: false,
            to: '/donation/admin/categories',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Campaign',
            translateLabel: false,
            to: '/donation/admin/campaigns',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Campaign Comment',
            translateLabel: false,
            to: '/donation/admin/campaigns/comments',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Pending Donation',
            translateLabel: false,
            to: '/donation/admin/donations/pending',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Donation Report',
            translateLabel: false,
            to: '/donation/admin/donations/report',
            permissions: ['admin'],
            roles: ['admin']
          }
        ]
      },
      // Committee Management (Addon)
      {
        icon: biPersonGear,
        label: 'Manage Committee',
        translateLabel: false,
        permissions: ['Manage Committee'],
        roles: ['admin'],
        addon: 'ALUCOMMITTEE',
        children: [
          {
            label: 'Committee Category',
            translateLabel: false,
            to: '/committee/admin/categories',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Designation',
            translateLabel: false,
            to: '/committee/admin/designation',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Election',
            translateLabel: false,
            to: '/committee/admin/election',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Election Symbol',
            translateLabel: false,
            to: '/committee/admin/candidate-flag',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Nomination',
            translateLabel: false,
            to: '/committee/admin/nominations',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Nomination Transaction',
            translateLabel: false,
            to: '/committee/admin/nominations/transaction',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Board Member',
            translateLabel: false,
            to: '/committee/admin/board_members',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Committee Member',
            translateLabel: false,
            to: '/committee/admin/committee',
            permissions: ['admin'],
            roles: ['admin']
          }
        ]
      },
      // Vote Management (Addon)
      {
        icon: biVoicemail,
        label: 'Manage Vote',
        translateLabel: false,
        permissions: ['Manage Vote'],
        roles: ['admin'],
        addon: 'ALUCOMMITTEE',
        children: [
          {
            label: 'Pending Candidate',
            translateLabel: false,
            to: '/committee/admin/candidates/pending',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Final Candidate',
            translateLabel: false,
            to: '/committee/admin/candidates/final',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Candidate Comments',
            translateLabel: false,
            to: '/committee/admin/candidates-comments',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Vote List',
            translateLabel: false,
            to: '/committee/admin/votes',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Result List',
            translateLabel: false,
            to: '/committee/admin/election/result-list',
            permissions: ['admin'],
            roles: ['admin']
          }
        ]
      },
      // Moderator Management
      {
        icon: biPersonGear,
        label: 'Manage Moderator',
        translateLabel: false,
        permissions: ['Manage Moderator'],
        roles: ['admin'],
        children: [
          {
            label: 'Role',
            translateLabel: false,
            to: '/admin/roles',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Moderator',
            translateLabel: false,
            to: '/admin/moderators',
            permissions: ['admin'],
            roles: ['admin']
          }
        ]
      }
    ]
  },
  {
    border: true,
    translateLabel: false,
    label: 'System Settings',
    children: [
      // Website Settings
      {
        icon: biGear,
        label: 'Website Settings',
        translateLabel: false,
        permissions: ['Manage Website Settings'],
        roles: ['admin'],
        to: '/admin/setting/website-settings',
      },
      // Website Engagement Widgets
      {
        icon: biChatText,
        label: 'Website Engagement Widgets',
        translateLabel: false,
        permissions: ['Manage Website Settings'],
        roles: ['admin'],
        children: [
          {
            label: 'Your Websites',
            translateLabel: false,
            to: '/admin/comment-widget/sites',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Your Webpages',
            translateLabel: false,
            to: '/admin/comment-widget/pages',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Comments',
            translateLabel: false,
            to: '/admin/comment-widget/comments',
            permissions: ['admin'],
            roles: ['admin']
          }
        ]
      },
      // Newsletter Management
      {
        icon: biNewspaper,
        label: 'Subscription Newsletter',
        translateLabel: false,
        permissions: ['Manage Newsletter'],
        roles: ['admin'],
        children: [
          {
            label: 'Subscriber Email',
            translateLabel: false,
            to: '/admin/news-subscription-letter-email',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Email Template',
            translateLabel: false,
            to: '/admin/subscription-email-template',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Send Mail',
            translateLabel: false,
            to: '/admin/subscription-email-template/send-mail',
            permissions: ['admin'],
            roles: ['admin']
          }
        ]
      },
      // Application Settings
      {
        icon: biGear,
        label: 'Application Settings',
        translateLabel: false,
        permissions: ['Manage Application Setting'],
        roles: ['admin'],
        children: [
          {
            label: 'General Settings',
            translateLabel: false,
            to: '/admin/setting/application-settings',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Configurations Settings',
            translateLabel: false,
            to: '/admin/setting/configuration-settings',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Registration Form Setting',
            translateLabel: false,
            to: '/admin/setting/registration-form-settings',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Currency Settings',
            translateLabel: false,
            to: '/admin/setting/currencies',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Payment Gateways',
            translateLabel: false,
            to: '/admin/setting/gateway',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Language Settings',
            translateLabel: false,
            to: '/admin/setting/languages',
            permissions: ['admin'],
            roles: ['admin'],
            hideIfAddon: 'ALUSAAS'
          },
          {
            label: 'Batch Setting',
            translateLabel: false,
            to: '/admin/setting/batches',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Department Setting',
            translateLabel: false,
            to: '/admin/setting/departments',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Passing Year',
            translateLabel: false,
            to: '/admin/setting/passing_years',
            permissions: ['admin'],
            roles: ['admin']
          },
          {
            label: 'Email Template',
            translateLabel: false,
            to: '/admin/setting/email-template',
            permissions: ['admin'],
            roles: ['admin']
          }
        ]
      },
      // Subscription Management (ALUSAAS Addon)
      {
        icon: biBookmark,
        label: 'My Subscriptions',
        translateLabel: false,
        permissions: ['Manage Subscription'],
        roles: ['admin', 'alumni'],
        to: '/admin/subscription',
        addon: 'ALUSAAS'
      },
      // Custom Domain Management (ALUSAAS Addon)
      {
        icon: biGear,
        label: 'Domain Setting',
        translateLabel: false,
        permissions: ['Manage Custom Domain'],
        roles: ['admin'],
        to: '/admin/custom_domain',
        addon: 'ALUSAAS'
      },
      // Version Update
      {
        icon: biPower,
        label: 'Version Update',
        translateLabel: false,
        permissions: ['Manage Version Update'],
        roles: ['admin'],
        to: '/admin/version-update',
        hideIfAddon: 'ALUSAAS'
      }
    ]
  }
];