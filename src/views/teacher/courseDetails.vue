<template>
  <a-list  :data-source="data">
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-card :title="item.title" style="width: 500px">
        {{item.text}}
        
      </a-card>

      <a-upload
          name="file"
          :multiple="true"
          :action="fullUrl"
          :headers="headers"
          @change="handleChange"
        >
          <a-button> <a-icon type="upload" /> 上传章节内容 </a-button>
        </a-upload>
      
    </a-list-item>
  </a-list>
</template>
<script>
const data = [
  {
    title: '第一次实验',
    text: '什么是操作系统'
  },
  {
    title: '第二次实验',
    text: '如何安装一个操作系统'
  },
  {
    title: '第三次实验',
    text: '为操作系统开发驱动'
  },
  {
    title: '第三次实验',
    text: '设计一个操作系统'
  },
];
export default {
  data() {
    return {
      data,
      fullUrl: "api/uploadfile?labid="
    };
  },

  methods: {
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
  }
};
</script>
<style></style>
