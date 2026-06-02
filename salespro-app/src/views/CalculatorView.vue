<script setup lang="ts">
import { computed, ref } from 'vue'

const cashPrice = ref(0)
const downPayment = ref(0)
const monthsToPay = ref(12)

const amountFinanced = computed(() => Math.max(cashPrice.value - downPayment.value, 0))
const monthlyPayment = computed(() => {
  if (monthsToPay.value <= 0) {
    return 0
  }

  return amountFinanced.value / monthsToPay.value
})
</script>

<template>
  <v-container class="page-shell" fluid>
    <v-row>
      <v-col cols="12">
        <div class="dashboard-header">
          <h1 class="dashboard-header__title">Installment Calculator</h1>
          <p class="dashboard-header__subtitle">Real-time financing estimates for quick sales quoting</p>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="page-card" rounded="xl" elevation="8">
          <v-card-text class="pt-4">
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model.number="cashPrice"
                  type="number"
                  label="Cash Price"
                  prefix="₱"
                  variant="outlined"
                  hide-details
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model.number="downPayment"
                  type="number"
                  label="Down Payment"
                  prefix="₱"
                  variant="outlined"
                  hide-details
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model.number="monthsToPay"
                  type="number"
                  label="Months to Pay"
                  suffix="months"
                  variant="outlined"
                  hide-details
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-2">
      <v-col cols="12">
        <v-card class="page-card" rounded="xl" elevation="8">
          <v-card-title class="text-h6 font-weight-bold">Calculation Summary</v-card-title>
          <v-card-text class="pt-0">
            <v-row dense>
              <v-col cols="12" sm="6">
                <v-card rounded="lg" variant="tonal" color="surface" class="pa-4 calc-summary-card">
                  <div class="calc-summary-card__label">Amount Financed</div>
                  <div class="calc-summary-card__value">₱{{ amountFinanced.toFixed(2) }}</div>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6">
                <v-card rounded="lg" color="primary" class="pa-4 calc-summary-card calc-summary-card--primary">
                  <div class="calc-summary-card__label calc-summary-card__label--inverse">
                    Estimated Monthly Payment
                  </div>
                  <div class="calc-summary-card__value calc-summary-card__value--inverse">
                    ₱{{ monthlyPayment.toFixed(2) }}
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>