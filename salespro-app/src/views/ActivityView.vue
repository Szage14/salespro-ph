<script setup lang="ts">
const activityItems = [
  { title: 'Visited 3 stores', detail: 'Morning route completed', icon: 'mdi-storefront-outline' },
  { title: '12 leads logged', detail: 'Collected interest from passersby', icon: 'mdi-account-multiple' },
  { title: '2 follow-ups scheduled', detail: 'Call-backs for later today', icon: 'mdi-chart-box' },
] as const
</script>

<template>
  <v-container class="page-shell" fluid>
    <v-row>
      <v-col cols="12">
        <v-card class="page-card" rounded="xl" elevation="8">
          <v-card-title class="text-h6 font-weight-bold">Activity</v-card-title>
          <v-card-text class="pt-0">
            <v-list class="bg-transparent" lines="two">
              <v-list-item v-for="item in activityItems" :key="item.title">
                <template #prepend>
                  <v-avatar color="primary" variant="tonal" size="32">
                    <v-icon :icon="item.icon" size="18" />
                  </v-avatar>
                </template>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.detail }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>