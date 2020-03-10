<template>

<div class="home">
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
    this.$store.dispatch('retrieveUserProject')
    
  },
  
  components: {ProjectCreation, UserProjects},
  data(){
    return {
       
    }
  },
  computed: {
    loggedUser() {
      return this.$store.state.loggedUser;
    }
  }
}
</script>