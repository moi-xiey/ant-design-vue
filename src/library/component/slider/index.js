import ASlider from 'ant-design-vue/es/slider';

const Slider = {
  name: 'v-slider',
  mixins: [ASlider],
};

const install = (Vue) => {
  Vue.component(Slider.name, Slider);
};

Slider.install = install;

export default Slider;
