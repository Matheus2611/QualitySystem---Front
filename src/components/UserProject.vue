<template>
    <v-container fluid="">
    
    </v-container>
        
    
</template>

<script>
export default {
    created()
    {
        this.$store.dispatch('retrieveFlows')
        // .then(response => {
        //     response.data.forEach(element => {
        //         this.flows.push({
        //             id: element.id,
        //             flowTitle: element.title,
        //             status: element.status
        //         })
        //         this.tasks.push(element.tasks)
        //     });
        // }) 
        
        // console.log(this.tasks)
    },

    data() {
        return {
            flows: [],
            tasks: []
        }
    }
   
}
</script>