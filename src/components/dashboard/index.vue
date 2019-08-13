<template>
  <div>
    <transfers />
    <suppliers />
  </div>
</template>

<script>
import transfers from './partials/transfers'
import suppliers from './partials/suppliers'
export default {
  // name: 'ComponentName',
  data () {
    return {}
  },
  components:{
    transfers,suppliers
  }
}
</script>

<style>
</style>
