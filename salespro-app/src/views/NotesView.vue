<script setup lang="ts">
import { computed, ref } from 'vue'

type NoteEntry = {
  title: string
  content: string
  icon: string
}

const noteTitle = ref('')
const noteContent = ref('')
const notes = ref<NoteEntry[]>([
  {
    title: 'Product knowledge',
    content: 'Highlight battery life, display quality, and warranty terms during first pitch.',
    icon: 'mdi-book-open-page-variant',
  },
  {
    title: 'Objection handling',
    content: 'Acknowledge price concerns first, then compare total value and monthly terms.',
    icon: 'mdi-message-alert-outline',
  },
])

const canSave = computed(() => noteTitle.value.trim() !== '' && noteContent.value.trim() !== '')

function addNote() {
  if (!canSave.value) {
    return
  }

  notes.value.unshift({
    title: noteTitle.value.trim(),
    content: noteContent.value.trim(),
    icon: 'mdi-note-text-outline',
  })

  noteTitle.value = ''
  noteContent.value = ''
}

function deleteNote(index: number) {
  notes.value.splice(index, 1)
}
</script>

<template>
  <v-container class="page-shell" fluid>
    <v-row>
      <v-col cols="12">
        <v-card class="page-card" rounded="xl" elevation="8">
          <v-card-title class="text-h6 font-weight-bold">Sales Training Notes</v-card-title>
          <v-card-text class="pt-0">
            <v-row dense>
              <v-col cols="12">
                <v-text-field v-model="noteTitle" label="Note Title" variant="outlined" hide-details />
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="noteContent" label="Note Content" variant="outlined" rows="4" auto-grow hide-details />
              </v-col>
              <v-col cols="12">
                <v-btn block color="primary" size="large" rounded="lg" :disabled="!canSave" @click="addNote">
                  Save note
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
          <v-card-title class="text-h6 font-weight-bold">Notes Library</v-card-title>
          <v-card-text class="pt-0">
            <v-row v-if="notes.length" dense>
              <v-col v-for="(note, index) in notes" :key="`${note.title}-${index}`" cols="12">
                <v-card class="page-card note-card" rounded="lg" elevation="4">
                  <v-card-text class="pa-4">
                    <div class="note-card__header">
                      <div class="note-card__icon">
                        <v-icon :icon="note.icon" size="18" />
                      </div>
                      <v-btn icon="mdi-delete-outline" variant="text" color="error" size="small" @click="deleteNote(index)" />
                    </div>
                    <div class="note-card__title">{{ note.title }}</div>
                    <div class="note-card__content">{{ note.content }}</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-empty-state
              v-else
              icon="mdi-note-plus-outline"
              title="No saved notes"
              text="Add sales training notes, product knowledge, or objection handling scripts here."
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>