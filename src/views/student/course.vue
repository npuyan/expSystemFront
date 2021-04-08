<template>
  <div>
    <div id="target"></div>
    <div style="background-color: #f5f5f5; padding: 15px">
      <!-- style="border: 2px solid rgb(50, 50, 24)" -->
      <a-page-header
        :ghost="true"
        title="所有课程"
        sub-title="All courses"
        @back="backHistory"
      />
    </div>

    <div>
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="未选课程">
        <a-row>
      <a-list
        :grid="{ gutter: 1, column: 4 }"
        :data-source="courselist"
        size="default"
        :bordered="true"
        position
      >
        <a-list-item slot="renderItem" slot-scope="item, index">
          <img
            :src="imageUrl + item.picture"
            style="width: 100px; height: 100px"
            @click="gotoDetails(item.courseId, false, imageUrl + item.picture)"
          />
          <a-list-item-meta description="">
            <a slot="title">{{ item.courseName }}</a>

            <!-- <a-avatar slot="avatar" src="../assets/logo.png" /> -->
          </a-list-item-meta>
          <a-button type="primary" @click="selectthis(item.courseId)"
            >选课</a-button
          >
          <!-- <a-button type="primary" @click="dropthis(item.courseId)"
            >退课</a-button
          > -->
        </a-list-item>
      </a-list>
    </a-row>
      </a-tab-pane>
      <a-tab-pane key="2" tab="已选课程" force-render>
        <a-row>
      <a-list
        :grid="{ gutter: 1, column: 4 }"
        :data-source="selectedCourseList"
        size="default"
        :bordered="true"
        position
      >
        <a-list-item slot="renderItem" slot-scope="item, index">
          <img
            :src="imageUrl + item.picture"
            style="width: 100px; height: 100px"
            @click="gotoDetails(item.courseId, true, imageUrl + item.picture)"
          />
          <a-list-item-meta description="">
            <a slot="title">{{ item.courseName }}</a>

            <!-- <a-avatar slot="avatar" src="../assets/logo.png" /> -->
          </a-list-item-meta>
          <!-- <a-button type="primary" @click="selectthis(item.courseId)"
            >选课</a-button
          > -->
          <a-button type="primary" @click="dropthis(item.courseId)"
            >退课</a-button
          >
        </a-list-item>
      </a-list>
    </a-row>
      </a-tab-pane>
    </a-tabs>
    </div>


    

    
    

    <a-icon type="up-circle" style="fontsize: 50px" @click="backtop()" />
    <p>返回顶部</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      courselist: [],
      selectedCourseList: [],
      imageUrl: "api/downloadcoursepicture?filename=",
    };
  },

  mounted() {
    console.log("mounted!");
    this.fetchData()
    
  },

  methods: {
    fetchData(){
      var _this = this;
    _this.postRequest("api/getallcourse", {}).then((resp) => {
      if (resp) {
        console.log("得到课程数据");
        console.log(resp);
        // _this.courselist = resp;
        _this.setCourseList(resp);
      } else {
        console.log(resp);
        alert("连接服务器失败");
      }
    });
    },
    setCourseList(courselist_old) {
      var i, j;
      this.postRequest("api/getselectedcourses", {
        username: this.$store.state.userName,
      }).then((resp) => {
        if (resp) {
          console.log("已选课程数据", resp);
          this.selectedCourseList = resp;
          for (i = 0; i < courselist_old.length; i++) {
            for (j = 0; j < this.selectedCourseList.length; j++) {
              if (
                courselist_old[i].courseId ==
                this.selectedCourseList[j].courseId
              ) {
                courselist_old.splice(i, 1);
                i--;
                break;
              }
            }
          }
          this.courselist = courselist_old;
        }
      });
    },
    selectthis: function (id) {
      console.log("selectthis!");
      console.log(id);
      var _this = this;
      _this
        .postRequest("api/choosecourse", {
          username: String(this.$store.state.userName),
          courseid: String(id),
        })
        .then((resp) => {
          if (resp.status === 200) {
            console.log("请求成功，等待老师审批");
            console.log(resp);
            alert("请求成功，等待老师审批");
          } else {
            if (resp.status === 500) {
              alert(resp.msg);
            } else {
              alert(resp.msg);
            }
            console.log(resp);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    dropthis: function (id) {
      console.log("drop this course!");
      console.log(id);
      var _this = this;
      _this
        .postRequest("api/dropcourse", {
          username: String(this.$store.state.userName),
          courseid: String(id),
        })
        .then((resp) => {
          if (resp.status === 200) {
            console.log("退课成功");
            console.log(resp);
            this.fetchData()
            alert("退课成功");
          } else {
            if (resp.status === 500) {
              alert(resp.msg);
            } else {
              alert(resp.msg);
            }
            console.log(resp);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    gotoDetails(id, selected_sign, imageurl) {
      

      if(selected_sign === true){
        console.log("转到课程详情页, sign = ",selected_sign);
      
        this.$router.push({
        path: "/guestCourseDetails",
        query: {
          studentName: this.$store.state.userName,
          studentId: this.$store.state.userId,
          courseId: id,
          imageUrl: imageurl,
          },
        });
      }
      else{
        console.log("转到课程详情页,  = ",selected_sign);
        this.$router.push({
        path: "/guestCourseDetails",
        query: {
          studentName: '',
          studentId: -1,
          courseId: id,
          imageUrl: imageurl,
          },
        });
      }

    },

    backHistory() {
      this.$router.go(-1); // 返回上一层
    },

    backtop() {
      target.scrollIntoView();
    },
  },
};
</script>
<style>
</style>
