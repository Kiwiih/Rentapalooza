<script setup>
  import { ref, defineEmits, onBeforeMount } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  //Router
  const router = useRouter()
  //rutten för sidan:
  const route = useRoute()

  const searchInput = ref('')

  //emit för att beretta för förälder att sökningen har ändrats
  const emit = defineEmits(['changedSearchInput'])

  //////////// FUNKTIONER: //////////

  // skickar användaren till items-sidan och sätter queryParametrar i rutten
  // användbart om man söker via sökbaren men är på en annan sida förutom items-side-listan, exempelvis på HEM
  const loadSearchPageWithQueryParam = () => {
    router.push({ name: 'items', query: { q: searchInput.value } })
  }

  // ändrar queryParameter om vi är i item listvyn
  const changeQueryParam = (inputValue) => {
    if (route.name === 'items') {
      router.push({ query: { q: inputValue } })
    }
  }

  //////////////////////////////

  //detta händer bara om vi är på item list sidan-sidan:
  //inte om sökbaren monteras in i någon annan sida.
  onBeforeMount(() => {
    if (route.name === 'items') {
      console.log('Vi är i itemlist -sidan!')
      console.log('Ruttens namn:', route.name)
      console.log('Queryparameter är: ', route.query.q)

      searchInput.value = route.query.q
      // meddelar förälder vid start att sökning finns!
      emit('changedSearchInput', searchInput.value)
    }
  })
</script>

<template>
  <div class="search-bar">
    <form @submit.prevent="loadSearchPageWithQueryParam">
      <input
        type="text"
        placeholder="What do you want to rent?"
        v-model="searchInput"
        @input="
          (changeQueryParam(searchInput),
          emit('changedSearchInput', searchInput))
        "
      />
      <button class="button-primary" type="submit">
        <small>Search</small>
      </button>
    </form>
  </div>
</template>

<style scoped>
  .search-bar {
    width: 100%;
    max-width: 600px;
  }
  .search-bar form {
    display: flex;
  }

  .search-bar input {
    flex-grow: 1; /* Gör att input tar upp så mycket utrymme som möjligt */
    margin-bottom: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .search-bar button {
    min-width: 100px; /* Du kan justera den här om du vill ha knappen mindre eller större */
    white-space: nowrap; /* Säkerställer att texten på knappen inte bryts */
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
</style>
