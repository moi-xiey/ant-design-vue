<template>
  <div>
    <h3>sys.menu</h3>
    <v-icon type="analyse" :style="{ fontSize: '32px' }"/>
    <v-icon type="user" :style="{ fontSize: '32px' }"/>
    <p>
      sadasdas
    </p>
  </div>
</template>

<script>
  export default {
    routeConfig: {
      meta: {
        title: "菜单管理",
      },
    },
    name: 'sys-menu',
    methods: {
      click() {
        console.log('clicked');
      },
    },
  };
</script>

<style scoped>

</style>
