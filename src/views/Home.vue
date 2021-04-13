<template>
  <v-container fluid>

    <div>
    <h2 class="font-weight-black">
      <v-icon  left large>menu_book</v-icon>
      <span>CARDÁPIO ONLINE</span>
    </h2>
    </div>

    <v-divider></v-divider>

    <div class="mt-5"> 
     <v-data-table
     
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-spacer></v-spacer>

        <v-btn
          color="primary"
          dark
          class="mb-2"
         :to="{name: 'menucreate'}"
        >
          Novo Cardápio
        </v-btn>


      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
      color="warning"
        small
        class="mr-5"
      >
        mdi-cloud-upload
      </v-icon>
      <v-icon
      color="primary"
        small
        class="mr-4"
       @click="MenuEdit()"
      >
        mdi-pencil
      </v-icon>
      <v-icon
      color="red"
        small     
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
    </div>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Cardápio',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Descrição do Cardápio', value: 'description' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {

      MenuEdit(){
        this.$router.push({name: 'productsidea'})
      },

      initialize () {
        this.desserts = [
          {
            name: 'Cardápio de Segunda',
            description: 'cardápio com promoções de segunda feira',
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>