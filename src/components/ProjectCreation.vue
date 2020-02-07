<template>
  <v-container fluid>
    <v-card max-width="100%" class="mx-auto mt-5">
      <v-fade-transition leave-absolute>
        <h1 class="pa-2 green--text">
          PROJETOS: {{ this.$store.state.projects.length }}
        </h1>
      </v-fade-transition>

      <v-divider></v-divider>

      <v-row class="my-1" align="center">
        <strong class="mx-4 info--text text--darken-3">
          Faltando: {{ remainingProjects }}
        </strong>

        <v-divider vertical></v-divider>

        <strong class="mx-4 black--text">
          Completados: {{ completedproj }}
        </strong>

        <v-divider vertical></v-divider>

        <v-text-field
          label="Filtro"
          class="mt-6 ml-3"
          v-model="currentFilterValue"
          placeholder="BUSQUE PELO NOME DO ANALISTA"
          color="primary"
        ></v-text-field>

        <v-progress-circular
          :value="progress"
          class="mr-2 pa-3 mx-auto"
        ></v-progress-circular>
      </v-row>

      <v-divider class="mb-4"></v-divider>
    </v-card>
    <v-toolbar class="headline indigo darken-4">
      <v-toolbar-title>
        <h2 class="font-weight-bold black--text">PROJETOS</h2>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <NewProject @addProject="addProject" />
    </v-toolbar>

    <v-card outlined="">
      <v-tabs grow>
        <v-tab class="warning black--text">
          <v-icon left>cached</v-icon>
          EM ANDAMENTO
        </v-tab>
        <v-tab class="success black--text">
          <v-icon left>done</v-icon>
          CONCLUÍDO
        </v-tab>

        <v-tab-item>
         
          <v-flex
            class="ma-6"
           
          
          >
       
            <v-hover v-slot:default="{ hover }" open-delay="200">
              <v-card  class="mx-auto" outlined="" width="40%" :elevation="hover ? 18 : 2">
                <v-toolbar class="black" dense="" text>
                  <!-- <v-btn
                    class="mr-5"
                    @click="removeProject(record.id)"
                    small
                    color="red"
                  >
                    <v-icon>
                      clear
                    </v-icon>
                  </v-btn>

                  <v-divider color="white" vertical></v-divider> -->

                  <v-toolbar-title>
                    <router-link
                      class="  ml-3 title primary--text font-weight-bold text-uppercase"
                      :to="{
                        name: 'project-name',
                        params: { id: record.id }
                      }"
                    >
                      <h4 class="ma-4 mb-12">PROJETO: {{ record.title }}</h4>
                    </router-link>
                  </v-toolbar-title>
                  <v-spacer></v-spacer>

                  <v-divider color="white" vertical></v-divider>

                  <v-chip
                  small=""
                    v-if="record.completed == 'Em Andamento'"
                    class="ml-2"
                    color="warning"
                  >
                    {{ record.completed }}
                  </v-chip>
                  <v-chip v-else class="ml-2" color="success">
                    {{ record.completed }}
                  </v-chip>
                </v-toolbar>

                <!-- <v-layout row justify-space-between>
                  <v-flex md12> -->
                    <v-card-text>
                        <v-text-field
                           
                            label="Descrição"
                           
                           v-model="record.description"
                           readonly=""
                        ></v-text-field>
                      <!-- <v-textarea
                        class="pa-2"
                        auto-grow
                        v-model="record.description"
                        outlined
                        readonly=""
                        name="input-10-8"
                        label="Descrição do Projeto"
                      >
                        {{ record.description }}
                      </v-textarea> -->
                    </v-card-text>
                  <!-- </v-flex>
                </v-layout> -->
                <!-- <div class="pa-2"> -->
                  <!-- <v-card class="grey darken-4">
                    <v-card-title>
                      FLUXOS:
                    </v-card-title>

                    <v-card-subtitle>
                      <h4>Analista:</h4>
                      <span>{{ record.analist }}</span>
                    </v-card-subtitle>
                  </v-card> -->
                <!-- </div> -->
              </v-card>
            </v-hover>
          </v-flex>
        </v-tab-item>

        <v-tab-item>
          2
        </v-tab-item>
      </v-tabs>
      <v-container class="text-center my-5 mt-10">
        <div v-if="this.$store.state.projects == ''">
          <h2>
            <kbd>SEM NOVOS PROJETOS</kbd>
          </h2>
        </div>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
import NewProject from "../components/NewProject";
export default {
  // props: {
  //   user: {
  //     type: String,
  //     required: true
  //   }
  // authentication: {
  //   type: Boolean,
  //   required: true
  // }
  // },

  components: {
    NewProject
  },

  data() {
    return {
      currentFilterValue: "",
      tab: null,
      items: ["EM ANDAMENTO", "CONCLUÍDO"],
      id: 2,
      // name: this.user,
      // auth: this.authentication,

      show: false
    };
  },
  computed: {
    completedproj() {
      return this.$store.state.projects.filter(
        project => project.completed === "Concluído"
      ).length;
    },
    progress() {
      return (this.completedproj / this.$store.state.projects.length) * 100;
    },
    remainingProjects() {
      return this.$store.state.projects.length - this.completedproj;
    },
    filteredData() {
      var self = this;

      if (
        this.currentFilterValue != undefined &&
        this.currentFilterValue != ""
      ) {
        return this.$store.state.projects.filter(function(d) {
          return (
            d.title.indexOf(self.currentFilterValue) != -1,
            d.analist.indexOf(self.currentFilterValue) != -1
          );
        });
      } else {
        return this.$store.state.projects;
      }
    },
    completedProjects() {
      return this.$store.state.projects.filter(project => {
        return project.completed === "Concluído";
      });
    }
  },

  methods: {
    addProject(title, description, status, select) {
      this.$store.commit("addProject", {
        id: this.id,
        title: title,
        description: description,
        completed: status,
        analist: select
      });
      this.id++;
    },
    addObs() {
      this.observacao = this.obs;
      this.obs = "";
      this.show = false;
    },
    removeProject(id) {
      const index = this.$store.state.projects.findIndex(item => item.id == id);
      this.$store.state.projects.splice(index, 1);
    }
  }
};
</script>
