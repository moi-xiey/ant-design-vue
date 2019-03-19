import AInputNumber from 'ant-design-vue/es/input-number';

const InputNumber = {
  name: 'v-input-number',
  mixins: [AInputNumber],
};

const install = (Vue) => {
  Vue.component(InputNumber.name, InputNumber);
};

InputNumber.install = install;

export default InputNumber;
