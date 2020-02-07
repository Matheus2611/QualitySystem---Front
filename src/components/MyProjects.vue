<template>
  <div>
    <div
      class="text-center ma-10 pa-5"
      align="center"
      v-if="myProjects == null"
    >
      <kbd>VOCÊ NÃO TEM NENHUM NOVO PROJETO</kbd>
    </div>

    <v-container v-else class="my-5">
      <h1 class="subheading grey--text">Meus Projetos</h1>

      <v-expansion-panels>
        <v-expansion-panel v-for="project in myProjects" :key="project.id">
          <v-expansion-panel-header
            >Título: {{ project.title }}</v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <v-card>
              <v-card-text>
                <div>Descrição: {{ project.description }}</div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
    };
  },
  computed: {
    myProjects() { 
      return this.$store.state.projects.filter(project => {
        return project.analist === this.user.username
      });
    },
  }
};
</script>
