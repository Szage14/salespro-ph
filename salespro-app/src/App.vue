<template>
  <v-app>
    <v-app-bar color="primary" density="comfortable" elevation="0">
      <v-app-bar-title>SalesPro PH</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-bottom-navigation color="primary" mode="shift" class="mobile-nav" grow>
      <v-btn to="/" value="home" icon="mdi-view-dashboard">Home</v-btn>
      <v-btn to="/sales" value="sales" icon="mdi-cash-register">Sales</v-btn>
      <v-btn to="/calculator" value="calculator" icon="mdi-calculator">Calc</v-btn>
      <v-btn to="/notes" value="notes" icon="mdi-note-text-outline">Notes</v-btn>
    </v-bottom-navigation>
  </v-app>
</template>