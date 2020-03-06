// import axios from 'axios'
// import store from '@/store'
// import router from '@/router'
// import bus from '@/plugins/bus'
// const instance = axios.create({
//     baseURL: process.env.VUE_APP_API_BASE_URL,
// })
// instance.interceptors.request.use(config => {
//     const token = store.getters['auth/token']
//     const tenantCode = store.getters['auth/tenantCode']
//     if (token && tenantCode) {
//         config.headers['Authorization'] = `Bearer ${token}`
//         config.headers['Tenant-Code'] = tenantCode
//     }
//     config.headers['Accept'] = 'application/json'
//     config.headers['Content-Type'] = 'application/json'
//     // Precisa que data seja um objeto para enviar o Content-Type
//     if (!config.data) {
//         config.data = {}
//     }
//     // config.baseURL = process.env.API_HOST
//     config.timeout = process.env.VUE_APP_API_TIMEOUT
//     return config
// })
// instance.interceptors.response.use(
//     response => {
//         return response
//     },
//     err => {
//         let response = err.response
//         if (response.status) {
//             if (response.status === 422) {
//                 let errors = Object.values(response.data.errors)
//                 errors = errors.flat()
//                 errors.forEach(element => {
//                     bus.$emit('notify', 'danger', element)
//                 })
//                 //Erro ja foi tratado nao é necessário retornar o reject
//                 return
//             }
//             if (response.status === 401) {
//                 store.dispatch('auth/clear')
//                 router.push({ name: 'login' })
//                 return
//             }
//             if (response.status === 403) {
//                 let message = response.data.message
//                 bus.$emit('notify', 'danger', message || 'Ação não autorizada')
//                 //Erro ja foi tratado nao é necessário retornar o reject
//                 return
//             }
//             if (response.status === 404) {
//                 if (typeof response.data.errors != 'undefined') {
//                     let errors = Object.values(response.data.errors)
//                     errors = errors.flat()
//                     errors.forEach(element => {
//                         bus.$emit('notify', 'danger', element)
//                     })
//                     return
//                 }
//                 bus.$emit('notify', 'danger', 'Recurso nao encontrado')
//                 //Erro ja foi tratado nao é necessário retornar o reject
//                 return
//             }
//         }
//         return Promise.reject(err)
//     },
// )
// export default instance