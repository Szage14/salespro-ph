<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

type SalesStatus = 'Interested' | 'Applied' | 'Approved' | 'Declined'

type SalesEntry = {
  customerName: string
  product: string
  status: SalesStatus
  notes: string
}

const storageKey = 'salespro-sales-entries'

const customerName = ref('')
const product = ref('')
const status = ref<SalesStatus>('Interested')
const notes = ref('')
const entries = ref<SalesEntry[]>([])

const statusOptions: SalesStatus[] = ['Interested', 'Applied', 'Approved', 'Declined']

const canSave = computed(() => customerName.value.trim() !== '' && product.value.trim() !== '')

function loadEntries() {
  if (typeof window === 'undefined') {
    return
  }

  const saved = window.localStorage.getItem(storageKey)
  if (!saved) {
    return
  }

  try {
    entries.value = JSON.parse(saved) as SalesEntry[]
  } catch {
    entries.value = []
  }
}

function saveEntry() {
  if (!canSave.value) {
    return
  }

  entries.value.unshift({
    customerName: customerName.value.trim(),
    product: product.value.trim(),
    status: status.value,
    notes: notes.value.trim(),
  })

  customerName.value = ''
  product.value = ''
  status.value = 'Interested'
  notes.value = ''
}

watch(
  entries,
  (value) => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(storageKey, JSON.stringify(value))
  },
  { deep: true },
)

onMounted(loadEntries)
</script>

<template>
  <v-container class="page-shell" fluid>
    <v-row>
      <v-col cols="12">
        <v-card class="page-card" rounded="xl" elevation="8">
          <v-card-title class="text-h6 font-weight-bold">Sales Tracker</v-card-title>
          <v-card-text class="pt-0">
            <v-row dense>
              <v-col cols="12">
                <v-text-field v-model="customerName" label="Customer name" variant="outlined" hide-details />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="product" label="Product" variant="outlined" hide-details />
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
                  Save sales entry
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
          <v-card-title class="text-h6 font-weight-bold">Saved Entries</v-card-title>
          <v-card-text class="pt-0">
            <v-list v-if="entries.length" class="bg-transparent" lines="two">
              <v-list-item v-for="(entry, index) in entries" :key="`${entry.customerName}-${index}`">
                <v-list-item-title>{{ entry.customerName }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ entry.product }} · {{ entry.status }}
                </v-list-item-subtitle>
                <template #append>
                  <v-chip size="small" color="primary" variant="tonal">{{ index + 1 }}</v-chip>
                </template>
                <div v-if="entry.notes" class="text-body-2 mt-2 text-medium-emphasis">
                  {{ entry.notes }}
                </div>
              </v-list-item>
            </v-list>

            <v-empty-state
              v-else
              icon="mdi-clipboard-text-outline"
              title="No saved entries yet"
              text="Add a sales entry to build your tracker locally on this device."
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>