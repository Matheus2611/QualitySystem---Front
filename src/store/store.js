import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)
Axios.defaults.baseURL = 'http://localhost:8000/api'

export const store = new Vuex.Store({
    state: {
        authentication: false,
        dark: false,
        projects: [{
            'id': 1,
            'title': 'JUST DO IT',
            'description': 'LEARN THIS SHIT',
            'completed': 'Em Andamento',
            'analist': 'matheus',

        }, ],
        user: [{
                'username': 'matheus',
                'password': '123',
                'email': 'matheus@cplug.com',
                'perfil': 'Administrador'

            },
            {
                'username': 'ketlyn',
                'password': '123',
                'email': 'kety.cplug@gmail.com',
                'perfil': 'Administrador'
            },
            {
                'username': 'johnson',
                'password': '123',
                'email': 'johnson.cplug@gmail.com',
                'perfil': 'Administrador'
            },
            {
                'username': 'eric',
                'password': '123',
                'email': 'eric@cplug.com.br',
                'perfil': 'Administrador'
            },
        ]
    },
    mutations: {
        addProject(state, projects) {
            state.projects.push({
                    id: projects.id,
                    title: projects.title,
                    description: projects.description,
                    completed: 'Em Andamento',
                    analist: projects.analist

                }

            )
        },
        RegisterUser(state, user) {
            state.user.push({
                username: user.username,
                email: user.email,
                perfil: user.perfil,
                password: user.password
            })
        }
    }
})