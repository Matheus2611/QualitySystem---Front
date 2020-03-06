<v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" sm="6" md="12">
            <v-text-field class="pa-3" v-model="title" label="Título" append-icon="create">
            </v-text-field>

            <v-textarea
            class="pa-3"
              auto-grow
              outlined
              v-model="description"
              label="Descrição"
            ></v-textarea>

            <v-text-field label="Status" v-model="status" v-show="false">
            </v-text-field>
          </v-col>
        </v-row>
        <v-card-title
          class=" headline primary--text text-uppercase"
          primary-title
        >
          - Fluxos
        </v-card-title>
        <v-row v-for="(input, k) in inputs" :key="k">
          <v-col cols="12" sm="6" md="6">
            <div class="d-flex">
              <h4 class="pa-3">{{ k + 1 }}° Fluxo</h4>
              <v-btn
                icon
                color="success"
                class="mt-1"
                @click="add(k)"
                v-show="k == inputs.length - 1"
                ><v-icon>add</v-icon></v-btn
              >
              <v-btn
                icon
                class="mt-1"
                color="red"
                @click="remove(k)"
                v-show="k || (!k && inputs.lenght > 1)"
                ><v-icon>remove</v-icon></v-btn
              >
            </div>
            <v-text-field
            solo
            outlined=""
               class="pa-3"
              label="Nome"
              v-model="input.fluxo"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-select
               class="my-12 pa-3"
              :items="items"
              v-model="select"
              label="Analista Responsável"
            ></v-select>
           
          </v-col>
            <v-text-field  v-model="inputs.statusfluxo" v-show="false">
            </v-text-field>
        </v-row>
        <v-divider></v-divider>
        <v-card-actions class="pa-3">
          <v-btn width="200px" text="" @click="dialog = false">Sair</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            width="200px"
            text=""
            @click="addProject"
            color="blue darken-1"
            @keyup.enter="addProject"
            >Criar</v-btn
          >
        </v-card-actions>
      </v-form>

       <v-btn class="mx-2" small=""  fab dark  v-on="on">
      <v-icon dark="">mdi-pencil</v-icon>
    </v-btn>