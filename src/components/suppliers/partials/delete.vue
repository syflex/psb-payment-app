<template>
  <q-btn size="sm" no-caps="" color="negative" label="Delete" @click="delete_recipient" :loading="loading"/>
</template>

<script>
export default {
  props:['id'],
  // name: 'ComponentName',
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async delete_recipient(){
      this.loading = true
      try {
        const res = this.$axios.delete('https://api.paystack.co/transferrecipient/'+ this.id)
        this.loading = false
        this.$q.notify({message: res.data.message, position : 'bottom-left', color: 'positive'})
      } catch (error) {
        this.loading = false
        this.$q.notify({message: error.data.message, position : 'bottom-left', color: 'negative'})
      }
    }
  },
}
</script>

<style>
</style>
