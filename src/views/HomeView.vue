<script setup>
import { ref, onMounted } from "vue";
import NoteModal from "../components/NoteModal.vue";
import EditModal from "../components/EditModal.vue";
import Header from "../components/Header.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { getAuth } from "firebase/auth";
import { db } from "../firebase/base";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";

const modalActive = ref(null);
const editModalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
// edit modal
const toggleEditModal = () => {
  editModalActive.value = !editModalActive.value;
};

const auth = getAuth();
const newNotes = ref("");
const heading = ref("");
const errorMessage = ref("");
const notes = ref([]);
const userId = ref("");
const email = ref("");

const updateData = {
  head: "",
  text: "",
};
// add data
function getRandomColor() {
  return "hsl(" + Math.random() * 360 + ", 100%, 75%)";
}

const addNotes = () => {
  if (newNotes.value.length < 5) {
    return (errorMessage.value = "Characters should be above five or more");
  }
  addDoc(collection(db, "notes"), {
    text: newNotes.value,
    head: heading.value,
    favourite: false,
    date: Date.now(),
    backgroundColor: getRandomColor(),
  });
  newNotes.value = "";
  heading.value = "";
};

// delete notes
const deleteNotes = (id) => {
  deleteDoc(doc(collection(db, "notes"), id));
};

// get data
onMounted(() => {
  const user = auth.currentUser;
  if (user !== null) {
    userId.value = user.uid;
    email.value = user.email;
  }
  try {
    const q = query(collection(db, "notes"));
    onSnapshot(q, (querySnapshot) => {
      const getNotes = [];
      querySnapshot.forEach((doc) => {
        const note = {
          id: doc.id,
          text: doc.data().text,
          head: doc.data().head,
          favourite: doc.data().favourite,
          backgroundColor: doc.data().backgroundColor,
          date: doc.data().date,
        };
        getNotes.push(note);
      });
      notes.value = getNotes;
      notes.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
  } catch (err) {
    alert(err.message);
  }
});
// open editNotes modal
const editNotes = () => {
  return toggleEditModal();
};

// edit function
const saveNotes = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "notes"));
    querySnapshot.forEach(async (doc) => {
      await updateDoc(doc.ref, updateData);
    });
    toast.success("Notes updated successfully", {
      autoClosed: 1000,
    });
  } catch (error) {
      toast.error("Notes updated fail", {
      autoClosed: 1000,
    });
  }
};
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
          class="outline-none border-b-2 border-b-gray-400 w-72 p-2 font-bold"
        />
      </div>
      <div class="mb-12 pt-6">
        <label
          for="message"
          class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
          >Write your notes</label
        >
        <textarea
          v-model.trim="newNotes"
          id="message"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-600 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary focus:outline-none"
          placeholder="Your message..."
        ></textarea>
        <p class="text-red-500 font-semibold text-sm pt-2">
          {{ errorMessage }}
        </p>
      </div>

      <button
        :disabale="notes?.length === 0"
        class="mx-4 text-white bg-primary py-2 px-6 cursor-pointer"
      >
        ADD NOTE
      </button>
    </form>
  </NoteModal>

  <!-- end of NoteModal -->

  <!-- edit notes modal -->
  <EditModal :editModalActive="editModalActive" @close-modal="toggleEditModal">
    <h1 class="text-gray-600 text-xl font-semibold mb-4">Edit Notes</h1>
    <form @submit.prevent="saveNotes">
      <div class="mb-4">
        <input
          v-model.trim="updateData.head"
          type="text"
          placeholder="Enter your heading"
          class="outline-none border-b-2 border-b-gray-400 w-72 p-2 active:font-bold"
        />
      </div>
      <div class="mb-12 pt-6">
        <label
          for="message"
          class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
          >Write your notes</label
        >
        <textarea
          v-model.trim="updateData.text"
          id="message"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-600 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary focus:outline-none"
          placeholder="Your message..."
        ></textarea>
        <p class="text-red-500 font-semibold text-sm pt-2">
          {{ errorMessage }}
        </p>
      </div>

      <button class="mx-4 text-white bg-primary py-2 px-6 cursor-pointer">
        SAVE
      </button>
    </form>
  </EditModal>
  <!-- end of edit notes modal -->

  <Header />
  <div class="my-18 mx-6">
    <div v-if="!notes?.length" class="text-center my-40">
      <h2
        class="heading text-8xl first-letter:uppercase font-semibold tracking-wider text-secondary"
      >
        welcome back🤗
      </h2>
      <p class="my-4 text-secondary">
        Let us help you keep your important notes safe and secured
      </p>
      <button
        @click="toggleModal"
        class="bg-primary p-1 w-52 my-4 rounded-md text-white uppercase tracking-wider font-semibold transition transform hover:-translate-y-0.5"
      >
        create Notes
      </button>
    </div>
    <transition name="slide-fade">
      <div
        v-if="email.value === email.value"
        class="flex flex-wrap gap-10 justify-center pb-24 my-20"
      >
        <div
          v-for="note in notes"
          :key="note.id"
          :style="{ backgroundColor: note.backgroundColor }"
          class="flex flex-col w-80 h-auto rounded-md"
        >
          <div>
            <font-awesome-icon
              @click="deleteNotes(note.id)"
              :icon="['far', 'trash-can']"
              class="float-right text-xl mx-2 my-2 text-red-600 cursor-pointer"
            />
          </div>
          <h1 class="mx-3 font-bold text-lg pb-2 mt-3">{{ note.head }}</h1>
          <p class="mx-3 pb-6">
            {{ note.text }}
          </p>
          <h3 class="pb-4 mx-3 font-semibold text-gray-700">
            {{ note.date }}
          </h3>
          <div class="flex justify-between mx-2 mb-2">
            <div>
              <button
                @click="editNotes"
                class="text-white bg-primary w-12 rounded-md p-1"
              >
                Edit
              </button>
            </div>
            <button class="">Read</button>
          </div>
        </div>
        <font-awesome-icon
          v-if="notes?.length"
          @click="toggleModal"
          :icon="['fas', 'circle-plus']"
          beat
          class="pt-16 fa-2x text-primary cursor-pointer"
        />
      </div>
    </transition>
  </div>

  <footer v-if="notes?.length" class="text-center pb-4">
    <p class="text-secondary font-light">
      Made with
      <font-awesome-icon :icon="['fas', 'heart']" class="text-primary" />
      by coderpaul
    </p>
  </footer>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
