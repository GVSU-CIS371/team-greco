<template>
  <v-container class="py-6">
    <v-row justify="space-between" class="mb-4">
      <v-col>
        <h1>Courses</h1>
      </v-col>

      <v-col class="text-right">
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          @click="openDialog = true"
        >
          Add Course
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="course in fireStore.courses"
        :key="course.id"
        cols="12" sm="6" md="4"
      >
        <v-card>
          <v-card-title>{{ course.course_name }} - {{ course.course_section }}</v-card-title>
          <v-card-actions>
            <v-btn color="primary" :to="`/groups/${course.course_id}`">View Groups</v-btn>
            <v-btn color="red" @click="fireStore.deleteCourse(course.course_id)">Delete</v-btn>
          </v-card-actions>
          
        </v-card>
      </v-col>
    </v-row>
  </v-container>
      <v-dialog v-model="openDialog" max-width="500px">
      <v-card>
        <v-card-title>Add a New Course</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newCourse.name"
            label="Course Name"
            outlined
            dense
          />
          <v-text-field
            v-model="newCourse.section"
            label="Course Section"
            outlined
            dense
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="openDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="addCourse()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useFireStore } from '../stores/fireStore'
import { Firestore } from 'firebase/firestore';
const openDialog = ref(false);
const fireStore = useFireStore();
const newCourse = ref({
  name: '',
  section: ''
})

async function addCourse(){
  if (newCourse.value.name != '' && newCourse.value.section != ""){
    await fireStore.addCourse(newCourse.value.name, newCourse.value.section);
    openDialog.value = false;
  }
}

</script>
