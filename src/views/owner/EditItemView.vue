<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  // VIKTORS KOD
  import { useItems } from '@/shared/useItems.js'
  // Anropa `useItems` för att få tillgång till `items` och `getItems`
  const { items, getItems } = useItems()
  //SLUT PÅ VIKTORS KOD

  //   funktion för att spara det uppdaterade itemet
  const saveChanges = (id) => {
    console.log('sparar')
    //uppdaterar det lokala objektet i items
    const index = items.value.findIndex((i) => i.id === item.value.id)
    if (index !== -1) {
      items.value[index] = { ...item.value }
    }
  }

  // funktion för att radera itemet
  const deleteItem = (id) => {
    console.log('raderar')
    //raderar det lokala objektet i items
    const index = items.value.findIndex((i) => i.id === item.value.id)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  //item som redigeras
  const item = ref(null)

  // för att få tillgång till route parametrar
  const route = useRoute()

  // fetcha items baserad på rutt
  const fetchItem = async () => {
    //hämta parameter id från url
    const id = route.params.id
    //väntar på att items ska laddas om de inte finns
    if (!items.value.length) {
      await getItems()
    }
    //Hitta rätt item baserat på id
    item.value = items.value.find((i) => i.id === id)
    if (!item.value) {
      console.error('Item ej hittad :()')
    }
  }

  onMounted(() => {
    fetchItem()
  })
</script>

<template>
  <!-- Formulär för att redigera till items -->
  <div v-if="item">
    <div class="edit-item-div">
      <h2>Redigera</h2>
      <input v-model="item.title" placeholder="namn" />
      <input v-model="item.description" placeholder="beskrivning" />
      <input v-model="item.price" placeholder="pris" />
      <input v-model="item.images" placeholder="bilder" />
      <button @click="saveChanges(item.id)">spara</button>
    </div>
    <button @click="deleteItem(item.id)" class="delete-button">
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
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
    </button>
  </div>
  <div v-else>
    <h3>Laddar saker och ting...🐨</h3>
  </div>
</template>
<style scoped>
  svg {
    width: 1em;
    color: rgb(0, 0, 0);
  }
  svg:hover {
    color: white;
  }
  .delete-button {
    background-color: rgb(246, 109, 109);
  }
  .delete-button:hover {
    background-color: rgb(183, 54, 54);
  }
</style>
