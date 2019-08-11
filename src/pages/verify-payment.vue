<template>
  <q-page padding>
    <!-- content -->
    <verifyPayment :reference="this.$route.query.reference"/>
  </q-page>
</template>

<script>
import verifyPayment from 'components/verify/payment'
export default {
  // name: 'PageName',
  components:{
    verifyPayment
  }
}
</script>

<style>
</style>
