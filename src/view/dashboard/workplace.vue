<template>
  <page-layout :avatar="avatar">
    <div slot="headerContent">
      <div class="title">{{ timeFix }}，{{ user.name }}<span class="welcome-text">，{{ welcome() }}</span></div>
      <div>前端工程师 | 蚂蚁金服 - 某某某事业群 - VUE平台</div>
    </div>
    <div slot="extra">
      <v-row class="more-info">
        <v-col :span="8">
          <head-info title="项目数" content="56" :center="false" :bordered="false"/>
        </v-col>
        <v-col :span="8">
          <head-info title="团队排名" content="8/24" :center="false" :bordered="false"/>
        </v-col>
        <v-col :span="8">
          <head-info title="项目访问" content="2,223" :center="false"/>
        </v-col>
      </v-row>
    </div>

    <div>
      <v-row :gutter="24">
        <v-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <v-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 24px;"
            :bordered="false"
            title="进行中的项目"
            :body-style="{ padding: 0 }">
            <a slot="extra">全部项目</a>
            <div>
              <v-card-grid class="project-card-grid" :key="i" v-for="(item, i) in projects">
                <v-card :bordered="false" :body-style="{ padding: 0 }">
                  <v-card-meta>
                    <div slot="title" class="card-title">
                      <v-avatar size="small" :src="item.cover"/>
                      <a>{{ item.title }}</a>
                    </div>
                    <div slot="description" class="card-description">
                      {{ item.description }}
                    </div>
                  </v-card-meta>
                  <div class="project-item">
                    <a href="/#/">科学搬砖组</a>
                    <span class="datetime">9小时前</span>
                  </div>
                </v-card>
              </v-card-grid>
            </div>
          </v-card>

          <v-card :loading="loading" title="动态" :bordered="false">
            <v-list>
              <v-list-item :key="index" v-for="(item, index) in activities">
                <v-list-item-meta>
                  <v-avatar slot="avatar" :src="item.user.avatar"/>
                  <div slot="title">
                    <span>{{ item.user.nickname }}</span>&nbsp;
                    在&nbsp;<a href="#">{{ item.project.name }}</a>&nbsp;
                    <span>{{ item.project.action }}</span>&nbsp;
                    <a href="#">{{ item.project.event }}</a>
                  </div>
                  <div slot="description">{{ item.time }}</div>
                </v-list-item-meta>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col
          style="padding: 0 12px"
          :xl="8"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24">
          <v-card title="快速开始 / 便捷导航" style="margin-bottom: 24px" :bordered="false" :body-style="{padding: 0}">
            <div class="item-group">
              <a>操作一</a>
              <a>操作二</a>
              <a>操作三</a>
              <a>操作四</a>
              <a>操作五</a>
              <a>操作六</a>
              <v-button size="small" type="primary" ghost icon="plus">添加</v-button>
            </div>
          </v-card>
          <v-card title="XX 指数" style="margin-bottom: 24px" :loading="radarLoading" :bordered="false" :body-style="{ padding: 0 }">
            <div style="min-height: 400px;">
              <!-- :scale="scale" :axis1Opts="axis1Opts" :axis2Opts="axis2Opts"  -->
              <radar :data="radarData"/>
            </div>
          </v-card>
          <v-card :loading="loading" title="团队" :bordered="false">
            <div class="members">
              <v-row>
                <v-col :span="12" v-for="(item, index) in teams" :key="index">
                  <a>
                    <v-avatar size="small" :src="item.avatar"/>
                    <span class="member">{{ item.name }}</span>
                  </a>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </page-layout>
</template>

