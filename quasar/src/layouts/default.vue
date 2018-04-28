<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-toolbar-title>
          Todolist application
          <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
        </q-toolbar-title>
        <router-link v-if="connected" to="/todos">Todos</router-link>
        <q-btn v-if="connected" @click="logout">Logout</q-btn>
      </q-toolbar>
    </q-layout-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'LayoutDefault',
  data () {
    return {
    }
  },
  computed: {
  // récuperer du state du store
    connected () {
      return this.$store.state.global.connected
    }
  },
  methods: {
    logout: function () {
      this.$q.localStorage.remove('token')
      this.$store.dispatch('global/disconnected')
      this.$router.push('/')
    }
  }
}
</script>

<style>
</style>
