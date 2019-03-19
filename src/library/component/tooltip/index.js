import AToolTip from 'ant-design-vue/es/tooltip';

const ToolTip = {
  name: 'tooltip',
  mixins: [AToolTip],
};

const install = (Vue) => {
  Vue.component(ToolTip.name, ToolTip);
};

ToolTip.install = install;

export default ToolTip;
