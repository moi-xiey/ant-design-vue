import ADrawer from 'ant-design-vue/es/drawer';

const Drawer = {
  name: 'v-drawer',
  mixins: [ADrawer],
};

const install = (Vue) => {
  Vue.component(Drawer.name, Drawer);
};

Drawer.install = install;

export default Drawer;
