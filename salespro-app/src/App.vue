<template>
  <v-app>
    <v-app-bar color="transparent" elevation="0" density="comfortable" class="app-bar-shell">
      <v-app-bar-title class="app-brand">
        <span class="app-brand__eyebrow">Sales dashboard</span>
        <span class="app-brand__title">SalesPro PH</span>
      </v-app-bar-title>
      <template #append>
        <v-btn icon="mdi-bell-outline" variant="text" aria-label="Notifications" />
      </template>
    </v-app-bar>

    <v-main class="app-main">
      <div class="app-frame">
        <router-view />
      </div>
    </v-main>

    <v-bottom-navigation color="primary" mode="shift" class="mobile-nav" grow>
      <v-btn to="/" value="home" icon="mdi-view-dashboard" stacked>
        Home
      </v-btn>
      <v-btn to="/sales" value="sales" icon="mdi-cash-register" stacked>
        Sales
      </v-btn>
      <v-btn to="/calculator" value="calculator" icon="mdi-calculator" stacked>
        Calc
      </v-btn>
      <v-btn to="/notes" value="notes" icon="mdi-note-text-outline" stacked>
        Notes
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>