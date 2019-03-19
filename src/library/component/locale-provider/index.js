import ALocaleProvider from 'ant-design-vue/es/locale-provider';
import zh_CN from 'ant-design-vue/es/locale-provider/zh_CN';

const LocaleProvider = {
  name: 'v-locale-provider',
  mixins: [ALocaleProvider],
  props: {
    locale: {
      type: Object,
      default: () => zh_CN,
    }
  },
};

const install = (Vue) => {
  Vue.component(LocaleProvider.name, LocaleProvider);
};

LocaleProvider.install = install;

export default LocaleProvider;
