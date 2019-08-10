<template>
  <div>
  <q-card class="my-card">
  <q-card-section class="q-gutter-sm">
    <q-input square dense="" outlined v-model="form.email" label="Email" />
    <q-input square dense="" outlined v-model="form.password" label="Password" />
    <q-btn color="white" text-color="black" label="Login" @click="login"/>    
  </q-card-section>
  </q-card>
  
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      form:{
        email: '',
        password: '',
      }
    }
  },

  created() {
    
  },

  methods: {
    async login() {
      console.log(process.env.SECRET);
      
      try {
        const res = await this.$axios.post(process.env.API + '/api/login', this.form)
      } catch (error) {
        
      }
    }
  },
}
</script>

<style>
</style>
