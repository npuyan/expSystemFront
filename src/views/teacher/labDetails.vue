<template>
  <div>
    <a-row>
      <a-col :span="8">
        <a-upload
          name="file"
          :multiple="true"
          :action="fullUrl"
          :headers="headers"
          @change="handleChange"
        >
          <a-button> <a-icon type="upload" /> 上传实验指导书 </a-button>
        </a-upload>
      </a-col>
      <a-col :span="8" :offset="8">
        <a-button @click="pdfDlfg"> {{ preview }} </a-button>
      </a-col>
    </a-row>

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
      fullUrl: "api/uploadfile?labid=" + String(this.$route.query.id),
      numPages: null, // pdf 总页数
      preview: "点击预览",
    };
  },

  methods: {
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

    pdfDlfg: function () {
      /* 得到通过lab得到doc_path ,然后绑定到pdfurl即可 */
      var filename = this.$route.query.doc_path;
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
  },
};
</script>

<style scoped>
</style>
