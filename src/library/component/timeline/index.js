import ATimeline from 'ant-design-vue/es/timeline';

const Timeline = {
  name: 'v-timeline',
  mixins: [ATimeline],
};

const TimelineItem = {
  name: 'v-timeline-item',
  mixins: [ATimeline.Item],
};

const install = (Vue) => {
  Vue.component(Timeline.name, Timeline);
  Vue.component(TimelineItem.name, TimelineItem);
};

Timeline.install = install;
Timeline.Item = TimelineItem;

export default Timeline;
