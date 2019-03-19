import AComment from 'ant-design-vue/es/comment';

const Comment = {
  name: 'v-comment',
  mixins: [AComment],
};

const install = (Vue) => {
  Vue.component(Comment.name, Comment);
};

Comment.install = install;

export default Comment;
