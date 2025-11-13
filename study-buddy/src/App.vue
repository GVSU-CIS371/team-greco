
<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>Study Buddy Finder</v-app-bar-title>
      <v-spacer />
      <v-btn to="/courses">Courses</v-btn>
      <v-btn to="/profile">Profile</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
