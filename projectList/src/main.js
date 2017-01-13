// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import App from './App'
import FastClick from 'fastclick'

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

FastClick.attach(document.body)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
// Now the app has started!
