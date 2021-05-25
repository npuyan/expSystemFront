<template>
  <div>
    <a-steps
      :current="2"
      size="default"
      type="navigation"
      @change="onChange"
    >
      <a-step title="课程基本信息" />
      <a-step title="课程详细信息" />
      <a-step title="实验详细信息" />
    </a-steps>
    <br />
    <br />
    <br />

    <div>
      <a-card title="实验详情" class="coursepage" style="text-align: center">
        <a-form :form="form" >
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
          <a-form-item v-bind="formItemLayout" label="实验名称" has-feedback>
            <a-input
              v-decorator="[
                'lab_name',
                { initialValue: course_item.labName },
                {
                  rules: [{ required: true, message: '请输入实验名称!' }],
                },
              ]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="第n次实验" has-feedback>
            <a-input
              v-decorator="[
                'section_id',
                { initialValue: course_item.sectionId },
                {
                  rules: [{ required: true, message: '请输入属于第几次实验!' }],
                },
              ]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="实验描述" has-feedback>
            <a-input
              v-decorator="[
                'remarks',
                { initialValue: course_item.remarks },
                {
                  rules: [{ required: true, message: '请输入实验描述!' }],
                },
              ]"
            />
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="实验文档">
            <a-row>
              <a-col :span="20">
                <div class="dropbox">
                  <a-upload-dragger
                    v-decorator="[
                      'dragger',
                      {
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile,
                      },
                    ]"
                    name="file"
                    :action="fullUrl"
                  >
                    <p class="ant-upload-drag-icon">
                      <a-icon type="inbox" />
                    </p>
                    <p class="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p class="ant-upload-hint">
                      Support for a single or bulk upload.
                    </p>
                  </a-upload-dragger>
                </div>
              </a-col>
              <a-col :span="4">
                <a-button v-if="course_item.docPath != ''" @click="pdfDlfg"> 预览 </a-button>
              </a-col>
            </a-row>
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="基础实验镜像">
            <a-row>
              <a-col :span="18">
                <a-select
                  v-decorator="[
                    'env_id',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please select base Image!',
                        },
                      ],
                    },
                  ]"
                  placeholder="Please select a base Image"
                  @change="handleSelectChange"
                >
                  <a-select-option
                    v-for="imageItem in imagelist"
                    :key="imageItem.id"
                  >
                    {{ imageItem.imageName }}
                  </a-select-option>
                </a-select>
              </a-col>
              <a-col :span="6">
                <a-button type="primary" @click="gotoNovnc()"> 编辑 </a-button>
              </a-col>
            </a-row>
          </a-form-item>

          <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
            <a-button type="primary" @click="handleSubmit"> 选择已有镜像 </a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>

    <div>
      <pdf-view
        ref="pdfview"
        :visible="visible"
        :pdf-url="pdfUrl"
        @cancel="handleCancelView"
        @create="handleCancelView"
      />
    </div>
  </div>
</template>

<script>
import pdfView from "./pdfView";
export default {
  name: "labdetails",
  components: { pdfView },
  data() {
    return {
      pdfUrl: this.$store.state.baseUrl + "/api/downloadfile?filename=",
      visible: false,
      fullUrl: "",
      numPages: null, // pdf 总页数
      preview: "点击预览",
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
      saveUrl: "api/updatecourselab",
      addEnvUrl: "api/addcourseenv",
      saveEnvUrl: "api/savecourseenvtoimage",
      imagelist: [],
      selected_image: null,
      envPort: null,
    };
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "lab_info" });
  },

  mounted() {
    this.fullUrl = "api/uploadfile?labid=" + String(this.course_item.labId);
    var filename = this.course_item.docPath;
    this.pdfUrl = encodeURIComponent(this.pdfUrl + filename);
    console.log("fullUrl == " + this.fullUrl);
    console.log("lab_item =", this.course_item);
    this.getImagelist();
  },

  methods: {
    handleCancelView() {
      this.visible = false;
    },

    onChange(current) {
      console.log("onChange:", current);
      // this.current = current;
      if (current === 1 && this.$route.query.fromTable === undefined) {
        // this.$router.back();
        this.$router.push({
          path: '/teacherCourseDetails',
          query: {obj: this.$route.query.courseobj}
        })
      }
    },

    getImagelist() {
      this.postRequest("api/getimagebycreatorid", {
        creatorid: this.$store.state.userId,
      }).then((resp) => {
        console.log("返回数据");
        console.log(resp);
        this.imagelist = resp;
      });
    },

    handleSubmit(e) {
      // e.preventDefault();
      // this.form.validateFields((err, values) => {
      //   if (!err) {
      //     delete values.dragger;
      //     this.editAttribute(values);

      //     console.log("Received values of form: ", values);
      //     this.postRequest(this.saveUrl, values).then((resp) => {
      //       if (resp && resp.status === 200) {
      //         alert("编辑成功");
      //       } else {
      //         alert("编辑失败");
      //       }
      //     });
      //   }
      // });

      console.log("使用已经存在的镜像发送数据")
      console.log({
        courselab: this.course_item,
        courseimage: this.selected_image
      })
      this.postRequest("api/usealreadyimage", {
        courselab: this.course_item,
        courseimage: this.selected_image
      }).then((resp) => {
        if(resp.status === 200){
          console.log(resp)
          this.$message.success(resp.msg)
        }
        else{
          this.$message.error(resp.msg)
        }
      })

    },

    pdfDlfg: function () {
      console.log("pdfUrl=", this.pdfUrl)
      this.visible = true;
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

    handleSelectChange(index) {
      var i;

      for(i=0; i< this.imagelist.length; i++)
      {
        if(this.imagelist[i].id === index){
          this.selected_image = this.imagelist[i];

        }
      }
      console.log(this.selected_image)
    },

    normFile(e) {
      console.log("Upload event:", e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    },

    gotoNovnc() {
      console.log("the selected image is ", this.selected_image);
      console.log("the selected lab is ", this.course_item);

      this.postRequest(this.addEnvUrl, {
        courselab: this.course_item,
        courseimage: this.selected_image
      }).then((resp) => {
        if (resp.status === 200) {
          console.log("创建环境成功");
          console.log("返回数据 ", resp);
          this.envPort = resp.obj;
          this.$router.push({
            path: "/envVnc",
            query: { port: this.envPort, labObj: this.course_item },
          });
        }
      });
    },

    editAttribute(item) {
      item["course_id"] = this.course_item.courseId;
      item["lab_id"] = this.course_item.labId;
      item["env_id"] = 1;
      item["doc_path"] = "";
    },
  },
};
</script>

<style scoped>
.coursepage {
  text-align: left;
  width: 50vw;
  margin: 1vh auto;
}

.dropbox {
  /* height: 180px; */
  /* width: 500px; */
  line-height: 1.5;
}
</style>
