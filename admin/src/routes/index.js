// import Login from '@/views/login/Login'
//异步加载组件
// component: Login => require(['@/views/Login'],Login)
const Login = () => import('@/views/Login')
import Home from '@/views/Home'
import Page1 from '@/views/page/Page1'
import Page2 from '@/views/page/Page2'
import Page4 from '@/views/page/Page4'
import Test from '@/views/page/Test'
import Praise from '@/views/page/Praise'
import Echarts from '@/views/echarts/Echarts'
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
    redirect: '/page1',
    children: [
      {
        path: '/page1',
        name: '个人管理',
        component: Page1
      },
      {
        path: '/page2',
        name: '签到管理',
        component: Page2
      },
      {
        path: '/page3',
        name: '修改用户',
        component: () => import('@/views/page/Page3'),
      },
      {
        path: '/page4',
        name: '签到测试',
        component: Page4
      },
      {
        path: '/test',
        name: '测试',
        component: Test
      },
      {
        path: '/praise',
        name: '点赞状态',
        component: Praise
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
