<template>
  <table-list title="搜索列表（文章）"/>
</template>

<script>
  import TableList from '../query-list';

  export default {
    routeConfig: {
      meta: {title: '搜索列表（文章）'},
    },
    name: 'article',
    components: {TableList},
  };
</script>

<style scoped>

</style>
