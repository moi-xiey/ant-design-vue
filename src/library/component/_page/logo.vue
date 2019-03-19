<template>
  <div class="logo">
    <router-link to="/">
      <logo-svg/>
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
  import LogoSvg from '../../../asset/logo.svg?inline';

  LogoSvg.width = '32px';
  LogoSvg.height = '32px';

  export default {
    name: 'logo',
    components: {
      LogoSvg,
    },
    props: {
      title: {
        type: String,
        default: 'Ant Design Pro',
        required: false
      },
      showTitle: {
        type: Boolean,
        default: true,
        required: false
      }
    },
  };
</script>

<style lang="less" scoped>

</style>
