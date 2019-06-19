<template>
  <div class="container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <h3 class="title">系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input v-model="ruleForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleSubmit"
          :loading="logining"
        >登录</el-button>
        <!--<el-button @click.native.prevent="handleReset">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import NProgress from "nprogress";
import { requestLogin } from "@/api/api";
export default {
  name: "Login",
  data() {
    return {
      logining: false,
      ruleForm: {
        account: "admin",
        checkPass: "123456"
      },
      rules: {
        account: [
          { required: true, message: "请输入帐号", trigger: "blur" },
          { min: 5, max: 15, message: "长度在 5 到 15 个字符", trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 15, message: "长度在 5 到 15 个字符", trigger: "blur" }
        ],
        // age: [{ validator: checkAge, trigger: "blur" }]
      },
      checked: true
    };
  },
  methods: {
    handleSubmit(ev) {
      var _this = this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.logining = true;
          NProgress.start();
          //获取用户信息
          let loginParam = {
            username: this.ruleForm.account,
            password: this.ruleForm.checkPass
          }
          // console.log(loginParam)
          //提交数据
          requestLogin(loginParam).then(data => {
            this.logining = false;
            NProgress.done();
            let {password,username} = data[0];
            console.log(loginParam.username,data[0]);
            if(loginParam.username == username){
              this.$message({
                message:'登录成功!',
                type:'success'
              })
              //设置缓存
              // this.$store.dispatch('userName',username)
              localStorage.setItem('user',username)
              //跳转首页
              this.$router.push({path:'/home'})
            }else{
            this.logining = false;
              this.$message({
                message:'登录失败!',
                type:'error'
              })
            }
          }).catch( err => {
            NProgress.done();
            this.logining = false;
            this.$message({
                message:'请检查用户名或密码是否正确!',
                type:'error'
              })
            // console.log('失败',err)
          })

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
$bg: #fff;
$title: #505458;
$dark_gray: #889aa4;
.container {
  background: $bg;
  display: flex;
  justify-content: center; /*子元素水平居中*/
  align-items: center; /*子元素垂直居中*/
  display: -webkit-flex; //兼容写法
  height: 100%;

  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    // margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: $title;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>


