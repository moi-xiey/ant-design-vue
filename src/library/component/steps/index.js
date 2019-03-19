import ASteps from 'ant-design-vue/es/steps';

const Steps = {
  name: 'v-steps',
  mixins: [ASteps],
};

const Step = {
  name: 'v-step',
  mixins: [ASteps.Step],
};

const install = (Vue) => {
  Vue.component(Steps.name, Steps);
  Vue.component(Step.name, Step);
};

Steps.install = install;
Steps.Step = Step;

export default Steps;
