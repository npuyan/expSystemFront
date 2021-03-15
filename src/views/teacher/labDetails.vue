<template>
  <div>
    <a-steps :current="2" size="default">
      <a-step title="课程基本信息" />
      <a-step title="课程详细信息" />
      <a-step title="实验详细信息" />
    </a-steps>
    <br />
    <br />
    <br />

    <div>
      <a-card title="实验详情" class="coursepage" style="text-align: center">
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item v-bind="formItemLayout" label="课程名称" has-feedback>
            <a-input
              v-decorator="[
                'courseName',
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
                'labName',
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
                'sectionId',
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
                <a-button @click="pdfDlfg"> {{ preview }} </a-button>
              </a-col>
            </a-row>
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="基础实验镜像">
            <a-row>
              <a-col :span="18">
                <a-select
                  v-decorator="[
                    'select',
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
                  <a-select-option value="novnc"> novnc </a-select-option>

                  <a-select-option
                    v-for="imageItem in imagelist"
                    :key="imageItem.imageId"
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

          <!-- <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
            <a-button type="primary" html-type="submit"> Submit </a-button>
          </a-form-item> -->
        </a-form>
      </a-card>
    </div>

    <!-- <a-col :span="8" :offset="8">
      <a-button @click="pdfDlfg"> {{ preview }} </a-button>
    </a-col> -->

    <div class="pdf" align="center" style="width: 60%">
      <pdf ref="pdf" v-for="i in numPages" :key="i" :page="i" :src="pdfUrl">
      </pdf>
    </div>
  </div>
</template>

<script>
import pdf from "vue-pdf";

export default {
  name: "labdetails",
  components: {
    pdf,
  },
  data() {
    return {
      pdfUrl: "",
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
      imagelist: [],
      selected_image: null,
    };
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "lab_info" });
  },

  mounted() {
    this.fullUrl = "api/uploadfile?labid=" + String(this.course_item.labId);
    console.log("fullUrl == " + this.fullUrl);
    this.getImagelist();
  },

  methods: {
    getImagelist() {
      this.postRequest("api/getallcourseimage").then((resp) => {
        console.log("返回数据");
        console.log(resp);
        this.imagelist = resp;
      });
    },
    // 计算pdf页码总数
    getNumPages() {
      let loadingTask = pdf.createLoadingTask(this.pdfUrl);
      loadingTask.promise
        .then((pdf) => {
          this.numPages = pdf.numPages;
        })
        .catch((err) => {
          console.error("pdf 加载失败", err);
        });
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.postRequest(this.saveUrl, values).then((resp) => {
            if (resp && resp.status === 200) {
              alert("编辑成功");
            } else {
              alert("编辑失败");
            }
          });
        }
      });
    },

    pdfDlfg: function () {
      /* 得到通过lab得到doc_path ,然后绑定到pdfurl即可 */
      var filename = this.course_item.docPath;
      if (this.pdfUrl === "") {
        this.pdfUrl = "api/downloadfile?filename=" + filename;
        this.getNumPages();
        this.preview = "关闭预览";
      } else {
        this.pdfUrl = "";
        this.preview = "点击预览";
      }
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

    handleSelectChange(value) {
      console.log(value);
      this.selected_image = value;
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
