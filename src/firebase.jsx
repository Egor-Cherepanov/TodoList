import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyCBj1--vWMcfnCdlG5oieix5Wp7HrgmWpg",
  authDomain: "todos-list-a8e23.firebaseapp.com",
  projectId: "todos-list-a8e23",
  storageBucket: "todos-list-a8e23.firebasestorage.app",
  messagingSenderId: "29835812693",
  appId: "1:29835812693:web:178b55222f3d46c5e7d9dc",
  databaseURL:
    "https://todos-list-a8e23-default-rtdb.europe-west1.firebasedatabase.app/",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)
