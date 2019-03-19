import AProgress from 'ant-design-vue/es/progress';

const Progress = {
  name: 'v-progress',
  mixins: [AProgress],
};

const install = (Vue) => {
  Vue.component(Progress.name, Progress);
};

Progress.install = install;

export default Progress;
