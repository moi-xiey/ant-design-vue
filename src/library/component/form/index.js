import AForm from './form';
import FormItem from './form.item';
import Objects from '../../util/objects';

const Form = {
  name: 'v-form',
  provide() {
    return {
      form: this,
    };
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    url: String,
    action: {
      type: String,
      default() {
        return this.url;
      },
    },
    method: {
      type: String,
      validator: (val) => ['get', 'post'].includes(val),
      default: 'post',
    },
    /**
     * listeners:
     *   ready 所有表单项都准备好后触发
     *   submit 触发提交事件
     *   after-submit  配置action后触发submit事件时触发提交数据完成事件
     **/
  },
  computed: {
    listeners() {
      // eslint-disable-next-line
      const {submit, ready, ...listeners} = this.$listeners;
      return listeners;
    },
  },
  methods: {
    addField(name, defaultValue = '') {
      if (!this.value.hasOwnProperty(name)) {
        this.$set(this.value, name, defaultValue);
      }
    },
    handleAction() {
      if (!this.action) {
        return;
      }
      const data = this.getFormData();
      console.log('submit data', data);
    },
    getFormData() {
      return Object.keys(this.formItems).reduce((prev, name) => {
        prev[name] = this.value[name];
        return prev;
      }, {});
    },
    getAllFields() {
      if (this.formFields) {
        return this.formFields;
      }
      const getFormFields = (components) => {
        if (!Array.isArray(components) || !components.length) {
          return [];
        }
        return components.reduce((total, component) => {
          // v-search-item mixins v-form-item
          if (['v-form-item', 'v-search-item'].includes(component.$options.name)) {
            total.push(component.name);
          } else {
            total.push(...getFormFields(component.$children));
          }
          return total;
        }, []);
      };
      this.formFields = getFormFields(this.$children);
      return this.formFields;
    },
    trigger(event, ...args) {
      if (typeof event !== 'string') {
        return;
      }
      const e = event.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
      if (!this[`onField${e}`]) {
        return;
      }
      this[`onField${e}`](...args);
    },
    onFieldPending(component) {
      const item = this.formItems[component.name] || {};
      item.ready = false;
      this.formItems[component.name] = item;
    },
    onFieldDone(component) {
      const item = this.formItems[component.name] || {};
      item.ready = true;
      this.formItems[component.name] = item;
      const formFields = this.getAllFields();
      if (formFields.length === Object.keys(this.formItems).length) {
        this.checkFieldsReady();
      }
    },
    checkFieldsReady() {
      const isPending = Object.values(this.formItems).some((item) => !item.ready);
      if (!isPending) {
        this.$emit('ready');
      }
    },
    onFieldsChange(props, fields) {
      console.log('onFieldsChange', props, fields);
    },
  },
  created() {
    // 每一个 formItem.{ ready: 是否已经ready }
    // eg: {username: {ready: true}, password: {ready: true}}
    this.formItems = {};

    this.createForm = this.$form.createForm(this, {
      onFieldsChange: this.onFieldsChange,
    });
  },
  render(createElement) {
    const formProps = {
      props: Object.assign({}, this.$attrs, {
        form: this.createForm,
      }),
      on: this.listeners,
    };
    return createElement(AForm, formProps, this.$slots.default);
  },
};

const install = (Vue) => {
  Vue.use(AForm);
  Vue.component(Form.name, Form);
  Vue.component(FormItem.name, FormItem);
};

Form.install = install;
Form.FormItem = FormItem;

export default Form;
