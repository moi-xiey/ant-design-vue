import AButton from 'ant-design-vue/es/button';

const Button = {
  name: 'v-button',
  mixins: [AButton],
};

const ButtonGroup = {
  name: 'v-button-group',
  mixins: [AButton.Group],
};

const install = (Vue) => {
  Vue.component(Button.name, Button);
  Vue.component(ButtonGroup.name, ButtonGroup);
};

Button.install = install;
Button.Group = ButtonGroup;

export default Button;
