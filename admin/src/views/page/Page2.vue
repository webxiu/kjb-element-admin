<template>
  <div style="width:500px;margin:20px;">
    <div style="display:flex;">
      <h2 class="cal_title" @click="report">点击签到</h2>
      <h2 class="cal_title" @click="getToday">今天</h2>
      <span class="signined">本月已签到{{this.checkIn.length}}天</span>
    </div>
    <div class="calendar_box">
      <button class="month-less" @click="prevMonth"></button>
      <h4>{{year}}年{{fomateZero(month)}}月{{fomateZero(date)}}日</h4>
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
            v-for="(data,i) in day"
            :key="i"
            :date="dataTime('-',data.d)"
            :class="{'cur_day':currentDay==data.d && defaultYearMonth,'default_date':!defaultYearMonth && data.d==date}"
            @click.prevent="getDate(data.d)"
            v-if="data.msg==1"
          >
            {{data.d}}
            <p v-if="isCheck(data)" class="ischecked">签</p>
          </td>
          <!-- :class="{ 'over':data.msg == 0 || data.msg == 2}" -->
          <td
            v-else
            class="over"
            :data="dataTime('-',data.d,data.msg)"
            @click.prevent="getMonth(data.d,data.msg)"
          >{{data.d}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import { requestSignin } from "@/api/api";
export default {
  data() {
    return {
      today: new Date(),
      year: "",
      month: "",
      day: "",
      date: "",
      clickDate: "", //点击更换日期
      defaultToday: "", //默认今天
      defaultYearMonth: "", //默认年月
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
      ],
      // 签到日期集合
      checkIn: [1, 2, 3, 5, 9, 12, 16,20, 25, 28]
    };
  },
  created() {
    this.year = this.today.getFullYear();
    this.month = this.today.getMonth() + 1; //本月
    this.day = this.today.getDay();
    this.date = this.today.getDate();
    // 导航标题数据
    this.$store.commit("setNav", this.navs);
    this.getCalendar();
  },
  computed: {
    //今天的日期
    currentDay() {
      return this.today.getDate();
    }
  },
  methods: {
    //判断平年闰年
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
    //获取每个月有多少天
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
    //日历获取
    getCalendar() {
      //获取当月有多少天,后面的直接获取本月天数,不用判断平年闰年
      let days =
        this.getMonthLen() || new Date(this.year, this.month, 0).getDate();

      //获取上月总天数
      let pdays = new Date(this.year, this.month - 1, 0).getDate();
      // 获取每月第一天星期几
      let wd = new Date(this.year, this.month - 1, 1).getDay();
      // console.log("星期", wd);
      //下一月填空
      let ndays = 1;
      //上一月填空
      let pwdays = pdays - wd + 1;
      let arr = []; //接收本月天数
      let tem = 0; //天数累加
      let mark = false; //避免多次渲染下月数据
      for (let i = 0; i < 6; i++) {
        arr[i] = new Array();
        for (let j = 0; j < 7; j++) {
          tem++;
          if (tem - wd > 0 && tem - wd <= days) {
            arr[i][j] = { d: tem - wd, msg: 1 };
            if (arr[i][j].d >= days) mark = true;
          } else {
            if (tem - wd <= 0) {
              arr[i][j] = { d: pwdays, msg: 0 };
              pwdays++;
            } else {
              arr[i][j] = { d: ndays, msg: 2 };
              ndays++;
            }
            // arr[i][j] = "";
          }
        }
        if (mark) break;
      }

      this.dataArr = arr;
      // console.log("结果", arr);
      // 选中今天
      this.checkDay();
    },
    // 下一月
    nextMonth() {
      if (this.month == 12) {
        this.year++;
        this.month = 1;
      } else {
        this.month++;
      }
      this.getCalendar();
    },
    // 上一月
    prevMonth() {
      if (this.month <= 1) {
        this.year--;
        this.month = 12;
      } else {
        this.month--;
      }
      this.getCalendar();
    },
    // 点击每天设置表头时间
    getDate(d) {
      this.date = d;
    },

    //今天年月日期 (用户切换月份判断)
    checkDay() {
      let date = new Date();
      this.defaultToday = date.getDate();
      let defaultMonth = date.getMonth() + 1;
      let defaultYear = date.getFullYear();
      // }
      if (this.month == defaultMonth && this.year == defaultYear) {
        this.defaultYearMonth = true;
        //如果是本月默认显示当天
        this.date = this.defaultToday;
      } else {
        this.defaultYearMonth = false;
      }
    },
    //遍历签到所有天数
    isCheck(data) {
      if (!this.defaultYearMonth) return;
      for (let key in this.checkIn) {
        if (data.d == this.checkIn[key]) {
          return true;
        }
      }
    },
    /**
     * 在tb标签上设置时间数据
     *
     * str: 时间拼接符号:/或-
     * day: 当天几号
     * msg: 0代表上一月结尾填充标识, 1 代表下一月结尾填充标识
     */
    dataTime(str, day, msg) {
      let dataMonth = this.month; //获取当月
      let dataYear = this.year; //获取当月
      if (msg == 0) {
        dataMonth--;
        if (dataMonth < 1) {
          dataMonth = 12;
          dataYear--;
        }
      }
      if (msg == 2) {
        dataMonth++;
        if (dataMonth > 12) {
          dataMonth = 1;
          dataYear++;
        }
      }
      return (
        dataYear + str + this.fomateZero(dataMonth) + str + this.fomateZero(day)
      );
    },
    //点击上月 或 下月的灰色部分日期
    getMonth(day, msg) {
      if (msg == 0) {
        this.month--;
        this.date = day;

        if (this.month < 1) {
          this.year--;
          this.month = 12;
        }
        this.getDate(day);
        this.getCalendar();
      }
      if (msg == 2) {
        this.month++;
        this.date = day;

        if (this.month > 12) {
          this.year++;
          this.month = 1;
        }

        this.getDate(day);
        this.getCalendar();
      }
    },
    //格式化小于10的数字
    fomateZero(num) {
      return num < 10 ? "0" + num : num;
    },
    //今天按钮
    getToday() {
      this.year = this.today.getFullYear();
      this.month = this.today.getMonth() + 1;
      this.date = this.today.getDate();
      this.clickDate = this.today.getDate();
      this.getCalendar();
    },
    //签到
    report() {
      requestSignin({
        user_id: JSON.parse(this.cookies.getCookie("cur_user"))._handleid
      }).then(res => {
        console.log("点击签到", res);
      });
    }
  }
};
</script>
<style scoped>
.cal_title {
  flex: 1;
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-right: 10px;
}
.cal_title:hover {
  background: #42ce5b;
  color: #fff;
}
.signined {
  flex: auto;
  margin: 20px 0;
  padding: 10px;
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
  user-select: none;
  width: 100%;
  text-align: center;
  border: 1px solid #e8e8e8;
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
  /* line-height: 60px; */
  text-align: center;
  font-size: 22px;
  font-family: arial;
  position: relative;
  vertical-align: middle;
}
.cal_table tr td:hover {
  background: #66b1ff;
  color: #349c00;
  transition: all 0.5s;
}
.cal_table tr td.over {
  background: #f3f3f3;
  color: #c3c3c3;
}
/* 签到的图片 */
.cal_table .ui-state-default {
  background: url(../../assets/img/checkin.png) no-repeat center center;
}
/* 当前选择日期 */
.cal_table tr td.cur_day {
  color: #fff;
  background: #87d565;
}
/* 系统默认日期 */
.cal_table tr td.default_date {
  background: #ff9393;
  color: #fff;
}

.except_day {
  background-color: #ddd;
  color: #fb3838;
}
.calendar_box {
  color: #555;
  position: relative;
}
.calendar_box button {
  cursor: pointer;
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
/* 签到 */
.ischecked {
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  width: 18px;
  height: 18px;
  color: #fff;
  background: #f43;
  text-align: center;
  line-height: 18px;
  overflow: hidden;
  font-size: 14px;
  z-index: 22;
}

/* 上一月/下一月 */
.calendar_box button.month-less {
  left: 20px;
  background: url(../../assets/img/left-icon.png) no-repeat left -60px;
}
.calendar_box button.month-add {
  right: 20px;
  background: url(../../assets/img/right-icon.png) no-repeat left -60px;
}
</style>


