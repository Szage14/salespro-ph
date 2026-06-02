<script setup lang="ts">
import { computed, ref } from 'vue'

type ProductCategory = 'Smartphone' | 'Laptop' | 'TV' | 'Appliance' | 'Others'
type ActivityStatus = 'Approached' | 'Interested' | 'Not Interested' | 'Follow-up'

type SalesEntry = {
  customerName: string
  productCategory: ProductCategory
  status: ActivityStatus
  notes: string
  timestamp: string
}

const customerName = ref('')
const productCategory = ref<ProductCategory>('Smartphone')
const status = ref<ActivityStatus>('Approached')
const notes = ref('')
const entries = ref<SalesEntry[]>([])

const categoryOptions: ProductCategory[] = ['Smartphone', 'Laptop', 'TV', 'Appliance', 'Others']
const statusOptions: ActivityStatus[] = ['Approached', 'Interested', 'Not Interested', 'Follow-up']

const statusColorMap: Record<ActivityStatus, string> = {
  Approached: 'primary',
  Interested: 'success',
  'Not Interested': 'error',
  'Follow-up': 'secondary',
}

const canSave = computed(() => customerName.value.trim() !== '' && notes.value.trim() !== '')

function createTimestamp() {
  return new Date().toLocaleString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function saveEntry() {
  if (!canSave.value) {
    return
  }

  entries.value.unshift({
    customerName: customerName.value.trim(),
    productCategory: productCategory.value,
    status: status.value,
    notes: notes.value.trim(),
    timestamp: createTimestamp(),
  })

  customerName.value = ''
  productCategory.value = 'Smartphone'
  status.value = 'Approached'
  notes.value = ''
}
</script>

<template>
  <v-container class="page-shell" fluid>
    <v-row>
      <v-col cols="12">
        <v-card class="page-card" rounded="xl" elevation="8">
          <v-card-title class="text-h6 font-weight-bold">Sales Activity Tracker</v-card-title>
          <v-card-text class="pt-0">
            <v-row dense>
              <v-col cols="12">
                <v-text-field v-model="customerName" label="Customer Name" variant="outlined" hide-details />
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="productCategory"
                  :items="categoryOptions"
                  label="Product Category"
                  variant="outlined"
                  hide-details
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="status"
                  :items="statusOptions"
                  label="Status"
                  variant="outlined"
                  hide-details
                />
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="notes" label="Notes" variant="outlined" rows="3" auto-grow hide-details />
              </v-col>
              <v-col cols="12">
                <v-btn block color="primary" size="large" rounded="lg" :disabled="!canSave" @click="saveEntry">
                  Save activity
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-2">
      <v-col cols="12">
        <v-card class="page-card" rounded="xl" elevation="8">
          <v-card-title class="text-h6 font-weight-bold">Saved Activities</v-card-title>
          <v-card-text class="pt-0">
            <v-list v-if="entries.length" class="bg-transparent" lines="two">
              <v-list-item v-for="(entry, index) in entries" :key="`${entry.customerName}-${entry.timestamp}-${index}`">
                <template #prepend>
                  <v-avatar color="primary" variant="tonal" size="38">
                    <span class="text-caption font-weight-bold">{{ index + 1 }}</span>
                  </v-avatar>
                </template>

                <v-list-item-title class="font-weight-bold">{{ entry.customerName }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ entry.productCategory }} · {{ entry.timestamp }}
                </v-list-item-subtitle>

                <template #append>
                  <v-chip :color="statusColorMap[entry.status]" variant="tonal" size="small">
                    {{ entry.status }}
                  </v-chip>
                </template>

                <div class="text-body-2 mt-2 text-medium-emphasis">
                  {{ entry.notes }}
                </div>
              </v-list-item>
            </v-list>

            <v-empty-state
              v-else
              icon="mdi-clipboard-text-outline"
              title="No saved activities yet"
              text="Track customer activity locally with no backend or API calls."
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>