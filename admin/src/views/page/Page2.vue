<template>
  <div style="width:500px;margin:20px;">
    <h2 class="cal_title">签到管理</h2>
    <div class="calendar_box">
      <button class="month-less" @click="prevMonth"></button>
      <h4>{{year}}年{{month}}月{{clickDate?clickDate:date}}日</h4>
      <button class="month-add" @click="nextMonth"></button>
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
          <td
            v-for="(d,i) in day"
            :key="i"
            :class="{'cur_day':d == date}"
            @click.prevent="getDate(d)"
          >{{d}}</td>
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
      clickDate: "",
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
    this.month = this.today.getMonth() + 1; //本月
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
      //获取当月有多少天
      const month = this.month;
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
      //获取当月有多少天
      let len =
        this.getMonthLen() || new Date(this.year, this.month, 0).getDate(); //直接获取本月天数,不用判断平年闰年
      // let fd = new Date(this.year,this.month-1,1).getDate();// 每月的第一天几号
      // let ed = new Date(this.year,this.month,0).getDate();// 每月最后一天几号
      // console.log("本月第一天和最后一天各多少号:", fd,ed);

      // 获取本月第一天周几(月份正常计算,不用加1,上面已经加1了,这里需要减1)

      //获取上月总天数
      let pdays = new Date(this.year, this.month - 1, 0).getDate();
      // 获取每月第一天星期几
      let wd = new Date(this.year, this.month - 1, 1).getDay();
      console.log("星期", wd);
      //下一月填空
      let ndays = 1;
      // 填补上一月空格
      let pwdays = pdays - wd + 1;
      let arr = [];
      let tem = 0;
      let mark = false; //避免空渲染
      for (let i = 0; i < 6; i++) {
        arr[i] = new Array();
        for (let j = 0; j < 7; j++) {
          tem++;
          if (tem - wd > 0 && tem - wd <= len) {
            arr[i][j] = tem - wd;
            if (arr[i][j] >= len) mark = true;
          } else {
            // if (tem - wd <= 0) {
            //   arr[i][j] = pwdays;
            //   pwdays++;
            // } else {
            //   arr[i][j] = ndays;
            //   ndays++;
            // }
            arr[i][j] = "";
          }
        }
        if (mark) break;
      }

      this.dataArr = arr;
      console.log("结果", arr);
    },
    nextMonth() {
      if (this.month == 12) {
        this.year++;
        this.month = 1;
      } else {
        this.month++;
      }
      this.getCalendar();
      this.clickDate = "";
    },
    prevMonth() {
      if (this.month <= 1) {
        this.year--;
        this.month = 12;
      } else {
        this.month--;
      }
      this.getCalendar();
      this.clickDate = "";
    },
    getDate(d) {
      this.clickDate = d;
    }
  }
};
</script>
<style scoped>
.cal_title {
  margin: 20px 0;
  padding: 10px;
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

.cal_table tr th {
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
.cal_table tr td:hover {
  background: #f0f;
  color: #564131;
  transition: all 0.5s;
}
.cur_day {
  background-color: #f60;
  color: #fff;
}
.except_day {
  background-color: #ddd;
  color: #666;
}
.calendar_box {
  color: #555;
  position: relative;
}
.calendar_box button {
  position: absolute;
  width: 24px;
  height: 24px;
  top: 15px;
  border: none;
}
.calendar_box h4 {
  border-bottom: 2px solid #5bd999;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0px;
  padding: 12px 0;
}
.calendar_box button.month-less {
  left: 20px;
  background: url(../../assets/img/left-icon.png) no-repeat left -60px;
}
.calendar_box button.month-add {
  right: 20px;
  background: url(../../assets/img/right-icon.png) no-repeat left -60px;
}
</style>


