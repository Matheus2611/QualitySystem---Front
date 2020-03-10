<template>
  <v-dialog
    fullscreen=""
    hide-overlay
    transition="dialog-bottom-transition"
    v-model="dialog"
    persistent
  >
    <template v-slot:activator="{ on }">
      <v-btn class="mx-2" small="" fab color="success" v-on="on">
        <v-icon dark="">mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark="" color="primary" dense="">
        <v-btn large="" dark="" icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-divider vertical="" color="black"></v-divider>
        <v-toolbar-title class="ml-3 title font-weight-black"
          >NOVO PROJETO</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-toolbar-items class="pa-1">
          <v-btn width="100px" text="" @click="addProject" color="white"
            ><span class="font-weight-bold">Criar</span></v-btn
          >
        </v-toolbar-items>
      </v-toolbar>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container fluid="">
            <v-row justify="center">
              <v-col class="mt-7" cols="12" md="6">
                <v-text-field
                  class="pa-3"
                  v-model="title"
                  label="Título"
                  append-icon="create"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-textarea
                  class="pa-3"
                  auto-grow
                  outlined
                  v-model="description"
                  label="Descrição"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Status" v-model="status" v-show="false">
                </v-text-field>
              </v-col>
            </v-row>
            <v-card-title
              class=" headline primary--text text-uppercase"
              primary-title
            >
              - Fluxos
            </v-card-title>
            <v-divider color="black"></v-divider>
            <v-row align="center" justify="center" v-for="(input, k) in inputs" :key="k">
              <v-col cols="12" sm="4" md="4">
                <div class="d-flex">
                  <h4 class="pa-3">{{ k + 1 }}° Fluxo</h4>
                  <v-btn
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
                 
                  outlined=""
                  class="pa-3 mr-5"
                  label="Nome do Fluxo"
                  v-model="input.fluxo"
                ></v-text-field>
              </v-col>
              <v-col class="mt-4" cols="12" sm="4" md="4">

                   <v-select
                   outlined=""
                   label="Analista Responsável"
                   class="mt-7 ml-5"
              :items="items"
              item-value="id"
              item-text="text"
              return-object
              v-model="input.analista"
              @input="setSelect"
            ></v-select>
                <!-- <v-select
                
                  class="my-12 pa-3"
                  v-model="selected"
                  :reduce="text => text.id"
                 
                  :items="items"
                  
                  label="Analista Responsável"
                ></v-select>
                -->
              </v-col>
              <v-col align="end" cols="12" sm="4" md="4">
                    <v-btn class="success mt-3 ml-11">
                      vincular
                    </v-btn>
              </v-col>
              <v-text-field v-model="inputs.statusfluxo" v-show="false">
              </v-text-field>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
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
      valid: true,
      idfluxo: 2,
      inputs: [
      {
        fluxo: "",
        analista: null,
        statusFluxo: "Em Andamento"
      }     
      ],
      dialog: false,
      title: "",
      status: false,
      description: "",
      currentSelect: null,
      items: [],
      fluxos: []
    };
  },
  methods: {
    retrieveUsers() {
      let users = this.$store.state.users;
        
      users.forEach(element => { 
         this.items.push({
            id: element.id,
            text: element.name,     
         })        
      });
      
    },
    setSelect(value){
        console.log(value)
    },

    add() {
      this.inputs.push({
        fluxo: "",
        analista: null,
        statusfluxo: "Em Andamento"
      });

    },
    remove(index) {
      this.inputs.splice(index, 1);
    },
    addProject() {      
      this.$store.dispatch("addProject", {
        title: this.title,
        description: this.description,
        completed: this.status,      
        user_id: this.currentSelect.id
      }),
        (this.dialog = false),
        (this.title = ""),
        (this.description = ""),
        (this.currentSelect = null);
    }
  }
};
</script>
