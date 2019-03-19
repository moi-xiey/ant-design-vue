<template>
  <page-layout>
    <v-card :bordered="false">
      <result :is-success="false" :title="title" :description="description">
        <template slot="action">
          <v-button type="primary">返回修改</v-button>
        </template>
        <div>
          <div style="font-size: 16px; color: rgba(0, 0, 0, 0.85); font-weight: 500; margin-bottom: 16px">
            您提交的内容有如下错误：
          </div>
          <div style="margin-bottom: 16px">
            <v-icon type="close-circle-o" style="color: #f5222d; margin-right: 8px"/>
            您的账户已被冻结
            <a style="margin-left: 16px">立即解冻
              <v-icon type="right"/>
            </a>
          </div>
          <div>
            <v-icon type="close-circle-o" style="color: #f5222d; margin-right: 8px"/>
            您的账户还不具备申请资格
            <a style="margin-left: 16px">立即升级
              <v-icon type="right"/>
            </a>
          </div>
        </div>
      </result>
    </v-card>
  </page-layout>
</template>

<script>
  import Result from '../../component/result';

  export default {
    routeConfig: {
      meta: {title: '失败'},
    },
    name: 'Error',
    components: {
      Result,
    },
    data() {
      return {
        title: '提交失败',
        description: '请核对并修改以下信息后，再重新提交。',
      };
    },
  };
</script>

<style scoped>

</style>
