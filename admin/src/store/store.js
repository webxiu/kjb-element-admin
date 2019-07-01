import Vue from 'vue'
import Vuex from 'vuex'

// import state from './state'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{//设置属性
        usename:{},
        navs:[],
        auditInfo:[],
    },
    getters:{

    },
    mutations:{
        //登录用户
        setUser(state,data){
            state.usename = data;
        },
        //导航菜单
        setNav(state,navs){
            state.navs = navs
            // console.log(111,state.navs)
        },
        //分步审核
        setAuditInfo(state,audit){
            state.auditInfo.push(audit)
            
        }

    },
    actions:{
        //登录用户
        userName({commit},user){
            commit('setUser',user)
            
        },
        
    }

})