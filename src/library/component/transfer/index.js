import ATransfer from 'ant-design-vue/es/transfer';

const Transfer = {
  name: 'v-transfer',
  mixins: [ATransfer],
};

const install = (Vue) => {
  Vue.component(Transfer.name, Transfer);
};

Transfer.install = install;

export default Transfer;
