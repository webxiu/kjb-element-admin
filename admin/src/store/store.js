import Vue from 'vue'
import Vuex from 'vuex'

// import state from './state'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{//设置属性
        usename:{},
        navs:[]
    },
    getters:{

    },
    mutations:{
        setUser(state,data){
            state.usename = data;
        },
        setNav(state,navs){
            state.navs = navs
            console.log(111,state.navs)
        }

    },
    actions:{
        userName({commit},user){
            commit('setUser',user)
            
        }
    }

})