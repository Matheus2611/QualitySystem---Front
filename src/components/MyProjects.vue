<template>
  
 
    <v-container fluid align="center">
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

        <div>
          
      
       <v-expansion-panels>
        <v-expansion-panel >
          <v-expansion-panel-header class="font-weight-bold text-uppercase"
            >Como Mandar Notas Fiscais Para o Contador?</v-expansion-panel-header
          >
          <v-expansion-panel-content>
           
              <v-container>

              <v-row no-gutters="">
                <v-col
               
                cols="12" sm="12" md="12"
                 >
                  <h4 class="font-weight-bold primary--text"> 1° Passo:</h4>
                   <h4 class="font-weight-bold">- Entre no ERP(Retaguarda) do sistema e clique em 'Financeiro'</h4>
                     <div class="mt-12 mr-4" align="center" justify="center">
                      <v-img width="200px" src="/Financeiro.png"></v-img>
                    </div>
      
             
                 </v-col>
                 
                <v-divider class="ma-3" vertical></v-divider>

                

               
              </v-row>
                <v-divider></v-divider>
    
              <v-divider></v-divider>
             </v-container>
              <span  class="ml-8 font-weight-bold">Ou Clique nesse link para ir direto: </span>
              <router-link to="http://connectplug.com.br/contabilidade">http://connectplug.com.br/contabilidade</router-link>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
        </div>

        <div align="center" justfy="center">
                  <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
          <v-container :search="search"  v-for="(input, k) in inputs" :key="k">
     
              {{k+1}}° Passo
              <v-text-field
                solo
                label="Passo"
               v-model="input.name"
              ></v-text-field>
              <span>
                <v-btn icon color="red" @click="remove(k)" v-show="k || ( !k && inputs.lenght > 1)"><v-icon>remove</v-icon></v-btn>
                 <v-btn icon color="success" @click="add(k)" v-show="k == inputs.length-1"><v-icon>add</v-icon></v-btn>
              </span>
          </v-container>
        </div>
    </v-container>
 
</template>

<script>
export default {
  data() {
    return {
       file: null,
      show: true,
      imageUrl: "",
      user: JSON.parse(localStorage.getItem('user')),
      search: '',
      id: 2,
      inputs: [
        {
          idinput: 1,
          step: '',
          stepImg: ''
        }
      ]
    };
  },
  methods: {
    add(){
      this.inputs.push({ 
        id: this.id,
        name: ''
        
      })
      this.id++
    },
    onFileChange() {
      let reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.file);
    },
    CancelImg() {
      (this.file = null), (this.show = true);
    },
    remove(index){
      this.inputs.splice(index, 1)
     
    }
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
