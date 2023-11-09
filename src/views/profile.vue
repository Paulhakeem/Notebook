<script setup>
import { ref } from "vue"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import Header from "../components/Header.vue"
import {useProfileStore} from '../store/user.js'
import { useLoginStore } from "../store/login.js"

const login = useLoginStore()
const useProfile = useProfileStore()
const photoURL = ref(null)
const name = ref(null)
const email = ref(null)

const auth = getAuth()


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
    <p class="font-semibold pt-4 tracking-wider text-gray-700">My Profile</p>
    <div class="pt-14 flex justify-center text-center m-auto mb-6">
      <img
        :src="photoURL"
        alt="profile"
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

    <form v-for="user in useProfile.userProfile"
    class="mx-4 pb-4 my-10">
      <div class="flex">
        <div class="flex flex-wrap mx-3 gap-8 w-4/5">
          <div class="my-6">
            <p class="text-left text-gray-400 font-medium">Country</p>
            <span class="text-left text-gray-600">{{ user.country }}</span>
          </div>
        </div>
        <div class="flex flex-wrap mx-3 gap-8 w-4/5">
          <div class="my-6">
            <p class="text-left text-gray-400 font-medium">City</p>
            <span class="text-left text-gray-600">{{ user.city }}</span>
          </div>
        </div>
      </div>
      <div class="text-left mx-3">
        <p class="text-gray-400">Date of birth(optional)</p>
      </div>
      <div class="flex">
        <div class="flex flex-wrap mx-3 gap-2">
          <div class="flex my-6 gap-4">
            <p class="text-left text-gray-400 font-medium">Date</p>
            <span class="text-left text-gray-600"> {{ user.date }}</span>
          </div>
        </div>
        <div class="flex flex-wrap mx-3">
          <div class="flex my-6 gap-4">
            <p class="text-left text-gray-400 font-medium">Month</p>
            <span class="text-left text-gray-600"> {{ user.month }}</span>
          </div>
        </div>
        <div class="flex flex-wrap mx-3">
          <div class="flex my-6 gap-4">
            <p class="text-left text-gray-400 font-medium">Year</p>
            <span class="text-left text-gray-600"> {{ user.year }}</span>
          </div>
        </div>
      </div>
    </form>

    <div class="mx-6 pb-4">
        <p class="text-primary cursor-pointer font-light text-md first-letter:uppercase hover:text-[#393333]">switch to other account</p>
        <button 
        @click="login.logOut"
        class="first-letter:uppercase font-medium mt-2 cursor-pointer hover:text-primary">
            log Out
        </button>
    </div>
  </div>
</template>
