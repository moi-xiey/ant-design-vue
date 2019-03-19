import AMenu from 'ant-design-vue/es/menu';

const Menu = {
  name: 'v-menu',
  mixins: [AMenu],
};

const MenuItem = {
  name: 'v-menu-item',
  mixins: [AMenu.Item],
};

const SubMenu = {
  name: 'v-sub-menu',
  mixins: [AMenu.SubMenu],
};

const Divider = {
  name: 'v-menu-divider',
  mixins: [AMenu.Divider],
};

const MenuItemGroup = {
  name: 'v-menu-item-group',
  mixins: [AMenu.ItemGroup],
};

const install = (Vue) => {
  Vue.component(Menu.name, Menu);
  Vue.component(MenuItem.name, MenuItem);
  Vue.component(SubMenu.name, SubMenu);
  Vue.component(Divider.name, Divider);
  Vue.component(MenuItemGroup.name, MenuItemGroup);
};

Menu.install = install;

Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;
Menu.Divider = Divider;
Menu.ItemGroup = MenuItemGroup;

export default Menu;
