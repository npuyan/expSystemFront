<template>
  <a-modal
    :visible="visible"
    okText="确定"
    cancelText="返回"
    @cancel="
      () => {
        $emit('cancel');
      }
    "
     @ok="
        () => {
          $emit('create');
        }
      "
    height="750px"
    width="1050px"
  >
    <iframe
      :src="'/static/pdf/web/viewer.html?file=' + pdfUrl"
      height="750px"
      width="1000px"
    >
    </iframe>
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    pdfUrl: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      name: "pdf-view",
    };
  },
};
</script>

<style>

</style>