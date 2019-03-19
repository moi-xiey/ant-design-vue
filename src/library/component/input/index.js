import AInput from 'ant-design-vue/es/input';

const Input = {
  name: 'v-input',
  mixins: [AInput],
  props: {
    maxlength: {
      type: Number,
      default: 10,
    },
  },
};

const InputGroup = {
  name: 'v-input-group',
  mixins: [AInput.Group],
};

const InputSearch = {
  name: 'v-input-search',
  mixins: [AInput.Search],
};

const TextArea = {
  name: 'v-textarea',
  mixins: [AInput.TextArea],
  props: {
    rows: {
      type: Number,
      default: 3,
    },
    autosize: {
      type: [Object, Boolean],
      default: () => ({minRows: 3, maxRows: 5}),
    },
  },
};

const install = (Vue) => {
  Vue.component(Input.name, Input);
  Vue.component(InputGroup.name, InputGroup);
  Vue.component(InputSearch.name, InputSearch);
  Vue.component(TextArea.name, TextArea);
};

Input.install = install;
Input.Group = InputGroup;
Input.Search = InputSearch;
Input.TextArea = TextArea;

export default Input;
