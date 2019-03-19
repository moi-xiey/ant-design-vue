<template>
  <page-layout title="IconSelector">
    <v-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <icon-selector @change="handleIconChange"/>
    </v-card>
  </page-layout>
</template>

<script>
  import IconSelector from '../../component/icon-selector';

  export default {
    routeConfig: {
      meta: {title: 'IconSelector'},
    },
    name: 'IconSelectorView',
    components: {
      IconSelector,
    },
    data() {
      return {};
    },
    methods: {
      handleIconChange(icon) {
        console.log('change Icon', icon);
        this.$message.info(<span>选中图标 <code>{icon}</code></span>);
      },
    },
  };
</script>
