<template>
    <div>
  <!-- edit notes modal -->
   <EditModal >
    <h1 class="text-gray-600 text-xl font-semibold mb-4">Take Notes</h1>
    <form >
      <div class="mb-4">
        <input
          type="text"
          placeholder="Enter your heading"
          class="outline-none border-b-2 border-b-gray-400 w-72 p-2"
        />
      </div>
      <div class="mb-12 pt-6">
        <label
          for="message"
          class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
          >Write your notes</label
        >
        <textarea
          id="message"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-600 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary focus:outline-none"
          placeholder="Your message..."
        ></textarea>
        <p class="text-red-500 font-semibold text-sm pt-2">
        </p>
      </div>

      <button
        class="mx-4 text-white bg-primary py-2 px-6 cursor-pointer"
      >
        SAVE
      </button>
    </form>
  </EditModal>
  <!-- end of edit notes modal -->
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>