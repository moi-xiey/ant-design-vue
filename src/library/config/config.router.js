import Vue from 'vue';
import Router from 'vue-router';
import BasicLayout from '../component/_layout/basic';
import DefaultSetting from './config.setting';
import Objects from '../util/objects';

let router;

const Interceptor = {
  Before: 'before',
  After: 'after',
};

const routerInterceptors = {
  // router.beforeEach 时调用
  [Interceptor.Before]: [],
  // router.afterEach 时调用
  [Interceptor.After]: [],
};

const getRoutes = (viewContext) => {

  const unWrapRoutes = [];
  const wrapRoutes = [];

  viewContext.keys().forEach(key => {
    const path = '/' + key.replace(/(^\.\/)|(\.(js|vue)$)/g, '');
    const name = path.replace(/^\//, '').replace(/\//g, '-');
    const context = viewContext(key);
    const module = context.default || context;
    const config = module.routeConfig || {};
    const route = {
      name,
      path,
      component: module,
      ...config,
    };
    // routeConfig.wrap 首页配置
    if (config.wrap === false) {
      unWrapRoutes.push(route);
    } else {
      wrapRoutes.push(route);
    }
  });
  return [unWrapRoutes, wrapRoutes];
};

const init = (setting = DefaultSetting) => {
  if (router) {
    return router;
  }

  Vue.use(Router);

  const routerSetting = setting.router;

  const {viewContext, loginUrl, ...opt} = routerSetting;

  const [unWrapRoutes, wrapRoutes] = getRoutes(viewContext);

  const routes = [
    {
      path: '/',
      component: BasicLayout,
      children: wrapRoutes,
      meta: {
        title: '首页',
        requireAuth: true,
      },
      redirect: () => {
        if (!wrapRoutes.length) {
          return loginUrl;
        }
        // routeConfig.index 首页配置
        let index = wrapRoutes.find(route => route.index);
        if (!index) {
          index = wrapRoutes[0];
        }
        return index.path;
      },
    },
    ...unWrapRoutes, {
      path: '*',
      redirect: {
        path: '/',
      },
    }];

  router = new Router({routes, ...opt});

  const buildInterceptor = (interceptors) => {
    if (!Array.isArray(interceptors) || !interceptors.length) {
      return () => void 0;
    }
    return (...args) => {
      const copyInterceptors = [...interceptors];
      let route;
      let interceptor = copyInterceptors.shift();
      while (interceptor) {
        route = interceptor(...args);
        if (route) {
          break;
        }
        interceptor = copyInterceptors.shift();
      }
      return route;
    };
  };

  router.beforeEach((to, from, next) => {
    const interceptor = buildInterceptor(routerInterceptors[Interceptor.Before]);
    let route = interceptor(to, from);
    if (route) {
      route = Objects.isString(route) ? {path: route} : route;
      next(route);
    } else {
      next();
    }
  });

  router.afterEach((to, from) => {
    const interceptor = buildInterceptor(routerInterceptors[Interceptor.After]);
    let route = interceptor(to, from);
    if (!route) {
      return;
    }
    route = Objects.isString(route) ? {path: route} : route;
    // 使用 replace 实现拦截功能
    router.replace(route);
  });

  return router;
};

const getRouter = () => {
  if (!router) {
    return init();
  }
  return router;
};

const addInterceptor = (event, interceptor) => {
  const whiteList = Object.values(Interceptor);
  if (!whiteList.includes(event)) {
    console.warn(`只支持 ${whiteList.join('/')} 事件`);
    return;
  }
  if (!Objects.isFunction(interceptor)) {
    return;
  }
  routerInterceptors[event].push(interceptor);
  return () => removeInterceptor(event, interceptor);
};

const removeInterceptor = (event, interceptor) => {
  const whiteList = Object.values(Interceptor);
  if (!whiteList.includes(event)) {
    console.warn(`只支持 ${whiteList.join('/')} 事件`);
    return;
  }
  if (!Objects.isFunction(interceptor)) {
    return;
  }
  const index = routerInterceptors[event].indexOf(interceptor);
  if (index === -1) {
    return;
  }
  routerInterceptors[event].splice(index, index, 1);
};

export default {
  init,
  getRouter,
  addInterceptor,
  removeInterceptor,
  Interceptor,
};
