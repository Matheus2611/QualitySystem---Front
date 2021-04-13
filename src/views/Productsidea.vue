<template>
  <v-container grid-list-xs>
   


    <v-card class="pa-5" outlined :elevation="1">
      <v-row justify="space-between">
     
         
      <h2 class="font-weight-black">
        <v-icon left large>menu_book</v-icon>
        <span>Cardápio de segunda</span>
      </h2>
    
      
      <v-btn outlined color="red">
        <v-icon left>add_circle_outline</v-icon>
        Nova Categoria</v-btn
      >
      </v-row>
    </v-card>

    <v-card
      :elevation="1"
      outlined
      v-for="(category, i) in categories"
      :key="i"
      class="mt-5"
    >
      <v-app-bar dark :src="category.img">
        <v-toolbar-title>{{ category.title }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <div justify="space between">
          <v-btn icon color="success">
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>

           <v-btn icon color="red">
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </div>

      </v-app-bar>

      <v-container fluid>
        <v-row>
          <v-col v-for="(product, j) in category.products" :key="j" cols="3">
            <v-card :elevation="2" class="mt-5">
              <v-img height="150" :src="product.src">
                  <div align="end">
          <v-btn icon color="success">
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>

           <v-btn icon color="red">
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </div>
              </v-img>

              <v-card-title
                class="headline"
                v-text="product.name"
              ></v-card-title>

              <v-card-subtitle class="mt-2" v-text="product.description">
              </v-card-subtitle>

              <v-divider class="mx-4"></v-divider>

              <v-card-text v-text="product.price"> </v-card-text>
            </v-card>
          </v-col>

          <div class="mt-8" align="end">
               <v-btn outlined color="success">
        <v-icon left>add_circle_outline</v-icon>
        Novo Produto</v-btn
      >
          </div>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    categories: [
      {
        title: "Massas",
        img: "",
        products: [
          {
            src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
            title: "Raviolli",
            description: "Massa de raviolli",
            price: 19.9,
          },
          {
            src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
            title: "Penne",
            description: "Massa de penne",
            price: 15.9,
          },
                    {
            src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
            title: "Costela",
            description: "burguer de costela",
            price: 20.2,
          },
          {
            src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
            title: "Bacon",
            description: "Hamburguer bacon",
            price: 16.9,
          },
                       {
            src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
            title: "Costela",
            description: "burguer de costela",
            price: 20.2,
          },
          {
            src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
            title: "Bacon",
            description: "Hamburguer bacon",
            price: 16.9,
          },
          
        ],
      },
      {
        title: "Sanduiches",
        img: "",
        products: [
        ],
      },
    ],
  }),
};
</script>