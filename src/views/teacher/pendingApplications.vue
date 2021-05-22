<template>
  <a-table :columns="columns" :data-source="data" bordered>
    <template
      v-for="col in ['name', 'age', 'address']"
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
    <template slot="operation" slot-scope="text, record, index">
      <div class="editable-row-operations">
        <span>
          <a-popconfirm
            v-if="data.length"
            title="确定同意申请吗？"
            @confirm="() => agree(record)"
          >
            <a-button>同意</a-button>
          </a-popconfirm>
          <a-popconfirm
            v-if="data.length"
            title="确定拒绝申请吗？"
            @confirm="() => refuse(record)"
          >
            <a-button>拒绝</a-button>
          </a-popconfirm>
        </span>
      </div>
    </template>
  </a-table>
</template>
<script>
const columns = [
  {
    title: "请求类型",
    dataIndex: "requestType",
    scopedSlots: { customRender: "requestType" },
  },
  {
    title: "课程序号",
    dataIndex: "courseId",
    scopedSlots: { customRender: "courseId" },
  },
  {
    title: "申请人身份",
    dataIndex: "requestUserId",
    scopedSlots: { customRender: "requestUserId" },
  },
  {
    title: "申请时间",
    dataIndex: "requestTime",
    scopedSlots: { customRender: "requestTime" },
  },
  {
    title: "审核人ID",
    dataIndex: "checkUserId",
    scopedSlots: { customRender: "checkUserId" },
  },
  {
    title: "审核时间",
    dataIndex: "checkTime",
    scopedSlots: { customRender: "checkTime" },
  },
  {
    title: "审核状态",
    dataIndex: "state",
    scopedSlots: { customRender: "state" },
  },
  {
    title: "批复",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

export default {
  data() {
    return {
      columns,
      editingKey: "",
      data: [],
      timer: "",
      currentTime: new Date(), // 获取当前时间
      myId: this.$store.state.userId,
    };
  },
  mounted() {
    console.log("mounted!");
    console.log(this.myId);
    this.fetch();
  },
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    fetch() {
      var newList = [];

      var _this = this;
      _this
        .postRequest("api/getcourserequestqueue", {
          username: this.$store.state.userName,
        })
        .then((resp) => {
          console.log("返回数据quene");
          console.log(resp);
          resp.forEach((item) => {
            if (item.checkUserId == this.myId) {
              newList.push(item);
            }
          });
          newList.reverse();
          this.data = newList;
        });

      this.cacheData = this.data.map((item) => ({ ...item }));
    },
    agree(key) {
      this.updateTime();
      key.checkTime = this.currentTime;
      console.log(key);

      var params;
      params = {
        courserequest: key,
        agree: "true",
      };
      console.log("发送数据");
      console.log(params);
      var _this = this;
      _this.postRequest("api/checkcourserequest", params).then((resp) => {
        console.log("返回数据");
        console.log(resp);
        this.fetch();
      });
    },
    refuse(key) {
      this.updateTime();
      key.checkTime = this.currentTime;
      console.log(key);
      var params;
      params = {
        courserequest: key,
        agree: "false",
      };
      console.log("发送数据");
      console.log(params);
      var _this = this;
      _this.postRequest("api/checkcourserequest", params).then((resp) => {
        console.log("返回数据");
        console.log(resp);
        this.fetch();
      });
    },
    updateTime() {
      var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
      this.timer = setInterval(function () {
        _this.currentTime = //修改数据date
          new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getDate() +
          " " +
          new Date().getHours() +
          ":" +
          new Date().getMinutes() +
          ": " +
          new Date().getSeconds();
      }, 1000);
    },
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
