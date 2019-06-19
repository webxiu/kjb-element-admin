// import Login from '@/views/login/Login'
//异步加载组件
// component: Login => require(['@/views/Login'],Login)
const Login = () => import('@/views/Login')
import Home from '@/views/Home'
import Page1 from '@/views/page/Page1'
import Page2 from '@/views/page/Page2'
import Page4 from '@/views/page/Page4'
import Echarts from '@/views/echarts/Echarts'
let  routes = [
    {
      path: '/',
      name: '首页',
      component: Home,
      redirect:'/home'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children:[
        {
          path: '/home',
          name: 'home',
          component: Page1
        },
        {
          path: '/page1',
          name: 'Page1',
          component: Page1
        },
        {
          path: '/page2',
          name: 'Page2',
          component: Page2
        },
        {
          path: '/page3',
          name: 'Page3',
         component: () => import('@/views/page/Page3'),
        },
        {
          path: '/page4',
          name: 'Page4',
          component: Page4
        },
        {
          path: '/echarts',
          name: 'Echarts',
          component: Echarts
        },
      ]
    },
    
  ]
export default routes;
