import ADatePicker from 'ant-design-vue/es/date-picker';

const DatePicker = {
  name: 'v-date-picker',
  mixins: [ADatePicker],
};

const RangePicker = {
  name: 'v-range-picker',
  mixins: [ADatePicker.RangePicker],
};

const MonthPicker = {
  name: 'v-month-picker',
  mixins: [ADatePicker.MonthPicker],
};

const WeekPicker = {
  name: 'v-week-picker',
  mixins: [ADatePicker.WeekPicker],
};

const install = (Vue) => {
  Vue.component(DatePicker.name, DatePicker);
  Vue.component(RangePicker.name, RangePicker);
  Vue.component(MonthPicker.name, MonthPicker);
  Vue.component(WeekPicker.name, WeekPicker);
};

DatePicker.install = install;
DatePicker.RangePicker = RangePicker;
DatePicker.MonthPicker = MonthPicker;
DatePicker.WeekPicker = WeekPicker;

export default DatePicker;
