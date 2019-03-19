import AForm from './form';
import Icon from '../icon';
import Tooltip from '../tooltip';
import Field from '../field';
import VType, {getInputTypeText} from './vtype';
import Objects from '../../util/objects';
import './form.item.less';

const {Item: AFormItem} = AForm;

const FormItem = {
  name: 'v-form-item',
  slots: ['label', 'help', 'extra'],
  inject: {
    form: {
      default: null,
    },
  },
  props: {
    value: null,
    name: {
      type: String,
      required: true,
    },
    label: String,
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default() {
        let input = getInputTypeText(this.type);
        return `请${input}${this.label}`;
      },
    },
    validator: [String, Array, Function],
    // tooltip 提示
    info: String,
    // v-decorator 得 options 配置. https://vue.ant.design/components/form-cn/#this.form.getFieldDecorator(id,-options)-%E5%92%8C-v-decorator=%22[id,-options]%22
    rules: Object,
    decorator: Object,
    listeners: Object,
  },
  computed: {
    props() {
      const {colon, extra, hasFeedback, help, label, labelCol, required, validateStatus, wrapperCol, ...fieldProps} = this.$attrs;
      return {
        item: {colon, extra, hasFeedback, help, label, labelCol, required, validateStatus, wrapperCol},
        field: {
          ...fieldProps,
          type: this.type,
          placeholder: this.placeholder,
        },
      };
    },
    realDecorator() {
      if (this.decorator) {
        return this.decorator;
      }
      if (this.rules) {
        return {rules: this.rules};
      }
      if (Objects.isFunction(this.validator)) {
        // this.validator(rule, value, callback)
        return {rules: [{validator: this.validator}]};
      }
      let validators = [];
      if (Objects.isString(this.validator)) {
        validators = this.validator.replace(/\s/g, '').split(',').filter(Boolean);
      } else if (Objects.isArray(this.validator) && this.validator.length) {
        validators = this.validator.filter(Boolean);
      }
      const rules = validators.reduce((rules, validator) => {
        let rule = validator;
        if (typeof validator === 'string') {
          const [type, ...args] = validator.split(':');
          rule = VType[type](this.$props, ...args);
        }
        rule && rules.push(rule);
        return rules;
      }, []);
      return rules.length ? {rules} : undefined;
    },
    realListeners() {
      return Object.assign({}, this.listeners || {}, this.$listeners || {});
    },
    isHiddenItem() {
      return this.type === 'hidden';
    },
  },
  created() {
    this.registeredField();
  },
  methods: {
    registeredField() {
      this.form && this.form.addField(this.name, this.value);
    },
    renderLabelSlot(createElement) {
      // 自定义label
      if (this.$scopedSlots.label) {
        // renderItemSlots 里有渲染自定义 label, 这里就不用渲染了
        return null;
      }
      return createElement('template', {slot: 'label'}, [
        this.label,
        this.info && createElement(Tooltip, {props: {title: this.info}}, [
          createElement(Icon, {props: {type: 'info-circle'}, class: 'info'}),
        ]),
      ]);
    },
    renderItemSlots(createElement) {
      return Object.keys(this.$scopedSlots).filter(slot => FormItem.slots.includes(slot)).map(slot => {
        return createElement('template', {slot}, this.$scopedSlots[slot]());
      });
    },
    renderFieldSlots(createElement) {
      return Object.keys(this.$scopedSlots).filter(slot => !FormItem.slots.includes(slot)).map(slot => {
        return createElement('template', {slot}, this.$scopedSlots[slot]());
      });
    },
    renderField(createElement) {
      const fieldProps = {
        attrs: this.props.field,
        props: this.props.field,
        on: this.realListeners,
      };
      if (this.form) {
        fieldProps.directives = [{
          name: 'decorator',
          value: [this.name, this.realDecorator],
        }];
        return createElement(Field, fieldProps, this.renderFieldSlots(createElement));
      }
      return createElement(Field, fieldProps, this.renderFieldSlots(createElement));
    },
    renderChildren(createElement) {
      return [
        this.renderLabelSlot(createElement),
        ...this.renderItemSlots(createElement),
        this.renderField(createElement),
      ];
    },
  },
  render(createElement) {
    const formItemProps = {
      props: this.props.item,
      class: this.isHiddenItem && 'hidden-item',
    };
    return createElement(AFormItem, formItemProps, this.renderChildren(createElement));
  },
};

export default FormItem;
