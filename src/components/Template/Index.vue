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

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

    </v-app-bar>
    <slot/>
  </div>
</template>
