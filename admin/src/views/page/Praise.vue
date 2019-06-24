<template>
  <el-table :data="tableData" style="width: 100%" height="500px">
    <el-table-column prop="theme_id" label="内容id" width="180"></el-table-column>
    <el-table-column prop="theme" label="名称" width="180"></el-table-column>
    <el-table-column prop="user_id" label="用户id" width="120"></el-table-column>
    <el-table-column prop="status" label="点赞状态" width="150"></el-table-column>
    <el-table-column prop="date" label="点赞日期" width="200"></el-table-column>
  </el-table>
</template>
<script>
import { requestZan } from "@/api/api";
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
   
  },
  methods: {},
  mounted() {
    let user_id = JSON.parse(this.cookies.getCookie("cur_user"))._handleid;
    requestZan({ user_id: user_id }).then(res => {
      this.tableData = res;
    });
  }
};
</script>
<style scoped>
.calendar {
  width: 600px;
  height: 600px;
  margin: 50px 0px 20px 0px;
  color: #555;
  position: relative;
}
.calendar h4 {
  border-bottom: 2px solid #5bd999;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0px;
  padding: 12px 0;
}
.calendar button {
  position: absolute;
  width: 24px;
  height: 24px;
  top: 15px;
  border: none;
}
.calendar button:focus {
  border: none;
  outline: none;
}
.calendar button.month-less {
  left: 20px;
  background: url(../../assets/img/left-icon.png) no-repeat left -60px;
}
.calendar button.month-add {
  right: 20px;
  background: url(../../assets/img/right-icon.png) no-repeat left -60px;
}
.calendar .sign_tab {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e8e8e8;
  border-top: 0;
  table-layout: fixed;
}
.calendar .sign_tab th {
  text-align: center;
  height: 60px;
  line-height: 60px;
  font-weight: 700;
}
.calendar .sign_tab td {
  border: 1px solid #e8e8e8;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 22px;
  font-family: arial;
}
.calendar .sign_tab td.over {
  background-color: #fff;
  border-left: 0;
  border-right: 0;
}
.calendar .ui-state-default {
  background: url(../../assets/img/checkin.png) no-repeat center center;
}
.calendar .sign_tab td.cur_day {
  background-color: #ffd2d2;
  color: #fff;
}
</style>