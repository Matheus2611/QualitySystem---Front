<template>
  <v-app>
    <v-content class="blue-grey darken-4">
      <div v-if="authentication == true">      
        <Login @Logar="Logar" />
      </div>

      <div v-else>
        <Navbar :user="user" @logout="logout" />
        <router-view :authentication="authentication" :user="user"></router-view>
      </div>
    </v-content>
     <v-footer :elevation="15" tile dark padless>
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>ConnectPlug</strong>
    </v-col>
  </v-footer>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Login from "@/views/Login";

export default {
  name: "App",

  components: { Navbar, Login },

  data() {
    return {
      authentication: true,
      user: '',
      test: ''
    };
  },
  methods: {
    Logar(username) {
      this.user = username,
      this.authentication = false
      localStorage.setItem("username", username)
     
    },
    logout(){
      this.authentication = true
    },
  },
};
</script>
