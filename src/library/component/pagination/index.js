import APagination from 'ant-design-vue/es/pagination';

const Pagination = {
  name: 'v-pagination',
  mixins: [APagination],
};

const install = (Vue) => {
  Vue.component(Pagination.name, Pagination);
};

Pagination.install = install;

export default Pagination;
