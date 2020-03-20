<template>
<div>

   <v-snackbar
      color="success"
      multi-line
      top
      v-model="snackbar"
      :timeout="timeout"
    >
      <span class="font-weight-regular">Bem vindo {{loggedUser.name}}</span>
      <v-btn text right color="white" @click="snackbar = false">
        Fechar
      </v-btn>
    </v-snackbar>

    <div v-if="loggedUser.perfil == 'Administrador'">

    <ProjectCreation/>

    </div>

    <div v-else>

        <UserProjects/>
        
    </div>
</div>
 
</template>

<script>
import ProjectCreation from "@/components/ProjectCreation";
import UserProjects from "@/components/UserProject";
export default {
  created() {
      this.$store.dispatch("retrieveProjects");

  },
  props: {
    dataSuccess: {
      type: Boolean
    }
  },
  components: {
    ProjectCreation, 
    UserProjects
  },
  data(){
    return {
      timeout: 3000,
      snackbar: this.dataSuccess
    }
  },
  computed: {
    loggedUser(){
      return this.$store.state.loggedUser
    }
  }
}
</script>