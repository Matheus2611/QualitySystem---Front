<template>
  <v-app>
    <div v-if="loggedIn == false"></div>
    <div v-else>
      <nav>
        

        <v-app-bar class="primary" dense="" app="">
          <v-app-bar-nav-icon
            class="white--text"
            @click.stop="drawer = !drawer"
          >
          </v-app-bar-nav-icon>

          <v-toolbar-title>
            <v-img width="77px" src="/logo-cplug-blue.png"></v-img>
          </v-toolbar-title>

          <v-spacer></v-spacer>
          <div class="text-center">
            <v-menu transition="slide-y-transition" offset-y>
              <template v-slot:activator="{ on }">
                <v-btn dark="" text small v-on="on">
                  <v-icon left="">account_circle</v-icon>
                  <span class="font-weight-regular">{{ loggedUser.name }}</span>
                  <v-icon right>expand_more</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item :to="{ name: 'profile' }">
                  Meu Perfil
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item :to="{ name: 'logout' }">
                  Logout
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-app-bar>
        <v-navigation-drawer  width="15%"  app temporary=""  bottom v-model="drawer">
            <v-list-item>
              <v-container grid-list-xl>
                <v-layout row justify-space-between>
                  <v-col align="center" cols="12" md10>
                    <v-img width="120px" src="/logo-cplug-blue.png"></v-img>
                    <span  class="font-weight-regular">QUALIDADE</span>
                  </v-col>
                </v-layout>
              </v-container>
            </v-list-item>

            <v-divider color="white"></v-divider>

            <v-list dense>
              <v-list-item :to="{ name: 'home' }">
                <v-list-item-icon>
                  <v-icon>assignment</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>
                    <span>Dashboard</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item :to="{ name: 'users' }">
                <v-list-item-icon>
                  <v-icon>people_alt</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>
                    <span>Usuários</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <template v-slot:append>
              <div>
                <v-divider color="white"></v-divider>
                <v-switch
                  class="ml-8"
                  v-model="darkTheme"
                  color="primary"
                  inset
                  label="Dark Mode"
                ></v-switch>
              </div>
            </template>
          </v-navigation-drawer>
      </nav>
    </div>

    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer dense :elevation="15" tile padless app="">
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>ConnectPlug</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    attrs: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      darkTheme: localStorage.getItem("darkTheme"),
      initialDark: this.$vuetify ? this.$vuetify.theme.dark : true,
      drawer: false
    };
  },
  watch: {
    darkTheme: function() {
      if (this.darkTheme == true) {
        this.$vuetify.theme.dark = true;
        localStorage.setItem("darkTheme", this.darkTheme);
      } else if (this.darkTheme == false) {
        this.$vuetify.theme.dark = false;
        localStorage.removeItem("darkTheme");
      }
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.LoggedIn;
    },
    loggedUser() {
      return this.$store.state.loggedUser;
    }
  },

  beforeDestroy() {
    if (!this.$vuetify) return;

    this.$vuetify.theme.dark = this.initialDark;
  }
};
</script>
