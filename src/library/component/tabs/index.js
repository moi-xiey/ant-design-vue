import ATabs from 'ant-design-vue/es/tabs';

const Tabs = {
  name: 'v-tabs',
  mixins: [ATabs],
};

const TabPanel = {
  name: 'v-tab-pane',
  mixins: [ATabs.TabPane],
};

const TabContent = {
  name: 'v-tab-content',
  mixins: [ATabs.TabPane],
};

const install = (Vue) => {
  Vue.component(Tabs.name, Tabs);
  Vue.component(TabPanel.name, TabPanel);
  Vue.component(TabContent.name, TabContent);
};

Tabs.install = install;
Tabs.TabPanel = TabPanel;
Tabs.TabContent = TabContent;

export default Tabs;
