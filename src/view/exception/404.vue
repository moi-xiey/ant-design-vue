<template>
  <exception-page type="404"/>
</template>

<script>
  import ExceptionPage from './_exception-page';

  export default {
    routeConfig: {
      meta: {title: '404'},
    },
    components: {
      ExceptionPage,
    },
  };
</script>

<style scoped>

</style>
