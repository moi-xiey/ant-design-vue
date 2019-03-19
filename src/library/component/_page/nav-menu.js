export default {
  name: 'nav-menu',
  props: {
    menus: {
      type: Array,
      required: true,
    },
    theme: {
      type: String,
      required: false,
      default: 'dark',
    },
    mode: {
      type: String,
      required: false,
      default: 'inline',
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: [],
    };
  },
  computed: {
    rootSubmenuKeys: vm => {
      return vm.menus.map(item => item.url ? item.url : item.id);
    },
    menuParentsMap: vm => {
      return vm.getMenuParentsMap(vm.menus);
    },
  },
  created() {
    this.updateMenu();
  },
  watch: {
    collapsed(val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys.concat();
        this.openKeys = [];
      } else {
        this.openKeys = this.cachedOpenKeys;
      }
    },
    $route: function() {
      this.updateMenu();
    },
  },
  methods: {
    getMenuParentsMap(menus, map = {}, parents = []) {
      if (!Array.isArray(menus)) {
        return map;
      }
      return menus.reduce((prev, menu) => {
        if (menu.url) {
          prev[menu.url] = parents;
        }
        if (Array.isArray(menu.children)) {
          prev = this.getMenuParentsMap(menu.children, prev, [...parents, menu.id]);
        }
        return prev;
      }, map);
    },
    renderIcon(icon) {
      if (icon === 'none' || icon === undefined) {
        return null;
      }
      return (
        <v-icon type={icon}></v-icon>
      );
    },
    renderMenuItem(menu) {
      return (
        <v-menu-item key={menu.url ? menu.url : menu.id}>
          <router-link to={menu.url}>
            {this.renderIcon(menu.icon)}
            <span>{menu.name}</span>
          </router-link>
        </v-menu-item>
      );
    },
    renderSubMenu(menu) {
      return (
        <v-sub-menu key={menu.id}>
          <span slot="title">
            {this.renderIcon(menu.icon)}
            <span>{menu.name}</span>
          </span>
          {Array.isArray(menu.children) && menu.children.map(item => this.renderItem(item))}
        </v-sub-menu>
      );
    },
    renderItem(menu) {
      if (!menu.hidden) {
        return Array.isArray(menu.children) && menu.children.length
          ? this.renderSubMenu(menu)
          : this.renderMenuItem(menu);
      }
    },
    renderMenu(menus) {
      return menus.map(menu => this.renderItem(menu));
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key));
      if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    onSelect(obj) {
      this.selectedKeys = obj.selectedKeys;
      this.$emit('select', obj);
    },
    updateMenu() {
      const url = this.$route.path;
      this.selectedKeys = [url];
      const openKeys = this.menuParentsMap[url] || [];
      this.collapsed ? (this.cachedOpenKeys = openKeys) : (this.openKeys = openKeys);
    },
  },
  render() {
    return (
      <v-menu
        theme={this.$props.theme}
        mode={this.$props.mode}
        openKeys={this.openKeys}
        selectedKeys={this.selectedKeys}
        onOpenChange={this.onOpenChange}
        onSelect={this.onSelect}
      >
        {this.renderMenu(this.menus)}
      </v-menu>
    );
  },
};
