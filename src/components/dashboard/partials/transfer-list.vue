<template>
  <div class="q-pa-md">
    <q-table square="" title="Transfer List" :data="transfers" :columns="columns" row-key="name" >
      <template v-slot:top>
        <span>Transfer List</span>        
        <q-space />
        <q-input outlined="" dense debounce="300" color="primary">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-space />
        <makeTransfer />
        <q-btn class="on-right" flat dense color="primary" label="Refresh" @click="get_transfers"/>        
      </template>
    </q-table>
  </div>
</template>

<script>
import makeTransfer from './make-transfer'
export default {
  // name: 'ComponentName',
  data () {
    return {
      transfers: [],
      columns: [
        {
          name: 'name', required: true, label: 'Racipient Name', align: 'left', field: row => row.recipient.name,sortable: true         
          // format: val => `${val}`, 
        },
        { name: 'bank', align: 'center', label: 'Bank', field: row => row.recipient.details.bank_name, sortable: true },
        { name: 'account_number', align: 'center', label: 'Account Number', field: row => row.recipient.details.account_number, sortable: true },
        { name: 'amount', label: 'Amount', field: 'amount' },
        { name: 'currency', label: 'Currency', field: 'currency' },
        { name: 'reason', label: 'Reason', field: 'reason' },
        { name: 'status', label: 'Status', field: 'status' },
        { name: 'createdAt', label: 'Date', field: 'createdAt', sortable: true},
        // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ],
    }
  },

   mounted() {
    this.get_transfers()
  },

  components:{
    makeTransfer
  },

  methods: {
    async get_transfers() {
        try {
          const res = await this.$axios.get('https://api.paystack.co/transfer')
          this.transfers = res.data.data
        } catch (error) {
          
        }
    }
  },

}
</script>

<style>
</style>
