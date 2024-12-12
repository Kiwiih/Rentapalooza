<script setup>
  import { ref, defineEmits } from 'vue'

  const searchQuery = ref('')
  const emit = defineEmits(['updateSearchQuery'])

  const handleInput = (event) => {
    console.log('Input value:', event.target.value)
    console.log('sökQuery', searchQuery.value)
    //skickar upp data til moderkomponenten
    // emit, (eventnamn, data)
    emit('updateSearchQuery', searchQuery.value)
  }

  // skicka upp söksträngen till moderkomponent
  // defineEmits(['searchQuery'])
</script>

<template>
  <div class="search-bar">!!!sökbar som inte ska finnas!!!</div>
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
