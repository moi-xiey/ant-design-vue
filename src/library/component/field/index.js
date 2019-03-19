import Objects from '../../util/objects';
import TextField from './text';
import HiddenField from './hidden';

const FieldSet = {
  text: TextField,
};

/**
 *
 * @param type {string}
 * @param field
 */
export const registerField = (type, field) => {
  if (Objects.hasProp(FieldSet, type)) {
    console.warn(`already have a ${type} field`);
    return;
  }
  FieldSet[type] = field;
};

const registerDefaultField = () => {
  registerField('hidden', HiddenField);
};

registerDefaultField();

const renderSlots = (createElement, scopedSlots) => {
  return Object.keys(scopedSlots).map(slot => {
    return createElement('template', {slot}, scopedSlots[slot]());
  });
};

const Field =  {
  name: 'v-field',
  functional: true,
  render(createElement, context) {
    const {type} = context.props;
    const field = FieldSet[type];
    if (field) {
      return createElement(field, context.data, renderSlots(createElement, context.scopedSlots));
    } else {
      // 默认 TextField
      return createElement(TextField, context.data, renderSlots(createElement, context.scopedSlots));
    }
  },
};

const install = (Vue) => {
  Vue.component(Field.name, Field);
};

Field.install = install;
Field.registerField = registerField;

export default Field;
