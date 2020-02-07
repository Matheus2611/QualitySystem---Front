<template>
  <v-app>
    <v-content class="grey darken-4">
      <div v-if="this.$store.state.authentication == false">
        <Login @Logar="Logar" />
      </div>

      <div v-else>
        <Navbar @logout="logout" />
        <router-view></router-view>
      </div>
    </v-content>
    <v-footer :elevation="15" tile padless>
      <v-col class="text-center" cols="12">
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
    return {};
  },
  methods: {
    Logar(user) {
      localStorage.setItem("user", JSON.stringify(user)),
         (this.$store.state.authentication = true),
      localStorage.setItem("auth", this.$store.state.authentication)  
      this.$router.push({ name: "home" });
    },
    logout() {
      localStorage.clear();
      this.$store.state.authentication = false;
      this.$router.push({ name: "login" });
    }
  }
};
</script>
