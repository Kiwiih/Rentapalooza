<script setup>
  import { nanoid } from 'nanoid/non-secure'
  import { defineProps, watchEffect } from 'vue'
  import { useItems } from '@/shared/useItems'
  import { useRentals } from '@/shared/useRentals'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()

  const props = defineProps(['item'])

  // Använder composables
  const { items, getItems, updateItems } = useItems()
  const { rentals, addRental, loading, error } = useRentals()

  //Hanterar rätt knapp som laddar
  const loadingId = ref(null)

  // Hämta den inloggade användaren
  const currentUser = JSON.parse(localStorage.getItem('user'))

  const bookItem = async (item) => {
    // om användaren inte är inloggad tvingas den till det. det objekt den var intresserad av skickas med som id för att kunna directa användaren till objektets sida sedan.
    // ...annars drar vi igång bokningen.....:
    if (!currentUser) {
      console.log('skicka till inlogg')

      router.push({ name: 'login', query: { itemId: item.id } })
    } else {
      if (loadingId.value) return

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
        await Promise.all([addRental(rental), getItems()])

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
        loadingId.value = null
      }
    }
  }
</script>

<template>
  <div>
    <div
      v-if="currentUser && item.ownerId === currentUser.id"
      class="badge your-item-mark"
    >
      Your Item
    </div>

    <button
      v-else
      @click="bookItem(item)"
      :class="{
        'loading-btn': item && loadingId === item.id,
        'owned-item-btn': currentUser && item.ownerId === currentUser.id,
        'need-to-login-btn': !currentUser
      }"
      :disabled="!item.isAvailable || loadingId === item.id"
    >
      {{ loadingId === item.id ? 'Loading...' : 'Book item' }}
    </button>
  </div>
</template>

<style scoped>
  .your-item-mark {
    margin-top: 0.5rem;
    color: var(--color-text-muted);
    padding: 0.8rem 1.2rem;
    margin: 0.1rem;
    font-size: 1rem;
  }
  .owned-item-btn {
    background-color: red;
    color: white;
    cursor: not-allowed;
  }

  .need-to-login-btn::before {
    content: 'You need to log in';
    padding: 1rem;
    background-color: var(--color-primary);
    display: none; /* Gör så att det inte visas när knappen inte är hoverad */
    position: absolute;
    top: 50%; /* Placera i mitten vertikalt */
    left: 50%; /* Placera i mitten horisontellt */
    transform: translate(
      -50%,
      -50%
    ); /* Justera för att exakta positionen ska vara mitt i knappen */
    width: 100%; /* Gör det så att texten får hela knappen som bredd */
    font-weight: lighter;
    font-size: small;
  }

  .need-to-login-btn:hover::before {
    display: block; /* Gör att ::before visas när knappen är hoverad */
  }

  @media(max-width: 500px){

button, .your-item-mark {
  padding: 0.6rem;
  font-size: 0.9rem;
}
}
</style>
