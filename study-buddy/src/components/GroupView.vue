<template>
  <v-container class="py-6">
    <v-row justify="space-between" class="mb-4">
      <v-col>
        <h1>Study Groups</h1>
      </v-col>

      <v-col class="text-right">
        <v-btn
          color="primary"
          @click="openDialog = true"
        >
          Add Group
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col 
        v-for="group in groups"
        :key="group.group_id"
      >
        <v-card class="pa-4">
          <v-card-title>{{ group.group_name }}</v-card-title>
          <v-card-subtitle>{{ group.description }}</v-card-subtitle>
          <v-card-text>
            <strong>Meeting Schedule:</strong> {{ group.schedule }}
          </v-card-text>

          <v-card-actions>
            <v-btn :to="`/group/${group.group_id}`" color="primary">Open Chat</v-btn>
          </v-card-actions>
        </v-card>
    </v-col>
  </v-row>
  <v-dialog v-model="openDialog" max-width="500px">
      <v-card>
        <v-card-title>Add New Study Group</v-card-title>

        <v-card-text>
          <v-text-field
            v-model="newGroup.name"
            label="Group Name"
            outlined dense
          />

          <v-text-field
            v-model="newGroup.description"
            label="Description"
            outlined dense
          />

          <v-text-field
            v-model="newGroup.schedule"
            label="Meeting Schedule"
            outlined dense
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="openDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="createGroup">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useFireStore } from '../stores/fireStore'

const fireStore = useFireStore();
const route = useRoute()
const courseId = route.params.id

const openDialog = ref(false);

const newGroup = ref({
  name: '',
  description: '',
  schedule: ''
})
newGroup.value = { name: '', description: '', schedule: '' }

const groups = ref([])

onMounted(async () => {
  groups.value = await fireStore.getStudyGroups(courseId);
  console.log(groups);

})

function createGroup() {
  if(newGroup.value.name != ""){
    fireStore.createGroup(newGroup.value.name,newGroup.value.description,newGroup.value.schedule, courseId);
    openDialog.value = false;
  }
}

</script>
