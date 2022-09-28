// components
import { PATH_DASHBOARD } from 'src/routes/paths';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

export const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'ダッシュボード',
    items: [
      // { title: 'One', path: '/dashboard/one', icon: ICONS.analytics }, // 分析
      // { title: 'Time Series', path: '/dashboard/two', icon: ICONS.banking },
      // { title: 'Settings', path: '/dashboard/three', icon: ICONS.booking },
      { title: 'みんなの物件', path: PATH_DASHBOARD.properties.root, icon: ICONS.banking },
      { title: '所有物件', path: PATH_DASHBOARD.myProperties.root, icon: ICONS.banking },
      // { title: 'My Property', path: '/dashboard/property', icon: ICONS.user },
      // { title: 'Settings', path: '/dashboard/settings', icon: ICONS.booking },
      // { title: 'Settings', path: '/dashboard/settings', icon: ICONS.booking },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     {
  //       title: 'user',
  //       path: '/dashboard/user',
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'Four', path: '/dashboard/user/four' },
  //         { title: 'Five', path: '/dashboard/user/five' },
  //         { title: 'Six', path: '/dashboard/user/six' },
  //       ],
  //     },
  //   ],
  // },
];

export default navConfig;
