<script setup>
  import { useItems } from '@/shared/useItems.js'
  import { useAuth } from '@/shared/useAuth'
  import { onBeforeMount, defineProps, computed, ref, watch } from 'vue'

  import ItemListCard from './ItemListCard.vue'
  import ItemListCardSkeleton from './ItemListCardSkeleton.vue'
  import searchBar from './searchBar.vue'

  // Hämta variabel och funktion från useItems
  const { items, getItems } = useItems()
  const { users, fetchUsers } = useAuth()

  const props = defineProps(['selectedFilter'])

  //variabel som reglerar om meddelande om INGA ITEMS ska visas:
  const showNoItemsMessage = ref(false)
  //variabel som håller de användaren söker eftr
  const searchQuery = ref('')

  const handleSearchQueryUpdate = (newSearchQuery) => {
    searchQuery.value = newSearchQuery // Uppdaterar värdet på searchQuery
  }

  // Laddar in items från databasen:
  getItems()
  // ladda in users
  fetchUsers()

  // Filtrera items baserat på selectedFilter

  const filteredItems = computed(() => {
    let results = []

    if (props.selectedFilter === 'available') {
      results = items.value.filter((item) => item.isAvailable)
    } else if (props.selectedFilter === 'unavailable') {
      results = items.value.filter((item) => !item.isAvailable)
    } else {
      results = items.value
    }

    // Filtrera baserat på searchQuery
    if (searchQuery.value.length > 0) {
      const query = searchQuery.value.toLowerCase().trim()

      results = results.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      )
    }

    return results
  })

  //lyssnar på filteritems....
  // om de gått 5 sekunder efter förändring och det fortfarade inte finns något i arrayen så sätts showNoItemsMessage till true. så jag kan visa det i domen :)
  watch(filteredItems, (newFilteredItems) => {
    //direkt vid förändring ska meddelandet döljas...
    showNoItemsMessage.value = false
    //..sen börjar timern....
    if (newFilteredItems.length === 0) {
      setTimeout(() => {
        showNoItemsMessage.value = true
      }, 5000)
    }
  })
</script>

<template>
  <!-- jsut  en bekräftande utskrift :)  -->
  <!-- {{ props.selectedFilter }} -->

  <!-- sökbaren gyller queryn med vad användaren sökte efter... -->
  <searchBar @updateSearchQuery="handleSearchQueryUpdate" />

  <!-- {{ filteredItems }} -->

  <div>
    <!-- Rendera Items -->
    <hr />
    <ul v-if="showNoItemsMessage === true">
      <li>
        <br />
        <h3>Nothing to see here! 😅</h3>
      </li>
    </ul>
    <ul v-else-if="filteredItems && filteredItems.length > 0">
      <li v-for="item in filteredItems" :key="item.id">
        <ItemListCard
          :item="item"
          :ownerName="
            users.length
              ? users.find((user) => user.id == item.ownerId).username
              : 'no one'
          "
        ></ItemListCard>
        <hr />
      </li>
    </ul>
    <ul v-else>
      loading...
      <li v-for="index in 3" :key="index">
        <ItemListCardSkeleton />
        <hr />
      </li>
    </ul>
  </div>
</template>

<style scoped>
  hr {
    border: none;
    border-top: 1px solid var(--color-border);
    height: 1px;
    background: none;
  }

  ul {
    list-style-type: none;
  }
</style>
