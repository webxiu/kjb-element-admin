<template>
  <section>
    <h3 class="modify-pwd">密码修改</h3>
    <el-steps :active="active" finish-status="success" align-center style="margin:20px 0;">
      <el-step title="填写信息"></el-step>
      <el-step title="填写邮箱"></el-step>
      <el-step title="重置密码"></el-step>
    </el-steps>
    <!-- 审核表单 -->
    <!-- <div class="fromBox"> -->
    <keep-alive>
      <component :is="type" ref="child"></component>
    </keep-alive>
    <el-button v-if="active!=1" type="primary" @click="prevForm()">上一步</el-button>
    <el-button type="primary" @click="nextForm('ruleForm')">下一步</el-button>
    <!-- </div> -->
  </section>
</template>

<script>
import form1 from "./audit/form1";
import form2 from "./audit/form2";
import form3 from "./audit/form3";
export default {
  data() {
    return {
      allData: [], //装载数据
      type: "form1",
      active: 1
    };
  },
  components: { form1, form2, form3 },
  methods: {
    prevForm() {
      this.active--;
      if (this.active < 1) {
        this.active = 1;
      }
      this.setForm();
    },
    nextForm(formName) {
      //获取子组件数据  ref + 子组件中的方法
      this.$refs.child.abc()
      let childData = this.$store.state.auditInfo;
      console.log("结果数据", childData);
      ++this.active;
      if (this.active > 3) this.active = 3;
      this.setForm();
    },
    setForm() {
      console.log("当前步骤:" + this.active);
      if (this.active == 1) this.type = "form1";
      if (this.active == 2) this.type = "form2";
      if (this.active == 3) this.type = "form3";
    }
  }
};
</script>


<style scoped>
.modify-pwd {
  padding: 20px 0;
  font-size: 22px;
  text-align: center;
  background: #ffa9a9;
  color: #353535;
}
</style>


