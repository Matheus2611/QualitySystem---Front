<template>
<v-layout row class="mb-5 mx-2">
    <v-container  class="my-5">
       <v-card>
    <v-card-title>
        Usuários
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="this.$store.state.user"
      :search="search"
    ></v-data-table>
  </v-card>


    </v-container>
  </v-layout>
</template>

<script>
  export default {
    data(){
      return{ 
      search: '',
      
      headers: [
        {
            text: 'Usuário',
            align: 'left',
            sortable: false,
            value: 'username',
        },
        {
          text: 'Email', value: 'email'
        },
        {
          text: 'Perfil', value: 'perfil'
        }
      ]
   }
    }
  }
</script>