<template>
  <v-card class="mx-auto pa-4 ma-4" max-width="900" outlined>
    <v-card-title class="headline black lighten-5">
      <v-icon left color="white">face</v-icon>
      <span class="white--text">Meu Perfil</span>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <v-row align="center">
        <v-col class="mb-6" cols="12" md="6">
          <v-text-field
            class="pa-4 mx-auto"
            label="Senha Atual"
            id="id"
            color="primary"
            prepend-icon="lock"
          ></v-text-field>
          <v-text-field
            class="pa-4 mx-auto"
            label="Nova Senha"
            id="id"
            color="primary"
            prepend-icon="lock"
          ></v-text-field>
          <v-text-field
            class="pa-4 mx-auto"
            label="Confirmar Senha"
            id="id"
            color="primary"
            prepend-icon="lock"
          ></v-text-field>
        </v-col>
        <v-col align="center" cols="12" md="6">
          <v-card class="mx-auto" max-width="344">
            <div class="grey lighten-2 pa-1">
              <p align-center class="text-uppercase font-weight-bold mt-3">
                Meus Dados
              </p>
            </div>

            <v-col cols="12" md="10" align="center">
              <v-text-field
                prepend-icon="assignment_ind"
                label="Meu Nome"
                :value="username"
                v-model="username"
                readonly
              ></v-text-field>
              <v-text-field
                label="Meu Email"
                prepend-icon="email"
                v-model="email"
                readonly
              ></v-text-field>
              <v-text-field
                label="Perfil"
                prepend-icon="account_box"
                v-model="perfil"
                readonly
              ></v-text-field>

              <Popup
                :email="email"
                :username="username"
                @nameChange="changeName"
              />
            </v-col>
            <v-divider></v-divider>
          <div v-if="show == false" class="pa-2" align="right">
              <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                     @click="CancelImg"
                      class="ma-5"
                      v-on="on"
                      large
                      color="red"
                      icon
                    >
                      <v-icon>create</v-icon>
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
        </v-col>
      </v-row>
      <v-btn color="primary">
        <v-icon left>create</v-icon>
        <span>Alterar Informações</span>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import Popup from "./nameChangePopup";
export default {
  components: { Popup },
  data() {
    return {
      file: null,
      show: true,
      imageUrl: '',
      username: "Ketlyn Santos",
      email: "kety.cplug@gmail.com",
      perfil: "Administrador"
    };
  },
  methods: {
    onFileChange() {
      let reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.file);
    },
    changeName(name, useremail) {
      this.username = name;
      this.email = useremail;
    },
    CancelImg(){
      this.file = null,
      this.show = true
    }
  }
};
</script>
