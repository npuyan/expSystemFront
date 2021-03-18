<template>
  <div>
    <div>
      <a-steps
        :current="0"
        size="default"
        type="navigation"
        :style="stepStyle"
        @change="onChange"
      >
        <a-step title="课程基本信息" />
        <a-step title="课程详细信息" />
        <a-step title="实验详细信息" />
      </a-steps>
    </div>
    <br />
    <br />
    <br />

    <a-card title="课程详情" class="coursepage">
      <keep-alive>
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
          <!-- <a-form-item v-bind="formItemLayout" label="作者" has-feedback>
            <a-input
              v-decorator="[
                'author',
                { initialValue: course_item.author },
                {
                  rules: [{ required: true, message: '请输入课程作者!' }],
                },
              ]"
            />
          </a-form-item> -->
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
          <a-form-item v-bind="formItemLayout" label="课程时长" has-feedback>
            <a-input
              v-decorator="[
                'time',
                { initialValue: course_item.time },
                {
                  rules: [{ required: true, message: '请输入课程时长!' }],
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

          <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
            <a-space :size="300">
              <a-button type="primary" html-type="submit"> Submit </a-button>

              <!-- <a-button type="primary"  @click="next()">下一步</a-button> -->
            </a-space>
          </a-form-item>
        </a-form>
      </keep-alive>
    </a-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stepStyle: {
        marginBottom: "60px",
        boxShadow: "0px -1px 0 0 #e8e8e8 inset",
      },
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
      updateUrl: "api/updatecourse",
      addUrl: "api/addcourse",
      saveUrl: "",
    };
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "course_info" });
  },

  mounted() {
    console.log("course-item = ");
    console.log(this.course_item);
    if (this.course_item.courseName === "") {
      this.saveUrl = this.addUrl;
    } else {
      this.saveUrl = this.updateUrl;
    }
    console.log("saveUrl = ", this.saveUrl);
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.editAttribute(values);
          console.log("Received values of form: ", values);
          this.postRequest(this.saveUrl, { course: values }).then((resp) => {
            if (resp && resp.status === 200) {
              alert("编辑成功");
              console.log("recevied from backend : ", resp);
              this.course_item = resp.obj;
              this.next();
            } else {
              alert("编辑失败");
            }
          });
        }
      });
    },

    handleChange(info) {
      console.log(this.fullUrl);
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },

    normFile(e) {
      console.log("Upload event:", e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    },

    editAttribute(item) {
      item["course_id"] = null;
      item["picture"] = null;
      item["create_time"] = null;
      item["author"] = this.$store.state.userName;
    },

    next() {
      this.$router.push({
        path: "/teacherCourseDetails",
        query: { obj: this.course_item },
      });
    },

    onChange(current) {
      console.log("onChange:", current);
      // this.current = current;
      if (current === 1) {
        this.next()
      }
    },
    // prev() {
    //   this.current--;
    // },
  },
};
</script>
<style acoped>
.coursepage {
  text-align: center;
  width: 50vw;
  margin: 1vh auto;
}

.dropbox {
  /* height: 180px; */
  /* width: 500px; */
  line-height: 1.5;
}

.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}
</style>
