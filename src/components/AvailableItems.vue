<script setup>
import { useItems } from "@/shared/useItems.js";
import { onBeforeMount } from 'vue'

// Hämta variabel och funktion från useItems
const { items, getItems } = useItems();

getItems()

onBeforeMount(async () => {
    // Vänta på att hämta data från API
    await getItems();

    // Pusha ett nytt item till items när data är hämtad
    items.value.push({
        "id": "2",
        "title": "Item namn",
        "description": "Beskrivning",
        "price": 100,
        "category": ["kategori"],
        "images": ["bild-url"],
        "isAvailable": true,
        "ownerId": "346kj45gv",
        "currentRentalId": null,
        "renterId": null
    });
});
</script>

<template>


    <div>
        <br>
        <!-- Rendera hela items -->
        <!-- TODO: rendera bara om avalible är true -->
        <hr>
        <ul>

            <li v-for="(item) in items" :key="item.id">
                {{ item.title }} <!-- Visa titeln på varje item -->
                <br>
                {{ item.description }}
                <br>
                {{ item.price }} Kronas
                <br>
                {{ item.images }}
                uthyrare:
                <!-- TODO: hitta namn på uthyrare baserat på denna id -->
                {{ item.ownerId }}
                <hr>

            </li>
        </ul>

    </div>


</template>
