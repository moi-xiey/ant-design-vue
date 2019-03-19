import ACard from 'ant-design-vue/es/card';

const Card = {
  name: 'v-card',
  mixins: [ACard],
};

const CardMeta = {
  name: 'v-card-meta',
  mixins: [ACard.Meta],
};

const CardGrid = {
  name: 'v-card-grid',
  mixins: [ACard.Grid],
};

const install = (Vue) => {
  Vue.component(Card.name, Card);
  Vue.component(CardMeta.name, CardMeta);
  Vue.component(CardGrid.name, CardGrid);
};

Card.install = install;
Card.Meta = CardMeta;
Card.Grid = CardGrid;

export default Card;

