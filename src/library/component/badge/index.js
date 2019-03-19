import ABadge from 'ant-design-vue/es/badge';

const Badge = {
  name: 'v-badge',
  mixins: [ABadge],
};

const install = (Vue) => {
  Vue.component(Badge.name, Badge);
};

Badge.install = install;

export default Badge;
