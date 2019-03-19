<template>
  <page-layout :title="title">
    <v-card :bordered="false">
      <component @onEdit="handleEdit" @onGoBack="handleGoBack" :record="record" :is="currentComponent"></component>
    </v-card>
  </page-layout>
</template>

<script>
  // 动态切换组件
  import List from './_table/list';
  import Edit from './_table/edit';

  export default {
    routeConfig: {
      meta: {title: '查询表格'},
    },
    name: 'TableListWrapper',
    components: {
      List,
      Edit,
    },
    props: {
      title: {
        type: String,
        default: '查询表格',
      },
    },
    data() {
      return {
        currentComponent: 'List',
        record: '',
      };
    },
    created() {

    },
    methods: {
      handleEdit(record) {
        this.record = record;
        this.currentComponent = 'Edit';
        console.log(record);
      },
      handleGoBack() {
        this.record = '';
        this.currentComponent = 'List';
      },
    },
    watch: {
      '$route.path'() {
        this.record = '';
        this.currentComponent = 'List';
      },
    },
  };
</script>
