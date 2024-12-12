<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import axios from 'axios'

  // VIKTORS KOD
  import { useItems } from '@/shared/useItems.js'
  // Anropa `useItems` för att få tillgång till `items` och `getItems`
  const { items, getItems } = useItems()
  //SLUT PÅ VIKTORS KOD

  // för att få tillgång till route parametrar
  const route = useRoute()
  //ska avnändas för omderigering
  const router = useRouter()

  //item som redigeras
  const item = ref(null)
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

  //varaibler så jhag slipper repetera kod i savechanges och deletefunktionerna
  const url = 'https://api.jsonbin.io/v3/b/6751aef2e41b4d34e46057f5'
  const headers = {
    'X-Master-Key': import.meta.env.VITE_API_X_MASTER_KEY,
    'Content-Type': 'application/json'
  }

  //   funktion för att spara det uppdaterade itemet
  const saveChanges = async () => {
    //Skapar en ny lsita med uppdaterade itemet, så de ersätter de gamla
    const updatedItems = items.value.map((i) =>
      i.id === item.value.id ? { ...item.value } : i
    )
    //Skickar den uppdaterade listan till jsonvin via put
    const response = await axios.put(url, { items: updatedItems }, { headers })

    console.log('Sparat! 🐰')
  }

  // funktion för att radera itemet
  const deleteItem = async (id) => {
    //Checka så att itemet finns, typ som om man redan raderat det men är kvar på sidan
    if (!item.value) {
      console.error('itemet finns inte!')
      return
    }
    //filtrera bort det item som ska raderas, så det skapas en ny lista som ska skickas upp till jsonBin
    const updatedItems = items.value.filter((i) => i.id !== item.value.id)
    //Skickar den uppdaterade listan till jsonvin via put
    const response = await axios.put(url, { items: updatedItems }, { headers })
    //Detta ska göra som man hamnar på föregående sida igen,
    router.push({ name: 'myItems' })
    console.log('skiten är borta!')
  }
  //funktion för att ta bort en bild (då det är i en array)
  const removeImage = (index) => {
    item.value.images.splice(index, 1)
    //Spara ändringarna direkt så det inte försvinner om man glömmer klicka
    saveChanges()
  }
  //funktion för att lägga till en bild (då det är i en array)
  const addImage = () => {
    item.value.images.push('')
    //Spara ändringarna direkt så det inte försvinner om man glömmer klicka
    saveChanges()
  }

  onMounted(() => {
    fetchItem()
  })
</script>

<template>
  <!-- Formulär för att redigera till items -->
  <div v-if="item" class="container">
    <div class="edit-item-div">
      <h2>Redigera item</h2>
      <input v-model="item.title" placeholder="namn" />
      <input v-model="item.description" placeholder="beskrivning" />
      <input v-model="item.price" placeholder="pris" />
      <!-- SEKTION FÖR ATT LÄGGA TILL/TA BORT BILDER -->
      <h3>Bilder</h3>
      <div v-for="(image, index) in item.images" :key="index">
        <input v-model="item.images[index]" placeholder="bild url" />
        <button @click="removeImage(index)">Ta bort</button>
        <button @click="addImage">Lägg till</button>
      </div>

      <div class="save-and-delete">
        <button @click="saveChanges(item.id)">spara</button>

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
    </div>
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

  h2 {
    margin: 1em;
  }
  svg {
    width: 2em;
    color: black;
  }
  li {
    border: 2px solid black;
    border-radius: 10px;
    margin-bottom: 0.5em;
    padding: 1em;
    margin: 1em;
  }
  ul {
    text-decoration: none;
  }
  button {
    margin-right: 1em;
    margin-bottom: 1em;
  }
  .save-and-delete {
    display: flex;
    justify-content: flex-end;
  }
</style>
