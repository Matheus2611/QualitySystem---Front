<template>
   <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
              <v-snackbar multi-line top v-model="snackbar" :color="color" :timeout="timeout">
          {{ text }}
          
          <v-btn text right color="white" @click="snackbar = false">
            Fechar
          </v-btn>
        </v-snackbar>
            <v-card outlined=""  class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                text
              >
                <v-toolbar-title>Cadastrar Usuário</v-toolbar-title>
                <v-spacer />

                
                
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" lazy-validation  v-model="valid">
                  <v-text-field
                    label="Nome"
                    name="Nome"
                    prepend-icon="person"
                    type="text"
                    v-model="name"
                    :rules="RegisterRules"
                  />

                  <v-text-field
                     v-model="email"
                    label="Email"
                    name="email"
                    prepend-icon="mail"
                    type="email"
                    :rules="RegisterRules"
                  />

                  <v-select
                  prepend-icon="insert_chart"
                   v-model="perfil"
                  :items="items"
                  :rules="RegisterRules"
                  label="Perfil">

                  </v-select>

                  <v-text-field  v-model="password" v-show="false"> </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                        <v-slide-x-reverse-transition>
                          <v-tooltip v-if="valid == false" right>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                icons
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
                    
                <v-spacer />
                <v-btn @click="Register"  :disabled="!valid" color="primary">Cadastrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
export default {
  data(){
    return{
      valid: true,
      snackbar: false,
      text: '',
      color: '',
      timeout: 2000,
    
      name: '',
      email: '',
      password: '123456',
      perfil: '',
        items: ['Administrador', 'Analista Senior', 'Analista'],
        RegisterRules: [
          v => !!v || "Campos Obrigatórios"
        ]
         }
    },
    methods: {
      Register(){
       if (this.$refs.form.validate()) {
      
        this.$store.commit("RegisterUser", {
          username: this.name,
          email: this.email,
          perfil: this.perfil,
          password: '123456'
        })
           this.$refs.form.reset();
         this.snackbar = true
         this.color = 'success'
         this.text = 'Cliente cadastrado com sucesso'
       }else{
         this.snackbar = true
         this.color = 'red'
         this.text = 'Campos Obrigatórios'
          
       } },
      resetForm() {
      this.$refs.form.reset();
    },
    }
  }

</script>