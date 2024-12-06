<script setup>
import AvailableItems from "@/components/AvailableItems.vue"
</script>

<template>

  <h2>STUFF TO RENT</h2>
  This is a list of stuff
  <div class="item-list-container">
    <AvailableItems />
  </div>
</template>

<style scoped>
.item-list-container {
  padding: 1rem
}
</style>
