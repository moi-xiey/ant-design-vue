<template>
  <div class="page-header-index-wide">
    <v-card :bordered="false" :bodyStyle="{ padding: '16px 0', height: '100%' }" :style="{ height: '100%' }">
      <div class="account-settings-info-main" :class="device">
        <div class="account-settings-info-left">
          <v-menu
            :mode="device == 'mobile' ? 'horizontal' : 'inline'"
            :style="{ border: '0', width: device == 'mobile' ? '560px' : 'auto'}"
            :defaultSelectedKeys="defaultSelectedKeys"
            type="inner"
            @openChange="onOpenChange"
          >
            <v-menu-item key="/account/settings/base">
              <router-link :to="{ name: 'BaseSettings' }">
                基本设置
              </router-link>
            </v-menu-item>
            <v-menu-item key="/account/settings/security">
              <router-link :to="{ name: 'SecuritySettings' }">
                安全设置
              </router-link>
            </v-menu-item>
            <v-menu-item key="/account/settings/custom">
              <router-link :to="{ name: 'CustomSettings' }">
                个性化
              </router-link>
            </v-menu-item>
            <v-menu-item key="/account/settings/binding">
              <router-link :to="{ name: 'BindingSettings' }">
                账户绑定
              </router-link>
            </v-menu-item>
            <v-menu-item key="/account/settings/notification">
              <router-link :to="{ name: 'NotificationSettings' }">
                新消息通知
              </router-link>
            </v-menu-item>
          </v-menu>
        </div>
        <div class="account-settings-info-right">
          <div class="account-settings-info-title">
            <span>{{ $route.meta.title }}</span>
          </div>
          <route-view></route-view>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
  import RouteView from '../../component/layout/route-view';
  import {mixinDevice} from '../../library/util/mixin';

  export default {
    routeConfig: {
      meta: {title: '个人设置'},
      children: [
        {
          path: '/account/settings/base',
          name: 'BaseSettings',
          component: () => import('./_setting/base'),
          meta: {title: '基本设置', hidden: true, keepAlive: true, permission: ['user']},
        },
        {
          path: '/account/settings/security',
          name: 'SecuritySettings',
          component: () => import('./_setting/security'),
          meta: {title: '安全设置', hidden: true, keepAlive: true, permission: ['user']},
        },
        {
          path: '/account/settings/custom',
          name: 'CustomSettings',
          component: () => import('./_setting/custom'),
          meta: {title: '个性化设置', hidden: true, keepAlive: true, permission: ['user']},
        },
        {
          path: '/account/settings/binding',
          name: 'BindingSettings',
          component: () => import('./_setting/binding'),
          meta: {title: '账户绑定', hidden: true, keepAlive: true, permission: ['user']},
        },
        {
          path: '/account/settings/notification',
          name: 'NotificationSettings',
          component: () => import('./_setting/notification'),
          meta: {title: '新消息通知', hidden: true, keepAlive: true, permission: ['user']},
        },
      ],
    },
    mixins: [mixinDevice],
    components: {RouteView},
    data() {
      return {
        // horizontal  inline
        mode: 'inline',

        openKeys: [],
        defaultSelectedKeys: [],

        // cropper
        preview: {},
        option: {
          img: '/avatar2.jpg',
          info: true,
          size: 1,
          outputType: 'jpeg',
          canScale: false,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 180,
          autoCropHeight: 180,
          fixedBox: true,
          // 开启宽度和高度比例
          fixed: true,
          fixedNumber: [1, 1],
        },

        pageTitle: '',
      };
    },
    created() {
      this.updateMenu();
    },
    methods: {
      onOpenChange(openKeys) {
        this.openKeys = openKeys;
      },
      updateMenu() {
        const routes = this.$route.matched.concat();
        this.defaultSelectedKeys = [routes.pop().path];
      },
    },
  };
</script>

<style lang="less" scoped>
  .account-settings-info-main {
    width: 100%;
    display: flex;
    height: 100%;
    overflow: auto;

    &.mobile {
      display: block;

      .account-settings-info-left {
        border-right: unset;
        border-bottom: 1px solid #e8e8e8;
        width: 100%;
        height: 50px;
        overflow-x: auto;
        overflow-y: scroll;
      }

      .account-settings-info-right {
        padding: 20px 40px;
      }
    }

    .account-settings-info-left {
      border-right: 1px solid #e8e8e8;
      width: 224px;
    }

    .account-settings-info-right {
      flex: 1 1;
      padding: 8px 40px;

      .account-settings-info-title {
        color: rgba(0, 0, 0, .85);
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        margin-bottom: 12px;
      }

      .account-settings-info-view {
        padding-top: 12px;
      }
    }
  }

</style>
