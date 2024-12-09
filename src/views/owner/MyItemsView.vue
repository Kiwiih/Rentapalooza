<script setup>
  //*____________________________________________________________*//
  //* JUST NU KAN MAN SE ALLAS ITEMS, INTE FÖR SPECIFIKA ÄGARE   *//
  //*____________________________________________________________*//

  import { RouterLink } from 'vue-router'
  import { onMounted } from 'vue'
  import EditItemView from './EditItemView.vue'

  // VIKTORS KOD
  import { useItems } from '@/shared/useItems.js'
  // Anropa `useItems` för att få tillgång till `items` och `getItems`
  const { items, getItems } = useItems()
  //SLUT PÅ VIKTORS KOD

  onMounted(async () => {
    await getItems()
  })

  // const items = [
  //   { id: 1, name: 'Item 1', price: 100 },
  //   { id: 2, name: 'Item 2', price: 200 },
  //   { id: 3, name: 'Item 3', price: 300 }
  // ]

  console.log(items.value)
  console.log(getItems)
</script>
<template>
  <h2>Alla mina saker för uthyrning</h2>
  <!-- Rendera en lista med varor -->
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.title }}, {{ item.description }}, {{ item.price }},
      {{ item.category }}, {{ item.images }}
      <!-- Länk till redigera-sidan för varan -->
      <RouterLink :to="{ name: 'editItem', params: { id: item.id } }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped>
  svg {
    width: 1em;
    color: black;
  }
</style>
