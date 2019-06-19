<template>
  <div>
    <h2>page2</h2>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navs: [
        {
          title: "用户管理",
        //   dropDown: []
        },
        {
          title: "用户来源",
          dropDown: [
            { childItem: "直接访问" },
            { childItem: "推广链接" },
            { childItem: "所有APP" },
            { childItem: "订单详情" },
          ]
        },
        {
          title: "用户分析",
        //   dropDown: []
        },
         {
          title: "用户问答",
          dropDown: [
            { childItem: "违规处理" },
            { childItem: "申请回复" },
            { childItem: "待处理" },
            { childItem: "已经处理" },
          ]
        },
      ]
    };
  },
  created() {
     this.$store.commit('setNav',this.navs)
  },
};
</script>
<style scoped>
</style>


