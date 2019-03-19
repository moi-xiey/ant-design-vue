import AAffix from 'ant-design-vue/es/affix';

const Affix = {
  name: 'v-affix',
  mixins: [AAffix],
};

const install = (Vue) => {
  Vue.component(Affix.name, Affix);
};

Affix.install = install;

export default Affix;
