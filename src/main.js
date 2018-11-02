import Vue from 'vue/dist/vue.js';
import App from './app.vue';
import Store from './util.js';

window.store = Store;
new Vue({
    store: Store,
    render: h => h(App)
}).$mount('#app');