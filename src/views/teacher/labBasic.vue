<template>
  <div>
    <a-modal
      :visible="visible"
      title="创建一个新实验"
      okText="Create"
      @cancel="
        () => {
          $emit('cancel');
        }
      "
      @ok="
        () => {
          $emit('create');
        }
      "
    >


      <a-form :form="form" layout='vertical'>

        <a-form-item label="实验名称" has-feedback>
          <a-input
            v-decorator="[
              'lab_name',
              {
                rules: [{ required: true, message: '请输入实验名称!' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="实验序号" has-feedback>
          <a-input
            v-decorator="[
              'section_id',
              {
                rules: [{ required: true, message: '请输入实验序号!' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item  label="实验描述" has-feedback>
          <a-textarea
            v-decorator="[
              'remarks',
              {
                rules: [{ required: true, message: '请输入实验描述!' }],
              },
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "form_in_modal" });
  },

  data() {
    return {
      name: "lab_basic_info",
    };
  },
};
</script>

<style>
</style>