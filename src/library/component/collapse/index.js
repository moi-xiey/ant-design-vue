import ACollapse from 'ant-design-vue/es/collapse';

const Collapse = {
  name: 'v-collapse',
  mixins: [ACollapse],
};

const CollapsePanel = {
  name: 'v-collapse-panel',
  mixins: [ACollapse.Panel],
};

const install = (Vue) => {
  Vue.component(Collapse.name, Collapse);
  Vue.component(CollapsePanel.name, CollapsePanel);
};

Collapse.install = install;
Collapse.Panel = CollapsePanel;

export default Collapse;
