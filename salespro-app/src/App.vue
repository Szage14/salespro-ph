<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const navigationItems = [
  { value: 'home', label: 'Home', icon: 'mdi-home', to: '/' },
  { value: 'leads', label: 'Leads', icon: 'mdi-account-multiple', to: '/leads' },
  { value: 'activity', label: 'Activity', icon: 'mdi-chart-box', to: '/activity' },
  { value: 'calculator', label: 'Calculator', icon: 'mdi-calculator', to: '/calculator' },
  { value: 'notes', label: 'Notes', icon: 'mdi-notebook', to: '/notes' },
] as const

const activeTab = computed({
  get: () => (route.name?.toString() ?? 'home'),
  set: (value: string) => {
    const selectedItem = navigationItems.find((item) => item.value === value)
    if (selectedItem) {
      router.push(selectedItem.to)
    }
  },
})
</script>

<template>
  <v-app>
    <v-app-bar color="transparent" elevation="0" density="comfortable" class="app-bar-shell">
      <v-app-bar-title class="app-brand">
        <span class="app-brand__title">SalesPro PH</span>
        <span class="app-brand__eyebrow">Field Sales Companion</span>
      </v-app-bar-title>
      <template #append>
        <v-btn icon="mdi-bell-outline" variant="text" aria-label="Notifications" />
      </template>
    </v-app-bar>

    <v-main class="app-main">
      <v-container fluid class="app-frame pa-3 pa-md-6">
        <router-view />
      </v-container>
    </v-main>

    <v-bottom-navigation v-model="activeTab" color="primary" mode="shift" class="mobile-nav" grow>
      <v-btn v-for="item in navigationItems" :key="item.value" :value="item.value" stacked>
        <v-icon :icon="item.icon" />
        {{ item.label }}
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>