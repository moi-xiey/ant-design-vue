import ARate from 'ant-design-vue/es/rate';

const Rate = {
  name: 'v-rate',
  mixins: [ARate],
};

const install = (Vue) => {
  Vue.component(Rate.name, Rate);
};

Rate.install = install;

export default Rate;
