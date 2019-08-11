<template>
  <div>
    <q-btn color="white" text-color="black" label="Create Recipient" @click="recipient"/>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      form:{
        type: 'nuban',
        name: 'Simon Moses',
        account_number: '0149634552',
        bank_code: '058',
        currency: 'NGN',
        description: 'test'
      }, 
    }
  },

  methods: {
    async recipient() {
      try {
        const res = await this.$axios.post('https://api.paystack.co/transferrecipient', this.form)
      } catch (error) {
        
      }
    },
  },
}
</script>

<style>
</style>
