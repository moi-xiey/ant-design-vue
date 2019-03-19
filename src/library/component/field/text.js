import Input from '../input';
import FieldMixin from './field.mixin';

export default {
  name: 'v-field-text',
  mixins: [FieldMixin, Input],
  mounted() {
    console.log('text mounted', this);
  },
}
