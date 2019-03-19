import AAnchor from 'ant-design-vue/es/anchor';

const Anchor = {
  name: 'v-anchor',
  mixins: [AAnchor],
};

const AnchorLink = {
  name: 'v-anchor-link',
  mixins: [AAnchor.Link],
};

const install = (Vue) => {
  Vue.component(Anchor.name, Anchor);
  Vue.component(AnchorLink.name, AnchorLink);
};

Anchor.install = install;
Anchor.Link = AnchorLink;

export default Anchor;
