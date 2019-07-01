// import Login from '@/views/login/Login'
//异步加载组件
// component: Login => require(['@/views/Login'],Login)
const Login = () => import('@/views/Login')
import Home from '@/views/Home'             //主页
import Table from '@/views/page/Table'      //表格
import Mark from '@/views/page/Mark'        //签到
import Calendar from '@/views/page/Calendar'//日历
import Test from '@/views/page/Test'        //测试页
import LoginLog from '@/views/page/LoginLog'//登录日志
import TabPage from '@/views/page/TabPage'  //标签页
import Praise from '@/views/page/Praise'    //点赞
import Audit from '@/views/page/Audit'      //提交
import Echarts from '@/views/echarts/Echarts' //Echarts
let routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: '首页',
    component: Home,
    redirect: '/table',
    children: [
      {
        path: '/table',
        name: '个人管理',
        component: Table
      },
      {
        path: '/mark',
        name: '签到管理',
        component: Mark
      },
      {
        path: '/modify',
        name: '修改用户',
        component: () => import('@/views/page/Modify'),
      },
      {
        path: '/calendar',
        name: 'eleUI日历',
        component: Calendar
      },
      {
        path: '/test',
        name: '测试',
        component: Test
      },
      {
        path: '/logs',
        name: '操作日志',
        component: LoginLog
      },
      {
        path: '/praise',
        name: '点赞状态',
        component: Praise
      },
      {
        path: '/tabpage',
        name: '标签页切换',
        component: TabPage
      },
      {
        path: '/audit',
        name: '信息审核',
        component: Audit
      },
      {
        path: '/echarts',
        name: 'Echarts图表',
        component: Echarts
      },
    ]
  },
  { path: '*', redirect: '/' }

]
export default routes;
