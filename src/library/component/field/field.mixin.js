export default {
  inheritAttrs: false,
  inject: {
    form: {
      default: null,
    },
  },
  props: {
    value: null,
    name: null,
    type: null,
  },
  computed: {
    _listeners() {
      // 重写了 input 和 change 事件(如果需要重写 onChange 事件则: v-on="_listeners", 否则使用 v-on="$listeners")
      // eslint-disable-next-line
      const {change, input, ...listeners} = this.$listeners;
      return listeners;
    },
  },
  created() {
    this.pending();
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.done();
    },
    // 通知 uiForm 该 filed 开始初始化. 自动在 create 生命周期执行
    pending() {
      if (!this.form) {
        return;
      }
      this.form.trigger('pending', this);
    },
    // 通知 uiForm 该 filed 初始化完成. 若需手动调用执行则重写 init 方法
    done() {
      if (!this.form) {
        return;
      }
      this.$nextTick(() => this.form.trigger('done', this));
      this.$emit('ready');
    },
    emitChange(...args) {
      this.$emit('input', ...args);
      this.$emit('change', ...args);
    },
    onChange(val) {
      this.emitChange(val);
    },
  },
};
