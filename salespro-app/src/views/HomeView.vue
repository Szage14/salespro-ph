<script setup lang="ts">
import { ref } from 'vue'

type MetricKey = 'leads' | 'approached' | 'walkIns'

const selectedMetric = ref<MetricKey>('leads')

const metrics = [
  {
    key: 'leads' as const,
    label: 'Leads Generated',
    icon: 'mdi-account-plus',
    value: 0,
    subtitle: 'Potential customers identified today',
    accent: 'metric-card--primary',
  },
  {
    key: 'approached' as const,
    label: 'People Approached',
    icon: 'mdi-walk',
    value: 0,
    subtitle: 'Customers personally engaged',
    accent: 'metric-card--secondary',
  },
  {
    key: 'walkIns' as const,
    label: 'Store Walk-ins',
    icon: 'mdi-store',
    value: 0,
    subtitle: 'Customers who entered the store',
    accent: 'metric-card--neutral',
  },
] as const

const interestSummary = ref([
  { label: 'Smartphones', count: 0, icon: 'mdi-cellphone' },
  { label: 'Laptops', count: 0, icon: 'mdi-laptop' },
  { label: 'TVs', count: 0, icon: 'mdi-television' },
  { label: 'Home Appliances', count: 0, icon: 'mdi-fridge-outline' },
  { label: 'Others', count: 0, icon: 'mdi-dots-horizontal-circle-outline' },
])

function activateMetric(key: MetricKey) {
  selectedMetric.value = key
}
</script>

<template>
  <v-container class="page-shell dashboard-shell" fluid>
    <v-row>
      <v-col cols="12">
        <div class="dashboard-header">
          <h1 class="dashboard-header__title">Good day, Sales Associate</h1>
          <p class="dashboard-header__subtitle">Track your daily field performance</p>
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
          <v-card-title class="interest-card__title">Customer Interest Overview</v-card-title>
          <v-card-text class="pt-0">
            <v-chip-group column class="interest-chip-group">
              <v-chip
                v-for="item in interestSummary"
                :key="item.label"
                class="interest-chip"
                variant="elevated"
                color="surface"
                size="large"
              >
                <v-icon :icon="item.icon" start size="18" />
                {{ item.label }}
                <span class="interest-chip__count">({{ item.count }})</span>
              </v-chip>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>