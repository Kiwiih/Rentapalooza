<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import axios from 'axios'

  const goToMyItems = () => {
    router.push('/owner/my-items')
  }
  // VIKTORS KOD
  import { useItems } from '@/shared/useItems.js'
  // Anropa `useItems` för att få tillgång till `items` och `getItems`
  const { items, getItems } = useItems()
  //SLUT PÅ VIKTORS KOD

  // för att få tillgång till route parametrar
  const route = useRoute()
  //ska avnändas för omderigering
  const router = useRouter()

  const message = ref('')
  const showMessage = ref(false)
  const isLoading = ref(false)

  const categories = [
    'Vehicles',
    'Real Estate',
    'Home & Living',
    'Electronics',
    'Leisure & Hobby',
    'Jobs',
    'Business',
    'Personal Items',
    'Other'
  ]

  const handleSave = async (item) => {
    try {
      saveChanges(item.id)
      isLoading.value = true
      setTimeout(() => {
        isLoading.value = false
        message.value = 'Item edited successfully.'
        showMessage.value = true
      }, 1000)

      setTimeout(() => {
        showMessage.value = false
      }, 3000)
    } catch (err) {
      console.log('hej error', err)
    }
  }

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

  const toggleCategory = (category) => {
    const index = item.value.category.indexOf(category)
    if (index > -1) {
      // Kategorin är redan vald, ta bort den
      item.value.category.splice(index, 1)
    } else {
      // Lägg till kategorin om den inte finns
      item.value.category.push(category)
    }
  }

  //varaibler så jhag slipper repetera kod i savechanges och deletefunktionerna
  const url = import.meta.env.VITE_API_ITEMS_URL
  const headers = {
    'X-Master-Key': import.meta.env.VITE_API_X_MASTER_KEY,
    'Content-Type': 'application/json'
  }

  //   funktion för att spara det uppdaterade itemet
  const saveChanges = async () => {
    //funktion för att filtrera bort tomma bild-url-fältgrejsimojser
    item.value.images = item.value.images.filter((url) => url.trim() !== '')

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

  const addInputImageUrl = () => {
    item.value.images.push('') // Lägg till en tom sträng i `images`-arrayen
  }

  onMounted(() => {
    fetchItem()
  })
</script>

<template>
  <!-- Formulär för att redigera till items -->
  <div v-if="item" class="container">
    <div class="edit-item-div">
      <button @click="goToMyItems" class="secondary back-button">
        Back to my items
      </button>
      <h2>Edit item</h2>
      Title:
      <input v-model="item.title" placeholder="Title..." />
      Description:
      <input v-model="item.description" placeholder="Description..." />
      Price:
      <input v-model="item.price" placeholder="Price..." />
      <h2 class="categoryH2">Edit categories</h2>
      <div class="categoryDiv">
        <div v-for="category in categories" :key="category">
          <label>
            <input
              type="checkbox"
              :value="category"
              :checked="item.category.includes(category)"
              @change="toggleCategory(category)"
            />
            {{ category }}
          </label>
        </div>
      </div>
      <!-- SEKTION för BILDER -->
      <h3>Edit images</h3>
      <div v-for="(image, index) in item.images" :key="index">
        <input v-model="item.images[index]" placeholder="Image url..." />
      </div>
      <button @click="addInputImageUrl">Add new url</button>
      <!-- <input
        v-model="item.images[item.images.length]"
        placeholder="url for new picture "
      /> -->
      <b><p>Leave the url-input blank to delete an image 🐨</p></b>

      <div class="save-and-delete">
        <button @click="handleSave(item)" :class="{ 'loading-btn': isLoading }">
          Save
        </button>

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
      <div v-if="showMessage" class="message">
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
  <div v-else>
    <h3>Loading shits and giggles...🐨</h3>
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

  .message {
    color: var(--color-success);
    text-align: end;
  }

  .categoryDiv {
    display: flex;
    flex-direction: row;
    padding: 1rem;
    gap: 1rem;
  }

  .categoryH2 {
    margin: 1.5rem 0 0 0;
  }
</style>
