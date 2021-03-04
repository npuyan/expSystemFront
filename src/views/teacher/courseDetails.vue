<!-- TODO:用于查看编辑课程详细信息 -->
<template>
  <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
    课程详情页, 教师用于查看编辑课程详细信息

    <div class="markdown-body">
      <my-markdown></my-markdown>
    </div>
  </div>
</template>

<script>
import myMarkdown from "../../assets/实验.md"
import 'highlight.js/styles/github.css'
import 'github-markdown-css'

export default {
  components: {
    myMarkdown,
  },
};
</script>

<style>
  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
    text-align: left;
  }
</style>