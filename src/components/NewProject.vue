<template>
      <v-dialog v-model="dialog" width="550">
    <template v-slot:activator="{ on }">
      <v-btn depressed dark class="blue darken-4" v-on="on">
          <v-icon left>create</v-icon>
        <span>Novo Projeto</span>
      </v-btn>
    </template>
    <v-card>
      <v-card-title  class=" headline" primary-title>
       Dados do Projeto


      </v-card-title>

      <div class="pa-3" align="center">
        <v-text-field v-model="title" label="Título" append-icon="create"> </v-text-field>

               <v-textarea
          outlined
          v-model="description"
          label="Descrição"
        ></v-textarea>
          <v-combobox
          max-height="100%"
          v-model="select"
          :items="items"
          label="Vincular Analista"
          append-icon="assignment_ind"
        ></v-combobox>
          <v-text-field label="Status" v-model="status" v-show="false" readonly append-icon="check_circle"> </v-text-field>

          <v-divider></v-divider>
       
          <v-btn  width="200px" color="success mx-0 mt-3 mr-10" @click="addProject" @keyup.enter="addProject">Criar</v-btn>
       
           <v-btn  width="200px" dark color="mx-0 mt-3 ml-10" @click="dialog = false">Sair</v-btn>

       
        
      </div>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
    data(){
        return {
            dialog: false,
            title: '',
            status: 'Em Andamento',
            description: '',
            select: '',
        items: [
          'Matheus',
          'Ketlyn',
          'Ariel',
          'johnson',
        ],
        }
    },
    methods: {
        addProject(){
            this.$emit('addProject', 
               this.title,
               this.description,
                this.status,
                this.select
            )
            this.dialog = false,
             this.title = '',
               this.description = '',
                this.status = '',
                this.select = ''
        }
    },
}
</script>