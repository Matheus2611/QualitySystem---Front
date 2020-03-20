<template>
  <v-app>
    <div v-if="loggedIn == false"></div>
    <div v-else>
      <nav>
        <v-app-bar color="primary" dense="" app="">
          <v-app-bar-nav-icon
            class="white--text"
            @click.stop="drawer = !drawer"
          >
          </v-app-bar-nav-icon>
          <!-- 
          <v-toolbar-title>
            <v-img width="77px" src="/logo-cplug-blue.png"></v-img>
          </v-toolbar-title> -->

          <v-spacer></v-spacer>
          <div class="text-center mr-1">
            <v-menu transition="slide-y-transition" offset-y>

              <template v-slot:activator="{ on }">
                <v-btn dark="" text small v-on="on">
                  <v-icon class="mb-0" left="">account_circle</v-icon>
                  <span class="font-weight-bold">{{ loggedUser.name }}</span>
                  <v-icon right>expand_more</v-icon>
                </v-btn>
              </template>

              <v-list class="mt-1" subheader="" tile="" dense="">
                <v-list-item :to="{ name: 'profile' }">
                  <v-list-item-title class="font-weight-regular">
                    Meu Perfil
                  </v-list-item-title>
                  <v-list-item-avatar>
                    <v-icon>face</v-icon>
                  </v-list-item-avatar>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item :to="{ name: 'logout' }">
                  <v-list-item-title class="font-weight-regular">
                    Logout
                  </v-list-item-title>
                  <v-list-item-avatar>
                    <v-icon>input</v-icon>
                  </v-list-item-avatar>
                </v-list-item>
              </v-list>

            </v-menu>
          </div>
        </v-app-bar>



        <v-navigation-drawer
          width="14%"
          app
          expand-on-hover=""
          v-model="drawer"
        >
          <v-list class="mt-3" dense="">
         
              <v-img
               class="ml-3"
                max-width="70%"
                src="/logo-cplug-blue.png"
              ></v-img>
        
            <v-list-item>
              <v-list-item-title>
                SETOR DE QUALIDADE
              </v-list-item-title>
            </v-list-item>
          </v-list>
          <v-divider color="black"></v-divider>

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
              <v-divider color="black"></v-divider>
              <div>
                <v-switch
                  class="ml-6"
                  v-model="darkTheme"
                  color="primary"
                  inset
                  label="Dark Mode"
                ></v-switch>
              </div>
            </div>
          </template>
        </v-navigation-drawer>
      </nav>
    </div>

    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer :elevation="15" dense tile padless>
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
