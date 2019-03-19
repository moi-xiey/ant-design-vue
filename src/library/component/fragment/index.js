const Fragment = {
  name: 'v-fragment',
  functional: true,
  render(h, ctx) {
    return ctx.children;
  },
};

const install = (Vue) => {
  Vue.component(Fragment.name, Fragment);
};

Fragment.install = install;

export default Fragment;
