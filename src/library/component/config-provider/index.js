import AConfigProvider from 'ant-design-vue/es/config-provider';

const ConfigProvider = {
  name: 'v-config-provider',
  mixins: [AConfigProvider],
};

const install = (Vue) => {
  Vue.component(ConfigProvider.name, ConfigProvider);
};

ConfigProvider.install = install;

export default ConfigProvider;
