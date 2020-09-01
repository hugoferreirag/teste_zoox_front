<template>
  <v-container>
    <v-row justify='center'>
      <v-col md='12'>
        <v-data-table hide-default-footer :headers='headers' :items='dataItems' sort-by='calories' class='elevation-1'>
          <template v-slot:top>
            <UpdateCitie
              @close='closeUpdate'
              @refreshTable='initialize'
              :payload='dataUpdate'
              :id='idUpdate'
              :dialog='updateDialog'
            />
            <v-row justify='end'>
              <NewCitie :dialog='dialogCitie' @refreshTable='initialize' @close='cancelNewCitie' />
              <v-btn
                @click='newCitie'
                class='mr-5 mb-5'
                color='blue'
                dark
                rounded
                outlined
              >Nova Cidade</v-btn>
            </v-row>
            <v-row justify='end'>
              <v-col md='2'>
                <v-text-field :disabled='initials.length > 0' v-model='name' label='Nome da cidade'></v-text-field>
              </v-col>
              <v-col class='mt-3' md='2'>
                <v-btn dark outlined @click='filter' color='blue'>Filtrar</v-btn>
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </template>
          <template v-slot:item.createdAt='{ item }'>
            <span>{{$moment(item.createdAt).format('DD/MM/YYYY - hh:mm:ss')}}</span>
          </template>
          <template v-slot:item.updatedAt='{ item }'>
            <span>{{$moment(item.updatedAt).format('DD/MM/YYYY - hh:mm:ss')}}</span>
          </template>
          <template v-slot:item.state='{ item }'>
            <span v-if='item.stateId'>{{findState(item.stateId).initials}}</span>
          </template>
          <template v-slot:item.actions='{ item }'>
            <v-icon small class='mr-2' @click='update(item)'>mdi-pencil</v-icon>
            <v-icon small @click='deleteItem(item._id)'>mdi-delete</v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color='primary'>Reset</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row justify='center'>
      <v-col md='12' class='text-center pt-2'>
        <v-pagination v-model='page' :length='pageCount'></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import UpdateCitie from './update.vue'
import NewCitie from './Add.vue'

export default {
  components: {
    UpdateCitie,
    NewCitie
  },
  watch: {
    async page () {
      await this.pagination()
    }
  },
  data: () => ({
    page: 1,
    pageCount: 10,
    itemsPerPage: 10,
    dialog: false,
    updateDialog: false,
    dialogCitie: false,
    dataItems: [],
    stateItems: [],
    name: '',
    initials: '',
    dataUpdate: {},
    idUpdate: null,
    headers: [
      {
        text: 'Cidade',
        align: 'start',
        sortable: true,
        value: 'name'
      },
      { text: 'Estado', value: 'state' },
      { text: 'Criado', value: 'createdAt' },
      { text: 'Modificado', value: 'updatedAt' },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),
  computed: {
    ...mapGetters({
      cities: 'Cities/getCities',
      error: 'Cities/getError',
      states: 'States/getStates',
      totalPages: 'Cities/getTotalPages'

    })
  },

  methods: {
    ...mapActions({
      getAllCities: 'Cities/getAllCities',
      getFilters: 'Cities/filters',
      delete: 'Cities/deleteCitie',
      getAllStates: 'States/getAllStates'
    }),
    ...mapMutations({
      clearError: 'Cities/CLEAR_ERROR'
    }),
    newCitie () {
      this.dialogCitie = true
    },
    cancelNewCitie () {
      this.dialogCitie = false
    },
    findState (stateId) {
      return this.stateItems.find((el) => el._id === stateId)
    },
    async filter () {
      if (this.name) {
        await this.getFilters({ name: this.name })
        this.dataItems = this.cities
      } else if (this.initials) {
        await this.getFilters({ initials: this.initials })
        this.dataItems = this.cities
      } else {
        await this.getFilters({})
        this.dataItems = this.cities
      }
    },
    async deleteItem (id) {
      await this.delete(id)
      if (!this.error) await this.initialize()
      else {
        alert(this.error)
        this.clearError()
      }
    },
    closeUpdate () {
      this.updateDialog = false
    },
    update (payload) {
      this.dataUpdate = {
        name: payload.name,
        initials: payload.initials
      }
      this.idUpdate = payload._id
      this.updateDialog = true
    },
    async pagination () {
      await this.getAllCities({ page: this.page })
      this.dataItems = this.cities
    },
    async initialize () {
      await this.getAllCities({ page: this.page })
      await this.getAllStates({ page: 0, noLimit: true })
      const total = this.totalPages / 10
      this.pageCount = Math.ceil(total)
      this.dataItems = this.cities
      this.stateItems = this.states
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    }
  },
  async created () {
    await this.initialize()
  }
}
</script>
