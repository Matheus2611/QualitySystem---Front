import Vue from 'vue'
// import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import { store } from './store/store'
import Master from './components/layouts/Master.vue'



Vue.config.productionTip = false


new Vue({
    store,
    router,
    vuetify,
    render: h => h(Master),
    template: '<Master/>'
}).$mount('#app')