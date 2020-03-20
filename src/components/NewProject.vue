<template>
  <v-dialog
    fullscreen=""
    hide-overlay
    transition="dialog-bottom-transition"
    v-model="dialog"
    persistent
  >
    <template v-slot:activator="{ on }">
      <v-btn class="mx-2" small="" color="success" v-on="on">
        <span>Novo Projeto</span>
        <v-icon small="" right="" dark="">mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-snackbar
        multi-line
        top
        :color="color"
        v-model="snackbar"
        :timeout="timeout"
      >
        {{ text }}

        <v-btn text right color="white" @click="snackbar = false">
          Fechar
        </v-btn>
      </v-snackbar>

      <v-toolbar dark="" color="primary" dense="">
        <v-icon>dashboard</v-icon>
        <v-toolbar-title class="ml-3 title font-weight-bold"
          >Novo Projeto</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn large="" dark="" icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container fluid="">
      
        <div class="text-center">
          <v-dialog v-model="confirmDialog" persistent="" width="300">
            <v-card :loading="loading">
              <v-card-title primary-title>
                <span class="ml-4 font-weight-regular">{{ dialogText }} </span>
              </v-card-title>

              <v-divider color="blue"></v-divider>

              <v-card-actions>
                <v-btn color="primary" text @click="confirmDialog = false">
                  Sair
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  v-if="btnIndex == true"
                  color="success"
                  text
                  @click="createFlow"
                >
                  Salvar
                </v-btn>
                <v-btn v-else color="success" text @click="createProject">
                  Criar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
          <v-form ref="Projectform" v-model="Projectvalid" lazy-validation>
        <v-row justify="center">
           
          <v-col class="mt-7" cols="12" sm="6" md="6">
            <v-text-field
              class="pa-3"
              v-model="title"
              label="Título Do Projeto"
              append-icon="create"
              outlined=""
              :rules="ProjectRules"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" sm="6" md="6">
            <v-textarea
              class="pa-3"
              auto-grow
              outlined
              v-model="description"
              label="Descrição Do Projeto"
              :rules="ProjectRules"
            ></v-textarea>
          </v-col>
        </v-row>
        </v-form>

      <v-divider color="black"></v-divider>
        <div class="text-center pa-3">
          <span  class="headline primary--text text-uppercase"
            primary-title> - Fluxos Do Projeto {{ title }}</span>
        
        </div>
        <v-divider color="black"></v-divider>

        <v-row>
       
          <v-col class="mr-10" cols="12" sm="6" md="6">
         <v-form ref="Flowform" v-model="Flowvalid" lazy-validation>
              <v-row justify="center">
                <v-col cols="12" sm="9" md="9">
                  <v-text-field
                    append-icon="create"
                    label="Título do Fluxo"
                    v-model="flowTitle"
                    :rules="ProjectRules"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row
                class="pa-2 ml-2"
                justify="space-between"
                v-for="(input, k) in inputs"
                :key="k"
              >
                <v-col cols="12" sm="6" md="6">
                  <div class="d-flex">
                    <h4 class="mt-2 font-weight-black title">
                      {{ k + 1 }}° Teste
                    </h4>
                    <v-tooltip top="">
                      <template v-slot:activator="{ on }">
                        <v-btn
                          v-on="on"
                          class="ml-4"
                          icon=""
                          large=""
                          color="success"
                          @click="add(k)"
                          v-show="k == inputs.length - 1"
                          ><v-icon>add</v-icon></v-btn
                        >
                      </template>
                      <span>Adicionar Teste</span>
                    </v-tooltip>

                    <v-tooltip top="">
                      <template v-slot:activator="{ on }">
                        <v-btn
                          class="ml-3"
                          v-on="on"
                          icon=""
                          large=""
                          color="red"
                          @click="remove(k)"
                          v-show="k || (!k && inputs.lenght > 1)"
                          ><v-icon>remove</v-icon></v-btn
                        >
                      </template>
                      <span>Remover Teste</span>
                    </v-tooltip>
                  </div>
                  <v-text-field
                    class="mt-1"
                    outlined=""
                    label="Nome do Teste"
                    v-model="input.title"
                    :rules="FlowRules"
                  ></v-text-field>
                </v-col>
                <v-col class="mt-12" cols="12" sm="5" md="5">
                  <v-select
                    outlined=""
                    label="Analista Responsável"
                    :items="items"
                    item-value="id"
                    item-text="text"
                    return-value
                    v-model="input.user_id"
                    :rules="FlowRules"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    :rules="FlowRules"
                    outlined=""
                    label="Comentario sobre o Teste"
                    v-model="input.comentary"
                  ></v-text-field>
                </v-col>
                <v-text-field v-model="inputs.status" v-show="false">
                </v-text-field>
             
              </v-row>

              <div class="text-center">
                <v-btn
                  :disabled="Flowvalid == false"
                  @click="validFlowForm"
                  class="mb-7 ml-2"
                  color="success"
                  >Criar Fluxo</v-btn
                >
              </div>
             </v-form>
          </v-col>
         
          <v-divider vertical="" color="black"></v-divider>

          <v-col class="ml-11 text-center" cols="12" sm="5" md="5">
            <div v-if="this.fluxos != []">
              <h2 class="font-weight-bold title mb-5">Fluxos Criados:</h2>

              <v-expansion-panels focusable multiple="" tile>
                <v-expansion-panel v-for="(fluxo, k) in fluxos" :key="k">
                  <v-expansion-panel-header class="title primary--text">
                    <div>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            @click="deleteFlow(k)"
                            icon=""
                            small=""
                            v-on="on"
                            color="error"
                          >
                            <v-icon>delete_forever</v-icon>
                          </v-btn>
                        </template>
                        <span>Deletar Fluxo</span>
                      </v-tooltip>
                    </div>

                    <div class="d-flex headline">
                      {{ k + 1 }}º

                      {{ fluxo.tituloFluxo }}
                    </div>
                  </v-expansion-panel-header>

                  <v-expansion-panel-content
                    v-for="(teste, k) in fluxo.testes"
                    :key="k"
                    class="text-capitalize"
                  >
                    <v-list class="mb-3 mt-3">
                      <v-list-item-title class=" font-weight-bold">
                        Teste {{ k + 1 }}
                      </v-list-item-title>
                      <v-list-item>
                        <v-list-item-content class="font-weight-bold"
                          >Título: </v-list-item-content
                        >
                        <v-list-item-content
                          class="align-end font-weight-regular"
                          >{{ teste.title }}</v-list-item-content
                        >
                      </v-list-item>

                      <v-divider color="black"></v-divider>

                      <v-list-item>
                        <v-list-item-content class="font-weight-bold"
                          >Comentário:</v-list-item-content
                        >
                        <v-list-item-content
                          class="align-end font-weight-regular"
                          >{{ teste.comentary }}</v-list-item-content
                        >
                      </v-list-item>

                      <v-divider color="black"></v-divider>

                      <v-list-item>
                        <v-list-item-content class="font-weight-bold"
                          >Analista:</v-list-item-content
                        >
                        <v-list-item-content
                          class="align-end font-weight-regular"
                          >{{ teste.user_id}}</v-list-item-content
                        >
                      </v-list-item>
                    </v-list>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </v-col>
        </v-row>
        <v-divider color="black"></v-divider>
        <v-card-actions  class="justify-space-between pa-3">
            <v-btn width="30%"  @click="resetForm" dark=""
            ><span class="font-weight-bold">Resetar Campos</span></v-btn
          >
          
          <v-btn width="30%" :disabled="Projectvalid == false" @click="validProjectForm" color="warning"
            ><span class="font-weight-bold">Criar Projeto</span></v-btn
          >
        </v-card-actions>
         
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  created() {
    this.retrieveUsers();
  },

  data() {
    return {
      Projectvalid: true,
      Flowvalid: true,
      show: false,
      inputs: [
        {
          title: "",
          user_id: null,
          status: "Em Andamento",
          comentary: ""
        }
      ],
      ProjectRules: [v => !!v || "Campos Obrigatórios"],
      FlowRules: [v => !!v || "Campos Obrigatórios"],
      dialog: false,
      title: "",
      description: "",
      flowTitle: "",
      items: [],
      fluxos: [],
      confirmDialog: false,
      loading: false,
      btnIndex: true,
      dialogText: "",
      snackbar: false,
      timeout: 2000,
      text: "",
      color: ""
    };
  },
  methods: {
    retrieveUsers() {
      let users = this.$store.state.users;

      users.forEach(element => {
        this.items.push({
          id: element.id,
          text: element.name
        });
      });
    },
    add() {
      this.inputs.push({
        title: "",
        user_id: null,
        status: "Em Andamento",
        comentary: ""
      });
    },
    remove(index) {
      this.inputs.splice(index, 1);
    },
    deleteFlow(index) {
      this.fluxos.splice(index, 1);
    },
    resetForm() {
      this.$refs.Flowform.reset();
      this.$refs.Projectform.reset();
    },
    validFlowForm() {
      if (this.$refs.Flowform.validate()) {
        this.confirmDialog = true;
        this.dialogText = "Deseja Criar Este Fluxo?";
      }
    },
    validProjectForm() {
      if (this.$refs.Projectform.validate()) {
      this.btnIndex = false;
      this.confirmDialog = true;
      this.dialogText = "Deseja Mesmo Criar Este Projeto?";
       }
    },

    resetFlow() {
      this.$refs.Flowform.resetValidation();

      this.flowTitle = "";
      this.inputs = [];

      this.inputs.push({
        title: "",
        user_id: null,
        status: "Em Andamento",
        comentary: ""
      });

      this.confirmDialog = false;
    },
    createFlow() {
      this.fluxos.push({
        tituloFluxo: this.flowTitle,
        testes: this.inputs
      }),
        this.resetFlow();
    },
    createProject() {
      
      this.loading = true;

      setTimeout(() => {
        this.$store
          .dispatch("addProject", {
            title: this.title,
            description: this.description
          })
          .then(response => {
            this.$store
              .dispatch("createFlow", {
                fluxos: this.fluxos,
                cicle_id: response.data
              })
              .then(response => {
                if (response.status === 201) {
                  this.loading = false;
                  this.confirmDialog = false;
                  this.fluxos = [];

                  this.$emit("createSuccess"),
                  (this.dialog = false),
                  (this.title = ""),
                  (this.description = "")

                  
                }
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            console.log(error);
          });
      }, 600);
      this.btnIndex = true;
    }
  }
};
</script>
