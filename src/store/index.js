import Vue from 'vue'
import Vuex from 'vuex'

import d2admin from './modules/d2admin'
import blog from './modules/blog'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        d2admin,
        blog
    }
})
