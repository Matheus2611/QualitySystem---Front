<template>
  <nav>
    <!-- :mini-variant.sync="mini" -->
    <v-navigation-drawer   app temporary bottom v-model="drawer">
      <v-list-item>
        <v-container grid-list-xl>
          <v-layout row justify-space-between>
            <v-col align="center" cols="12" md10>
              <v-img width="120px" src="/logo-cplug-blue.png"></v-img>
              <span class="text-center text-uppercase font-weight-bold"
                >qualidade</span
              >
            </v-col>
            <v-list-item-title>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    outlined
                    class="pa-3 mb-3"
                    width="100%"
                   
                    depressed
                    small
                    v-on="on"
                    :to="{ name: 'profile' }"
                  >
                    <span>{{ user.username }}</span>
                  </v-btn>
                </template>
                <span>Meu Perfil</span>
              </v-tooltip>
            </v-list-item-title>
          </v-layout>
        </v-container>
      </v-list-item>

      <v-divider></v-divider>

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
      <v-spacer></v-spacer>
         <v-switch 
        class="ml-10 pa-3" 
        v-model="$vuetify.theme.dark" 
        color="primary" 
        inset 
        label="Dark Mode"></v-switch>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon class="grey--text" @click.stop="drawer = !drawer">
      </v-app-bar-nav-icon>

    
        <v-toolbar-title class="ma-3 ml-4">
    
            SETOR DE QUALIDADE
         
        </v-toolbar-title>
      

      <v-spacer></v-spacer>
      <div class="text-center">
        <v-menu transition="slide-y-transition" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn  text small v-on="on">
              <span>Menu</span>
              <v-icon right>expand_more</v-icon>
            </v-btn>
          </template>
          <v-list>
            
            <v-list-item @click="myProj">
             
              Notificações
            </v-list-item>
          <v-divider></v-divider>
            <v-list-item @click="logout">
              Logout
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
    props: {
      attrs: {
        type: Object,
        default: () => ({}),
      },
    },
    data(){
      return {
           initialDark: this.$vuetify
        ? this.$vuetify.theme.dark
        : false,   
        drawer: false,
      user: JSON.parse(localStorage.getItem('user')),
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
        },
         {
          title: "Meus Projetos",
          icon: "insert_chart",
          route: "MyProjects",
          tooltip: "Meus Projetos"
        },
      ],
   
      }
    },
     
   beforeDestroy () {
      if (!this.$vuetify) return

      this.$vuetify.theme.dark = this.initialDark
    },
      
      // mini: true
  

  methods: {
    goTo(name) {
      this.$router.push({ name });
    },
    logout() {
      this.$emit("logout");
    },
    myProj(){
      this.$router.push({name: "MyProjects"})
    },
  }
};
</script>
