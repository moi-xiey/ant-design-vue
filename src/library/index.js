import Viser from 'viser-vue';
import Filter from './filter';
import Component from './component';
import Config from './config/config';

export default {
  install: (Vue, opt) => {

    Config.init(opt);

    Vue.use(Filter, opt);

    Vue.use(Component, opt);

    Vue.use(Viser);
  },
};
