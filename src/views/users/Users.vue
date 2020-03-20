<template>
  <v-container class="pa-10" fluid>
    <h3 class="font-weight-black">
      <v-icon left>people_alt</v-icon>
      <span>Usuários</span>
    </h3>

    <v-divider class="mb-4"></v-divider>
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

    <v-dialog v-model="dialogDelete" persistent="" width="340">
      <v-card>
        <v-card-title primary-title>
      
          <span class="font-weight-regular"
            >Tem certeza que deseja deletar o Usuário
          </span>
          <span class="text-uppercase font-weight-black">{{ user.name }}</span>
       
        </v-card-title>

        <v-divider color="error"></v-divider>

        <v-card-actions>
          <v-btn color="primary" text @click="dialogDelete = false">
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="deleteItem">
            Deletar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
      class="mx-auto mt-10 elevation-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="headline font-weight-bold primary--text"
            >USUÁRIOS</v-toolbar-title
          >
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="blue darken-1" @click="resetForm" dark class="mb-2" v-on="on"
                >Novo Usuário</v-btn
              >
            </template>
            <v-card :loading="loading">
              <v-card-title>
                <span class="headline primary--text">{{ formTitle }}</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-form ref="form" lazy-validation v-model="valid">
                  <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        label="Nome"
                        name="Nome"
                        prepend-icon="person"
                        type="text"
                        v-model="editedItem.name"
                        :rules="RegisterRules"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        label="Email"
                        name="Email"
                        prepend-icon="email"
                        type="text"
                        v-model="editedItem.email"
                        :rules="emailRules"
                      />
                    </v-col>

                    <v-col cols="12" sm="6" md="12">
                      <v-select
                        prepend-icon="insert_chart"
                        :items="items"
                        label="Perfil"
                        v-model="editedItem.perfil"
                        :rules="RegisterRules"
                      >
                      </v-select>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions class="pa-4">
                <v-btn text @click="close">Cancelar</v-btn>

                <v-spacer></v-spacer>
                <v-btn color="success" :disabled="!valid" text @click="save"
                  >Salvar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon color="success" small class="mr-5" @click="editItem(item)">
          edit
        </v-icon>
        <v-icon color="error" small @click="deleteUser(item)">
          delete
        </v-icon>
      </template>
    </v-data-table>
    
  </v-container>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("retrieveUsers");
  },

  data: () => ({
    user: {},
    name: "",
    email: "",
    password: "",
    dialog: false,
    dialogDelete: false,
    loading: false,
    search: "",
    text: "",
    color: "",
    valid: false,
    snackbar: false,
    timeout: 3000,
    items: ["Administrador", "Analista Senior", "Analista"],
    headers: [
      {
        text: "Nome",
        align: "left",
        value: "name"
      },
      { text: "Email", value: "email" },
      { text: "Perfil", value: "perfil" },
      { text: "Ações", value: "action", sortable: false }
    ],
    RegisterRules: [v => !!v || "Campos Obrigatórios"],
    emailRules: [
      v => !!v || "Campos Obrigátórios",
      v => /.+@.+\..+/.test(v) || "E-mail tem que ser Válido"
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      email: "",
      perfil: ""
    },
    defaultItem: {
      name: "",
      email: "",
      perfil: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo Usuário" : "Editar Usuário";
    },
    users() {
      return this.$store.state.users;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    resetForm() {
      this.$refs.form.resetValidation();
    },
    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteUser(item) {
      (this.user = item), (this.dialogDelete = true);
    },

    deleteItem() {
      this.$store.dispatch("deleteUser", this.user.id);

      this.user = {};
      this.dialogDelete = false;
      (this.snackbar = true), (this.text = "Usuário Deletado Com Sucesso");
      this.color = "error";
    },

    close() {
      this.loading = false
      this.dialog = false;
      this.$refs.form.reset();
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 400);
    },
    save() {
      if (this.$refs.form.validate()) {
        this.loading = true
        if (this.editedIndex > -1) {
          setTimeout(() => {
            this.$store
              .dispatch("updateUser", {
                id: this.editedItem.id,
                name: this.editedItem.name,
                email: this.editedItem.email,
                perfil: this.editedItem.perfil
              })
              .then(response => {
                if (response.status === 200) {
                  this.close();
                  this.snackbar = true;
                  this.text = "Usuário Editado Com Sucesso";
                  this.color = "success";
                }
              })
               .catch(err => {
                if (err.response.status === 500) {
                  this.snackbar = true;
                  this.text = "Email já está sendo utilizado";
                  this.color = "warning";
                  this.loading = false
                }
              });
          }, 600)
        }
        else {
          setTimeout(() => {
            this.$store
              .dispatch("register", {
                name: this.editedItem.name,
                email: this.editedItem.email,
                perfil: this.editedItem.perfil
              })
              .then(response => {
                if (response.status === 201) {
                  this.close();
                  this.snackbar = true;
                  this.text = "Usuário Cadastrado Com Sucesso";
                  this.color = "success";
                }
              })
              .catch(err => {
                if (err.response.status === 422) {
                  this.snackbar = true;
                  this.text = "Email já está sendo utilizado";
                  this.color = "warning";
                  this.loading = false
                }
              });
          }, 600);
        }    
      }
    }
  }
};
</script>
