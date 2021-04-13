<template>
  <v-app>
  
    

    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="primary" :elevation="15" dense tile padless>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>ConnectPlug</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

