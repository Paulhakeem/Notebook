<script setup>
defineEmits(["close-modal"])
defineProps({
        editModalActive: {
        type: Boolean,
        default: false,
    }
})
</script>
<template>
    <Transition name="fade">
    <div 
    v-show="editModalActive"
    class="absolute w-full z-50 bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8">
    <transition name="slide-fade">
        <div 
        v-if="editModalActive"
        class="p-4 bg-white self-start mt-32 w-96 rounded-md">
            <button
             @click="$emit('close-modal')"
             class="text-white bg-gray-400 py-2 cursor-pointer float-right w-12 rounded-md">X</button>
            <slot/>
           
        </div>
    </transition>
      
    </div>
    </Transition>
   
</template>


<style scoped>
.fade-enter-active {
  transition: all 0.3s ease-out;
}
.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

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