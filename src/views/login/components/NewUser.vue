<template>
  <v-container>
    <v-row justify="center" class="mt-12">
      <v-dialog v-model="dialog" persistent max-width="400">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" text dark v-bind="attrs" class="mt-5" v-on="on"> Não tem acesso? Crie um usuário</v-btn>
        </template>
        <v-card>
          <v-card-title class="headline" align="center">Novo usuário</v-card-title>
          <v-col md="12" align="center">
            <v-card class="mx-auto mt-12" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                    <v-form ref="form" v-if="!created">
                        <v-row v-if="error" justify="center">
                            <v-col align="center">
                                <v-alert outlined color="red">
                                    {{error}}
                                </v-alert>
                            </v-col>
                        </v-row>
                        <v-text-field :rules="nickRules" v-model="user.nickName" label="Usuário"></v-text-field>
                        <v-text-field type="password" :rules="passwordRules" v-model="user.password" label="Senha"></v-text-field>
                    </v-form>
                     <v-row v-else justify="center">
                            <v-col align="center">
                                <v-alert outlined color="blue">
                                    Usuário criado com sucesso, já pode fazer login
                                </v-alert>
                            </v-col>
                        </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="pink lighteen-1" text @click="close">Fechar</v-btn>
            <v-btn color="green darken-1" v-if="!created" text @click="newUser">Prosseguir</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data: () => ({
    dialog: false,
    user: {},
    nickRules: [
      valueInput => (!!valueInput && valueInput.length > 4) || 'Informe um usuário válido'
    ],
    passwordRules: [
      valueInput => (!!valueInput && valueInput.length > 4) || 'Informe uma senha válida'
    ]
  }),
  computed: {
    ...mapGetters({
      error: 'Auth/getError',
      created: 'Auth/getCreatedUser'
    })
  },
  methods: {
    ...mapMutations({
      clearError: 'Auth/CLEAR_ERROR',
      clearCreated: 'Auth/USER_CREATED'
    }),
    ...mapActions({
      createUser: 'Auth/newUser'
    }),
    async newUser () {
      if (!this.$refs.form.validate()) return
      await this.createUser(this.user)
      this.user = {}
    },
    close () {
      this.clearError()
      this.clearCreated()
      this.user = {}
      this.dialog = false
    }
  }
}
</script>
<style lang="scss">
</style>
