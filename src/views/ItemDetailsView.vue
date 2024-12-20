<script setup>
  import { useItems } from '@/shared/useItems'
  import { useRoute, useRouter } from 'vue-router'
  import BookingButton from '@/components/BookingButton.vue'
  import { ref, watch } from 'vue'

  const { items, getItems } = useItems();
  const route = useRoute();
  const router = useRouter();

  // get params from url
  const id = route.params.id

  // store the current item that we show on the page
  const selectedItem = ref('')

  // If items lacks value then we fetch it
  if (items.value <= 0) {
    getItems()
  } else {
    // if not, then we find the right item
    selectedItem.value = items.value.find((item) => item.id === id)
  }

  // Listen to changes in items. 
  // The function runs one time initially because of immediate = true
  watch(
    () => items.value, // the value that we are watching.
    (newItems) => {
      if (newItems.length > 0) {
        selectedItem.value = newItems.find((item) => item.id === id)
      }
    },
    { immediate: true }
  )

// Check if selectedItem is null or undefined and send to 404 page if that's the case.
  watch(selectedItem, (newItem) => {
    if (!newItem) {
      sessionStorage.setItem("fromInvalidLink", "true")
      router.replace("/404")
    }
  })

  const handleImageError = (event) => {
    event.target.src =
      'https://company.rentitems.com/wp-content/uploads/2016/09/Rent-Items-Icon.png'
  }
</script>

<template>
  <div v-if="selectedItem" class="itemDetail">
    <h1>{{ selectedItem.title }}</h1>

    <div class="category">
      <span v-for="(category, index) in selectedItem.category" :key="index">{{
        category
      }}</span>
    </div>

    <div class="imageDiv">
      <img
        v-for="(image, index) in selectedItem.images"
        :key="index"
        :src="image"
        :alt="'Bild på item ' + (index + 1)"
        class="itemImage"
        @error="handleImageError"
      />
    </div>

    <p class="desc">{{ selectedItem.description }}</p>
    <div class="pricebook">
    <p class="price">{{ selectedItem.price }} kr</p>
    <div class="holder">
    <p :class="selectedItem.isAvailable ? 'available' : 'unavailable'">
      {{
        selectedItem.isAvailable
          ? 'Available for rent'
          : 'Currently unavailable'
      }}
    </p>

    <BookingButton :item="selectedItem" />
  </div>
  </div>
  </div>
</template>

<style scoped>
  .itemDetail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem;
    gap: 0.5rem;
    padding: 1rem;
    border: 4px;
    border-style: solid;
    border-image: repeating-linear-gradient(
    45deg,
    rgb(255, 255, 255),
    rgb(255, 255, 255) 4px,
    black 4px,
    black 8px
  ) 4; 
  border-radius: 10px;
  }

  .itemImage {
    max-height: 10rem;
    border: 3px solid;
    border-radius: 5px;
  }

  .imageDiv{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row wrap;
    gap: .5rem;
    margin-top: 1rem;
    max-width: 70%;
  }

  .category span {
    margin: 0.2rem;
    border: 1px solid var(--color-primary);
    padding: 0.3rem;
    border-radius: 4px;
  }

  .desc {
    max-width: 80%;
    margin-top: 1rem;
  }

  .available {
    color: var(--color-success);
  }

  .unavailable {
    color: var(--color-error);
  }

  .pricebook{
    display: flex;
    flex-flow: row wrap;
    gap: 1.5rem;
    margin: 1rem;
    align-items: center;
  }

  .holder{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .price {
    font-size: 2rem;
  }

  .imageDiv {
    flex-direction: row;
  }

  @media(max-width: 500px){

.pricebook {
  justify-content: center;
}

h1 {
  text-align: center;
}


}

</style>
