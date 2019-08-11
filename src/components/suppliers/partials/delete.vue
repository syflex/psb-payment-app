<template>
  <q-btn size="sm" no-caps="" color="negative" label="Delete" @click="delete_recipient"/>
</template>

<script>
export default {
  props:['id'],
  // name: 'ComponentName',
  data () {
    return {}
  },
  methods: {
    async delete_recipient(){
      const res = this.$axios.delete('https://api.paystack.co/transferrecipient/'+ this.id)
    }
  },
}
</script>

<style>
</style>
