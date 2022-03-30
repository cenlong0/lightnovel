import { login as loginApi } from '@/api/login'
import router from '@/router'
export default {
  namespaced: true,

  state: () => ({
    // token: localStorage.getItem('token') || '',
    siderType: true,
    lang: localStorage.getItem('lang') || 'zh'
  }),
  mutations: {
    // setToken(state, token) {
    //   state.token = token
    //   localStorage.setItem('token', token)
    // },
    changeSiderType(state) {
      state.siderType = !state.siderType
    },
    changLang(state, lang) {
      state.lang = lang
    }
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginApi(userInfo)
          .then((res) => {
            // commit('setToken', res.token)
            if (userInfo.username === 'admin') {
              router.replace('/')
              console.log(userInfo)
              resolve()
            } else {
              router.replace('/users') // 用户页面暂时
              resolve()
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
