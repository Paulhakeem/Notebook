<script setup>
import { ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
  <div
    class="text-center justify-center max-w-md bg-secondary m-auto my-12 h-auto rounded-lg"
  >
    <p class="font-semibold pt-4 tracking-wider text-gray-700">My Profile</p>
    <div class="pt-14 flex justify-center text-center m-auto mb-6">
      <img
        :src="photoURL"
        alt=""
        class="rounded-full border-t-8 border-primary"
      />
    </div>
    <p class="text-left mx-6 text-gray-400 font-medium">My status</p>
    <div class="flex flex-wrap text-center justify-center pt-4 gap-4">
      <button
        class="bg-primary first-letter:uppercase text-secondary p-2 w-28 rounded-full hover:text-primary hover:bg-secondary hover:border-2 hover:border-primary"
      >
        away
      </button>
      <button
        class="bg-[#59bd7d] first-letter:uppercase text-secondary p-2 w-28 rounded-full hover:text-[#59bd7d] hover:bg-secondary hover:border-2 hover:border-[#59bd7d]"
      >
        away
      </button>
      <button
        class="bg-[#21242d] first-letter:uppercase text-secondary p-2 w-28 rounded-full hover:text-[#21242d] hover:bg-secondary hover:border-2 hover:border-[#21242d]"
      >
        away
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

    <form class="mx-4 pb-4 my-10">
      <div class="flex">
        <div class="flex flex-wrap mx-3 gap-8 w-4/5">
          <div class="my-6">
            <p class="text-left text-gray-400 font-medium">Country</p>
            <input
              type="text"
              class="outline-none text-[#393333] border-b-2 border-b-gray-400 font-light border-b-text-[#393333] pl-2 caret-gray-300 focus:border-b-primary bg-secondary"
            />
          </div>
        </div>
        <div class="flex flex-wrap mx-3 gap-8 w-4/5">
          <div class="my-6">
            <p class="text-left text-gray-400 font-medium">City</p>
            <input
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
              type="text"
              placeholder=""
              class="w-14 outline-none text-[#393333] border-b-2 border-b-gray-400 font-light border-b-text-[#393333] pl-2 caret-gray-300 focus:border-b-primary bg-secondary"
            />
          </div>
        </div>
        <div class="flex flex-wrap mx-3">
          <div class="flex my-6 gap-4">
            <input
              type="text"
              placeholder=""
              class="bg-secondary w-32 outline-none text-[#393333] border-b-2 font-light border-b-text-[#393333] pl-2 caret-gray-300 focus:border-b-primary border-b-gray-400"
            />
          </div>
        </div>
        <div class="flex flex-wrap mx-3">
          <div class="flex my-6 gap-4">
            <input
              type="text"
              placeholder=""
              class="bg-secondary w-14 outline-none text-[#393333] border-b-2 font-light border-b-text-[#393333] pl-2 caret-gray-300 focus:border-b-primary border-b-gray-400"
            />
          </div>
        </div>
      </div>
    </form>

    <div class="mx-6 pb-4">
        <p class="text-primary cursor-pointer font-light text-md first-letter:uppercase hover:text-[#393333]">switch to other account</p>
        <button class="first-letter:uppercase font-medium mt-2 cursor-pointer hover:text-primary">
            log Out
        </button>
    </div>
  </div>
</template>
