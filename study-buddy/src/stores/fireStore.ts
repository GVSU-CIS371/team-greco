import { defineStore } from "pinia";
import db from "../firebase.ts";
import type {
  CourseType,
  StudyGroupType
} from "../types/objectTypes.ts";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  QuerySnapshot,
  QueryDocumentSnapshot,
  CollectionReference,
  query,
  where,
} from "firebase/firestore";

const coursesColl: CollectionReference = collection(db, "courses");
const studyGroupsColl: CollectionReference = collection(db, "StudyGroups");

export const useFireStore = defineStore("FireStore", {
  state: () =>({
    courses: [] as CourseType[],
    studyGroups: [] as StudyGroupType[],
  }),
  actions: {
    init(){
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
      })
  },
  async getStudyGroups(course_id:String){
    const q = query(studyGroupsColl, where("Course_id", "==", course_id));
    const qs: QuerySnapshot = await getDocs(q);

    const groups: StudyGroupType[] = [];
    qs.forEach((qd: QueryDocumentSnapshot) => {
      const data = qd.data();
      groups.push({
        group_id: qd.id,
        course_id: data.Course_id,
        description: data.Description,
        group_name: data.Group_Name,
        meeting_schedule: data.schedule,
      });
    });

    return groups;
  }
}})
