<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-text>
          <v-container>
            <v-form ref="form" lazy-validation>
              <v-row justify="center">
                <v-col md="12" align="center">
                  <v-alert v-if="createSuccess" dark outlined color="green">Cidade inserida com sucesso</v-alert>
                  <v-alert v-if="error" dark outlined color="red">{{error}}</v-alert>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="8">
                  <v-text-field :rules="nameRules" v-model="citie.name" label="Nome da cidade"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-autocomplete
                    :items="states"
                    color="white"
                    :rules="rulesState"
                    v-model="citie.stateId"
                    item-text="name"
                    item-value="_id"
                    label="Estados"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="close">Fechar</v-btn>
          <v-btn color="blue darken-1" text @click="createCitie">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data: () => ({
    citie: {},
    nameRules: [
      valueInput => (!!valueInput && valueInput.length > 3) || 'Insira um nome'
    ],
    rulesState: [
      valueInput => !!valueInput || 'Escolha um estado'
    ]
  }),
  props: {
    dialog: Boolean
  },
  computed: {
    ...mapGetters({
      createSuccess: 'Cities/getSuccessCreateCitie',
      error: 'Cities/getError',
      states: 'States/getStates'
    })
  },
  methods: {
    ...mapMutations({
      modifySuccess: 'Cities/CITIE_CREATED',
      clearError: 'Cities/CLEAR_ERROR'
    }),
    ...mapActions({
      newCitie: 'Cities/newCitie'
    }),
    async createCitie () {
      if (this.$refs.form.validate()) {
        await this.newCitie(this.citie)
        if (!this.error) this.$emit('refreshTable')
        this.citie = {}
      }
    },
    close () {
      this.modifySuccess(false)
      this.clearError()
      this.$emit('close')
    }
  }
}
</script>
