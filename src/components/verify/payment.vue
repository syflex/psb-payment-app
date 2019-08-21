<template>
  <div>
     <q-btn flat color="primary" v-if="loading == true" size="xl" :loading="loading"/>
  </div>
</template>

<script>
export default {
  props:['reference'],
  // name: 'ComponentName',
  data () {
    return {
      loading: false,
      }
  },

  mounted() {
    this.verify_payment();
  },

  methods: {
    async verify_payment(){
        try {
          this.loading = true
          const res = await this.$axios.get(`${process.env.BASE_URL}/transaction/verify/${this.reference}`)
          this.$q.notify({message: 'payment successful', position : 'bottom-left', color: 'positive'})
          this.loading = true
          this.$router.push({name: 'wallet'})
        } catch (error) {
          this.$q.notify({message: 'payment error', position : 'bottom-left', color: 'negative'})
          this.$router.push({name: 'wallet'})
        }

    }
  },
}
</script>

<style>
</style>
