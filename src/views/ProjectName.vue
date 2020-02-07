<template>


      <v-card width="97%" class="pa-3 mx-auto mt-3" justify="center">
        <v-toolbar class="blue">
          <v-toolbar-title>
         
            <span class="font-weight-bold"
              >PROJETO:</span
            >
               <span solo="" color="success" class="ml-3 font-weight-bold">
 {{ project.title }}
            </span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
               <v-divider vertical color="black" class="mr-3"></v-divider>
          <h2>STATUS:</h2>
          <div v-if="project.completed == 'Em Andamento'">
            <v-chip class="ma-2 font-weight-bold" color="warning">
              {{ project.completed }}
            </v-chip>
          </div>
          <div v-else>
            <v-chip class="ma-2 font-weight-bold" color="success">
              {{ project.completed }}
            </v-chip>
          </div>
          <v-divider vertical color="black" class="mr-3"></v-divider>
 <h2>CICLO:</h2>
          <v-chip
            class="ma-2 font-weight-bold"
            color="white"
            text-color="black"
          >
           1
          </v-chip>
        </v-toolbar>
  
         
            <v-layout row justify-space-between>
              <v-flex class=" pa-3" md5>
                <v-textarea
                  auto-grow
                  readonly=""
                  v-model="project.description"
                  outlined
                  name="input-10-8"
                  label="Descrição do Projeto"
                >
                  {{ project.description }}
                </v-textarea>
              </v-flex>
              <v-flex md4>  </v-flex>
            </v-layout>
        
      
        <v-card>
          <v-card-title>
            FLUXOS:
          </v-card-title>
        </v-card>
      </v-card>


</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    project() {
      return this.$store.state.projects.find(
        proj => proj.id == this.$route.params.id
      );
    }
  }
};
</script>
