<template>
  <v-container class="py-6">
    <h1 class="text-h4 font-weight-bold">{{ group?.group_name }}</h1>
    <p>{{ group?.description }}</p>

    <div class="text-subtitle-2">
      <strong>Meeting Schedule:</strong> {{ group?.meeting_schedule }}
    </div>

    <v-divider class="my-4" />

    <h3 class="text-h6 mb-3">Messages</h3>

    <!-- MESSAGE LIST -->
    <div
      ref="messageContainer"
      style="max-height: 350px; overflow-y: auto;"
      class="pa-2 rounded bg-grey-lighten-4"
    >
      <div
        v-for="msg in messages"
        :key="msg.timestamp"
        class="mb-3 pa-2 rounded"
        style="background:white;"
      >
        <strong>{{ msg.user }}</strong>
        <div>{{ msg.text }}</div>
      </div>
    </div>

    <!-- INPUT -->
    <v-text-field
      class="mt-4"
      v-model="newMessage"
      placeholder="Type a message..."
      @keyup.enter="sendMessage"
      clearable
    />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import db from '../firebase'
import { useFireStore } from '../stores/fireStore'

const fireStore = useFireStore();
const route = useRoute()
const groupId = route.params.id

const group = ref({})
const newMessage = ref("")

async function sendMessage(newMessage, sender) {
  await fireStore.sendMessage(groupId,newMessage,sender);
  newMessage = "";
}

onMounted(async ()=>{
    group.value = await fireStore.getStudyGroup(groupId);
     console.log(group);
})
</script>
