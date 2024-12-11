<script setup>
  import { useItems } from '@/shared/useItems.js'
  import { useAuth } from '@/shared/useAuth'
  import { onBeforeMount, defineProps, computed, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'

  import ItemListCard from './ItemListCard.vue'
  import ItemListCardSkeleton from './ItemListCardSkeleton.vue'
  import searchBar from './SearchBar.vue'

  const props = defineProps(['selectedFilter'])
  const route = useRoute()

  // Hämta variabel och funktion från useItems och useAuth
  const { items, getItems } = useItems()
  const { users, fetchUsers } = useAuth()
  const showNoItemsMessage = ref(false) //angör om meddelande om INGA ITEMS ska visas
  const searchQuery = ref('') //det användaren söker efter

  // Laddar in items från databasen:
  getItems()
  // ladda in users
  fetchUsers()

  const handleChangedSearchInput = (inputValue) => {
    searchQuery.value = inputValue
  }

  //***** FILTER *****/
  const filteredItems = computed(() => {
    let results = []

    // Filtrera items baserat på selectedFilter
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

  /**lyssnar på förändringar i filteritems för att avgöra om noItem-meddelande ska visas!**
    - Om filtereditems har 0 items så startar en timer som räknar ner till att visa ett noItem-meddelande.
    - Om det vid timerns slut fortfarande är 0 items i filtered items
      ... DÅ sätts showNoItemsMessage till true. så jag kan visa det i domen!
      ... annars sätts den till false 
    - detta för att meddelandet inte ska visas om det efter timerns slut faktiskt fyllts på med items...*/
  watch(filteredItems, (newFilteredItems) => {
    showNoItemsMessage.value = false // döljer direkt vid förändring
    if (newFilteredItems.length === 0) {
      // om 0 items starta timer...
      setTimeout(() => {
        //vid timerns slut...
        //... kollar av längden på filtered items och sätt meddelandets status
        if (filteredItems.value.length === 0) {
          showNoItemsMessage.value = true
        } else {
          showNoItemsMessage.value = false
        }
        // console.log(filteredItems.value.length)
        // console.log(showNoItemsMessage.value)
      }, 1000)
    }
  })
  // vidareutveckling: man skulle också kunna göra en initial körning av denna så fort sidan laddas in men nu körs den bara vid förändring i filtrerade resultat
</script>

<template>
  <!-- jsut  en bekräftande utskrift :)  -->
  <!-- {{ props.selectedFilter }} -->

  <!-- sökbaren fyller sökQueryn vad användaren sökte efter... -->
  <searchBar
    class="search-bar"
    @changedSearchInput="handleChangedSearchInput"
  />
  <br />
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
      <li v-for="index in 2" :key="index">
        <ItemListCardSkeleton />
        <hr />
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .search-bar {
    margin: auto;
  }
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
