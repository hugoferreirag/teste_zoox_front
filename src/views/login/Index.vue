<template>
  <v-container>
      <v-row justify="center" class="mt-12">
          <v-col md="12" align="center" class="mt-12">
            <v-card class="mx-auto mt-12" max-width="344" outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <v-form ref="form" lazy-validation>
                        <v-text-field  v-model="user.nickName" :rules="nickRules" label="Usuário"></v-text-field>
                        <v-text-field type="password" v-model="user.password" :rules="passwordRules" label="Senha"></v-text-field>
                    </v-form>
                </v-list-item-content>

                <v-list-item-avatar tile size="80">
                    <img src="@/assets/key.png" alt="">
                </v-list-item-avatar>
            </v-list-item>

            <v-card-actions>
              <v-row justify="center">
                <v-col md="12" align="center">
                  <v-btn @click="login" outlined dark color="blue">Entrar</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
            </v-card>
            <NewUser/>
          </v-col>
      </v-row>
      <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-text>
            <v-row justidy="center">
                <v-col md="12" align="center">
                    <v-alert color="red" dark outlined> {{error}} </v-alert>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions >
            <v-col align="center">
                <v-btn color="red darken-1" text @click="retryLogin">Fechar</v-btn>
            </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import NewUser from './components/NewUser.vue'

export default {
  components: {
    NewUser
  },
  data: () => ({
    dialog: false,
    user: { nickName: '', password: '' },
    nickRules: [
      valueInput => (!!valueInput && valueInput.length > 4) || 'Informe um usuário válido'
    ],
    passwordRules: [
      valueInput => (!!valueInput && valueInput.length > 4) || 'Informe uma senha válida'
    ]
  }),
  computed: {
    ...mapGetters({
      error: 'Auth/getError'
    })
  },
  methods: {
    ...mapMutations({
      clearError: 'Auth/CLEAR_ERROR'
    }),
    ...mapActions({
      authenticate: 'Auth/login'
    }),
    retryLogin () {
      this.clearError()
      this.dialog = false
    },
    async login () {
      if (!this.$refs.form.validate()) return
      await this.authenticate(this.user)
      if (!this.error) this.$router.push({ name: 'admin' })
      else {
        this.user = {}
        this.dialog = true
      }
    }
  }
}
</script>
<style lang="scss">
</style>
