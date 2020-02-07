<template>
  <v-dialog v-model="dialog" width="350">
    <template v-slot:activator="{ on }">
      <v-btn  class="mt-3" small width="80%"  v-on="on">

<span>Editar Dados</span>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        Alterar Informações
      </v-card-title>

      <div class="pa-3" align="center">
        <v-text-field

          v-model="name"
          Label="Novo Nome"
          color="primary"
          prepend-icon="account_circle"
        >
        </v-text-field>

            <v-text-field

          v-model="useremail"
          Label="Novo Email"
          color="primary"
          prepend-icon="email"
        >
        </v-text-field>

        <v-btn small color="success mx-0 mt-3" @click="submit(name, useremail)">Salvar</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
     'name': this.username,
     'useremail': this.email
    }
  },
  methods: {
    submit() {
      this.$emit("nameChange", this.name, this.useremail);
      this.dialog = false
    
    }
  }
};
</script>
