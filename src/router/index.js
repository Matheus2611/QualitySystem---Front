import Vue from 'vue'
import VueRouter from 'vue-router'
import Profile from '../components/Profile.vue'
import Home from '../views/Home.vue'
import Login from '../components/Auth/Login.vue'
import Register from '../components/Auth/Register.vue'
import Logout from '../components/Auth/Logout.vue'
import Productsidea from '../views/Productsidea.vue'
import MenuCreate from '../views/MenuCreate.vue'




Vue.use(VueRouter)


const routes = [{
        path: '/',
        component: Home,
    },
    {
        path: '/Home',
        name: 'home',
        component: Home,
        props: true,
    },
    {
        path: '/Menu/Create',
        name: 'menucreate',
        component: MenuCreate,
        props: true,
    },
    {
        path: '/Productsidea',
        name: 'productsidea',
        component: Productsidea,
        props: true,
    },
    {
        path: '/Profile',
        name: 'profile',
        component: Profile,
    },
    {
        path: '/Login',
        name: 'login',
        component: Login,
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router