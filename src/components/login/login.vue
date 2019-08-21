<template>
  <div class="flex flex-center">

      <q-card style="max-width: 500px">
        <q-card-section>
          <p>Note:</p>
          <p>
            Please login with email: admin@psb.com and password: secret
          </p>
          <p>
            All entry goes to and fro paystack API except AUTH
          </p>
           <p>
            Anytime you reload the page you will be required to loin again <br> 
            but its a SPA app so you should be  fine navigating without reloading
          </p>
          <p>
            have fun making transfers to your suppliers with ease :)
          </p>
        </q-card-section>
      <q-card-section class="q-gutter-sm">
        <q-input square dense="" outlined v-model="form.email" label="Email" />
        <q-input square dense="" type="password" outlined v-model="form.password" label="Password" />
        <q-btn color="primary" label="Login" @click="login" :loading="loading"/>
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
        email: 'admin@psb.com',
        password: 'secret',
      }
    }
  },

  methods: {
    async login() {
      this.loading = true
      try {
        const res = await this.$axios.post(`${process.env.AUTH_API}/api/login`, this.form)
        this.$store.commit('auth/user', res.data.user);
        this.loading = false
        this.$q.notify({message: 'login successful', position : 'bottom-left', color: 'positive'})
        this.$store.dispatch('balance/get_balance');
        this.$router.push({name: 'home'})
      } catch (error) {
        this.loading = false
        this.$q.notify({message: 'login failed', position : 'bottom-left', color: 'negative'})
      }
    }
  },
}
</script>

<style>
</style>
