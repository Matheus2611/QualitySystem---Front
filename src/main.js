import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import { store } from './store/store'



Vue.config.productionTip = false


new Vue({
    created() {
        var auth = localStorage.getItem('auth')
        if (auth == true) {
            return
        } else {
            this.$router.push({ name: 'login' })
        }
    },
    store,
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')