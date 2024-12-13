<script setup>
  import { ref } from 'vue'

  import AvailableItems from '@/components/AvailableItemsList.vue'

  // håller koll på aktivt filter:
  const selectedFilter = ref('all')
  // ändrar viltrets värde
  function selectFilter(filterValue) {
    selectedFilter.value = filterValue
  }
</script>

<template>
<div>
  <div class="head-container">
    <!-- <h2>STUFF TO RENT</h2> -->
    <!-- <p>This is a list of stuff</p> -->
  </div>

  <div class="filter-container">
    <h3>Filter:</h3>

    <button
      :class="selectedFilter === 'all' ? 'button-primary' : 'button-secondary'"
      @click="selectFilter('all')"
    >
      Show all
    </button>

    <button
      :class="
        selectedFilter === 'available' ? 'button-primary' : 'button-secondary'
      "
      @click="selectFilter('available')"
    >
      Available
    </button>

    <button
      :class="
        selectedFilter === 'unavailable' ? 'button-primary' : 'button-secondary'
      "
      @click="selectFilter('unavailable')"
    >
      Unavailable
    </button>
  </div>

  <!-- LISTAN MED GREJJOR : -->
  <div class="item-list-container">
    <AvailableItems :selectedFilter="selectedFilter" />
  </div>
  </div>
</template>

<style scoped>
  h3{
    margin-right: 1rem;
  }

  button {
    font-size: smaller;
    font-weight: normal;
  }

  .head-container {
    text-align: center;
    margin-top: 1rem;
  }
  .filter-container {
    padding: 0.5rem;
    /* background-color: aqua; */
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .item-list-container {
    padding: 1rem;
  }
</style>
