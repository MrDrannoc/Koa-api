<template>
  <q-page class="">
    <q-modal v-model="opened">
      <q-card-title class="text-center bg-primary text-white">
        Saisir votre tache
      </q-card-title>
      <form @submit.prevent='addTodo(), opened = false'>
        <q-input v-model="todo.title" float-label="Saisir votre todo"></q-input>
        <q-btn align="center">Enregistrer</q-btn>
      </form>
    </q-modal>
    <h3 class="text-center">Liste des taches</h3>
    <q-btn @click="opened = true" color="primary" class="btnAdd">Ajouter une tache</q-btn>
    <div class="todolist">
      <ul>
        <li v-for="(todo, index) in todos" :key="index">
          <q-icon v-if="todo.complete == true" color="primary" name="check_circle" size="2em" />
          <q-icon v-if="todo.complete == false" color="primary" name="radio_button_unchecked" size="2em" /><label class="textLabel">{{todo.title}}</label>
          <div class="btnLi">
            <!-- <q-btn @click.prevent="putTodo(todo.id, index)">Modifier</q-btn> -->
            <q-btn @click="updateModal = true, indexModal = index, todoModal=todo">Modifier</q-btn>
            <q-btn @click.prevent="delTodo(todo.id)">Supprimer</q-btn>
          </div>
          <q-modal v-model="updateModal">
            <q-card-title class="text-center bg-primary text-white">
              Modifier votre tache
            </q-card-title>
            <form @submit.prevent='putTodo(todoModal), updateModal = false'>
              <q-checkbox v-model="todoModal.complete" label="Terminée" left-label/>
              <q-input v-model="todoModal.title" float-label="Modifier votre todo"></q-input>
              <q-btn align="center">Enregistrer</q-btn>
            </form>
          </q-modal>
        </li>
      </ul>
    </div>
  </q-page>
</template>

<style lang="stylus" scoped>
h3
  margin-top 10px
  margin-bottom 10px
.btnAdd
  width 180px
  position relative
  left 50vw
  margin-left -90px
.closeBtn
  position absolute
  right 0px
.todolist
  max-width 500px
  margin: auto
li
  list-style none
  height 50px
ul
  padding-left 0px
.textLabel
  padding-left 5px
.btnLi
  float right 
</style>

<script>
  export default {
    name: 'PageTodos',
    data: () => ({
      todo: {},
      todos: [],
      notifyAlertType: '',
      notifyAlertMessage: '',
      opened: false,
      updateModal: false,
      indexModal: '0',
      todoModal:{}
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
      putTodo: function(todo) {
        this.$axios.put('/api/todolist/' + todo.id, {
            title: todo.title,
            complete: todo.complete,
            userId: todo.userId
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
      notifyAlertMessage: function() {
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
