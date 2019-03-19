import AModal from 'ant-design-vue/es/modal';

const Modal = {
  name: 'v-modal',
  mixins: [AModal],
};

const install = (Vue) => {
  Vue.component(Modal.name, Modal);
};

Modal.install = install;
Modal.info = AModal.info;
Modal.success = AModal.success;
Modal.error = AModal.error;
Modal.warning = AModal.warning;
Modal.warn = AModal.warn;
Modal.confirm = AModal.confirm;

export default Modal;
