<script setup>
import { nanoid } from 'nanoid/non-secure';
import { defineProps } from 'vue';
import { useItems } from '@/shared/useItems'; 
import { useRentals } from '@/shared/useRentals';
import axios from 'axios' 

const props = defineProps(['item']);

// Använder composables
const { items, getItems, updateItems } = useItems();
const { rentals, addRental } = useRentals();

const bookItem = async (item) => {
  // Hämta den inloggade användaren
  const currentUser = JSON.parse(localStorage.getItem('user'));

  if (!currentUser) {
    alert('Log in to make a booking');
    return;
  }

  // Sätt bokningsdatum
  const currentDate = new Date();
  const endDate = new Date();
  endDate.setDate(currentDate.getDate() + 7);

  // Skapa rental-objekt
  const rental = {
    id: nanoid(),
    itemId: item.id,
    ownerId: item.ownerId,
    renterId: currentUser.id,
    startDate: currentDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    price: item.price,
  };

  try {
    // Lägg till rental
    await addRental(rental);

    // Hämta aktuella items
    await getItems();

    // Uppdatera rätt item
    const updatedItems = items.value.map((i) =>
      i.id === item.id
        ? { ...i, isAvailable: false, renterId: currentUser.id, currentRentalId: rental.id }
        : i
    );

    // Spara de uppdaterade items till databasen
    await updateItems(updatedItems);

    alert('Booking successful!');
  } catch (err) {
    console.error(err);
    alert('An error occurred while booking the item.');
  }
};
</script>

<template>
  <div>
    <button @click="bookItem(item)" :disabled="!item.isAvailable">Book item</button>
  </div>
</template>

