<template>
  <div class="default-page">
    <div class="banner">
      <img
        v-for="(item, index) in imgArray"
        :key="index"
        :src="item"
        v-show="n == index"
      />
      <div class="banner-circle">
        <ul>
          <li class="bannerpot"
            v-for="(item, index) in imgArray"
            :key="index"
            :class="index == n ? 'selected' : ''"
            @click="clickImg(index)"
          ></li>
        </ul>
      </div>
    </div>
    <br />
    <br />
    <br />
    <br />
    <div class="introduce">
      <h1>平台介绍</h1>
      超算习堂（EasyHPC）是基于国家高性能计算环境，面向全国广大高校本科生与研究生提供高性能计算优质教育内容的一个在线教育实践平台，由中山大学、清华大学、北京大学、中国科技大学等多所国内一流高校共同合作研发，获得了国家重点研发计划“高性能计算”重点专项支持。国家超算广州中心、国家超算长沙中心、中科院超算中心、上海超算中心等多家超算中心为平台提供机时资源与技术支持。平台涵盖课程教育、在线编程、在线实训、案例学习等诸多内容，通过结合丰富优质的课程资源与易于上手、即写即用的编程实践环境，使得用户可以在短期内轻松入门高性能计算并掌握基础的并行编程知识。对于有一定基础的高级用户，更有来自两百多道编程实战题、50个高性能计算经典案例以及编程竞赛平台的进阶挑战。超算习堂致力于提升广大学生和用户在高性能计算领域上的科学素养与实践能力，为我国高性能计算的可持续发展奠定基础。
    </div>
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      n: 0, //默认图片是第一张开始
      imgArray: [
        "https://easyhpc.net/carousels/carousel-1.jpg",
        "https://easyhpc.net/carousels/carousel-2.jpg",
        "https://easyhpc.net/carousels/carousel-3.jpg",
      ], //获取图片位置
    };
  },

  created() {
    this.play();
  },
  beforeDestroy() {
    clearInterval(this.timer); //清除定时器
  },

  methods: {
    play() {
      this.timer = setInterval(this.autoPlay, 5000); //用定时器控制每张图的显示时间
    },
    autoPlay() {
      this.$data.n++;
      if (this.imgArray.length == this.n) {
        this.n = 0;
      }
    },
    clickImg(index) {
      this.n = index; //显示当前点击的图片
    },
  },
};
</script>
<style>
.banner {
  width: 100%;
}
img {
  width: 100%;
  height: 100%;
}
.banner-circle {
  position: fixed;
  top: 50%;
  left: 47%;
}
.bannerpot {
  height: 10px;
  width: 10px;
  margin-left: 10px;
  border-radius: 50%;
  background: red;
}
.selected {
  background: green;
}
</style>
