<template>
  <v-container class="py-6">
    <v-card class="pa-6">
      <v-card-title>Your Profile</v-card-title>
      <v-text-field v-model="user.name" label="Name" />
      <v-text-field v-model="user.major" label="Major" />
      <v-textarea v-model="user.availability" label="Availability" />
      <v-btn color="primary" @click="updateProfile">Save</v-btn>
      <v-btn  @click="logOut">Log Out</v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
const user = ref({});
const auth = getAuth()
const name = ref('');
const major = ref('');
const availability = ref('');

async function updateProfile() {
  await fireStore.updateUser(user.value.user_id, user.value.name, user.value.major, user.value.availability);
}

function logOut() {
  if(auth){
    signOut(auth);
  }
}
import { onMounted } from "vue";
import { useFireStore } from "../stores/fireStore";
import { getAuth, signOut } from 'firebase/auth';

const fireStore = useFireStore();

onMounted(async () => {
  fireStore.init();
  user.value = await fireStore.getUser();
  console.log(user.value)
});

</script>