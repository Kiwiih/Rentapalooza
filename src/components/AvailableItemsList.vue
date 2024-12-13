<script setup>
  import { useItems } from '@/shared/useItems.js'
  import { useAuth } from '@/shared/useAuth'
  import { onBeforeMount, defineProps, computed, ref, watch } from 'vue'

  import ItemListCard from './ItemListCard.vue'
  import ItemListCardSkeleton from './ItemListCardSkeleton.vue'
  import searchBar from './searchBar.vue'
  import BarForSearch from './BarForSearch.vue'

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

  // function that reverse any array you want
  const reverseArray = (arr) => {
    return arr.slice().reverse()
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

    // Reverse array filled with items
    results = reverseArray(results)

    return results
  })

  // lyssnar på förändring i filtered items för att eventuelllt isa meddelande om NO ITEMS
  watch(filteredItems, (newFilteredItems) => {
    //direkt vid förändring i filtered items ska meddelandet döljas...
    showNoItemsMessage.value = false
    //..sen börjar timern....
    // console.log(filteredItems.value.length)
    if (newFilteredItems.length === 0) {
      showNoItemsMessage.value = false //innitialt visas meddelandet inte
      //Startar timer för att eventuellt visa NOITEMS-meddelande
      setTimeout(() => {
        // När timern gått ut... gör ny definitiv check och sätt värde.
        // detta för att länden kan va något annat än den var då timern startade.(så de inte randomly ,när timern gått ut, visas meddelande im noItems.)
        filteredItems.value.length <= 0
          ? (showNoItemsMessage.value = true)
          : (showNoItemsMessage.value = false)
        // console.log('showNoItemsMessage: ', showNoItemsMessage.value)
      }, 1500)
    }
  })
</script>

<template>
  <!-- jsut  en bekräftande utskrift :)  -->
  <!-- {{ props.selectedFilter }} -->

  <!-- sökbaren fyller queryn med vad användaren sökte efter... -->
  <BarForSearch @updateSearchQuery="handleSearchQueryUpdate" />
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
              ? users.find((user) => user.id == item.ownerId)?.username
              : 'no one'
          "
        ></ItemListCard>
        <hr />
      </li>
    </ul>
    <ul v-else>
      Loading...
      <li v-for="index in 3" :key="index">
        <ItemListCardSkeleton />
        <hr />
      </li>
    </ul>
  </div>
</template>

<style scoped>
  hr {
    border-width: 2px;
    border-style: solid;
    border-image: repeating-linear-gradient(
        45deg,
        rgb(255, 255, 255),
        rgb(255, 255, 255) 2px,
        black 2px,
        black 4px
      )
      2;
  }

  ul {
    list-style-type: none;
  }
</style>
