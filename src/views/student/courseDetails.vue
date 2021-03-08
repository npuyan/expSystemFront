<template>
<div>
  <br/>
  <br/>
  <br/>
  <br/>
  <a-row type="flex" justify="center" align="top">
    <a-col :span="3">
      <div class="timeLine" text-align=left;>
        <h1>学习进度</h1>
        <br/>
        <a-timeline mode="left">
          <a-timeline-item color="green">
            第一次实验
          </a-timeline-item>
          <a-timeline-item color="green">
            第二次实验
          </a-timeline-item>
          <a-timeline-item color="red">
            <p>第三次实验</p>
          </a-timeline-item>
          <a-timeline-item color="gray">
            <p>第四次实验</p>
          </a-timeline-item>
        </a-timeline>
      </div>
    </a-col>

    <a-col :span="8">
      <div>
        <a-list :grid="{ gutter: 16, column: 1 }" :data-source="data">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-card :title="item.title">
              {{ item.text }}
            </a-card>
          </a-list-item>
        </a-list>
      </div>
    </a-col>
  </a-row>

</div>
</template>

<script>
const data = [
  {
    title: "第一次实验",
    text: "什么是操作系统",
  },
  {
    title: "第二次实验",
    text: "如何安装一个操作系统",
  },
  {
    title: "第三次实验",
    text: "为操作系统开发驱动",
  },
  {
    title: "第四次实验",
    text: "设计一个操作系统",
  },
];

export default {
  data() {
    return {
      data
    };
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
