<script setup>
  import { useItems } from '@/shared/useItems'
  import { useRoute } from 'vue-router'
  import BookingButton from '@/components/BookingButton.vue'
  import { ref, watch } from 'vue'

  const { items, getItems } = useItems()
  const route = useRoute()

  // get params from url
  const id = route.params.id

  /*************
   I de fall då man går direkt in på items details via länk och kommer utifrån SPA så kommer vi behöva hämta items innan vi kan göra något då items inte fyllts på ännu... därför skapar vi en ref för de selectade itemet som templaten kan vara beroende av och avgöra om den är redo att renderas eller ej....
  *************/

  // store the current item that we r gonna show on page
  const selectedItem = ref('')

  // om items saknar innehåll så hämtar vi innehåll
  if (items.value <= 0) {
    getItems()
  } else {
    // annars plockar vi ut rätt item...
    selectedItem.value = items.value.find((item) => item.id === id)
  }

  // Lyssna på förändringar i items.
  // OBS. funktionen körs även en gång inledningsvis! pga immediate = true
  // om items förändras.. ex går från tom till att ha innehåll... såååå.......
  watch(
    () => items.value, //vi bevakar detta värdet
    (newItems) => {
      if (newItems.length > 0) {
        selectedItem.value = newItems.find((item) => item.id === id)
      }
    },
    { immediate: true } // kör en gång inledningsvis också
  )

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
    <p class="price">{{ selectedItem.price }} kr</p>
    <p :class="selectedItem.isAvailable ? 'available' : 'unavailable'">
      {{
        selectedItem.isAvailable
          ? 'Available for rent'
          : 'Currently unavailable'
      }}
    </p>

    <BookingButton :item="selectedItem" />
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
    color: var(--color-success);
  }

  .unavailable {
    color: var(--color-error);
  }

  .price {
    font-size: 2rem;
  }

  .imageDiv {
    flex-direction: row;
  }
</style>
