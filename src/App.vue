<template>
  <v-app id="app">
    <TemplateBackOffice>
      <router-view></router-view>
    </TemplateBackOffice>
  </v-app>
</template>

<script>
import TemplateBackOffice from './components/Template/Index.vue'

export default {
  name: 'App',
  components: {
    TemplateBackOffice
  },
  data: () => ({
    //
  })
}
</script>
