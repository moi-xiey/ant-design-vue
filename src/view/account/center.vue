<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <v-row :gutter="24">
      <v-col :md="24" :lg="7">
        <v-card :bordered="false">
          <div class="account-center-avatarHolder">
            <div class="avatar">
              <img :src="avatar()">
            </div>
            <div class="username">{{ nickname() }}</div>
            <div class="bio">海纳百川，有容乃大</div>
          </div>
          <div class="account-center-detail">
            <p>
              <i class="title"></i>交互专家
            </p>
            <p>
              <i class="group"></i>蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED
            </p>
            <p>
              <i class="address"></i>
              <span>浙江省</span>
              <span>杭州市</span>
            </p>
          </div>
          <v-divider/>

          <div class="account-center-tags">
            <div class="tagsTitle">标签</div>
            <div>
              <template v-for="(tag, index) in tags">
                <tooltip v-if="tag.length > 20" :key="tag" :title="tag">
                  <v-tag
                    :key="tag"
                    :closable="index !== 0"
                    :afterClose="() => handleTagClose(tag)"
                  >{{ `${tag.slice(0, 20)}...` }}
                  </v-tag>
                </tooltip>
                <v-tag
                  v-else
                  :key="tag"
                  :closable="index !== 0"
                  :afterClose="() => handleTagClose(tag)"
                >{{ tag }}
                </v-tag>
              </template>
              <v-input
                v-if="tagInputVisible"
                ref="tagInput"
                type="text"
                size="small"
                :style="{ width: '78px' }"
                :value="tagInputValue"
                @change="handleInputChange"
                @blur="handleTagInputConfirm"
                @keyup.enter="handleTagInputConfirm"
              />
              <v-tag v-else @click="showTagInput" style="background: #fff; borderStyle: dashed;">
                <v-icon type="plus"/>
                New Tag
              </v-tag>
            </div>
          </div>
          <v-divider :dashed="true"/>

          <div class="account-center-team">
            <div class="teamTitle">团队</div>
            <v-spin :spinning="teamSpinning">
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
            </v-spin>
          </div>
        </v-card>
      </v-col>
      <v-col :md="24" :lg="17">
        <v-card
          style="width:100%"
          :bordered="false"
          :tabList="tabListNoTitle"
          :activeTabKey="noTitleKey"
          @tabChange="key => handleTabChange(key, 'noTitleKey')"
        >
          <article-page v-if="noTitleKey === 'article'"></article-page>
          <app-page v-else-if="noTitleKey === 'app'"></app-page>
          <project-page v-else-if="noTitleKey === 'project'"></project-page>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import AppPage from './_page/app';
  import ArticlePage from './_page/article';
  import ProjectPage from './_page/project';

  export default {
    components: {
      AppPage,
      ArticlePage,
      ProjectPage,
    },
    data() {
      return {
        tags: ['很有想法的', '专注设计', '辣~', '大长腿', '川妹子', '海纳百川'],

        tagInputVisible: false,
        tagInputValue: '',

        teams: [],
        teamSpinning: true,

        tabListNoTitle: [
          {
            key: 'article',
            tab: '文章(8)',
          },
          {
            key: 'app',
            tab: '应用(8)',
          },
          {
            key: 'project',
            tab: '项目(8)',
          },
        ],
        noTitleKey: 'app',
      };
    },
    mounted() {
      this.getTeams();
    },
    methods: {
      ...mapGetters(['nickname', 'avatar']),
      getTeams() {
        this.$axios.get('http://www.mocky.io/v2/5c8de7a330000070001b0cb4').then(res => {
          this.teams = res.result;
          this.teamSpinning = false;
        });
      },

      handleTabChange(key, type) {
        this[type] = key;
      },

      handleTagClose(removeTag) {
        const tags = this.tags.filter(tag => tag !== removeTag);
        this.tags = tags;
      },

      showTagInput() {
        this.tagInputVisible = true;
        this.$nextTick(() => {
          this.$refs.tagInput.focus();
        });
      },

      handleInputChange(e) {
        this.tagInputValue = e.target.value;
      },

      handleTagInputConfirm() {
        const inputValue = this.tagInputValue;
        let tags = this.tags;
        if (inputValue && !tags.includes(inputValue)) {
          tags = [...tags, inputValue];
        }

        Object.assign(this, {
          tags,
          tagInputVisible: false,
          tagInputValue: '',
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  .page-header-wrapper-grid-content-main {
    width: 100%;
    height: 100%;
    min-height: 100%;
    transition: 0.3s;

    .account-center-avatarHolder {
      text-align: center;
      margin-bottom: 24px;

      & > .avatar {
        margin: 0 auto;
        width: 104px;
        height: 104px;
        margin-bottom: 20px;
        border-radius: 50%;
        overflow: hidden;

        img {
          height: 100%;
          width: 100%;
        }
      }

      .username {
        color: rgba(0, 0, 0, 0.85);
        font-size: 20px;
        line-height: 28px;
        font-weight: 500;
        margin-bottom: 4px;
      }
    }

    .account-center-detail {
      p {
        margin-bottom: 8px;
        padding-left: 26px;
        position: relative;
      }

      i {
        position: absolute;
        height: 14px;
        width: 14px;
        left: 0;
        top: 4px;
        background: url(https://gw.alipayobjects.com/zos/rmsportal/pBjWzVAHnOOtAUvZmZfy.svg);
      }

      .title {
        background-position: 0 0;
      }

      .group {
        background-position: 0 -22px;
      }

      .address {
        background-position: 0 -44px;
      }
    }

    .account-center-tags {
      .ant-tag {
        margin-bottom: 8px;
      }
    }

    .account-center-team {
      .members {
        a {
          display: block;
          margin: 12px 0;
          line-height: 24px;
          height: 24px;

          .member {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.65);
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
    }

    .tagsTitle,
    .teamTitle {
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 12px;
    }
  }
</style>
