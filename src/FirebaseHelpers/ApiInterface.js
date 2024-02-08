import { db } from "./firebase-config";

import {
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  collection,
  getCountFromServer,
  query,
  where,
  setDoc,
} from "firebase/firestore";

class ApiInterface {
  constructor(collectionName) {
    this.collectionRef = collection(db, collectionName);
  }

  addDocument = async (newDoc, customId = undefined) => {
    if (!customId) {
      return addDoc(this.collectionRef, newDoc);
    }
    return setDoc(doc(this.collectionRef, customId), newDoc);
  };

  updateDocument = async (id, updatedDoc) => {
    const document = doc(db, this.collectionRef.id, id);
    return updateDoc(document, updatedDoc);
  };

  deleteDocument = async (id) => {
    const document = doc(db, this.collectionRef.id, id);
    return deleteDoc(document);
  };

  getAllDocument = async (constrainArray) => {
    try {
      let result = []
      if (constrainArray) {
        let whereArray = []
        constrainArray.forEach(element=>{
          whereArray.push(where(...element));
        })
        const q = query(this.collectionRef, ...whereArray);

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          if (!data.id) {
            result.push({ ...data, id: doc.id });
          } else {
            result.push(data);
          }
        });
      }
      return result
    } catch (error) {
      console.error("Error fetching documents:", error);
      throw error;
    }
  };

  getDocument = async (id) => {
    const document = doc(db, this.collectionRef.id, id);
    try {
      const userDocSnapshot = await getDoc(document);
      if (userDocSnapshot.exists()) {
        return userDocSnapshot.data();
      }
      return {};
    } catch (error) {
      console.error("Error fetching document:", error);
      throw error
    }
  };

  getCount = async (key, operator, value) => {
    var collectionRef = this.collectionRef;
    if (key && operator && value) collectionRef = query(this.collectionRef, where(key, operator, value));
    try {
      const snapshot = await getCountFromServer(collectionRef);
      const totalCount = snapshot.data().count
      return totalCount;
    } catch (e) {
      throw e.message;
    }
  }
}

export const ADMIN = "ADMIN";
export const MANAGER = "MANAGER";
export const DEVELOPER = "DEVELOPER";
export const USERS = "USERS"
export const COMPANY = "Company";
export const PROJECTS = "Projects"
export const TASK = "Tasks";


export var endpoints = {
  users: new ApiInterface(USERS),
  Company: new ApiInterface(COMPANY),
  Project: new ApiInterface(PROJECTS),
  Task: new ApiInterface(TASK)
};