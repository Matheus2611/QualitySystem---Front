import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from '../views/users/Users.vue'
import Profile from '../components/Profile.vue'
import ProjectName from '../views/ProjectName.vue'
import Home from '../views/Home.vue'
import Login from '../components/Auth/Login.vue'
import Register from '../components/Auth/Register.vue'
import Logout from '../components/Auth/Logout.vue'



Vue.use(VueRouter)


const routes = [{
        path: '/',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/Home',
        name: 'home',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/Profile',
        name: 'profile',
        component: Profile,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/Login',
        name: 'login',
        component: Login,
        meta: {
            requiresVisitor: true
        }
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            requiresVisitor: true
        }
    },
    {
        path: '/Projects/:id',
        name: 'project-name',
        component: ProjectName,
        params: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/Users',
        name: 'users',
        component: Users,
        meta: {
            requiresAuth: true
        }

    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router