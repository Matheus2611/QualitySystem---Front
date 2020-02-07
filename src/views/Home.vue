<template>
<v-container fluid>
 <div v-if="user.perfil == 'Administrador'">
      <ProjectCreation/>
  </div>

  <div v-else>
      <MyProjects/>
  </div>
</v-container>
 
</template>

<script>
import ProjectCreation from "@/components/ProjectCreation";
import MyProjects from "@/components/MyProjects";
export default {
  components: {ProjectCreation, MyProjects},
  data(){
    return {
      user: JSON.parse(localStorage.getItem('user')),
    }
  }
}
</script>