<template>
  <v-layout-header v-if="!headerBarFixed" :class="[fixedHeader && 'ant-header-fixedHeader', sidebarOpened ? 'ant-header-side-opened' : 'ant-header-side-closed', ]" :style="{ padding: '0' }">
    <div v-if="mode === 'sidemenu'" class="header">
      <v-icon
        v-if="device==='mobile'"
        class="trigger"
        :type="collapsed ? 'menu-fold' : 'menu-unfold'"
        @click="toggle"></v-icon>
      <v-icon
        v-else
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="toggle"/>

      <user-menu/>
    </div>
    <div v-else :class="['top-nav-header-index', theme]">
      <div class="header-index-wide">
        <div class="header-index-left">
          <logo class="top-nav-header" :show-title="device !== 'mobile'" />
          <nav-menu
            v-if="device !== 'mobile'"
            mode="horizontal"
            :menus="menus"
            :theme="theme"
          ></nav-menu>
          <v-icon
            v-else
            class="trigger"
            :type="collapsed ? 'menu-fold' : 'menu-unfold'"
            @click="toggle"></v-icon>
        </div>
        <user-menu class="header-index-right"/>
      </div>
    </div>
  </v-layout-header>
</template>

<script>
  import {throttle} from 'lodash';
  import {mixin} from '../../util/mixin';
  import Logo from './logo';
  import NavMenu from './nav-menu';
  import UserMenu from './header.user-menu';

  export default {
    name: 'page-header',
    mixins: [mixin],
    components: {
      Logo,
      NavMenu,
      UserMenu,
    },
    props: {
      mode: {
        type: String,
        // sidemenu, topmenu
        default: 'sidemenu'
      },
      menus: {
        type: Array,
        required: true
      },
      theme: {
        type: String,
        required: false,
        default: 'dark'
      },
      collapsed: {
        type: Boolean,
        required: false,
        default: false
      },
      device: {
        type: String,
        required: false,
        default: 'desktop'
      },
    },
    data() {
      return {
        headerBarFixed: false,
      };
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll: throttle(function() {
        if (this.autoHideHeader) {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          this.headerBarFixed = scrollTop > 100;
        } else {
          this.headerBarFixed = false
        }
      }, 200),
      toggle () {
        this.$emit('toggle')
      }
    }
  };
</script>

<style lang="less" scoped>
  .page-header {
    background: #fff;
    padding: 0;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .user-wrapper {
      float: right;
      height: 100%;
      padding-right: 12px;
    }

    .action {
      cursor: pointer;
      padding: 0 12px;
      display: inline-block;
      transition: all .3s;
      height: 100%;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }

      .avatar {
        font-size: 18px;
        padding: 4px 8px 4px 4px;
        vertical-align: middle;
      }

      .icon {
        font-size: 16px;
        padding: 4px;
      }
    }
  }
</style>
