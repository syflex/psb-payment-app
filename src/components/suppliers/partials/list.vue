<template>
  <div>
    
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {

    }
  },

  methods: {
    async get_recipient() {
      try {
        const res = await this.$axios.get('https://api.paystack.co/transferrecipient')
      } catch (error) {
        
      }
    }, 
  },
}
</script>

<style>
</style>
