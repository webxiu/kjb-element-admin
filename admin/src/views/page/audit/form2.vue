<template>
  <!-- 审核表单 -->
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="填写邮箱" prop="email">
      <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
</template>


<script>
export default {
  data() {
   
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱号码"));
      } else {
        callback();
      }
    };
    return {
      active: 0,
      ruleForm: {
        email: "",
      },
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
      }
    };
  },
  methods: {
    abc() {
      this.$refs.ruleForm.validate(validate => {
        if (validate) {
          console.log(991,this.ruleForm);
          
          this.$store.commit('setAuditInfo',this.ruleForm);
          
        } else {
          this.$message({
            message: "格式有误",
            type: "error"
          });
        }
      });
    }
  }
};
</script>


<style scoped>
.fromBox {
  white-space: nowrap;
  width: 2000px;
}
.demo-ruleForm {
  float: left;
  width: 100%;
}
</style>


