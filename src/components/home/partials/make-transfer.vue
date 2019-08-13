<template>
  <div>

    <q-btn color="primary" no-caps label="Make Transfer" @click="open = true" />

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
          <div class="text-h6 text-center text-weight-bold">{{currency_func(balance ? balance : '000')+'.00'}}</div>
        </q-card-section>

        <q-card-section class="q-gutter-sm">
          <ul>
            <li v-for="error in errors_list" :key="error.id" class="text-negative">{{ error }}</li>
          </ul>
          <q-select square dense outlined name="supplier" v-validate="'required'" v-model="form.recipient_name" :options="suppliers" label="Select Supplier" @input="selected"/>
          <q-input square dense outlined name="amount" v-validate="'required'" v-model.number="amount" prefix="₦" suffix=".00" label="Amount" />
          <q-input square outlined type="textarea" rows="2" v-model="form.reason" label="Reason for the transfer" />
          <q-btn color="primary" no-caps="" label="Transfer" @click="transfer" :loading="loading"/>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog square v-model="open_otp" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Enter OTP sent to your phone</div>
        </q-card-section>

        <q-card-section>
          <q-input square dense name="otp" outlined v-model="finalize.otp" label="Enter OTP"/>
          <q-btn size="sm" flat dense label="Resend OTP" @click="resend_otp" :loading="loading2"/>
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
      loading: false,
      loading2: false,
      suppliers: [],
      amount: null,
      form:{
        source: 'balance',
        amount: null,
        reason: '',
        recipient: '',
        recipient_name: '',
      },
      finalize:{
        otp: '',
        transfer_code: ''
      },
      errors_list: null,
    }
  },

  computed: {
    balance: function() {return this.$store.getters['balance/balance']}
  },

  mounted() {
    this.get_recipient();
  },

  methods: {

    async transfer(){
      this.errors_list = null;
      let error = await this.$validator.validateAll();
      if (!error) {
        this.errors_list = this.errors.all()
        return
      }
      this.loading = true
      this.showDialog()
    },

    showDialog () {
      this.$q.dialog({
        title: 'Confirm Transfer',
        message: `You are about to transfer <strong class="text-red">${this.amount}</strong> to  <strong>${this.form.recipient_name}</strong> click ok to confirm`,
        html: true,
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.make_transfer()
      }).onCancel(() => {
        this.loading = false
      })
    },

    async make_transfer(){
      try {
        this.form.amount = await Number(this.amount + '' + '00')
        const res = await this.$axios.post('https://api.paystack.co/transfer',this.form)
        this.finalize.transfer_code = res.data.data.transfer_code
        this.open_otp = true
        this.$q.notify({message: res.data.message, position : 'bottom-left', color: 'positive'})
      } catch (error) {
        this.loading = false
        this.$q.notify({message: error.data.message, position : 'bottom-left', color: 'negative'})
      }
    },

    async finalize_transfer(){
      try {
        const finalize_res = await this.$axios.post('https://api.paystack.co/transfer/finalize_transfer', this.finalize)
        this.$q.notify({message: finalize_res.data.message, position : 'bottom-left', color: 'positive'})
        this.clear_form()
        this.open_otp = false
        this.open = false
        this.loading = false
      } catch (error) {
        this.open_otp = false
        this.loading = false
        this.$q.notify({message: error.data.message, position : 'bottom-left', color: 'negative'})
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

    async resend_otp(){
      this.loading2 = true
      try {
        const finalize_res = await this.$axios.post('https://api.paystack.co/transfer/resend_otp',{
          reason: this.form.reason,
          transfer_code: this.finalize.transfer_code
        },true)
        this.loading2 = false
        this.$q.notify({message: res.data.message, position : 'bottom-left', color: 'positive'})
      } catch (error) {
        this.loading2 = false
        this.$q.notify({message: error.data.message, position : 'bottom-left', color: 'negative'})
      }
    },

    selected(selected){
      this.form.recipient = selected.value
      this.form.recipient_name = selected.label
    },

    clear_form(){
      this.amount = null
      this.form.amount = null
      this.form.reason = ''
      this.form.recipient = ''
      this.form.recipient_name = ''
      this.finalize.otp = ''
      this.finalize.transfer_code = ''
      this.errors_list = null
    },

    currency_func(data){
      let amount =  data.toString()
      return Number(amount.substring(0, amount.length-2)).toLocaleString()
    }
  },
}
</script>

<style>
</style>
