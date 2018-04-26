<template>
  <q-page class="">
    <h3>Ajouter une todo</h3>
    <form @submit.prevent='addTodo'>
      <q-input v-model="todo.title" float-label="Saisir votre todo"></q-input><q-btn>Enregistrer</q-btn>
    </form>
    <h3>Liste des todos</h3>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <input type="text" v-model="todo.title"> <input type="checkbox" v-model="todo.complete"> <q-btn @click.prevent="putTodo(todo.id, index)">Modifier</q-btn> <q-btn @click.prevent="delTodo(todo.id)">Supprimer</q-btn>
      </li>
    </ul>
    <h3>Tableaux des todos</h3>
    <q-table
      title="Table Title"
      :data="todos"
      :columns="columns"
      row-key="name"
    />
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageTodos',
  data: () => ({
    columns: [
      {
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
      }
    ],
    todo: {},
    todos: []
  }),
  mounted () {
    this.$axios.get('/api/todolist')
      .then((res) => {
        this.todos = res.data
      })
  },
  methods: {
    getTodos: function () {
      this.$axios.get('/api/todolist')
        .then((res) => {
          this.todos = res.data
        })
    },
    addTodo: function () {
      this.$axios.post('/api/todolist/', {
        title: this.todo.title,
        complete: false
      })
        .then((res) => {
          this.getTodos()
          this.todo = {}
        })
    },
    putTodo: function (id, index) {
      this.$axios.put('/api/todolist/' + id, {
        title: this.todos[index].title,
        complete: this.todos[index].complete
      })
        .then((res) => {
          this.getTodos()
        })
    },
    delTodo: function (id) {
      this.$axios.delete('/api/todolist/' + id)
        .then((res) => {
          this.getTodos()
        })
    }
  }
}
</script>
