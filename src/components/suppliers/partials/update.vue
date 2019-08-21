<template>
  <div>
    <q-btn size="sm" no-caps="" color="info" label="Update" @click="open = true"/>

    <q-dialog square v-model="open" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card>
        <q-bar>
          <div>Update Supplier</div>

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="q-gutter-sm">
          <q-input square dense outlined v-model="form.name" label="Supplier Full Name" />
          <q-input square dense outlined v-model="form.email" label="Email" />
          <q-btn color="primary" no-caps="" label="Update Supplier" @click="update_recipient" :loading="loading"/>
        </q-card-section>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
export default {
  props:['id','name','email'],
  // name: 'ComponentName',
  data () {
    return {
      open: false,
      loading: false,
      form:{
        name: this.name || '',
        email: this.email || '',
      },
    }
  },

  methods: {
    async update_recipient() {
      this.loading = true
      try {
        const res = await this.$axios.put(`${process.env.BASE_URL}/transferrecipient/${this.id}`, this.form)
        this.form.name = ''
        this.form.email = ''
        this.open = false
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
