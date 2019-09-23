import * as types from './mutation-types'

const mutations = {
    [types.SET_HOT_COMMENT](state, comment) {
        state.comment = comment
    },
    [types.SET_LONGIN_INFO](state, login) {
        state.loginInfo= login
    },
    [types.SET_LONGIN_MODEL](state, loginModel) {
        state.loginModel = loginModel
    }
}

export default mutations
