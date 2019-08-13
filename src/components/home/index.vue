<template>
  <div>
      {{balance}}
      <transferList />
  </div>
</template>

<script>
import transferList from './partials/transfer-list'
export default {
  // name: 'ComponentName',
  data () {
    return { 

    }
  },

  components:{
    transferList
  },

  computed: {
    balance: function() {return this.$store.getters['balance/balance']},
    currency: function() {return this.$store.getters['balance/currency']}
  },

}
</script>

<style>
</style>
