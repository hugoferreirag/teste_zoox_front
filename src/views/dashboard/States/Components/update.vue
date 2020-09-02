<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-text>
          <v-container>
            <v-form ref="form" lazy-validation>
              <v-row justify="center">
                <v-col md="12" align="center">
                  <v-alert v-if="createSuccess" dark outlined color="green">Estado atualizado com sucesso</v-alert>
                  <v-alert v-if="error" dark outlined color="red">{{error}}</v-alert>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="8">
                  <v-text-field :rules="nameRules" v-model="payload.name" label="Nome do Estado" hint="example of helper text only on focus"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field :rules="initialsRules" v-model="payload.initials" label="Abreviação" required></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="close">Fechar</v-btn>
          <v-btn color="blue darken-1" text @click="updateState">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data: () => ({
    state: {},
    nameRules: [
      valueInput => (!!valueInput && valueInput.length > 3) || 'Insira um nome'
    ],
    initialsRules: [
      valueInput => (!!valueInput && valueInput.length === 2) || 'Insira uma Sigla'
    ]
  }),
  props: {
    dialog: Boolean,
    payload: Object,
    id: String
  },
  computed: {
    ...mapGetters({
      createSuccess: 'States/getSuccessCreateState',
      error: 'States/getError'
    })
  },
  methods: {
    ...mapMutations({
      modifySuccess: 'States/STATE_CREATED',
      clearError: 'States/CLEAR_ERROR'
    }),
    ...mapActions({
      update: 'States/updateState'
    }),
    async updateState () {
      const id = this.id
      if (this.$refs.form.validate()) {
        const body = {
          ...this.payload,
          id
        }
        await this.update(body)
        if (!this.error) this.$emit('refreshTable')
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
