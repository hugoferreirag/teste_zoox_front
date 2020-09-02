<template>
  <div>
    <v-app-bar
      color="blue darken-3"
      dense
      dark
    >
      <v-spacer></v-spacer>
      <v-toolbar-title>
          <img src="@/assets/logozoo.png" width="200" alt="">
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn @click="logout" outlined color="white">SAIR</v-btn>

    </v-app-bar>
    <slot/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations({
      setLogin: 'Auth/SET_LOGIN'
    }),
    logout () {
      this.setLogin(null)
      localStorage.clear()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
