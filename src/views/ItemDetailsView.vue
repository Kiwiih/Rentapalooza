<script setup>
import { ref, computed } from 'vue';
import { useItems } from '@/shared/useItems'
import { useRoute } from 'vue-router';

const { items, getItems } = useItems()
const route = useRoute();

getItems()

const id = route.params.id;
const currentId = computed(() => id - 1);

const selectedItem = computed(() => {
  return items.value.find(item => item.id === currentId.value);
});

const handleImageError = (event) => {
  event.target.src = "https://company.rentitems.com/wp-content/uploads/2016/09/Rent-Items-Icon.png"
}


// This is a fake array I used before I got the real data.
const itemsArray = ref([{
    id: "1",
    title: "Namn på item",
    description: "Beskrivning av ett item. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum bibendum tempus eros non vulputate. Nunc non turpis nulla. Suspendisse potenti. In ut varius arcu, ac lacinia odio. In dictum facilisis urna et varius. Sed eget sagittis justo. Mauris congue augue congue, ultricies leo vitae, egestas nisl. Nullam sollicitudin sed elit sed laoreet. Nam vel neque sit amet ante dictum suscipit. Nam lacinia aliquet elit, sit amet tristique velit scelerisque et.",
    price: 150,
    category: [
      "Kategori1", "Kategori2"
    ],
    images: [
      "https://company.rentitems.com/wp-content/uploads/2016/09/Rent-Items-Icon.png", "https://company.rentitems.com/wp-content/uploads/2016/09/Rent-Items-Icon.png"
    ],
    isAvailable: true, 
    ownerId: "346kj45gv",
    currentRentalId: null,
    renterId: null
  },     
  {
    id: "2",
    title: "Namn på item",
    description: "Beskrivning av ett item. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum bibendum tempus eros non vulputate. Nunc non turpis nulla. Suspendisse potenti. In ut varius arcu, ac lacinia odio. In dictum facilisis urna et varius. Sed eget sagittis justo. Mauris congue augue congue, ultricies leo vitae, egestas nisl. Nullam sollicitudin sed elit sed laoreet. Nam vel neque sit amet ante dictum suscipit. Nam lacinia aliquet elit, sit amet tristique velit scelerisque et.",
    price: 150,
    category: [
      "Kategori1", "Kategori2"
    ],
    images: [
      "https://company.rentitems.com/wp-content/uploads/2016/09/Rent-Items-Icon.png", "https://company.rentitems.com/wp-content/uploads/2016/09/Rent-Items-Icon.png"
    ],
    isAvailable: true, 
    ownerId: "346kj45gv",
    currentRentalId: null,
    renterId: null
  }])


// Function for getting the item with correct data from the itemsArray.
// const selectedId = ref("1"); 
// const selectedItem = computed(() => {
//   return itemsArray.value.find(item => item.id === selectedId.value);
// });

// hard coded item I used while waiting for actual data.
const item = ref({
    id: "1",
    title: "Namn på item",
    description: "Beskrivning av ett item. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum bibendum tempus eros non vulputate. Nunc non turpis nulla. Suspendisse potenti. In ut varius arcu, ac lacinia odio. In dictum facilisis urna et varius. Sed eget sagittis justo. Mauris congue augue congue, ultricies leo vitae, egestas nisl. Nullam sollicitudin sed elit sed laoreet. Nam vel neque sit amet ante dictum suscipit. Nam lacinia aliquet elit, sit amet tristique velit scelerisque et.",
    price: 150,
    category: [
      "Kategori1", "Kategori2"
    ],
    images: [
      "https://company.rentitems.com/wp-content/uploads/2016/09/Rent-Items-Icon.png", "https://company.rentitems.com/wp-content/uploads/2016/09/Rent-Items-Icon.png"
    ],
    isAvailable: true, 
    ownerId: "346kj45gv",
    currentRentalId: null,
    renterId: null
  })
</script>

<template>

    <div v-if="items.length > 0" class="itemDetail">
        <h1>{{ items[currentId].title}}</h1>

        <div class="category">
            <span v-for="(category, index) in items[currentId].category" :key="index">{{ category }}</span>
        </div>

        <div class="imageDiv">
            <img v-for="(image, index) in items[currentId].images" :key="index" :src="image" :alt="'Bild på item ' + (index + 1)" class="itemImage" @error="handleImageError">
        </div>

        <p class="desc">{{ items[currentId].description }}</p>
        <p class="price">{{  items[currentId].price }} kr</p>
        <p :class="items[currentId].isAvailable ? 'available' : 'unavailable'">{{ items[currentId].isAvailable ? "Available for rent" : "Currently unavailable" }}</p>
        <button v-if="items[currentId].isAvailable">Rent now!</button>
    </div>
</template>

<style scoped>
.itemDetail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2rem;
    gap: 0.5rem;
}

.itemImage {
    max-height: 20rem;
}

.category span {
    margin: 0.2rem;
    border: 1px solid var(--color-primary);
    padding: 0.3rem;
    border-radius: 4px;
}

.desc {
    max-width: 75%;
}

.available {
    color: var(--color-success)
}

.unavailable {
    color: var(--color-error)
}

.price {
    font-size: 2rem;
}

.imageDiv {
    flex-direction: row;
}
</style>
