<template>
  <exception-page type="403"/>
</template>

<script>
  import ExceptionPage from './_exception-page';

  export default {
    routeConfig: {
      meta: {title: '403'},
    },
    components: {
      ExceptionPage,
    },
  };
</script>

<style scoped>

</style>
