<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            name="username"
            id="username"
            v-model="username"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            name="password"
            id="password"
            v-model="password"
            label="password"
            required
            type="password"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn  small color="primary" @click="submit()">Submit</v-btn>
    </v-container>
  </v-form>
</template>

<script>
export default {
  // name: 'Login',
  // data() {
  //   return {
  //     username: '',
  //     password: ''
  //   }
  // },
  //    methods: {
  //     submit(){
  //       this.$store.dispatch('retrieveToken', {
  //         username: this.username,
  //         password: this.password  
  //       })
  //       .then(response => {
  //         this.$router.push({name: ''})
  //       })
  //     }
  //   },
 
}
// ACTION METHOD DENTRO DO ARQUIVO STORE DO VueX
// actions: {
//   retrieveToken(context, credentials){
  // return new Promise((resolver, reject) => {
//     axios.post('/login', {
//       username: credentials.username,
//       password: credentials.password
//     })
//     .then(response => {
  // const token = response.data.access_token

  // localStorage.setItem('access_token', token)
  // context.commit('retrieveToken', token)
  // resolve(response)
//       console.log(response)
//     })
//     .catch(erros => {
//       console.log(error)
// reject(error)
//     })
  // })

//   }
// }
// state: {
//   token: localStorage.getItem('access_token') || null,
// }

// retrieveToken(state, token) {
//   state.token = token
// }

// getters: {
//   loggedIn(state){
//     return state.token != null
//   }
// }
</script>

m run serve