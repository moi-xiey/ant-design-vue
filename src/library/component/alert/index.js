import AAlert from 'ant-design-vue/es/alert';

const Alert = {
  name: 'v-alert',
  mixins: [AAlert],
};

const install = (Vue) => {
  Vue.component(Alert.name, Alert);
};

Alert.install = install;

export default Alert;
