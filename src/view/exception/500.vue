<template>
  <exception-page type="500"/>
</template>

<script>
  import ExceptionPage from './_exception-page';

  export default {
    routeConfig: {
      meta: {title: '500'},
    },
    components: {
      ExceptionPage,
    },
  };
</script>

<style scoped>

</style>
