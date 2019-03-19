import ACheckbox from 'ant-design-vue/es/checkbox';

const Checkbox = {
  name: 'v-checkbox',
  mixins: [ACheckbox],
};

const CheckboxGroup = {
  name: 'v-checkbox-group',
  mixins: [ACheckbox.Group],
};

const install = (Vue) => {
  Vue.component(Checkbox.name, Checkbox);
  Vue.component(CheckboxGroup.name, CheckboxGroup);
};

Checkbox.install = install;
Checkbox.Group = CheckboxGroup;

export default Checkbox;
