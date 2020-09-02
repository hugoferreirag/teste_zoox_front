<template>
  <div>
    <v-app-bar
      color="blue darken-3"
      dense
      dark
    >
      <v-toolbar-title>
          <img src="@/assets/logozoo.png" width="200" alt="">
      </v-toolbar-title>

      <v-spacer></v-spacer>
        <div v-if="this.$router.history.current.path !== '/'" class="d-flex justify-center align-center">
          <v-menu
            rounded="b-xl"
            offset-y
          >
            <template v-slot:activator="{ attrs, on }">
              <v-btn
                color="white"
                outlined
                large
                class="white--text ma-8"
                v-bind="attrs"
                v-on="on"
              >
                CONFIGURAÇÕES DE ACESSO
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                link
              >
                <v-list-item-title @click="resetPassword">Nova Senha</v-list-item-title>
              </v-list-item>
              <v-list-item
                link
              >
                <v-list-item-title @click="logout">Sair</v-list-item-title>
              </v-list-item>
              <v-list-item
                link
              >
                <v-list-item-title @click="dialogDelete = true" style="color:red">Deletar acesso</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <v-dialog v-model="dialog" persistent max-width="400">
          <v-card>
            <v-row v-if="!updatePassSuccess && !error" justify="center">
              <v-col md="8" align="center">
                <h3 >Deseja alterar sua senha ?</h3>
                <v-form ref="form" lazy-validation class="mt-12">
                    <v-text-field type="password" v-model="password" :rules="passwordRules" label="Nova senha"></v-text-field>
                </v-form>
              </v-col>
            </v-row>
            <v-row v-if="updatePassSuccess" justify="center">
              <v-col align="center" md="8">
                <v-alert color="green" outlined> Senha alterada com sucesso</v-alert>
              </v-col>
            </v-row>
            <v-row v-if="error" justify="center">
              <v-col align="center" md="8">
                <v-alert color="green" outlined> {{error}} </v-alert>
              </v-col>
            </v-row>
            <v-card-actions >
                <v-col align="center">
                    <v-btn color="blue darken-1" v-if="!updatePassSuccess" text @click="sendPassword">Prosseguir</v-btn>
                    <v-btn color="red darken-1" text @click="closePassUpdate">Fechar</v-btn>
                </v-col>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" persistent max-width="400">
          <v-card>
            <v-row justify="center">
              <v-col md="8" align="center">
                <v-alert color="red" outlined> Deseja deletar seu acesso ? </v-alert>
              </v-col>
            </v-row>
            <v-card-actions >
                <v-col align="center">
                    <v-btn color="blue darken-1" text @click="deleteAccess">Prosseguir</v-btn>
                    <v-btn color="red darken-1" text @click="closeDeleteAccess">Fechar</v-btn>
                </v-col>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-app-bar>
    <slot/>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    password: '',
    passwordRules: [
      valueInput => (!!valueInput && valueInput.length > 4) || 'Informe uma senha válida'
    ]
  }),
  computed: {
    ...mapGetters({
      updatePassSuccess: 'Auth/getPassUpdate',
      error: 'Auth/getError'
    })
  },
  methods: {
    ...mapMutations({
      setLogin: 'Auth/SET_LOGIN',
      clearSuccessPass: 'Auth/PASS_UPDATE',
      clearError: 'Auth/CLEAR_ERROR'
    }),
    ...mapActions({
      updatePass: 'Auth/updatePass',
      deleteUser: 'Auth/deleteUser'
    }),
    logout () {
      this.setLogin(null)
      localStorage.clear()
      this.$router.push({ name: 'login' })
    },
    resetPassword () {
      this.dialog = true
    },
    closePassUpdate () {
      this.clearError()
      this.clearSuccessPass(false)
      this.dialog = false
    },
    async deleteAccess () {
      await this.deleteUser()
      this.dialogDelete = false
      this.logout()
    },
    closeDeleteAccess () {
      this.clearError()
      this.clearSuccessPass(false)
      this.dialogDelete = false
    },
    async sendPassword () {
      if (!this.$refs.form.validate()) return
      await this.updatePass(this.password)
      this.password = ''
    }
  }
}
</script>
