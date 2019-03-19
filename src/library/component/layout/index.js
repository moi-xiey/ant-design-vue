import ALayout from 'ant-design-vue/es/layout';

const Layout = {
  name: 'v-layout',
  mixins: [ALayout],
};

const Header = {
  name: 'v-layout-header',
  mixins: [ALayout.Header],
};

const Footer = {
  name: 'v-layout-footer',
  mixins: [ALayout.Footer],
};

const Content = {
  name: 'v-layout-content',
  mixins: [ALayout.Content],
};

const Sider = {
  name: 'v-layout-sider',
  mixins: [ALayout.Sider],
};

const install = (Vue) => {
  Vue.component(Layout.name, Layout);
  Vue.component(Header.name, Header);
  Vue.component(Footer.name, Footer);
  Vue.component(Content.name, Content);
  Vue.component(Sider.name, Sider);
};

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Sider = Sider;


Layout.install = install;

export default Layout;
