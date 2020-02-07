<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-scale-transition>
          <div v-if="!loading" class="text-center">
            <v-card
              @keyup.enter="Logar"
              :elevation="15"
              width="400px"
              class="mx-auto mt-6"
            >
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-toolbar class="blue darken-4" flat>
                  <v-toolbar-title
                    class="text-uppercase white--text mt-1 font-italic-bold"
                  >
                    <h2>login</h2>
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>

                <v-layout row justify-space-between>
                  <v-col align="center" cols="12" md10>
                    <v-img width="120px" src="/logo-cplug-blue.png"></v-img>
                    <h2
                      class="text-center pa-3 text-uppercase font-weigth-bold"
                    >
                      QUALIDADEs
                    </h2>
                  </v-col>

                  <v-card-text>
                    <v-col cols="12" md8>
                      <div class="justify-end" align="right">
                        <v-slide-x-reverse-transition>
                          <v-tooltip v-if="valid == false" right>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                icon
                                class="my-0"
                                @click="resetForm"
                                v-on="on"
                              >
                                <v-icon>mdi-refresh</v-icon>
                              </v-btn>
                            </template>
                            <span>Reset</span>
                          </v-tooltip>
                        </v-slide-x-reverse-transition>
                      </div>
                      <v-text-field
                        v-model="username"
                        label="Usuário"
                        prepend-icon="mdi-account-circle"
                        :rules="loginRule"
                        counter
                      >
                      </v-text-field>
                      <v-text-field
                        prepend-icon="mdi-lock"
                        v-model="password"
                        label="Senha"
                        type="Password"
                        :rules="loginRule"
                        counter
                      ></v-text-field>
                    </v-col>
                  </v-card-text>
                </v-layout>

                <v-divider></v-divider>
                <div class="pa-3" align="center">
                  <v-card-actions class="justify-center">
                    <v-btn
                      :disabled="!valid"
                      block
                      dark
                      class="blue darken-4"
                      @click="Logar"
                      >ENTRAR</v-btn
                    >
                  </v-card-actions>

                  <forgotPassword />
                </div>
              </v-form>
            </v-card>
          </div>
        </v-scale-transition>

        <v-snackbar multi-line top v-model="snackbar" :timeout="timeout">
          {{ text }}
          <v-btn text right color="primary" @click="snackbar = false">
            Fechar
          </v-btn>
        </v-snackbar>

        <v-dialog class="pa-3" v-model="loading" persistent max-width="400px">
          <v-card class="pa-3">
            <div align="center" justify="center" class="mb-4">
              <v-img width="120px" src="/logo-cplug-blue.png"></v-img>
            </div>
            <div class="text-center">
              <v-progress-circular
                :size="50"
                :width="7"
                color="primary"
                :active="loading"
                :indeterminate="loading"
                class="mb-2"
              ></v-progress-circular>
            </div>
          </v-card>
        </v-dialog>
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
      valid: true,

      username: "",
      password: "",

      show: false,
      loading: false,
      message: "",
      timeout: 2000,
      snackbar: false,
      text: "",
      loginRule: [v => !!v || "Campos Obrigatórios"]
    };
  },
  // watch: {
  //   loading (val) {
  //     if (!val) return

  //   },
  // },
  methods: {
    resetForm() {
      this.$refs.form.reset();
    },
    Logar() {
      if (this.$refs.form.validate()) {
        (this.show = true),
          (this.loading = true),
          (this.message = "Logando...");

        setTimeout(() => {
          for (const user of this.$store.state.user) {
            if (
              user.username == this.username &&
              user.password == this.password
            ) {
              console.log("Chegou if");
              this.$emit("Logar", user);
            } else {
              console.log("Chegou else");
              this.text = "Dados Inválidos...";
              this.snackbar = true;
            }
            
          }
          this.loading = false;
        }, 1500);
      } else {
        this.snackbar = true;
        this.text = "Campos Obrigatórios...";
      }
    }
  }
};
</script>
