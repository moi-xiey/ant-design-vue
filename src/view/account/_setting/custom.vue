<script>
  import {colorList} from '../../../library/component/_setting/setting';
  import {mixin} from '../../../library/util/mixin';

  export default {
    mixins: [mixin],
    data() {
      return {};
    },
    filters: {
      themeFilter(theme) {
        const themeMap = {
          'dark': '暗色',
          'light': '白色',
        };
        return themeMap[theme];
      },
    },
    methods: {
      colorFilter(color) {
        const c = colorList.filter(o => o.color === color)[0];
        return c && c.key;
      },

      onChange(checked) {
        if (checked) {
          this.$store.commit('app/TOGGLE_THEME', 'dark');
        } else {
          this.$store.commit('app/TOGGLE_THEME', 'light');
        }
      },
    },
    render() {
      return (
        <v-list itemLayout="horizontal">
          <v-list-item>
            <v-list-item-meta>
              <a slot="title">风格配色</a>
              <span slot="description">
                整体风格配色设置
            </span>
            </v-list-item-meta>
            <div slot="actions">
              <v-switch checkedChildren="暗色" unCheckedChildren="白色" defaultChecked={this.navTheme === 'dark' && true || false} onChange={this.onChange}/>
            </div>
          </v-list-item>
          <v-list-item>
            <v-list-item-meta>
              <a slot="title">主题色</a>
              <span slot="description">
                页面风格配色： <a domPropsInnerHTML={this.colorFilter(this.primaryColor)}/>
            </span>
            </v-list-item-meta>
          </v-list-item>
        </v-list>
      );
    },
  };
</script>

<style scoped>

</style>
