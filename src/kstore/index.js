import Vue from 'vue'
import Vuex from './kvuex'

Vue.use(Vuex)

export default new Vuex.Store({ // 里面的是vuex 的配置选项
  state: {
    counter:0
  },
  mutations: {
    add(state){
      state.counter++
    }
  },
  actions: { // actions 不可以改状态，还是需要发送commit
    add({commit}){ // 这里面的参数，可以是commit，dispatch，state 业务很复杂的时候就会涉及到其他的commit state
      // 复杂的业务逻辑组合 或者 异步操作
      setTimeout(() => {
        commit('add')
      }, 1000);
      
    }
  },
  modules: {
  }
})
