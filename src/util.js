import 'es6-promise/auto';
import Vue from 'vue/dist/vue.js';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        use: ['generalSetting'],
        currentPackagePage: 'generalSetting',
        generalSetting: {},
        package: {}
    },
    mutations: {
        updatePorperty(state, info) {
            Vue.set(state, info.key, info.value);
        },
        addPackage(state, packag) {
            Vue.set(state.package, packag.name, packag.info);
        }
    }
})
export default store;



