<template>
  <v-dialog
    fullscreen=""
    hide-overlay
    transition="dialog-bottom-transition"
    v-model="dialog"
    persistent
  >
    <template v-slot:activator="{ on }">
      <v-btn class="mx-2" small=""  color="success" v-on="on">
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
            <v-dialog v-model="flowDialog" persistent="" width="300">
              <v-card :loading="loading">
                <v-card-title primary-title>
                  <span class="ml-4 font-weight-regular"
                    >Deseja criar esse Fluxo?
                  </span>
                </v-card-title>

                <v-divider color="blue"></v-divider>

                <v-card-actions>
                  <v-btn color="primary" text @click="flowDialog = false">
                    Sair
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="success" text @click="createFlow">
                    Criar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>

        <v-row justify="center">
          <v-col class="mt-7" cols="12" sm="6" md="6">
            <v-text-field
              class="pa-3"
              v-model="title"
              label="Título"
              append-icon="create"
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
              label="Descrição"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-text-field
          label="Status"
          v-model="status"
          v-show="false"
        ></v-text-field>
        <v-divider></v-divider>
        <div class="d-flex pa-3">
          <v-card-title
            class=" headline primary--text text-capitalize"
            primary-title
          >
            - Fluxos Do Projeto {{title}}

          </v-card-title>
          <v-spacer></v-spacer>
        </div>
        <v-divider></v-divider>

        <v-row>
          <v-col class="mr-10" cols="12" sm="6" md="6">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row justify="center">
                <v-col cols="12" sm="8" md="8">
                  <v-text-field
                    append-icon="create"
                    label="Título do Fluxo"
                    v-model="flowTitle"
                    :rules="FlowRules"
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
                    <v-btn
                      class="ml-4"
                      icon=""
                      large=""
                      color="success"
                      @click="add(k)"
                      v-show="k == inputs.length - 1"
                      ><v-icon>add</v-icon></v-btn
                    >
                    <v-btn
                      icon=""
                      large=""
                      color="red"
                      @click="remove(k)"
                      v-show="k || (!k && inputs.lenght > 1)"
                      ><v-icon>remove</v-icon></v-btn
                    >
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

              <div class="d-flex">
                <v-btn @click="resetForm" class="mt-4 ml-4">Resetar</v-btn>
                <v-spacer></v-spacer>
                <v-btn :disabled="valid == false" @click="validForm" class="mt-4 ml-2" color="success"
                  >Criar Fluxo</v-btn
                >
              </div>
            </v-form>
          </v-col>

          <v-divider vertical=""></v-divider>

          <v-col class="ml-11 text-center" cols="12" sm="5" md="5">
            <div v-if="this.fluxos != []">
              <h2 class="font-weight-bold title mb-5">Fluxos Criados:</h2>

              <v-expansion-panels focusable multiple="" tile>
                <v-expansion-panel
                  v-for="fluxo in fluxos"
                  :key="fluxo.tituloFluxo"
                >
                  <v-expansion-panel-header class="title primary--text"
                    >Fluxo: {{ fluxo.tituloFluxo }}</v-expansion-panel-header
                  >
                  <v-expansion-panel-content
                    v-for="(teste, k) in fluxo.testes"
                    :key="k"
                    class="text-capitalize"
                  >
                  
                  
                      <v-list class="mb-3 mt-3">
                        <v-list-item>
                          <v-list-item-content class="font-weight-bold"
                            >Teste {{k + 1}}:</v-list-item-content
                          >
                          <v-list-item-content
                            class="align-end font-weight-regular"
                            >{{ teste.title }}</v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                          <v-list-item-content class="font-weight-bold"
                            >Comentário:</v-list-item-content>
                          <v-list-item-content
                            class="align-end font-weight-regular"
                            >{{ teste.comentary }}</v-list-item-content>
                        </v-list-item>
                           <v-divider></v-divider>
                        <v-list-item>
                          <v-list-item-content class="font-weight-bold"
                            >Analista:</v-list-item-content>
                          <v-list-item-content
                            class="align-end font-weight-regular"
                            >{{ teste.user_id }}</v-list-item-content>
                        </v-list-item>
                 
                      </v-list>
                      
                   
               
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="test" color="warning"
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
      flowDialog: false,
      valid: true,
      loading: false,
      show: false,
      inputs: [
        {
          title: "",
          user_id: null,
          status: "Em Andamento",
          comentary: ""
        }
      ],
      FlowRules: [v => !!v || "Campos Obrigatórios"],
      dialog: false,
      title: "",
      status: false,
      description: "",
      flowTitle: "",
      items: [],
      tituloFluxo: "",
      fluxos: [],
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
    resetForm() {
      this.$refs.form.reset();
    },
    validForm(){
      if (this.$refs.form.validate()) {
        this.flowDialog = true
      }
    },

    resetFlow() {
      (this.flowTitle = ""), (this.inputs = []);

      this.inputs.push({
        title: "",
        user_id: null,
        status: "Em Andamento",
        comentary: ""
      });

      this.$refs.form.reset();

      this.flowDialog = false
    },
    createFlow() {

      this.loading = true

      setTimeout(() => {
      this.$store.dispatch("addFlow", {

          title: this.flowTitle,
          status: "Em Andamento"

        })
        .then(response => {
          this.$store.dispatch("addTask",
              {
                inputs: this.inputs,
                flow_id: response.data.id
              },
              (this.tituloFluxo = response.data.title)
            )
            .then(response => {
              if (response.status === 201) 
              {

                (this.snackbar = true),
                (this.text = "Fluxo Criado Com Sucesso");
                this.color = "success";

                // this.$store.state.users.forEach(element => {
                //   console.log(element, index)
                //   const index = element.findIndex(item => item.id == response.data.id)
                  
                // });

                this.fluxos.push({
                  tituloFluxo: this.tituloFluxo,
                  testes: response.data
                });
                
                this.resetFlow();

                this.loading = false
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(err => {
          console.log(err);
        });
      }, 800);
    
    },
    test()
    {
    
            this.$store.dispatch('test', {
              Fluxo: this.fluxos
            
        });    
    },   
    addProject() {
      this.$store.dispatch("addProject", {
        title: this.title,
        description: this.description,
        completed: this.status,
        user_id: this.currentSelect
      }),
        this.$emit("createSuccess"),
        (this.dialog = false),
        (this.title = ""),
        (this.description = ""),
        (this.currentSelect = null);
    }
  }
};
</script>
