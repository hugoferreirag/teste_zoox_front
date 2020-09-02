<template>
  <v-container>
    <v-row justify='center'>
      <v-col md='12'>
        <v-data-table
          hide-default-footer
          :headers='headers'
          :items='dataItems'
          sort-by='calories'
          class='elevation-1'
        >
          <template v-slot:top>
            <UpdateState
              @close='closeUpdate'
              @refreshTable='initialize'
              :payload='dataUpdate'
              :id='idUpdate'
              :dialog='updateDialog'
            />
            <v-row justify='end'>
              <NewState :dialog='dialogStates' @refreshTable='initialize' @close='cancelNewState' />
              <v-btn
                @click='newState'
                class='mr-5 mb-5'
                color='blue'
                dark
                rounded
                outlined
              >Novo Estado</v-btn>
            </v-row>
            <v-row justify='end'>
              <v-col md='2'>
                <v-text-field :disabled='initials.length > 0' v-model='name' label='Nome do estado'></v-text-field>
              </v-col>
              <v-col md='2'>
                <v-text-field :disabled='name.length > 0' v-model='initials' label='Abreviação'></v-text-field>
              </v-col>
              <v-col class='mt-3' md='2'>
                <v-btn dark outlined @click='filter' color='blue'>Filtrar</v-btn>
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </template>
          <template v-slot:footer></template>
          <template v-slot:item.createdAt='{ item }'>
            <span>{{$moment(item.createdAt).format('DD/MM/YYYY - hh:mm:ss')}}</span>
          </template>
          <template v-slot:item.updatedAt='{ item }'>
            <span>{{$moment(item.updatedAt).format('DD/MM/YYYY - hh:mm:ss')}}</span>
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
import UpdateState from './update.vue'
import NewState from './Add.vue'

export default {
  components: {
    UpdateState,
    NewState
  },
  watch: {
    async page () {
      await this.pagination()
    }
  },
  data: () => ({
    page: 1,
    pageCount: 1,
    dialog: false,
    updateDialog: false,
    dialogStates: false,
    dataItems: [],
    name: '',
    initials: '',
    dataUpdate: {},
    idUpdate: null,
    headers: [
      {
        text: 'Estado',
        align: 'start',
        sortable: true,
        value: 'name'
      },
      { text: 'Abreviação', value: 'initials' },
      { text: 'Criado', value: 'createdAt' },
      { text: 'Modificado', value: 'updatedAt' },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),
  computed: {
    ...mapGetters({
      states: 'States/getStates',
      error: 'States/getError',
      totalPages: 'States/getTotalPages'
    })
  },

  methods: {
    ...mapActions({
      getAllStates: 'States/getAllStates',
      getFilters: 'States/filters',
      delete: 'States/deleteState'
    }),
    ...mapMutations({
      clearError: 'States/CLEAR_ERROR'
    }),
    newState () {
      this.dialogStates = true
    },
    cancelNewState () {
      this.dialogStates = false
    },
    async filter () {
      if (this.name) {
        await this.getFilters({ name: this.name })
        this.dataItems = this.states
      } else if (this.initials) {
        await this.getFilters({ initials: this.initials })
        this.dataItems = this.states
      } else {
        await this.getFilters({})
        this.dataItems = this.states
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
      await this.getAllStates({ page: this.page })
      this.dataItems = this.states
    },
    async initialize () {
      await this.getAllStates({ page: this.page })
      const total = this.totalPages / 10
      this.pageCount = Math.ceil(total)
      this.dataItems = this.states
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
