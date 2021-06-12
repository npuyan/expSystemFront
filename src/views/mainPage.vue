<template>
  <a-layout id="components-layout-demo-top-side">
    <a-layout-header>
      <div class="topHeader">
        <a-row type="flex">
        <div class="logoleft" >
          <img src="../assets/logoko.png" @click="backDefaultPage"  />
        </div>
        <div class="leftmenu">
          <a-tabs @tabClick="menuCallback">
            <a-tab-pane
              :key="item.key"
              :tab="item.title"
              v-for="item in menulist"
            >
            </a-tab-pane>
          </a-tabs>
        </div>
        <div class="rightmenu">
          <a-button @click="loginCallback">{{ signlist[0].title }}</a-button>
          <a-button @click="logupCallback">{{ signlist[1].title }}</a-button>
        </div>
        </a-row>
      </div>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      

      <div class="default-page">
    <div class="banner">
      <!-- <img
        v-for="(item, index) in imgArray"
        :key="index"
        :src="item"
        v-show="n == index"
      /> -->
      <img src="../assets/banner2.jpg" v-show="n == 0" />
      <img src="../assets/banner3.jpg" v-show="n == 1" />
      <div class="banner-circle">
        <ul class="bannerpotdiv">
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
      NWPU实验云课堂 是基于集群服务器环境，面向西工大学生与教师提供在线实验教学的一个在线教育实践平台，平台涵盖课程实验，成绩管理等多个功能，通过结合丰富优质的课程资源与易于上手、即写即用的编程实践环境，使得用户可以在短期内轻松上手计算机实验课程，提高实验教学的效率。
    </div>
    <br />
    <br />
    <br />
    <br />
  </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
    </a-layout-footer>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],
      studentMenulist: [
        {
          title: "学习天地",
          key: 1,
        },
        {
          title: "课程管理",
          key: 2,
        },
      ],
      signlist: [
        {
          title: "登录",
          key: 1,
        },
        {
          title: "注册",
          key: 2,
        },
      ],

      n: 0, //默认图片是第一张开始
      imgArray: [
        "../assets/banner2.jpg",
        "../assets/banner3.jpg"
      ], //获取图片位置
    };
  },
  mounted() {
    // this.menulist = this.studentMenulist;
    // this.$router.push({path: '/defaultPage'})
  },

  created() {
    this.play();
  },
  beforeDestroy() {
    clearInterval(this.timer); //清除定时器
  },

  methods: {
    menuCallback() {},
    logupCallback() {
      this.$router.push({ path: "/logup" });
    },
    loginCallback() {
      this.$router.push({ path: "/login" });
      this.menulist = this.studentMenulist;
    },

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
    backDefaultPage() {
      this.$router.push({path: '/'})
    }
  },
};
</script>
<style>
#components-layout-demo-top-side .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
.ant-layout-header {
  background: #fff;
  color: #fff;
  /* height: 15%; */
}

.topHeader {
  width: 100%;
}
.logoleft {
  width: 15%;
  display: block;
  float: left;
  height: 56px;
}
.leftmenu {
  width: 65%;
  text-align: left;
  display: block;
  float: left;
}
.rightmenu {
  width: 20%;
  text-align: right;
  display: block;
  float: left;
}
.banner {
  width: 100%;
  height: 300px;
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
.bannerpotdiv {
  display: flex;
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
