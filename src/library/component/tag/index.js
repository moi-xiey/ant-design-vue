import ATag from 'ant-design-vue/es/tag';

const Tag = {
  name: 'v-tag',
  mixins: [ATag],
};

const CheckableTag = {
  name: 'v-checkable-tag',
  mixins: [ATag.CheckableTag],
};

const install = (Vue) => {
  Vue.component(Tag.name, Tag);
  Vue.component(CheckableTag.name, CheckableTag);
};

Tag.install = install;
Tag.CheckableTag = CheckableTag;

export default Tag;
