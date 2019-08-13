<template>
  <div>
    <q-btn no-caps="" color="primary" label="Add Supplier" @click="open = true"/>

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
           <ul>
            <li v-for="error in errors_list" :key="error.id" class="text-negative">{{ error }}</li>
          </ul>
          <q-input square dense outlined name="supplier" v-validate="'required'" v-model="form.name" label="Supplier Full Name" />
          <q-select square dense outlined name="bank" v-validate="'required'" v-model="form.bank_name" :options="banks" label="Select Bank" @input="selected"/>
          <q-input square dense outlined name="account-number" v-validate="'required'" v-model="form.account_number" label="Account Number" />
          <q-input square dense outlined v-model="form.metadata.company_name" label="Company Name" />
          <q-input square dense outlined v-model="form.metadata.phone" label="Company Phone" />
          <q-input square dense outlined v-model="form.metadata.address" label="Company Address" />
          <q-input square outlined type="textarea" rows="2" v-model="form.description" label="Description" />
          <q-btn color="primary" no-caps="" label="Add Supplier" @click="add_recipient" :loading="loading"/>
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
      loading: false,
      banks: [],
      form:{
        type: 'nuban',
        name: '',
        account_number: '',
        bank_code: '',
        bank_name: '',
        currency: 'NGN',
        description: '',
        metadata: {
          company_name: '', phone: '', address: ''
        }
      },
      errors_list: null
    }
  },

  mounted() {
    this.get_bank_list()
  },

  methods: {
    async add_recipient() {
      this.errors_list = null;
      let error = await this.$validator.validateAll();
      if (!error) {
        this.errors_list = this.errors.all()
        return
      }
      this.loading = true
      try {
        let resolve = await this.resolve_account_number()
        const res = await this.$axios.post('https://api.paystack.co/transferrecipient',this.form)
        this.clear_form()
        this.open = false
        this.loading = false
        this.$q.notify({message: res.data.message, position : 'bottom-left', color: 'positive'})
      } catch (error) {
        this.loading = false
        this.$q.notify({message: error.data.message, position : 'bottom-left', color: 'negative'})
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
      try {
        const res = await this.$axios.get(`https://api.paystack.co/bank/resolve?account_number=${this.form.account_number}&bank_code=${this.form.bank_code}`)
      } catch (error) {

      }
    },

    selected(selected){
      this.form.bank_code = selected.value
      this.form.bank_name = selected.label
    },

    clear_form(){
        this.form.name = ''
        this.form.account_number = ''
        this.form.bank_code = ''
        this.form.currency = 'NGN'
        this.form.description = ''
        this.form.metadata.company_name = ''
        this.form.metadata. phone = ''
        this.form.metadata.address = ''
    }


  },
}
</script>

<style>
</style>
