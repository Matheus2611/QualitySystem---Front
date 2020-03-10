<template>
  <v-container fluid="">
    <v-scale-transition>
      <div v-if="!loading" class="pa-3">
        <v-card
          @keyup.enter="login"
          :elevation="15"
          width="400px"
          class="mx-auto"
        >
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-toolbar class="primary" flat>
              <v-toolbar-title>
                <v-img
                  width="95px"
                  class="mx-auto"
                  src="/logo-cplug-blue.png"
                ></v-img>
              </v-toolbar-title>
              <v-spacer></v-spacer>

              <h2 class="mt-2 headline text-center white--text font-italic">
                Qualidade
              </h2>
            </v-toolbar>

            <v-layout row justify-space-between>
              <v-col align="center" cols="12" md10>
                <h1
                  class="mt-2 headline text-center text-uppercase font-weigth-black"
                >
                  Login
                </h1>
              </v-col>

              <v-card-text>
                <v-col cols="12" md8>
                  <div class="justify-end" align="right">
                    <v-slide-x-reverse-transition>
                      <v-tooltip v-if="valid == false" right>
                        <template v-slot:activator="{ on }">
                          <v-btn icon class="my-0" @click="resetForm" v-on="on">
                            <v-icon>mdi-refresh</v-icon>
                          </v-btn>
                        </template>
                        <span>Reset</span>
                      </v-tooltip>
                    </v-slide-x-reverse-transition>
                  </div>
                  <v-text-field
                    v-model="username"
                    label="Email"
                    prepend-icon="mdi-account-circle"
                    :rules="loginRule"
                    counter
                  >
                  </v-text-field>
                  <v-text-field
                    :append-icon="showPW ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPW ? 'text' : 'password'"
                    prepend-icon="mdi-lock"
                    v-model="password"
                    label="Senha"
                    :rules="loginRule"
                     @click:append="showPW = !showPW"
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
                  depressed=""
                  block
                  dark
                  class="primary"
                  @click="login"
                  >Entrar</v-btn
                >
              </v-card-actions>
            </div>
          </v-form>
        </v-card>
      </div>
    </v-scale-transition>
    <v-snackbar
      color="error"
      multi-line
      top
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ text }}
      <v-btn text right color="white" @click="snackbar = false">
        Fechar
      </v-btn>
    </v-snackbar>

    <v-dialog
      class="pa-3"
      v-model="loading"
      persistent
      max-width="400px"
      height="100px"
    >
      <v-card class="pa-3">
        <div align="center" justify="center" class="mb-4">
          <v-img width="120px" src="/logo-cplug-blue.png"></v-img>
        </div>
        <div class="text-center">
          <v-progress-circular
            :size="50"
            :width="8"
            color="black"
            :active="loading"
            :indeterminate="loading"
            class="mb-2"
          ></v-progress-circular>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: {
    source: String
  },
  data() {
    return {
      showPW: false,
      valid: true,
      username: "",
      password: "",
      show: false,
      loading: false,
      message: "",
      timeout: 3000,
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
    login() {
      if (this.$refs.form.validate()) {
        (this.show = true),
          (this.loading = true),
          (this.message = "Logando...");

        setTimeout(() => {
          this.$store
            .dispatch("retrieveToken", {
              username: this.username,
              password: this.password
            })
            .then(response => {
              this.$store.dispatch("retrieveProjects");
              this.$store.dispatch("retrieveUsers");
             
              if(response.status === 200)
              {
                //  console.log(this.$store.state.loggedUser)
                //  console.log(this.$store.state.projects)
              this.loading = false;
              this.$router.push({ name: "home" });
              }
            })
            .catch(err => {
              if (err.response.status === 401) {
                this.loading = false;
                this.snackbar = true;
                this.text = "Usuário ou Senha inválidas...";
              }
            });
        }, 500);
      } else {
        this.snackbar = true;
        this.text = "Campos Obrigatórios...";
      }
    }
  }
};
</script>
