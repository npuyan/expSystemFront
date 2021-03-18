<template>
  <div>
    <a-steps :current="1" size="default" type="navigation" :style="stepStyle" @change="onChange">
      <a-step title="课程基本信息" />
      <a-step title="课程详细信息" />
      <a-step title="实验详细信息" />
    </a-steps>
    <br />
    <br />
    <br />
    <a-card title="课程详情" class="coursepage">
      <a-form :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="课程名称" has-feedback>
        <a-input
          v-decorator="[
            'course_name',
            { initialValue: course_item.courseName },
            {
              rules: [{ required: true, message: '请输入课程名称!' }],
            },
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="课程类别" has-feedback>
        <a-input
          v-decorator="[
            'type',
            { initialValue: course_item.type },
            {
              rules: [{ required: true, message: '请输入课程类别!' }],
            },
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="课程标签" has-feedback>
        <a-input
          v-decorator="[
            'tag',
            { initialValue: course_item.tag },
            {
              rules: [{ required: true, message: '请输入课程标签!' }],
            },
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="课程描述" has-feedback>
        <a-input
          v-decorator="[
            'remark',
            { initialValue: course_item.remark },
            {
              rules: [{ required: true, message: '请输入课程描述!' }],
            },
          ]"
        />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="课程图片" has-feedback>
        <div class="clearfix">
          <a-upload
            name="file"
            :action="fullUrl"
            list-type="picture-card"
            :file-list="fileList"
            @preview="handlePreview"
            @change="handleChange"
          >
            <div v-if="fileList.length < 1">
              <a-icon type="plus" />
              <div class="ant-upload-text">Upload Picture</div>
            </div>
          </a-upload>
          <a-modal
            :visible="previewVisible"
            :footer="null"
            @cancel="handleCancel"
          >
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="课程实验"> 
        <div v-if="lablist.length === 0">
          本课程暂无实验
        </div>
        <div v-for="labitem in lablist">
          <a-button block @click="gotoLabDetails(labitem)">
            {{labitem.labName}}
          </a-button>
        </div>

      </a-form-item>
      </a-form>
    </a-card>

    <div>
      <a-button type="primary" @click="showModal"> 添加新实验 </a-button>
      <lab-basic
        ref="labbasic"
        :visible="visible"
        @cancel="handleCancelForm"
        @create="handleCreateForm"
      />
    </div>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

import LabBasic from "./labBasic";

export default {
  components: { LabBasic },
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      fileList: [],
      fullUrl: "api/uploadcoursepicture?courseid="+ this.$route.query.obj.courseId,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: {
            span: 15,
            offset: 2,
          },
        },
      },
      course_item: this.$route.query.obj,
      visible: false,
      saveUrl: "api/addcourselab",
      lablist: [],
    };
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "course_infos" });
  },

  mounted() {
    console.log("course_item is ", this.course_item)
    if (this.course_item.picture != null){
      this.fileList.push({
          uid: '-1',
          name: String(this.course_item.picture),
          status: 'done',
          url: 'http://localhost:8081/api/downloadcoursepicture?filename=' + this.course_item.picture
      })
    }
    this.getLab();
  },

  methods: {

    onChange(current) {
      console.log("onChange:", current);
      // this.current = current;
      if (current === 0) {
        this.$router.push({
          path: '/teacherCourseBasic',
          query: {obj: this.course_item}
          })
      }
    },

    getLab() {
      var _this = this;
      _this
        .postRequest("api/getlabbycourseid", {
          courseid: String(this.course_item.courseId),
        })
        .then((resp) => {
          console.log("返回数据");
          console.log(resp);
          this.lablist = resp;
          
        });
    },
    gotoLabDetails(item) {
      this.$router.push({
        path: '/teacherLabDetails',
        query: {obj: item}
      })
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },

    showModal() {
      this.visible = true;
    },
    handleCancelForm() {
      this.visible = false;
    },
    handleCreateForm() {
      const form = this.$refs.labbasic.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        this.editAttribute(values);
        console.log("Received values of form: ", values);

        this.postRequest(this.saveUrl, { courselab: values }).then((resp) => {
          if (resp && resp.status === 200) {
            alert("编辑成功");
            this.getLab();
          } else {
            alert("编辑失败");
          }
        });

        form.resetFields();
        this.visible = false;
      });
    },

    editAttribute(item) {
      item["course_id"] = this.course_item.courseId;
      item["course_name"] = this.course_item.courseName
      item["lab_id"] = null;
      item["env_id"] = 1;
      item["doc_path"] = "";
    },
  },
};
</script>

<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>