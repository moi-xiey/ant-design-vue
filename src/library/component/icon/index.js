import AIcon from 'ant-design-vue/es/icon';
import Objects from '../../util/objects';

const VIcon = {
  mixins: [AIcon],
  // 也许会改一下默认配置
};

/**
 * type 支持自定义 svg 图标
 */
const Icon = {
  IconSet: new Map(),
  name: 'v-icon',
  functional: true,
  inheritAttrs: false,
  render(createElement, context) {
    const {type} = context.props || {};
    if (type && Icon.IconSet.has(type)) {
      // 重置 type, 设置 component 方式
      const data = Objects.merge({}, context.data, {props: {type: undefined, component: Icon.IconSet.get(type)}});
      return createElement(VIcon, data);
    }
    return createElement(VIcon, context.data, context.children);
  },
};

// src/asset/svg 目录下所有的 svg 图标(不包含子目录:命名不好规范)
// eslint-disable-next-line
const svgIconContext = require.context('@/asset/svg', false, /\.(svg)$/);

/**
 * 把 @/asset/svg 目录下的 svg 以组件方式缓存到 IconSet 中
 */
const initIconSet = () => {
  svgIconContext.keys().forEach(key => {
    // eslint-disable-next-line
    const module = require(`@/asset/svg${key.replace(/^\./, '')}?inline`);
    const name = key.replace(/^\.\//, '').replace(/\.svg$/, '');
    const Component = module.default || module;
    Icon.IconSet.set(name, Component);
  });
};

initIconSet();

const install = (Vue) => {
  Vue.component(Icon.name, Icon);
};

Icon.install = install;
Icon.createFromIconfontCN = AIcon.createFromIconfontCN;
Icon.getTwoToneColor = AIcon.getTwoToneColor;
Icon.setTwoToneColor = AIcon.setTwoToneColor;

export default Icon;
