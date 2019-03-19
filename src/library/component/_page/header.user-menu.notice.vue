<template>
  <v-popover
    v-model="visible"
    trigger="click"
    placement="bottomRight"
    :autoAdjustOverflow="true"
    :arrowPointAtCenter="true"
    overlayClassName="header-notice-wrapper"
    :overlayStyle="{ width: '300px', top: '50px' }">
    <template slot="content">
      <v-spin :spinning="loading">
        <v-tabs>
          <v-tab-pane tab="通知" key="1">
            <v-list>
              <v-list-item>
                <v-list-item-meta title="你收到了 14 份新周报" description="一年前">
                  <v-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"/>
                </v-list-item-meta>
              </v-list-item>
              <v-list-item>
                <v-list-item-meta title="你推荐的 曲妮妮 已通过第三轮面试" description="一年前">
                  <v-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png"/>
                </v-list-item-meta>
              </v-list-item>
              <v-list-item>
                <v-list-item-meta title="这种模板可以区分多种通知类型" description="一年前">
                  <v-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png"/>
                </v-list-item-meta>
              </v-list-item>
            </v-list>
          </v-tab-pane>
          <v-tab-pane tab="消息" key="2">
            123
          </v-tab-pane>
          <v-tab-pane tab="待办" key="3">
            123
          </v-tab-pane>
        </v-tabs>
      </v-spin>
    </template>
    <span @click="fetchNotice" class="header-notice">
      <v-badge count="12">
        <v-icon style="font-size: 16px; padding: 4px" type="bell"/>
      </v-badge>
    </span>
  </v-popover>
</template>

<script>
  export default {
    name: 'notice',
    data() {
      return {
        loading: false,
        visible: false,
      };
    },
    methods: {
      fetchNotice() {
        if (!this.visible) {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          }, 2000);
        } else {
          this.loading = false;
        }
        this.visible = !this.visible;
      },
    },
  };
</script>

<style lang="css">
  .header-notice-wrapper {
    top: 50px !important;
  }
</style>
<style lang="less" scoped>
  .header-notice {
    display: inline-block;
    transition: all 0.3s;

    span {
      vertical-align: initial;
    }
  }
</style>
