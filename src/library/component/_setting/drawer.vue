<template>
  <div class="setting-drawer" ref="settingDrawer">
    <v-drawer
      width="300"
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      :getContainer="() => $refs.settingDrawer"
      :style="{}"
    >
      <div class="setting-drawer-index-content">

        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">整体风格设置</h3>

          <div class="setting-drawer-index-blockChecbox">
            <tooltip>
              <template slot="title">
                暗色菜单风格
              </template>
              <div class="setting-drawer-index-item" @click="handleMenuTheme('dark')">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg" alt="dark">
                <div class="setting-drawer-index-selectIcon" v-if="navTheme === 'dark'">
                  <v-icon type="check"/>
                </div>
              </div>
            </tooltip>

            <tooltip>
              <template slot="title">
                亮色菜单风格
              </template>
              <div class="setting-drawer-index-item" @click="handleMenuTheme('light')">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg" alt="light">
                <div class="setting-drawer-index-selectIcon" v-if="navTheme !== 'dark'">
                  <v-icon type="check"/>
                </div>
              </div>
            </tooltip>
          </div>
        </div>

        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">主题色</h3>

          <div style="height: 20px">
            <tooltip class="setting-drawer-theme-color-colorBlock" v-for="(item, index) in colorList" :key="index">
              <template slot="title">
                {{ item.key }}
              </template>
              <v-tag :color="item.color" @click="changeColor(item.color)">
                <v-icon type="check" v-if="item.color === primaryColor"></v-icon>
              </v-tag>
            </tooltip>

          </div>
        </div>
        <v-divider/>

        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">导航模式</h3>

          <div class="setting-drawer-index-blockChecbox">
            <tooltip>
              <template slot="title">
                侧边栏导航
              </template>
              <div class="setting-drawer-index-item" @click="handleLayout('sidemenu')">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg" alt="sidemenu">
                <div class="setting-drawer-index-selectIcon" v-if="layoutMode === 'sidemenu'">
                  <v-icon type="check"/>
                </div>
              </div>
            </tooltip>

            <tooltip>
              <template slot="title">
                顶部栏导航
              </template>
              <div class="setting-drawer-index-item" @click="handleLayout('topmenu')">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg" alt="topmenu">
                <div class="setting-drawer-index-selectIcon" v-if="layoutMode !== 'sidemenu'">
                  <v-icon type="check"/>
                </div>
              </div>
            </tooltip>
          </div>
          <div :style="{ marginTop: '24px' }">
            <v-list :split="false">
              <v-list-item>
                <tooltip slot="actions">
                  <template slot="title">
                    该设定仅 [顶部栏导航] 时有效
                  </template>
                  <v-select size="small" style="width: 80px;" :defaultValue="contentWidth" @change="handleContentWidthChange">
                    <v-select-option value="Fixed">固定</v-select-option>
                    <v-select-option value="Fluid" v-if="layoutMode !== 'sidemenu'">流式</v-select-option>
                  </v-select>
                </tooltip>
                <v-list-item-meta>
                  <div slot="title">内容区域宽度</div>
                </v-list-item-meta>
              </v-list-item>
              <v-list-item>
                <v-switch slot="actions" size="small" :defaultChecked="fixedHeader" @change="handleFixedHeader"/>
                <v-list-item-meta>
                  <div slot="title">固定 Header</div>
                </v-list-item-meta>
              </v-list-item>
              <v-list-item>
                <v-switch slot="actions" size="small" :disabled="!fixedHeader" :defaultChecked="autoHideHeader" @change="handleFixedHeaderHidden"/>
                <v-list-item-meta>
                  <div slot="title" :style="{ textDecoration: !fixedHeader ? 'line-through' : 'unset' }">下滑时隐藏 Header</div>
                </v-list-item-meta>
              </v-list-item>
              <v-list-item>
                <v-switch slot="actions" size="small" :disabled="(layoutMode === 'topmenu')" :defaultChecked="fixSiderbar" @change="handleFixSiderbar"/>
                <v-list-item-meta>
                  <div slot="title" :style="{ textDecoration: layoutMode === 'topmenu' ? 'line-through' : 'unset' }">固定侧边菜单</div>
                </v-list-item-meta>
              </v-list-item>
            </v-list>
          </div>
        </div>
        <v-divider/>

        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">其他设置</h3>
          <div>
            <v-list :split="false">
              <v-list-item>
                <v-switch slot="actions" size="small" :defaultChecked="colorWeak" @change="onColorWeak"/>
                <v-list-item-meta>
                  <div slot="title">色弱模式</div>
                </v-list-item-meta>
              </v-list-item>
              <v-list-item>
                <v-switch slot="actions" size="small" :defaultChecked="multiTab" @change="onMultiTab"/>
                <v-list-item-meta>
                  <div slot="title">多页签模式</div>
                </v-list-item-meta>
              </v-list-item>
            </v-list>
          </div>
        </div>
        <v-divider/>
        <div :style="{ marginBottom: '24px' }">
          <v-button
            @click="doCopy"
            icon="copy"
            block
          >拷贝设置
          </v-button>
          <v-alert type="warning" :style="{ marginTop: '24px' }">
            <span slot="message">
              配置栏只在开发环境用于预览，生产环境不会展现，请手动修改配置文件
              <a href="https://github.com/sendya/ant-design-pro-vue/blob/master/src/defaultSettings.js" target="_blank">src/defaultSettings.js</a>
            </span>
          </v-alert>
        </div>
      </div>
      <div class="setting-drawer-index-handle" @click="toggle">
        <v-icon type="setting" v-if="!visible"/>
        <v-icon type="close" v-else/>
      </div>
    </v-drawer>
  </div>
