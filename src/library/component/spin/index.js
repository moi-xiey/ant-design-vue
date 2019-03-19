import ASpin from 'ant-design-vue/es/spin';

ASpin.setDefaultIndicator({
  indicator: (createElement) => {
    return createElement('v-icon', {
      props: {
        type: 'loading',
      },
      style: {fontSize: '30px'},
    });
  },
});

const Spin = {
  name: 'v-spin',
  mixins: [ASpin],
};

const install = (Vue) => {
  Vue.component(Spin.name, Spin);
};

Spin.install = install;
Spin.setDefaultIndicator = ASpin.setDefaultIndicator;

export default Spin;
