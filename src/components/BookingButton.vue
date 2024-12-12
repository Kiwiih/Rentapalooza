<script setup>
  import { nanoid } from 'nanoid/non-secure'
  import { defineProps, watchEffect } from 'vue'
  import { useItems } from '@/shared/useItems'
  import { useRentals } from '@/shared/useRentals'
  import { ref } from 'vue'

  const props = defineProps(['item'])

  // Använder composables
  const { items, getItems, updateItems } = useItems()
  const { rentals, addRental, loading, error } = useRentals()

  //Hanterar rätt knapp som laddar
  const loadingId = ref(null);

  // Hämta den inloggade användaren
  const currentUser = JSON.parse(localStorage.getItem('user'))

  const bookItem = async (item) => {
    if(loadingId.value) return

    loadingId.value = item.id

    

      if (item.ownerId === currentUser.id) {
        alert('You cannot book your own item.')
        loadingId.value = null
        return
      }

    // Sätt bokningsdatum
    const currentDate = new Date()
    const endDate = new Date()
    endDate.setDate(currentDate.getDate() + 7)

    // Skapa rental-objekt
    const rental = {
      id: nanoid(),
      itemId: item.id,
      ownerId: item.ownerId,
      renterId: currentUser.id,
      startDate: currentDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      price: item.price
    }

      try {
      await Promise.all([
      addRental(rental),
      getItems()
      ]);

      // Uppdatera rätt item
      const updatedItems = items.value.map((i) =>
        i.id === item.id
          ? {
              ...i,
              isAvailable: false,
              renterId: currentUser.id,
              currentRentalId: rental.id
            }
          : i
      )

      // Spara de uppdaterade items till databasen
      await updateItems(updatedItems)

      alert('Booking successful!')
    } catch (err) {
      console.error(err)
      alert('An error occurred while booking the item.')
    } finally {
      loadingId.value = null;
    }
  }

</script>

<template>
  <div>
    <button
      @click="bookItem(item)"
      :class="{ 'loading-btn': loadingId === item.id, 'owned-item-btn': item.ownerId === currentUser.id }" 
      :disabled="!item.isAvailable || loadingId === item.id" 
    >
      {{ loadingId === item.id ? 'Loading...' : 'Book item' }}
    </button>
  </div>
</template>

<style scoped>
.owned-item-btn {
  background-color: red;
  color: white;
  cursor: not-allowed;
}
</style>