<script>
  import {mapGetters} from 'vuex';
  import DataSet from '@antv/data-set';
  import Dates from '../../library/util/dates';
  import HeadInfo from '../../component/tools/head-info';
  import Radar from '../../component/chart/Radar';

  export default {
    routeConfig: {
      index: true,
      meta: {
        title: '工作台',
      },
    },
    name: 'Workplace',
    components: {
      HeadInfo,
      Radar,
    },
    data() {
      return {
        timeFix: Dates.timeFix(),
        avatar: '',
        user: {},

        projects: [],
        loading: true,
        radarLoading: true,
        activities: [],
        teams: [],

        // data
        axis1Opts: {
          dataKey: 'item',
          line: null,
          tickLine: null,
          grid: {
            lineStyle: {
              lineDash: null,
            },
            hideFirstLine: false,
          },
        },
        axis2Opts: {
          dataKey: 'score',
          line: null,
          tickLine: null,
          grid: {
            type: 'polygon',
            lineStyle: {
              lineDash: null,
            },
          },
        },
        scale: [
          {
            dataKey: 'score',
            min: 0,
            max: 80,
          }],
        axisData: [
          {item: '引用', a: 70, b: 30, c: 40},
          {item: '口碑', a: 60, b: 70, c: 40},
          {item: '产量', a: 50, b: 60, c: 40},
          {item: '贡献', a: 40, b: 50, c: 40},
          {item: '热度', a: 60, b: 70, c: 40},
          {item: '引用', a: 70, b: 50, c: 40},
        ],
        radarData: [],
      };
    },
    computed: {
      userInfo() {
        return this.$store.getters.userInfo;
      },
    },
    created() {
      this.user = this.userInfo;
      this.avatar = this.userInfo.avatar;
    },
    mounted() {
      this.getProjects();
      this.getActivity();
      this.getTeams();
      this.initRadar();
    },
    methods: {
      ...mapGetters(['nickname', 'welcome']),
      getProjects() {
        this.$axios.get('http://www.mocky.io/v2/5c89bbe92b00008005dbdb90').then(res => {
          this.projects = res.result && res.result.data;
          this.loading = false;
        });
      },
      getActivity() {
        this.$axios.get('http://www.mocky.io/v2/5c89bc062b00002a05dbdb91').then(res => {
          this.activities = res.result;
        });
      },
      getTeams() {
        this.$axios.get('http://www.mocky.io/v2/5c89bc1c2b00005900dbdb92').then(res => {
          this.teams = res.result;
        });
      },
      initRadar() {
        this.radarLoading = true;

        this.$axios.get('http://www.mocky.io/v2/5c89bc312b00005300dbdb95').then(res => {
          const dv = new DataSet.View().source(res.result);
          dv.transform({
            type: 'fold',
            fields: ['个人', '团队', '部门'],
            key: 'user',
            value: 'score',
          });

          this.radarData = dv.rows;
          this.radarLoading = false;
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  .project-list {

    .card-title {
      font-size: 0;

      a {
        color: rgba(0, 0, 0, 0.85);
        margin-left: 12px;
        line-height: 24px;
        height: 24px;
        display: inline-block;
        vertical-align: top;
        font-size: 14px;

        &:hover {
          color: #1890ff;
        }
      }
    }

    .card-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }

    .project-item {
      display: flex;
      margin-top: 8px;
      overflow: hidden;
      font-size: 12px;
      height: 20px;
      line-height: 20px;

      a {
        color: rgba(0, 0, 0, 0.45);
        display: inline-block;
        flex: 1 1 0;

        &:hover {
          color: #1890ff;
        }
      }

      .datetime {
        color: rgba(0, 0, 0, 0.25);
        flex: 0 0 auto;
        float: right;
      }
    }

    .ant-card-meta-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
  }

  .item-group {
    padding: 20px 0 8px 24px;
    font-size: 0;

    a {
      color: rgba(0, 0, 0, 0.65);
      display: inline-block;
      font-size: 14px;
      margin-bottom: 13px;
      width: 25%;
    }
  }

  .members {
    a {
      display: block;
      margin: 12px 0;
      line-height: 24px;
      height: 24px;

      .member {
        font-size: 14px;
        color: rgba(0, 0, 0, .65);
        line-height: 24px;
        max-width: 100px;
        vertical-align: top;
        margin-left: 12px;
        transition: all 0.3s;
        display: inline-block;
      }

      &:hover {
        span {
          color: #1890ff;
        }
      }
    }
  }

  .mobile {

    .project-list {

      .project-card-grid {
        width: 100%;
      }
    }

    .more-info {
      border: 0;
      padding-top: 16px;
      margin: 16px 0 16px;
    }

    .headerContent .title .welcome-text {
      display: none;
    }
  }

</style>
