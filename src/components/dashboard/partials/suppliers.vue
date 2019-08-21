<template>
  <div>
    <q-card class="text-center">
        <q-card-section class="text-h3">
            Suppliers Stats
        </q-card-section>
        <q-card-section class="text-h5">
            total: {{total}}
        </q-card-section>
        <q-card-section class="text-h5">
            Active: {{active}}
        </q-card-section>
        <q-card-section class="text-h5">
            In-Active: {{total - active}}
        </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      total: 0,
      active: 0,
    }
  },

  mounted() {
      this.get_suppliers()
  },

  methods: {
      async get_suppliers() {
        try {
          const res = await this.$axios.get(`${process.env.BASE_URL}/transferrecipient`)
          this.total = res.data.data.length
          res.data.data.forEach(data => {
              if(data.active){
                  this.active += 1
              }
          });
        } catch (error) {

        }
    },
  },
}
</script>

<style>
</style>
