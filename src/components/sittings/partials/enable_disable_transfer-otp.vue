<template>
  <div>
    <q-dialog square v-model="open_otp" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Enter OTP sent to your phone</div>
        </q-card-section>

        <q-card-section>
          <q-input square dense outlined v-model="otp" label="Enter OTP"/>
          <q-btn size="sm" flat dense label="Resend OTP" @click="resend_otp"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" @click="finalize_disable_otp" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      open_otp: false,
      otp: ''
    }
  },

  methods: {
    async disable_otp(){
      try {
        const res = await this.$axios.post('https://api.paystack.co/transfer/disable_otp')
        this.open_otp = true
      } catch (error) {

      }
    },
    async finalize_disable_otp(){
      try {
        const res = await this.$axios.post('https://api.paystack.co/transfer/disable_otp_finalize', this.otp)
      } catch (error) {

      }
    },
     async enable_otp(){
      try {
        const res = await this.$axios.post('https://api.paystack.co/transfer/enable_otp')
      } catch (error) {

      }
    },
  },
}
</script>

<style>
</style>
