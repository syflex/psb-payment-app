<template>
  <div>
    <q-btn color="primary" label="load balance" @click="open = true"/>

    
    <q-dialog square v-model="open" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card>
        <q-bar>
          <div>Load Wallet</div>

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="q-gutter-sm">
          <q-input square dense outlined v-model="form.amount" label="Amount" />
          <q-input square dense outlined v-model="form.email" label="Email" />
          <q-btn color="primary" no-caps="" label="Make Payment" @click="make_pay" :loading="loading"/>
        </q-card-section>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import { openURL } from 'quasar'
export default {
  // name: 'ComponentName',
  data () {
    return {
      open: false,
      loading: false,
      form:{
        amount: '',
        email: 'admin@psb.com',
        transaction_charge: '75',
        callback_url: process.env.APP_URL+'verify-payment',
      },
    }
  },
  methods: {
    async make_pay() {
      this.loading = true
      try {
        const res = await this.$axios.post(`${process.env.BASE_URL}/transaction/initialize`, this.form)
        openURL(res.data.data.authorization_url)
        this.loading = false
        this.$q.notify({message: res.data.message, position : 'bottom-left', color: 'positive'})
      } catch (error) {
        this.loading = false
        this.$q.notify({message: error.data.message, position : 'bottom-left', color: 'negative'})
      }
    },
  },
}
</script>

<style>
</style>
