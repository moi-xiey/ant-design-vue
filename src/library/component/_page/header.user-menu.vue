<template>
  <div class="user-wrapper">
    <span class="action">
      <v-icon type="question-circle-o"></v-icon>
    </span>
    <header-notice class="action"/>
    <v-dropdown>
      <span class="action ant-dropdown-link user-dropdown-menu">
        <v-avatar class="avatar" size="small" icon="user"/>
        <span>管理员</span>
      </span>
      <v-menu slot="overlay" class="user-dropdown-menu-wrapper">
        <v-menu-item key="0">
          <router-link :to="{ name: 'center' }">
            <v-icon type="user"/>
            <span>个人中心</span>
          </router-link>
        </v-menu-item>
        <v-menu-item key="1">
          <router-link :to="{ name: 'settings' }">
            <v-icon type="setting"/>
            <span>账户设置</span>
          </router-link>
        </v-menu-item>
        <v-menu-item key="2" disabled>
          <v-icon type="setting"/>
          <span>测试</span>
        </v-menu-item>
        <v-menu-divider/>
        <v-menu-item key="3">
          <a href="javascript:;" @click="handleLogout">
            <v-icon type="logout"/>
            <span>退出登录</span>
          </a>
        </v-menu-item>
      </v-menu>
    </v-dropdown>
  </div>
</template>

<script>
  import HeaderNotice from './header.user-menu.notice';

  export default {
    name: 'user-menu',
    components: {
      HeaderNotice,
    },
    methods: {
      handleLogout() {
        this.$confirm({
          title: '提示',
          content: '真的要注销登录吗 ?',
          onOk: () => {
            this.$store.commit('authorization', '');
            this.$router.push('/login');
          },
          onCancel() {
          },
        });
      },
    },
  };
</script>
