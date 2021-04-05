<template>
  <div>
    <a-table
      bordered
      :columns="columns"
      :data-source="data"
      :loading="loading"
      @change="handleTableChange"
    >
      <template
        v-for="col in columnsName"
        :slot="col"
        slot-scope="text, record, index"
      >
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="(e) => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="aboutHomework" slot-scope="text, record, index">
        <a-button @click="downloadHomework(record)">下载作业</a-button>
        <a-button @click="preview(record)"> 预览作业</a-button>
        
        <!-- <a-modal v-model="visible_form" title="设置分数" @ok="handleOk(record)">
          <a-input-number :min="0" :max="100" :step="0.1" @change="onChangeGrade" />
        </a-modal> -->
      </template>
      <template slot="gradeOpt" slot-scope="text, record, index">
        <a-button @click="setGrade(record)">设置分数</a-button>
        <a-input-number :min="0" :max="100" :step="0.1" @change="onChangeGrade" />
      </template>
    </a-table>
    <a-button @click="downloadAllHomework()">下载所有学生作业</a-button>
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
import pdfView from './pdfView'

export default {
  name: "util-table",
  components: { pdfView },
  props: {
    data: {
      type: Array,
      default: [],
    },
    columns: {
      type: Array,
      default: [],
    },
    columnsName: {
      type: Array,
      default: [],
    },
    dataIdName: {
      type: String,
      default: "",
    },
    recvParam: {
      type: String,
      default: "",
    },
    fetchUrl: {
      type: String,
      default: "",
    },
    delUrl: {
      type: String,
      default: "",
    },
    saveUrl: {
      type: String,
      default: "",
    },
  },
  data() {

    return {
      cacheData: "",
      loading: false,
      editingKey: "",
      count: 0,
      pagination: "",
      visible: false,
      visible_form: false,
      form_param: {username: '', labid: null, score: null},
      form_list: [],
      baseUrl: "http://localhost:8081/api/", //http://localhost:8800/downloadhomework?userid=12&labid=1
      pdfUrl: "",
    };
  },
  mounted() {
    this.fetch(this.recvParam);
  },
  methods: {
    /* 列表发生排序改变时 */
    handleTableChange(pagination, filters, sorter) {
      // console.log(pagination)
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch(this.recvParam);
    },
    /* 发生更新添加操作时 */
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
        console.log("tart");
        console.log(target);
      }
    },
    /* 获取数据 */
    fetch(params = {}) {
      console.log("the params in fetch");
      var temp_param = JSON.stringify(params);
      console.log(temp_param);
      this.loading = true;
      this.postRequest(this.fetchUrl, params).then((data) => {
        if (data) {
          console.log("实验成绩数据");
          console.log(data);
          const pagination = { ...this.pagination };
          // Read total count from server
          // pagination.total = data.totalCount;
          pagination.total = 200;
          this.loading = false;
          this.data = data;

          this.pagination = pagination;
          this.count = data.length;
          this.data.forEach(this.renameId);
          this.data.forEach(this.msToDate);
          console.log(data);
          this.cacheData = this.data.map((item) => ({ ...item }));
        }
      });
    },
    renameId: function (item) {
      item.key = item[this.dataIdName];
      delete item[this.dataIdName];
    },
    msToDate: function (item) {
      var t_obj = new Date(item.homework_time);
      item["homework_time"] =
        t_obj.getFullYear() +
        "/" +
        (t_obj.getMonth() + 1) +
        "/" +
        t_obj.getDay() +
        " " +
        t_obj.getHours() +
        ":" +
        t_obj.getMinutes();
      console.log("homework_time =", item["homework_time"]);
    },
    renameBackId: function (item) {
      item[this.dataIdName] = item.key;
      delete item.key;
    },

    setGrade(record){
      this.visible_form=true
      this.form_param.username = record.user_name
      this.form_param.labid = record.lab_id
      console.log("填写分数", record)
      this.handleOk()

    },
    onChangeGrade(value){

      this.form_param.score = value
      console.log(value)
    },
    handleOk() {
      this.postRequest("api/putuserscore", this.form_param).then((resp)=>{
        if(resp&&resp.status === 200){
          this.$message.success("分数上传成功");
          this.fetch(this.recvParam);
        }
        else{
          this.$message.error("上传失败")
        }
      })
      this.visible_form = false;
    },

    preview(record){
      this.visible = true;
      this.pdfUrl =
        this.baseUrl +
        "downloadhomework?userid=" +
        String(record.key) +
        "&labid=" +
        String(record.lab_id);
      console.log("pdfUrl = ", this.pdfUrl);
      this.pdfUrl = encodeURIComponent(this.pdfUrl);
    },
    handleCancelView() {
      this.visible = false;
    },
    downloadHomework(record){
      this.pdfUrl =
        this.baseUrl +
        "downloadhomework?userid=" +
        String(record.key) +
        "&labid=" +
        String(record.lab_id);
      console.log("pdfUrl = ", this.pdfUrl);
      window.location.href=this.pdfUrl
    },
    downloadAllHomework(){
      var fileUrl = this.baseUrl + "downloadhomeworks?labid=" + String(this.recvParam.labid)
      console.log("file Url = ", fileUrl)

      window.location.href= fileUrl
    }
  },
};
</script>

<style scoped>
.editable-add-btn {
  margin-bottom: 8px;
  margin-left: 10px;
  /*float: left;*/
}

.editable-row-operations a {
  margin-right: 8px;
}
</style>
