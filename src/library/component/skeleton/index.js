import ASkeleton from 'ant-design-vue/es/skeleton';

const Skeleton = {
  name: 'v-skeleton',
  mixins: [ASkeleton],
};

const install = (Vue) => {
  Vue.component(Skeleton.name, Skeleton);
};

Skeleton.install = install;

export default Skeleton;
