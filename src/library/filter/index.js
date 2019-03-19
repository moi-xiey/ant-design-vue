import moment from 'moment';
import 'moment/locale/zh-cn';

export default {
  install: (Vue) => {

    moment.locale('zh-cn');

    Vue.filter('NumberFormat', function(value) {
      if (!value) {
        return '0';
      }
      return value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); // 将整数部分逢三一断
    });

    Vue.filter('dayjs', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
      return moment(dataStr).format(pattern);
    });

    Vue.filter('moment', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
      return moment(dataStr).format(pattern);
    });
  }
}
