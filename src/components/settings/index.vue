<template>
  <div>
    <q-list bordered padding>
      <q-item-label header>User Settings</q-item-label>
        <enableDisableOtp />
    </q-list>
  </div>
</template>

<script>
import enableDisableOtp from "./partials/enable_disable_transfer-otp";
export default {
  // name: 'ComponentName',
  data () {
    return {}
  },
components:{
  enableDisableOtp
}
}
</script>

<style>
</style>
