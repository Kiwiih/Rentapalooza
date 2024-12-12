<script setup>
  import { ref, defineEmits } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const searchQuery = ref('') // denna ör kopplad till inoutrutans värde med v-model

  const emit = defineEmits(['updateSearchQuery'])

  //skickar upp data til moderkomponenten användaren ändrar input
  const handleSearchInput = (event) => {
    // console.log('Input value:', event.target.value)
    // console.log('sökQuery', searchQuery.value)

    // syntax: emit, (eventnamn, data)
    emit('updateSearchQuery', searchQuery.value)
  }

  // skicka upp söksträngen till moderkomponent
  // defineEmits(['searchQuery'])

  const handleSearchSubmit = () => {
    console.log('enter klacks')
    router.push({ name: 'items', query: { q: searchQuery.value } })
  }
</script>

<template>
  <form class="search-bar" @submit.prevent="handleSearchSubmit">
    <input
      type="text"
      placeholder="What do you want to rent?"
      v-model="searchQuery"
      required
      @input="handleSearchInput"
    />
    <button type="submit" class="button-primary">Search</button>
  </form>
</template>

<style scoped>
  .search-bar {
    display: flex;
    max-width: 600px;
    /* gap: 1rem; */
    margin: 1rem auto;
  }

  .search-bar input {
    flex-grow: 1;
    margin-bottom: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .search-bar button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
</style>
