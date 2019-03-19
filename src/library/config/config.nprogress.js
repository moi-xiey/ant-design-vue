import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router from './config.router';
import DefaultSetting from './config.setting';

const init = (setting = DefaultSetting) => {
  const nprogressSetting = setting.nprogress;

  NProgress.configure(nprogressSetting);

  Router.addInterceptor(Router.Interceptor.Before, () => {
    NProgress.start();
  });

  Router.addInterceptor(Router.Interceptor.After, () => {
    NProgress.done();
  });
};

export default {
  init,
}
