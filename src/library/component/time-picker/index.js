import ATimePicker from 'ant-design-vue/es/time-picker';

const TimePicker = {
  name: 'v-time-picker',
  mixins: [ATimePicker],
};

const install = (Vue) => {
  Vue.component(TimePicker.name, TimePicker);
};

TimePicker.install = install;

export default TimePicker;
