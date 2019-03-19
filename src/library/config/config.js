import Objects from '../util/objects';
import DefaultSetting from './config.setting';
import Axios from './config.axios';
import Store from './config.store';
import Router from './config.router';
import NProgress from './config.nprogress';

export default {
  init: (config = {}) => {
    config = Objects.isObject(config) ? config : {};
    const setting = Objects.merge({}, DefaultSetting, config);

    Axios.init(setting);
    Store.init(setting);
    Router.init(setting);
    NProgress.init(setting);
  },
};
