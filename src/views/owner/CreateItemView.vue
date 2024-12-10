<script setup>
// jag måste hämta items för att kunna lägga till nytt item i det.

import { useAuth } from '@/shared/useAuth'
import { reactive } from 'vue';
const { currentUser } = useAuth()

const inputData = reactive({
  id: "", // måste skapa id till item?
  title: "",
  description: "",
  price: "",
  category: [],
  images: ["", "", ""],
  isAvailable: true,
  ownerId: currentUser.value.id,
  currentRentalId: null,
  renterId: null,
})

const categories = [
  "Vehicles",
  "Real Estate",
  "Home & Living",
  "Electronics",
  "Leisure & Hobby",
  "Jobs",
  "Business",
  "Personal Items",
  "Other"
];

</script>

<template>
  <div class="createItem">
    <h1>Add new item to rent out</h1>
    <p v-if="currentUser">Nuvarande användarid är {{ currentUser.id }}</p>

    <div class="form">
    <label for="title">Item title</label>
    <input type="text" id="title" placeholder="Add a title here.." v-model="inputData.title">
    
    <label for="description">Item description</label>
    <input type="text" placeholder="Add a description here.." id="description" v-model="inputData.description">

    <label for="price">Item price</label>
    <input type="number" placeholder="Add a price here.." id="price" v-model="inputData.price">

    <label for="category">Item category</label>
    <div v-for="c in categories" :key="c" class="categoryDiv">
      <label for="category" class="categoryLabel">{{ c }}</label>
      <input
        type="checkbox"
        :value="c"
        :id="c"
        v-model="inputData.category"
      />
    </div>

    <label for="images">Item images</label>
      <div v-for="(image, index) in inputData.images" :key="index">
      <input type="url" v-model="inputData.images[index]" :placeholder="'Image URL ' + (index + 1)" />
      </div>


    </div>
  </div>
</template>

<style scoped>
.createItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem;
  gap: 1rem;
}

.form {
  width: 50%;
}

.categoryDiv {
  display: flex;
  flex-direction: row;
  margin: 0.4rem;
  width: 50%
}

.categoryLabel {
  width: 100%
}

input:focus,
textarea:focus,
select:focus {
  border-color: transparent;
  box-shadow: none;
}
</style>

<!-- {
  "id": "1",
  "title": "Item namn",
  "description": "Beskrivning",
  "price": 100,
  "category": [
    "kategori"
  ],
  "images": [
    "bild-url"
  ],
  "isAvailable": true, 
  "ownerId": "346kj45gv",
"currentRentalId": null, // null eller id till den aktuella Rental/kvittot
  "renterId": null // null eller id på person som hyr.
} 
  
såhär ser ett item ut i items arrayen. 

-->
