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
    <h1>Listings</h1>
    <div class="head-container">
      <div class="filter-container">
        <h3>Filter:</h3>

        <button
          :class="
            selectedFilter === 'all' ? 'button-primary' : 'button-secondary'
          "
          @click="selectFilter('all')"
        >
          Show all
        </button>

        <button
          :class="
            selectedFilter === 'available'
              ? 'button-primary'
              : 'button-secondary'
          "
          @click="selectFilter('available')"
        >
          Available
        </button>

        <button
          :class="
            selectedFilter === 'unavailable'
              ? 'button-primary'
              : 'button-secondary'
          "
          @click="selectFilter('unavailable')"
        >
          Unavailable
        </button>
      </div>
    </div>

    <!-- LISTAN MED GREJJOR : -->
    <div class="item-list-container">
      <AvailableItems :selectedFilter="selectedFilter" />
    </div>
  </div>
</template>

<style scoped>
  h1 {
    font-size: 4rem;
    text-align: center;
  }

  h3 {
    margin-right: 1rem;
  }

  button {
    font-size: 1rem;
    font-weight: normal;
  }

  .head-container {
    width: 100%;
    text-align: center;
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
  }
  .filter-container {
    padding: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .item-list-container {
    padding: 1rem;
    width: 100%;
  }

  @media(max-width: 500px){

  .filter-container {
    flex-wrap: nowrap;
    width: 95vw;
  }

  button {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
}


</style>
