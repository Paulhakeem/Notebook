<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useLoginStore } from '../store/login.js'

const login = useLoginStore()
const photoURL = ref(null)
const name = ref(null)

const auth = getAuth()
onAuthStateChanged(auth, (user) => {
      if (user) {
        photoURL.value = user.photoURL;
        name.value = user.displayName;
      } else {
        photoURL.value = null;
        name.value = null;
      }
    });
</script>

<template>
     <div class="flex justify-between mt-4 mx-6">
    <h2 class="text-xl mx-2 my-2 font-semibold text-secondary">
      <font-awesome-icon :icon="['fas', 'book']" class="text-primary"/>
      Note Book</h2>

    <div class=" w-56 text-right">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="inline-flex w-10 h-10 justify-center bg-primary rounded-full px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
       p
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <RouterLink to="/">
              <button
                :class="[
                  active ? 'bg-primary text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
              <font-awesome-icon 
              :class="[
                  active ? 'bg-primary text-white' : 'text-gray-900',
                  'px-2 py-2',
                ]"
              :icon="['fas', 'house']"/>
             Home
              </button>
            </RouterLink>
            </MenuItem>

            <MenuItem v-slot="{ active }">
              <RouterLink to="/profile">
              <button
                :class="[
                  active ? 'bg-primary text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
              <font-awesome-icon 
              :class="[
                  active ? 'bg-primary text-white' : 'text-gray-900',
                  'px-2 py-2',
                ]"
              :icon="['fas', 'user']"/>
             My Profile
              </button>
            </RouterLink>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <RouterLink to="/edit">
              <button
                :class="[
                  active ? 'bg-primary text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
              <font-awesome-icon 
              :class="[
                  active ? 'bg-primary text-white' : 'text-gray-900',
                  'px-2 py-2',
                ]"
              :icon="['fas', 'pen']"/>
             Edit Profile
              </button>
            </RouterLink>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-primary text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
              <font-awesome-icon 
              :class="[
                  active ? 'bg-primary text-white' : 'text-gray-900',
                  'px-2 py-2',
                ]"
              :icon="['fas', 'crown']" />
               Favourite notes
              </button>
            </MenuItem>
          </div>
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-primary text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
              <font-awesome-icon 
              :class="[
                  active ? 'bg-primary text-white' : 'text-gray-900',
                  'px-2 py-2',
                ]"
              :icon="['fas', 'gear']" />
                Settings
              </button>
            </MenuItem>
          </div>

          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
              @click="login.logOut"
                :class="[
                  active ? 'bg-primary text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
              <font-awesome-icon 
              :class="[
                  active ? 'bg-primary text-white' : 'text-gray-900',
                  'px-2 py-2',
                ]"
              :icon="['fas', 'right-from-bracket']" />
               Logout
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
  </div>

</template>