<template>
  <v-container class="py-6">
    <v-row>
      <v-col
        v-for="course in fireStore.courses"
        :key="course.id"
        cols="12" sm="6" md="4"
      >
        <v-card>
          <v-card-title>{{ course.course_name }} - {{ course.course_section }}</v-card-title>
          <v-card-actions>
            <v-btn color="primary" :to="`/groups/${course.id}`">View Groups</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useFireStore } from '../stores/fireStore'

const fireStore = useFireStore();
</script>
