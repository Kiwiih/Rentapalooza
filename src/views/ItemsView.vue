<script setup>
import { ref } from 'vue'

import AvailableItems from "@/components/AvailableItems.vue"


// håller koll på aktivt filter:
const selectedFilter = ref("all")
// ändrar viltrets värde
function selectFilter(filterValue) {
  selectedFilter.value = filterValue;
}

</script>

<template>


  <h2>STUFF TO RENT</h2>
  <p>This is a list of stuff</p>

  <div class="filter-container">
    <h3>Filter:</h3>

    <button :class="selectedFilter === 'all' ? 'button-primary' : 'button-secondary'" @click="selectFilter('all')">
      Show all
    </button>

    <button :class="selectedFilter === 'available' ? 'button-primary' : 'button-secondary'"
      @click="selectFilter('available')">
      Available
    </button>

    <button :class="selectedFilter === 'unavailable' ? 'button-primary' : 'button-secondary'"
      @click="selectFilter('unavailable')">
      Unavailable
    </button>
  </div>


  <!-- LISTAN MED GREJJOR : -->
  <div class="item-list-container">
    <AvailableItems :selectedFilter="selectedFilter" />
  </div>
</template>

<style scoped>
button {
  font-size: smaller;
  font-weight: normal;
}

.filter-container {
  padding: 0.5rem;
  /* background-color: aqua; */
  display: flex;
  align-items: center;
  gap: 1rem;
}

.item-list-container {
  padding: 1rem
}
</style>
