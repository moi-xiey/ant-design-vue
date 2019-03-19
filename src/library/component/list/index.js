import AList from 'ant-design-vue/es/list';

const List = {
  name: 'v-list',
  mixins: [AList],
};

const ListItem = {
  name: 'v-list-item',
  mixins: [AList.Item],
};

const ListItemMeta = {
  name: 'v-list-item-meta',
  mixins: [AList.Item.Meta],
};

const install = (Vue) => {
  Vue.component(List.name, List);
  Vue.component(ListItem.name, ListItem);
  Vue.component(ListItemMeta.name, ListItemMeta);
};

List.install = install;
List.Item = ListItem;
List.Item.Meta = ListItemMeta;

export default List;
