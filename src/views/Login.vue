<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" class="mt-10">
      <v-col cols="12" sm="8" md="4">
        <v-card  @keyup.enter="Logar" :elevation="12" width="500" class="mx-auto mt-5">
          <v-toolbar class="blue darken-4" flat>
              
            <v-toolbar-title
              class="text-uppercase white--text mt-1 font-weight-bold"        
            >
          <h2>login</h2>
           
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <img  src="logo-cplug-blue.png" width="100px" />
          </v-toolbar>
          <v-card-title class="justify-center font-weight-bold">
            CONNECTPLUG - QUALIDADE
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="username"
                label="Usuário"
                prepend-icon="mdi-account-circle"
              >
              </v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                v-model="password"
                label="Senha"
                type="Password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <div class="pa-3" align="center">
            <v-card-actions class="justify-center">
              <v-btn block dark class="blue darken-4" @click="Logar"
                >ENTRAR</v-btn
              >
            </v-card-actions>
            <forgotPassword />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import forgotPassword from "../components/ForgotPassword";
export default {
  components: {
    forgotPassword
  },
  props: {
    source: String
  },
  data() {
    return {
      username: null,
      password: null,
      loading: false
    };
  },
  methods: {
    Logar() {
      if (this.username == "matheus" && this.password == 123) {
        this.$emit("Logar", this.username);
      } else {
        alert("Invalid Data");
      }
    }
  }
};
</script>
