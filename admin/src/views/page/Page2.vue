<template>
  <div style="width:500px;margin:20px;">
    <h2 class="cal_title">签到管理</h2>
    <div>
      <table class="cal_table">
        <tr>
          <th>日</th>
          <th>一</th>
          <th>二</th>
          <th>三</th>
          <th>四</th>
          <th>五</th>
          <th>六</th>
        </tr>
        <tr v-for="(day,index) in dataArr" :key="index">
          <td v-for="(d,i) in day" :key="i" :class="{'cur_day':d == date}">{{d}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      today: new Date(),
      year: "",
      month: "",
      day: "",
      date: "",
      dataArr: [],
      navs: [
        {
          title: "用户管理"
          //   dropDown: []
        },
        {
          title: "用户来源",
          dropDown: [
            { childItem: "直接访问" },
            { childItem: "推广链接" },
            { childItem: "所有APP" },
            { childItem: "订单详情" }
          ]
        },
        {
          title: "用户分析"
          //   dropDown: []
        },
        {
          title: "用户问答",
          dropDown: [
            { childItem: "违规处理" },
            { childItem: "申请回复" },
            { childItem: "待处理" },
            { childItem: "已经处理" }
          ]
        }
      ]
    };
  },
  created() {
    this.year = this.today.getFullYear();
    this.month = this.today.getMonth() + 1;
    this.day = this.today.getDay();
    this.date = this.today.getDate();

    this.$store.commit("setNav", this.navs);
    this.getCalendar();
  },
  methods: {
    runNian() {
      if (
        (this.year % 4 == 0 && this.year % 100 != 0) ||
        this.year % 400 == 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    getMonthLen() {
      const month = this.month;
      console.log(7748, month);
      if (month == 2) {
        if (this.runNian) {
          return 29;
        } else {
          return 28;
        }
      } else {
        if (month < 8) {
          if (month % 2 > 0) {
            return 31;
          } else {
            return 30;
          }
        } else {
          if (month % 2 > 0) {
            return 30;
          } else {
            return 31;
          }
        }
      }
    },
    getCalendar() {
      let len = this.getMonthLen();
      let date = new Date();
      // let fd = new Date(this.year,this.month-1,1).getDate();// 每月的第一天
      // let ed = new Date(this.year,this.month,0).getDate();// 每月最后一天

      // 获取本月第一天周几,月份正常计算,不用加1,上面已经加1了,这里需要减1
      let fd = new Date(this.year, this.month - 1, 1).getDay();
      console.log("本月第一天周", fd, this.month - 1);
      let arr = [];
      let tem = 0;
      for (let i = 0; i < 6; i++) {
        arr[i] = new Array();
        for (let j = 0; j < 7; j++) {
          tem++;
          if (tem - fd > 0 && tem - fd <= len) {
            arr[i][j] = tem - fd;
          } else {
            arr[i][j] = "";
          }
        }
      }
      this.dataArr = arr;
      console.log("结果", arr);
    }
  }
};
</script>
<style scoped>
.cal_title {
  margin: 20px 0;
  padding:10px;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  text-align: center;
}
.calendar {
  width: 100%;
  margin: 10px 0px 20px 0px;
  color: #555;
  position: relative;
}
.cal_table {
  width: 100%;
  text-align: center;
}

.cal_table tr th{
 height: 60px;
  line-height: 60px;
  text-align: center;
  font-weight: 700;
  font-size: 22px;
}
.cal_table tr td {
  border: 1px solid #e8e8e8;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 22px;
  font-family: arial;
}
.cur_day{
  background-color: #f60;
  color: #fff;
}
</style>


