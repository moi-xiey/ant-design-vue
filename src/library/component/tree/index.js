import ATree from 'ant-design-vue/es/tree';

const Tree = {
  name: 'v-tree',
  mixins: [ATree],
};

const TreeNode = {
  name: 'v-tree-node',
  mixins: [ATree.TreeNode],
};

const DirectoryTree = {
  name: 'v-directory-tree',
  mixins: [ATree.DirectoryTree],
};

const install = (Vue) => {
  Vue.component(Tree.name, Tree);
  Vue.component(TreeNode.name, TreeNode);
  Vue.component(DirectoryTree.name, DirectoryTree);
};

Tree.install = install;
Tree.TreeNode = TreeNode;
Tree.DirectoryTree = DirectoryTree;

export default Tree;
