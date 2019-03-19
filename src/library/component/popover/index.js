import APopover from 'ant-design-vue/es/popover';

const Popover = {
  name: 'v-popover',
  mixins: [APopover],
};

const install = (Vue) => {
  Vue.component(Popover.name, Popover);
};

Popover.install = install;

export default Popover;
