import { login } from '@/api/login'
import { setToken, getToken } from '../../api/auth'
// import { resolve } from 'core-js/fn/promise'
import { getInfo } from '../../api/login'
import { resolve, reject } from 'core-js/fn/promise'
const user = {
    state: {
        token: getToken() 
    },
    mutations: {
      SET_TOKEN: (state, token) => {
          state.token = token
      } 
    },
    actions: {
        Login({ commit },userInfo ) {
            const username = userInfo.username.trim()
            const password = userInfo.password
            const code = userInfo.code
            const uuid = userInfo.uuid
            return new Promise((resolve,reject) =>{
                login(username, password, code, uuid).then(res => {
                    setToken(res.token) 
                    commit('SET_TOKEN',res.token)
                    resolve()
                }).catch(error => {

                })
            })
        }
    }
}
export default user