import { testApi } from '../../api'
import * as types from '../mutation-types'

const state = {
    testData: {}
}

// getters
const getters = {
    testDataGet (state) {
        return state.testData
    }
}

// actions
const actions = {
    gettestData ({ commit }) {
        testApi()
            .then(res => {
                commit(types.TESTGET_SUCCESS, res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

// mutations
const mutations = {
    [types.TESTGET_SUCCESS] (state, { data }) {
        state.testData = data
        console.log(state.testData)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
