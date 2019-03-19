import ARadio from 'ant-design-vue/es/radio';

const Radio = {
  name: 'v-radio',
  mixins: [ARadio],
};

const RadioGroup = {
  name: 'v-radio-group',
  mixins: [ARadio.Group],
};

const RadioButton = {
  name: 'v-radio-button',
  mixins: [ARadio.Button],
};

const install = (Vue) => {
  Vue.component(Radio.name, Radio);
  Vue.component(RadioGroup.name, RadioGroup);
  Vue.component(RadioButton.name, RadioButton);
};

Radio.install = install;
Radio.Group = RadioGroup;
Radio.Button = RadioButton;

export default Radio;
