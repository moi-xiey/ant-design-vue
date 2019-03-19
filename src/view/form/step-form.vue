<template>
  <page-layout title="分步表单" desc="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。">
    <v-card :bordered="false">
      <v-steps class="steps" :current="currentTab">
        <v-step title="填写转账信息"/>
        <v-step title="确认转账信息"/>
        <v-step title="完成"/>
      </v-steps>
      <div class="content">
        <step1 v-if="currentTab === 0" @nextStep="nextStep"/>
        <step2 v-if="currentTab === 1" @nextStep="nextStep" @prevStep="prevStep"/>
        <step3 v-if="currentTab === 2" @prevStep="prevStep" @finish="finish"/>
      </div>
    </v-card>
  </page-layout>
</template>

<script>
  import Step1 from './_step1';
  import Step2 from './_step2';
  import Step3 from './_step3';

  export default {
    routeConfig: {
      meta: {title: '分步表单'},
    },
    name: 'StepForm',
    components: {
      Step1,
      Step2,
      Step3,
    },
    data() {
      return {
        description: '将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。',
        currentTab: 0,

        // form
        form: null,
      };
    },
    methods: {

      // handler
      nextStep() {
        if (this.currentTab < 2) {
          this.currentTab += 1;
        }
      },
      prevStep() {
        if (this.currentTab > 0) {
          this.currentTab -= 1;
        }
      },
      finish() {
        this.currentTab = 0;
      },
    },
  };
</script>

<style lang="less" scoped>
  .steps {
    max-width: 750px;
    margin: 16px auto;
  }
</style>
