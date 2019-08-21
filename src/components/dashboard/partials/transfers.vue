<template>
  <div>
    <q-card class="text-center">
        <q-card-section class="text-h3">
            Transfers Stats
        </q-card-section>
        <q-card-section class="text-h5">
            total: {{total}}
        </q-card-section>
        <q-card-section class="text-h5">
            success: {{success}}
        </q-card-section>
        <q-card-section class="text-h5">
            failure: {{total - success}}
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
      success: 0,
    }
  },

  mounted() {
      this.get_transfers()
  },

  methods: {
      async get_transfers() {
        try {
          const res = await this.$axios.get(`${process.env.BASE_URL}/transfer`)
          this.total = res.data.data.length
          res.data.data.forEach(data => {
              if(data.status == 'success'){
                  this.success += 1
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
