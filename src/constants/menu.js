import { adminRoot, UserRole } from './defaultValues';
import { getCurrentUser } from '../helpers/Utils';

// const data = [
//   {
//     id: 'gogo',
//     icon: 'iconsminds-air-balloon-1',
//     label: 'menu.gogo',
//     to: `${adminRoot}/gogo`,
//     subs: [
//       {
//         icon: 'simple-icon-paper-plane',
//         label: 'menu.start',
//         to: `${adminRoot}/gogo/start`,
//       },
//     ],
//   },
//   {
//     id: 'secondmenu',
//     icon: 'iconsminds-three-arrow-fork',
//     label: 'menu.second-menu',
//     to: `${adminRoot}/second-menu`,
//     // roles: [UserRole.Admin, UserRole.Editor],
//     subs: [
//       {
//         icon: 'simple-icon-paper-plane',
//         label: 'menu.second',
//         to: `${adminRoot}/second-menu/second`,
//       },
//     ],
//   },
//   {
//     id: 'blankpage',
//     icon: 'iconsminds-bucket',
//     label: 'menu.blank-page',
//     to: `${adminRoot}/blank-page`,
//   },
//   {
//     id: 'docs',
//     icon: 'iconsminds-library',
//     label: 'menu.docs',
//     to: 'https://gogo-react-docs.coloredstrategies.com/',
//     newWindow: true,
//   },
// ];


const dataMer = [
  {
    id: 'dashboards',
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboards',
    to: `${adminRoot}/home`,
    // subs: [
    //   {
    //     icon: 'simple-icon-briefcase',
    //     label: 'menu.default',
    //     to: `${adminRoot}/home/default`,
    //     // roles: [UserRole.Admin],
    //   },
    //   {
    //     icon: 'simple-icon-pie-chart',
    //     label: 'menu.analytics',
    //     to: `${adminRoot}/home/analytics`,
    //     // roles: [UserRole.Admin],
    //   },
    //   {
    //     icon: 'simple-icon-basket-loaded',
    //     label: 'menu.ecommerce',
    //     to: `${adminRoot}/home/ecommerce`,
    //     // roles: [UserRole.Editor],
    //   },
    //   {
    //     icon: 'simple-icon-doc',
    //     label: 'menu.content',
    //     to: `${adminRoot}/home/content`,
    //     // roles: [UserRole.Editor],
    //   }
    // ],
  },
  {
    id: 'transactions',
    icon: 'iconsminds-formula',
    label: 'menu.transactions',
    to: `${adminRoot}/transactions`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [],
  },
  {
    id: 'finance',
    icon: 'simple-icon-chart',
    label: 'menu.finance',
    to: `${adminRoot}/finance`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
            {
              icon: 'simple-icon-paper-plane',
              label: 'menu.topup',
              to: `${adminRoot}/wallet`,
            },
            {
              icon: 'simple-icon-paper-plane',
              label: 'menu.payout',
              to: `${adminRoot}/wallet`,
            },
    ],
  },
  // {
  //   id: 'musers',
  //   icon: 'iconsminds-bucket',
  //   label: 'menu.users',
  //   to: `${adminRoot}/users`,
  //   // roles: [UserRole.Merchant],
  // },
  {
    id: 'msub-accounts',
    icon: 'simple-icon-layers',
    label: 'menu.sub-accounts',
    to: `${adminRoot}/sub-accounts`,
    // roles: [UserRole.Merchant],
  },
  {
    id: 'customers',
    icon: 'simple-icon-people',
    label: 'menu.customers',
    to: `${adminRoot}/customers`,
  },
  {
    id: 'msettings',
    icon: 'iconsminds-gear',
    label: 'menu.settings',
    to: `${adminRoot}/settings`,
  },
  {
    id: 'developers',
    icon: 'iconsminds-bucket',
    label: 'menu.developers',
    to: `https://icadpay.com/developers/index.html`,
    // roles: [UserRole.Merchant],
    newWindow: true
  },
  // {
  //   id: 'docs',
  //   icon: 'iconsminds-library',
  //   label: 'menu.docs',
  //   to: 'https://gogo-react-docs.coloredstrategies.com/',
  //   newWindow: true,
  // },
];

