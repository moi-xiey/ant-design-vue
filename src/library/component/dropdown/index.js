import ADropdown from 'ant-design-vue/es/dropdown';

const Dropdown = {
  name: 'v-dropdown',
  mixins: [ADropdown],
};

const DropdownButton = {
  name: 'v-dropdown-button',
  mixins: [ADropdown.Button],
};

Dropdown.Button = DropdownButton;

const install = (Vue) => {
  Vue.component(Dropdown.name, Dropdown);
  Vue.component(DropdownButton.name, DropdownButton);
};

Dropdown.install = install;

export default Dropdown;
