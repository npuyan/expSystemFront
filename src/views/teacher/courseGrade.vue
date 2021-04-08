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
            <!-- <a-tabs default-active-key="1">
              <a-tab-pane key="1">
                <span slot="tab">
                  <a-icon type="apple" />
                  已交作业
                </span> -->
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
              <!-- </a-tab-pane> -->
              <!-- <a-tab-pane key="2">
                <span slot="tab">
                  <a-icon type="android" />
                  未交作业
                </span>
                <a-table
                  bordered
                  :columns="columns_2"
                  :data-source="noHandUp_list"
                  :loading="loading"
                >
                  <template
                    v-for="col in columnsName_2"
                    :slot="col"
                    slot-scope="text, record, index"
                  >
                    <div :key="col">
                      <a-input
                        v-if="record.editable"
                        style="margin: -5px 0"
                        :value="text"
                        @change="
                          (e) => handleChange(e.target.value, record.key, col)
                        "
                      />
                      <template v-else>
                        {{ text }}
                      </template>
                    </div>
                  </template>
                  <template slot="info" slot-scope="text, record, index">
                    <a-button @click="Details(record)">详细信息</a-button>
                  </template>
                </a-table>
              </a-tab-pane> -->
            <!-- </a-tabs> -->
          </a-tab-pane>
        </a-tabs>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import UtilTable from "../teacher/utilGradeTable";
const columnsName = ["user_name", "homework_time", "score"];
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
    scopedSlots: { customRender: "gradeOpt" },
  },
];
const columnsName_2 = [
  "userName",
  "password",
  "phone",
  "email",
  "state",
  "userType",
];
const columns_2 = [
  {
    title: "用户名",
    dataIndex: "username",
    sorter: false,
    scopedSlots: { customRender: "username" },
  },
  {
    title: "电话",
    dataIndex: "phone",
    sorter: false,
    scopedSlots: { customRender: "phone" },
  },
  {
    title: "邮箱",
    dataIndex: "email",
    sorter: false,
    scopedSlots: { customRender: "email" },
  },
  {
    title: "用户状态",
    dataIndex: "state",
    sorter: false,
    scopedSlots: { customRender: "state" },
  },
  {
    title: "用户类型",
    dataIndex: "userType",
    sorter: false,
    scopedSlots: { customRender: "userType" },
  },
  {
    title: "学习详情",
    dataIndex: "info",
    scopedSlots: { customRender: "info" },
  },
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
      columns_2,
      columnsName_2,
      /* 此处必须是后端传过来的数据的逐渐名称，否则前端无法进行识别 */
      dataIdName: "user_id",
      parameter: { labid: 0 },
      /* 已完成1,2,3 */
      fetchUrl: "api/getscoresbylabid",
      delUrl: "api/delcourselabbyid",
      saveUrl: "api/updatecourselab",

      // noHandUp_list: [],
      // handUp_list: [],
      // allStudent_list: []
    };
  },
  methods: {
    callback(key) {
      console.log("callback");
      console.log(key);

      var _this = this;
      // _this
      //   .postRequest("api/getallstudentbycourse", {
      //     courseid: key,
      //   })
      //   .then((resp) => {
      //     if (resp) {
      //       console.log("本课程所有学生", resp)
      //       this.allStudent_list = resp;
            _this
              .postRequest("api/getlabbycourseid", {
                courseid: key,
              })
              .then((data) => {
                console.log("返回数据");
                console.log(data);
                this.lablist = data;
                // this.clickflag = 1;
                if (this.lablist.length > 0) {
                  this.callbacklab(this.lablist[0].labId);
                }
              });
        //   }
        // });
    },
    callbacklab(key) {
      console.log("callbacklab", key);
      this.postRequest("api/getscoresbylabid", {
        labid: key,
      }).then((resp) => {
        if (resp) {
          console.log("得到成绩列表", resp);
          this.handUp_list = resp;
          // this.getNoHandUp();
        }
      });
      this.clickflag = 1;
      this.parameter.labid = key;
    },
    // getNoHandUp() {
    //   var i, j;
    //   this.noHandUp_list = []
    //   for(i =0;i<this.allStudent_list.length;i++){
    //     this.noHandUp_list.push(this.allStudent_list[i])
    //   }
    //   for (i = 0; i < this.noHandUp_list.length; i++) {
    //     for (j = 0; j < this.handUp_list.length; j++) {
    //       console.log("noHandUp =", this.noHandUp_list[i].username);
    //       console.log("HandUp =", this.handUp_list[j].user_name);
    //       if (
    //         this.noHandUp_list[i].username == this.handUp_list[j].user_name &&
    //         this.handUp_list[j].homework_time != null
    //       ) {
    //         this.noHandUp_list.splice(i, 1);
    //         i--;
    //         break;
    //       }
    //     }
    //   }
    // },
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
          this.callback(this.courselist[0].courseId);
        }
      });
  },
};
</script>

<style scoped>
</style>
