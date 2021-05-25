<template>
<div>
  <div v-if="guest === true" style="background-color: #f5f5f5; padding: 15px">
      <!-- style="border: 2px solid rgb(50, 50, 24)" -->
      <a-page-header
        :ghost="true"
        :title="courseitem.courseName"
        sub-title="课程详细信息"
        @back="backHistory"
      />
    </div>
  <div align="center">
    <div
      :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
      align="center"
    >
      <div style="width: 50%">
        <a-descriptions  bordered :column="1">
          <a-descriptions-item label="课程名称">
            <h2>{{ courseitem.courseName }}</h2>
          </a-descriptions-item>
          <a-descriptions-item label="课程描述">
            {{ courseitem.remark }}
          </a-descriptions-item>
        </a-descriptions>
        <br />
        <br />
      </div>

      <h2>实验详情</h2>
      <a-row type="flex" justify="center" align="top">
        
        <a-timeline>
          <a-timeline-item v-for="item in lablist" :key="item.labId">
            <a-icon v-if="item.score == 0" slot="dot" type="clock-circle-o" style="font-size: 16px;" />
            <a-icon v-if="item.score > 0" slot="dot" type="check-circle" style="font-size: 16px;" theme="twoTone" two-tone-color="#52c41a" />
            <a-card hoverable style="width: 600px">
              <!-- <img slot="cover" alt="example" :src="imageUrl" /> -->
              <template
                v-if="guest === false"
                slot="actions"
                class="ant-card-actions"
              >
                <a-button icon="eye" @click="preview(item.labId)">
                  预览作业
                </a-button>

                <a-upload
                  v-if="userType === '2'"
                  name="file"
                  :multiple="true"
                  :action="uploadUrl"
                  @change="uploadHomework"
                >
                  <a-button @click="setUploadUrl(item.labId)">
                    <a-icon type="upload" />提交作业
                  </a-button>
                </a-upload>

                <div v-if="userType === '2'">
                  <a-row>
                    <a-col :span="8">成绩： </a-col>
                    <a-col :span="8">
                      <a-statistic :value="item.score" class="demo-class">
                      </a-statistic>
                    </a-col>
                  </a-row>
                </div>

                <div v-if="userType === '1'">
                  成绩：
                  <a-input-number
                    :min="0"
                    :max="100"
                    :step="0.1"
                    :default-value="item.score"
                    @change="onChangeGrade"
                  >
                  </a-input-number>
                  <a-button icon="upload" @click="uploadscore(item.labId)">
                  </a-button>
                </div>
              </template>
              
              <a-card-meta
                :title="item.labName"
                :description="item.remarks"
                @click="onJumpLab(item)"
              >
                <a-avatar slot="avatar" :src="imageUrl" />
              </a-card-meta>
              <div v-if="loadingflag === true">
                <a-spin tip="Loading..." size="large"/>
              </div>
            </a-card>
          </a-timeline-item>
        </a-timeline>
      </a-row>
      <!-- </a-list-item>
        <br />
      </a-list> -->
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
    <div style="width: 50%">
      <h2>课程评价</h2>
      <a-comment v-if="userType === '2'">
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
        <div slot="content">
          <a-form-item>
            <a-textarea
              :rows="4"
              :value="commentValue"
              @change="commentHandleChange"
            />
          </a-form-item>
          <a-form-item>
            <a-button
              html-type="submit"
              :loading="submitting"
              type="primary"
              @click="commentHandleSubmit"
            >
              Add Comment
            </a-button>
          </a-form-item>
        </div>
      </a-comment>

      <a-list
        class="comment-list"
        :header="`共有 ${momentdata.length} 条评论`"
        item-layout="horizontal"
        :data-source="momentdata"
      >
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-comment
            :author="item.userId"
            avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          >
            <!-- <template slot="actions">
              <span v-for="action in item.actions">{{ action }}</span>
            </template> -->
            <p slot="content">
              {{ item.text }}
            </p>
            <a-tooltip slot="datetime" :title="item.time">
              <span>{{ item.time }}</span>
            </a-tooltip>
          </a-comment>
        </a-list-item>
      </a-list>
    </div>
  </div>
</div>
</template>

<script>
import pdfView from "../teacher/pdfView";
import moment from "moment";

