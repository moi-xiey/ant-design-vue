import Axios from './library/config/config.axios';
import Store from './library/config/config.store';
import Router from './library/config/config.router';
import UserData from './asset/data/user';

Axios.addInterceptor(Axios.Interceptor.RequestSuccess, (request) => {
  // 1. 添加 token header
  return request;
});

Axios.addInterceptor(Axios.Interceptor.ResponseSuccess, (response) => {
  const {code = 0} = response.data;
  switch (code) {
    case 401:
      // httpStatus 401 处理
      break;
  }
  return response.data;
});

Router.addInterceptor(Router.Interceptor.Before, (to) => {
  const store = Store.getStore();
  // 没有登录 token
  if (to.matched.some((r) => r.meta.requireAuth) && !store.state.user.authorization) {
    // 退出登录
    return 'login';
  }
});

// 参见 src/library/config/config.setting.js 进行自定义配置
export default {
  store: {
    modules: {
      user: {
        state: {...UserData},
        mutations: {
          // store.commit('authorization', data);
          authorization(state, authorization) {
            state.authorization = authorization;
          },
        },
        getters: {
          userInfo: state => state.info,
          nickname: state => state.name,
          welcome: state => state.welcome,
          avatar: state => state.avatar,
        },
      },
    },
  },
  theme: {
    primaryColor: '#1890FF', // primary color of ant design
    navTheme: 'dark', // theme for nav menu
    layout: 'sidemenu', // nav menu position: sidemenu or topmenu
    contentWidth: 'Fixed', // layout of content: Fluid or Fixed, only works when layout is topmenu
    fixedHeader: false, // sticky header
    fixSiderbar: false, // sticky siderbar
    autoHideHeader: false, //  auto hide header
    colorWeak: false,
    multiTab: false,
  },
};
