<template>
  <v-dialog v-model="dialog" width="350">
    <template v-slot:activator="{ on }">
      <v-btn outlined dark class="blue darken-4 mt-3" small v-on="on">
        <span>Esqueceu a Senha</span>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        <span>Email para Envio do Link</span>


      </v-card-title>

      <div class="pa-3" align="center">
        <v-text-field label="Email" prepend-icon="mail"> </v-text-field>
       
          <v-btn  small color="info mx-0 mt-3">Enviar</v-btn>

       
        
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
};
</script>
