<script setup>
import axios from 'axios';
import { nanoid } from 'nanoid';

const bookItem = async (item) => {
    //Gets the current user
    const currentUser = JSON.parse(localStorage.getItem('activeUser'));

    if(!currentUser){
        alert('Log in to make a booking');
        return;
    }

    //Sets the date of booking
    const currentDate = new Date();
    const endDate = new Date();
    endDate.setDate(currentDate.getDate() + 7);

    //Make the receipt/rental object
    const rental = {
        id: nanoid(),
        itemId: item.id,
        ownerId: item.ownerId,
        renterId: currentUser.id,
        startDate: currentDate.toISOString().split('T')[0], // Date of booking
        endDate: endDate.toISOString().split('T')[0], // Date 7 days later
        price: item.price,
    }


    //Sends to rentalbin
    try{
        await axios.post(
            'https://api.jsonbin.io/v3/b/6751aeb5acd3cb34a8b49235',
            {rentals: [rental]}, 
            {
                headers: {
                    'X-Master-Key': import.meta.env.VITE_API_X_MASTER_KEY,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Gets current itembin
    const itemsResponse = await axios.get(
      'https://api.jsonbin.io/v3/b/6751aef2e41b4d34e46057f5',
      {
        headers: {
          'X-Master-Key': import.meta.env.VITE_API_X_MASTER_KEY,
        },
      }
    );

    const items = itemsResponse.data.record.items;

    // Updating the right item
    const updatedItems = items.map((i) =>
      i.id === item.id
        ? { ...i, isAvailable: false, renterId: currentUser.id, currentRentalId: rental.id }
        : i
    );

        await axios.put(
            'https://api.jsonbin.io/v3/b/6751aef2e41b4d34e46057f5',
            {items: updatedItems}, 
            {
                headers: {
                    'X-Master-Key': import.meta.env.VITE_API_X_MASTER_KEY,
                    'Content-Type': 'application/json',
                },
            }
        )

        alert('Booking successful!');
        
    } catch(err) {
        console.error(err);
        alert('An error occurred while booking the item.');
    }




}

</script>

<template>
<div>
    <button @click="bookItem(item)" > Book item </button>
</div>

</template>

