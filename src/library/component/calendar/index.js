import ACalendar from 'ant-design-vue/es/calendar';

const Calendar = {
  name: 'v-calendar',
  mixins: [ACalendar],
};

const install = (Vue) => {
  Vue.component(Calendar.name, Calendar);
};

Calendar.install = install;

export default Calendar;
