<script setup>
import { ref } from "vue";
import NoteModal from "../components/NoteModal.vue";

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

const newNotes = ref('')
const heading = ref('')
const errorMessage = ref('')
const notes = ref([])


function getRandomColor() {
  return "hsl(" + Math.random() * 360 + ", 100%, 75%)";
}

const addNotes = () => {
    if (newNotes.value.length < 5) {
        return errorMessage.value = "Characters should be above five or more"
    }
    notes.value.push({
        id: Math.floor(Math.random() * 1000),
        text: newNotes.value,
        head: heading.value,
        date: new Date(),
        backgroundColor: getRandomColor() 
    })
  newNotes.value = ''
  heading.value = ''
}
</script>

<template>
  <NoteModal :modalActive="modalActive" @close-modal="toggleModal">
    <h1 class="text-gray-600 text-xl font-semibold mb-4">Take Notes</h1>
    <form @submit.prevent="addNotes">
        <div class="mb-4">
      <input
        v-model.trim="heading"
        type="text"
        placeholder="Enter your heading"
        class="outline-none border-b-2 border-b-gray-400 w-72 p-2"
      />
    </div>
    <div class="mb-12 pt-6">
      <label
        for="message"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >Write your notes</label
      >
      <textarea
        v-model.trim="newNotes"
        id="message"
        rows="4"
        class="block p-2.5 w-full text-sm text-gray-600 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary focus:outline-none"
        placeholder="Your message..."
      ></textarea>
      <p class="text-red-500 font-semibold text-sm pt-2">{{ errorMessage }}</p>
    </div>

    <button 
    class="mx-4 text-white bg-primary py-2 px-6 cursor-pointer">ADD NOTE</button>
    </form>
    
  </NoteModal>

  <div class="flex justify-between mt-4 mx-6">
    <h2 class="text-xl mx-2 my-2 font-semibold">Note Book</h2>
    <button
      @click="toggleModal"
      class="bg-primary p-1 w-12 rounded-md text-white"
    >
      Add
    </button>
  </div>

  <div class="my-20 mx-6">
    <div class="flex flex-wrap gap-10 justify-center">
      <div
       v-for="note in notes" 
       :key="note.id"
       :style="{backgroundColor: note.backgroundColor}"
       class="flex flex-col w-80 h-auto rounded-md">
        <h1 class="mx-3 font-bold text-lg pb-2 mt-3">{{ note.head }}</h1>
        <p class="mx-3 pb-6">
        {{ note.text }}
        </p>
        <h3 class="pb-4 mx-3 font-semibold text-gray-700">{{ note.date.toLocaleDateString('en-US') }}</h3>
      </div>
    </div>
  </div>
</template>
