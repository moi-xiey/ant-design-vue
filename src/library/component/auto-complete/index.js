import AAutoComplete from 'ant-design-vue/es/auto-complete';

const AutoComplete = {
  name: 'v-auto-complete',
  mixins: [AAutoComplete],
};

const AutoCompleteOption = {
  name: 'v-auto-complete-option',
  mixins: [AAutoComplete.Option],
};

const AutoCompleteOptGroup = {
  name: 'v-auto-complete-opt-group',
  mixins: [AAutoComplete.OptGroup],
};

const install = (Vue) => {
  Vue.component(AutoComplete.name, AutoComplete);
  Vue.component(AutoCompleteOption.name, AutoCompleteOption);
  Vue.component(AutoCompleteOptGroup.name, AutoCompleteOptGroup);
};

AutoComplete.install = install;
AutoComplete.Option = AutoCompleteOption;
AutoComplete.OptGroup = AutoCompleteOptGroup;

export default AutoComplete;
