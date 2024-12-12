<script setup>
  import HeaderComponent from './components/layout/HeaderComponent.vue'
  import FooterComponent from './components/layout/FooterComponent.vue'
  import { useItems } from './shared/useItems'
  import { onMounted } from 'vue'
  import { useRentals } from './shared/useRentals'
  import refreshItemAvailability from '@/utils/itemAvailability'

  const { rentals, fetchRentals } = useRentals()
  const { items, getItems, updateItems } = useItems()

  onMounted(async () => {
    // If there's not any items och rentals, then fetch!
    if (!items.length || !rentals.length) {
      await getItems()
      await fetchRentals()
    }

    // update availability of items depend on if rental date has expired
    updateItems(refreshItemAvailability(items, rentals))
  })
</script>

<template>
  <div class="layout">
    <HeaderComponent />
    <main class="container container-backdrop">
      <RouterView />
    </main>
    <FooterComponent />
  </div>
</template>

<style scoped>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  footer {
    background-color: var(--color-bg-alt);
    color: var(--color-text-muted);
    padding: 1rem 0;
    text-align: center;
  }
</style>
