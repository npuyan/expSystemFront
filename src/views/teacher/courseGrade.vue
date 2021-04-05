<template>
  <div>
    <a-tabs @tabClick="callback">
      <a-tab-pane
        :key="courseitem.courseId"
        :tab="courseitem.courseName"
        v-for="courseitem in courselist"
      >
        <a-tabs @tabClick="callbacklab" tabPosition="left" type="line">
          <a-tab-pane
            :key="labitem.labId"
            :tab="labitem.labName"
            v-for="labitem in lablist"
          >
            <div v-if="clickflag == 1">
              <util-table
                :data="data"
                :columns="columns"
                :columns-name="columnsName"
                :data-id-name="dataIdName"
                :recv-param="parameter"
                :fetch-url="fetchUrl"
                :del-url="delUrl"
                :save-url="saveUrl"
              >
              </util-table>
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import UtilTable from "../teacher/utilGradeTable";
const columnsName = [
  "user_name",
  "homework_time",
  "score",
];
const columns = [
  {
    title: "学生姓名",
    dataIndex: "user_name",
    sorter: false,
    scopedSlots: { customRender: "user_name" },
  },
  {
    title: "提交时间",
    dataIndex: "homework_time",
    sorter: false,
    scopedSlots: { customRender: "homework_time" },
  },
  {
    title: "分数",
    dataIndex: "score",
    sorter: false,
    scopedSlots: { customRender: "score" },
  },
  {
    title: "作业操作",
    dataIndex: "aboutHomework",
    scopedSlots: { customRender: "aboutHomework" },
  },
  {
    title: "成绩操作",
    dataIndex: "gradeOpt",
    scopedSlots: {customRender: "gradeOpt"}
  }
];
export default {
  name: "labManage",
  components: { UtilTable },
  data() {
    // this.cacheData = data.map(item => ({...item}))
    return {
      courselist: [],
      lablist: [],
      clickflag: 0,
      data: [],
      loading: false,
      count: 0,
      editingKey: "",
      columns,
      columnsName,
      /* 此处必须是后端传过来的数据的逐渐名称，否则前端无法进行识别 */
      dataIdName: "user_id",
      parameter: { labid: 0 },
      /* 已完成1,2,3 */
      fetchUrl: "api/getscoresbylabid",
      delUrl: "api/delcourselabbyid",
      saveUrl: "api/updatecourselab",
    };
  },
  methods: {
    callback(key) {
      console.log("callback");
      console.log(key);
       var _this = this;
      _this
        .postRequest("api/getlabbycourseid", {
          courseid: key,
        })
        .then((resp) => {
          console.log("返回数据");
          console.log(resp);
          this.lablist = resp;
          // this.clickflag = 1;
          if (this.lablist.length > 0) {
            this.callbacklab(this.lablist[0].labId)
          }
        });

    },
    callbacklab(key) {
      console.log("callbacklab", key);
      this.postRequest("api/getscoresbylabid", {
        labid: key
      }).then((resp)=>{
        if(resp){
          console.log("得到成绩列表", resp)
        }
      })
      this.clickflag = 1;
      this.parameter.labid = key
     
    },
  },
  mounted() {
    console.log("mounted!");

    var _this = this;
    _this
      .postRequest("api/getcoursebyteacher", {
        username: this.$store.state.userName,
      })
      .then((resp) => {
        console.log("返回数据");
        console.log(resp);
        this.courselist = resp;
        
        // this.clickflag = 1;
        if (this.courselist.length > 0) {
          this.callback(this.courselist[0].courseId)
        }
      });
  },
};
</script>

<style scoped>
</style>
