<template>
<div>

</div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('destroyToken')
      .then(response => {
        if(response.status === 200){
          this.$router.push({ name: 'login' })
        }
      })
  }
}
</script>
