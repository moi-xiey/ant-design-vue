import ASwitch from 'ant-design-vue/es/switch';

const Switch = {
  name: 'v-switch',
  mixins: [ASwitch],
};

const install = (Vue) => {
  Vue.component(Switch.name, Switch);
};

Switch.install = install;

export default Switch;
