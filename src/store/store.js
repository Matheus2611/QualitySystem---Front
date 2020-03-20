import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)
Axios.defaults.baseURL = 'http://localhost:8000/api'

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        filter: 'Em Andamento',
        projects: [],
        userProjects: [],
        users: [],
        loggedUser: JSON.parse(localStorage.getItem('loggedUser')) || null,
    },
    getters: {
        LoggedIn(state) {
            return state.token !== null
        },
        remainingProj(state) {
            return state.projects.filter(
                proj => proj.status == "Em Andamento"
            ).length;
        },
        completedproj(state) {
            return state.projects.filter(
                proj => proj.status == "Concluido"
            ).length;
        },
        refusedProj(state) {
            return state.projects.filter(
                proj => proj.status == "Recusado"
            ).length;
        },
        projectsFiltered(state) {
            if (state.filter == 'Em Andamento') {
                return state.projects.filter(proj => proj.status == 'Em Andamento')
            } else if (state.filter == 'Concluido') {
                return state.projects.filter(proj => proj.status == 'Concluido')
            } else if (state.filter == 'Recusado') {
                return state.projects.filter(proj => proj.status == 'Recusado')
            }
        }
    },
    mutations: {

        updateFilter(state, filter) {
            state.filter = filter
        },
        addProject(state, project) {
            state.projects.push({
                    title: project.title,
                    description: project.description,
                    status: 'Em Andamento',
                }

            )
        },
        updateProject(state, project) {
            const index = state.projects.findIndex(item => item.id == project.id)
            state.projects[index] = {
                'id': project.id,
                'title': project.title,
                'completed': project.completed,
                'status': project.status,
                'description': project.description
            }
        },
        deleteProject(state, project) {
            const index = state.projects.findIndex(item => item.id == project.id)
            state.projects.splice(index, 1)
        },
        registerUser(state, user) {
            state.users.push({
                id: user.id,
                name: user.name,
                email: user.email,
                perfil: user.perfil,
                password: user.password
            })
        },
        updateUser(state, user) {
            const index = state.users.findIndex(item => item.id == user.id)
            state.users[index] = {
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'password': user.password,
                'perfil': user.perfil
            }
        },
        deleteUser(state, user) {
            const index = state.users.findIndex(item => item.id == user.id)
            state.users.splice(index, 1)
        },
        retrieveProjects(state, projects) {
            state.projects = projects
        },
        retrieveUserProject(state, userProject) {
            state.userProjects = userProject
        },
        retrieveUsers(state, users) {
            state.users = users
        },
        retrieveToken(state, token) {
            state.token = token
        },
        loggedUser(state, loggedUser) {
            state.loggedUser = loggedUser
        },
        destroyToken(state) {
            state.token = null
        },
        destroyUser(state) {
            state.loggedUser = null
        }
    },
    actions: {
        retrieveUsers(context) {
            Axios.get('/users')
                .then(response => {
                    context.commit('retrieveUsers', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        register(context, user) {
            return new Promise((resolve, reject) => {
                Axios.post('/register', {
                        name: user.name,
                        email: user.email,
                        perfil: user.perfil,
                        password: '123456',
                    })
                    .then(response => {
                        context.commit('registerUser', response.data)

                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        updateAuthUserPassword(context, password) {
            Axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            return new Promise((resolve, reject) => {
                Axios.put('/updateAuthUserPassword', password)
                    .then(response => {
                        resolve(response)

                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })

        },
        updateUser(context, user) {
            return new Promise((resolve, reject) => {
                Axios.patch('/update/' + user.id, {
                        name: user.name,
                        email: user.email,
                        perfil: user.perfil
                    })
                    .then(response => {
                        context.commit('updateUser', response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        deleteUser(context, id) {
            Axios.delete('/users/' + id)
                .then(response => {
                    context.commit('deleteUser', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        destroyToken(context) {
            Axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            if (context.getters.LoggedIn) {
                return new Promise((resolve, reject) => {
                    Axios.post('/logout')
                        .then(response => {
                            localStorage.removeItem('access_token'),
                                localStorage.removeItem('loggedUser')
                            context.commit('destroyUser')
                            context.commit('destroyToken')
                            resolve(response)

                        })
                        .catch(error => {
                            localStorage.removeItem('access_token'),
                                context.commit('destroyToken')
                            reject(error)
                        })
                })
            }
        },
        retrieveToken(context, credentials) {
            return new Promise((resolve, reject) => {
                Axios.post('/login', {
                        username: credentials.username,
                        password: credentials.password
                    })
                    .then(response => {
                        const token = response.data.access_token
                        localStorage.setItem('access_token', token)
                        Axios.get('/user', {
                                headers: {
                                    Authorization: 'Bearer ' + token,
                                    'Content-Type': 'application/json'
                                }
                            })
                            .then(resp => {
                                localStorage.setItem('loggedUser', JSON.stringify(resp.data));
                                context.commit('loggedUser', resp.data)
                                context.commit('retrieveToken', token)
                                resolve(response)
                            })
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        updateFilter(context, filter) {
            context.commit('updateFilter', filter)
        },
        createFlow(context, configs = {}) {
            Axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            return new Promise((resolve, reject) => {
                Axios.post('/flows', configs)
                    .then(response => {
                        resolve(response)
                        console.log(response)

                    })
                    .catch(err => {
                        reject(err)
                        console.log(err)
                    })
            })
        },
        addProject(context, project) {
            return new Promise((resolve, reject) => {
                Axios.post('/projects', {
                        title: project.title,
                        description: project.description,
                        status: 'Em Andamento',
                    })
                    .then(response => {
                        // context.commit('addProject', response.data)
                        resolve(response)

                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        updateProject(context, project) {
            Axios.patch('/projects/' + project.id, {
                    title: project.title,
                    description: project.description,
                    completed: project.completed,
                    status: project.status
                })
                .then(response => {
                    context.commit('updateProject', response.data)

                })
                .catch(error => {
                    console.log(error)
                })
        },
        deleteProject(context, id) {
            Axios.delete('/projects/' + id)
                .then(response => {
                    context.commit('deleteProject', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        retrieveProjects(context) {
            Axios.get('/projects')
                .then(response => {
                    context.commit('retrieveProjects', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        retrieveFlows(context) {
            Axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            return new Promise((resolve, reject) => {

                Axios.get('/userstasks')
                    .then(response => {
                        console.log(response)
                        resolve(response)

                    })
                    .catch(error => {
                        reject(error)
                        console.log(error)
                    })
            })
        },
    }
})