<template>
 <!-- Ver porque os projetos estão ficando null ao dar refresh  -->
  <v-container fluid>
    <h3 class="font-weight-black">
      <v-icon left>assignment</v-icon>
      <span>Home</span>
    </h3>

    <v-divider></v-divider>
    <v-row align="center" justify="center">

      <v-snackbar
      color="success"
      multi-line
      top
      v-model="snackbar"
      :timeout="timeout"
    >
      <span class="font-weight-bold">Projeto Criado Com Sucesso</span>
      <v-btn text right color="white" @click="snackbar = false">
        Fechar
      </v-btn>
    </v-snackbar>

      <v-col cols="12" sm="11" md="11">
        <v-card outlined="" :elevation="1" max-width="100%" class="mx-auto">
          <v-row class="ma-2" align="center" justify="space-between">
            <v-fade-transition leave-absolute>
              <h1 class="pa-2 text-center primary--text font-weight-regular">
                PROJETOS: {{ this.$store.state.projects.length }}
              </h1>
            </v-fade-transition>
            <NewProject @createSuccess="snackbar = true" />
          </v-row>

          <v-divider color="black"></v-divider>

          <v-row align="center">
            
            <v-btn
              color="warning"
              :class="{ active: filter == 'Em Andamento' }"
              @click="changeFilter('Em Andamento')"
              text=""
            >
              <strong class="ma-2 warning--text font-weight-regular">
                Em Andamento: {{ remainingProj }}
              </strong>
            </v-btn>

            <v-divider vertical color="black"></v-divider>

            <v-btn
              color="success"
              :class="{ active: filter == 'Concluido' }"
              @click="changeFilter('Concluido')"
              text=""
            >
              <strong class="ma-2 success--text font-weight-regular">
                Concluídos: {{ completedproj }}
              </strong>
            </v-btn>

            <v-divider vertical color="black"></v-divider>

            <v-btn
              color="error"
              :class="{ active: filter == 'Recusado' }"
              @click="changeFilter('Recusado')"
              text=""
            >
              <strong class="ma-2 error--text font-weight-regular">
                Recusados: {{ refusedProj }}
              </strong>
            </v-btn>

            <v-divider vertical color="black"></v-divider>

            <v-spacer></v-spacer>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="10">
        <v-card  outlined="" height="100%">
          <v-data-iterator
            :search="search"
            :items="projectsFiltered"
            item-key="id"
            :items-per-page="projectsFiltered.length"
  
          >
            <template v-slot:header>
              <v-toolbar  class="mb-2">
                <v-toolbar-title class="primary--text title font-weight-regular">
                  Filtro: {{ filter }}
                </v-toolbar-title>

                <v-spacer></v-spacer>
                <v-text-field
                  class="pa-4"
                  v-model="search"
                  clearable
                  hide-details
                  append-icon="search"
                  label="Procurar"
                ></v-text-field>
              </v-toolbar>
              
            </template>

            <template v-slot:default="{ items }">
              <v-row justify="space-between" class="pa-2">
                <v-col
                  v-for="item in items"
                  :key="item.id"
                  cols="12"
                  sm="6"
                  md="6"
                >
           
                  <v-hover v-slot:default="{ hover }">
                    <v-card
                    outlined=""
                      :to="{
                        name: 'project-name',
                        params: { id: item.id }
                      }"
                      width="700px"
                      class="mx-auto"
                      :elevation="hover ? 16 : 0"
                    >
                      <v-toolbar flat="" dense="">
                        <v-toolbar-title
                          class="title font-weight-black text-uppercase primary--text mx-auto"
                        >
                          {{ item.title }}
                        </v-toolbar-title>
                      </v-toolbar>
                      <v-divider></v-divider>
                      <v-list>
                        <v-list-item>
                          <v-list-item-content class="font-weight-bold"
                            >Descrição:</v-list-item-content
                          >
                          <v-list-item-content
                            class="align-end font-weight-regular"
                            >{{ item.description }}</v-list-item-content
                          >
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                          <v-list-item-content class="font-weight-bold"
                            >Analistas:</v-list-item-content
                          >
                          <v-list-item-content
                            class="align-end font-weight-regular"
                            >Matheus, Ketlyn, Johnson,
                            Ariel</v-list-item-content
                          >
                        </v-list-item>
                        <v-divider></v-divider>

                        <div class="d-flex">
                          <h6 class="ml-1 mt-2 text-secondary">
                            Criado Por: MATHEUS
                          </h6>
                          <h6 class="ml-1 mt-2  text-secondary">
                            Em: {{ item.created_at }}
                          </h6>
                        </div>
                      </v-list>
                      <v-divider></v-divider>
                    </v-card>
                  </v-hover>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
        </v-card>
      </v-col>
      <!-- <v-divider class="ml-5" vertical=""></v-divider>

      <v-col class="mx-auto align-center" cols="12" md="5" sm="5">
        <v-card max-height="100%" max-width="100%">
          <v-toolbar flat>
            <v-toolbar-title class=" font-weight-regular"
              >Atividades Recentes</v-toolbar-title
            >
          </v-toolbar>
          <v-card-title primary-title>
            Aqui vai a lista de atividades recentes de todos os projetos
          </v-card-title>
        </v-card>
      </v-col> -->
    </v-row>
    
  </v-container>
</template>


<script>
import NewProject from "../components/NewProject";
export default {
  created() {
    this.$store.dispatch("retrieveProjects");
  },
  components: {
    NewProject
  },

  data() {
    return {
      search: "",
      show: false,
      items: [],
      completed: false,
      onGoing: true,
      refused: false,
      snackbar: false,
      timeout: 2500
    };
  },
  computed: {
    filter() {
      return this.$store.state.filter;
    },
    projectsFiltered() {
      return this.$store.getters.projectsFiltered;
    },
    projects() {
      return this.$store.state.projects;
    },
    completedproj() {
      return this.$store.getters.completedproj;
    },
    remainingProj() {
      return this.$store.getters.remainingProj;
    },
    refusedProj() {
      return this.$store.getters.refusedProj;
    }
  },

  methods: {
    changeFilter(filter) {
      this.$store.dispatch("updateFilter", filter);
    },
    Completed() {
      (this.completed = true), (this.onGoing = false), (this.refused = false);
    },
    Refused() {
      (this.completed = false), (this.onGoing = false), (this.refused = true);
    },
    OnGoing() {
      (this.completed = false), (this.onGoing = true), (this.refused = false);
    }
  }
};
</script>
