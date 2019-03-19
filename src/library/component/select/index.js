import ASelect from 'ant-design-vue/es/select';

const Select = {
  name: 'v-select',
  mixins: [ASelect],
};

const SelectOption = {
  name: 'v-select-option',
  mixins: [ASelect.Option],
};

const SelectOptGroup = {
  name: 'v-select-opt-group',
  mixins: [ASelect.OptGroup],
};

const install = (Vue) => {
  Vue.component(Select.name, Select);
  Vue.component(SelectOption.name, SelectOption);
  Vue.component(SelectOptGroup.name, SelectOptGroup);
};

Select.install = install;
Select.Option = SelectOption;
Select.OptGroup = SelectOptGroup;

export default Select;
