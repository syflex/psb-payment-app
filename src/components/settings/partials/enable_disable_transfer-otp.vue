<template>
  <div>

    <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Enable/Disable Transfer OTP</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-toggle color="blue" v-model="toggle" val="battery" @input="toggle_otp"/>
        </q-item-section>
    </q-item>

    <q-dialog square v-model="open_otp" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Enter OTP sent to your phone</div>
        </q-card-section>

        <q-card-section>
          <q-input square dense outlined v-model="otp" label="Enter OTP"/>
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
      toggle: false,
      open_otp: false,
      otp: ''
    }
  },

  methods: {
    toggle_otp (){
      if(this.toggle == true){
        this.enable_otp()
      }else{
        this.disable_otp()
      }
    },

    async disable_otp(){
      try {
        const res = await this.$axios.post('https://api.paystack.co/transfer/disable_otp')
        this.open_otp = true
        this.$q.notify({message: res.data.message, position : 'bottom-left', color: 'positive'})
      } catch (error) {

      }
    },
    async finalize_disable_otp(){
      try {
        const res = await this.$axios.post('https://api.paystack.co/transfer/disable_otp_finalize', this.otp)
        this.$q.notify({message: res.data.message, position : 'bottom-left', color: 'positive'})
      } catch (error) {
        this.$q.notify({message: error.data.message, position : 'bottom-left', color: 'negative'})
      }
    },
     async enable_otp(){
      try {
        const res = await this.$axios.post('https://api.paystack.co/transfer/enable_otp')
        this.$q.notify({message: res.data.message, position : 'bottom-left', color: 'positive'})
      } catch (error) {
        this.$q.notify({message: error.data.message, position : 'bottom-left', color: 'negative'})
      }
    },
  },
}
</script>

<style>
</style>
