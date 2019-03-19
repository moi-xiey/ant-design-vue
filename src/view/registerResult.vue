<template>
  <user-layout>
    <result
      :isSuccess="true"
      :content="false"
      :title="email"
      :description="description">

      <template slot="action">
        <v-button size="large" type="primary">查看邮箱</v-button>
        <v-button size="large" style="margin-left: 8px" @click="goHomeHandle">返回首页</v-button>
      </template>

    </result>
  </user-layout>
</template>

<script>
  import Result from '@/component/result';

  export default {
    routeConfig: {
      wrap: false,
    },
    name: 'RegisterResult',
    components: {
      Result,
    },
    data() {
      return {
        description: '激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。',
        form: {},
      };
    },
    computed: {
      email() {
        const v = this.form && this.form.email || 'xxx';
        const title = `你的账户：${v} 注册成功`;
        return title;
      },
    },
    created() {
      this.form = this.$route.params;
    },
    methods: {
      goHomeHandle() {
        this.$router.push({name: 'login'});
      },
    },
  };
</script>

<style scoped>

</style>
