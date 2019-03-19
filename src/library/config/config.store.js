import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import Objects from '../util/objects';
import DefaultSetting from './config.setting';
import app from './config.store.app';

let store;
const modules = {app};

const initPersistPlugin = (config) => {
  const blackList = config.blackList;
  return new VuexPersistence({
    ...config,
    reducer(persistedState) {
      const stateFilter = Object.assign({}, persistedState);
      blackList.forEach((item) => {
        delete stateFilter[item];
      });
      return stateFilter;
    },
  });
};

const init = (setting = DefaultSetting) => {
  if (store) {
    return store;
  }
  Vue.use(Vuex);

  const storeSetting = setting.store;

  const {persist, ...opt} = storeSetting;

  const persistPlugin = initPersistPlugin(persist);

  store = new Vuex.Store({
    ...Objects.merge({}, {modules}, opt),
    plugins: [persistPlugin.plugin],
  });

  return store;
};

const getStore = () => {
  if (!store) {
    return init();
  }
  return store;
};

const addModule = (name, module) => {
  console.log('addModule', name, module);
  if (Objects.hasProp(modules, name)) {
    console.warn(`already has ${name} module`);
    return;
  }
  modules[name] = module;
};

export default {
  init,
  getStore,
  addModule,
};
