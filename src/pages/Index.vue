<template>
  <q-page class="flex flex-center">

      <q-card class="text-center">
        <q-card-section>
            <img src="~assets/quasar-logo-full.svg">
        </q-card-section>
        <q-card-section class="text-h5">
            Welcome to PSB PAyment App
        </q-card-section>
        <q-card-section>
            <q-btn flat color="primary" label="Login to continue" :to="{name: 'login'}"/>
        </q-card-section>
      </q-card>
    
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex'
}
</script>
