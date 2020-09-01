<template>
    <v-container>
        <v-row justify="center">
        <v-col md='12' align="center">
            <v-btn @click="selectSection(1)" class="mr-5" color="blue" dark :outlined="!seeStatesOrCities"> Estados</v-btn>
            <v-btn @click="selectSection(2)" dark color="blue" :outlined="seeStatesOrCities"> Cidades</v-btn>
        </v-col>
        </v-row>
        <v-row>
            <States v-if="seeStatesOrCities"/>
        </v-row>
        <v-row>
            <Cities v-if="!seeStatesOrCities"/>
        </v-row>
    </v-container>
</template>
<script>
import States from './States/Index.vue'
import Cities from './Cities/Index.vue'

export default {
  data: () => ({
    seeStatesOrCities: true,
    dialogCities: false
  }),
  components: {
    States,
    Cities
  },
  methods: {
    selectSection (sectionSelected) {
      if (sectionSelected === 1 && this.seeStatesOrCities === true) return
      if (sectionSelected === 2 && this.seeStatesOrCities === false) return
      if (sectionSelected === 2 && this.seeStatesOrCities === true) this.seeStatesOrCities = false
      if (sectionSelected === 1 && this.seeStatesOrCities === false) this.seeStatesOrCities = true
    }
  }
}
</script>
<style lang="scss">

</style>
