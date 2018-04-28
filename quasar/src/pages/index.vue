<template>
  <q-page>
    <q-input v-model="userLogin.email" type="email" placeholder="E-mail"/>
    <q-input v-model="userLogin.password" type="password" placeholder="Password"/>
    <q-btn @click="opened = true">Créer un utilisateur</q-btn>
    <q-btn @click="login">Se connecter</q-btn>
    <q-modal v-model="opened">
      <h4>Saisir votre utilisateur</h4>
      <form @submit.prevent="signup">
        <q-input v-model="userSignup.email" type="email" placeholder="E-mail"/>
        <q-input v-model="userSignup.password" type="password" placeholder="Password"/>
        <q-btn>Enregistrer</q-btn>
      </form>
      <q-btn
        color="primary"
        @click="opened = false"
        label="Close"
      />
    </q-modal>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      userLogin: {},
      userSignup: {},
      opened: false,
      messError: ""
    }
  },
  methods: {
    signup: function () {
      this.$axios.post('/api/signup/', this.userSignup)
        .then((res) => {
          console.log(res)
          this.opened = false
          this.user = {}
        })
        .catch((err) => {
          this.messError = err.response.data
        })
    },
    login: function () {
      this.$axios.post('/api/login/', this.userLogin)
        .then((res) => {
          var token = res.data.token
          this.$q.localStorage.set('token', token)
          this.$store.dispatch('global/addUser', this.userLogin)
          this.$store.dispatch('global/addToken', token)
          this.$store.dispatch('global/connected')
          this.$router.push('todos')
        })
        .catch((err) => {
          // this.messError = err.response.data
        })
    }
  },
  watch: {
    messError: function () {
      this.$q.notify({
        color: 'red',
        icon: 'warning',
        message: this.message,
        position: 'center',
        timeout: 1000
      })
    }
  }
}
</script>
