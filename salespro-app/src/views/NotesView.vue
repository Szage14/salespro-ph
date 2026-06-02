<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const storageKey = 'salespro-training-notes'

const noteInput = ref('')
const notes = ref<string[]>([])

function loadNotes() {
  if (typeof window === 'undefined') {
    return
  }

  const saved = window.localStorage.getItem(storageKey)
  if (!saved) {
    return
  }

  try {
    notes.value = JSON.parse(saved) as string[]
  } catch {
    notes.value = []
  }
}

function addNote() {
  const text = noteInput.value.trim()
  if (!text) {
    return
  }

  notes.value.unshift(text)
  noteInput.value = ''
}

watch(
  notes,
  (value) => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(storageKey, JSON.stringify(value))
  },
  { deep: true },
)

onMounted(loadNotes)
</script>

<template>
  <v-container class="page-shell" fluid>
    <v-row>
      <v-col cols="12">
        <v-card class="page-card" rounded="xl" elevation="8">
          <v-card-title class="text-h6 font-weight-bold">Notes for Sales Training</v-card-title>
          <v-card-text class="pt-0">
            <v-row dense>
              <v-col cols="12">
                <v-textarea
                  v-model="noteInput"
                  label="Add note"
                  variant="outlined"
                  rows="4"
                  auto-grow
                  hide-details
                />
              </v-col>
              <v-col cols="12">
                <v-btn block color="primary" size="large" rounded="lg" @click="addNote">
                  Save note locally
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
          <v-card-title class="text-h6 font-weight-bold">Saved Notes</v-card-title>
          <v-card-text class="pt-0">
            <v-list v-if="notes.length" class="bg-transparent" lines="two">
              <v-list-item v-for="(note, index) in notes" :key="`${index}-${note}`">
                <template #prepend>
                  <v-avatar color="primary" variant="tonal" size="32">
                    <v-icon icon="mdi-note-text-outline" size="18" />
                  </v-avatar>
                </template>
                <v-list-item-title>Note {{ notes.length - index }}</v-list-item-title>
                <v-list-item-subtitle>{{ note }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>

            <v-empty-state
              v-else
              icon="mdi-note-plus-outline"
              title="No saved notes"
              text="Add simple coaching reminders or training points to keep them on this device."
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>