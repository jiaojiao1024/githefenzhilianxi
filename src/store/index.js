import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
    count:0,
    num:2,
    todos:[
      {id: 1,text: '...',done: true},
      {id: 2,text: '...',done: false},
    ]
  },
  // getters相当于vue中的计算属性的角色
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    // Getter 也可以接受其他getter作为第二个参数
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
    //让getter返回一个函数
    // getter在通过方法访问时，每次都会进行调用，不会缓存结果。
    getTodoById: (state) => (id) =>{
      return state.todos.find(todo => todo.id ===id)
    }
  },
  // mutations中必须是同步函数，是更改vuex的store中的状态的唯一方法
  mutations: {
    increment(state){
      state.count++
    },
    numIncrement(state){
      state.num++
    }
  },
  // action 提交的是mutation,不是直接变更状态。
  // action 进行的是异步的操作
  actions: {
    increment (context) {
      context.commit('increment')
    }
  },
  // 把store分割成模块的方法，每个模块都有自己的state,mutation,action,getter
  modules: {
    user
  }
})
export default store
