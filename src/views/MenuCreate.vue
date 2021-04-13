<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="4">
        <v-card :elevation="4" class="pa-4" justify="center" align="center" outlined>
          <h4 class="title font-weight-bold mt-5">
            Clique no botão para começar a criar seu cardápio
          </h4>

          <v-dialog
            hide-overlay
            transition="dialog-bottom-transition"
            width="70%"
            v-model="dialog"
            persistent
          >
            <template v-slot:activator="{ on }">
              <v-btn class="ma-6" color="info" v-on="on">
                <span>Novo Cardápio</span>
                <v-icon right="" dark="">ballot</v-icon>
              </v-btn>
            </template>

            <v-toolbar dark="" color="primary" dense="">
              <v-icon>ballot</v-icon>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn large="" dark="" icon @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>

            <v-stepper v-model="e1">
              <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">
                  Criar Cardápio
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2">
                  Criar Categoria do Produto
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 3" step="3">
                  Produtos da Categoria {{ category_title }}
                </v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-card>
                    <div align="center">
                      <h3 class="title font-weight-bold mb-5">
                        1º Dê um nome e descrição para seu Cardápio!
                      </h3>
                    </div>

                    <v-divider></v-divider>

                    <v-row justify="center">
                      <v-col class="mt-1" cols="12" sm="6" md="6">
                        <span class="font-weight-bold mt-2"
                          >Nome do Cardápio</span
                        >
                        <v-text-field
                          v-model="menu_title"
                          class="mt-2"
                          placeholder="Cardápio de Segunda..."
                          append-icon="create"
                          outlined=""
                        >
                        </v-text-field>

                        <span class="font-weight-bold mt-2"
                          >Descrição do Cardápio</span
                        >
                        <v-text-field
                          class="mt-2"
                          v-model="menu_description"
                          placeholder="Promoções de segunda-feira..."
                          append-icon="create"
                          outlined=""
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn color="primary" @click="e1 = 2"> Continuar </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-card>
                    <div align="center">
                      <h3 class="title font-weight-bold mb-5">
                        2º Dê um nome e imagem para a primeira categoria de
                        produtos do cardápio!
                      </h3>
                    </div>

                    <v-divider></v-divider>

                    <v-row justify="center">
                      <v-col class="mt-1" cols="12" sm="6" md="6">
                        <span class="font-weight-bold mt-2"
                          >Nome da Categoria</span
                        >
                        <v-text-field
                          class="mt-2"
                          v-model="category_title"
                          placeholder="Massas..."
                          append-icon="create"
                          outlined=""
                        >
                        </v-text-field>

                        <v-file-input
                          class="mr-4"
                          label="Imagem da Categoria"
                          prepend-icon="mdi-camera"
                          accept="image/png, image/jpeg"
                          dense
                        ></v-file-input>
                      </v-col>
                    </v-row>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-btn outlined class="mt-4" @click="e1 = 1">
                        Voltar
                      </v-btn>

                      <v-spacer></v-spacer>

                      <v-btn color="primary" @click="e1 = 3" class="mt-4 ml-3">
                        Continuar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-stepper-content>

                <v-stepper-content step="3">
                  <v-card>
                    <v-row justify="center">
                      <v-card
                        outlined
                        :elevation="2"
                        class="mb-2 pa-3"
                        width="50%"
                      >
                        <v-row justify="center">
                          <span class="title" primary-title
                            >Produtos da categoria:</span
                          >
                        </v-row>
                        <v-row justify="center">
                          <span class="title font-weight-bold primary--text">
                            {{ category_title }}</span
                          >
                        </v-row>
                      </v-card>
                    </v-row>

                    <v-card outlined :elevation="2" class="mt-2">
                      <v-row
                        class="ma-3"
                        justify="space-between"
                        v-for="(product, k) in products"
                        :key="k"
                      >
                        <v-col class="mr-7" cols="12" sm="5" md="5">
                          <div class="d-flex">
                            <h4 class="mt-2 font-weight-black title">
                              {{ k + 1 }}° Produto
                            </h4>
                          </div>

                          <v-divider color="black"></v-divider>

                          <v-card class="mt-7" max-width="300">
                            <div v-if="product_img == null">
                              <v-img
                                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                                height="150px"
                              ></v-img>
                            </div>

                            <div v-else>
                              <v-img :src="product.img" height="150px"></v-img>
                            </div>

                            <v-card-actions>
                              <v-file-input
                                color="primary"
                                prepend-icon="mdi-camera"
                                v-model="product_img"
                                label="Insira a Imagem do Produto"
                                accept="image/*"
                                @change="onFileChange"
                              ></v-file-input>
                            </v-card-actions>
                          </v-card>
                        </v-col>

                        <v-col class="mt-10" cols="12" sm="6" md="6">
                          <v-text-field
                            type="text"
                            v-model="product.name"
                            label="Nome do Produto"
                            append-icon="mdi-pencil"
                          >
                          </v-text-field>
                          <v-text-field
                            v-model="product.price"
                            label="Preço do Produto"
                            append-icon="R$"
                          ></v-text-field>
                          <v-textarea
                            v-model="product.description"
                            solo
                            name="input-7-4"
                            label="Descrição do Produto"
                          ></v-textarea>

                          <v-row justify="center" align="center">
                            <v-col class="ml-3" cols="12">                           
                              <v-btn
                              small
                              class="mr-2"
                                dark
                                color="red"
                                @click="remove(k)"
                                v-show="k || (!k && products.lenght > 1)"
                                ><v-icon left>remove</v-icon>
                                {{ k + 1 }}º Produto
                              </v-btn>
                              <v-btn
                              small
                                class="ml-8"
                                @click="add(k)"
                                v-show="k == products.length - 1"
                                color="success"
                              >
                                <v-icon left>add_circle_outline</v-icon>
                               Add Produto</v-btn
                              >
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card>

                    <v-card-actions>
                      <v-btn outlined class="mt-4" @click="e1 = 2">
                        Voltar
                      </v-btn>

                      <v-spacer></v-spacer>

                      <v-btn @click="saveMenu()" color="success" class="mt-4">
                        Salvar Cardápio
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>

            <!--    <v-divider vertical="" color="black"></v-divider>

          <v-col class="ml-11 text-center" cols="12" sm="5" md="5">
            <div v-if="this.fluxos != []">
              <h2 class="font-weight-bold title mb-5">Fluxos Criados:</h2>

              <v-expansion-panels focusable multiple="" tile>
                <v-expansion-panel v-for="(fluxo, k) in fluxos" :key="k">
                  <v-expansion-panel-header class="title primary--text">
                    <div>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            @click="deleteFlow(k)"
                            icon=""
                            small=""
                            v-on="on"
                            color="error"
                          >
                            <v-icon>delete_forever</v-icon>
                          </v-btn>
                        </template>
                        <span>Deletar Fluxo</span>
                      </v-tooltip>
                    </div>

                    <div class="d-flex headline">
                      {{ k + 1 }}º

                      {{ fluxo.tituloFluxo }}
                    </div>
                  </v-expansion-panel-header>

                  <v-expansion-panel-content
                    v-for="(teste, k) in fluxo.testes"
                    :key="k"
                    class="text-capitalize"
                  >
                    <v-list class="mb-3 mt-3">
                      <v-list-item-title class=" font-weight-bold">
                        Teste {{ k + 1 }}
                      </v-list-item-title>
                      <v-list-item>
                        <v-list-item-content class="font-weight-bold"
                          >Título: </v-list-item-content
                        >
                        <v-list-item-content
                          class="align-end font-weight-regular"
                          >{{ teste.title }}</v-list-item-content
                        >
                      </v-list-item>

                      <v-divider color="black"></v-divider>

                      <v-list-item>
                        <v-list-item-content class="font-weight-bold"
                          >Comentário:</v-list-item-content
                        >
                        <v-list-item-content
                          class="align-end font-weight-regular"
                          >{{ teste.comentary }}</v-list-item-content
                        >
                      </v-list-item>

                      <v-divider color="black"></v-divider>

                      <v-list-item>
                        <v-list-item-content class="font-weight-bold"
                          >Analista:</v-list-item-content
                        >
                        <v-list-item-content
                          class="align-end font-weight-regular"
                          >{{ teste.user_id}}</v-list-item-content
                        >
                      </v-list-item>
                    </v-list>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </v-col> -->
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      e1: 1,
      categories: [],
      imageUrl: "",
      product_img: null,
      menu: [],
      products: [
        {
          name: "",
          description: "",
          price: "",
          img: null,
        },
      ],

      dialog: false,
      menu_title: "",
      menu_description: "",
      category_title: "",
      category_img: "",
    };
  },

  methods: {
    add() {
      this.products.push({
        name: "",
        description: "",
        price: "",
        img: null,
      });
    },
    remove(index) {
      this.products.splice(index, 1);
    },

    saveMenu() {
     this.categories.push({
      title: this.category_title,
      products: this.products,
    });

     this.menu.push({
      title: this.menu_title,
      description: this.menu_description,
      categories: this.categories,
    });

      console.log(this.menu);
    },

    onFileChange() {
      let reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.product_img);

      this.products.push({
        img: this.product_img,
      });
    },
    CancelImg() {
      this.product_img = null;
    },
  },

};
</script>
