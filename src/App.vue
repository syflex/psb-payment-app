<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  preFetch ({ store }) {
    store.dispatch('balance/get_balance');
  },
}
</script>

<style>
</style>
