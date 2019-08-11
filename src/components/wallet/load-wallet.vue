<template>
  <div>
    <q-btn color="white" text-color="black" label="load balance" @click="pay"/>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      form:{
        reference: '',
        callback_url: process.env.URL,
        amount: 500000,
        email: 'admin@psb.com',
      },
    }
  },
  methods: {
    async pay() {
      try {
        const res = await this.$axios.post('https://api.paystack.co/transaction/initialize', this.form)
      } catch (error) {
        
      }
    },
  },
}
</script>

<style>
</style>
