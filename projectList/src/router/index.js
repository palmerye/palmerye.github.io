import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store'

import NotFoundView from '../components/404'
import test from '../components/test'
import hello from '../components/Hello'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'hello',
        component: hello,
        children: [
        ]
    },
    {
        path: '/test',
        name: 'mytest',
        component: test,
        children: [
        ]
    },
    {
        path: '*',
        component: NotFoundView
    }
]

const router = new VueRouter({
    // mode: 'history',
    // linkActiveClass: 'active',
    // scrollBehavior: () => ({ y: 0 }),
    routes
})

export default router
