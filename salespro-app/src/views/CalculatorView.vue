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
        <v-card class="page-card" rounded="xl" elevation="8">
          <v-card-title class="text-h6 font-weight-bold">Installment Calculator</v-card-title>
          <v-card-text class="pt-0">
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model.number="cashPrice"
                  type="number"
                  label="Cash price"
                  prefix="₱"
                  variant="outlined"
                  hide-details
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model.number="downPayment"
                  type="number"
                  label="Down payment"
                  prefix="₱"
                  variant="outlined"
                  hide-details
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model.number="monthsToPay"
                  type="number"
                  label="Months to pay"
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
          <v-card-title class="text-h6 font-weight-bold">Results</v-card-title>
          <v-card-text class="pt-0">
            <v-row dense>
              <v-col cols="12" sm="6">
                <v-card rounded="lg" variant="tonal" color="primary" class="pa-4">
                  <div class="text-caption text-uppercase">Amount financed</div>
                  <div class="text-h5 font-weight-bold">₱{{ amountFinanced.toFixed(2) }}</div>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6">
                <v-card rounded="lg" variant="tonal" color="primary" class="pa-4">
                  <div class="text-caption text-uppercase">Estimated monthly payment</div>
                  <div class="text-h5 font-weight-bold">₱{{ monthlyPayment.toFixed(2) }}</div>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>