<script setup>
import { ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Header from "../components/Header.vue";
import {useProfileStore} from '../store/user.js'



const useProfile = useProfileStore()

const photoURL = ref(null);
const name = ref(null);
const email = ref(null);

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    photoURL.value = user.photoURL;
    name.value = user.displayName;
    email.value = user.email;
  } else {
    photoURL.value = null;
    name.value = null;
    email.value = null;
  }
});


</script>
<template>
    <Header/>
  <div
    class="text-center justify-center max-w-md bg-secondary m-auto my-12 h-auto rounded-lg select-none"
  >
    <p class="font-semibold pt-4 tracking-wider text-gray-700">Edit Profile</p>
    <div class="pt-14 flex justify-center text-center m-auto mb-6">
      <img
        :src="photoURL"
        alt=""
        class="rounded-full border-t-8 border-primary"
      />
    </div>
    <p class="text-left mx-6 text-gray-400 font-medium">My status</p>
    <div class="flex text-center justify-center pt-4 gap-4 mx-2">
      <button
        class="bg-primary first-letter:uppercase text-secondary p-2 w-28 rounded-full hover:text-primary hover:bg-secondary hover:border-2 hover:border-primary"
      >
      <font-awesome-icon :icon="['fas', 'face-smile']" class="text-yellow-500"/>
        Away
      </button>
      <button
        class="bg-[#59bd7d] first-letter:uppercase text-secondary p-2 w-28 rounded-full hover:text-[#59bd7d] hover:bg-secondary hover:border-2 hover:border-[#59bd7d]"
      >
      <font-awesome-icon :icon="['fas', 'briefcase']" class="text-[#21242d]"/>
        Work
      </button>
      <button
        class="bg-[#21242d] first-letter:uppercase text-secondary p-2 w-28 rounded-full hover:text-[#21242d] hover:bg-secondary hover:border-2 hover:border-[#21242d]"
      >
      <font-awesome-icon :icon="['fas', 'gamepad']" class="" />
        Gaming
      </button>
    </div>
    <div class="text-center my-6 flex justify-between mx-6">
      <div>
        <p class="text-left text-gray-400 font-medium">Name</p>
        <span class="font-normal text-gray-600">{{ name }}</span>
      </div>
      <div>
        <p class="text-left text-gray-400 font-medium">Email</p>
        <span class="font-normal text-gray-600">{{ email }}</span>
      </div>
    </div>

    <form @submit.prevent="useProfile.userInfor"
    class="mx-4 pb-4 my-10">
    <div>
      <div class="flex">
        <div class="flex flex-wrap mx-3 gap-8 w-4/5">
          <div class="my-6">
            <p class="text-left text-gray-400 font-medium">Country</p>
            <input
              v-model="useProfile.country"
              type="text"
              class="outline-none text-[#393333] border-b-2 border-b-gray-400 font-light border-b-text-[#393333] pl-2 caret-gray-300 focus:border-b-primary bg-secondary"
            />
          </div>
        </div>
        <div class="flex flex-wrap mx-3 gap-8 w-4/5">
          <div class="my-6">
            <p class="text-left text-gray-400 font-medium">City</p>
            <input
            v-model="useProfile.city"
              type="text"
              class="bg-secondary w-full outline-none text-[#393333] border-b-2 font-light border-b-text-[#393333] pl-2 caret-gray-300 focus:border-b-primary border-b-gray-400"
            />
          </div>
        </div>
      </div>
      <div class="text-left mx-4">
        <p class="text-gray-400">Date of birth(optional)</p>
      </div>
      <div class="flex">
        <div class="flex flex-wrap mx-3 gap-2">
          <div class="flex my-6 gap-4">
            <input
              v-model="useProfile.date"
              type="text"
              placeholder="DD"
              class="w-14 outline-none text-[#393333] border-b-2 border-b-gray-400 font-light border-b-text-[#393333] pl-2 caret-gray-300 focus:border-b-primary bg-secondary"
            />
          </div>
        </div>
        <div class="flex flex-wrap mx-3">
          <div class="flex my-6 gap-4">
            <input
            v-model="useProfile.month"
              type="text"
              placeholder="MM"
              class="bg-secondary w-32 text-center outline-none text-[#393333] border-b-2 font-light border-b-text-[#393333] pl-2 caret-gray-300 focus:border-b-primary border-b-gray-400"
            />
          </div>
        </div>
        <div class="flex flex-wrap mx-3">
          <div class="flex my-6 gap-4">
            <input
              v-model="useProfile.year"
              type="text"
              placeholder="YYYY"
              class="bg-secondary w-14 outline-none text-[#393333] border-b-2 font-light border-b-text-[#393333] pl-2 caret-gray-300 focus:border-b-primary border-b-gray-400"
            />
          </div>
        </div>
      </div>
      </div>

      <div class="mx-6">
        <button
        class="bg-[#21242d] mb-4 first-letter:uppercase text-secondary p-2 w-28 rounded-full"
      >
        Save
      </button>
        <p class="text-primary cursor-pointer font-light text-md first-letter:uppercase hover:text-[#393333]">switch to other account</p>
        <button class="first-letter:uppercase font-medium mt-2 cursor-pointer hover:text-primary">
            log Out
        </button>
    </div>
    </form>
  </div>
</template>
