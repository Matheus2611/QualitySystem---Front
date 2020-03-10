<template>
    <v-container fluid="">
        <v-row align="center" justify="center">
            <v-col 
            v-for="myProjects in userProjects"
            :key="myProjects.id"
            cols="12" 
            sm="12"
            md="12"
            >
                <v-card outlined="">
                 

                    <v-card-title>{{myProjects.title}}</v-card-title>
                    <v-card-subtitle>{{myProjects.description}}</v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
        
    
</template>

<script>
export default {

    computed: {
        userProjects(){    
            return this.$store.state.userProjects
        }
    },
}
</script>