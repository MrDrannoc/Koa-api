<template>
  <q-page class="">
    <h1>Ajouter une compagnie:</h1>
    <form @submit.prevent='addCompany'>
      <q-input v-model="company.name" float-label="Nom"></q-input>
      <q-input v-model="company.city" float-label="Ville"></q-input>
      <q-input v-model="company.adresse" float-label="Adresse"></q-input>
      <q-btn>Enregistrer</q-btn>
    </form>
    <h1>Liste des compagnies</h1>
    <ul>
      <li v-for="(company, index) in companies" :key="index">
        <input type="text" v-model="company.id"> <input type="text" v-model="company.name"> <input type="text" v-model="company.adresse"> <input type="text" v-model="company.city"> <q-btn @click.prevent="putCompany(company.id, index)">Modifier</q-btn> <q-btn @click.prevent="delCompany(company.id)">Supprimer</q-btn>
      </li>
    </ul>
    <q-table
      title="Table Title"
      :data="companies"
      :columns="columns"
      row-key="name"
    />
  </q-page>
</template>

<style>
</style>

<script>
import axios from 'axios'

export default {
  name: 'PageCompanies',
  data: () => ({
    columns: [
      {
        name: 'desc1',
        required: true,
        label: 'Nom',
        align: 'left',
        field: 'name',
        sortable: true
      }, {
        name: 'desc2',
        required: true,
        label: 'Adresse',
        align: 'left',
        field: 'adresse',
        sortable: true
      }, {
        name: 'desc3',
        required: true,
        label: 'Ville',
        align: 'left',
        field: 'city',
        sortable: true
      }
    ],
    company: {},
    companies: []
  }),
  mounted () {
    axios.get('http://localhost:4000/api/companies')
      .then((res) => {
        this.companies = res.data
      })
  },
  methods: {
    getCompany: function () {
      axios.get('http://localhost:4000/api/companies')
        .then((res) => {
          this.companies = res.data
        })
    },
    addCompany: function () {
      console.log(this.company)
      axios.post('http://localhost:4000/api/companies/', {
        name: this.company.name,
        city: this.company.city,
        adresse: this.company.adresse
      })
        .then((res) => {
          console.log(res)
          this.getCompany()
          this.company = {}
        })
    },
    putCompany: function (id, index) {
      axios.put('http://localhost:4000/api/companies/' + id, {
        name: this.companies[index].name,
        city: this.companies[index].city,
        adresse: this.companies[index].adresse
      })
        .then((res) => {
          console.log(res)
          this.getCompany()
        })
    },
    delCompany: function (id) {
      axios.delete('http://localhost:4000/api/companies/' + id)
        .then((res) => {
          console.log(res)
          this.getCompany()
        })
    }
  }
}
</script>
