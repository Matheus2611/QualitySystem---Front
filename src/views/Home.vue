<template>

<div class="home">
    <ProjectCreation/>
</div>
 
</template>

<script>
import ProjectCreation from "@/components/ProjectCreation";
export default {
  created() {
    this.$store.dispatch("retrieveProjects");
  },
  
  components: {ProjectCreation},
  data(){
    return {
     
    }
  },
}
</script>