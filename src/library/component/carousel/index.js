import ACarousel from 'ant-design-vue/es/carousel';

const Carousel = {
  name: 'v-carousel',
  mixins: [ACarousel],
};

const install = (Vue) => {
  Vue.component(Carousel.name, Carousel);
};

Carousel.install = install;

export default Carousel;
