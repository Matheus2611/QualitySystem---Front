<template>
<div>


  
  

    
  <v-card class="blue-grey darken-4"  max-width="100%">
  
      <v-toolbar width="100%" text dark color="indigo darken-4" class="headline">
      <v-toolbar-title>
        <v-icon left>face</v-icon>
        <span>Meu Perfil</span>
      </v-toolbar-title>
    </v-toolbar>
    


    <v-card-text>
      <v-row align="center">
        <v-col align="center" cols="12" md="7">
          <v-hover v-slot:default="{ hover }">
            <v-card outlined="" :elevation="hover ? 16 : 2" class="mx-auto mb-10 pa-3" max-width="65%">
              <div class="pa-1">
                <h2 align-center  class="text-uppercase font-weight-bold mt-2 mb-2">Meus Dados</h2>
            
              </div>

                  <v-divider color="blue"></v-divider>

              <v-col cols="12" md="10" align="center">
                <v-text-field
                  prepend-icon="assignment_ind"
                  label="Meu Nome"
               
                  v-model="user.username"
                  class="pa-4"
                  readonly
                ></v-text-field>
                <v-text-field
                  label="Meu Email"
                  prepend-icon="email"
                   class="pa-4"
                  v-model="user.email"
                  readonly
                ></v-text-field>
                <v-text-field
                  label="Perfil"
                   class="pa-4"
                  prepend-icon="account_box"
                  v-model="user.perfil"
                  readonly
                ></v-text-field>

                <Popup
                  :email="user.email"
                  :username="user.username"
                  @nameChange="changeName"
                />
              </v-col>

              <v-divider></v-divider>
              <div v-if="show == false" class="pa-2" align="right">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      @click="CancelImg"
                      icon=""
                      v-on="on"
                      small
                      color="red"
                    >
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
          
                  <v-text-field
            readonly=""
              v-model="user.password"
              prepend-icon="lock"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            
              :type="show1 ? 'text' : 'password'"
              label="Senha Atual"
              :disabled="disabled"
              solo
              counter
              class="ma-3 mx-auto mt-5"
              @click:append="show1 = !show1"
            ></v-text-field>
          <v-form ref="form" v-model="valid" lazy-validation>
      
            <v-text-field
              prepend-icon="lock"
              v-model="newPassword"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRdivules"
              :type="show2 ? 'text' : 'password'"
              label="Nova Senha"
              hint="No Mínimo 8 Caracteres"
             :disabled="disabled"
             solo
             class="ma-3 mx-auto mt-5"
              counter
              @click:append="show2 = !show2"
            ></v-text-field>
            <v-text-field
              prepend-icon="lock"
              v-model="ConfirmNewPassword"
              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="show3 ? 'text' : 'password'"
              required
              label="Confirmar Nova Senha"
              hint="No Mínimo 8 Caracteres"
              solo
              class="ma-3 mx-auto mt-5"
               :disabled="disabled"
              counter
              @click:append="show3 = !show3"
            ></v-text-field>

         
            <v-btn
            :disabled="!valid"
            @click="validate"
            color="success"
            class="mt-10"
          >
            <span>Salvar</span>
          </v-btn>
             <v-col cols="12" md6>
              <v-slide-x-reverse-transition>
                <v-tooltip v-if="valid == false" right>
                  <template v-slot:activator="{ on }">
                    <v-btn icon class="my-0" @click="resetForm" v-on="on">
                      <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                  </template>
                  <span>Resetar Senhas</span>
                </v-tooltip>
              </v-slide-x-reverse-transition>
            </v-col>
          </v-form>
        
        </v-col>
      </v-row>
      
      
    </v-card-text>
  </v-card>
</div>
</template>

<script>
import Popup from "./nameChangePopup";
export default {
  components: { Popup },
  data() {
    return {
      
      user: JSON.parse(localStorage.getItem('user')),
      disabled: true,
      valid: true,
      show1: false,
      show2: false,
      show3: false,
      newPassword: "",
      ConfirmNewPassword: "",
      file: null,
      show: true,
      imageUrl: "",
      passwordRules: [
        v => !!v || "Campo Obrigatório",
        v => (v && v.length >= 8) || "Mínimo de 8 Caracteres"
      ]
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
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
    changeName(name, useremail) {
       this.user.username = name,
        this.user.email = useremail
   
    },
    CancelImg() {
      (this.file = null), (this.show = true);
    }
  }
};
</script>
