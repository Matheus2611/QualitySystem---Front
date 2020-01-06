<template>
  <nav>
    
    <!-- :mini-variant.sync="mini" -->
    <v-navigation-drawer dark app temporary bottom  v-model="drawer">
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="/instasize_190915122357.png"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                width="100%"
                dark
                depressed
                small
                v-on="on"
                :to="{ name: 'profile' }"
              >
                <span>{{username}}</span>
              </v-btn>
            </template>
            <span>Meu Perfil</span>
          </v-tooltip>
        </v-list-item-title>
      </v-list-item>

      <v-list dense>
        <v-list-item
          v-for="link in links"
          :key="link.title"
          @click="goTo(link.route)"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <span> {{ link.title }}</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn small block @click="logout">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  
     <v-app-bar dark app>
      <v-app-bar-nav-icon class="grey--text" @click.stop="drawer = !drawer">
      </v-app-bar-nav-icon>
     
      <div>
        <v-toolbar-title>
          <span class="font-weight-light blue--text">SETOR DE QUALIDADE</span>
        </v-toolbar-title>
      </div>
       <v-toolbar-title class="pa-3 mb-3">
        <v-img width="80px" src="/logo-cplug-blue.png"></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn outlined v-on="on" depressed>
              <v-icon left>expand_more</v-icon>
              <span>Menu</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item> </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    
  </nav>
</template>

<script>
export default {
      props: {
    user: {
      type: String,
      required: true
    }
    },
  data() {
    return {
      drawer: false,
      'username': this.user,
      links: [
        {
          title: "Home",
          icon: "mdi-home-city",
          route: "home",
          tooltip: "Home"
        },
        {
          title: "Cadastrar Usuário",
          icon: "mdi-account",
          route: "register",
          tooltip: "Cadastrar Usuário"
        },
        {
          title: "Lista de usuários",
          icon: "assignment_ind",
          route: "list",
          tooltip: "Listar Usuário"
        }
      ],
      // mini: true
    };
  },
  methods: {
    goTo(name) {
      this.$router.push({ name });
    },
    logout(){
      this.$emit('logout')
    }
  }
};
</script>
