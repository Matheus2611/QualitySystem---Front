<template>

    <v-dialog fullscreen="" hide-overlay transition="dialog-bottom-transition" v-model="dialog" persistent>
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
          <v-toolbar-title  class="ml-3 title font-weight-black">NOVO PROJETO</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="pa-1">
             <v-btn
            width="100px"
             
              text=""
            @click="addProject"
           color="white"
            ><span class="font-weight-bold">Criar</span></v-btn
          >
          </v-toolbar-items>
        </v-toolbar>
       
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
          <v-container fluid="">
            
              <v-row  justify="center">
                <v-col class="mt-7"  cols="12"  md="6">
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
          <v-row v-for="(input, k) in inputs" :key="k">
          <v-col cols="12" sm="6" md="6">
            <div class="d-flex">
              <h4 class="pa-3">{{ k + 1 }}° Fluxo</h4>
              <v-btn
                icon
                color="success"
                class="mt-1"
                @click="add(k)"
                v-show="k == inputs.length - 1"
                ><v-icon>add</v-icon></v-btn
              >
              <v-btn
                icon
                class="mt-1"
                color="red"
                @click="remove(k)"
                v-show="k || (!k && inputs.lenght > 1)"
                ><v-icon>remove</v-icon></v-btn
              >
            </div>
            <v-text-field
            solo
            outlined=""
               class="pa-3"
              label="Nome"
              v-model="input.fluxo"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-select
               class="my-12 pa-3"
              :items="items"
              v-model="select"
              label="Analista Responsável"
            ></v-select>
           
          </v-col>
            <v-text-field  v-model="inputs.statusfluxo" v-show="false">
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
  data() {
    return {
      valid: true,
      idfluxo: 2,
      inputs: [
        {
          idfluxo: 1,
          fluxo: "",
          analista: "",
          statusfluxo: "Em Andamento"
        }
      ],
      dialog: false,
      title: "",
      status: false,
      description: "",
      select: "",
      items: ["matheus", "ketlyn", "ariel", "johnson"]
    };
  },
  methods: {
    add() {
      this.inputs.push({
        idfluxo: this.idfluxo,
        fluxo: "",
        statusfluxo: "Em Andamento"
      });
      this.idfluxo++;
    },
    remove(index) {
      this.inputs.splice(index, 1);
    },
 addProject() {
      this.$store.dispatch("addProject", {
        title: this.title,
        description: this.description,
        completed: this.status,
      }),
        (this.dialog = false),
        (this.title = ""),
        (this.description = ""),
        (this.select = "");
   
    },
  }
};
</script>