export default {
  components: { pdfView },
  data() {
    return {
      imageUrl: "",
      courseId: "",
      courseitem: null,
      userName: "",
      userId: "",
      lablist: [],
      userType: 0,
      guest: false,
      visible: false,
      baseUrl: this.$store.state.baseUrl +"/api/", //http://localhost:8800/downloadhomework?userid=12&labid=1
      pdfUrl: "",
      uploadUrl: "",
      newScore: null,
      submitting: false,
      momentdata: [],
      commentValue: "",
      moment,
      loadingflag: false,
    };
  },

  mounted() {
    if( this.$store.state.userName != ''){
      console.log("userName != undefined")
    }
    else{
      console.log("userName == undefined")
      console.log("userName = ", sessionStorage.getItem("userName"))
      this.$store.commit('update', ['userName', sessionStorage.getItem("userName")])
      this.$store.commit('update', ['userId', sessionStorage.getItem("userId")])
      this.$store.commit('update', ['userType', sessionStorage.getItem("userType")])
    }
    window.sessionStorage
    sessionStorage.setItem('userName', this.$store.state.userName)
    sessionStorage.setItem('userId', this.$store.state.userId)
    sessionStorage.setItem('userType', this.$store.state.userType)
    console.log("userName = ", sessionStorage.getItem("userName"))

    console.log("进入courseDetials");
    this.setvalues();
    
  },

  watch: {
    $route: {
      handler(newVal, oldVal) {
        this.setvalues();
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {

    preview(id) {
      this.visible = true;
      this.pdfUrl =
        this.baseUrl +
        "downloadhomework?userid=" +
        String(this.userId) +
        "&labid=" +
        String(id);
      console.log("pdfUrl = ", this.pdfUrl);
      this.pdfUrl = encodeURIComponent(this.pdfUrl);
    },
    setUploadUrl(id) {
      this.uploadUrl =
        this.baseUrl + "uploadhomework?userid=" + this.userId + "&&labid=" + id;
    },
    uploadHomework(info) {
      console.log("uploadUrl = ", this.uploadUrl);
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },

    handleCancelView() {
      this.visible = false;
    },
    commentHandleChange(e) {
      this.commentValue = e.target.value;
    },

    commentHandleSubmit() {
      if (!this.commentValue) {
        return;
      }

      this.postRequest("api/submitcoursecomment",{
        username: this.userName,
        courseid: this.courseId,
        text: this.commentValue
      }).then((resp)=>{
        if(resp&&resp.status===200){
          console.log(resp.msg)
          this.$message.success(resp.msg)
          this.getcoment(this.courseId)
        }
        else {
          this.$message.error(评论失败)
        }
      })
    },
    setvalues() {
      console.log("studentID = ", this.$route.query.studentId)
      this.imageUrl = this.$route.query.imageUrl;
      this.courseId = this.$route.query.courseId;
      this.userName = this.$route.query.studentName;
      this.userId = this.$route.query.studentId;
      this.userType = this.$store.state.userType;
      if(this.userId == -1){
        this.guest = true
        this.userType = 0
      }
      

      console.log("userType = ", this.userType)

      this.postRequest("api/getcoursebyid", {
        id: this.courseId,
      }).then((resp) => {
        if (resp) {
          console.log("返回课程数据 ", resp);
          this.courseitem = resp;
        }
      });

      this.getlab(this.courseId);
      this.getcoment(this.courseId);
    },
    onJumpLab: function (labitem) {
      console.log("labitme");
      console.log(labitem);
      this.loadingflag = true;
      // this.$router.push({path: '/novnc', query: {port: 6080, labObj: labitem}})
      this.postRequest("api/openlabenv", {
        //  TODO 传入课程，实验，用户名，打开对应的实验环境并返回启动的的端口
        username: String(this.$store.state.userName),
        courselab: labitem,
      }).then((resp) => {
        //  TODO 跳转到novnc并连接到返回的端口
        this.loadingflag = false;
        if (resp && resp.status === 200) {
          console.log(resp);
          this.$router.push({
            path: "/novnc",
            query: { port: resp.obj, labObj: labitem },
          });
        } else {
          this.$router.push({
            path: "/novnc",
            query: { port: 6080, labObj: labitem },
          });
        }
      });
    },

    getlab: function (key) {
      console.log("key" + key);

      var _this = this;
      _this
        .postRequest("api/getlabbycourseid", {
          courseid: String(key),
        })
        .then((resp) => {
          if (resp) {
            console.log("得到课程实验数据");
            console.log(resp);
            _this.lablist = resp;
            if(this.guest === false){
              this.getlabscore();
            }
          } else {
            alert("连接服务器失败");
          }
        });
    },
    getlabscore() {
      var i = 0,
        index;
      console.log("studentName=", this.userName);
      console.log("lablist = ", this.lablist);
      for (i = 0; i < this.lablist.length; i++) {
        this.postRequest("api/getuserscore", {
          username: this.userName,
          labid: this.lablist[i].labId,
        }).then((resp) => {
          if (resp) {
            console.log("返回数据：", resp);

            index = this.mapRespLabid(resp.labId);
            this.lablist[index]["score"] = resp.score;
            this.lablist[index]["homeworktime"] = resp.homeworktime;
            this.$forceUpdate();
          }
        });
      }
    },
    getcoment(id) {
      this.postRequest("api/getcoursecomment", {
        courseid: id,
        asc: false,
      }).then((resp) => {
        if (resp) {
          this.momentdata = resp;
          this.msToDate();
        }
      });
    },
    msToDate() {
      var i;
      for (i = 0; i < this.momentdata.length; i++) {
        this.momentdata[i]["time"] = new Date(this.momentdata[i].time);
      }
      console.log("commentdata = ", this.momentdata);
    },
    mapRespLabid(labid) {
      var i, index;
      for (i = 0; i < this.lablist.length; i++) {
        if (labid == this.lablist[i].labId) {
          index = i;
        }
      }

      return index;
    },
    mapRespUserid(userid) {
      var i, index;
      // this.postRequest("api/")
    },
    uploadscore(id) {
      console.log("newScore = ", this.newScore);
      this.postRequest("api/putuserscore", {
        username: this.userName,
        labid: id,
        score: this.newScore,
      }).then((resp) => {
        if (resp && resp.status === 200) {
          console.log("分数上传成功");
          this.$message.success("分数上传成功");
        }
      });
    },
    onChangeGrade(value) {
      console.log("changed", value);
      this.newScore = value;
    },
    backHistory() {
      this.$router.go(-1); // 返回上一层
    },
  },
};
</script>

<style scoped>
/* .timeLine {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 600px;
  margin: 0 auto;
  padding: 45px;
  text-align: left;
} */
</style>