const dataAdmin = [
  {
    id: 'dashboards',
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboards',
    to: `${adminRoot}/home`,
    // subs: [
    //   {
    //     icon: 'simple-icon-briefcase',
    //     label: 'menu.default',
    //     to: `${adminRoot}/home/default`,
    //     // roles: [UserRole.Admin],
    //   },
    //   {
    //     icon: 'simple-icon-pie-chart',
    //     label: 'menu.analytics',
    //     to: `${adminRoot}/home/analytics`,
    //     // roles: [UserRole.Admin],
    //   },
    //   {
    //     icon: 'simple-icon-basket-loaded',
    //     label: 'menu.ecommerce',
    //     to: `${adminRoot}/home/ecommerce`,
    //     // roles: [UserRole.Editor],
    //   },
    //   {
    //     icon: 'simple-icon-doc',
    //     label: 'menu.content',
    //     to: `${adminRoot}/home/content`,
    //     // roles: [UserRole.Editor],
    //   }
    // ],
  },
  {
    id: 'transactions',
    icon: 'iconsminds-three-arrow-fork',
    label: 'menu.transactions',
    to: `${adminRoot}/transactions`,
    // to: `${adminRoot}/#`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [],
  },
  {
    id: 'finance',
    icon: 'simple-icon-chart',
    label: 'menu.finance',
    to: `${adminRoot}/finance`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
            {
              icon: 'simple-icon-paper-plane',
              label: 'menu.topup',
              // to: `${adminRoot}/finance/top-ups`,
              to: `${adminRoot}/settled-transactions`,
            },
            {
              icon: 'simple-icon-paper-plane',
              label: 'menu.payout',
              // to: `${adminRoot}/finance/payouts`,
              to: `${adminRoot}/out-payments`,
            },
    ],
  },
  {
    id: 'merchants',
    icon: 'simple-icon-layers',
    label: 'menu.merchants',
    to: `${adminRoot}/merchants`,
    roles: [UserRole.Admin],
    // subs: [
    //   {
    //     icon: 'iconsminds-bucket',
    //     label: 'menu.merchants',
    //     to: `${adminRoot}/merchants`,
    //     // roles: [UserRole.Admin],
    //   },
    //   {
    //     icon: 'iconsminds-bucket',
    //     label: 'menu.sub-accounts',
    //     to: `${adminRoot}/sub-accounts`,
    //     // roles: [UserRole.Admin],
    //   },
    // ]
  },
  {
    id: 'users',
    icon: 'simple-icon-people',
    label: 'menu.users',
    to: `${adminRoot}/users`,
    roles: [UserRole.Admin],
    subs: [
      {
        icon: 'iconsminds-bucket',
        label: 'menu.app-users',
        to: `${adminRoot}/users`,
        roles: [UserRole.Admin],
      },
      {
        icon: 'iconsminds-bucket',
        label: 'menu.admin-users',
        to: `${adminRoot}/admin-users`,
        roles: [UserRole.Admin],
      },
    ]
  },
  // {
  //   id: 'musers',
  //   icon: 'iconsminds-bucket',
  //   label: 'menu.users',
  //   to: `${adminRoot}/users`,
  //   roles: [UserRole.Merchant],
  // },
  {
    id: 'sub-accounts',
    icon: 'simple-icon-layers',
    label: 'menu.sub-accounts',
    to: `${adminRoot}/sub-accounts`,
    roles: [UserRole.Merchant],
  },
  {
    id: 'customers',
    icon: 'simple-icon-people',
    label: 'menu.customers',
    // to: `${adminRoot}/customers`,
    to: `${adminRoot}/#`,
  },
  {
    id: 'billing',
    icon: 'iconsminds-billing',
    label: 'menu.billing',
    to: `${adminRoot}/#`,
    roles: [UserRole.Admin],
  },
  {
    id: 'developers',
    icon: 'iconsminds-bucket',
    label: 'menu.developers',
    to: `${adminRoot}/#`,
    roles: [UserRole.Merchant],
    newWindow: true
  },
  {
    id: 'profile',
    icon: 'iconsminds-gear',
    label: 'menu.profile',
    to: `${adminRoot}/profile`,
  }
  // {
  //   id: 'docs',
  //   icon: 'iconsminds-library',
  //   label: 'menu.docs',
  //   to: 'https://gogo-react-docs.coloredstrategies.com/',
  //   newWindow: true,
  // },
];
const currentUser = getCurrentUser();
const data = currentUser.role === UserRole.Admin ? dataAdmin : dataMer;
export default data;