</template>

<script>
  import {updateTheme, updateColorWeak, colorList} from './setting';
  import {mixin, mixinDevice} from '../../util/mixin';

  export default {
    mixins: [mixin, mixinDevice],
    data() {
      return {
        visible: true,
        colorList,
        config: {
          primaryColor: '#1890FF', // primary color of ant design
          navTheme: 'dark', // theme for nav menu
          layout: 'sidemenu', // nav menu position: sidemenu or topmenu
          contentWidth: 'Fixed', // layout of content: Fluid or Fixed, only works when layout is topmenu
          fixedHeader: false, // sticky header
          fixSiderbar: false, // sticky siderbar
          autoHideHeader: false, //  auto hide header
          colorWeak: false,
          multiTab: false,
        },
      };
    },
    watch: {},
    mounted() {
      const vm = this;
      setTimeout(() => {
        vm.visible = false;
      }, 16);
      // 当主题色不是默认色时，才进行主题编译
      if (this.primaryColor !== this.config.primaryColor) {
        updateTheme(this.primaryColor);
      }
      if (this.colorWeak !== this.config.colorWeak) {
        updateColorWeak(this.colorWeak);
      }
    },
    methods: {
      showDrawer() {
        this.visible = true;
      },
      onClose() {
        this.visible = false;
      },
      toggle() {
        this.visible = !this.visible;
      },
      onColorWeak(checked) {
        this.config.colorWeak = checked;
        this.$store.commit('app/TOGGLE_WEAK', checked);
        updateColorWeak(checked);
      },
      onMultiTab(checked) {
        this.config.multiTab = checked;
        this.$store.commit('app/TOGGLE_MULTI_TAB', checked);
      },
      handleMenuTheme(theme) {
        this.config.navTheme = theme;
        this.$store.commit('app/TOGGLE_THEME', theme);
      },
      doCopy() {
        console.log('doCopy');
      },
      handleLayout(mode) {
        this.config.layout = mode;
        this.$store.commit('app/TOGGLE_LAYOUT_MODE', mode);
        // 因为顶部菜单不能固定左侧菜单栏，所以强制关闭
        //
        this.handleFixSiderbar(false);
      },
      handleContentWidthChange(type) {
        this.config.contentWidth = type;
        this.$store.commit('app/TOGGLE_CONTENT_WIDTH', type);
      },
      changeColor(color) {
        this.config.primaryColor = color;
        if (this.primaryColor !== color) {
          this.$store.commit('app/TOGGLE_COLOR', color);
          updateTheme(color);
        }
      },
      handleFixedHeader(fixed) {
        this.config.fixedHeader = fixed;
        this.$store.commit('app/TOGGLE_FIXED_HEADER', fixed);
      },
      handleFixedHeaderHidden(autoHidden) {
        this.config.autoHideHeader = autoHidden;
        this.$store.commit('app/TOGGLE_FIXED_HEADER_HIDDEN', autoHidden);
      },
      handleFixSiderbar(fixed) {
        if (this.layoutMode === 'topmenu') {
          this.config.fixSiderbar = false;
          this.$store.commit('app/TOGGLE_FIXED_SIDERBAR', false);
          return;
        }
        this.config.fixSiderbar = fixed;
        this.$store.commit('app/TOGGLE_FIXED_SIDERBAR', fixed);
      },
    },
  };
</script>

<style lang="less" scoped>

  .setting-drawer-index-content {

    .setting-drawer-index-blockChecbox {
      display: flex;

      .setting-drawer-index-item {
        margin-right: 16px;
        position: relative;
        border-radius: 4px;
        cursor: pointer;

        img {
          width: 48px;
        }

        .setting-drawer-index-selectIcon {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          padding-top: 15px;
          padding-left: 24px;
          height: 100%;
          color: #1890ff;
          font-size: 14px;
          font-weight: 700;
        }
      }
    }

    .setting-drawer-theme-color-colorBlock {
      width: 20px;
      height: 20px;
      border-radius: 2px;
      float: left;
      cursor: pointer;
      margin-right: 8px;
      padding-left: 0px;
      padding-right: 0px;
      text-align: center;
      color: #fff;
      font-weight: 700;

      i {
        font-size: 14px;
      }
    }
  }

  .setting-drawer-index-handle {
    position: absolute;
    top: 240px;
    background: #1890ff;
    width: 48px;
    height: 48px;
    right: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    pointer-events: auto;
    z-index: 1001;
    text-align: center;
    font-size: 16px;
    border-radius: 4px 0 0 4px;

    i {
      color: rgb(255, 255, 255);
      font-size: 20px;
    }
  }
</style>
