<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          PSB Payment
        </q-toolbar-title>

        <div>
          <q-btn color="white" text-color="black" label="home" :to="{name: 'home'}"/>
          <q-btn color="white" text-color="black" label="suppliers" :to="{name: 'suppliers'}"/>
          <q-btn color="white" text-color="black" label="wallet" :to="{name: 'wallet'}"/>
          <q-btn color="white" text-color="black" label="dashboard" :to="{name: 'dashboard'}"/>
          <q-btn color="white" text-color="black" label="Login" :to="{name: 'login'}"/>  
          <q-btn color="white" text-color="black" label="settings"/>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        
        <q-item clickable tag="a" target="_blank" href="https://forum.quasar.dev">
          <q-item-section avatar>
            <q-icon name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>forum.quasar.dev</q-item-label>
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
