<template>
  <div>
    
  </div>
</template>

<script>
export default {
  props:['reference'],
  // name: 'ComponentName',
  data () {
    return {}
  },

  mounted() {
    this.verify_payment();
  },

  methods: {
    async verify_payment(){
        const res = await this.$axios.get(`https://api.paystack.co/transaction/verify/${this.reference}`)
    }
  },
}
</script>

<style>
</style>
