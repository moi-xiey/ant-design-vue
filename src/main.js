import Vue from 'vue';
import Library from './library';
import Setting from './setting';
import './component';
import './main.less';

Vue.use(Library, Setting);

Vue.config.productionTip = false;

new Vue({ template: '<v-provider/>' }).$mount('#main');
