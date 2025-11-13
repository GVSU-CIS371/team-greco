import { defineStore } from "pinia";
import db from "../firebase.ts";
import type {
  CourseType
} from "../types/objectTypes.ts";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  QuerySnapshot,
  QueryDocumentSnapshot,
  CollectionReference,
} from "firebase/firestore";

const coursesColl: CollectionReference = collection(db, "courses");

export const useFireStore = defineStore("FireStore", {
  state: () =>({
    courses: [] as CourseType[],
  }),
  actions: {
    init(){
      console.log("HI");
      getDocs(coursesColl).then((qs:QuerySnapshot) =>{
        const courses: CourseType[] = [];
        qs.forEach((qd: QueryDocumentSnapshot) => {
          const data = qd.data();
          courses.push({
            course_id: qd.id,
            course_name: data.name,
            course_section: data.section
          });
        });
        this.courses = courses;
        console.log(courses);
    })
  }
}})
