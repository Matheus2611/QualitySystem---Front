<template>
      <v-dialog v-model="dialog" width="550">
    <template v-slot:activator="{ on }">
      <v-btn small   v-on="on">
          <v-icon left>create</v-icon>
        <span>Novo Projeto</span>
      </v-btn>
    </template>
    <v-card>
      <v-card-title  class=" headline" primary-title>
       Dados do Projeto


      </v-card-title>
  <v-form  ref="form"
          v-model="valid"         
          lazy-validation>
      <div class="pa-3" align="center">
         
        <v-text-field   v-model="title" label="Título" append-icon="create"> </v-text-field>

               <v-textarea
               auto-grow
          outlined
          v-model="description"
          label="Descrição"
      
        ></v-textarea>
          <v-select
      
          max-height="100%"
          v-model="select"
          :items="items"
          label="Vincular Analista"
          append-icon="assignment_ind"
        ></v-select>
          <v-text-field label="Status" v-model="status" v-show="false"> </v-text-field>

          <v-divider></v-divider>
      
           <v-btn  width="200px" dark color="mx-0 mt-3 mr-10"  @click="dialog = false">Sair</v-btn>

          <v-btn  width="200px" @click="addProject"  color="success mx-0 mt-3 ml-10" @keyup.enter="addProject">Criar</v-btn>
       

       
        
      </div>
  </v-form>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
    data(){
        return {
          valid: true,
          
            dialog: false,
            title: '',
            status: false,
            description: '',
            select: '',
        items: [
          'matheus',
          'ketlyn',
          'ariel',
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