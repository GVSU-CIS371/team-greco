import { defineStore } from "pinia";
import db from "../firebase.ts";
import type {
  CourseType,
  StudyGroupType,
  UserType
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
  arrayUnion,
  Timestamp,
  updateDoc,
  getDoc,
  DocumentSnapshot,
} from "firebase/firestore";

const coursesColl: CollectionReference = collection(db, "courses");
const studyGroupsColl: CollectionReference = collection(db, "StudyGroups");

export const useFireStore = defineStore("FireStore", {
  state: () =>({
    courses: [] as CourseType[],
    studyGroups: [] as StudyGroupType[],
    user_id: '',
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
  async getStudyGroup(group_id:String){
    const myDoc: DocumentReference = doc(db, "StudyGroups/"+group_id);
    
    const qd:DocumentSnapshot = await getDoc(myDoc); 

    if(qd.exists()){
      const data = qd.data();
      const group:StudyGroupType = {
        group_id: qd.id,
        course_id: data.Course_id,
        description: data.Description,
        group_name: data.Group_name,
        meeting_schedule: data.schedule,
      }
      console.log(group)
      return group;
    }
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
  },
  async sendMessage(group_id:string, message:string, sender:string){
    const groupDoc = doc(db, "StudyGroups", group_id);

    await updateDoc(groupDoc, {
      messages: arrayUnion({
        text: message,
        sender: sender,
        timestamp: new Date().toISOString()
      })
    })
  },
  async createUser(uid:string, name:string, email:string){
    await setDoc(doc(db, "Users", uid), {
      name: name,
      email: email,
      major: "",
      availability: "",
    });
    console.log("added user");
  },
  async getUser(){
    if(this.user_id){
      const userRef = doc(db, "Users", this.user_id)
      const snapshot:DocumentSnapshot = await getDoc(userRef)
      if(snapshot.exists()){
        const data = snapshot.data();
        console.log(data);
        return {
          user_id: this.user_id,
          name: data.name,
          email: data.email,
          major: data.major,
          availability: data.availability
        }
      }
    }
  },
  async updateUser(uid:string, name:string, major:string, availability:string){
    try {
      const userRef = doc(db, "Users", uid);
      await updateDoc(userRef, {
        name: name,
        major: major,
        availability: availability,
      })
      console.log("Updated User");
    } catch (e){
      console.error("Error updating user: ", e);
    }
  }
  
}})
