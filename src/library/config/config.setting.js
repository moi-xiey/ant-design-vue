import { name, version } from '../../../package';

export default {
  // 状态管理配置
  store: {
    // 持久化状态配置
    persist: {
      key: `${name}-${version}`, // 名称
      storage: localStorage, // 默认使用 localStorage 保存状态
      blackList: [], // 不保存到 storage 中
    },
    // vuex modules 配置
    modules: {},
  },
  // 路由配置
  router: {
    // eslint-disable-next-line
    viewContext: require.context('@/view', true, /^(?!.*\/_).*\.(js|vue)$/), // 路由根目录上下文. 不以"_"开始
    loginUrl: '/login', // 登录页面路径
    mode: 'hash', // hash:使用 URL hash 值来作路由; history:依赖 HTML5 History API 和服务器配置;
  },
  // 页面顶部进度条配置. https://github.com/rstacruz/nprogress#configuration
  nprogress: {
    showSpinner: false,
  },
  // axios 配置. https://github.com/axios/axios#request-config
  axios: {
    timeout: 30000,
    baseURL: process.env.VUE_APP_DOMAIN || 'http://localhost:8080', // eslint-disable-line
  },

};
