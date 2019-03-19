<template>
  <v-layout-sider
    :class="['sider', isDesktop() ? null : 'shadow', theme, fixSiderbar ? 'ant-fixed-sidemenu' : null ]"
    width="256px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null">
    <logo/>
    <nav-menu
      :collapsed="collapsed"
      :menus="menus"
      :theme="theme"
      :mode="mode"
      @select="onSelect"
      style="padding: 16px 0px;"></nav-menu>
  </v-layout-sider>

</template>

<script>
  import Logo from './logo';
  import NavMenu from './nav-menu';
  import {mixin, mixinDevice} from '../../util/mixin';

  export default {
    name: 'side-nav-menu',
    components: {Logo, NavMenu},
    mixins: [mixin, mixinDevice],
    props: {
      mode: {
        type: String,
        required: false,
        default: 'inline',
      },
      theme: {
        type: String,
        required: false,
        default: 'dark',
      },
      collapsible: {
        type: Boolean,
        required: false,
        default: false,
      },
      collapsed: {
        type: Boolean,
        required: false,
        default: false,
      },
      menus: {
        type: Array,
        required: true,
      },
    },
    methods: {
      onSelect(obj) {
        this.$emit('menuSelect', obj);
      },
    },
  };
</script>
