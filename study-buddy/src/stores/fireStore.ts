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
  addDoc,
  DocumentReference,
  deleteDoc,
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
        group_name: data.Group_name,
        meeting_schedule: data.schedule,
      });
    });

    return groups;
  },
  async addCourse(name:string, section:string){
    const doc1:DocumentReference = doc(db, "courses", name +""+ section);
    console.log(doc1);
    setDoc(doc1, {name: name, section: section}).then(() =>{
      const newCourse: CourseType = {
        course_name: name,
        course_id: name+""+section,
        course_section: section
      }
      this.courses.push(newCourse);
    })
  },
  async createGroup(name:string, description:string, schedule:string, course_id:string){
    addDoc(studyGroupsColl, {Course_id: course_id, Description: description, Group_name: name, schedule: schedule}).then(() =>{
      console.log("New group created");
    })
  },
  async deleteCourse(course_id:string){
    const toRemove = doc(db, "courses/"+course_id);
    deleteDoc(toRemove).then(()=>{
      console.debug("Course "+course_id+" Removed")
      this.courses = this.courses.filter(
      (course) => course.course_id !== course_id
    );
    })
  }
}})
