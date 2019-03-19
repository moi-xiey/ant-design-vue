<template>
  <div class="app-list">
    <v-list
      :grid="{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }"
      :dataSource="dataSource">
      <v-list-item slot="renderItem" slot-scope="item">
        <v-card :hoverable="true">
          <v-card-meta>
            <div style="margin-bottom: 3px" slot="title">{{ item.title }}</div>
            <v-avatar class="card-avatar" slot="avatar" :src="item.avatar" size="small"/>
            <div class="meta-cardInfo" slot="description">
              <div>
                <p>活跃用户</p>
                <p>
                  <span>{{ item.activeUser }}<span>万</span></span>
                </p>
              </div>
              <div>
                <p>新增用户</p>
                <p>{{ item.newUser | NumberFormat }}</p>
              </div>
            </div>
          </v-card-meta>
          <template class="ant-card-actions" slot="actions">
            <a>
              <v-icon type="download"/>
            </a>
            <a>
              <v-icon type="edit"/>
            </a>
            <a>
              <v-icon type="share-alt"/>
            </a>
            <a>
              <v-dropdown>
                <a class="ant-dropdown-link" href="javascript:;">
                  <v-icon type="ellipsis"/>
                </a>
                <v-menu slot="overlay">
                  <v-menu-item>
                    <a href="javascript:;">1st menu item</a>
                  </v-menu-item>
                  <v-menu-item>
                    <a href="javascript:;">2nd menu item</a>
                  </v-menu-item>
                  <v-menu-item>
                    <a href="javascript:;">3rd menu item</a>
                  </v-menu-item>
                </v-menu>
              </v-dropdown>
            </a>
          </template>
        </v-card>
      </v-list-item>
    </v-list>

  </div>
</template>

<script>
  const dataSource = [];
  for (let i = 0; i < 11; i++) {
    dataSource.push({
      title: 'Alipay',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
      activeUser: 17,
      newUser: 1700,
    });
  }

  export default {
    name: 'Article',
    components: {},
    data() {
      return {
        dataSource,
      };
    },
  };
</script>

<style lang="less" scoped>

  .app-list {

    .meta-cardInfo {
      zoom: 1;
      margin-top: 16px;

      > div {
        position: relative;
        text-align: left;
        float: left;
        width: 50%;

        p {
          line-height: 32px;
          font-size: 24px;
          margin: 0;

          &:first-child {
            color: rgba(0, 0, 0, .45);
            font-size: 12px;
            line-height: 20px;
            margin-bottom: 4px;
          }
        }

      }
    }
  }

</style>
