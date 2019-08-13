<template>
  <div class="text-center">
    <div class="text-h1">{{currency_func(balance)+'.00'}}</div>
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

  methods: {
   currency_func(data){
        let amount =  data.toString()
       return Number(amount.substring(0, amount.length-2)).toLocaleString()
    }
  },
}
</script>

<style>
</style>
