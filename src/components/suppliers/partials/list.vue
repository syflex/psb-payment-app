<template>
  <div class="q-pa-md">
    <q-table square="" title="Transfer List" :data="suppliers" :columns="columns" :filter="filter" row-key="name">
      <template v-slot:top >
        <span>Suppliers List</span>
        <q-space />
        <q-input outlined="" dense debounce="300"  v-model="filter" color="primary">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-space />
        <addSupplier />
        <q-btn no-caps="" flat dense color="primary" label="Refresh" @click="get_recipient" class="q-px-lg"/>
      </template>

       <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="phone" :props="props">{{ props.row.metadata.phone }}</q-td>
          <q-td key="email" :props="props">{{ props.row.email }}</q-td>
          <q-td key="bank" :props="props">{{ props.row.details.bank_name }}</q-td>
          <q-td key="account_number" :props="props">{{ props.row.details.account_number }}</q-td>
           <q-td key="company_name" :props="props">{{ props.row.metadata.company_name }}</q-td>
           <q-td key="address" :props="props">{{ props.row.metadata.address }}</q-td>
          <q-td key="createdAt" :props="props">{{ date_func(props.row.createdAt) }}</q-td>
          <q-td key="action" :props="props" class="q-gutter-sm">
            <updateSupplier :id="props.row.id" :name="props.name" :email="props.email"/>
            <deleteSupplier :id="props.row.id"/>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import addSupplier from './add'
import updateSupplier from './update'
import deleteSupplier from './delete'
import { date } from "quasar";
export default {
  // name: 'ComponentName',
  data () {
    return {
      filter: '',
      suppliers: [],
      columns: [
        { name: 'name', required: true, label: 'Supplier Name', align: 'left', field: row => row.name, sortable: true},
        { name: 'phone', required: true, label: 'Phone', align: 'left', field: row => row.metadata.phone, sortable: true},
        { name: 'email', required: true, label: 'Email', align: 'left', field: row => row.email, sortable: true},
        { name: 'bank', align: 'center', label: 'Bank', field: row => row.details.bank_name, sortable: true },
        { name: 'account_number', align: 'center', label: 'Account Number', field: row => row.details.account_number, sortable: true },
        { name: 'company_name', required: true, label: 'Company', align: 'left', field: row => row.metadata.company_name, sortable: true},
        { name: 'address', required: true, label: 'Address', align: 'left', field: row => row.metadata.address, sortable: true},
        { name: 'createdAt', label: 'Date', field: 'createdAt', sortable: true},
        { name: 'action', label: 'Action', field: 'id'},
      ],
    }
  },
  components:{
    addSupplier,deleteSupplier,updateSupplier
  },

  mounted() {
    this.get_recipient();
  },

  methods: {
    async get_recipient() {
      try {
        const res = await this.$axios.get(`${process.env.BASE_URL}/transferrecipient`)
        this.suppliers = res.data.data
      } catch (error) {

      }
    },
    date_func(date_value){
        return date.formatDate(date_value, 'Do MMM YYYY : h:mm')
      }
  }
}
</script>

<style>
</style>
