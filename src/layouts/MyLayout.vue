<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" class="lt-sm">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          PSB Payment
        </q-toolbar-title>

          <div class="gt-xs">
            <q-btn flat no-caps label="Home" :to="{name: 'home'}"/>
            <q-btn flat no-caps label="Dashboard" :to="{name: 'dashboard'}"/>
            <q-btn flat no-caps label="Suppliers" :to="{name: 'suppliers'}"/>
            <q-btn flat no-caps label="Wallet" :to="{name: 'wallet'}"/>
            <q-btn flat no-caps label="Settings" :to="{name: 'settings'}"/>
            <q-btn flat no-caps label="Login" :to="{name: 'login'}"/>
          </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Menu</q-item-label>
        <q-item clickable tag="a">
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" >
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a">
          <q-item-section>
            <q-item-label>Suppliers</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" >
          <q-item-section>
            <q-item-label>Wallet</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" >
          <q-item-section>
            <q-item-label>Settings</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" >
          <q-item-section>
            <q-item-label>Login</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  },

  methods: {
    openURL
  }
}
</script>

<style>
</style>
