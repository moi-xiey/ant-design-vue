import ABreadcrumb from 'ant-design-vue/es/breadcrumb';

const Breadcrumb = {
  name: 'v-breadcrumb',
  mixins: [ABreadcrumb],
};
const BreadcrumbItem = {
  name: 'v-breadcrumb-item',
  mixins: [ABreadcrumb.Item],
};

const install = (Vue) => {
  Vue.component(Breadcrumb.name, Breadcrumb);
  Vue.component(BreadcrumbItem.name, BreadcrumbItem);
};

Breadcrumb.install = install;
Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
