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

        <a-form  :form="form" @submit="handleSubmit">
          <a-form-item v-bind="formItemLayout" label="课程名称" has-feedback>
            <a-input v-if="display === false" :placeholder="course_item.courseName"
              v-decorator="[
                'course_name',
                {
                  rules: [{ required: true, message: '请输入课程名称!' }],
                },
              ]"
            />
            <span v-if="display === true"  class="ant-form-text">
              {{course_item.courseName}}
            </span>
          </a-form-item>

          <!-- <a-form-item v-if="FormFlag === false" v-bind="formItemLayout" label="课程名称" has-feedback>
            <a-input v-if="display === false"
              v-decorator="[
                'course_name',
                { initialValue: course_item.courseName},
                {
                  rules: [{ required: true, message: '请输入课程名称!' }],
                },
              ]"
            />
            <span v-if="display === true"  class="ant-form-text">
              {{course_item.courseName}}
            </span>
          </a-form-item> -->

          <a-form-item v-bind="formItemLayout" label="课程类别" has-feedback>
            <a-input v-if="display === false" :placeholder="course_item.type"
              v-decorator="[
                'type',
                {
                  rules: [{ required: true, message: '请输入课程类别!' }],
                },
              ]"
            />
            <span  v-if="display === true" class="ant-form-text">
              {{course_item.type}}
            </span>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="课程标签" has-feedback>
            <a-input v-if="display === false"  :placeholder="course_item.tag"
              v-decorator="[
                'tag',
                {
                  rules: [{ required: true, message: '请输入课程标签!' }],
                },
              ]"
            />
            <span  v-if="display === true" class="ant-form-text">
              {{course_item.tag}}
            </span>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="课程时长" has-feedback>
            <a-input v-if="display === false" :placeholder="course_item.time"
              v-decorator="[
                'time',
                {
                  rules: [{ required: true, message: '请输入课程时长!' }],
                },
              ]"
            />
            <span  v-if="display === true" class="ant-form-text">
              {{course_item.time}}
            </span>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="课程描述" has-feedback>
            <a-textarea v-if="display === false"  :placeholder="course_item.remark"
              v-decorator="[
                'remark',
                {
                  rules: [{ required: true, message: '请输入课程描述!' }],
                },
              ]"
            />
            <span v-if="display === true" class="ant-form-text">
              {{course_item.remark}}
            </span>
          </a-form-item>

          <a-form-item   :wrapper-col="{ span: 12, offset: 6 }">
            <a-space :size="300">
              <a-button v-if="display === false" type="primary" html-type="submit"> 提交 </a-button>
              
              <!-- <a-button type="primary"  @click="next()">下一步</a-button> -->
            </a-space>
          </a-form-item>
        </a-form>
        <a-button v-if="display === true" type="default" @click="updateinfo"> 修改 </a-button>
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
      statusUrl: "api/getcoursebyid",
      saveUrl: "",
      FormFlag: true,
      display: true
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
      this.display = false
    } else {
      this.saveUrl = this.updateUrl;
      this.display = true
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

          if (this.saveUrl == "api/updatecourse") {
            this.postRequest(this.saveUrl, values).then((resp) => {
              if (resp && resp.status === 200) {
                alert("编辑成功");
                console.log("recevied from backend : ", resp);
                this.getNewStatus();

                this.next();
              } else {
                alert("编辑失败");
              }
            });
          } else {
            this.postRequest(this.saveUrl, { course: values }).then((resp) => {
              if (resp && resp.status === 200) {
                alert("编辑成功");
                console.log("recevied from backend : ", resp);
                if (resp != null) {
                  this.course_item = resp.obj;
                }

                this.next();
              } else {
                alert("编辑失败");
              }
            });
          }
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
    updateinfo() {
      this.display = false
      this.FormFlag = true
    },

    editAttribute(item) {
      item["course_id"] = this.course_item.courseId;
      item["picture"] = this.course_item.picture;
      item["create_time"] = this.course_item.createTime;
      item["author"] = this.$store.state.userName;
    },

    getNewStatus() {
      this.postRequest(this.statusUrl, { id: this.course_item.courseId }).then(
        (resp) => {
          console.log("new course status = ", resp);
          if (resp) {
            this.course_item = resp;
          }
        }
      );
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
      if(this.course_item.courseId != null && current === 2){
        alert("请在“课程详情信息”中选择要进入的实验");
        this.next()
      }
      if (this.course_item.courseId != null) {
        if (current === 1) {
          this.next();
        }
      } else {
        alert("请先提交课程基本信息");
      }
    },
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
