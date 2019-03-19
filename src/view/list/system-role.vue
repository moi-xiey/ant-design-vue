<template>
  <page-layout title="角色列表2">
    <v-card :bordered="false" :style="{ height: '100%' }">
      <v-row :gutter="24">
        <v-col :md="4">
          <v-list itemLayout="vertical" :dataSource="roles">
            <v-list-item slot="renderItem" slot-scope="item, index" :key="index">
              <v-list-item-meta :style="{ marginBottom: '0' }">
                <span slot="description" style="text-align: center; display: block">{{ item.describe }}</span>
                <a slot="title" style="text-align: center; display: block" @click="edit(item)">{{ item.name }}</a>
              </v-list-item-meta>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col :md="20">
          <div style="max-width: 800px">
            <v-divider v-if="isMobile()"/>
            <div v-if="mdl.id">
              <h3>角色：{{ mdl.name }}</h3>
            </div>
            <v-form :form="form" :layout="isMobile() ? 'vertical' : 'horizontal'">
              <v-form-item label="唯一键">
                <v-input v-decorator="[ 'id', {rules: [{ required: true, message: 'Please input unique key!' }]} ]" placeholder="请填写唯一键"/>
              </v-form-item>

              <v-form-item label="角色名称">
                <v-input v-decorator="[ 'name', {rules: [{ required: true, message: 'Please input role name!' }]} ]" placeholder="请填写角色名称"/>
              </v-form-item>

              <v-form-item label="状态">
                <v-select v-decorator="[ 'status', {rules: []} ]">
                  <v-select-option :value="1">正常</v-select-option>
                  <v-select-option :value="2">禁用</v-select-option>
                </v-select>
              </v-form-item>

              <v-form-item label="备注说明">
                <v-textarea :row="3" v-decorator="[ 'describe', {rules: [{ required: true, message: 'Please input role name!' }]} ]" placeholder="请填写角色名称"/>
              </v-form-item>

              <v-form-item label="拥有权限">
                <v-row :gutter="16" v-for="(permission, index) in permissions" :key="index">
                  <v-col :xl="4" :lg="24">
                    {{ permission.name }}：
                  </v-col>
                  <v-col :xl="20" :lg="24">
                    <v-checkbox
                      v-if="permission.actionsOptions.length > 0"
                      :indeterminate="permission.indeterminate"
                      :checked="permission.checkedAll"
                      @change="onChangeCheckAll($event, permission)">
                      全选
                    </v-checkbox>
                    <v-checkbox-group :options="permission.actionsOptions" v-model="permission.selected" @change="onChangeCheck(permission)"/>
                  </v-col>
                </v-row>
              </v-form-item>

            </v-form>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </page-layout>
</template>

<script>
  import {mixinDevice} from '../../library/util/mixin';
  import {pick} from 'lodash';

  export default {
    routeConfig: {
      meta: {title: '角色列表2'},
    },
    name: 'RoleList',
    mixins: [mixinDevice],
    components: {},
    data() {
      return {
        form: this.$form.createForm(this),
        mdl: {},

        roles: [],
        permissions: [],
      };
    },
    created() {
      this.$axios.get('http://www.mocky.io/v2/5c8ddaee3000000d001b0ca8').then((res) => {
        this.roles = res.result.data;
        this.roles.push({
          id: '-1',
          name: '新增角色',
          describe: '新增一个角色',
        });
        console.log('this.roles', this.roles);
      });
      this.loadPermissions();
    },
    methods: {
      callback(val) {
        console.log(val);
      },

      add() {
        this.edit({id: 0});
      },

      edit(record) {
        this.mdl = Object.assign({}, record);
        // 有权限表，处理勾选
        if (this.mdl.permissions && this.permissions) {
          // 先处理要勾选的权限结构
          const permissionsAction = {};
          this.mdl.permissions.forEach(permission => {
            permissionsAction[permission.permissionId] = permission.actionEntitySet.map(entity => entity.action);
          });

          console.log('permissionsAction', permissionsAction);
          // 把权限表遍历一遍，设定要勾选的权限 action
          this.permissions.forEach(permission => {
            const selected = permissionsAction[permission.id];
            permission.selected = selected || [];
          });

          console.log('this.permissions', this.permissions);
        }

        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.mdl, 'id', 'name', 'status', 'describe'));
        });
        console.log('this.mdl', this.mdl);
      },

      onChangeCheck(permission) {
        permission.indeterminate = !!permission.selected.length && (permission.selected.length < permission.actionsOptions.length);
        permission.checkedAll = permission.selected.length === permission.actionsOptions.length;
      },
      onChangeCheckAll(e, permission) {
        console.log('permission:', permission);

        Object.assign(permission, {
          selected: e.target.checked ? permission.actionsOptions.map(obj => obj.value) : [],
          indeterminate: false,
          checkedAll: e.target.checked,
        });
      },
      loadPermissions() {
        this.$axios.get('http://www.mocky.io/v2/5c8ddc2a30000070001b0caa').then(res => {
          const result = res.result;
          this.permissions = result.map(permission => {
            const options = JSON.parse(permission.actionData);
            permission.checkedAll = false;
            permission.selected = [];
            permission.indeterminate = false;
            permission.actionsOptions = options.map(option => {
              return {
                label: option.describe,
                value: option.action,
              };
            });
            return permission;
          });
        });
      },
    },
  };
</script>

<style scoped>

</style>
