<template>
  <div>
    <q-btn size="sm" no-caps="" color="white" text-color="black" label="Add Supplier" @click="open = true"/>

    <q-dialog square v-model="open" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card>
        <q-bar>
          <div>Add Supplier</div>

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="q-gutter-sm">
          <q-input square dense outlined v-model="form.name" label="Supplier Full Name" />
          <q-select square dense outlined v-model="form.bank_code" :options="banks" emit-value label="Select Bank" />
          <q-input square dense outlined v-model="form.account_number" label="Account Number" />
          <q-input square dense outlined v-model="form.currency" label="Currency" />
          <q-input square outlined type="textarea" rows="2" v-model="form.description" label="Description" />
          <q-btn color="primary" no-caps="" label="Add Supplier" @click="add_recipient" />
        </q-card-section>
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
      banks: [],
      form:{
        type: 'nuban',
        name: 'Simon Moses',
        account_number: '',
        bank_code: '',
        currency: 'NGN',
        description: ''
      },
    }
  },

  mounted() {
    this.get_bank_list()
  },

  methods: {
    async add_recipient() {
      try {
        let resolve = await this.resolve_account_number()
        const res = await this.$axios.post('https://api.paystack.co/transferrecipient', this.form)
      } catch (error) {

      }
    },

    async get_bank_list() {
      try {
        const res = await this.$axios.get('https://api.paystack.co/bank')
        res.data.data.forEach(data => {
          this.banks.push({value: data.code, label: data.name})
        });
      } catch (error) {

      }
    },

    async resolve_account_number(){
      const res = await this.$axios.get(`https://api.paystack.co/bank/resolve?account_number=${this.form.account_number}&bank_code=${this.form.bank_code}`)
    }


  },
}
</script>

<style>
</style>
