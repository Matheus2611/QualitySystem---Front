<template>
  <div>
    <v-layout row class="mb-5 mx-2">
      <v-container class="my-5">
        <v-card width="100%" class="pa-3 mx-auto" justify="center">
          <v-toolbar class="blue">
            <v-toolbar-title>
              <span class="white--text font-weight-bold">MEUS PROJETOS</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <NewProject @addProject="addProject" />
          </v-toolbar>
          <v-card flat color="grey">
            <v-tabs grow>
              <v-tab>
                <v-icon left>cached</v-icon>
               EM ANDAMENTO
              </v-tab>
              <v-tab>
                <v-icon left>done</v-icon>
                CONCLUÍDO
              </v-tab>
              <v-tab-item>
                   <v-layout row wrap>
                <v-flex
                  md8
                  lg6
                  v-for="project in projects"
                  :key="project.title"
                >
                  <v-card
                    class=" ml-5 mr-5 pa-3 ma-3 mt-10"
                    :elevation="5"
                   
                    max-width="600px"
                  >
                    <v-toolbar flat>
                      <h4>TÍTULO:</h4>
                      <v-toolbar-title>
                        <span
                          class=" pa-3 title font-weight-bold text-uppercase"
                        >
                          {{ project.title }}</span
                        >
                      </v-toolbar-title>
                    </v-toolbar>

                    <v-card-text class="font-weight-bold">
                      <h4>Descrição:</h4>
                      <span> {{ project.description }} </span>
                    </v-card-text>

                    <v-card-actions>
                      <v-row align="center" justify="end">
                        <v-col cols="12" md="6">
                          <h4>Analista:</h4>
                          <span>{{ project.analist }}</span>
                        </v-col>
                        <v-col cols="12" md="6">
                          <h4>Status:</h4>
                          <span>{{ project.status }}</span>
                        </v-col>
                      </v-row>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
              </v-tab-item>

              <v-tab-item>
                <v-card>
                  <v-card-text>
                    <p>
                      2
                    </p>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-card>
        

          <v-container class=" text-center my-5">
            <div v-if="projects == ''">
              <kbd>SEM NOVOS PROJETOS</kbd>
            </div>
          </v-container>
        </v-card>
      </v-container>
    </v-layout>
    <v-container>
      <h2>Welcome {{ name }}</h2>
      <h3>{{ auth }}</h3>
    </v-container>
  </div>
</template>
<script>
import NewProject from "../components/NewProject";
export default {
  props: {
    user: {
      type: String,
      required: true
    },
    authentication: {
      type: Boolean,
      required: true
    }
  },

  components: {
    NewProject
  },

  data() {
    return {
      tab: null,
      items: ["EM ANDAMENTO", "CONCLUÍDO"],
      text: "oi",
      name: this.user,
      auth: this.authentication,
      projects: []
    };
  },

  methods: {
    addProject(title, description, status, select) {
      this.projects.push({
        title: title,
        description: description,
        status: status,
        analist: select
      });
    },
    onGoingProjects() {
      alert("onGoing");
    },
    DoneProjects() {
      alert("Done");
    }
  }
};
</script>
