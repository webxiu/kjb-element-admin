<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
      <!--导航菜单-->
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        unique-opened
        router
        v-show="!collapsed"
      >
        <div style="background:#333;color:#fff;padding-left:20px;line-height:50px;">
          <i class="el-icon-setting"></i>后台管理系统
        </div>
        <template v-for="(item,index) in menu">
          <el-submenu :index="index+''">
            <template slot="title">
              <i :class="item.menuIcon"></i>
              {{item.menuTitle}}
            </template>
            <el-menu-item
              v-for="(child,i) in item.menuList"
              :index="child.menuPage"
              :key="i"
              :class="$route.path==child.menuPage?'ch-active':''"
            >{{child.menuItem}}</el-menu-item>
          </el-submenu>
          <!-- <el-menu-item v-if="item.menuList.length>0" :index="item.menuList[0].menuPage">
              <i :class="item.iconCls"></i>
              {{item.menuList[0].menuItem}}
          </el-menu-item>-->
        </template>
      </el-menu>
      <!--导航菜单-折叠后-->
      <ul class="el-menu el-menu-vertical-demo collapsed" v-if="collapsed" ref="menuCollapsed">
        <li class="el-submenu item">
          <template>
            <div class="el-submenu__title" style="padding: 0px;text-align: center;">
              <i class="el-icon-setting"></i>
            </div>
          </template>
        </li>
        <li v-for="(item,index) in menu" :key="index" class="el-submenu item">
          <template>
            <div
              class="el-submenu__title"
              style="padding: 0px;text-align: center;"
              @mouseover="showMenu(index,true)"
              @mouseout="showMenu(index,false)"
            >
              <i :class="item.menuIcon"></i>
            </div>
            <ul
              class="el-menu submenu"
              :class="'submenu-hook-'+index"
              @mouseover="showMenu(index,true)"
              @mouseout="showMenu(index,false)"
            >
              <li
                v-for="(cell,i) in item.menuList"
                :key="i"
                class="el-menu-item"
                style="padding-left: 40px;"
                :class="$route.path==cell.menuPage?'ch-active':''"
                @click="$router.push(cell.menuPage)"
              >{{cell.menuItem}}</li>
            </ul>
          </template>
        </li>
      </ul>
    </aside>

    <el-container>
      <el-header>
        <el-col :xs="18" :sm="18" :md="18" :lg="18">
          <div class="tools" @click.prevent="collapse">
            <i
              :class="!collapsed ?'el-icon-s-fold collapse-icon':'el-icon-s-unfold collapse-icon'"
              style="color: #3a8ee6;"
            ></i>
          </div>

          <div v-for="(nav,index) in getNavs" :key="index">
            <span class="tab-nav" type="success" v-if="!nav.dropDown">{{nav.title}}</span>

            <div v-else class="tab-nav">
              <el-dropdown class="nav-drop" disabled>
                <span class="el-dropdown-link">
                  {{nav.title}}
                  <template v-if="nav.dropDown">
                    <i class="el-icon-arrow-down el-icon--right" v-if="nav.dropDown.length>0"></i>
                  </template>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(item,i) in nav.dropDown" :key="i">{{item.childItem}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-col>

        <el-col :xs="6" :sm="6" :md="6" :lg="6">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{userName}}</span>
          <span style="cursor:pointer;" @click="loginOut">[退出]</span>
        </el-col>
      </el-header>
      <!-- 视图容器 -->
      <div style="height:100%;overflow-y:auto;position:relative">
        <router-view></router-view>
      </div>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 156 弄"
    };
    return {
      tableData: Array(20).fill(item),
      // username:'',
      collapsed: false,
      menu: [
        {
          menuTitle: "用户管理",

          menuIcon: "el-icon-message",
          menuList: [
            { menuItem: "个人管理", menuPage: "/page1" },
            { menuItem: "新增用户", menuPage: "/page2" },
            { menuItem: "修改用户", menuPage: "/page3" },
            { menuItem: "删除用户" }
          ]
        },
        {
          menuTitle: "订单管理",
          menuIcon: "el-icon-menu",
          menuList: [
            { menuItem: "待处理订单", menuPage: "/page4" },
            { menuItem: "已处理订单" },
            { menuItem: "已经完成订单" },
            { menuItem: "未完成订单" }
          ]
        },
        {
          menuTitle: "图表查看",
          menuIcon: "el-icon-setting",
          menuList: [
            { menuItem: "订单图表",menuPage:"/echarts" },
            { menuItem: "其他图表" },
            { menuItem: "图表1" },
            { menuItem: "图表2" }
          ]
        }
      ],
      navs: []
      // navs: [
      //   {
      //     title: "系统信息",
      //     dropDown: []
      //   },
      //   {
      //     title: "个人信息",
      //     dropDown: [
      //       { childItem: "详情信息" },
      //       { childItem: "详情信息" },
      //       { childItem: "详情信息" },
      //       { childItem: "详情信息" }
      //     ]
      //   }
      // ]
    };
  },

  computed: {
    //获取导航菜单数据
    getNavs() {
      return this.$store.state.navs;
    },
    userName() {
      // return this.$store.state.usename; //刷新会消失
      return localStorage.getItem("user");
    }
  },
  methods: {
    collapse() {
      this.collapsed = !this.collapsed;
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    },
    //退出
    loginOut() {
      if (confirm("确认退出吗?")) {
        localStorage.removeItem("user");
        this.$router.push({ path: "/login" });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.el-container {
  border: none !important;
}
.el-header {
  background-color: #fff;
  color: #333;
  text-align: right;
  font-size: 12px;
  clear: both;
  height: 48px !important;
  line-height: 48px;
  border-bottom: 1px solid #ebeef5;
}
// 导航
.el-header {
  clear: both;
}
.tab-nav {
  font-size: 14px;
  float: left;
  margin: 0 10px;
  cursor: pointer;
  color: #409eff;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown:hover {
  background: #ebeef5;
}
// 侧边栏
.el-aside {
  color: #333;
}
.tools {
  float: left;
  height: 48px;
  cursor: pointer;
}
.collapse-icon {
  font-size: 24px;
  position: relative;
  top: 4px;
  left: -12px;
}
/* 侧边栏折叠 */
.menu-collapsed {
  flex: 0 0 60px;
  width: 60px;
  transition: all 0.5s;
}
.menu-expanded {
  flex: 0 0 230px;
  width: 230px;
  transition: all 0.5s;
}

/* 去掉滚动条 */
.menu-expanded::-webkit-scrollbar {
  display: none;
}
//侧边栏背景色
.el-menu {
  height: 100%;
  width: auto !important;
  background-color: #eef1f6;
}

/* 折叠 */
.menu-collapsed {
  flex: 0 0 60px;
  width: 60px;
  transition: all 0.5s;
}
.menu-expanded {
  flex: 0 0 230px;
  width: 230px !important;
  transition: all 0.5s;
}
// 定位
.item {
  position: relative;
}
.submenu {
  position: absolute;
  top: 0px;
  left: 60px;
  z-index: 99999;
  height: auto;
  display: none;
}
// 侧边栏选中
.ch-active {
  background: #bdb4b4 !important;
  color: #fff !important;
  border-right: 4px solid #8a7777;
}
// 侧边栏默认颜色
.is-active {
  background: #eef1f6;
  color: #333;
}
// .el-menu-item{
//     background: #bdb4b4 !important;
//   color: #fff !important;
//   border-right: 4px solid #8a7777;
// }
 .el-menu-item:hover{
   color:#8a7777;
  background: #dedede !important;
 }
</style>
