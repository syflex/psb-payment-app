<template>
  <div>
  <q-card class="my-card">
  <q-card-section class="q-gutter-sm">
    <q-input square dense="" outlined v-model="form.email" label="Email" />
    <q-input square dense="" outlined v-model="form.password" label="Password" />
    <q-btn color="white" text-color="black" label="Login" @click="login" :loading="loading"/>    
  </q-card-section>
  </q-card>
  
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      loading: false,
      form:{
        email: '',
        password: '',
      }
    }
  },

  methods: {
    async login() {
      this.loading = true
      try {
        const res = await this.$axios.post(process.env.API + '/api/login', this.form)
        this.loading = false
        this.$q.notify({message: res.data.message, position : 'bottom-left', color: 'positive'})
        this.router.push({name: 'home'})
      } catch (error) {
        this.loading = false
        this.$q.notify({message: error.data.message, position : 'bottom-left', color: 'negative'})
      }
    }
  },
}
</script>

<style>
</style>
