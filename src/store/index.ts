import { toRaw } from 'vue'
import { createStore } from 'vuex'

export default createStore({
  state: {
    formData: {},
    notification: null
  },
  mutations: {
    setFormData(state, payload) {
      state.formData = payload
    },
    setNotification(state, message) {
      state.notification = message
    },
    clearFormData(state) {
      state.formData = {}
    }
  },
  actions: {
    saveForm({ commit }, data) {
      const plainData = toRaw(data.value)
      commit('setFormData', plainData)
      commit('setNotification', `Форма сохранена: ${JSON.stringify(plainData)}`)
      commit('clearFormData')
    }
  },
  getters: {
    getFormData: (state) => state.formData,
    getNotification: (state) => state.notification
  }
})
