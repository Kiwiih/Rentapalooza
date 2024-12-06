<script setup>
// import axios from 'axios';

const bookItem = async (item) => {
    //Gets the current user
    const currentUser = JSON.parse(localstorage.getItem('activeUser'));

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
        id: crypto.randomUUID().toString(),
        itemId: item.id,
        ownerId: item.ownerId,
        renterId: currentUser.id,
        startDate: currentDate.toISOString().split('T')[0], // Date of booking
        endDate: endDate.toISOString().split('T')[0], // Date 7 days later
        price: item.price,
    }



    const updatedItem = {
        ...item,
        isAvailable: false,
        renterId: currentUser.id,
        currentRentalId: rental.id
    };


}

</script>

<template>
<div>
    <button @click="bookItem(item)" :disabled="!item.isAvailable" > Boka </button>
</div>

</template>

