<template>
  <v-collapse>
    <v-collapse-panel header="未封装">
      <a-form :form="normalForm" @submit="handleNormalFormSubmit">
        <a-form-item label="Note">
          <template slot="label">label</template>
          <template slot="help">help</template>
          <template slot="extra">extra</template>
          <template slot="xxx">xxx</template>
          <v-input v-decorator="['note', {rules: [{ required: true, message: 'Please input your note!' }]}]"/>
        </a-form-item>
        <a-form-item label="Gender">
          <v-select v-decorator="['gender', {rules: [{ required: true, message: 'Please select your gender!' }]}]" placeholder="Select a option and change input text above">
            <v-select-option value="male">
              male
            </v-select-option>
            <v-select-option value="female">
              female
            </v-select-option>
          </v-select>
        </a-form-item>
        <a-form-item>
          <v-button type="primary" html-type="submit">
            Submit
          </v-button>
        </a-form-item>
      </a-form>
    </v-collapse-panel>
    <v-collapse-panel header="封装">
      <v-form @ready="onFormReady">
        <v-form-item label="用户名" name="username" info="some tips" validator="required"/>
        <!--<v-form-item label="用户名" name="username" type="hidden"/>-->
      </v-form>
    </v-collapse-panel>
  </v-collapse>
</template>

<script>
  export default {
    routeConfig: {
      wrap: false,
    },
    name: 'dev-form',
    data() {
      return {
        normalForm: this.$form.createForm(this),
      };
    },
    methods: {
      handleNormalFormSubmit(e) {
        e.preventDefault();
        this.normalForm.validateFields((err, values) => {
          if (err) {
            return;
          }
          this.$notification.success(JSON.stringify(values));
        });
      },
      onFormReady() {
        console.log('onFormReady');
      },
    },
  };
</script>

<style scoped>

</style>
