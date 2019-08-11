<template>
  <div>

    <q-btn color="white" text-color="black" label="Make Transfer" @click="open = true" />

    <q-dialog v-model="open" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-icon name="network_wifi" />
          <q-icon name="network_cell" />
          <q-icon name="battery_full" />
          <div>9:34</div>

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
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
      form:{
        source: 'balance',
        amount: 500000,
        currency: 'NGN',
        reason: 'resons',
        recipient: 'RCP_kql02vcrv9wu3tp',
        reference: ''
      },
    }
  },
  methods: {
    async transfer(){
      try {
        const res = await this.$axios.post('https://api.paystack.co/transfer', this.form)
      } catch (error) {
        
      }
    },
  },
}
</script>

<style>
</style>
