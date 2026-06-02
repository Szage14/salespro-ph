<script setup lang="ts">
import { computed, ref } from 'vue'

type MetricKey = 'leads' | 'approached' | 'walkIns'

const selectedMetric = ref<MetricKey>('leads')

const metrics = [
  {
    key: 'leads' as const,
    label: 'Leads Generated',
    icon: 'mdi-account-multiple-plus',
    value: 0,
    subtitle: 'Total potential customers identified today',
    accent: 'metric-card--teal',
  },
  {
    key: 'approached' as const,
    label: 'People Approached',
    icon: 'mdi-walk',
    value: 0,
    subtitle: 'Customers you have personally engaged',
    accent: 'metric-card--blue',
  },
  {
    key: 'walkIns' as const,
    label: 'Store Visitors / Walk-ins',
    icon: 'mdi-storefront-outline',
    value: 0,
    subtitle: 'Customers who entered the store',
    accent: 'metric-card--gold',
  },
] as const

const interestSummary = ref([
  { label: 'Smartphones', count: 0, icon: 'mdi-cellphone' },
  { label: 'Laptops', count: 0, icon: 'mdi-laptop' },
  { label: 'TVs', count: 0, icon: 'mdi-television' },
  { label: 'Home Appliances', count: 0, icon: 'mdi-fridge-outline' },
  { label: 'Others', count: 0, icon: 'mdi-dots-horizontal-circle-outline' },
])

const selectedCard = computed(() => metrics.find((metric) => metric.key === selectedMetric.value))

function activateMetric(key: MetricKey) {
  selectedMetric.value = key
}
</script>

<template>
  <v-container class="page-shell dashboard-shell" fluid>
    <v-row>
      <v-col cols="12">
        <div class="dashboard-header">
          <p class="dashboard-header__eyebrow">Field performance</p>
          <h1 class="dashboard-header__title">Sales Dashboard</h1>
          <p class="dashboard-header__subtitle">Track your daily field activity</p>
        </div>
      </v-col>
    </v-row>

    <v-row class="mb-2" dense>
      <v-col v-for="metric in metrics" :key="metric.key" cols="12" md="4">
        <v-card
          :class="['page-card', 'metric-card', metric.accent, { 'metric-card--active': selectedMetric === metric.key }]"
          rounded="xl"
          elevation="8"
          role="button"
          tabindex="0"
          @click="activateMetric(metric.key)"
          @keydown.enter.prevent="activateMetric(metric.key)"
          @keydown.space.prevent="activateMetric(metric.key)"
        >
          <v-card-text class="metric-card__content pa-4">
            <div class="metric-card__icon-wrap">
              <v-icon size="28" :icon="metric.icon" />
            </div>
            <div class="metric-card__value">{{ metric.value }}</div>
            <div class="metric-card__label">{{ metric.label }}</div>
            <div class="metric-card__subtitle">{{ metric.subtitle }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="page-card interest-card" rounded="xl" elevation="8">
          <v-card-title class="interest-card__title">
            Customer Interest Summary
          </v-card-title>
          <v-card-text class="pt-0">
            <v-list class="interest-list" lines="one" density="comfortable">
              <v-list-item v-for="item in interestSummary" :key="item.label">
                <template #prepend>
                  <v-avatar color="primary" variant="tonal" size="32">
                    <v-icon :icon="item.icon" size="18" />
                  </v-avatar>
                </template>

                <v-list-item-title>{{ item.label }}</v-list-item-title>

                <template #append>
                  <v-chip color="primary" variant="tonal" size="small" class="interest-count">
                    {{ item.count }}
                  </v-chip>
                </template>
              </v-list-item>
            </v-list>

            <div class="interest-card__footer">
              <span>Selected card:</span>
              <strong>{{ selectedCard?.label }}</strong>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>