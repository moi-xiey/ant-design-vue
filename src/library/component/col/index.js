import ACol from 'ant-design-vue/es/col';

const Col = {
  name: 'v-col',
  mixins: [ACol],
};

const install = (Vue) => {
  Vue.component(Col.name, Col);
};

Col.install = install;

export default Col;
