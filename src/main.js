import Vue from 'vue'
// import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import { store } from './store/store'
import Master from './components/layouts/Master.vue'



Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.LoggedIn) {
            next({
                name: 'login',
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.getters.LoggedIn) {
            next({
                name: 'home',
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

new Vue({
    store,
    router,
    vuetify,
    render: h => h(Master),
    template: '<Master/>'
}).$mount('#app')