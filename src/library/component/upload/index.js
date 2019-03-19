import AUpload from 'ant-design-vue/es/upload';

const Upload = {
  name: 'v-upload',
  mixins: [AUpload],
};

const Dragger = {
  name: 'v-upload-dragger',
  mixins: [AUpload.Dragger],
};

const install = (Vue) => {
  Vue.component(Upload.name, Upload);
  Vue.component(Dragger.name, Dragger);
};

Upload.install = install;
Upload.Dragger = Dragger;

export default Upload;
