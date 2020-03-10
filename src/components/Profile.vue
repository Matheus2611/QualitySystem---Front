<template>
  <v-container fluid>

    <h3 class="font-weight-black">
      <v-icon  left>face</v-icon>
      <span>Meu Perfil</span>
    </h3>

    <v-divider ></v-divider>

    
      <v-row align="center">
          <v-snackbar
      multi-line
      top
      :color="color"
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ text }}

      <v-btn text right color="white" @click="snackbar = false">
        Fechar
      </v-btn>
    </v-snackbar>
        <v-col align="center" cols="12" md="7">
         
      <v-hover
        v-slot:default="{ hover }"
      
      >
          <v-card
            outlined=""
            :elevation="hover ? 15 : 0"
            class="mx-auto mb-10"
            max-width="65%"
          >
            <div class="pa-1">
              <h2
                align-center
                class=" font-weight-regular mt-2 mb-3"
              >
                Meus Dados
              </h2>
            </div>

            <v-divider color="black"></v-divider>

            <v-col cols="12" md="10" align="center">
              <v-text-field
                prepend-icon="assignment_ind"
                label="Meu Nome"
                v-model="loggedUser.name"
                class="pa-4"
                readonly
              ></v-text-field>
              <v-text-field
                label="Meu Email"
                prepend-icon="email"
                class="pa-4"
                v-model="loggedUser.email"
                readonly
              ></v-text-field>
              <v-text-field
                label="Perfil"
                class="pa-4"
                prepend-icon="account_box"
                v-model="loggedUser.perfil"
                readonly
              ></v-text-field>
            </v-col>

            <v-divider color="black"></v-divider>
            <div v-if="show == false" class="pa-2" align="right">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn @click="CancelImg" icon="" v-on="on" small color="red">
                    <v-icon>clear</v-icon>
                  </v-btn>
                </template>
                <span>Trocar Imagem</span>
              </v-tooltip>
            </div>

            <div v-if="file == null" class="pa-3">
              <v-file-input
                color="primary"
                prepend-icon="mdi-camera"
                v-model="file"
                label="Selecione uma Imagem"
                accept="image/*"
                @change="onFileChange"
              ></v-file-input>
            </div>
            <div v-else class="pa-3" align="center">
              <v-list-item-avatar size="140">
                <v-img :src="imageUrl"></v-img>
              </v-list-item-avatar>
              <div v-if="show == true" class="mr-7" align="center">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      @click="file = null"
                      class="ma-5"
                      v-on="on"
                      large
                      color="red"
                      icon
                    >
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </template>
                  <span>CANCELAR</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      @click="show = false"
                      class="ma-5"
                      v-on="on"
                      large
                      color="success"
                      icon
                    >
                      <v-icon>done</v-icon>
                    </v-btn>
                  </template>
                  <span>CONFIRMAR</span>
                </v-tooltip>
              </div>
            </div>
          
          </v-card>
      </v-hover>
        </v-col>
        <v-col align="center" class="mt-9" cols="12" md="4">
          <div>
            <v-btn class="mb-3" text @click="disabled = !disabled">
              <v-icon left>
                lock
              </v-icon>
              <span class="font-weight-bold">ALTERAR SENHA</span>
            </v-btn>
          </div>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              prepend-icon="lock"
              v-model="password.current"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="show1 ? 'text' : 'password'"
              label="Senha Atual"
              :disabled="disabled"
              solo
              class="ma-3 mx-auto mt-5"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
            <v-text-field
              prepend-icon="lock"
              v-model="password.password"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="show2 ? 'text' : 'password'"
              label="Nova Senha"
              hint="No Mínimo 6 Caracteres"
              :disabled="disabled"
              solo
              class="ma-3 mx-auto mt-5"
              counter
              @click:append="show2 = !show2"
            ></v-text-field>
            <v-text-field
              prepend-icon="lock"
              v-model="password.password_confirmation"
              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="show3 ? 'text' : 'password'"
              required
              label="Confirmar Nova Senha"
              hint="No Mínimo 6 Caracteres"
              solo
              class="ma-3 mx-auto mt-5"
              :disabled="disabled"
              counter
              @click:append="show3 = !show3"
            ></v-text-field>
              <div class="d-flex justify-center">
            <v-btn
           
             :disabled="disabled"
              @click="updateAuthUserPassword"
              color="success"
              class="mt-10"
             
            >
              <span>Alterar</span>
            </v-btn>
          
              <v-slide-x-reverse-transition>
                <v-tooltip v-if="valid == false" right>
                  <template v-slot:activator="{ on }">
                    <v-btn icon class="mt-10" @click="resetForm" v-on="on">
                      <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                  </template>
                  <span>Resetar Senhas</span>
                </v-tooltip>
              </v-slide-x-reverse-transition>
           </div>
          </v-form>
        </v-col>
      </v-row>
   
  </v-container>
</template>

<script>

export default {

  data() {
    return {
      loggedUser: JSON.parse(localStorage.getItem('loggedUser')),
      disabled: true,
      valid: null,
      show1: false,
      show2: false,
      show3: false,
      timeout: 3000,
      snackbar: false,
      text: '',
      color: '',
      password: {},
      file: null,
      show: true,
      dialog: false,
      imageUrl: "",
      passwordRules: [
       
        v => !!v || "Campo Obrigatório",
        v => (v && v.length >= 6) || "Mínimo de 6 Caracteres"
      ]
    };
  },
  methods: {
    updateAuthUserPassword() {

      
      if (this.$refs.form.validate()) {
          this.$store.dispatch('updateAuthUserPassword', {
            current: this.password.current,
            password: this.password.password,
            password_confirmation: this.password.password_confirmation,
          })
          .then(response => {
            if(response.status === 200){
              this.$refs.form.reset();
              this.disabled = true
              this.password = {},
              this.snackbar = true,
              this.text = 'Senha Alterada Com Sucesso',
              this.color = 'success'
            }
                   
          })
          .catch(error => {
              if(error.response.status === 403){
              this.snackbar = true,
              this.text = 'Senha Atual Não Confere...',
              this.color = 'error'
            }
              if(error.response.status === 422){
              this.snackbar = true,
              this.text = 'Novas Senhas Não São Iguais...',
              this.color = 'warning'
            }             
          })
      }
    },
    resetForm() {
      this.$refs.form.reset();
    },
    onFileChange() {
      let reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.file);
    },
    CancelImg() {
      (this.file = null), (this.show = true);
    }
  }
};
</script>
