import AForm from 'ant-design-vue/es/form';

const Form = {
  name: 'a-form',
  mixins: [AForm],
};

const FormItem = {
  name: 'a-form-item',
  mixins: [AForm.Item],
};

const install = (Vue) => {
  Vue.component(Form.name, Form);
  Vue.component(FormItem.name, FormItem);
  Vue.prototype.$form = AForm;
};

Form.Item = FormItem;
Form.install = install;

export default Form;
