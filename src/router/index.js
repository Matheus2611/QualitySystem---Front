import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/users/Register.vue'
import List from '../views/users/List.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Profile from '../components/Profile.vue'
import ProjectName from '../views/ProjectName.vue'



Vue.use(VueRouter)


const routes = [{
        path: '/Home',
        name: 'home',
        component: Home
    },
    {
        path: '/Register',
        name: 'register',
        component: Register
    },
    {
        path: '/List',
        name: 'list',
        component: List
    },
    {
        path: '/Profile',
        name: 'profile',
        component: Profile
    },
    {
        path: '/Login',
        name: 'login',
        component: Login
    },
    {
        path: '/Projects/:id',
        name: 'project-name',
        component: ProjectName,
        params: true
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router