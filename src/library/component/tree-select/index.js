import ATreeSelect from 'ant-design-vue/es/tree-select';

const TreeSelect = {
  name: 'v-tree-select',
  mixins: [ATreeSelect],
};

const TreeNode = {
  name: 'v-tree-select-node',
  mixins: [ATreeSelect.TreeNode],
};

const install = (Vue) => {
  Vue.component(TreeSelect.name, TreeSelect);
  Vue.component(TreeNode.name, TreeNode);
};

TreeSelect.install = install;
TreeSelect.TreeNode = TreeNode;

export default TreeSelect;
