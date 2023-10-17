import {defineStore} from 'pinia'
import { ref, onMounted } from 'vue'
import { db } from "../firebase/base";
import {
    collection,
    addDoc,
    onSnapshot,
  } from "firebase/firestore";

export const useProfileStore = defineStore('profile', () => {
    const country = ref(null)
    const city = ref(null)
    const date = ref(null)
    const year = ref(null)
    const month = ref(null)

    const userProfile = ref([])

    const userInfor = () => {
        addDoc(collection(db, "user"), {
            country: country.value,
            city: city.value,
            date: date.value,
            month: month.value,
            year: year.value
          });
         
    }


    onMounted(() => {
      try {
        onSnapshot(collection(db, "user"), (querySnapshot) => {
          const user = [];
          querySnapshot.forEach((doc) => {
            const details = {
              id: doc.id,
              country: doc.data().country,
              city: doc.data().city,
              date: doc.data().date,
              month: doc.data().month,
            };
            user.push(details);
          });
          userProfile.value = user;
        });
      } catch (err) {
        alert(err.message);
      }
    })
    return { country, city, date, year, month, userProfile, userInfor }
})