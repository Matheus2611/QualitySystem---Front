<template>
  <v-container fluid>
    <v-card flat="" outlined="" class="mx-auto">
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <div class="text-center">
            <v-dialog v-model="dialog" persistent="" width="500">
              <v-card>
                <v-card-title primary-title>
                  <span class="font-weight-regular"
                    >Tem certeza que deseja deletar esse projeto?
                  </span>
                  <span> Tudo feito nele será Perdido!</span>
                </v-card-title>

                <v-divider color="error"></v-divider>

                <v-card-actions>
                  <v-btn color="primary" text @click="dialog = false">
                    Cancelar
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="error" text @click="deleteProject(project.id)">
                    Deletar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>

          <v-toolbar flat="">
            <v-toolbar-title>
              <div v-if="!editingTitle" class="d-flex ml-4">
                <h2 class="headline font-weight-regular">Projeto:</h2>
                <h4 class="ml-3 font-weight-bold title text-uppercase">
                  {{ project.title }}
                </h4>
              </div>
              <div v-else>
                <input
                  type="text"
                  v-model="project.title"
                  v-focus
                  @keyup.enter="doneEdit"
                  @keyup.esc="cancelEdit"
                />
                <v-btn
                  @click="doneEdit"
                  class="ml-2"
                  small=""
                  icon=""
                  color="success"
                >
                  <v-icon>done_all</v-icon>
                </v-btn>
                <v-btn
                  @click="cancelEdit"
                  class="ml-2"
                  icon=""
                  small=""
                  color="error"
                >
                  <v-icon>clear</v-icon>
                </v-btn>
              </div>
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <div v-if="editingTitle == false">
              <v-btn @click="editTitle" class="ml-2" icon="" small="">
                <v-icon>create</v-icon>
              </v-btn>
            </div>

            <div class="ma-2 d-flex">
              <div class="pa-3 d-flex">
                <v-divider class="mr-2" vertical="" color="black"></v-divider>
                <h3 class="headline font-weight-regular">Status:</h3>

                <v-chip
                  v-if="project.status == 'Em Andamento'"
                  class="ml-2 mt-1
                 font-weight-bold"
                  color="warning"
                  small=""
                >
                  {{ project.status }}
                </v-chip>

                <v-chip
                  v-else-if="project.status == 'Concluido'"
                  class="font-weight-bold ml-2 mt-1"
                  color="success"
                  small=""
                >
                  {{ project.status }}
                </v-chip>

                <v-chip
                  v-else-if="project.status == 'Recusado'"
                  class="font-weight-bold ml-2 mt-1"
                  color="error"
                  small=""
                >
                  {{ project.status }}
                </v-chip>
              </div>

              <div class="pa-3 d-flex">
                <v-divider class="mr-2" vertical="" color="black"></v-divider>
                <h3 class="headline font-weight-regular">Ciclo:</h3>
                <v-chip
                  class="ml-2 mt-0 font-weight-light"
                  color="blue darken-4"
                  text-color="black"
                >
                  <span class="font-weight-black white--text">1</span>
                </v-chip>
              </div>
            </div>
          </v-toolbar>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col class="ma-3 d-flex" cols="12" sm="5" md="5">
          <v-textarea
            v-if="!editingDescription"
            auto-grow
            readonly=""
            v-model="project.description"
            outlined
            label="Descrição do Projeto"
          >
            {{ project.description }}
          </v-textarea>

          <v-textarea
            v-else
            auto-grow
            @keyup.enter="doneEdit"
            @keyup.esc="cancelEdit"
            v-model="project.description"
            outlined
            label="Descrição do Projeto"
          >
            {{ project.description }}
          </v-textarea>

          <div v-if="editingDescription == false">
            <v-btn @click="editDescription" class="ml-2" icon="" small="">
              <v-icon>create</v-icon>
            </v-btn>
          </div>
          <div v-else>
            <v-btn
              @click="doneEdit"
              class="ml-2"
              icon=""
              small=""
              color="success"
            >
              <v-icon>done_all</v-icon>
            </v-btn>
            <v-btn
              @click="cancelEdit"
              class="ml-2"
              icon=""
              small=""
              color="error"
            >
              <v-icon>clear</v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-divider vertical=""></v-divider>
        <v-col class="ml-12" cols="12" md="6" sm="6">
          <v-card flat="" outlined="">
            <v-toolbar flat="" dense="">
              <v-toolbar-title class="title font-weight-light"
                >Observações</v-toolbar-title
              >
              <v-spacer></v-spacer>
              <v-btn class="mr-2" large="" icon="" color="blue darken-4"
                ><v-icon color="blue darken-4">add_circle</v-icon></v-btn
              >
            </v-toolbar>
            <v-divider color="black"></v-divider>

            <v-list>
              <v-list-item>
                <v-list-item-content class="font-weight-bold">
                  - Aqui vai uma observação
                </v-list-item-content>

                <v-divider vertical="" color="black"></v-divider>
                <div align="end">
                  <span class="ml-2 font-weight-regular"
                    >Criada Por: Matheus</span
                  >
                </div>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <div class="pa-3">
        <h2 class="headline font-weight-black">Fluxos:</h2>
        <v-row align="center" class="text-center" justify="center">
          <v-col cols="12" sm="12" md="12">
            <v-toolbar flat="">
              <v-toolbar-title>
                - Teste de Stress
              </v-toolbar-title>
            </v-toolbar>
          </v-col>

          <v-col cols="12" sm="3" md="3">
            Aqui vai os inputs de cada teste
          </v-col>
        </v-row>
      </div>

      <v-btn @click="dialog = true" icon="" small="" color="error">
        <v-icon>delete_forever</v-icon>
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      editingTitle: false,
      editingDescription: false,
      beforeEditCache: "",
      dialog: false
    };
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    editDescription() {
      // this.beforeEditCache = this.project.description;
      this.editingDescription = true;
    },
    editTitle() {
      // this.beforeEditCache = this.project.title;
      this.editingTitle = true;
    },
    doneEdit() {
      this.editingTitle = false;
      this.editingDescription = false;
      this.$store.dispatch("updateProject", {
        id: this.project.id,
        title: this.project.title,
        completed: this.project.completed,
        description: this.project.description,
        status: this.project.status
      });
    },
    deleteProject(id) {
      this.$store.dispatch("deleteProject", id);
      this.dialog = false;
      this.$router.push({ name: "home" });
    },
    cancelEdit() {
      // this.project.title = this.beforeEditCache;
      this.editingTitle = false;
      this.editingDescription = false;
    }
  },
  computed: {
    project() {
      return this.$store.state.projects.find(
        proj => proj.id == this.$route.params.id
      );
    }
  }
};
</script>
