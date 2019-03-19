import AAvatar from 'ant-design-vue/es/avatar';

const Avatar = {
  name: 'v-avatar',
  mixins: [AAvatar],
};

const install = (Vue) => {
  Vue.component(Avatar.name, Avatar);
};

Avatar.install = install;

export default Avatar;
