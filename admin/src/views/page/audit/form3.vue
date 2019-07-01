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
    <el-form-item label="密码" prop="pass">
      <el-input type="text" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="text" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model.number="ruleForm.age"></el-input>
    </el-form-item>
  </el-form>
</template>


<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      active: 0,
      ruleForm: {
        pass: "",
        checkPass: "",
        age: ''
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  // methods: {
  //   prevForm() {
  //     if (this.active-- < 0) this.active = 0;
  //   },
  //   nextForm(formName) {
  //     this.$refs[formName].validate(valid => {
  //       if (valid) {
  //         this.$message({
  //           message: "验证通过",
  //           type: "success"
  //         });
  //         if (this.active++ > 2) this.active = 2;
  //       } else {
  //         this.$message({
  //           message: "验证不通过",
  //           type: "error"
  //         });
  //         return false;
  //       }
  //     });
  //   }
  // }
   methods: {
    abc() {
      return this.ruleForm;
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


