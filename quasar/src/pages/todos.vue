<template>
  <q-page class="">
    <h3>Ajouter une todo</h3>
    <form @submit.prevent='addTodo'>
      <q-input v-model="todo.title" float-label="Saisir votre todo"></q-input>
      <q-btn>Enregistrer</q-btn>
    </form>
    <h3>Liste des todos</h3>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <input type="text" v-model="todo.title"> <input type="checkbox" v-model="todo.complete">
        <q-btn @click.prevent="putTodo(todo.id, index)">Modifier</q-btn>
        <q-btn @click.prevent="delTodo(todo.id)">Supprimer</q-btn>
      </li>
    </ul>
    <h3>Tableaux des todos</h3>
    <q-table title="Table Title" :data="todos" :columns="columns" row-key="name" />
  </q-page>
</template>

<style>

</style>

<script>
  export default {
    name: 'PageTodos',
    data: () => ({
      columns: [{
        name: 'desc1',
        required: true,
        label: 'Titre',
        align: 'left',
        field: 'title',
        sortable: true
      }, {
        name: 'desc2',
        required: true,
        label: 'Fait',
        align: 'left',
        field: 'complete',
        sortable: true
      }],
      todo: {},
      todos: [],
      notifyAlertType: '',
      notifyAlertMessage: ''
    }),
    computed: {
      // récuperer du state du store
      token() {
        return this.$store.state.global.token
      },
      connected() {
        return this.$store.state.global.connected
      },
      apiHeader() {
        return this.$store.state.global.apiHeader
      },
      userSession() {
        return this.$store.state.global.userSession
      },
    },
    mounted() {
      this.$axios.get('/api/todolistbyuser/' + this.userSession.id, this.apiHeader)
        .then((res) => {
          this.todos = res.data
        })
    },
    methods: {
      getTodos: function() {
        this.$axios.get('/api/todolistbyuser/' + this.userSession.id, this.apiHeader)
          .then((res) => {
            this.todos = res.data
          })
      },
      addTodo: function() {
        this.$axios.post('/api/todolist/', {
          title: this.todo.title,
            complete: false,
            userId: this.userSession.id
          }, this.apiHeader)
          .then((res) => {
            this.getTodos()
            this.todo = {}
            this.notifyAlertType = 'positive'
            this.notifyAlertMessage = "Votre tache a été enregistrée!"
          })
      },
      putTodo: function(id, index) {
        this.$axios.put('/api/todolist/' + id, {
            title: this.todos[index].title,
            complete: this.todos[index].complete,
            userId: this.todos[index].userId
          }, this.apiHeader)
          .then((res) => {
            this.getTodos()
            this.notifyAlertType = 'positive'
            this.notifyAlertMessage = "Votre tache a été mise à jour!"
          })
      },
      delTodo: function(id) {
        this.$axios.delete('/api/todolist/' + id, this.apiHeader)
          .then((res) => {
            this.getTodos()
            this.notifyAlertType = 'positive'
            this.notifyAlertMessage = "Votre tache a été supprimée!"
          })
      }
    },
    watch: {
    notifyAlertMessage: function () {
      this.$q.notify({
        type: this.notifyAlertType,
        message: this.notifyAlertMessage,
        position: 'center',
        timeout: 100
      })
    }
  }
  }
</script>
