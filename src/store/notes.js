// import { defineStore } from 'pinia'
// import { ref } from "vue"

// export const useNoteStore = defineStore('notes', () => {
    
// //     const newNotes = ref('')
// //     const heading = ref('')
// //     const errorMessage = ref('')
// //     const notes = ref([])
    

// //     function getRandomColor() {
// //         return "hsl(" + Math.random() * 360 + ", 100%, 75%)";
// //       }
      
// //       const addNotes = () => {
// //           if (newNotes.value.length < 5) {
// //               return errorMessage.value = "Characters should be above five or more"
// //           }
// //           notes.value.push({
// //               id: Math.floor(Math.random() * 1000),
// //               text: newNotes.value,
// //               head: heading.value,
// //               date: new Date(),
// //               backgroundColor: getRandomColor() 
// //           })
// //         newNotes.value = ''
// //         heading.value = ''
// //       }
// //       return { newNotes, heading, errorMessage, getRandomColor, addNotes }
// //   })