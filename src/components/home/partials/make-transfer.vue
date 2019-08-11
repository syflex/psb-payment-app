<template>
  <div>

    <q-btn color="primary" no-caps="" label="Make Transfer" @click="open = true" />

    <q-dialog square v-model="open" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card>
        <q-bar>
          <div>Transfer</div>

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6 text-center">Current Balance</div>
          <div class="text-h6 text-center text-weight-bold">{{balance}}</div>
        </q-card-section>
        
        <q-card-section class="q-gutter-sm">
          <q-select square dense outlined v-model="form.recipient" :options="suppliers" emit-value label="Select Supplier" />
          <q-input square dense outlined v-model="form.amount" label="Amount" />
          <q-input square dense outlined v-model="form.currency" label="Currency" />
          <q-input square outlined type="textarea" rows="2" v-model="form.reason" label="Reason for the transfer" />
          <q-btn color="primary" label="Transfer" @click="transfer" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog square v-model="open_otp" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Enter OTP sent to your phone</div>
        </q-card-section>

        <q-card-section>
          <q-input square dense outlined v-model="finalize.otp" label="Enter OTP"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" @click="finalize_transfer" v-close-popup />
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
      open: false,
      open_otp: false,
      suppliers: [],
      form:{
        source: 'balance',
        amount: 500000,
        currency: 'NGN',
        reason: '',
        recipient: '',
      },
      finalize:{
        otp: '',
        transfer_code: ''
      }
    }
  },
  computed: {
    balance: function() {return this.$store.getters['balance/balance']},
    currency: function() {return this.$store.getters['balance/currency']}
  },

  mounted() {
    this.get_recipient();
  },

  methods: {
    async transfer(){
      try {
        const res = await this.$axios.post('https://api.paystack.co/transfer', this.form)
        this.finalize.transfer_code = res.data.data.transfer_code
        this.open_otp = true
      } catch (error) {

      }
    },

    async finalize_transfer(){
      try {
        const finalize_res = await this.$axios.post('https://api.paystack.co/transfer/finalize_transfer', this.finalize)
      } catch (error) {

      }
    },

     async get_recipient() {
      try {
        const res = await this.$axios.get('https://api.paystack.co/transferrecipient')
        res.data.data.forEach(data => {
          this.suppliers.push({value: data.recipient_code, label: data.name})
        });
      } catch (error) {

      }
    },

  },
}
</script>

<style>
</style>
