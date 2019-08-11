<template>
  <div>
    {{balance}}
    <loadWallet />
  </div>
</template>

<script>
import loadWallet from './partials/load-wallet'
export default {
  // name: 'ComponentName',
  data () {
    return {}
  },

  components:{
    loadWallet
  },

  computed: {
    balance: function() {return this.$store.getters['balance/balance']},
    currency: function() {return this.$store.getters['balance/currency']}
  },
}
</script>

<style>
</style>
