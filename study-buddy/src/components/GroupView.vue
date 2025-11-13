<template>
  <v-container class="py-6">
    <v-row>
      <v-col 
        v-for="group in groups"
        :key="group.group_id"
      >
        <v-card class="pa-4">
          <v-card-title>{{ group.name }}</v-card-title>
          <v-card-subtitle>{{ group.description }}</v-card-subtitle>
          <v-card-text>
            <strong>Meeting Schedule:</strong> {{ group.schedule }}
          </v-card-text>

          <v-divider class="my-4"></v-divider>

          <v-list>
            <v-list-subheader>Messages</v-list-subheader>
            <v-list-item
              v-for="msg in messages"
              :key="msg.id"
              :title="msg.user"
              :subtitle="msg.content"
            ></v-list-item>
          </v-list>
        </v-card>
    </v-col>
  </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useFireStore } from '../stores/fireStore'

const fireStore = useFireStore();
const route = useRoute()
const courseId = route.params.id

const groups = ref([])
const messages = ref([])
const newMessage = ref('')

onMounted(async () => {
  groups.value = await fireStore.getStudyGroups(courseId);
  
  // TODO: Replace with actual messages
  messages.value = [
    { id: 1, user: 'Alice', content: 'Hey everyone!' },
    { id: 2, user: 'Bob', content: 'Ready for our session tonight?' },
  ]
})

</script>
