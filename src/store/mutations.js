import * as types from './mutation-types'

const mutations = {
    [types.SET_HOT_COMMENT](state, comment) {
        state.comment = comment
    },
    [types.SET_LONGIN_STATE](state, login) {
        state.loginState = login
    },
    [types.SET_LONGIN_MODEL](state, loginModel) {
        state.loginModel = loginModel
    }

}

export default mutations