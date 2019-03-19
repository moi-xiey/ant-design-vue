<template>
  <div class="page-header-index-wide">
    <v-row :gutter="24">
      <v-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="总销售额" total="￥126,560">
          <tooltip title="指标说明" slot="action">
            <v-icon type="info-circle-o"/>
          </tooltip>
          <div>
            <trend flag="up" style="margin-right: 16px;">
              <span slot="term">周同比</span>
              12%
            </trend>
            <trend flag="down">
              <span slot="term">日同比</span>
              11%
            </trend>
          </div>
          <template slot="footer">日均销售额<span>￥ 234.56</span></template>
        </chart-card>
      </v-col>
      <v-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="访问量" :total="8846 | NumberFormat">
          <tooltip title="指标说明" slot="action">
            <v-icon type="info-circle-o"/>
          </tooltip>
          <div>
            <mini-area/>
          </div>
          <template slot="footer">日访问量<span> {{ '1234' | NumberFormat }}</span></template>
        </chart-card>
      </v-col>
      <v-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="支付笔数" :total="6560 | NumberFormat">
          <tooltip title="指标说明" slot="action">
            <v-icon type="info-circle-o"/>
          </tooltip>
          <div>
            <mini-bar/>
          </div>
          <template slot="footer">转化率 <span>60%</span></template>
        </chart-card>
      </v-col>
      <v-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="运营活动效果" total="78%">
          <tooltip title="指标说明" slot="action">
            <v-icon type="info-circle-o"/>
          </tooltip>
          <div>
            <mini-progress color="rgb(19, 194, 194)" :target="80" :percentage="78" height="8px"/>
          </div>
          <template slot="footer">
            <trend flag="down" style="margin-right: 16px;">
              <span slot="term">同周比</span>
              12%
            </trend>
            <trend flag="up">
              <span slot="term">日环比</span>
              80%
            </trend>
          </template>
        </chart-card>
      </v-col>
    </v-row>

    <v-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <v-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item">
              <a>今日</a>
              <a>本周</a>
              <a>本月</a>
              <a>本年</a>
            </div>
            <v-range-picker :style="{width: '256px'}"/>
          </div>
          <v-tab-pane loading="true" tab="销售额" key="1">
            <v-row>
              <v-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <bar title="销售额排行"/>
              </v-col>
              <v-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list title="门店销售排行榜" :list="rankList"/>
              </v-col>
            </v-row>
          </v-tab-pane>
          <v-tab-pane tab="访问量" key="2">
            <v-row>
              <v-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <bar title="销售额趋势"/>
              </v-col>
              <v-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list title="门店销售排行榜" :list="rankList"/>
              </v-col>
            </v-row>
          </v-tab-pane>
        </v-tabs>
      </div>
    </v-card>

    <v-row :gutter="12">
      <v-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <v-card :loading="loading" :bordered="false" title="线上热门搜索" :style="{ marginTop: '24px' }">
          <v-dropdown :trigger="['click']" placement="bottomLeft" slot="extra">
            <a class="ant-dropdown-link" href="#">
              <v-icon type="ellipsis"/>
            </a>
            <v-menu slot="overlay">
              <v-menu-item>
                <a href="javascript:;">操作一</a>
              </v-menu-item>
              <v-menu-item>
                <a href="javascript:;">操作二</a>
              </v-menu-item>
            </v-menu>
          </v-dropdown>
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </v-card>
      </v-col>
      <v-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <v-card :loading="loading" :bordered="false" title="销售额类别占比" :style="{ marginTop: '24px' }">
          <v-dropdown :trigger="['click']" placement="bottomLeft" slot="extra">
            <a class="ant-dropdown-link" href="#">
              <v-icon type="ellipsis"/>
            </a>
            <v-menu slot="overlay">
              <v-menu-item>
                <a href="javascript:;">操作一</a>
              </v-menu-item>
              <v-menu-item>
                <a href="javascript:;">操作二</a>
              </v-menu-item>
            </v-menu>
          </v-dropdown>
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import ChartCard from '../../component/chart/ChartCard';
  import MiniArea from '../../component/chart/MiniArea';
  import MiniBar from '../../component/chart/MiniBar';
  import MiniProgress from '../../component/chart/MiniProgress';
  import RankList from '../../component/chart/RankList';
  import Bar from '../../component/chart/Bar';
  import Trend from '../../component/trend';

  const rankList = [];
  for (let i = 0; i < 7; i++) {
    rankList.push({
      name: '白鹭岛 ' + (i + 1) + ' 号店',
      total: 1234.56 - i * 100,
    });
  }

  export default {
    name: 'Analysis',
    components: {
      ChartCard,
      MiniArea,
      MiniBar,
      MiniProgress,
      RankList,
      Bar,
      Trend,
    },
    data() {
      return {
        loading: true,
        rankList,
      };
    },
    created() {
      setTimeout(() => {
        this.loading = !this.loading;
      }, 1000);
    },
  };
</script>

<style lang="less" scoped>
  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 24px;
      }
    }
  }
</style>
