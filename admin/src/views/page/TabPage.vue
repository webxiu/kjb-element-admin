<template>
  <section>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        <h5>5555555555</h5>
        <h5>6666666666</h5>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
    <!-- 树遍历 -->
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" style="width:150px;"></el-tree>
  </section>
</template>
<script>
export default {
  data() {
    return {
      activeName: "second",
      // 树节点
      data: [
        {
          label: "广东省",
          children: [
            {
              label: "广州市",
              children: [
                {
                  label: "白云区",
                  label: "天河区",
                }
              ]
            }
          ]
        },
        {
          label: "食物类",
          children: [
            {
              label: "水果类",
              children: [
                {
                  label: "苹果",
                  label: "桃子"
                }
              ]
            },
            {
              label: "蔬菜类",
              children: [
                {
                  label: "胡萝卜"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 树节点
    handleNodeClick(data) {
      console.log('树数据:',data);
    }
  }
};
</script>